import { ref, computed, onMounted, watch, nextTick } from "vue"
import { leftPart, rightPart } from "@servicestack/client"
import { useClient } from "@servicestack/vue"
import { QueryAiTypes, GetOllamaModels } from "dtos"

const SelectModels = {
    template:`
    <h4 v-if="providerModels.length" class="flex gap-x-2 justify-between">
        <div>Active Models</div>
        <div class="flex gap-x-2 pr-6">
            <button v-if="aiTypeId=='Ollama' && edit.apiBaseUrl" @click="refresh" title="Refresh" type="button" :class="btnCls">
                refresh
            </button>
            <button @click="selectAll" type="button" :class="btnCls">select all</button>
            <button @click="selectNone" type="button" :class="btnCls">select none</button>
        </div>
    </h4>
    <input type="hidden" id="selectedModels" :value="selectedModels.join(',')">
    <fieldset class="mt-2">
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
        <div v-for="model in providerModels" class="relative flex items-start">
          <div class="flex h-6 items-center">
            <input v-model="selectedModels" :value="model" :id="'chk-' + model" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
          </div>
          <div class="ml-3 text-sm leading-6">
            <label :for="'chk-' + model" class="font-medium text-gray-900">{{model}}</label>
          </div>
        </div>
      </div>
    </fieldset>                        
    `,
    props: {
        aiTypeId: String,
        edit: Object,
    },
    emits:['update:modelValue'],
    setup(props, { emit }) {
        const client = useClient()
        const aiTypes = ref([])
        const ollamaModelsUrl = ref('')
        const ollamaModels = ref([])
        const selectedModels = ref([])
        const btnCls = 'rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        const providerModels = computed(() => {
            const aiType = aiTypes.value.find(x => x.id === props.aiTypeId)
            // console.log('aiType', aiType, props.aiTypeId, aiTypes.value.length, ollamaModels.value.length)
            if (!aiType) return []
            if (aiType.id === 'Ollama') {
                return ollamaModels.value
            }
            return Object.keys(aiType?.apiModels || {})
        })

        onMounted(async () => {
            // console.log('SelectModels.onMounted', props.edit.selectedModels, props.edit.apiBaseUrl)
            const api = await client.api(new QueryAiTypes())
            if (api.succeeded) {
                aiTypes.value = api.response?.results ?? []
            }

            await refresh()
            if (props.edit.selectedModels?.length) {
                selectedModels.value = props.edit.selectedModels ?? []
            }
        })
        
        watch(() => selectedModels.value, () => {
            // console.log('selectedModels.value', props.edit.selectedModels, selectedModels.value)
            props.edit.selectedModels = selectedModels.value
            emit('update:modelValue', props.edit) 
        })
        
        watch(async () => props.edit.apiBaseUrl, async () => {
            // console.log('edit.apiBaseUrl', props.edit.id, props.aiTypeId, props.edit.apiBaseUrl, props.edit)
            if (props.edit.apiBaseUrl && ollamaModelsUrl.value !== props.edit.apiBaseUrl) {
                await refresh()
            }
        })
        
        async function refresh() {
            if (props.aiTypeId === 'Ollama' && props.edit.apiBaseUrl) {
                const apiOllama = await client.api(new GetOllamaModels({ apiBaseUrl:props.edit.apiBaseUrl }))
                if (apiOllama.succeeded) {
                    ollamaModelsUrl.value = props.edit.apiBaseUrl
                    ollamaModels.value = apiOllama.response.results.map(x => x.model)
                    return
                }
            }
            ollamaModels.value = []
        }
        function selectAll() {
            selectedModels.value = providerModels.value
        }
        function selectNone() {
            selectedModels.value = []
        }
        
        return { btnCls, selectedModels, providerModels, refresh, selectAll, selectNone }
    }
}

