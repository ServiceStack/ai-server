import { ref, computed, onMounted, inject, watch, nextTick } from "vue"
import { useClient } from "@servicestack/vue"
import { createErrorStatus, map } from "@servicestack/client"
import { TextToImage, ActiveMediaModels, ActiveAiModels, QueryPrompts, OpenAiChatCompletion } from "dtos"
import { ThreadStorage, HistoryGroups} from "./utils.mjs"
import { ArtifactGallery } from "./Artifacts.mjs"
import PromptGenerator from "./PromptGenerator.mjs" 

export default {
    components: {
        HistoryGroups,
        ArtifactGallery,
        PromptGenerator,
    },
    template:`
<div class="flex w-full">
    <div class="flex flex-col flex-grow pr-4 overflow-y-auto h-screen pl-1" style="">
        <div>            
            <div id="top" ref="refTop"></div>
            <div class="text-base px-3 m-auto lg:px-1 pt-3">
                <div class="flex flex-1 gap-4 text-base md:gap-5 lg:gap-6">
                    <form :disabled="waitingOnResponse" class="w-full mb-0" type="button" @submit.prevent="send">
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
                                            <TextInput type="number" id="batchSize" label="Image Count" v-model="request.batchSize" min="0" required />
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
                            </div>
                        </div>
                    </form>
                </div>
                <PromptGenerator promptId="midjourney-prompt-generator" @selected="selectPrompt($event)" />
                
                <div class="pb-20">
                    
                    <div v-if="waitingOnResponse" class="mt-8 mb-20 flex justify-center">
                        <Loading class="text-gray-300 font-normal" imageClass="w-7 h-7 mt-1.5">generating images...</Loading>
                    </div>                                

                    <div v-for="result in getThreadResults()" class="w-full ">
                        <div class="flex items-center justify-between">
                            <span @click="selectRequest(result.request)" class="cursor-pointer my-4 flex justify-center items-center text-xl hover:underline underline-offset-4" title="New from this">
                                {{ result.request.positivePrompt }}
                            </span>
                            <div class="group flex cursor-pointer" @click="discardResult(result)">
                                <div class="ml-1 invisible group-hover:visible">discard</div>
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M12 12h2v12h-2zm6 0h2v12h-2z"></path><path fill="currentColor" d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z"></path></svg>
                            </div>
                        </div>                     

                        <ArtifactGallery :results="toArtifacts(result)">
                            <template #bottom="{ selected }">
                                <div class="z-40 absolute bottom-0 gap-x-6 w-full flex justify-center p-4 bg-black/20">
                                    <a :href="selected.url + '?download=1'" class="flex text-sm text-gray-300 hover:text-gray-100 hover:drop-shadow">
                                        <svg class="w-5 h-5 mr-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5"></path></svg> 
                                        download 
                                    </a>
                                    <div @click.stop.prevent="toggleIcon(selected)" class="flex cursor-pointer text-sm text-gray-300 hover:text-gray-100 hover:drop-shadow">
                                        <svg :class="['w-5 h-5 mr-0.5',selected.url == threadRef.icon ? '-rotate-45' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14 18l-8 8M20.667 4L28 11.333l-6.38 6.076a2 2 0 0 0-.62 1.448v3.729c0 .89-1.077 1.337-1.707.707L8.707 12.707c-.63-.63-.184-1.707.707-1.707h3.729a2 2 0 0 0 1.448-.62z"/></svg>
                                        {{selected.url == threadRef.icon ? 'unpin icon' : 'pin icon' }}
                                    </div>
                                </div>
                            </template>
                        </ArtifactGallery>
                    </div>
                </div>
                <div id="bottom" ref="refBottom"></div>
            </div>
                        
        </div>
    </div>
    <div class="w-60 sm:w-72 md:w-96 h-screen border-l h-full md:py-2 md:px-2 bg-white">
        <h3 class="p-2 sm:block text-xl md:text-2xl font-semibold">History</h3>
        <HistoryGroups :history="history" v-slot="{ item }" @save="saveHistoryItem($event)" @remove="removeHistoryItem($event)">
            <Icon class="h-5 w-5 rounded-full flex-shrink-0 mr-1" :src="item.icon ?? defaultIcon" loading="lazy" :alt="item.model" />
            <span :title="item.title">{{item.title}}</span>                            
        </HistoryGroups>
    </div>
</div>
    `,
    setup(props) {
        const client = useClient()
        const routes = inject('routes')
        const defaultIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'%3E%3Cpath fill='%23000' d='M8 3a5 5 0 0 0-3.858 8.18l2.806-2.76a1.5 1.5 0 0 1 2.105 0l2.805 2.761A5 5 0 0 0 8 3m0 10a4.98 4.98 0 0 0 3.149-1.116L8.35 9.131a.5.5 0 0 0-.701 0l-2.798 2.754A4.98 4.98 0 0 0 8 13M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8m8-1a1 1 0 1 0 0-2a1 1 0 0 0 0 2'/%3E%3C/svg%3E"

        const waitingOnResponse = ref(false)
        const storage = new ThreadStorage(`img2txt`, {
            model: 'jib-mix-realistic',
            negativePrompt: '(nsfw),(explicit),(gore),(violence),(blood)',
            width: 1024,
            height: 1024,
            batchSize: 1,
        })
        const error = ref()
        
        const prefs = ref(storage.getPrefs())
        const history = ref(storage.getHistory())
        const thread = ref()
        const threadRef = ref()
        
        const validPrompt = computed(() => (request.value.model && request.value.positivePrompt
            && request.value.negativePrompt && request.value.width && request.value.height 
            && request.value.batchSize))
        const refMessage = ref()
        const refTop = ref()
        const refBottom = ref()
        const visibleFields = 'positivePrompt,negativePrompt,width,height,batchSize,seed,tag'.split(',')
        const request = ref(new TextToImage(prefs.value))
        const activeModels = ref([])
        
        function savePrefs() {
            storage.savePrefs(Object.assign({}, request.value, { positivePrompt:'' }))
        }
        function loadHistory() {
            history.value = storage.getHistory()
        }
        function saveHistory() {
            storage.saveHistory(history.value)
        }

        async function send() {
            savePrefs()
            console.log('request', request.value)
            
            error.value = null
            waitingOnResponse.value = true
            const api = await client.api(request.value)
            waitingOnResponse.value = false
            /** @type {GenerationResponse} */
            const r = api.response
            if (r) {
                console.log('response', r)
                
                if (!r.outputs?.length) {
                    error.value = createErrorStatus("no results were returned")
                } else {
                    thread.value = thread.value ?? storage.createThread(Object.assign({
                        title: request.value.positivePrompt
                    }, request.value))
                    
                    const result = {
                        id: storage.createId(),
                        request: Object.assign({}, request.value),
                        response: r
                    }
                    thread.value.results.push(result)
                    storage.saveThread(thread.value)
                    
                    const id = parseInt(routes.id) || storage.createId()
                    if (!history.value.find(x => x.id === id)) {
                        history.value.push({
                            id,
                            title: thread.value.title,
                            icon: r.outputs[0].url
                        })
                    }
                    saveHistory()

                    if (routes.id !== id) {
                        routes.to({ id })
                    } else {
                        nextTick(scrollBottomIntoView)
                    }
                }
                
            } else {
                console.error('error', api.error)
                error.value = api.error
            }
        }
        
        function scrollIntoView(el) {
            if (!el) return
            if (el.scrollIntoViewIfNeeded) {
                el.scrollIntoViewIfNeeded()
            } else {
                el.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            }
        }
        
        function scrollBottomIntoView() {
            scrollIntoView(refBottom.value)
            refMessage.value?.focus()
        }
        
        function getThreadResults() {
            const ret = Array.from(thread.value?.results ?? [])
            console.log('getThreadResults',ret,thread.value)
            ret.reverse()
            return ret
        }
        
        function toArtifacts(result) {
            return result.response?.outputs?.map(x => ({
                width: result.request.width,
                height: result.request.height,
                url: x.url,
                filePath: x.url.substring(x.url.indexOf('/artifacts')),
            })) ?? []
        }
        
        function selectRequest(req) {
            Object.assign(request.value, req)
            scrollIntoView(refTop.value)
        }
        
        function selectPrompt(prompt) {
            request.value.positivePrompt = prompt
            refMessage.value?.focus()
        }
        
        function discardResult(result) {
            thread.value.results = thread.value.results.filter(x => x.id != result.id)
            storage.saveThread(thread.value)
        }
        
        function toggleIcon(item) {
            console.log('toggleIcon', item)
            threadRef.value.icon = item.url
            saveHistory()
        }

        function onRouteChange() {
            console.log('onRouteChange', routes.id)
            loadHistory()
            request.value.positivePrompt = ''
            if (routes.id) {
                const id = parseInt(routes.id)
                thread.value = storage.getThread(storage.getThreadId(id))
                threadRef.value = history.value.find(x => x.id === parseInt(routes.id))
                // console.log('thread', id, thread.value)
                // console.log('threadRef', threadRef.value)
            } else {
                thread.value = null
            }
        }

        function updated() {
            // console.debug('updated', routes.admin, routes.id)
            onRouteChange()
        }
        
        function saveHistoryItem(item) {
            storage.saveHistory(history.value)
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
            refMessage,
            refTop,
            refBottom,
            activeModels,
            thread,
            threadRef,
            defaultIcon,
            send,
            saveHistory,
            toArtifacts,
            toggleIcon,
            selectRequest,
            selectPrompt,
            discardResult,
            getThreadResults,
            saveHistoryItem,
            removeHistoryItem,
        }
    }
}