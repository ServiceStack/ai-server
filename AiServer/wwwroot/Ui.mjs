/**
 Image to Text - Get description from image
 Image to Image - Sunset over ocean, make it stormy
 - w/ mask - confine to mask
 Speech to Text - Drop audio + get transcription
 Text to Speech - Get audio from transcription - Comfy UI / pipertts
 Image Upscale - 2x an image
 Media Transform - ffmpeg
 - Crop Image/Video
 - Scale Image/Video
 - Convert Image/Video
 - Trim Video
 - Watermark
 */

import { ref, computed, inject, onMounted, shallowRef, watch, nextTick } from "vue"
import { humanify } from "@servicestack/client"
import { useClient, useAuth } from "@servicestack/vue"
import { Authenticate } from "dtos"

import Chat from "/mjs/components/Chat.mjs"
import TextToImage from "/mjs/components/TextToImage.mjs"
import ImageToText from "/mjs/components/ImageToText.mjs"
import ImageToImage from "/mjs/components/ImageToImage.mjs"
import ImageUpscale from "/mjs/components/ImageUpscale.mjs"
import SpeechToText from "/mjs/components/SpeechToText.mjs"
import TextToSpeech from "/mjs/components/TextToSpeech.mjs"
import Transform from "/mjs/components/Transform.mjs"
import UiHome from "/mjs/components/UiHome.mjs"
import { prefixes, icons } from "/mjs/utils.mjs"

const HomeSection = {
    id: '',
    label: 'Home',
    component: UiHome
}

const components = {
    Chat,
    TextToImage,
    ImageToText,
    ImageToImage,
    ImageUpscale,
    SpeechToText,
    TextToSpeech,
    Transform,
}

export default {
    components: {
        ...components,
    },
    template: `
<div class="min-h-full">
  <nav class="border-b border-gray-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <a href="/" title="Home">
                <img class="cursor-pointer block h-8 w-auto" src="/img/logo.svg" alt="Home">
            </a>
          </div>
          <div class="hidden sm:-my-px sm:ml-2 lg:ml-4 sm:flex sm:space-x-4 xl:space-x-6">
            <a v-href="{admin:section.id,id:undefined}" v-for="section in sections" 
                :class="['inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium', routes.admin==section.id ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']" aria-current="page">
                <span class="lg:hidden xl:inline mr-2" :title="section.label">
                    <img :src="section.icon" class="w-6 h-6" :alt="section.label">
                </span>
                <span class="hidden lg:inline">{{section.label}}</span>
            </a>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">

          <!-- Profile dropdown -->
          <div class="relative ml-3">
            <div>
              <button @click="showUserMenu=!showUserMenu" type="button" class="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" :src="profileUrl" alt="">
              </button>
            </div>

            <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            <div v-if="showUserMenu" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <a href="/auth/logout?redirect=/" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
            </div>
          </div>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button type="button" class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" aria-controls="mobile-menu" aria-expanded="false">
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <!-- Menu open: "hidden", Menu closed: "block" -->
            <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <!-- Menu open: "block", Menu closed: "hidden" -->
            <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu">
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
      <div class="border-t border-gray-200 pb-3 pt-4">
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
          <a href="/auth/logout?redirect=/" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Sign out</a>
        </div>
      </div>
    </div>
  </nav>

  <div class="pb-10">
    <main>
      <div class="mx-auto max-w-7xl pb-8 lg:px-6 lg:px-8">
        <component :key="refreshKey" :is="activeSection.component"></component>
      </div>
    </main>
  </div>
</div>
    `,
    setup() {

        const client = useClient()
        const routes = inject('routes')
        const { user, signIn, signOut } = useAuth()
        const profileUrl = ref(localStorage.getItem('profileUrl') || user.value.profileUrl)
        const refreshKey = ref(1)
        const showUserMenu = ref(false)
        
        function toLabel(id) {
            return humanify(id).replace('To','to')
        }
        const sections = Object.keys(components).map(id => ({
            id,
            label: toLabel(id),
            component: components[id],
            icon: icons[prefixes[id]], 
            prefix: prefixes[id],
        }))

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

        const activeSection = shallowRef(sections[routes.admin] || HomeSection)
        
        function navTo(id, args, pushState=true) {
            if (!args) args = {}

            refreshKey.value++
            activeSection.value = sections.find(x => x.id === id) || HomeSection
            routes.to({ admin: id, ...args })
        }
        watch(() => routes.admin, () => {
            activeSection.value = sections.find(x => x.id === routes.admin) || HomeSection
            refreshKey.value++
        })
        
        onMounted(async () => {
            const api = await client.api(new Authenticate())
            if (api.response) {
                signIn(api.response)
            } else if (api.error) {
                signOut()
                location.reload()
            }
            
            console.log('routes.admin', routes.admin)
            
            nextTick(() =>
                activeSection.value = sections.find(x => x.id === routes.admin) || HomeSection)
        })
        
        return { routes, user, sections, activeSection, profileUrl, refreshKey, showUserMenu, 
            navTo, 
        }
    }
}