import { ref, computed, onMounted, inject, watch, nextTick } from "vue"
import { useFormatters, useClient } from "@servicestack/vue"
import { TextToImage, ActiveMediaModels } from "dtos"
import { HistoryGroups } from "./utils.mjs"
import { ArtifactGallery } from "./Artifacts.mjs"

const { truncate } = useFormatters()

export default {
    components: {
        HistoryGroups,
        ArtifactGallery,
    },
    template:`
<div class="flex w-full">
    <div class="flex flex-col flex-grow pr-4 overflow-y-auto h-screen pl-1" style="">
        <div>
            
            <div class="text-base px-3 m-auto lg:px-1 pt-3">
                <div class="flex flex-1 gap-4 text-base md:gap-5 lg:gap-6">
                    <form :disabled="waitingOnResponse" class="w-full" type="button" @submit.prevent="send">
                        <div class="relative flex h-full max-w-full flex-1 flex-col">
                            <div class="absolute bottom-full left-0 right-0 z-20">
                                <div class="relative h-full w-full">
                                    <div class="flex flex-col gap-3.5 pb-3.5 pt-2"></div>
                                </div>
                            </div>
                            <div class="flex flex-col w-full items-center">
                                
                                <fieldset class="w-full">
                                    <ErrorSummary :except="visibleFields" class="mb-4" />
                                    <div class="grid grid-cols-6 gap-4">
                                        <div class="col-span-6 sm:col-span-2">
                                            <SelectInput id="model" v-model="request.model" :values="activeModels" label="Active Models" required />
                                        </div>
                                        <div class="col-span-6 sm:col-span-4">
                                            <TextInput id="negativePrompt" v-model="request.negativePrompt" required placeholder="Negative Prompt" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-1">
                                            <TextInput type="number" id="width" v-model="request.width" min="0" required />
                                        </div>
                                        <div class="col-span-6 sm:col-span-1">
                                            <TextInput type="number" id="height" v-model="request.height" min="0" required />
                                        </div>
                                        <div class="col-span-6 sm:col-span-1">
                                            <TextInput type="number" id="batchSize" v-model="request.batchSize" min="0" required />
                                        </div>
                                        <div class="col-span-6 sm:col-span-1">
                                            <TextInput type="number" id="seed" v-model="request.seed" min="0" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-2">
                                            <TextInput id="tag" v-model="request.tag" placeholder="Tag" />
                                        </div>
                                    </div>

                                    <div class="mt-4 flex w-full flex-col gap-1.5 rounded-lg p-1.5 transition-colors bg-[#f4f4f4]">
                                        <div class="flex items-end gap-1.5 md:gap-2">
                                            <div class="pl-4 flex min-w-0 flex-1 flex-col">
                                                <textarea ref="refMessage" id="txtMessage" v-model="request.positivePrompt" :disabled="waitingOnResponse" rows="1" 
                                                    placeholder="Generate Image Prompt..." @keydown.enter.prevent="send"
                                                    :class="[{'opacity-50' : waitingOnResponse},'m-0 resize-none border-0 bg-transparent px-0 text-token-text-primary focus:ring-0 focus-visible:ring-0 max-h-[25dvh] max-h-52']" 
                                                    style="height: 40px; overflow-y: hidden;"></textarea>
                                            </div>
                                            <button :disabled="!validPrompt || waitingOnResponse" title="Send (Enter)" 
                                                class="mb-1 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary">
                                                <svg v-if="!waitingOnResponse" class="ml-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267z"/></svg>
                                                <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M8 16h8V8H8zm4 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                </fieldset>

                                <div v-for="result in (thread?.results ?? [])">
                                    <div class="flex justify-center items-center">
                                        <span @click="selectRequest(result.request)" class="cursor-pointer my-4 flex justify-center items-center text-xl hover:underline underline-offset-4" title="New from this">
                                            {{ result.request.positivePrompt }}
                                        </span>
                                    </div>                                    
                                    
                                    <ArtifactGallery :results="toArtifacts(result)" />
                                </div>
                                
                                <div v-if="waitingOnResponse" class="mt-8 mb-20 flex justify-center">
                                    <Loading class="text-gray-300 font-normal" imageClass="w-7 h-7 mt-1.5">generating images...</Loading>
                                </div>                                
                                                                            
                            </div>
                        </div>
                    </form>     
                </div>

                <div id="bottom" ref="refBottom"></div>
            </div>
                        
        </div>
    </div>
    <div class="w-60 sm:w-72 md:w-96 h-screen border-l h-full md:py-2 md:px-2 bg-white">
        <h3 class="p-2 sm:block text-xl md:text-2xl font-semibold">History</h3>
        <HistoryGroups :threads="history" v-slot="{ item }" @save="saveHistory()">
            <Icon class="h-4 w-4 flex-shrink-0 mr-1" :src="'/icons/models/' + item.model" loading="lazy" :alt="item.model" />
            <span :title="item.title">{{item.title}}</span>                            
        </HistoryGroups>
    </div>
</div>
    `,
    setup(props) {
        const client = useClient()
        const routes = inject('routes')
        
        const waitingOnResponse = ref(false)
        const defaults = {
            negativePrompt: '(nsfw),(explicit),(gore),(violence),(blood)',
            width: 1024,
            height: 1024,
            batchSize: 4,
        }
        const error = ref()
        const prefsKey = 'image2text.prefs'
        const historyKey = 'image2text.history'
        
        const prefs = ref(JSON.parse(localStorage.getItem(prefsKey) || JSON.stringify(defaults)))
        const history = ref(JSON.parse(localStorage.getItem(historyKey) || "[]"))
        const thread = ref()
        
        const validPrompt = computed(() => (request.value.model && request.value.positivePrompt
            && request.value.negativePrompt && request.value.width && request.value.height 
            && request.value.batchSize))
        const newMessage = ref('')
        const refMessage = ref()
        const refBottom = ref()
        const visibleFields = 'positivePrompt,negativePrompt,width,height,batchSize,seed,tag'.split(',')
        const request = ref(new TextToImage(prefs.value))
        const activeModels = ref([])
        
        function savePrefs() {
            localStorage.setItem(prefsKey, 
                JSON.stringify(Object.assign({}, request.value, { positivePrompt:'' })))
        }
        function loadHistory() {
            const historyJson = localStorage.getItem(historyKey)
            if (historyJson) {
                history.value = JSON.parse(historyJson)
            }
        }
        function saveHistory() {
            localStorage.setItem(historyKey, JSON.stringify(history.value))
        }

        async function send() {
            savePrefs()

            thread.value = thread.value ?? {
                id: new Date().valueOf(),
                title: truncate(request.value.positivePrompt, 80),
                model: request.value.model,
                results: [],
            }
            
            console.log('request', request.value)
            
            error.value = null
            waitingOnResponse.value = true
            const api = await client.api(request.value)
            waitingOnResponse.value = false
            /** @type {GenerationResponse} */
            const r = api.response
            
            if (r) {
                console.log('response', r)
                
                thread.value.results.push({ 
                    request: request.value,
                    response: r
                })
                if (!history.value.find(x => x.id === thread.value.id)) {
                    history.value.push(thread.value)
                }
                saveHistory()

                if (routes.id !== thread.value.id) {
                    routes.to({ id:thread.value.id })
                } else {
                    nextTick(scrollBottomIntoView)
                }
                
            } else {
                console.error('error', api.error)
                error.value = api.error
            }
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
        
        function toArtifacts(result) {
            return result.response.outputs.map(x => ({
                width: result.request.width,
                height: result.request.height,
                url: x.url,
                filePath: x.url.substring(x.url.indexOf('/artifacts')),
            }))
        }
        
        function selectRequest(req) {
            request.value = Object.assign(request.value, req)
        }

        function onRouteChange() {
            console.log('onRouteChange', routes.id)
            loadHistory()
            if (routes.id) {
                const idVal = parseInt(routes.id)
                thread.value = history.value.find(x => x.id === idVal)
                if (thread.value) {
                    // prefs.value.model = chat.value.model
                    // selectPrompt(chat.value.prompt ?? '')
                    //
                    // const chatIds = chat.value.chats
                    // const lastChatId = chatIds[chatIds.length - 1]
                    // /** @type {OpenAiChatResponse} */
                    // const chatResponse = JSON.parse(localStorage.getItem(lastChatId))
                    // const chatRequest = chatResponse?.request
                    // if (chatRequest?.messages) {
                    //     messages.value.push(...chatRequest.messages)
                    // }
                    // if (chatResponse) {
                    //     messages.value.push({ role: "assistant", content: chatResponse.choices[0]?.message?.content })
                    // }
                    //
                    // nextTick(scrollBottomIntoView)
                }
            } else {
                thread.value = null
                //messages.value = []
            }
        }

        function updated() {
            // console.debug('updated', routes.admin, routes.id)
            onRouteChange()
        }

        watch(() => routes.id, updated)
        
        onMounted(async () => {
            const api = await client.api(new ActiveMediaModels())
            if (api.response) {
                activeModels.value = api.response.results
                if (!request.value.model) {
                    request.value.model = activeModels.value[0]
                }
            }
            await updated()
        })
        
        return {
            routes,
            history,
            request,
            visibleFields,
            waitingOnResponse,
            validPrompt,
            newMessage,
            refMessage,
            refBottom,
            activeModels,
            thread,
            send,
            saveHistory,
            toArtifacts,
            selectRequest,
        }
    }
}