import { ref, computed, inject, nextTick } from "vue"
import { useFormatters } from "@servicestack/vue"
import { EventBus } from "@servicestack/client"
const { truncate } = useFormatters()

export const prefixes = {
    Chat: 'chat',
    TextToImage: 'txt2img',
    ImageToText: 'img2txt',
    ImageToImage: 'img2img',
    ImageUpscale: 'upscale',
    SpeechToText: 'spch2txt',
    TextToSpeech: 'txt2spch',
    Transform: 'ffmpeg',
}

export function iconDataUri(svg) {
    return styleDataUri(Img.svgToDataUri(svg).replaceAll('"', "'"))
}
function styleDataUri(dataUri) {
    const fgColor = '%234f46e5'
    return dataUri
        .replaceAll("stroke='currentColor'",`stroke='${fgColor}'`)
        .replaceAll("fill='currentColor'",`fill='${fgColor}'`)
}

export const icons = (() => {
    const prefix = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' "
    const svgs = {
        home: "viewBox='0 0 24 24' fill='none' stroke-width='1.5' stroke='currentColor' aria-hidden='true'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'%3E%3C/path%3E%3C/svg%3E",
        table: "viewBox='0 0 24 24' fill='none' stroke='currentColor' aria-hidden='true'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2M3 8v6m0-6h6m12 0v6m0-6H9m12 6v4a2 2 0 0 1-2 2H9m12-6H9m-6 0v4a2 2 0 0 0 2 2h4m-6-6h6m0-6v6m0 0v6m6-12v12'%3E%3C/path%3E%3C/svg%3E",
        image: "viewBox='0 0 16 16'%3E%3Cpath fill='currentColor' d='M8 3a5 5 0 0 0-3.858 8.18l2.806-2.76a1.5 1.5 0 0 1 2.105 0l2.805 2.761A5 5 0 0 0 8 3m0 10a4.98 4.98 0 0 0 3.149-1.116L8.35 9.131a.5.5 0 0 0-.701 0l-2.798 2.754A4.98 4.98 0 0 0 8 13M2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8m8-1a1 1 0 1 0 0-2a1 1 0 0 0 0 2'/%3E%3C/svg%3E",
        audio: "viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 14.959V9.04C2 8.466 2.448 8 3 8h3.586a.98.98 0 0 0 .707-.305l3-3.388c.63-.656 1.707-.191 1.707.736v13.914c0 .934-1.09 1.395-1.716.726l-2.99-3.369A.98.98 0 0 0 6.578 16H3c-.552 0-1-.466-1-1.041M16 8.5c1.333 1.778 1.333 5.222 0 7M19 5c3.988 3.808 4.012 10.217 0 14'/%3E%3C/svg%3E",
        subtitle: "viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M6.577 15.423h7.846v-1H6.577zm9.846 0h1v-1h-1zm-9.846-3.577h1v-1h-1zm3 0h7.846v-1H9.577zM4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zm0-1h14.769q.23 0 .423-.192t.192-.424V6.616q0-.231-.192-.424T19.385 6H4.615q-.23 0-.423.192T4 6.616v10.769q0 .23.192.423t.423.192M4 18V6z'/%3E%3C/svg%3E",
        
        chat: "viewBox='0 0 26 26'%3E%3Cpath fill='currentColor' d='M10 0C4.547 0 0 3.75 0 8.5c0 2.43 1.33 4.548 3.219 6.094a4.778 4.778 0 0 1-.969 2.25a14.4 14.4 0 0 1-.656.781a2.507 2.507 0 0 0-.313.406c-.057.093-.146.197-.187.407c-.042.209.015.553.187.812l.125.219l.25.125c.875.437 1.82.36 2.688.125c.867-.236 1.701-.64 2.5-1.063c.798-.422 1.557-.864 2.156-1.187c.084-.045.138-.056.219-.094C10.796 19.543 13.684 21 16.906 21c.031.004.06 0 .094 0c1.3 0 5.5 4.294 8 2.594c.1-.399-2.198-1.4-2.313-4.375c1.957-1.383 3.22-3.44 3.22-5.719c0-3.372-2.676-6.158-6.25-7.156C18.526 2.664 14.594 0 10 0m0 2c4.547 0 8 3.05 8 6.5S14.547 15 10 15c-.812 0-1.278.332-1.938.688c-.66.355-1.417.796-2.156 1.187c-.64.338-1.25.598-1.812.781c.547-.79 1.118-1.829 1.218-3.281l.032-.563l-.469-.343C3.093 12.22 2 10.423 2 8.5C2 5.05 5.453 2 10 2'%3E%3C/path%3E%3C/svg%3E",
        txt2img: "viewBox='0 0 14 14'%3E%3Cg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2.77 8.286A3.5 3.5 0 0 1 5.577 6.88c.818 0 1.57.28 2.166.75'/%3E%3Cpath d='M5.076 10.629h-3.5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3'/%3E%3Cpath d='M5.576 5.379a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m1.764 5.184c-.351-.061-.351-.565 0-.626a3.18 3.18 0 0 0 2.558-2.45l.021-.097c.076-.347.57-.349.649-.003l.026.113a3.19 3.19 0 0 0 2.565 2.435c.353.062.353.568 0 .63A3.19 3.19 0 0 0 10.594 13l-.026.113c-.079.346-.573.344-.649-.003l-.021-.097a3.18 3.18 0 0 0-2.558-2.45'/%3E%3C/g%3E%3C/svg%3E",
        img2txt: "viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'%3E%3Cpath d='M15 8h.01M6 13l2.644-2.644a1.21 1.21 0 0 1 1.712 0L14 14'/%3E%3Cpath d='m13 13l1.644-1.644a1.21 1.21 0 0 1 1.712 0L18 13M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2m8-16h2a2 2 0 0 1 2 2v2m-4 12h2a2 2 0 0 0 2-2v-2'/%3E%3C/g%3E%3C/svg%3E",
        img2img: "viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M21.5 1.5a1 1 0 0 0-1 1a5 5 0 1 0 .3 7.75a1 1 0 0 0-1.32-1.51a3 3 0 1 1 .25-4.25H18.5a1 1 0 0 0 0 2h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-.99m-3 12a1 1 0 0 0-1 1v.39L16 13.41a2.77 2.77 0 0 0-3.93 0l-.7.7l-2.46-2.49a2.79 2.79 0 0 0-3.93 0L3.5 13.1V7.5a1 1 0 0 1 1-1h5a1 1 0 0 0 0-2h-5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5a1 1 0 0 0-1-1m-14 7a1 1 0 0 1-1-1v-3.57L6.4 13a.79.79 0 0 1 1.09 0l3.17 3.17L15 20.5Zm13-1a1 1 0 0 1-.18.53l-4.51-4.51l.7-.7a.78.78 0 0 1 1.1 0l2.89 2.9Z'/%3E%3C/svg%3E",
        upscale: "viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='m15.056 1.994l6.91.04l.04 6.91l-2 .011l-.02-3.527l-5.027 5.028l-1.415-1.415l5.027-5.027l-3.526-.02zM2 2h10v2H4v6H2zm0 10h4v2H4v2H2zm6 0h4v4h-2v-2H8zm14 0v10h-8v-2h6v-8zM4 18v2h2v2H2v-4zm8 0v4H8v-2h2v-2z'/%3E%3C/svg%3E",
        spch2txt: "viewBox='0 0 14 14'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' d='M3 5.18v4.14m4-4.14v4.14M5 6.07v2.36m6-3.25v4.14M9 6.07v2.36m4.5 2.07v2a1 1 0 0 1-1 1h-2m0-13h2a1 1 0 0 1 1 1v2m-13 0v-2a1 1 0 0 1 1-1h2m0 13h-2a1 1 0 0 1-1-1v-2'/%3E%3C/svg%3E",
        txt2spch: "viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M6 11h1.5V9H6zm2.5 2H10V7H8.5zm2.75 2h1.5V5h-1.5zM14 13h1.5V7H14zm2.5-2H18V9h-1.5zM2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z'/%3E%3C/svg%3E",
        ffmpeg: "viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 6a3 3 0 1 0 6 0a3 3 0 0 0-6 0m18 5V8a2 2 0 0 0-2-2h-6l3 3m0-6l-3 3M3 13v3a2 2 0 0 0 2 2h6l-3-3m0 6l3-3m4 0a3 3 0 1 0 6 0a3 3 0 0 0-6 0'/%3E%3C/svg%3E",
    }
    const ret = {}
    Object.keys(svgs).forEach(k => {
        const svg = svgs[k]
        ret[k] = styleDataUri(prefix + svg)
    })
    return ret
})()

