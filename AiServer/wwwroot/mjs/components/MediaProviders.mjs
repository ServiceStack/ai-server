import {ref, computed, onMounted, watch, nextTick, toRef, watchEffect} from "vue"
import {leftPart, rightPart} from "@servicestack/client"
import {useClient} from "@servicestack/vue"
import {QueryMediaTypes, GetComfyModels, GetComfyModelMappings} from "dtos"
import {QueryMediaModels} from "../dtos.mjs";

const SelectModels = {
    template: `
    <div>
        <!-- Header with actions -->
        <h4 v-if="availableModels || remoteModels.length" class="flex gap-x-2 justify-between">
            <div>Active Models</div>
            <div class="flex gap-x-2 pr-6">
                <button v-if="providerType?.id === 'ComfyUI' && apiBaseUrl" 
                        @click="refresh" 
                        title="Refresh remote models" 
                        type="button" 
                        :class="btnCls">
                    refresh
                </button>
                <button @click="selectAll" type="button" :class="btnCls">select all</button>
                <button @click="selectNone" type="button" :class="btnCls">select none</button>
            </div>
        </h4>

        <!-- Connection Test & Status -->
        <div v-if="showTestConnection || connectionStatus" class="mt-4 flex items-center gap-x-2">
            <button v-if="showTestConnection" 
                    @click="testConnection" 
                    type="button" 
                    :class="btnCls" 
                    :disabled="isTestingConnection">
                {{ isTestingConnection ? 'Testing...' : 'Test Connection' }}
            </button>
            <div v-if="connectionStatus" 
                 :class="connectionStatus === 'success' ? 'text-green-600' : 'text-red-600'">
                {{ connectionStatus === 'success' ? 'Connection Successful' : 'Connection Failed' }}
            </div>
        </div>

        <!-- Model Selection List -->
        <fieldset class="mt-2" v-if="availableModels">
            <div class="grid grid-cols-1">
                <div v-for="(model, key) in availableModels" 
                     :key="key"
                     class="relative flex items-start py-2">
                    <div class="flex h-6 items-center">
                        <input v-model="selectedModels" 
                               :value="key"
                               :id="'chk-' + key" 
                               type="checkbox" 
                               :disabled="!isModelSelectable(model)"
                               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600
                                      disabled:opacity-50 disabled:cursor-not-allowed">
                    </div>
                    <div class="ml-3 text-sm leading-6">
                        <label :for="'chk-' + key" 
                               :class="{'opacity-50': !isModelSelectable(model)}"
                               class="font-medium text-gray-900">
                             {{model.commonNames}}
                        </label>
                        <div class="flex gap-x-2 text-xs text-gray-500">
                            <span>{{ getSupportedTasks(model) }}</span>
                            <span v-if="isModelOnDemand(model)" class="text-blue-600">On Demand</span>
                            <span v-if="!isModelAvailable(key) && isModelOnDemand(model)" class="text-amber-600">
                                Not Available
                            </span>
                        </div>
                        <div class="text-xs text-gray-500">
                            <span>{{ key }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
    `,
    props: {
        providerType: {
            type: Object,
            required: false,
            default: () => ({})
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
    setup(props, { emit }) {
        const client = useClient()
        const remoteModels = ref([])
        const availableModels = ref(null)
        const selectedModels = ref(props.initialSelectedModels)
        const isTestingConnection = ref(false)
        const connectionStatus = ref(null)

        const btnCls = 'rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'

        const showTestConnection = computed(() => {
            return props.providerType?.id === 'ComfyUI' && props.apiBaseUrl
        })

        const transformModelData = (data, providerId = "ComfyUI") => {
            // First pass: Map through all entries to collect commonNames
            const mappedEntries = data.results.map(entry => {
                // Create a copy to avoid mutating the original entry
                const mappedEntry = { ...entry }
                // Initialize commonNames with the entry's id
                mappedEntry.commonNames = entry.id
                return mappedEntry
            })

            // Second pass: Reduce to final structure while merging commonNames
            return mappedEntries.reduce((acc, entry) => {
                if (entry.apiModels && entry.apiModels[providerId]) {
                    const modelName = entry.apiModels[providerId]

                    if (!acc[modelName]) {
                        // First occurrence of this model
                        acc[modelName] = entry
                    } else {
                        // Model exists, update commonNames and check for supportedTasks
                        acc[modelName].commonNames += `, ${entry.id}`

                        // Replace entire entry if current one has supportedTasks and existing one doesn't
                        if (entry.supportedTasks?.[providerId] &&
                            !acc[modelName].supportedTasks?.[providerId]) {
                            const existingCommonNames = acc[modelName].commonNames
                            acc[modelName] = entry
                            acc[modelName].commonNames = existingCommonNames
                        }
                    }
                }
                return acc
            }, {})
        }

        // Check if model is available either remotely or on-demand
        const isModelSelectable = (model) => {
            const modelProviders = Object.keys(model.apiModels)
            const providerId = props.providerType?.id
            if(modelProviders.length === 0 || !modelProviders.includes(providerId)) {
                return false
            }
            const modelName = model.apiModels[providerId]
            return isModelOnDemand(model) || isModelAvailable(modelName)
        }
        
        const isModelOnDemand = (model) => {
            if(!model.onDemand) return false
            if(!props.providerType) return false
            if(!props.providerType.id) return false
            return model.onDemand && model.onDemand[props.providerType.id]
        }

        // Check if model is available in remote system
        const isModelAvailable = (modelName) => {
            if(props.providerType?.id === 'ComfyUI') {
                return remoteModels.value.includes(modelName)
            }
            return true
        }
        
        const getSupportedTasks = (model) => {
            if (model.supportedTasks && model.supportedTasks[props.providerType.id] != null) {
                return model.supportedTasks[props.providerType.id].join(', ')
            }
            return model.modelType
        }

        async function testConnection() {
            isTestingConnection.value = true
            connectionStatus.value = null
            const res = await client.api(new GetComfyModels({
                apiBaseUrl: props.apiBaseUrl,
                apiKey: props.apiKey
            }))
            isTestingConnection.value = false
            connectionStatus.value = res.succeeded ? 'success' : 'failure'
            if (res.succeeded) {
                remoteModels.value = res.response.results
            }
            return res.succeeded
        }

        async function refresh() {
            // Get remote models if ComfyUI
            if (props.providerType?.id === 'ComfyUI' && props.apiBaseUrl) {
                await testConnection()
            }

            // Get available models from API
            const mediaModels = await client.api(new QueryMediaModels({
                providerId: props.providerType?.id
            }))

            if (mediaModels.succeeded) {
                availableModels.value = transformModelData(
                    mediaModels.response,
                    props.providerType?.id
                )
            }
        }

        function selectAll() {
            if (!availableModels.value) return

            selectedModels.value = Object.entries(availableModels.value)
                .filter(([key, model]) => isModelSelectable(model))
                .map(([key]) => key)
        }

        function selectNone() {
            selectedModels.value = []
        }

        // Watch for changes
        watch(() => selectedModels.value, () => {
            emit('update:selectedModels', selectedModels.value)
        })

        watch(() => props.apiBaseUrl, async () => {
            if (props.apiBaseUrl) {
                await refresh()
            }
        })

        // Initial load
        onMounted(refresh)

        return {
            btnCls,
            selectedModels,
            remoteModels,
            availableModels,
            refresh,
            selectAll,
            selectNone,
            isTestingConnection,
            connectionStatus,
            showTestConnection,
            getSupportedTasks,
            testConnection,
            isModelSelectable,
            isModelAvailable,
            isModelOnDemand
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