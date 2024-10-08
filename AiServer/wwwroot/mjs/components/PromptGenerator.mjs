import { ref, computed, onMounted } from "vue"
import { useClient } from "@servicestack/vue"
import { createErrorStatus } from "@servicestack/client"
import { ActiveAiModels, QueryPrompts, OpenAiChatCompletion } from "dtos"

export default {
    template:`
    <div v-if="system">
        <button @click="show=!show" type="button" class="-ml-3 bg-white text-gray-600 hover:text-gray-900 group w-full flex items-center pr-2 py-2 text-left text-sm font-medium">
            <svg v-if="show" class="text-gray-400 rotate-90 mr-0.5 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 6L14 10L6 14V6Z" fill="currentColor"></path></svg>
            <svg v-else class="text-gray-300 mr-0.5 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 6L14 10L6 14V6Z" fill="currentColor"></path></svg>
            AI Prompt Generator 
        </button>
        <div v-if="show">
            <form class="grid grid-cols-6 gap-4" @submit.prevent="send()" :disabled="!validPrompt">
                <div class="col-span-6 sm:col-span-2">
                    <TextInput id="subject" v-model="subject" label="subject" placeholder="Use AI to generate image prompts for..." />
                </div>
                <div class="col-span-6 sm:col-span-2">
                   <Autocomplete id="model" :options="models" v-model="model" label="model"
                        :match="(x, value) => x.toLowerCase().includes(value.toLowerCase())"
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
                    <TextInput type="number" id="count" v-model="count" label="count" min="1" />
                </div>
                <div class="col-span-6 sm:col-span-1 align-bottom">
                    <div>&nbsp;</div>
                    <PrimaryButton :disabled="!validPrompt">Generate</PrimaryButton>
                </div>
            </form>
            <Loading v-if="client.loading.value">Asking {{model}}...</Loading>
            <ErrorSummary v-else-if="error" :status="error" />
            <div v-else-if="results.length" class="mt-4">
                <div v-for="result in results" @click="$emit('selected',result)" class="message mb-2 cursor-pointer rounded-lg inline-flex justify-center rounded-lg text-sm py-3 px-4 bg-gray-50 text-slate-900 ring-1 ring-slate-900/10 hover:bg-white/25 hover:ring-slate-900/15">
                    {{result}}
                </div>
            </div>
        </div>
    </div>
    `,
    emits:['selected'],
    props: {
        promptId: String,
        systemPrompt: String,
    },
    setup(props) {
        const client = useClient()
        const request = ref(new OpenAiChatCompletion({ }))
        const system = ref(props.systemPrompt)
        const subject = ref('')
        const defaults = {
            show: false,
            model: 'gemini-flash',
            count: 3,
        }
        const prefsKey = 'img2txt.gen.prefs'
        const prefs = JSON.parse(localStorage.getItem(prefsKey) ?? JSON.stringify(defaults))
        const show = ref(prefs.show)
        const count = ref(prefs.count)
        const model = ref(prefs.model)
        const error = ref()
        const models = ref([])
        const results = ref([])
        const validPrompt = computed(() => subject.value && model.value && count.value)
        
        function savePrefs() {
            prefs.show = show.value
            prefs.model = model.value
            prefs.count = count.value
            localStorage.setItem(prefsKey, JSON.stringify(prefs))
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

            const content = `Provide ${count.value} great descriptive prompts to generate images of ${subject.value} in Stable Diffusion SDXL and Mid Journey. Respond with only the prompts in a JSON array. Example ["prompt1","prompt2"]`

            const msgs = [
                { role:'system', content:system.value },
                { role:'user', content },
            ]

            const request = new OpenAiChatCompletion({
                tag: "admin",
                model: model.value,
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
                    results.value = []
                    const docPrefix = '```json'
                    if (json.startsWith(docPrefix)) {
                        json = json.substring(docPrefix.length, json.length - 3)
                    }
                    try {
                        console.log('json', json)
                        const obj = JSON.parse(json)
                        if (Array.isArray(obj)) {
                            results.value = obj
                        }
                    } catch(e) {
                        console.warn('could not parse json', e, json)
                    }
                }
                if (!results.value.length) {
                    error.value = createErrorStatus('Could not parse prompts')
                }
            }
        }

        return { client, system, request, show, subject, count, models, model, error, results, validPrompt, send }
    }
}