export const bus = new EventBus()

export function scrollIntoView(el) {
    if (!el) return
    if (el.scrollIntoViewIfNeeded) {
        el.scrollIntoViewIfNeeded()
    } else {
        el.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
}

export function useUiLayout(refUi) {
    
    return {
        bus,
        scrollIntoView,
        scrollTop() {
            // console.log('scrollTop', Object.keys(refUi.value))
            scrollIntoView(refUi.value?.refTop.value)
        },
        scrollBottom() {
            // console.log('scrollBottom', Object.keys(refUi.value))
            scrollIntoView(refUi.value?.refBottom.value)
        },
    }
}

export const UiLayout = {
    template:`<div class="flex flex-wrap md:flex-nowrap w-full">
    <div class="flex flex-col flex-grow pr-4 overflow-y-auto md:h-screen md:pl-1" style="">
        <div>            
            <div id="top" ref="refTop"></div>
            <div class="text-base px-3 m-auto lg:px-1 pt-3">
                <slot name="main"></slot>
                
                <div id="bottom" ref="refBottom"></div>
            </div>
        </div>
    </div>
    <div class="w-full sm:w-72 md:w-92 h-screen md:border-l h-full md:py-2 md:px-2 bg-white">
        <slot name="sidebar"></slot>
    </div>
</div>`,
    setup(props, { expose }) {
        const refTop = ref()
        const refBottom = ref()

        expose({ refTop, refBottom })

        return { refTop, refBottom }
    }
}

export class ThreadStorage {
    prefix = ''
    defaults = {}
    constructor (prefix, defaults) {
        this.prefix = prefix
        this.defaults = defaults
    }
    get prefsKey() { return `${this.prefix}.prefs` }
    get historyKey() { return `${this.prefix}.history` }
    
    getPrefs() {
        return JSON.parse(localStorage.getItem(this.prefsKey) || JSON.stringify(this.defaults))
    }
    getHistory() {
        return JSON.parse(localStorage.getItem(this.historyKey) || "[]")
    }
    savePrefs(prefs) {
        localStorage.setItem(this.prefsKey, JSON.stringify(prefs))
    }
    saveHistory(history) {
        localStorage.setItem(this.historyKey, JSON.stringify(history))
    }
    createId() { return new Date().valueOf() }
    getThreadId(id) { return `${this.prefix}-${id}` }
    getThread(threadId) {
        const thread = localStorage.getItem(threadId)
        return thread ? JSON.parse(thread) : null
    }
    createThreadId() { return this.getThreadId(this.createId()) }
    createThread(thread) {
        if (!thread.id) thread.id = this.createThreadId()
        if (thread.title) thread.title = truncate(thread.title, 80)
        if (!thread.results) thread.results = []
        return thread
    }
    saveThread(thread) {
        localStorage.setItem(thread.id, JSON.stringify(thread))
    }
    deleteThread(threadId) {
        localStorage.removeItem(threadId)
    }
    saveIcon(dataUri) {
        const key = `icon:${hash(dataUri)}`
        localStorage.setItem(key, dataUri)
        return key
    }
    getIcon(key) {
        return localStorage.getItem(key)
    }
}

//https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
export function hash(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 0x85ebca77)
        h2 = Math.imul(h2 ^ ch, 0xc2b2ae3d)
    }
    h1 ^= Math.imul(h1 ^ (h2 >>> 15), 0x735a2d97)
    h2 ^= Math.imul(h2 ^ (h1 >>> 15), 0xcaf649a9)
    h1 ^= h2 >>> 16; h2 ^= h1 >>> 16
    return 2097152 * (h2 >>> 0) + (h1 >>> 11)
}

