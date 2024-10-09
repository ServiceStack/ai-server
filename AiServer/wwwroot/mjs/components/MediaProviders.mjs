import {ref, computed, onMounted, watch, nextTick, toRef, watchEffect} from "vue"
import {leftPart, rightPart} from "@servicestack/client"
import {useClient} from "@servicestack/vue"
import {QueryMediaTypes, GetComfyModels, GetComfyModelMappings} from "dtos"

const SelectModels = {
    template: `
    <h4 v-if="providerModels.length || comfyModelMappings" class="flex gap-x-2 justify-between">
        <div>Active Models</div>
        <div class="flex gap-x-2 pr-6">
            <button v-if="providerType?.id == 'ComfyUI' && apiBaseUrl" @click="refresh" title="Refresh" type="button" :class="btnCls">
                refresh
            </button>
            <button @click="selectAll" type="button" :class="btnCls">select all</button>
            <button @click="selectNone" type="button" :class="btnCls">select none</button>
        </div>
    </h4>
    <div v-if="showTestConnection || connectionStatus" class="mt-4 flex items-center gap-x-2">
        <button v-if="showTestConnection" @click="testConnection" type="button" :class="btnCls" :disabled="isTestingConnection">
            {{ isTestingConnection ? 'Testing...' : 'Test Connection' }}
        </button>
        <div v-if="connectionStatus" :class="connectionStatus === 'success' ? 'text-green-600' : 'text-red-600'">
            {{ connectionStatus === 'success' ? 'Connection Successful' : 'Connection Failed' }}
        </div>
    </div>
    <fieldset class="mt-2" v-if="supportedModels?.length > 0">
      <div class="grid grid-cols-1">
        <div v-for="model in supportedModels" class="relative flex items-start" v-if="qualifiedModelMappings">
          <div class="flex h-6 items-center">
            <input v-model="selectedModels" :value="qualifiedModelMappings[model]" :id="'chk-' + model" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
          </div>
          <div class="ml-3 text-sm leading-6">
            <label :for="'chk-' + model" class="font-medium text-gray-900">{{model}} - ({{qualifiedModelMappings[model]}})</label>
          </div>
        </div>
      </div>
      </fieldset>                     
    `,
    props: {
        providerType: {
            type: Object,
            required: false,
            default: () => ({})
        },
        providerModels: {
            type: Array,
            default: () => []
        },
        apiBaseUrl: String,
        apiKey: String,
        apiKeyHeader: String,
        initialSelectedModels: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update:selectedModels'],
    setup(props, {emit}) {
        const client = useClient()
        const comfyModelsUrl = ref('')
        const comfyModels = ref([])
        const supportedModels = ref([])
        const comfyModelMappings = ref({})
        const qualifiedModelMappings = ref({})
        const selectedModels = ref(props.initialSelectedModels)
        const isConnectionTested = ref(false)
        const isTestingConnection = ref(false)
        const connectionStatus = ref(null)
        const btnCls = 'rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'

        const showTestConnection = computed(() => {
            return props.providerType?.id === 'ComfyUI' && props.apiBaseUrl
        })

        async function testConnection() {
            isTestingConnection.value = true
            connectionStatus.value = null
            let res = await client.api(new GetComfyModels({apiBaseUrl: props.apiBaseUrl, apiKey: props.apiKey}))
            isTestingConnection.value = false
            connectionStatus.value = res.succeeded ? 'success' : 'failure'
            if (res.succeeded) {
                comfyModels.value = res.response.results
            }
            return res.succeeded
        }

        function truncateModelName(name) {
            if (name.length <= 12) return name
            return name.slice(0, 12) + '...'
        }

        watch(() => selectedModels.value, () => {
            emit('update:selectedModels', selectedModels.value)
        })

        watch(() => props.apiBaseUrl, async () => {
            if (props.apiBaseUrl && comfyModelsUrl.value !== props.apiBaseUrl) {
                await refresh()
            }
        })

        onMounted(async () => {
            //isConnectionTested.value = false
            await refresh()
        })

        async function refresh() {
            if (props.providerType?.id === 'ComfyUI' && props.apiBaseUrl) {
                const apiComfy = await client.api(new GetComfyModels({
                    apiBaseUrl: props.apiBaseUrl,
                    apiKey: props.apiKey
                }))
                if (apiComfy.succeeded) {
                    comfyModelsUrl.value = props.apiBaseUrl
                    comfyModels.value = apiComfy.response.results
                }
                const apiModelMaps = await client.api(new GetComfyModelMappings());
                // console.log("apiModelMaps", apiModelMaps)
                if (apiModelMaps.succeeded) {
                    comfyModelMappings.value = apiModelMaps.response.models
                    supportedModels.value = Object.values(apiModelMaps.response.models, [])
                    // flip the object so we can look up the key by value
                    qualifiedModelMappings.value = Object.keys(apiModelMaps.response.models).reduce((acc, key) => {
                        acc[apiModelMaps.response.models[key]] = key
                        return acc
                    }, {})
                }
                return;
            } else {
                if (props.providerType?.apiModels) {
                    console.log(props.providerType?.apiModels)
                    supportedModels.value = Object.keys(props.providerType?.apiModels, [])
                    qualifiedModelMappings.value = props.providerType?.apiModels
                }
            }
            comfyModels.value = []
            isConnectionTested.value = false
        }

        function selectAll() {
            if (comfyModels.value.length > 0) {
                // Populate selectedModels with all models present in comfyModels that exist in comfyModelMapping values
                // And populate selectedModels with the key in comfyModelMappings that matches the value in comfyModels
                // comfyModelMappings is an object with the key of the specific model name in comfyModels and value of the 
                // "qualified" model name that we want to display in the UI
                console.log("comfyModelMappings.value", comfyModelMappings.value)
                console.log("comfyModels.value", comfyModels.value)
                let allModels = Object.keys(comfyModelMappings.value, [])
                let modelsAvailable = comfyModels.value
                selectedModels.value = modelsAvailable.filter(model => allModels.includes(model))
                console.log("selectedModels.value", selectedModels.value)
            } else {
                selectedModels.value = props.providerModels
            }
        }

        function selectNone() {
            selectedModels.value = []
        }

        return {
            btnCls,
            selectedModels,
            comfyModels,
            supportedModels,
            comfyModelMappings,
            qualifiedModelMappings,
            refresh,
            selectAll,
            selectNone,
            truncateModelName,
            isConnectionTested,
            isTestingConnection,
            connectionStatus,
            showTestConnection,
            testConnection
        }
    }
}

export default {
    components: {
        SelectModels,
    },
    template: `
        <AutoQueryGrid ref="grid" :type="type" selectedColumns="id,enabled,name,type,mediaTypeId,apiKey,models"
            :visibleFrom="{ id:'never', enabled:'never', mediaTypeId:'never'}" modelTitle="Generation Provider" @nav="onNav">
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
            <template #type="{ type }">
                <div :title="JSON.stringify(type,undefined,4)" class="flex items-center">
                    <Icon :src="type.icon" class="w-4 h-4 mr-2" />
                    <div>{{ type.name }}</div>
                </div>
            </template>
            <template #models="{ models }">
                <div :title="JSON.stringify(models||[],undefined,4).replace(/\\x22/g,'')">
                    <span class="text-gray-900">{{ models?.length ?? 0 }}x</span>
                    <span class="ml-1">{{ (models ?? []).slice(0,4).join(', ') + (models?.length > 4 ? '...' : '') }}</span>
                </div>
            </template>
            <template #formheader="{ form, formInstance, apis }">
              <div v-if="form == 'create'" class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4 px-4">
                <label v-for="type in apiTypes" :aria-label="type.name" 
                    :class="[providerType == type ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300', 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
                  <input v-model="providerType" type="radio" name="providerType.id" :value="type.id" class="sr-only">
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
            <template #formfooter="{ form, formInstance, apis, model, editId, updateModel }">
                <div class="pl-6">
                <SelectModels 
                    v-if="formModel"
                    :providerType="providerTypes[formModel?.mediaTypeId]"
                    :providerModels="allProviderModels[formModel?.mediaTypeId]"
                    :apiBaseUrl="formModel?.apiBaseUrl"
                    :apiKey="formModel?.apiKey"
                    :apiKeyHeader="formModel?.apiKeyHeader"
                    :initialSelectedModels="formModel?.models"
                    @update:selected-models="(newSelectedModels) => updateSelected(formModel,newSelectedModels,updateModel)" 
                    />
                </div>
            </template>
        </AutoQueryGrid>
    `,
    setup() {
        const client = useClient()
        const grid = ref()
        const providerType = ref()
        const apiTypes = ref([])
        const providerModels = ref([])
        const allProviderModels = ref({})
        const comfyModels = ref([])
        const selectedModels = ref([])
        const providerTypes = ref({})
        const formModel = computed(() => (grid.value?.createForm ?? grid.value?.editForm)?.model)

        onMounted(async () => {
            const api = await client.api(new QueryMediaTypes())
            if (api.succeeded) {
                apiTypes.value = api.response?.results ?? []
                apiTypes.value.forEach(apiType => {
                    providerTypes.value[apiType.id] = apiType
                    allProviderModels.value[apiType.id] = Object.keys(apiType.apiModels || {})
                })
                console.log(Object.assign({},providerTypes.value))
                console.log(Object.assign({},allProviderModels.value))
            }
        })

        function updateSelected(model, newSelectedModels, updateModel) {
            model.models = newSelectedModels;
            if (updateModel) {
                updateModel(model)
            }
        }

        function onNav(qs) {
            const keys = Object.keys(qs)
            console.log('onNav', keys)
            if (keys.includes('create')) {
                providerType.value = null
                selectedModels.value = []
                providerModels.value = []
            }
        }

        watch(() => providerType.value, () => {
            if (!providerTypes.value[providerType.value]) return
            let providerTypeDefaults = providerTypes.value[providerType.value]
            const apiBaseUrl = providerTypeDefaults.apiBaseUrl ?? ''
            const name = providerTypeDefaults.name ?? ''
            const apiKeyHeader = providerTypeDefaults.apiKeyHeader ?? ''
            const apiKey = providerTypeDefaults.apiKey ?? ''
            const models = Object.keys(providerTypeDefaults.apiModels || {}) ?? []
            providerModels.value = models;
            grid.value?.createForm?.setModel({
                name: name,
                apiBaseUrl: apiBaseUrl,
                priority: 0,
                enabled: true,
                apiKeyHeader: apiKeyHeader,
                apiKey: apiKey,
                mediaTypeId: providerType.value,
                models: models,
                concurrency: 1,
            })
        })

        return {
            grid, apiTypes, providerTypes, providerType, providerModels, formModel, selectedModels,
            allProviderModels, updateSelected, onNav
        }
    }
}