export default {
    components: {
        SelectModels,  
    },
    template:`
        <AutoQueryGrid ref="grid" :type="type" selectedColumns="id,enabled,name,aiTypeId,apiKey,models"
            :visibleFrom="{ id:'never', enabled:'never'}" modelTitle="Provider" @nav="onNav">
            <template #name="{ id, name, enabled }">
                <div class="flex">
                    <svg v-if="enabled" class="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5a5 5 0 0 0-5-5m0 8a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3a3 3 0 0 1-3 3"/></svg>
                    <svg v-else class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 6H7c-3.31 0-6 2.69-6 6s2.69 6 6 6h10c3.31 0 6-2.69 6-6s-2.69-6-6-6m0 10H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h10c2.21 0 4 1.79 4 4s-1.79 4-4 4M7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3"/></svg>
                    <div class="ml-1">{{name}}</div>
                </div>
            </template>
            <template #apiKey="{ apiKey }">
                <span v-if="apiKey">{{ apiKey.substring(0,3) + '***' + apiKey.substring(apiKey.length-3) }}</span>
            </template>
            <template #aiTypeId="{ aiType }">
                <div :title="JSON.stringify(aiType,undefined,4)" class="flex items-center">
                    <Icon :src="aiType.icon" class="w-4 h-4 mr-2" />
                    <div>{{ aiType.id }}</div>
                </div>
            </template>
            <template #models="{ models }">
                <div :title="JSON.stringify(models?.map(x => x.model)||[],undefined,4).replace(/\\x22/g,'')">
                    <span class="text-gray-900">{{ models?.length ?? 0 }}x</span>
                    <span class="ml-1">{{ (models ?? []).map(x => x.model).slice(0,4).join(', ') + (models?.length > 4 ? '...' : '') }}</span>
                </div>
            </template>
            <template #formheader="{ form, formInstance, apis }">
              <div v-if="form == 'create'" class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4 px-4">
                <label v-for="type in aiTypes" :aria-label="type.name" 
                    :class="[providerType == type ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300', 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
                  <input v-model="providerType" type="radio" name="aiTypeId" :value="type.id" class="sr-only">
                  <span class="flex flex-1">
                    <Icon :src="type.icon" class="w-5 h-5 mr-2" />
                    <span class="flex flex-col">
                      <span class="block text-sm font-medium text-gray-900">{{type.id}}</span>
                    </span>
                  </span>
                  <svg v-if="providerType == type.id" class="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                  </svg>
                  <span :class="[providerType == type.id ? 'border-indigo-600' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg border-2']" aria-hidden="true"></span>
                </label>
              </div>
            </template>
            <template #formfooter="{ form, formInstance, apis, type, model, id, updateModel }">
                <div class="pl-6">
                    <SelectModels v-if="model" :aiTypeId="model?.aiTypeId" :edit="model" @update:modelValue="updateModel(model)" />
                    <SelectModels v-else-if="formModel" :aiTypeId="providerType" :edit="formInstance.model" @update:modelValue="formInstance.setModel" />
                </div>
            </template>
        </AutoQueryGrid>
    `,
    setup() {
        const client = useClient()
        const grid = ref()
        const providerType = ref()
        const aiTypes = ref([])
        const providerModels = ref([])
        const ollamaModels = ref([])
        const selectedModels = ref([])
        const providerBaseUrls = {}
        const formModel = computed(() => (grid.value?.createForm ?? grid.value?.editForm)?.model)
        let isEdit = false

        onMounted(async () => {
            const api = await client.api(new QueryAiTypes())
            if (api.succeeded) {
                aiTypes.value = api.response?.results ?? []
                aiTypes.value.forEach(aiType => {
                    providerBaseUrls[aiType.id] = aiType.apiBaseUrl ?? 'http://localhost:11434'
                })
            }
        })
    
        function onNav(qs) {
            const keys = Object.keys(qs)
            console.log('onNav',keys)
            isEdit = false
            if (keys.includes('create')) {
                providerType.value = null
                providerModels.value = []
                selectedModels.value = []
            } else if (keys.includes('edit')) {
                isEdit = true
                setTimeout(() => {
                    providerType.value = formModel.value?.aiTypeId
                },1000)
            }
        }
    
        watch(() => providerType.value, () => {
            if (formModel.value?.selectedModels) return
            const apiBaseUrl = providerBaseUrls[providerType.value] ?? ''
            const name = providerType.value === 1
                ? leftPart(leftPart(leftPart(rightPart(apiBaseUrl,'://'), '/'), ':'), '.')
                : aiTypes.value.find(x => x.id === providerType.value)?.name ?? ''
            grid.value?.createForm?.setModel({
                name: name,
                apiBaseUrl: apiBaseUrl,
                priority: 0,
                enabled: true
            })
        })
    
        return { grid, aiTypes, providerType, formModel, selectedModels, onNav }
    }
}