export const HistoryTitle = {
    template:`
        <div class="sm:w-72 md:w-92 flex items-center justify-between">
            <h3 class="p-2 sm:block text-xl md:text-2xl font-semibold">History</h3>
            <button type="button" @click="clear()" title="Clear History" 
                class="mr-4 bg-white dark:bg-black rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black">
                <span class="sr-only">Clear</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-width="2" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10ZM5 5l14 14"/>
                </svg>
            </button>
        </div>
    `,
    props: {
        prefix:String,
    },
    setup(props) {
        function clear() {
            if (confirm('Are you sure you want to clear all your History?')) {
                let keys = []
                let icons = []
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith(props.prefix)) {
                        keys.push(key)
                        try {
                            const obj = JSON.parse(localStorage.getItem(key))
                            const results = Array.isArray(obj)
                                ? obj
                                : Array.isArray(obj.results)
                                    ? obj.results
                                    : null
                            if (results && Array.isArray(results)) {
                                results.forEach(item => {
                                    if (typeof item == "object" && item.iconKey && !icons.includes(item.iconKey)) {
                                        icons.push(item.iconKey)
                                    }
                                })
                            }
                        } catch (e) {
                            console.warn(`Couldn't parse ${key}`)
                        }
                    }
                })

                console.log('Deleting keys:', keys)
                keys.forEach(x => localStorage.removeItem(x))
                console.log('Deleting icons:', icons)
                icons.forEach(x => localStorage.removeItem(x))
                
                location.reload()
            }
        }
        
        return { clear }
    }
}

