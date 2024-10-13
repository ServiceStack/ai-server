import { ref, computed, onMounted, inject, watch, nextTick } from "vue"
import { useClient, useFiles } from "@servicestack/vue"
import { createErrorStatus } from "@servicestack/client"
import { ImageToText, ActiveMediaModels } from "dtos"
import { UiLayout, ThreadStorage, HistoryTitle, HistoryGroups, useUiLayout, icons, Img } from "../utils.mjs"
import FileUpload from "./FileUpload.mjs"

export default {
    components: {
        UiLayout,
        HistoryTitle,
        HistoryGroups,
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
                                        <FileUpload ref="refImage" id="image" v-model="request.image" required
                                            accept=".webp,.jpg,.jpeg,.png,.gif" @change="renderKey++">
                                            <template #title>
                                                <span class="font-semibold text-green-600">Click to upload</span> or drag and drop
                                            </template>
                                            <template #icon>
                                                <svg class="mb-2 h-12 w-12 text-green-500 inline" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true" data-phx-id="m9-phx-F_34be7KYfTF66Xh">
                                                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </template>
                                        </FileUpload>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div class="mt-4 mb-8 flex justify-center">
                            <PrimaryButton :key="renderKey" type="submit" :disabled="!validPrompt()">
                                <svg class="-ml-0.5 h-6 w-6 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>
                                <span class="text-base font-semibold">Upload</span>
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
            
            <div  class="pb-20">
                
                <div v-if="client.loading.value" class="mt-8 mb-20 flex justify-center items-center">
                    <Loading class="text-gray-300 font-normal" imageClass="w-7 h-7 mt-1.5">processing image...</Loading>
                </div>                                

                <div v-for="result in getThreadResults()" class="w-full ">
                    <div class="flex items-center justify-between">
                        <span class="my-4 flex justify-center items-center text-xl underline-offset-4">
                            <img class="w-5 h-5 mr-2" :src="storage.getIcon(result.iconKey) ?? icons.image">
                            <span>{{ result.request.image }}</span>
                        </span>
                        <div class="group flex cursor-pointer" @click="discardResult(result)">
                            <div class="ml-1 invisible group-hover:visible">discard</div>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M12 12h2v12h-2zm6 0h2v12h-2z"></path><path fill="currentColor" d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z"></path></svg>
                        </div>
                    </div>   
                    <div>
                        <div v-for="output in result.response.textOutputs" class="relative border border-indigo-600/25 rounded-lg p-2 mb-4 overflow-hidden">
                            <div class="prose">{{output.text}}</div>
                        </div>
                    </div>                  
                </div>
            </div>        
        </template>
        
        <template #sidebar>
            <HistoryTitle :prefix="storage.prefix" />
            <HistoryGroups :history="history" v-slot="{ item }" @save="saveHistoryItem($event)" @remove="removeHistoryItem($event)">
                <Icon class="h-5 w-5 rounded-full flex-shrink-0 mr-1" :src="storage.getIcon(item.iconKey) ?? icons.image" loading="lazy" :alt="item.model" />
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
        const refImage = ref()
        const ui = useUiLayout(refUi)
        const renderKey = ref(0)
        const { filePathUri, getExt, extSrc, svgToDataUri } = useFiles()

        const storage = new ThreadStorage(`img2img`, {
            tag: '',
        })
        const error = ref()
        
        const prefs = ref(storage.getPrefs())
        const history = ref(storage.getHistory())
        const thread = ref()
        const threadRef = ref()

        const validPrompt = () => refForm.value?.image?.files?.length
        const refMessage = ref()
        const visibleFields = 'image'.split(',')
        const request = ref(new ImageToText())
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
            console.log('send', validPrompt(), client.loading.value)
            if (!validPrompt() || client.loading.value) return

            savePrefs()
            console.debug(`${storage.prefix}.request`, Object.assign({}, request.value))

            error.value = null
            let formData = new FormData(refForm.value)
            const image = formData.get('image').name
            
            const api = await client.apiForm(request.value, formData, { jsconfig: 'eccn' })
            /** @type {GenerationResponse} */
            const r = api.response
            if (r) {
                console.debug(`${storage.prefix}.response`, r)

                if (!r.textOutputs?.length) {
                    error.value = createErrorStatus("no results were returned")
                } else {
                    const id = parseInt(routes.id) || storage.createId()
                    thread.value = thread.value ?? storage.createThread(Object.assign({
                        id: storage.getThreadId(id),
                        title: image,
                    }, request.value))

                    const icon = await Img.generateThumbnail(formData.get('image'), [20,20])
                    const iconKey = storage.saveIcon(icon)

                    const result = {
                        id: storage.createId(),
                        iconKey,
                        request: Object.assign({}, request.value, { image }),
                        response: r,
                    }
                    thread.value.results.push(result)
                    saveThread()

                    if (!history.value.find(x => x.id === id)) {
                        history.value.push({
                            id,
                            title: thread.value.title,
                            ext: getExt(image),
                            iconKey,
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
            console.log('onRouteChange', routes.id)
            refImage.value?.clear()
            loadHistory()
            if (routes.id) {
                const id = parseInt(routes.id)
                thread.value = storage.getThread(storage.getThreadId(id))
                threadRef.value = history.value.find(x => x.id === parseInt(routes.id))
                console.debug('thread', thread.value, threadRef.value)
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
        // watch(() => [
        //     request.value.model,
        //     request.value.positivePrompt,
        //     request.value.negativePrompt,
        //     request.value.width,
        //     request.value.height,
        //     request.value.batchSize,
        //     request.value.seed,
        //     request.value.tag,
        // ], () => {
        //     if (!thread.value) return
        //     Object.keys(storage.defaults).forEach(k =>
        //         thread.value[k] = request.value[k] ?? storage.defaults[k])
        //     saveThread()
        // })

        onMounted(async () => {
            const api = await client.api(new ActiveMediaModels())
            if (api.response) {
                activeModels.value = api.response.results
            }
            updated()
        })

        return {
            refForm,
            refImage,
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
            renderKey,
        }
    }
}
