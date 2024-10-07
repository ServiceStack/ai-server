import { ref, computed, watch, inject, onMounted, onUnmounted, getCurrentInstance } from "vue"
import { useClient, useAuth, useUtils, useFormatters, useMetadata, css } from "@servicestack/vue"
import { rightPart, combinePaths } from "@servicestack/client"
const { transition } = useUtils()

class Artifact {
    width = 0
    height = 0
    filePath = ''
}

export const AssetsBasePath = globalThis.AssetsBasePath = location.hostname === "localhost"
    ? "https://localhost:5005"
    : "https://localhost:5005"

const store = {
    AssetsBasePath,
    
    /** @param {Artifact} artifact
     *  @param {number} minSize
     *  @param {number} maxSize */
    getVariantPath(artifact, minSize, maxSize) {
        const path = rightPart(artifact.filePath, "/artifacts")
        if (artifact.height > artifact.width)
            return combinePaths(`/variants/height=${maxSize}`, path)
        if (artifact.width > artifact.height)
            return combinePaths(`/variants/width=${maxSize}`, path)
        return combinePaths(`/variants/width=${minSize}`, path)
    },
    getFilePath(cdnPath, artifact, minSize=null) {
        const size = this.getSize(minSize)
        const variantPath = size === 'Small'
            ? this.getVariantPath(artifact, 118, 207)
            : size === 'Medium'
                ? this.getVariantPath(artifact, 288, 504)
                : null

        if (!variantPath)
            return combinePaths(cdnPath, artifact.filePath)
        return combinePaths(cdnPath, variantPath)
    },
    /** @param {number?} minSize */
    getSize(minSize=null) {
        const size = minSize == null
            ? 'Medium'
            : minSize < 288
                ? 'Small'
                : minSize > 504
                    ? 'Large'
                    : 'Medium'
        return size
    },    
    getPublicUrl(artifact, minSize = null) {
        return this.getFilePath(this.AssetsBasePath, artifact, minSize)
    },
    resolveBorderColor(artifact, selected) {
        return selected
            ? 'border-yellow-300'
            : 'border-transparent'
    },
    getBackgroundStyle(artifact) {
        return ''
    },
    /** @param {Artifact} artifact
     *  @param {string} [lastImageSrc]
     *  @param {number?} minSize */
    getArtifactImageErrorUrl(artifact, lastImageSrc, minSize = null) {
        return this.solidImageDataUri('#000')
    },
    /** @param {string} fill */
    solidImageDataUri(fill) {
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='%23${(fill || "#000").substring(1)}' d='M2 2h60v60H2z'/%3E%3C/svg%3E`
    },
}

export const SimpleModal = {
    template:`
    <div :id="id" :data-transition-for="id" @mousedown="close" class="relative z-10"
        :aria-labelledby="id + '-title'" role="dialog" aria-modal="true">
      <div :class="['fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity', transition1]">
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div :class="[modalClass, sizeClass, transition2]" @mousedown.stop="">
                    <slot></slot>
                </div>
            </div>
        </div>
      </div>
    </div>
    `,
    props: {
        id: {
            type: String,
            default: 'ModalDialog'
        },
        modalClass: {
            type: String,
            default: 'relative transform overflow-hidden rounded-lg bg-white dark:bg-black text-left shadow-xl transition-all sm:my-8'
        },
        sizeClass: {
            type: String,
            default: 'sm:max-w-prose lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl sm:w-full'
        },
    },
    setup(props, { emit }) {
        const show = ref(false)
        const transition1 = ref('')
        const rule1 = {
            entering: { cls: 'ease-out duration-300', from: 'opacity-0', to: 'opacity-100' },
            leaving: { cls: 'ease-in duration-200', from: 'opacity-100', to: 'opacity-0' }
        }
        const transition2 = ref('')
        const rule2 = {
            entering: { cls: 'ease-out duration-300', from: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95', to: 'opacity-100 translate-y-0 sm:scale-100' },
            leaving: { cls: 'ease-in duration-200', from: 'opacity-100 translate-y-0 sm:scale-100', to: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' }
        }

        watch(show, () => {
            transition(rule1, transition1, show.value)
            transition(rule2, transition2, show.value)
            if (!show.value) setTimeout(() => emit('done'), 200)
        })
        show.value = true
        const close = () => show.value = false

        return {
            show,
            transition1,
            transition2,
            close,
        }
    }
}

export const ArtifactImage = {
    template:`<div v-if="artifact" class="overflow-hidden" :style="store.getBackgroundStyle(artifact) + ';' + imageStyle">
      <img :alt="artifact.prompt" :width="width" :height="height" :class="imageClass"
           :src="store.getPublicUrl(artifact,minSize)" :loading="loading || 'lazy'" @error="store.getArtifactImageErrorUrl(artifact,null,minSize)">
  </div>`,
    props: {
        /** @type {import('vue').PropType<Artifact>} */
        artifact:Object,
        imageClass:String,
        imageStyle: String,
        minSize:Number,
        /** @type {import('vue').PropType<'eager'|'lazy'>} */
        loading:String,
    },
    setup(props) {
        const width = computed(() => !props.minSize ? props.artifact.width
            : (props.artifact?.width > props.artifact.height
                ? (props.artifact.width / props.artifact.height) * props.minSize
                : props.minSize))

        const height = computed(() => !props.minSize ? props.artifact.height
            : (props.artifact.height > props.artifact.width
                ? (props.artifact.height / props.artifact.width) * props.minSize
                : props.minSize))

        return { store, width, height, }
    }
}

export const ArtifactGallery = {
    components: { 
        ArtifactImage,
        SimpleModal,
    },
    template:`<div>
        <div class="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5">
            <div v-for="artifact in results" :key="artifact.id" :class="[artifact.width > artifact.height ? 'col-span-2' : artifact.height > artifact.width ? 'row-span-2' : '']">
                <div @click="selected=artifact" class="flex justify-center">
                    <div class="relative flex flex-col cursor-pointer items-center" :style="'max-width:' + artifact.width + 'px'">
                        <ArtifactImage :artifact="artifact" :class="['border sm:border-2', store.resolveBorderColor(artifact, selected?.id)]" />
                        <div class="absolute top-0 left-0 w-full h-full group select-none overflow-hidden border sm:border-2 border-transparent">
                            <div class="w-full h-full absolute inset-0 z-10 block text-zinc-100 drop-shadow pointer-events-none line-clamp sm:px-2 sm:pb-2 text-sm opacity-0 group-hover:opacity-40 transition duration-300 ease-in-out bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
                            <div class="absolute w-full h-full flex z-10 text-zinc-100 justify-between drop-shadow opacity-0 group-hover:opacity-100 transition-opacity sm:mb-1 text-sm">
                                <div class="relative w-full h-full overflow-hidden flex flex-col justify-between overflow-hidden"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
        <SimpleModal v-if="selected" size-class="" @done="selected=null">
            <img :src="selected.url">
        </SimpleModal>
    </div>`,
    props: { 
        results:Array, 
    },
    setup(props, { emit, expose }) {
        const selected = ref()
        
        function navTo(artifact) {
            console.log('navTo', artifact)
        }
        
        return {
            store,
            selected,
            navTo,
        }
    }
}