export const HistoryGroups = {
    template: `
        <div v-href="{id:undefined}" :class="['md:pl-4 whitespace-nowrap hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6', !routes.id ? 'bg-gray-50 text-indigo-600 font-semibold' : 'cursor-pointer text-gray-700']">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z"/><path fill="currentColor" d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2z"/></svg>
            New Thread
        </div>
        
        <div v-for="group in historyGroups" class="relative">
            <h4 class="w-full pl-2 text-gray-500 uppercase pt-2 text-sm leading-6 font-semibold">{{group.title}}</h4>
            <div v-for="item in group.results">
                <div v-href="{id:item.id}" :class="['pl-4 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 justify-between', 
                    item.id == routes.id ? 'bg-gray-50 text-indigo-600 font-semibold' : 'cursor-pointer text-gray-700']">
                    <div class="md:w-64 overflow-hidden whitespace-nowrap text-ellipsis" 
                        @contextmenu.prevent.stop="showThreadMenu=showThreadMenu==item.id ? null : item.id">
                        <input v-if="renameThreadId === item.id" id="txtItemTitle" type="text" v-model="item.title" class="text-sm py-1 px-2 font-normal text-gray-700" 
                            @keypress.enter="renameItem(item)" @keydown.esc="renameThreadId=null">                  
                        <div v-else class="flex items-center">
                            <slot :item="item"></slot>
                        </div>
                    </div>
                    <div @click.stop="showThreadMenu=showThreadMenu==item.id ? null : item.id" class="cursor-pointer">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"/></svg>
                    </div>
                    <div v-if="item.id == showThreadMenu" class="absolute font-normal right-0 mt-6 mr-4 z-10 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                        <div @click.stop="renameThread(item)" class="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Rename</div>
                        <div @click.stop="deleteThread(item)" class="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Delete</div>
                    </div>
                </div>
            </div>
        </div>    
    `,
    emits:['save','remove'],
    props: {
        history: Array,
        storage: Object,
    },
    setup(props, { emit }) {
        const routes = inject('routes')
        const showThreadMenu = ref()
        const renameThreadId = ref()
        const historyGroups = computed(() => groupThreads(props.history))

        function renameThread(item) {
            renameThreadId.value = item.id
            showThreadMenu.value = null
            nextTick(() => {
                const txt = document.getElementById('txtItemTitle')
                txt?.select()
                txt?.focus()
            })
        }
        function renameItem(item) {
            renameThreadId.value = null
            emit('save', item)
        }

        function deleteThread(item) {
            if (confirm('Are you sure you want to delete this thread?')) {
                emit('remove', item)
            }
            showThreadMenu.value = null
        }
        
        return {
            routes,
            showThreadMenu,
            renameThreadId,
            historyGroups,
            renameThread,
            deleteThread,
            renameItem,
        }
    }
}

