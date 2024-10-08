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
    },
    template:`<div>
        <div class="grid grid-cols-3 sm:grid-cols-4">
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
        <ModalDialog v-if="selected" size-class="" @done="selected=null" class="z-20"
            closeButtonClass="rounded-md text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-600 ring-offset-gray-600">
            <img :src="selected.url">
            <template #bottom>
                <slot name="bottom" :selected="selected"></slot>
            </template>
        </ModalDialog>
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
