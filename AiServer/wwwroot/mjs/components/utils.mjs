import { ref, computed, inject, provide, nextTick, onMounted } from "vue"
import { useFormatters, useClient } from "@servicestack/vue"
import { EventBus } from "@servicestack/client"
const { truncate } = useFormatters()

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
    template:`<div class="flex w-full">
    <div class="flex flex-col flex-grow pr-4 overflow-y-auto h-screen pl-1" style="">
        <div>            
            <div id="top" ref="refTop"></div>
            <div class="text-base px-3 m-auto lg:px-1 pt-3">
                <slot name="main"></slot>
                
                <div id="bottom" ref="refBottom"></div>
            </div>
        </div>
    </div>
    <div class="w-60 sm:w-72 md:w-92 h-screen border-l h-full md:py-2 md:px-2 bg-white">
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
}

export const HistoryGroups = {
    template: `
        <div v-href="{id:undefined}" :class="['pl-4 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6', !routes.id ? 'bg-gray-50 text-indigo-600 font-semibold' : 'cursor-pointer text-gray-700']">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z"/><path fill="currentColor" d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2z"/></svg>
            New Thread
        </div>
        
        <div v-for="group in historyGroups">
            <h4 class="pl-2 text-gray-500 uppercase pt-2 text-sm leading-6 font-semibold">{{group.title}}</h4>
            <div v-for="item in group.results">
                <div v-href="{id:item.id}" :class="['pl-4 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6', item.id == routes.id ? 'bg-gray-50 text-indigo-600 font-semibold' : 'cursor-pointer text-gray-700']">
                    <div class="w-64 overflow-hidden whitespace-nowrap text-ellipsis" 
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