export function groupThreads(threads) {
    const sorted = threads.sort((a,b) => b.id - a.id)

    let Today = []
    let LastWeek = []
    let Months = {}
    let Years = {}

    const groups = []

    sorted.forEach(x => {
        const created = new Date(x.id)
        const now = new Date()
        const diff = now - created
        const days = diff / (1000 * 60 * 60 * 24)
        const startOfYear = new Date(new Date().getFullYear(), 0, 1)

        if (days < 1) {
            Today.push(x)
        } else if (days < 7) {
            LastWeek.push(x)
        } else if (created > startOfYear) {
            const month = created.toLocaleString('default', { month: 'long' })
            if (!Months[month]) Months[month] = []
            Months[month].push(x)
        } else {
            const year = `${created.getFullYear()}`
            if (!Years[year]) Years[year] = []
            Years[year].push(x)
        }
    })

    if (Today.length) groups.push({ title: 'Today', results: Today })
    if (LastWeek.length) groups.push({ title: 'Previous 7 Days', results: LastWeek })

    Object.keys(Months).forEach(month => {
        groups.push({ title: month, results: Months[month] })
    })
    const yearsDesc = Object.keys(Years).sort((a,b) => b.localeCompare(a))
    yearsDesc.forEach(year => {
        groups.push({ title: year, results: Years[year] })
    })
    return groups
}

export function toArtifacts(result) {
    return result.response?.outputs?.map(x => ({
        width: result.request.width,
        height: result.request.height,
        url: x.url,
        filePath: x.url.substring(x.url.indexOf('/artifacts')),
    })) ?? []
}

export function wordList(items) {
    if (!items || !items.length) return ''
    if (typeof items == 'string') {
        items = items.split(',')
    }
    if (!Array.isArray(items)) return ''
    if (items.length === 1) return items[0]
    return items.slice(0, -1).join(', ') + ' or ' + items[items.length - 1]
}

export const acceptedImages = `${wordList('WEBP,JPG,PNG,GIF')} (max 5MB)`
export const acceptedAudios = `${wordList('MP3,M4A,AAC,FLAC,WAV,WMA')} (max 10MB)`

export const Img  = {
    dataUriEscapeChars: ['%','#','<','>','?','[','\\',']','^','`','{','|','}'],
    darkColors: ('334155,374151,44403c,b91c1c,c2410c,b45309,4d7c0f,15803d,047857,0f766e,' +
        '0e7490,0369a1,1d4ed8,4338ca,6d28d9,7e22ce,a21caf,be185d,be123c,//824d26,865081,0c7047,' +
        '0064a7,8220d0,009645,ab00f0,9a3c69,227632,4b40bd,ad3721,6710f2,1a658a,078e57,2721e1,' +
        '168407,019454,967312,6629d8,108546,9a2aa1,3d7813,257124,6f14ed,1f781d,a29906').split(',').map(x => '#' + x),
    
    createSvg(letter, bgColor=null, textColor=null) {
        console.log(Img.darkColors)
        if (!letter) return null
        bgColor = bgColor || Img.darkColors[(Math.floor(Math.random() * Img.darkColors.length))]
        textColor = textColor || "#fff";
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" style="isolation:isolate" viewBox="0 0 32 32">
            <path d="M0 0h32v32H0V0z" fill="${bgColor}" />
            <text font-family="Helvetica" font-size="20px" x="50%" y="50%" dy="0em" fill="${textColor}" alignment-baseline="central" text-anchor="middle">${letter}</text>
        </svg>`
        return svg;
    },
    
    createSvgDataUri(letter, bgColor=null, textColor=null) {
        if (!letter) return null
        const svg = this.createSvg(letter, bgColor, textColor)
        return this.svgToDataUri(svg)
    },
    
    svgToDataUri(svg) {
        if (!svg) return null
        Img.dataUriEscapeChars
            .forEach(x => svg = svg.replaceAll(x,encodeURIComponent(x)))
        return "data:image/svg+xml," + svg
    },

    generateThumbnail(file, boundBox, imageType="image/webp", quality=0.1) {
        if (!boundBox || boundBox.length !== 2) {
            throw new Error("boundBox required")
        }
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext('2d')
        if (!ctx) {
            throw new Error('Context not available')
        }
    
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onerror = reject
            img.onload = function() {
                const scaleRatio = Math.min(...boundBox) / Math.max(img.width, img.height)
                const w = img.width * scaleRatio
                const h = img.height * scaleRatio
                canvas.width = w
                canvas.height = h
                ctx.drawImage(img, 0, 0, w, h)
                return resolve(canvas.toDataURL(imageType, quality))
            }
            img.src = window.URL.createObjectURL(file)
        })
    }
}
