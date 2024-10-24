import { ref, computed } from "vue"
import { rightPart, combinePaths } from "@servicestack/client"

class Artifact {
    width = 0
    height = 0
    filePath = ''
}

export const AssetsBasePath = globalThis.AssetsBasePath = globalThis.Server?.app.baseUrl ?? location.origin

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

export const ArtifactDownloads = {
    template:`
        <div class="z-40 fixed bottom-0 gap-x-6 w-full flex justify-center p-4 bg-black/20">
            <a :href="url + '?download=1'" @mouseover="showVariants=false" class="flex text-sm text-gray-300 hover:text-gray-100 hover:drop-shadow">
                <svg class="w-5 h-5 mr-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20h12M12 4v12m0 0l3.5-3.5M12 16l-3.5-3.5"></path></svg> 
                download 
            </a>
            <div @mouseover="showVariants=true">
                <button type="button" class="flex text-sm text-gray-300 hover:text-gray-100 hover:drop-shadow" aria-expanded="true" aria-haspopup="true">
                  <span class="sr-only">Open Variants</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                  </svg>
                  <span>variants</span>
                </button>
                <div v-if="showVariants" class="font-normal absolute z-10 w-40 -ml-4 bottom-10 rounded-md bg-white dark:bg-black py-1 shadow-lg ring-1 ring-black dark:ring-gray-600 ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    <a :href="variant({width:512,height:512})" target="_blank" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800" role="menuitem" tabindex="-1">512 x 512</a>
                    <a :href="variant({width:256,height:256})" target="_blank" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800" role="menuitem" tabindex="-1">256 x 256</a>
                    <a :href="variant({width:128})" target="_blank" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800" role="menuitem" tabindex="-1">128w</a>
                    <a :href="variant({height:128})" target="_blank" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800" role="menuitem" tabindex="-1">128h</a>
                </div>
            </div>
            <div @mouseover="showVariants=false">
                <slot></slot>
            </div>
        </div>
    `,
    props: {
        url:String,
    },
    setup(props) {
        const showVariants = ref(false)
        function variant(args) {
            const variants = Object.keys(args).map(x => `${x}=${args[x]}`).join(',')
            return props.url.replace('/artifacts/',`/variants/${variants}/`)
        }
        return { showVariants, variant }
    }
}