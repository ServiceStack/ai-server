import { ref, computed, onMounted, inject, watch, nextTick, getCurrentInstance} from "vue"
import { useFormatters, useClient } from "@servicestack/vue"
import { marked } from "../markdown.mjs"
import { addCopyButtonToCodeBlocks } from "../utils.mjs"
import { QueryPrompts, ActiveAiModels, OpenAiChatCompletion } from "dtos"

const { truncate } = useFormatters()

export default {
    template: `
<div class="flex w-full">
    <div class="flex flex-col flex-grow pr-4 overflow-y-auto h-screen pl-1" style="">
        <div style="max-width:var(--content-width);">
            <div>
                <div class="grid grid-cols-2 gap-2 py-2 relative">
                   <div v-if="!!routes.id" class="absolute w-full h-20 z-10"><!--disable autocompletes--></div>
                   <Autocomplete id="model" :options="models" v-model="prefs.model" label="Model"
                        :match="(x, value) => x.toLowerCase().includes(value.toLowerCase())"
                        placeholder="Select Model..."
                        :disabled="!!routes.id" :readonly="!!routes.id">
                        <template #item="name">
                            <div class="flex items-center">
                                <Icon class="h-6 w-6 flex-shrink-0" :src="'/icons/models/' + name" loading="lazy" />
                                <span class="ml-3 truncate">{{name}}</span>
                            </div>
                        </template>
                    </Autocomplete>                
                    
                   <Autocomplete id="prompt" :options="prompts" v-model="selectedPrompt" label="Prompt"
                        :match="(x, value) => x.name.toLowerCase().includes(value.toLowerCase())"
                        placeholder="Select a System Prompt..."
                        :disabled="!!routes.id">
                        <template #item="{ name }">
                            <div class="truncate">{{name}}</div>
                        </template>
                    </Autocomplete>
                </div>
                <div v-if="!routes.id">
                    <div v-if="showSystemPrompt">
                        <TextareaInput id="systemPrompt" v-model="systemPrompt" label="System Prompt"></TextareaInput>
                    </div>
                    <div v-else>
                        <SecondaryButton @click="selectPrompt('pvq-app')">
                            <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M8.5 5.5a.5.5 0 0 0-1 0v2h-2a.5.5 0 0 0 0 1h2v2a.5.5 0 0 0 1 0v-2h2a.5.5 0 0 0 0-1h-2zM8 2a6 6 0 0 0-5.27 8.872l-.71 2.49a.5.5 0 0 0 .638.612l2.338-.779A6 6 0 1 0 8 2M3 8a5 5 0 1 1 2.325 4.225a.5.5 0 0 0-.426-.052l-1.658.553l.51-1.781a.5.5 0 0 0-.052-.393A5 5 0 0 1 3 8"/></svg>
                            Add System Prompt
                        </SecondaryButton>
                    </div>
                </div>
            </div>
            <div class="flex-1 my-4 pb-20">
                <div class="flex flex-col">
                    <template v-for="message in messages">
                        <div v-if="message.role === 'system'" class="message rounded-lg py-2 px-4 mb-4 system bg-green-50 border-green-50">
                          <div v-html="marked.parse(message?.content ?? '')" class="prose"></div>
                        </div>
                        <div v-else-if="message.role === 'assistant'" class="message py-2 mb-4 assistant">
                          <div v-html="marked.parse(message?.content ?? '')" class="prose"></div>
                        </div>
                        <div v-else class="message rounded-lg py-2 px-4 mb-4 user bg-gray-100 border-gray-100 self-end">
                          <div v-html="message.content" class="prose"></div>
                        </div>
                    </template>
                    <div v-if="waitingOnResponse" class="mx-auto pt-4">
                        <Loading>Asking {{prefs.model}}...</Loading>
                    </div>
                    <ErrorSummary :status="error" class="pt-4" />
                </div>
                <div id="bottom" ref="refBottom"></div>
            </div>
        </div>
          
        <div class="fixed bottom-0 md:pt-2 dark:border-white/20 md:border-transparent md:dark:border-transparent bg-white pr-8" style="width:calc(max(100% - 18rem - 18rem - 2.25rem, 20rem))">
            <div class="text-base px-3 md:px-4 m-auto md:px-5 lg:px-1 xl:px-5">
                <div class="flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
                    <form :disabled="waitingOnResponse" class="w-full" type="button" @submit.prevent="sendMessage">
                        <div class="relative flex h-full max-w-full flex-1 flex-col">
                            <div class="absolute bottom-full left-0 right-0 z-20">
                                <div class="relative h-full w-full">
                                    <div class="flex flex-col gap-3.5 pb-3.5 pt-2"></div>
                                </div>
                            </div>
                            <div class="flex w-full items-center">
                                
                                <div class="flex w-full flex-col gap-1.5 rounded-[26px] p-1.5 transition-colors bg-[#f4f4f4]">
                                    <div class="flex items-end gap-1.5 md:gap-2">
                                        <div class="pl-4 flex min-w-0 flex-1 flex-col">
                                            <textarea ref="refMessage" id="txtMessage" v-model="newMessage" :disabled="waitingOnResponse" rows="1" placeholder="Ask AI anything..." @keydown.ctrl.enter="sendMessage"
                                                :class="[{'opacity-50' : waitingOnResponse},'m-0 resize-none border-0 bg-transparent px-0 text-token-text-primary focus:ring-0 focus-visible:ring-0 max-h-[25dvh] max-h-52']" 
                                                style="height: 40px; overflow-y: hidden;"></textarea>
                                        </div>
                                        <button :disabled="!validPrompt || waitingOnResponse" title="Send (CTRL+Enter)" 
                                            class="mb-1 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary">
                                            <svg v-if="!waitingOnResponse" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m3.165 19.503l7.362-16.51c.59-1.324 2.355-1.324 2.946 0l7.362 16.51c.667 1.495-.814 3.047-2.202 2.306l-5.904-3.152c-.459-.245-1-.245-1.458 0l-5.904 3.152c-1.388.74-2.87-.81-2.202-2.306"/></svg>
                                            <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M8 16h8V8H8zm4 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </form>     
                </div>
            </div>
        </div>
    </div>
    
    <div class="w-60 sm:w-72 md:w-96 h-screen border-l h-full md:py-2 md:px-2 bg-white">
        <h3 class="p-2 sm:block text-xl md:text-2xl font-semibold">History</h3>
        
        <div v-href="{id:undefined}" :class="['pl-4 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6', !routes.id ? 'bg-gray-50 text-indigo-600 font-semibold' : 'cursor-pointer text-gray-700']">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z"/><path fill="currentColor" d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2z"/></svg>
            New Conversation
        </div>
        
        <div v-for="group in historyGroups">
            <h4 class="pl-2 text-gray-500 uppercase pt-2 text-sm leading-6 font-semibold">{{group.title}}</h4>
            <div v-for="item in group.chats">
                <div v-href="{id:item.id}" :class="['pl-4 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6', item.id == routes.id ? 'bg-gray-50 text-indigo-600 font-semibold' : 'cursor-pointer text-gray-700']">
                    <div class="w-64 overflow-hidden whitespace-nowrap text-ellipsis" 
                        @contextmenu.prevent.stop="showChatMenu=showChatMenu==item.id ? null : item.id">
                        <input v-if="renameChatId === item.id" id="txtItemTitle" type="text" v-model="item.title" class="text-sm py-1 px-2 font-normal text-gray-700" 
                            @keypress.enter="renameItem" @keydown.esc="renameChatId=null">                  
                        <div v-else class="flex items-center">
                            <Icon class="h-4 w-4 flex-shrink-0 mr-1" :src="'/icons/models/' + item.model" loading="lazy" :alt="item.model" />
                            <span :title="item.title">{{item.title}}</span>                            
                        </div>
                    </div>
                    <div @click.stop="showChatMenu=showChatMenu==item.id ? null : item.id" class="cursor-pointer">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"/></svg>
                    </div>
                    <div v-if="item.id == showChatMenu" class="absolute font-normal right-0 mt-6 mr-4 z-10 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                        <div @click.stop="renameChat(item)" class="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Rename</div>
                        <div @click.stop="deleteChat(item)" class="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Delete</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`,
    setup() {
        const events = inject('events')
        const routes = inject('routes')
        const client = useClient()

        const noPromptId = '_none_'
        const noPrompt = '[ None ]'
        const customPromptId = '_custom_'
        const customPrompt = 'Custom...'
        const history = ref([])
        const chat = ref()
        const prefs = ref(JSON.parse(localStorage.getItem('chat.prefs') || JSON.stringify({ model: '', prompt: '' })))
        const selectedPrompt = ref()
        const systemPrompt = ref('')
        const showSystemPrompt = ref(false)
        const newMessage = ref('')
        const showChatMenu = ref()
        const renameChatId = ref()
        const validPrompt = computed(() => newMessage.value && prefs.value.model)
        const waitingOnResponse = ref(false)
        const messages = ref([]) //mock ?? 
        const models = ref([])
        const prompts = ref([])
        const error = ref()
        const refMessage = ref()
        const refBottom = ref()
        const historyGroups = computed(() => groupChats(history.value))

        watch(() =>  prefs.value.model, () => savePrefs())
        watch(() =>  selectedPrompt.value, () => {
            prefs.value.prompt = selectedPrompt.value?.name
            savePrefs()
            updatePrompt()
            refMessage.value?.focus()
        })
        
        function loadHistory() {
            const chatHistory = localStorage.getItem('chat.history')
            messages.value = []
            if (chatHistory) {
                history.value = JSON.parse(chatHistory)
            }
        }
        function saveHistory() {
            localStorage.setItem('chat.history', JSON.stringify(history.value))
        }
        
        function groupChats(threads) {
            const sorted = threads.sort((a,b) => b.id - a.id)
            
            let Today = []
            let LastWeek = []
            let Months = {}
            let Years = {}
            
            const groups = []

            sorted.forEach(x => {
                const created = new Date(x.id)
                const now = new Date()
                const diff = now - created
                const days = diff / (1000 * 60 * 60 * 24)
                const startOfYear = new Date(new Date().getFullYear(), 0, 1)
                
                if (days < 1) {
                    Today.push(x)
                } else if (days < 7) {
                    LastWeek.push(x)
                } else if (created > startOfYear) {
                    const month = created.toLocaleString('default', { month: 'long' })
                    if (!Months[month]) Months[month] = []
                    Months[month].push(x)
                } else {
                    const year = `${created.getFullYear()}`
                    if (!Years[year]) Years[year] = []
                    Years[year].push(x)
                }
            })
            
            if (Today.length) groups.push({ title: 'Today', chats: Today })
            if (LastWeek.length) groups.push({ title: 'Previous 7 Days', chats: LastWeek })

            Object.keys(Months).forEach(month => {
                groups.push({ title: month, chats: Months[month] })
            })
            const yearsDesc = Object.keys(Years).sort((a,b) => b.localeCompare(a))
            yearsDesc.forEach(year => {
                groups.push({ title: year, chats: Years[year] })
            })
            // console.log('groups',groups)
            return groups
        }
        
        async function sendMessage() {
            if (!validPrompt.value || waitingOnResponse.value) return
            
            error.value = null
            waitingOnResponse.value = true
            chat.value = chat.value ?? {
                id: new Date().valueOf(),
                title: truncate(newMessage.value, 80),
                chats: [],
                model: prefs.value.model,
                prompt: prefs.value.prompt,
            }
            
            const msg = { role: "user", content: newMessage.value }
            messages.value.push(msg)
            nextTick(scrollBottomIntoView)
            newMessage.value = ""
            
            const msgs = [...messages.value]
            if (!msgs.find(x => x.role === 'system') && systemPrompt.value) {
                msgs.unshift({ role: "system", content: systemPrompt.value })
            }
            
            const request = new OpenAiChatCompletion({
                tag: "admin",
                model: prefs.value.model,
                messages: msgs,
                temperature: 0.7,
                maxTokens: 2048,
            })
            const api = await client.api(request)
            
            error.value = api.error
            console.debug('chat.sendMessage', api.response, api.error)
            const chatResponse = api.response
            if (chatResponse?.id) {
                chatResponse.request = request
                const chatId = chatResponse.id
                chat.value.chats.push(chatId)
                if (!history.value.find(x => x.id === chat.value.id)) {
                    history.value.push(chat.value)
                }
                let content = chatResponse.choices[0]?.message?.content
                const c = (content?.[0] ?? '').trim()
                if (c === '"' || c === '{' || c === '[') {
                    try {
                        const json = JSON.parse(content)
                        content = chatResponse.choices[0].message.content = "```json\n" + JSON.stringify(json,undefined,4) + "\n```\n"
                    } catch (e) {}
                }
                localStorage.setItem('chat.history', JSON.stringify(history.value))
                localStorage.setItem(chatId, JSON.stringify(chatResponse))
                messages.value.push({ role: "assistant", content })
                if (routes.id !== chat.value.id) {
                    routes.to({ id:chat.value.id })
                } else {
                    nextTick(scrollBottomIntoView)
                }
            } else {
                error.value = api.error
                const lastPrompt = messages.value.pop()
                newMessage.value = lastPrompt.content
            }
            waitingOnResponse.value = false
            nextTick(() => addCopyButtonToCodeBlocks('.prose pre>code'))
        }
        
        function scrollBottomIntoView() {
            if (!refBottom.value) return
            if (refBottom.value.scrollIntoViewIfNeeded) {
                refBottom.value.scrollIntoViewIfNeeded()
            } else {
                refBottom.value.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            }
            refMessage.value?.focus()
        }

        function selectModel() {
            savePrefs()
        }
        function selectPrompt(promptName) {
            prefs.value.prompt = promptName
            if (prefs.value.prompt != null) {
                selectedPrompt.value = prompts.value.find(p => p.name === prefs.value.prompt)
            }
            savePrefs()
            updatePrompt()
        }
        function updatePrompt() {
            if (prefs.value.prompt) {
                systemPrompt.value = prompts.value.find(p => p.name === prefs.value.prompt)?.value ?? ''
            } else {
                systemPrompt.value = ''
            }
            showSystemPrompt.value = !!systemPrompt.value || prefs.value.prompt === customPrompt
            nextTick(() => {
                const refPrompt = document.getElementById('systemPrompt')
                if (!refPrompt) return
                //refPrompt.focus()
                if (refPrompt.scrollHeight > refPrompt.clientHeight) refPrompt.style.height = (refPrompt.scrollHeight + 2) + 'px';
            })
        }
        function savePrefs() {
            localStorage.setItem('chat.prefs', JSON.stringify(prefs.value))
        }
        
        function onRouteChange() {
            console.log('onRouteChange', routes.id)
            loadHistory()
            if (routes.id) {
                const idVal = parseInt(routes.id)
                chat.value = history.value.find(x => x.id === idVal)
                if (chat.value) {
                    prefs.value.model = chat.value.model
                    selectPrompt(chat.value.prompt ?? '')

                    const chatIds = chat.value.chats
                    const lastChatId = chatIds[chatIds.length - 1]
                    /** @type {OpenAiChatResponse} */
                    const chatResponse = JSON.parse(localStorage.getItem(lastChatId))
                    const chatRequest = chatResponse?.request
                    if (chatRequest?.messages) {
                        messages.value.push(...chatRequest.messages)
                    }
                    if (chatResponse) {
                        messages.value.push({ role: "assistant", content: chatResponse.choices[0]?.message?.content })
                    }

                    nextTick(scrollBottomIntoView)
                    //console.debug('onRouteChange', id.value, prefs.value.model, selectedPrompt.value, messages.value)
                }
            } else {
                chat.value = null
                messages.value = []
            }
            
            nextTick(() => addCopyButtonToCodeBlocks('.prose pre>code'))
        }

        function renameChat(item) {
            renameChatId.value = item.id
            showChatMenu.value = null
            nextTick(() => {
                const txt = document.getElementById('txtItemTitle')
                txt?.select()
                txt?.focus()
            })
        }
        function renameItem() {
            saveHistory()
            renameChatId.value = null
        }
        
        function deleteChat(item) {
            if (confirm('Are you sure you want to delete this conversation?')) {
                const idx = history.value.findIndex(x => x.id === item.id)
                if (idx >= 0) {
                    history.value.splice(idx, 1)
                    localStorage.setItem('chat.history', JSON.stringify(history.value))
                    for (const key of item.chats) {
                        localStorage.removeItem(key)
                    }
                    if (routes.id == item.id) {
                        routes.to({ id:undefined })
                    }
                }
            }
            showChatMenu.value = null
        }
        
        function updated() {
            // console.debug('updated', routes.admin, routes.id)
            updatePrompt()
            selectPrompt(prefs.value.prompt)
            onRouteChange()
        }
        
        watch(() => routes.id, updated)

        onMounted(async () => {
            const api = await client.api(new ActiveAiModels())
            models.value = await api.response.results
            models.value.sort((a,b) => a.localeCompare(b))
            
            const apiPrompts = await client.api(new QueryPrompts())
            prompts.value = apiPrompts.response.results
            // console.log('prompts', apiPrompts.response.results)
            prompts.value.unshift({id:customPromptId, name:customPrompt, value:``})
            prompts.value.unshift({id:noPromptId, name:noPrompt, value:``})

            await updated()
        })
        
        return {
            routes, newMessage, showChatMenu, renameChatId, validPrompt, waitingOnResponse, messages, history, prefs, 
            models, prompts, error,
            systemPrompt, showSystemPrompt, selectedPrompt, historyGroups,
            refBottom, refMessage, sendMessage, selectModel, selectPrompt, marked, renameChat, renameItem, deleteChat,
        }
    }
}
