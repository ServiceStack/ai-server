import {ref, computed, onMounted, inject, watch, nextTick, getCurrentInstance} from "vue"
import { queryString, setQueryString } from "@servicestack/client"
import { marked } from "../markdown.mjs"
import { ActiveApiModels, CreateOpenAiChat, OpenAiChat, OpenAiChatTask } from "dtos.mjs"
import { mock } from "./mock.mjs"
import {WaitForOpenAiChat} from "../dtos.mjs";

export default {
    template: `
<div class="flex w-full">
    <div class="flex flex-col flex-grow pr-4" style="height:calc(100vh);max-width:var(--content-width);">
        <div class="">
            <div class="grid grid-cols-2 gap-2 py-2">
               <Autocomplete id="model" :options="models" v-model="prefs.model" label="Model"
                    :match="(x, value) => x.toLowerCase().includes(value.toLowerCase())"
                    placeholder="Select Model..."
                    :disabled="!!id">
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
                    :disabled="!!id">
                    <template #item="{ name }">
                        <div class="truncate">{{name}}</div>
                    </template>
                </Autocomplete>
            </div>
            <div v-if="!id">
                <div v-if="showSystemPrompt">
                    <TextareaInput id="systemPrompt" v-model="systemPrompt" label="System Prompt"></TextareaInput>
                </div>
                <div v-else>
                    <SecondaryButton @click="selectPrompt('pvq.app')">
                        <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M8.5 5.5a.5.5 0 0 0-1 0v2h-2a.5.5 0 0 0 0 1h2v2a.5.5 0 0 0 1 0v-2h2a.5.5 0 0 0 0-1h-2zM8 2a6 6 0 0 0-5.27 8.872l-.71 2.49a.5.5 0 0 0 .638.612l2.338-.779A6 6 0 1 0 8 2M3 8a5 5 0 1 1 2.325 4.225a.5.5 0 0 0-.426-.052l-1.658.553l.51-1.781a.5.5 0 0 0-.052-.393A5 5 0 0 1 3 8"/></svg>
                        Add System Prompt
                    </SecondaryButton>
                </div>
            </div>
        </div>
        <div class="flex-1 my-4 pb-20">
        messages :: {{messages}}
            <div class="flex flex-col">
                <template v-for="message in messages">
                    <div v-if="message.role === 'system'" class="message rounded-lg py-2 px-4 mb-4 system bg-green-50 border-green-50">
                      <div v-html="marked.parse(message.content)" class="prose"></div>
                    </div>
                    <div v-else-if="message.role === 'assistant'" class="message py-2 mb-4 assistant">
                      <div v-html="marked.parse(message.content)" class="prose"></div>
                    </div>
                    <div v-else class="message rounded-lg py-2 px-4 mb-4 user bg-gray-100 border-gray-100 self-end">
                      <div v-html="message.content" class="prose"></div>
                    </div>
                </template>
            </div>
        </div>
          
        <div class="sticky absolute bottom-0 md:pt-2 dark:border-white/20 md:border-transparent md:dark:border-transparent w-full bg-white">
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
                                            <textarea v-model="newMessage" :disabled="waitingOnResponse" rows="1" placeholder="Ask AI anything..." :class="[{'opacity-50' : waitingOnResponse},'m-0 resize-none border-0 bg-transparent px-0 text-token-text-primary focus:ring-0 focus-visible:ring-0 max-h-[25dvh] max-h-52']" style="height: 40px; overflow-y: hidden;"></textarea>
                                        </div>
                                        <button :disabled="!validPrompt || waitingOnResponse" data-testid="send-button" class="mb-1 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary">
                                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m3.165 19.503l7.362-16.51c.59-1.324 2.355-1.324 2.946 0l7.362 16.51c.667 1.495-.814 3.047-2.202 2.306l-5.904-3.152c-.459-.245-1-.245-1.458 0l-5.904 3.152c-1.388.74-2.87-.81-2.202-2.306"/></svg>
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
    
    <div class="absolute right-0 w-60 border-l h-full py-4 px-2">
        <h3 class="pl-2 sm:block text-2xl font-semibold">History</h3>
        
        <div v-hash="{id:undefined}" :class="['pl-4 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6', !id ? 'bg-gray-50 text-indigo-600 font-semibold' : 'cursor-pointer text-gray-700']">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z"/><path fill="currentColor" d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2z"/></svg>
            New Conversation
        </div>
        
        <div v-for="group in historyGroups">
            <h4 class="pl-2 text-gray-500 uppercase pt-2 text-sm leading-6 font-semibold">{{group.title}}</h4>
            <div v-for="item in group.tasks">
                <div v-hash="{id:item.id}" :class="['pl-4 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6', item.id == id ? 'bg-gray-50 text-indigo-600 font-semibold' : 'cursor-pointer text-gray-700']">
                    {{item.request.messages.find(x => x.role === 'user')?.content}}
                </div>
            </div>
        </div>
    </div>
</div>
`,
    setup() {

        const client = inject('client')

        const noPrompt = '[ None ]'
        const id = ref(0)
        const history = ref(JSON.parse(localStorage.getItem('chat:history') || "[]"))
        const prefs = ref(JSON.parse(localStorage.getItem('chat:prefs') || JSON.stringify({ model: '', prompt: '' })))
        const selectedPrompt = ref()
        const systemPrompt = ref('')
        const showSystemPrompt = ref(false)
        const newMessage = ref('')
        const showTyping = ref(false)
        const validPrompt = computed(() => newMessage.value && prefs.value.model)
        const waitingOnResponse = ref(false)
        const messages = ref([]) //mock ?? 
        const models = ref([])
        const prompts = ref([])
        const error = ref()
        const historyGroups = computed(() => groupTasks(history.value))

        watch(() =>  prefs.value.model, () => savePrefs())
        watch(() =>  selectedPrompt.value, () => {
            prefs.value.prompt = selectedPrompt.value?.name
            savePrefs()
            updatePrompt()
        })
        
        function groupTasks(msgs) {
            const sorted = msgs.sort((a,b) => a.createdDate.localeCompare(b.createdDate))
            sorted.reverse()
            
            let Today = []
            let LastWeek = []
            let Months = {}
            
            const groups = []

            sorted.forEach(task => {
                const created = new Date(task.createdDate)
                const now = new Date()
                const diff = now - created
                const days = diff / (1000 * 60 * 60 * 24)
                
                if (days < 1) {
                    Today.push(task)
                } else if (days < 7) {
                    LastWeek.push(task)
                } else {
                    const month = created.toLocaleString('default', { month: 'long' })
                    if (!Months[month]) Months[month] = []
                    Months[month].push(task)
                }
            })
            
            if (Today.length) groups.push({ title: 'Today', tasks: Today })
            if (LastWeek.length) groups.push({ title: 'Last Week', tasks: LastWeek })
            //console.log(Object.keys(Months))
            for (const month in Object.keys(Months)) {
                groups.push({ title: month, tasks: Months[month] })
            }
            
            return groups
        }

        async function sendMessage() {
            if (!validPrompt.value || waitingOnResponse.value) return
            error.value = null
            waitingOnResponse.value = true
            const msg = { role: "user", content: newMessage.value }
            messages.value.push(msg)
            newMessage.value = ""
            
            const msgs = []
            if (systemPrompt.value) {
                msgs.push({ role: "system", content: systemPrompt.value })
            }
            msgs.push(msg)
            
            const apiCreate = await client.api(new CreateOpenAiChat({
                tag: "admin",
                request: new OpenAiChat({
                    model: prefs.value.model,
                    messages: msgs,
                    temperature: 0.7,
                    maxTokens: 2048,
                }),
            }))
            
            waitingOnResponse.value = false
            error.value = apiCreate.error
            console.log(apiCreate.response, apiCreate.error)
            if (apiCreate.response?.id) {
                
                const api = await client.api(new WaitForOpenAiChat({ id: apiCreate.response.id }))
                error.value = api.error
                
                if (api.response?.result) {
                    history.value.push(api.response.result)
                    localStorage.setItem('chat:history', JSON.stringify(history.value))
                    location.hash = setQueryString(location.hash, { id:api.response.result.id })
                }
            }
        }

        function selectModel() {
            console.log('selectModel', prefs.value.model)
            savePrefs()
        }
        function selectPrompt(promptName) {
            prefs.value.prompt = promptName
            if (prefs.value.prompt) {
                selectedPrompt.value = prompts.value.find(p => p.name === prefs.value.prompt)
            }
            savePrefs()
            updatePrompt()
        }
        function updatePrompt() {
            if (prefs.value.prompt) {
                systemPrompt.value = prompts.value.find(p => p.name === prefs.value.prompt)?.prompt ?? ''
            } else {
                systemPrompt.value = ''
            }
            showSystemPrompt.value = !!systemPrompt.value
            nextTick(() => {
                const refPrompt = document.getElementById('systemPrompt')
                if (!refPrompt) return
                //refPrompt.focus()
                if (refPrompt.scrollHeight > refPrompt.clientHeight) refPrompt.style.height = (refPrompt.scrollHeight + 2) + 'px';
            })
        }
        function savePrefs() {
            localStorage.setItem('chat:prefs', JSON.stringify(prefs.value))
        }
        
        function onHashChange() {
            console.log('onHashChange', location.hash)
            if (location.hash.includes('?')) {
                const args = queryString(location.hash)
                if (args.id) {
                    const idVal = parseInt(args.id)
                    const task = history.value.find(x => x.id === idVal)
                    if (task) {
                        id.value = idVal
                        prefs.value.model = task.request.model
                        const selPromptText = task.request.messages.find(x => x.role === 'system')?.content || ''
                        if (selPromptText) {
                            const selPromptItem = prompts.value.find(x => x.prompt === selPromptText)
                            if (selPromptItem?.name) {
                                selectPrompt(selPromptItem.name)
                            } else {
                                selectPrompt(noPrompt)
                                systemPrompt.value = selPromptText
                            }
                        } else {
                            selectPrompt(noPrompt)
                        }
                        messages.value = task.request.messages || []
                        if (task.response) {
                            messages.value.push({ role: "assistant", content: task.response.choices[0]?.message?.content })
                        }
                        
                        // const hold = messages.value
                        // messages.value = []
                        // nextTick(() => {
                        //     messages.value = hold
                        //     console.log('messages', JSON.stringify(messages.value, undefined, 4))
                        //     const instance = getCurrentInstance()
                        //     instance?.proxy?.$forceUpdate()
                        //    
                        //     nextTick(() => messages.value = hold)
                        // })
                        
                    }
                }
            }
        }

        onMounted(async () => {
            const api = await client.api(new ActiveApiModels())
            models.value = await api.response.results
            
            const r = await fetch('/lib/data/prompts.json')
            const json = await r.text()
            prompts.value = JSON.parse(json)
            prompts.value.unshift({name:noPrompt, prompt:``})
            
            updatePrompt()
            selectPrompt(prefs.value.prompt)
            
            window.onhashchange = onHashChange
            //onHashChange()
        })
        
        return { 
            newMessage, showTyping, validPrompt, waitingOnResponse, messages, history, prefs, id, models, prompts,
            systemPrompt, showSystemPrompt, selectedPrompt, 
            sendMessage, selectModel, selectPrompt, marked, historyGroups,
        }
    }
}
