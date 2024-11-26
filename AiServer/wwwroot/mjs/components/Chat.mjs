import { ref, computed, onMounted, inject, watch, nextTick } from "vue"
import { useClient } from "@servicestack/vue"
import { marked } from "../markdown.mjs"
import { addCopyButtonToCodeBlocks } from "../dom.mjs"
import { useUiLayout, UiLayout, ThreadStorage, HistoryTitle, HistoryGroups } from "../utils.mjs"
import { QueryPrompts, ActiveAiModels, OpenAiChatCompletion } from "../dtos.mjs"

export default {
    components: {
        UiLayout,
        HistoryTitle,
        HistoryGroups,
    },
    template: `
<UiLayout ref="refUi">
    <template #main>
        <div style="max-width:calc(var(--content-width) + 50px);">
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
                    
                   <Autocomplete id="prompt" :options="prompts" v-model="selectedPrompt" label="System Prompt"
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
                <div v-if="thread" class="flex flex-col">
                    <template v-for="message in thread.messages">
                        <div v-if="message.role === 'system'" data-message="system" class="rounded-lg py-2 px-4 mb-4 system bg-green-50 border-green-50">
                          <div v-html="marked.parse(message?.content ?? '')" class="prose"></div>
                        </div>
                        <div v-else-if="message.role === 'assistant'" data-message="assistant" class="relative border border-indigo-600/25 rounded-lg p-2 mb-4 overflow-hidden">
                          <div v-html="marked.parse(message?.content ?? '')" class="prose"></div>
                        </div>
                        <div v-else data-message="user" class="rounded-lg py-2 px-4 mb-4 user bg-gray-100 border border-gray-100 self-end">
                          <div v-html="message.content" class="prose"></div>
                        </div>
                    </template>
                    <div v-if="client.loading.value" class="mx-auto pt-4">
                        <Loading>Asking {{prefs.model}}...</Loading>
                    </div>
                    <ErrorSummary :status="error" class="pt-4" />
                </div>
            </div>
        </div>
        
        <div class="fixed bottom-0 md:pt-2 dark:border-white/20 md:border-transparent md:dark:border-transparent bg-white pr-8" style="width:calc(max(100% - 18rem - 18rem - 2.25rem, 30rem))">
            <div class="text-base px-3 md:px-4 m-auto md:px-5 lg:px-1 xl:px-5">
                <div class="flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
                    <form class="w-full" @submit.prevent="send">
                        <div class="relative flex h-full max-w-full flex-1 flex-col">
                            <div class="absolute bottom-full left-0 right-0 z-20">
                                <div class="relative h-full w-full">
                                    <div class="flex flex-col gap-3.5 pb-3.5 pt-2"></div>
                                </div>
                            </div>
                            <div class="flex w-full items-center">
                                
                                <div class="flex w-full flex-col gap-1.5 rounded-[26px] p-1.5 transition-colors bg-[#f4f4f4] shadow border border-gray-300">
                                    <div class="flex items-end gap-1.5 md:gap-2">
                                        <div class="pl-4 flex min-w-0 flex-1 flex-col">
                                            <textarea ref="refMessage" id="txtMessage" v-model="prefs.userContent" :disabled="client.loading.value" rows="1" 
                                                placeholder="Ask AI anything..." spellcheck="false" autocomplete="off"
                                                @keydown.ctrl.enter="send"
                                                :class="[{'opacity-50':client.loading.value},'m-0 resize-none border-0 bg-transparent px-0 text-token-text-primary focus:ring-0 focus-visible:ring-0 max-h-[25dvh] max-h-52']" 
                                                style="height: 40px; overflow-y: hidden;"></textarea>
                                        </div>
                                        <button :disabled="!validPrompt || client.loading.value" title="Send (CTRL+Enter)" 
                                            class="mb-1 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary">
                                            <svg v-if="!client.loading.value" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m3.165 19.503l7.362-16.51c.59-1.324 2.355-1.324 2.946 0l7.362 16.51c.667 1.495-.814 3.047-2.202 2.306l-5.904-3.152c-.459-.245-1-.245-1.458 0l-5.904 3.152c-1.388.74-2.87-.81-2.202-2.306"/></svg>
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
    </template>
    
    <template #sidebar>
        <HistoryTitle :prefix="storage.prefix" />
        <HistoryGroups :history="history" v-slot="{ item }" @save="saveHistoryItem($event)" @remove="removeHistoryItem($event)">
            <Icon class="h-4 w-4 flex-shrink-0 mr-1" :src="item.icon" loading="lazy" :alt="item.model" />
            <span :title="item.title">{{item.title}}</span>                       
        </HistoryGroups>
    </template>
</UiLayout>
`,
    setup() {
        const client = useClient()
        const routes = inject('routes')
        const refUi = ref()
        const ui = useUiLayout(refUi)

        const storage = new ThreadStorage(`chat`, {
            model: '',
            prompt: '',
            systemPrompt: '',
            userContent: '',
        })
        const error = ref()
        const prefs = ref(storage.getPrefs())
        const history = ref(storage.getHistory())
        const thread = ref()
        const threadRef = ref()

        const validPrompt = computed(() => prefs.value.model && prefs.value.prompt && prefs.value.userContent)
        const refMessage = ref()

        const noPromptId = '_none_'
        const noPrompt = '[ None ]'
        const customPromptId = '_custom_'
        const customPrompt = 'Custom...'
        const selectedPrompt = ref()
        const systemPrompt = ref('')
        const showSystemPrompt = ref(false)
        const showChatMenu = ref()
        const renameChatId = ref()
        const models = ref([])
        const prompts = ref([])

        function savePrefs() {
            storage.savePrefs(Object.assign({}, prefs.value, { userContent:'' }))
        }
        function loadHistory() {
            history.value = storage.getHistory()
        }
        function saveHistory() {
            storage.saveHistory(history.value)
        }
        function saveThread() {
            if (thread.value) {
                storage.saveThread(thread.value)
            }
        }
        
        async function send() {
            if (!validPrompt.value || client.loading.value) return

            savePrefs()
    
            console.debug(`${storage.prefix}.request`, Object.assign({}, prefs.value))
            
            error.value = null
            nextTick(scrollBottom)
            
            const msgs = Array.from(thread.value?.messages ?? [])
            msgs.push({ role: "user", content: prefs.value.userContent })

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
            const r = api.response
            if (r?.id) {
                console.debug(`${storage.prefix}.response`, r)

                const id = parseInt(routes.id) || storage.createId()
                thread.value = thread.value ?? storage.createThread(Object.assign({
                    id: storage.getThreadId(id),
                    title: prefs.value.userContent,
                    model: prefs.value.model,
                    prompt: prefs.value.prompt,
                    userContent: prefs.value.userContent,
                    messages: [],
                }, request.value))

                let content = r.choices[0]?.message?.content
                const c = (content?.[0] ?? '').trim()
                if (c === '"' || c === '{' || c === '[') {
                    try {
                        const json = JSON.parse(content)
                        content = r.choices[0].message.content = "```json\n" + JSON.stringify(json,undefined,4) + "\n```\n"
                    } catch (e) {}
                }
                const result = {
                    id: storage.createId(),
                    request: Object.assign({}, request),
                    response: r,
                    content,
                }
                thread.value.results.push(result)

                msgs.push({ role:'assistant', content })
                thread.value.messages = msgs
                saveThread()

                if (!history.value.find(x => x.id === id)) {
                    history.value.push({
                        id,
                        title: thread.value.title,
                        icon: `/icons/models/${prefs.value.model}`
                    })
                }

                prefs.value.userContent = ""
                saveHistory()

                if (routes.id !== id) {
                    routes.to({ id })
                } else {
                    nextTick(scrollBottom)
                }
            } else {
                console.error('send.error', api.error)
                error.value = api.error
                const lastPrompt = msgs.pop()
                prefs.value.userContent = lastPrompt?.content ?? ''
            }
            nextTick(() => addCopyButtonToCodeBlocks('.prose pre>code'))
        }
        
        function scrollBottom() {
            ui.scrollBottom()
            refMessage.value?.focus()
        }

        function selectPrompt(promptName) {
            prefs.value.prompt = promptName
            if (prefs.value.prompt != null) {
                selectedPrompt.value = prompts.value.find(p => p.name === prefs.value.prompt)
            }
            updatePrompt()
        }
        function updatePrompt() {
            if (prefs.value.prompt) {
                systemPrompt.value = prompts.value.find(p => p.name === prefs.value.prompt)?.value ?? ''
            } else {
                systemPrompt.value = ''
            }
            prefs.value.systemPrompt = systemPrompt.value
            showSystemPrompt.value = !!systemPrompt.value || prefs.value.prompt === customPrompt
            nextTick(() => {
                const refPrompt = document.getElementById('systemPrompt')
                if (!refPrompt) return
                //refPrompt.focus()
                if (refPrompt.scrollHeight > refPrompt.clientHeight) refPrompt.style.height = (refPrompt.scrollHeight + 2) + 'px';
            })
        }

        function onRouteChange() {
            console.log('onRouteChange', routes.id)
            loadHistory()
            if (routes.id) {
                const idVal = parseInt(routes.id)
                thread.value = history.value.find(x => x.id === idVal)
                if (thread.value) {
                    const id = parseInt(routes.id)
                    thread.value = storage.getThread(storage.getThreadId(id))
                    threadRef.value = history.value.find(x => x.id === parseInt(routes.id))
                    Object.keys(storage.defaults).forEach(k =>
                        prefs.value[k] = thread.value[k] ?? storage.defaults[k])

                    selectPrompt(thread.value.prompt ?? '')

                    nextTick(scrollBottom)
                }
            } else {
                thread.value = null
            }
            
            nextTick(() => addCopyButtonToCodeBlocks('.prose pre>code'))
        }

        function updated() {
            // console.debug('updated', routes.admin, routes.id)
            updatePrompt()
            selectPrompt(prefs.value.prompt)
            onRouteChange()
        }

        function saveHistoryItem(item) {
            storage.saveHistory(history.value)
            if (thread.value && item.title) {
                thread.value.title = item.title
                saveThread()
            }
        }

        function removeHistoryItem(item) {
            const idx = history.value.findIndex(x => x.id === item.id)
            if (idx >= 0) {
                history.value.splice(idx, 1)
                storage.saveHistory(history.value)
                storage.deleteThread(storage.getThreadId(item.id))
                if (routes.id == item.id) {
                    routes.to({ id:undefined })
                }
            }
        }
        
        watch(() => routes.id, updated)
        watch(() => selectedPrompt.value, () => {
            prefs.value.prompt = selectedPrompt.value?.name
            updatePrompt()
            refMessage.value?.focus()
        })
        watch(() => [
            prefs.value.model,
            prefs.value.prompt,
            prefs.value.systemPrompt,
            prefs.value.userContent,
        ], () => {
            if (!thread.value) return
            Object.keys(storage.defaults).forEach(k =>
                thread.value[k] = prefs.value[k] ?? storage.defaults[k])
            saveThread()
        })

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
            storage, client, routes, refUi, showChatMenu, renameChatId, prefs, validPrompt, 
            thread, history, models, prompts, error, systemPrompt, showSystemPrompt, 
            selectedPrompt, refMessage,
            marked, send, selectPrompt, saveHistoryItem, removeHistoryItem,
        }
    }
}
