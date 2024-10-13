import { computed, inject, onUnmounted, ref, nextTick } from 'vue'
import { errorResponse, humanize, lastLeftPart, lastRightPart, omit, toPascalCase } from '@servicestack/client'
import { useConfig, useFiles } from '@servicestack/vue'

export default {
    template:`
<div>
  <div class="flex items-center justify-center w-full">
    <label :for="id"
      :class="[isDragging ? 'border-blue-500' : 'border-gray-300 border-dashed', 'relative flex flex-col items-center justify-center w-full h-64 border-2 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100']"
      @dragenter="isDragging = true"
      @dragleave="isDragging = false"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <slot v-if="$slots.default"></slot>
      <div v-else class="flex flex-col items-center justify-center">
        <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <p class="mb-2 text-sm text-gray-500">
            <span v-if="instructions">{{instructions}}</span>
            <template v-else>
                <span class="font-semibold">Click to upload</span> or drag and drop
            </template>
        </p>
        <p class="text-xs text-gray-500">{{ acceptLabel ?? grammarList(accept?.split(',').map(x => x.replace('.','').toUpperCase())) }}</p>
      </div>
      <input ref="input" type="file" :multiple="multiple"
            :name="id"
            :id="id"
            class="hidden"
            :placeholder="usePlaceholder"
            :aria-invalid="errorField != null"
            :aria-describedby="id + '-error'"
            :accept="accept"
            v-bind="$attrs"
            @change="onChange">

        <div v-if="!multiple">
            <div v-if="src" class="absolute top-8 left-8 shrink-0 cursor-pointer" :title="!isDataUri(src) ? src : ''">
                <img @click="openFile" :class="['h-48 w-48', imgCls(src)]" :alt="'Current ' + (useLabel??'')"
                    :src="fallbackSrc || assetsPathResolver(src)"
                    @error="onError">
            </div>
        </div>
            
    </label>
  </div>
    <div>
        <p v-if="errorField" class="mt-2 flex text-sm text-red-500" :id="id + '-error'">
            <svg class="mr-1 h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            {{ errorField }}
        </p>
        <p v-else-if="help" class="mt-2 text-sm text-gray-500" :id="id + '-description'">{{ help }}</p>
    </div>
    <div v-if="multiple" class="mt-3">
        <table class="w-full">
            <tr v-for="file in fileList">
                <td class="pr-6 align-bottom pb-2">
                    <div class="flex items-center w-full" :title="!isDataUri(file.filePath) ? file.filePath : ''">
                        <img :src="fallbackSrcMap[filePathUri(file.filePath)] || assetsPathResolver(filePathUri(file.filePath))"
                            :class="['mr-2 h-8 w-8',imgCls(file.filePath)]"
                            @error="fallbackSrcMap[filePathUri(file.filePath)] = fallbackPathResolver(filePathUri(file.filePath))">
                        <a v-if="!isDataUri(file.filePath)" :href="assetsPathResolver(file.filePath||'')" target="_blank" class="overflow-hidden">
                            {{file.fileName}}
                        </a>
                        <span v-else class="overflow-hidden">{{file.fileName}}</span>
                    </div>
                </td>
                <td class="align-top pb-2 whitespace-nowrap">
                    <span v-if="file.contentLength && file.contentLength > 0" class="text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-black">
                        {{formatBytes(file.contentLength)}}
                    </span>
                </td>
            </tr>
        </table>
    </div>
</div>    
    `,
    emits:['change'],
    props: {
        multiple: Boolean,
        /** @type {ResponseStatus|null} status */
        status:Object, //ResponseStatus
        id: String,
        inputClass: String,
        label: String,
        labelClass: String,
        help: String,
        placeholder: String,
        modelValue: String,
        /** @type {string[]} status */
        values:Array, //string[]
        /** @type {UploadedFile[]} status */
        files:Array,  //UploadedFile[]
        instructions: String,
        accept: String,
        acceptLabel: String,
    },
    setup(props, { emit, expose }) {
        /** @typedef {Object} UploadedFile */

        const { assetsPathResolver, fallbackPathResolver } = useConfig()
        const { filePathUri, getMimeType, formatBytes, fileImageUri, flush, getExt } = useFiles()
        /** @type {Ref<HTMLInputElement|null>} */
        const input = ref(null)
        const fallbackSrcMap = {}
        const filePreviews = {}
        const renderKey = ref(0)

        /** @type {Ref<string|undefined>} */
        const fallbackSrc = ref()
        /** @type {Ref<UploadedFile[]>} */
        const fileList = ref([])

        /** @type {UploadedFile} file */
        function toFile(file) {
            file.filePath = assetsPathResolver(file.filePath)
            return file
        }

        expose({ 
            clear() {
                console.debug('clear', input.value.files)
                const data = new DataTransfer()
                input.value.files = data.files
                updateFileList()
            }
        })

        const useLabel = computed(() => props.label ?? humanize(toPascalCase(props.id)))
        const usePlaceholder = computed(() => props.placeholder ?? useLabel.value)
        
        /** @type {ApiState|undefined} */
        let ctx = inject('ApiState', undefined)
        const errorMessage = ref()
        const errorField = computed(() => errorMessage.value ?? errorResponse.call({ responseStatus: props.status ?? ctx?.error.value }, props.id))
        //const errorField = 'There was a invalid file upload error'
        
        const isDragging = ref(false)
        const files = ref([])

        function handleDrop(e) {
            isDragging.value = false
            addFiles(e.dataTransfer.files)
            emit('change',e)
        }
        
        /** @type {FileList} files */
        function addFiles(files) {
            console.debug('addFiles', files)
            if (!files.length) return 
            errorMessage.value = ''
            fallbackSrc.value = ''
            if (props.multiple) {
                const data = new DataTransfer()
                const fileNames = {}
                Array.from([...input.value.files, ...files]).forEach(f => {
                    if (fileNames[f.name]) return
                    fileNames[f.name] = f
                    data.items.add(f)
                })
                input.value.files = data.files
            } else {
                input.value.files = files
            }
            const acceptExts = props.accept?.split(',').map(x => x.trim().replace('.',''))
            if (acceptExts) {
                for (const file of files) {
                    const ext = getExt(file.name)
                    if (!acceptExts.includes(ext)) {
                        errorMessage.value = `.${ext} files are not accepted`
                        break
                    }
                }
                if (errorMessage.value) {
                    const data = new DataTransfer()
                    for (const file of files) {
                        if (acceptExts.includes(getExt(file.name))) {
                            data.items.add(file)
                        }
                    }
                    input.value.files = data.files
                }
            }
            updateFileList()
        }
        
        function updateFileList() {
            fileList.value = Array.from(input.value.files).map(x => ({
                fileName: x.name,
                filePath: filePreviews[x.name] ?? (filePreviews[x.name] = fileImageUri(x)),
                contentLength: x.size,
                contentType: x.type || getMimeType(x.name),
            }))
            // renderKey.value++
        }

        /** @type {Event} e */
        function onChange(e) {
            /** @type {HTMLInputElement} */
            let f = e.target
            addFiles(f.files)
            emit('change',e)
        }

        const openFile = () => input.value?.click()

        /** @type {string|null} src */
        const isDataUri = (src) => src == null ? false : src.startsWith("data:") || src.startsWith("blob:")

        const src = computed(() => {

            if (fileList.value.length > 0)
                return fileList.value[0].filePath
            let filePath = typeof props.modelValue == 'string' ? props.modelValue : props.values && props.values[0]
            return filePath && filePathUri(assetsPathResolver(filePath)) || null
        })

        /** @type {string|null} src */
        const imgCls = (src) => !src || src.startsWith("data:") || src.endsWith(".svg")
            ? ''
            : 'rounded-full object-cover'

        /** @type {Event} e */
        function onError(e) {
            fallbackSrc.value = fallbackPathResolver(src.value)
        }
        
        function grammarList(items) {
            if (!items || !items.length) return ''
            if (items.length === 1) return items[0]
            return items.slice(0, -1).join(', ') + ' or ' + items[items.length - 1]
        }

        onUnmounted(flush)
        
        return {
            renderKey,
            input,
            src,
            files,
            isDragging,
            filePathUri,
            fallbackSrc,
            fallbackSrcMap,
            formatBytes,
            fileList,
            useLabel,
            usePlaceholder,
            assetsPathResolver,
            errorField,
            isDataUri,
            openFile,
            handleDrop,
            grammarList,
            imgCls, 
            addFiles, 
            onChange,
            onError,
        }
    }
}