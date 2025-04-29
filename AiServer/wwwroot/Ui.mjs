import { ref, computed, inject, onMounted, onUnmounted, shallowRef, watch, nextTick } from "vue"
import { useClient, useAuth } from "@servicestack/vue"
import { Authenticate } from "dtos"

import { Features, Components, FeatureGroups } from "./mjs/components/Features.mjs";
import SignIn from "/mjs/components/SignIn.mjs"
import UiHome from "/mjs/components/UiHome.mjs"
import SignInForm from "/mjs/components/SignInForm.mjs"
import ShellCommand from "./mjs/components/ShellCommand.mjs"
import CommandPalette from "./mjs/components/CommandPalette.mjs"
import { prefixes, icons, uiLabel } from "/mjs/utils.mjs"

const HomeSection = {
    id: '',
    label: 'Home',
    component: UiHome
}

export default {
    components: {
        SignIn,
        SignInForm,
        ShellCommand,
        CommandPalette,
        ...Components,
    },
    template: `
<div class="min-h-full">
  <CommandPalette v-if="showPalette" @done="showPalette=false" />
  <nav class="border-b border-gray-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <a href="/" title="Home">
                <img class="cursor-pointer block h-6 w-auto" :src="icons.home" alt="Home">
            </a>
          </div>
          <div class="hidden sm:-my-px sm:ml-2 lg:ml-4 sm:flex sm:space-x-4 xl:space-x-6">
            <a v-for="section in FeatureGroups" v-href="{admin:section.features[0]?.id,id:undefined}" aria-current="page" 
                :class="['inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium', 
                    section.features.some(x => x.id === routes.admin) ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']">
                <span class="lg:hidden xl:inline mr-2" :title="section.label">
                    <img :src="section.icon" class="w-6 h-6" :alt="section.label">
                </span>
                <span class="hidden lg:inline whitespace-nowrap">{{section.label}}</span>
            </a>
            <div class="flex items-center">
                <button type="button" aria-label="Search" @click="showPalette=!showPalette" 
                    class="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 ring-1 ring-gray-200 hover:ring-green-500 text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="-ml-0.5 size-4 fill-gray-400 hover:fill-gray-600"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd"></path></svg>
                    <span class="text-sm">Search</span>
                    <span class="hidden md:block text-gray-400 text-sm leading-5 py-0 px-1.5 mr-1.5 border border-gray-300 border-solid rounded-md" style="opacity: 1;">
                        <span class="sr-only">Press </span>
                        <kbd class="font-sans">/</kbd>
                        <span class="sr-only"> to search</span>
                    </span>
                </button>
            </div>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">

          <!-- Profile dropdown -->
          <div v-if="user" class="relative ml-3">
            <div>
              <button @click="showUserMenu=!showUserMenu" type="button" class="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" :src="profileUrl ?? icons.user" alt="">
              </button>
            </div>
            <div v-if="showUserMenu" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <a v-if="hasRole('Admin')" href="/admin" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1">Admin</a>
              <a href="/auth/logout?redirect=/" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1">Sign out</a>
            </div>
          </div>
          <div v-else>
            <SecondaryButton @click="routes.to({ admin:'SignIn' })">Sign In</SecondaryButton>
          </div>
        </div>
        <div @click="showMobileMenu=!showMobileMenu" class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button type="button" class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" aria-controls="mobile-menu" aria-expanded="false">
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg :class="showMobileMenu ? 'hidden' : 'block h-6 w-6'" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg :class="showMobileMenu ? 'block h-6 w-6': 'hidden'" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="user && showMobileMenu" class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 pb-3 pt-2">
        <!-- Current: "border-indigo-500 bg-indigo-50 text-indigo-700", Default: "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800" -->
        <a v-href="{admin:section.id,id:undefined}" v-for="section in sections" 
            :class="['block border-l-4 py-2 pl-3 pr-4 text-base font-medium', routes.admin==section.id 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800']" aria-current="page">
            <span class="">{{section.label}}</span>
        </a>
        <a href="/auth/logout?redirect=/" class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800" tabindex="-1">Sign out</a>
      </div>
      <div v-if="user" class="border-t border-gray-200 pb-3 pt-4">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="profileUrl" alt="">
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{user.displayName}}</div>
            <div class="text-sm font-medium text-gray-500">{{user.userName}}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <a v-if="hasRole('Admin')" href="/admin" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Admin</a>
          <a href="/auth/logout?redirect=/" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Sign out</a>
        </div>
      </div>
    </div>
  </nav>

  <div class="pb-10">
    <main>
      <div class="mx-auto max-w-7xl pb-8 lg:px-6 lg:px-8">
        <SignIn v-if="routes.admin=='SignIn'" />
        <SignInForm v-else-if="routes.admin && !user" />
        <div v-else :key="refreshKey">
            <div v-if="activeFeature?.features?.length > 0" class="border-b py-2">
              <div class="grid grid-cols-1 sm:hidden">
                <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                <select aria-label="Select a tab" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                 @change="routes.to({ admin:$event.target.value,id:undefined })">
                  <option v-for="feature in activeFeature.features" :value="feature.id" :selected="feature.id==routes.admin">{{feature.label}}</option>
                </select>
                <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="hidden sm:block">
                <nav class="flex space-x-4" aria-label="Tabs">
                  <!-- Current: "bg-indigo-100 text-indigo-700", Default: "text-gray-500 hover:text-gray-700" -->
                  <a v-for="feature in activeFeature.features" v-href="{admin:feature.id,id:undefined}" 
                    :class="['rounded-md px-3 py-2 text-sm font-medium', 
                        feature.id==routes.admin ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700']">
                    {{feature.label}}
                  </a>
                </nav>
              </div>
            </div>
            <component :is="activeSection.component"></component>
        </div>
      </div>
    </main>
  </div>
</div>
    `,
    setup() {

        const client = useClient()
        const routes = inject('routes')
        const { user, hasRole, signIn, signOut } = useAuth()
        const profileUrl = ref(localStorage.getItem('profileUrl') || user.value?.profileUrl)
        const refreshKey = ref(1)
        const showMobileMenu = ref(false)
        const showUserMenu = ref(false)
        const showPalette = ref(false)
        
        const sections = Object.values(Features)

        const overrides = {
            ImageUpscale: {
                label: 'Upscale',
            },
        }
        Object.keys(overrides).forEach(id => {
            const section = sections.find(x => x.id === id)
            if (section) {
                const override = overrides[id]
                Object.keys(override).forEach(k => {
                    section[k] = override[k]
                })
            }
        })

        const activeSection = shallowRef(sections.find(x => x.id === routes.admin) || HomeSection)
        const activeFeature = shallowRef(FeatureGroups.find(f => f.features.some(p => p.id === routes.admin))) 
        
        function navTo(id, args, pushState=true) {
            if (!args) args = {}

            refreshKey.value++
            activeSection.value = sections.find(x => x.id === id) || HomeSection
            activeFeature.value = FeatureGroups.find(f => f.features.some(p => p.id === routes.admin))
            routes.to({ admin: id, ...args })
        }
        watch(() => routes.admin, () => {
            activeSection.value = sections.find(x => x.id === routes.admin) || HomeSection
            activeFeature.value = FeatureGroups.find(f => f.features.some(p => p.id === routes.admin))
            if (!profileUrl.value) profileUrl.value = localStorage.getItem('profileUrl') || user.value?.profileUrl
            refreshKey.value++
        })
        
        const inputTags = ['TEXTAREA','INPUT','SELECT']
        function handleKeyDown(e) {
            //console.log('handleKeyDown', e, e.target?.tagName)
            if (inputTags.includes(e.target?.tagName)) return
            if (e.key === '/') {
                showPalette.value = true
                e.preventDefault()
            }
            if (e.code === 'Escape') {
                showPalette.value = false
                e.preventDefault()
            }
        }
        
        onMounted(async () => {
            const api = await client.api(new Authenticate())
            if (api.response) {
                signIn(api.response)
            } else if (api.error) {
                signOut()
                // location.reload()
            }
            
            console.log('routes.admin', routes.admin)
            
            window.addEventListener('keydown', handleKeyDown)
            
            nextTick(() =>
                activeSection.value = sections.find(x => x.id === routes.admin) || HomeSection)
        })
        
        onUnmounted(() => {
            window.removeEventListener('keydown', handleKeyDown)
        })
        
        return { refreshKey, routes, user, hasRole, profileUrl, 
            FeatureGroups, sections, activeSection, activeFeature,
            showMobileMenu, showUserMenu, showPalette,
            icons, navTo, 
        }
    }
}