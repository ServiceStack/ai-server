import { ref, computed, watch, onMounted } from "vue"
import { useClient } from "@servicestack/vue"
import { createErrorStatus } from "@servicestack/client"
import { ActiveAiModels, QueryPrompts, OpenAiChatCompletion } from "dtos"

export default {
    template:`
    <div v-if="system">
        <button @click="prefs.show=!prefs.show" type="button" class="-ml-3 bg-white text-gray-600 hover:text-gray-900 group w-full flex items-center pr-2 py-2 text-left text-sm font-medium">
            <svg v-if="prefs.show" class="text-gray-400 rotate-90 mr-0.5 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 6L14 10L6 14V6Z" fill="currentColor"></path></svg>
            <svg v-else class="text-gray-300 mr-0.5 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 6L14 10L6 14V6Z" fill="currentColor"></path></svg>
            AI Prompt Generator 
        </button>
        <div v-if="prefs.show">
            <form class="grid grid-cols-6 gap-4" @submit.prevent="send()" :disabled="!validPrompt">
                <div class="col-span-6 sm:col-span-2">
                    <TextInput id="subject" v-model="prefs.subject" label="subject" placeholder="Use AI to generate image prompts for..." />
                </div>
                <div class="col-span-6 sm:col-span-2">
                   <Autocomplete id="model" :options="models" v-model="prefs.model" label="model"
                        :match="(x, value) => x.toLowerCase().includes(value.toLowerCase())"
                        class="z-20"
                        placeholder="Select Model...">
                        <template #item="name">
                            <div class="flex items-center">
                                <Icon class="h-6 w-6 flex-shrink-0" :src="'/icons/models/' + name" loading="lazy" />
                                <span class="ml-3 truncate">{{name}}</span>
                            </div>
                        </template>
                    </Autocomplete>                
                </div>
                <div class="col-span-6 sm:col-span-1">
                    <TextInput type="number" id="count" v-model="prefs.count" label="count" min="1" />
                </div>
                <div class="col-span-6 sm:col-span-1 align-bottom">
                    <div>&nbsp;</div>
                    <PrimaryButton :disabled="!validPrompt">Generate</PrimaryButton>
                </div>
            </form>
            <Loading v-if="client.loading.value">Asking {{prefs.model}}...</Loading>
            <ErrorSummary v-else-if="error" :status="error" />
            <div v-else-if="prefs.results.length" class="mt-4">
                <div v-for="result in prefs.results" @click="$emit('selected',result)" class="message mb-2 cursor-pointer rounded-lg inline-flex justify-center rounded-lg text-sm py-3 px-4 bg-gray-50 text-slate-900 ring-1 ring-slate-900/10 hover:bg-white/25 hover:ring-slate-900/15">
                    {{result}}
                </div>
            </div>
        </div>
    </div>
    `,
    emits:['save','selected'],
    props: {
        thread: Object,
        promptId: String,
        systemPrompt: String,
    },
    setup(props, { emit }) {
        const client = useClient()
        const request = ref(new OpenAiChatCompletion({ }))
        const system = ref(props.systemPrompt)
        const defaults = {
            show: false,
            subject: '',
            model: '',
            count: 3,
            results: [],
        }
        const prefs = ref(Object.assign({}, defaults, props.thread?.generator))
        const error = ref()
        const models = ref([])
        const validPrompt = computed(() => prefs.value.subject && prefs.value.model && prefs.value.count)
        
        watch(() => props.thread, () => {
            Object.assign(prefs.value, defaults, props.thread?.generator)
            console.log('watch', prefs.value)
        })
        
        function savePrefs() {
            if (props.thread) props.thread.generator = prefs
            emit('save', prefs)
        }

        if (!system.value && props.promptId) {
            onMounted(async () => {
                const apiPrompt = await client.api(new QueryPrompts({
                    id: props.promptId
                }))
                system.value = apiPrompt?.response?.results?.[0]

                const api = await client.api(new ActiveAiModels())
                models.value = await api.response.results
                models.value.sort((a,b) => a.localeCompare(b))
            })
        }

        async function send() {
            if (!validPrompt.value) return
            savePrefs()

            const content = `Provide ${prefs.value.count} great descriptive prompts to generate images of ${prefs.value.subject} in Stable Diffusion SDXL and Mid Journey. Respond with only the prompts in a JSON array. Example ["prompt1","prompt2"]`

            const msgs = [
                { role:'system', content:system.value },
                { role:'user', content },
            ]

            const request = new OpenAiChatCompletion({
                tag: "admin",
                model: prefs.value.model,
                messages: msgs,
                temperature: 0.7,
                maxTokens: 2048,
            })
            error.value = null
            const api = await client.api(request)
            error.value = api.error
            if (api.response) {
                let json = api.response?.choices[0]?.message?.content?.trim() ?? ''
                console.debug(api.response)
                if (json) {
                    prefs.value.results = []
                    const docPrefix = '```json'
                    if (json.startsWith(docPrefix)) {
                        json = json.substring(docPrefix.length, json.length - 3)
                    }
                    try {
                        console.log('json', json)
                        const obj = JSON.parse(json)
                        if (Array.isArray(obj)) {
                            prefs.value.results = obj
                        }
                    } catch(e) {
                        console.warn('could not parse json', e, json)
                    }
                }
                if (!prefs.value.results.length) {
                    error.value = createErrorStatus('Could not parse prompts')
                } else {
                    savePrefs()
                }
            }
        }

        return { client, system, request, prefs, models, error, validPrompt, send }
    }
}
