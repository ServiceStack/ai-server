import { ref, computed, onMounted, onUnmounted, inject, nextTick } from "vue"
import { useAuth } from "@servicestack/vue"
import { Features, FeatureGroups } from "./Features.mjs"
import { dataUriToSvg, icons } from "../utils.mjs"

export default {
    template:`
<div class="relative z-10" role="dialog" aria-modal="true">
  <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
  <div class="fixed inset-0 bg-gray-500/25 transition-opacity" aria-hidden="true"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
    <!--
      Command palette, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 scale-95"
        To: "opacity-100 scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 scale-100"
        To: "opacity-0 scale-95"
    -->
    <div class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all">
      <div class="grid grid-cols-1">
        <input ref="txtSearch" type="text" v-model="search" class="border-transparent focus:border-transparent col-start-1 row-start-1 h-12 w-full pl-11 pr-4 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm focus:ring-0" 
            placeholder="Search..." autocomplete="false" spellcheck="false" role="combobox" aria-expanded="false" aria-controls="options">
        <svg class="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
        </svg>
      </div>

      <!-- Results, show/hide based on command palette state. -->
      <ul v-if="filteredGroups.length" class="max-h-80 transform-gpu scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2" id="options" role="listbox">
        <li v-for="group in filteredGroups">
          <h2 class="text-xs font-semibold text-gray-900">{{group.label}}</h2>
          <ul class="-mx-4 mt-2 text-sm text-gray-700">
            <!-- Active: "bg-indigo-600 text-white outline-none" -->
            <li v-for="feature in group.features" :key="feature.id" :id="'feature-' + feature.id"
                :class="['group flex cursor-pointer select-none items-center px-4 py-2', selected === feature.id ? 'bg-indigo-600 text-white outline-none' : '']"
                @mouseover="selected = feature.id" role="option" tabindex="-1" @click="select(feature.id)">
                <span :title="feature.label">
                  <!-- Active: "text-white forced-colors:text-[Highlight]", Not Active: "text-gray-400" -->
                  <Icon :svg="dataUriToSvg(feature.icon, { unstyle:true })" :class="['size-6 flex-none', selected === feature.id ? 'text-white forced-colors:text-[Highlight]' : 'text-gray-400']" :alt="feature.label" />
                </span>
              <span class="ml-3 flex-auto truncate">{{feature.label}}</span>
            </li>
          </ul>
        </li>
      </ul>

      <!-- Empty state, show/hide based on command palette state. -->
      <div v-else class="px-6 py-14 text-center text-sm sm:px-14">
        <svg class="mx-auto size-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <p class="mt-4 font-semibold text-gray-900">No results found</p>
        <p class="mt-2 text-gray-500">We couldn’t find anything with that term. Please try again.</p>
      </div>
    </div>
  </div>
</div>
    `,
    emits:['done'],
    setup(props, { emit }) {
        const { user, hasRole } = useAuth()
        const routes = inject('routes')
        const txtSearch = ref()
        const search = ref('')
        const selected = ref('')
        const isAdmin = hasRole('Admin')
        
        function matchesFeature(feature, pattern) {
            return [
                feature.label, feature.id, feature.prefix
            ].some(x => x.toLowerCase().includes(pattern))
        }
        
        const filteredGroups = computed(() => {
            const ret = []
            const pattern = (search.value ?? '').toLowerCase()
            FeatureGroups.forEach(group => {
                if (!search.value || group.features.some(x => matchesFeature(x, pattern))) {
                    const clone = {
                        label:group.label,
                        icon:group.icon,
                        features:group.features.filter(x => matchesFeature(x, pattern))
                    }
                    if (clone.features.length) {
                        ret.push(clone)
                    }
                }
            })
            if (isAdmin) {
                const clone = {
                    label:'Admin',
                    icon:icons.home,
                    features:[]
                }
                if ('admin'.includes(pattern) || 'dashboard'.includes(pattern)) {
                    clone.features.push({
                        id:'/admin',
                        label:'Dashboard',
                        icon:icons.home,
                    })
                }
                if ('api explorer'.includes(pattern)) {
                    clone.features.push({
                        id:'/ui',
                        label:'API Explorer',
                        icon:icons.apiexplorer,
                    })
                }
                if (clone.features.length) {
                    ret.push(clone)
                }
            }
            return ret
        })
        
        function last(arr) {
            return arr[arr.length - 1]
        }

        function handleKeyDown(e) {
            console.log('handleKeyDown', e)
            const groups = filteredGroups.value
            if (e.code === 'ArrowDown') {
                if (!selected.value) {
                    selected.value = groups[0]?.features[0]?.id
                } else {
                    for (const i in groups) {
                        const group = groups[i]
                        const idx = group.features.findIndex(x => x.id === selected.value)
                        if (idx >= 0) {
                            const nextx = idx + 1
                            if (nextx < group.features.length) {
                                selected.value = group.features[nextx].id
                            } else {
                                selected.value = groups[(i + 1) % groups.length]?.features[0]?.id
                            }
                            break
                        }
                    }
                }
                e.preventDefault()
            }
            else if (e.code === 'ArrowUp') {
                if (!selected.value) {
                    selected.value = last(groups[groups.length - 1].features)?.id
                } else {
                    for (const i in groups) {
                        const group = groups[i]
                        const idx = group.features.findIndex(x => x.id === selected.value)
                        if (idx >= 0) {
                            const nextx = idx - 1
                            if (idx > 0) {
                                selected.value = group.features[nextx].id
                            } else {
                                selected.value = last(groups[(i - 1 + groups.length) % groups.length]?.features)?.id
                            }
                            break
                        }
                    }
                }
                e.preventDefault()
            }
            else if (e.code === 'Enter') {
                select(selected.value)
            }
            nextTick(() => {
                const el = document.getElementById('feature-' + selected.value)
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' })
                }
            })
        }
        
        function select(page) {
            if (page) {
                if (page.startsWith('/')) {
                    location.href = page
                } else {
                    routes.to({ admin:page, id:undefined })
                }
                emit('done')
            }
        }
        
        onMounted(() => {
            txtSearch.value?.focus()
            window.addEventListener('keydown', handleKeyDown)
        })

        onUnmounted(() => {
            window.removeEventListener('keydown', handleKeyDown)
        })
        
        return {
            txtSearch,
            search,
            selected,
            Features,
            filteredGroups,
            dataUriToSvg,
            select,
        }
    }
}