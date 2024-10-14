/*
In the ancient land of Eldoria, where the skies were painted with shades of mystic hues and the forests whispered secrets of old, there existed a dragon named Zephyros. Unlike the fearsome tales of dragons that plagued human hearts with terror, Zephyros was a creature of wonder and wisdom, revered by all who knew of his existence.
*/

import { ref, onMounted, inject, watch, nextTick } from "vue"
import { createErrorStatus, lastRightPart, EventBus } from "@servicestack/client"
import { useClient, useFormatters } from "@servicestack/vue"
import { TextToSpeech, QueryTextToSpeechVoices } from "dtos"
import { UiLayout, ThreadStorage, HistoryTitle, HistoryGroups, useUiLayout, icons, toArtifacts, acceptedImages } from "../utils.mjs"
import { ArtifactGallery } from "./Artifacts.mjs"
import FileUpload from "./FileUpload.mjs"
import ListenButton from "./ListenButton.mjs"
import AudioPlayer from "./AudioPlayer.mjs"

export default {
    components: {
        UiLayout,
        HistoryTitle,
        HistoryGroups,
        ArtifactGallery,
        FileUpload,
        ListenButton,
        AudioPlayer,
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
                                        <TextareaInput inputClass="h-48" id="text" v-model="request.input" />
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <SelectInput id="model" v-model="request.model" :entries="voices" />
                                    </div>
                                    <div class="col-span-6 sm:col-span-1">
                                        <TextInput type="number" id="seed" v-model="request.seed" min="0" />
                                    </div>
                                    <div class="col-span-6 sm:col-span-2">
                                        <TextInput id="tag" v-model="request.tag" placeholder="Tag" />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div class="mt-4 mb-8 flex justify-center">
                            <PrimaryButton :key="renderKey" type="submit" :disabled="!validPrompt()">
                                <span class="text-base font-semibold">Submit</span>
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
            
            <div class="pb-20">
                
                <div v-if="client.loading.value" class="mt-8 mb-20 flex justify-center items-center">
                    <Loading class="text-gray-300 font-normal" imageClass="w-7 h-7 mt-1.5">processing audio...</Loading>
                </div>                                

                <div v-for="result in getThreadResults()" class="mb-6 w-full">
                    <div class="flex items-center justify-between">
                        <span class="my-2 flex justify-center items-center text-lg underline-offset-4">
                            <span>{{ result.request.input }}</span>
                        </span>
                        <div class="group flex cursor-pointer" @click="discardResult(result)">
                            <div class="ml-1 invisible group-hover:visible">discard</div>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M12 12h2v12h-2zm6 0h2v12h-2z"></path><path fill="currentColor" d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z"></path></svg>
                        </div>
                    </div>   
                    
                    <div>
                        <div v-for="output in result.response.outputs" class="flex items-center justify-between">
                            <ListenButton :src="output.url" :title="result.request.input" 
                                @play="playAudio=$event" @pause="playAudio=null" :playing="playingAudio?.src==output.url" />
                            <a :href="output.url + '?download=1'" class="flex items-center text-indigo-600 hover:text-indigo-700">
                                <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5"></path></svg>
                                <div class="">{{output.fileName.length < output.fileName ? 60 : 'download.' + lastRightPart(output.fileName,'.')}}</div>
                            </a>
                        </div>
                    </div>                  
                    
                </div>
            </div>
            
            <div class="fixed bottom-0 max-w-2xl">
                <AudioPlayer ref="refAudio" :bus="bus" :src="playAudio?.src" :title="playAudio?.title" 
                    @playing="playingAudio=$event" @paused="playingAudio=null" />
            </div>
        </template>
        
        <template #sidebar>
            <HistoryTitle :prefix="storage.prefix" />
            <HistoryGroups :history="history" v-slot="{ item }" @save="saveHistoryItem($event)" @remove="removeHistoryItem($event)">
                <Icon class="h-5 w-5 rounded-full flex-shrink-0 mr-1" :src="item.icon ?? icons.subtitle" loading="lazy" :alt="item.model" />
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
        const refAudio = ref()
        const ui = useUiLayout(refUi)
        const renderKey = ref(0)
        const { truncate } = useFormatters()
        const voices = ref([])

        const storage = new ThreadStorage(`txt2spch`, {
            input: '',
            model: '',
            tag: '',
            seed: '',
        })
        const error = ref()

        const prefs = ref(storage.getPrefs())
        const history = ref(storage.getHistory())
        const thread = ref()
        const threadRef = ref()

        const validPrompt = () => !!request.value.input
        const refMessage = ref()
        const visibleFields = 'text'.split(',')
        const request = ref(new TextToSpeech())
        const activeModels = ref([])
        const playAudio = ref()
        const playingAudio = ref()

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
            
            const api = await client.api(request.value, { jsconfig: 'eccn' })
            /** @type {GenerationResponse} */
            const r = api.response
            if (r) {
                console.debug(`${storage.prefix}.response`, r)

                if (!r.outputs?.length) {
                    error.value = createErrorStatus("no results were returned")
                } else {
                    const id = parseInt(routes.id) || storage.createId()
                    const title = truncate(request.value.input, 200)
                    thread.value = thread.value ?? storage.createThread(Object.assign({
                        id: storage.getThreadId(id),
                        title,
                    }, request.value))

                    const result = {
                        id: storage.createId(),
                        request: Object.assign({}, request.value, { input:title }),
                        response: r,
                    }
                    thread.value.results.push(result)
                    saveThread()

                    if (!history.value.find(x => x.id === id)) {
                        history.value.push({
                            id,
                            title: thread.value.title,
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
        watch(() => [
            request.value.model,
            request.value.seed,
            request.value.tag,
        ], () => {
            if (!thread.value) return
            Object.keys(storage.defaults).forEach(k =>
                thread.value[k] = request.value[k] ?? storage.defaults[k])
            saveThread()
        })

        watch(() => playAudio.value, () => {
            nextTick(() => {
                console.debug('playAudio.value', playAudio.value)
                bus.publish('togglePlayAudio')
                if (playAudio.value)
                    refAudio.value?.player.toggle()
            })
        })

        const bus = new EventBus()
        
        onMounted(async () => {
            updated()
            const api = await client.api(new QueryTextToSpeechVoices())
            voices.value = api.response?.results.map(x => ({ key:x.model, value:x.id })) ?? []
            request.value.model = voices.value?.[0]?.key
        })

        return {
            bus,
            refForm,
            refImage,
            refAudio,
            storage,
            routes,
            client,
            history,
            request,
            voices,
            visibleFields,
            validPrompt,
            refMessage,
            activeModels,
            thread,
            threadRef,
            playAudio,
            playingAudio,
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
            acceptedImages,
            lastRightPart,
            renderKey,
        }
    }
}
