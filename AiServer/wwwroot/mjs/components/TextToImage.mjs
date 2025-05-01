import { ref, computed, onMounted, inject, watch, nextTick } from "vue"
import { useClient } from "@servicestack/vue"
import { createErrorStatus } from "@servicestack/client"
import { TextToImage, ActiveMediaModels } from "../dtos.mjs"
import { UiLayout, ThreadStorage, HistoryTitle, HistoryGroups, useUiLayout, icons, toArtifacts } from "../utils.mjs"
import { ArtifactGallery, ArtifactDownloads } from "./Artifacts.mjs"
import PromptGenerator from "./PromptGenerator.mjs"

export default {
    components: {
        UiLayout,
        HistoryTitle,
        HistoryGroups,
        ArtifactGallery,
        ArtifactDownloads,
        PromptGenerator,
    },
    template:`
    <UiLayout>
        <template #main>
            <div class="flex flex-1 gap-4 text-base md:gap-5 lg:gap-6">
                <form :disabled="client.loading.value" class="w-full mb-0" @submit.prevent="send">
                    <div class="relative flex h-full max-w-full flex-1 flex-col">
                        <div class="flex flex-col w-full items-center">
                            <fieldset class="w-full">
                                <ErrorSummary :except="visibleFields" class="mb-4" />
                                <div class="grid grid-cols-6 gap-4">
                                    <div class="col-span-6 sm:col-span-2">
                                        <SelectInput id="model" v-model="request.model" :entries="activeModels" label="Active Models" required />
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

                                <div class="mt-4 flex w-full flex-col gap-1.5 rounded-md p-1.5 transition-colors bg-[#f4f4f4] shadow border border-gray-300">
                                    <div class="flex items-center gap-1.5 md:gap-2">
                                        <div class="pl-4 flex min-w-0 flex-1 flex-col">
                                            <textarea ref="refMessage" id="txtMessage" v-model="request.positivePrompt" :disabled="client.loading.value" rows="2" 
                                                placeholder="Generate Image Prompt..." spellcheck="false" autocomplete="off" 
                                                @keydown.enter.prevent="send"
                                                :class="[{'opacity-50' : client.loading.value},'m-0 resize-none border-0 bg-transparent px-0 text-token-text-primary focus:ring-0 focus-visible:ring-0 max-h-[25dvh] max-h-52']" 
                                                style="height:60px; overflow-y: hidden;"></textarea>
                                        </div>
                                        <button :disabled="!validPrompt || client.loading.value" title="Send (Enter)" 
                                            class="mb-1 me-2 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary">
                                            <svg v-if="!client.loading.value" class="ml-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267z"/></svg>
                                            <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M8 16h8V8H8zm4 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </form>
            </div>

            <PromptGenerator :thread="thread" promptId="midjourney-prompt-generator" 
                @save="saveThread()" @selected="selectPrompt($event)" />
            
            <div class="pb-20">
                
                <div v-if="client.loading.value" class="mt-8 mb-20 flex justify-center">
                    <Loading class="text-gray-300 font-normal" imageClass="w-7 h-7 mt-1.5">generating images...</Loading>
                </div>                                

                <div v-for="result in getThreadResults()" class="w-full ">
                    <div class="flex items-center justify-between">
                        <span @click="selectRequest(result.request)" class="cursor-pointer my-4 flex justify-center items-center text-xl hover:underline underline-offset-4" :title="result.request.positivePrompt">
                            <div class="overflow-hidden text-ellipsis whitespace-nowrap max-w-3xl">{{ result.request.positivePrompt }}</div>
                        </span>
                        <div class="group flex cursor-pointer" @click="discardResult(result)">
                            <div class="ml-1 invisible group-hover:visible">discard</div>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M12 12h2v12h-2zm6 0h2v12h-2z"></path><path fill="currentColor" d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z"></path></svg>
                        </div>
                    </div>
                    <div v-if="result.request.model" class="float-right">                    
                        <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {{activeModels.find(x => x.key == result.request.model)?.value || result.request.model}}
                        </span>
                    </div>

                    <ArtifactGallery :results="toArtifacts(result)">
                        <template #bottom="{ selected }">
                            <ArtifactDownloads :url="selected.url">
                                <div @click.stop.prevent="toggleIcon(selected)" class="flex cursor-pointer text-sm text-gray-300 hover:text-gray-100 hover:drop-shadow">
                                    <svg :class="['w-5 h-5 mr-0.5',selected.url == threadRef.icon ? '-rotate-45' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14 18l-8 8M20.667 4L28 11.333l-6.38 6.076a2 2 0 0 0-.62 1.448v3.729c0 .89-1.077 1.337-1.707.707L8.707 12.707c-.63-.63-.184-1.707.707-1.707h3.729a2 2 0 0 0 1.448-.62z"/></svg>
                                    {{selected.url == threadRef.icon ? 'unpin icon' : 'pin icon' }}
                                </div>
                            </ArtifactDownloads>
                        </template>
                    </ArtifactGallery>
                </div>
            </div>        
        </template>
        
        <template #sidebar>
            <HistoryTitle :prefix="storage.prefix" />
            <HistoryGroups :history="history" v-slot="{ item }" @save="saveHistoryItem($event)" @remove="removeHistoryItem($event)">
                <Icon class="h-5 w-5 rounded-full flex-shrink-0 mr-1" :src="item.icon ?? icons.image" loading="lazy" :alt="item.model" />
                <span :title="item.title">{{item.title}}</span>                            
            </HistoryGroups>
        </template>
    </UiLayout>
    `,
    setup(props) {
        const client = useClient()
        const routes = inject('routes')
        const refUi = ref()
        const ui = useUiLayout(refUi)

        const storage = new ThreadStorage(`txt2img`, {
            model: '',
            positivePrompt: "",
            negativePrompt: '(nsfw),(explicit),(gore),(violence),(blood)',
            width: 1024,
            height: 1024,
            batchSize: 1,
            seed: '',
            tag: '',
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
        function saveThread() {
            if (thread.value) {
                storage.saveThread(thread.value)
            }
        }

        async function send() {
            if (!validPrompt.value || client.loading.value) return

            savePrefs()
            console.debug(`${storage.prefix}.request`, Object.assign({}, request.value))
            
            error.value = null
            const api = await client.api(request.value)
            /** @type {ArtifactGenerationResponse} */
            const r = api.response
            if (r) {
                console.debug(`${storage.prefix}.response`, r)
                
                if (!r.results?.length) {
                    error.value = createErrorStatus("no results were returned")
                } else {
                    const id = parseInt(routes.id) || storage.createId()
                    thread.value = thread.value ?? storage.createThread(Object.assign({
                        id: storage.getThreadId(id),
                        title: request.value.positivePrompt
                    }, request.value))
                    
                    const result = {
                        id: storage.createId(),
                        request: Object.assign({}, request.value),
                        response: r
                    }
                    thread.value.results.push(result)
                    saveThread()
                    
                    if (!history.value.find(x => x.id === id)) {
                        history.value.push({
                            id,
                            title: thread.value.title,
                            icon: r.results[0].url
                        })
                    }
                    saveHistory()

                    if (routes.id !== id) {
                        routes.to({ id })
                    }
                }
                
            } else {
                console.error('send.error', api.error)
                error.value = api.error
            }
        }
                
        function getThreadResults() {
            const ret = Array.from(thread.value?.results ?? [])
            ret.reverse()
            return ret
        }
        
        function selectRequest(req) {
            Object.assign(request.value, req)
            ui.scrollTop()
        }
        
        function selectPrompt(prompt) {
            request.value.positivePrompt = prompt
            refMessage.value?.focus()
        }
        
        function discardResult(result) {
            thread.value.results = thread.value.results.filter(x => x.id != result.id)
            saveThread()
        }
        
        function toggleIcon(item) {
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
                Object.keys(storage.defaults).forEach(k => 
                    request.value[k] = thread.value?.[k] ?? storage.defaults[k])
            } else {
                thread.value = null
                Object.keys(storage.defaults).forEach(k => request.value[k] = storage.defaults[k])
            }
            if (!request.value.model && activeModels.value) {
                request.value.model = activeModels.value[0].key
            }
        }

        function updated() {
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
        watch(() => [
            request.value.model,
            request.value.positivePrompt,
            request.value.negativePrompt,
            request.value.width,
            request.value.height,
            request.value.batchSize,
            request.value.seed,
            request.value.tag,
        ], () => {
            if (!thread.value) return
            Object.keys(storage.defaults).forEach(k =>
                thread.value[k] = request.value[k] ?? storage.defaults[k])
            saveThread()
        })
        
        onMounted(async () => {
            const api = await client.api(new ActiveMediaModels())
            if (api.response) {
                activeModels.value = api.response.results
            }
            updated()
        })
        
        return {
            storage,
            routes,
            client,
            history,
            request,
            visibleFields,
            validPrompt,
            refMessage,
            activeModels,
            thread,
            threadRef,
            icons,
            send,
            saveHistory,
            saveThread,
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