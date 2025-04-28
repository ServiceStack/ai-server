import { ref, onMounted, inject, watch } from "vue"
import { useClient, useFiles } from "@servicestack/vue"
import { createErrorStatus } from "@servicestack/client"
import { ConvertVideo, ConvertVideoOutputFormat } from "../dtos.mjs"
import { UiLayout, ThreadStorage, HistoryTitle, HistoryGroups, useUiLayout, icons, toArtifacts, acceptedVideos } from "../utils.mjs"
import { ArtifactGallery, ArtifactDownloads } from "./Artifacts.mjs"
import FileUpload from "./FileUpload.mjs"

export default {
    components: {
        UiLayout,
        HistoryTitle,
        HistoryGroups,
        ArtifactGallery,
        ArtifactDownloads,
        FileUpload,
    },
    template: `
        <UiLayout>
        <template #main>
            <div class="flex flex-1 gap-4 text-base md:gap-5 lg:gap-6">
                <form ref="refForm" :disabled="client.loading.value" class="w-full mb-0" @submit.prevent="send">
                    <div class="relative flex h-full max-w-full flex-1 flex-col">
                        <div class="flex flex-col w-full items-center">
                            <fieldset class="w-full">
                                <ErrorSummary :except="visibleFields" class="mb-4" />
                                <div class="grid grid-cols-6 gap-4">
                                    <div class="col-span-6">
                                        <FileUpload ref="refUpload" id="video" v-model="request.video" required
                                            accept=".mp4,.mov,.webm,.mkv,.avi,.wmv,.ogg" :acceptLabel="acceptedVideos" @change="renderKey++">
                                            <template #title>
                                                <span class="font-semibold text-green-600">Click to upload</span> or drag and drop
                                            </template>
                                            <template #icon>
                                                <svg class="mb-2 h-12 w-12 text-green-500 inline" viewBox="0 0 24 24">
                                                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1">
                                                        <path stroke-miterlimit="10" d="M9.047 9.5v5"/>
                                                        <path stroke-linejoin="round" d="M11.34 11.605L9.373 9.638a.46.46 0 0 0-.651 0l-1.968 1.967"/>
                                                        <path stroke-linejoin="round" d="M12 5.32H6.095A3.595 3.595 0 0 0 2.5 8.923v6.162a3.595 3.595 0 0 0 3.595 3.595H12a3.595 3.595 0 0 0 3.595-3.595V8.924A3.594 3.594 0 0 0 12 5.32m9.5 4.118v5.135c0 .25-.071.496-.205.708a1.36 1.36 0 0 1-.555.493a1.27 1.27 0 0 1-.73.124a1.37 1.37 0 0 1-.677-.278l-3.225-2.588a1.38 1.38 0 0 1-.503-1.047c0-.2.045-.396.133-.575c.092-.168.218-.315.37-.432l3.225-2.567a1.36 1.36 0 0 1 .678-.278c.25-.032.504.011.729.124a1.33 1.33 0 0 1 .76 1.181"/>
                                                    </g>
                                                </svg>
                                            </template>
                                        </FileUpload>
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <SelectInput id="outputFormat" v-model="request.outputFormat" :options="ConvertVideoOutputFormat" />
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <TextInput id="tag" v-model="request.tag" placeholder="Tag" />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div class="mt-4 mb-8 flex justify-center">
                            <PrimaryButton :key="renderKey" type="submit" :disabled="!validPrompt()">
                                <svg class="-ml-0.5 h-6 w-6 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>
                                <span class="text-base font-semibold">{{ request.outputFormat ? ('Convert to .' + ConvertVideoOutputFormat[request.outputFormat]) : 'Upload' }}</span>
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
            
            <div  class="pb-20">
                
                <div v-if="client.loading.value" class="mt-8 mb-20 flex justify-center items-center">
                    <Loading class="text-gray-300 font-normal" imageClass="w-7 h-7 mt-1.5">processing video...</Loading>
                </div>                                

                <div v-for="result in getThreadResults()" class="w-full ">
                    <div class="flex items-center justify-between">
                        <span class="my-4 flex justify-center items-center text-xl underline-offset-4">
                            <span class="max-w-10 text-ellipsis">{{ result.response?.results?.[0]?.fileName || result.request.video }}</span>
                        </span>
                        <div class="group flex cursor-pointer" @click="discardResult(result)">
                            <div class="ml-1 invisible group-hover:visible">discard</div>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M12 12h2v12h-2zm6 0h2v12h-2z"></path><path fill="currentColor" d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z"></path></svg>
                        </div>
                    </div>   
                    <video v-if="result.response?.results?.[0]?.url" controls>
                        <source :src="result.response.results[0].url" type="video/mp4" />
                    </video>
                    <div v-if="result.response?.results?.[0]?.url" class="mt-2 flex justify-between">
                        <span></span>
                        <a :href="result.response.results[0].url + '?download=1'" class="flex items-center text-indigo-600 hover:text-indigo-700">
                            <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5"></path></svg>
                            <div class="">download</div>
                        </a>
                    </div>
                </div>
            </div>
        </template>
        
        <template #sidebar>
            <HistoryTitle :prefix="storage.prefix" />
            <HistoryGroups :history="history" v-slot="{ item }" @save="saveHistoryItem($event)" @remove="removeHistoryItem($event)">
                <Icon class="h-5 w-5 rounded-full flex-shrink-0 mr-1" :src="item.icon ?? icons.video" loading="lazy" :alt="item.model" />
                <span :title="item.title">{{item.title}}</span>
            </HistoryGroups>
        </template>
    </UiLayout>
    `,
    setup() {
        const client = useClient()
        const routes = inject('routes')
        const refUi = ref()
        const refForm = ref()
        const refUpload = ref()
        const ui = useUiLayout(refUi)
        const renderKey = ref(0)
        const { filePathUri, getExt, extSrc, svgToDataUri } = useFiles()

        const storage = new ThreadStorage(`vidconv`, {
            tag: '',
            outputFormat: '',
        })
        const error = ref()

        const prefs = ref(storage.getPrefs())
        const history = ref(storage.getHistory())
        const thread = ref()
        const threadRef = ref()

        const validPrompt = () => refForm.value?.video?.files?.length
        const refMessage = ref()
        const visibleFields = 'video,outputFormat'.split(',')
        const request = ref(new ConvertVideo())
        const activeModels = ref([])

        function savePrefs() {
            storage.savePrefs(Object.assign({}, request.value, { tag:'' }))
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
            console.debug('send', validPrompt(), client.loading.value)
            if (!validPrompt() || client.loading.value) return

            savePrefs()
            console.debug(`${storage.prefix}.request`, Object.assign({}, request.value))

            error.value = null
            let formData = new FormData(refForm.value)
            const video = formData.get('video').name

            const api = await client.apiForm(request.value, formData, { jsconfig: 'eccn' })
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
                        title: video,
                    }, request.value))

                    const result = {
                        id: storage.createId(),
                        request: Object.assign({}, request.value, { video }),
                        response: r,
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

        function discardResult(result) {
            thread.value.results = thread.value.results.filter(x => x.id != result.id)
            saveThread()
        }

        function toggleIcon(item) {
            threadRef.value.icon = item.url
            saveHistory()
        }

        function onRouteChange() {
            // console.log('onRouteChange', routes.id)
            refUpload.value?.clear()
            loadHistory()
            if (routes.id) {
                const id = parseInt(routes.id)
                thread.value = storage.getThread(storage.getThreadId(id))
                threadRef.value = history.value.find(x => x.id === parseInt(routes.id))
                // console.debug('thread', thread.value, threadRef.value)
                if (thread.value) {
                    Object.keys(storage.defaults).forEach(k =>
                        request.value[k] = thread.value[k] ?? storage.defaults[k])
                }
            } else {
                thread.value = null
                Object.keys(storage.defaults).forEach(k => request.value[k] = storage.defaults[k])
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
            request.value.seed,
            request.value.tag,
        ], () => {
            if (!thread.value) return
            Object.keys(storage.defaults).forEach(k =>
                thread.value[k] = request.value[k] ?? storage.defaults[k])
            saveThread()
        })

        onMounted(async () => {
            updated()
        })

        return {
            refForm,
            refUpload,
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
            toggleIcon,
            selectRequest,
            discardResult,
            getThreadResults,
            saveHistoryItem,
            removeHistoryItem,
            toArtifacts,
            acceptedVideos,
            renderKey,
            ConvertVideoOutputFormat,
        }
    }
}
