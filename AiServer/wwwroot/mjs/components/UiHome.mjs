import { ref, inject, watch, onMounted } from "vue"
import { langs, openAi } from "../langs.mjs"
import { prefixes, icons, uiLabel } from "../utils.mjs"

export default {
    template: `
<div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-base font-semibold leading-7 text-indigo-600">Open Source AI Server</h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Unified APIs for LLM APIs, Ollama, ComfyUI &amp; FFmpeg 
      </p>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        Self-hosted private gateway to manage access to multiple LLM APIs, Ollama endpoints, 
        Comfy UI and FFmpeg Agents 
      </p>
    </div>
    <div class="mt-8 flex justify-center">
        <a href="https://docs.servicestack.net/ai-server/">
            <img class="h-[500px]" src="/img/overview.svg" alt="">
        </a>
    </div>
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
      <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        <div class="flex flex-col">
          <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
            <img :src="icons.one" class="h-5 w-5 flex-none text-indigo-600">
            Simple Unified API
          </dt>
          <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
            <p class="flex-auto">
                One-stop solution to manage an organization's AI integrations for their System Apps,
                utilizing developer friendly HTTP JSON APIs that supports any programming language or framework
            </p>
          </dd>
        </div>
        <div class="flex flex-col">
          <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
            <img :src="icons.typed" class="h-5 w-5 flex-none text-indigo-600">
            Native Typed Integrations
          </dt>
          <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
            <p class="flex-auto">
                 Simple, native typed integrations available for most popular Web, Mobile and Desktop languages including:
                 C#, TypeScript, JavaScript, Python, Java, Kotlin, Dart, PHP, Swift, F# and VB.NET
            </p>
          </dd>
        </div>
        <div class="flex flex-col">
          <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
            <img :src="icons.monitoring" class="h-5 w-5 flex-none text-indigo-600">
            Live Monitoring and Analytics
          </dt>
          <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
            <p class="flex-auto">
                Monitor performance and statistics of your App's AI Usage,   
                real-time logging of executing APIs and auto archival of 
                completed AI Requests into monthly rolling databases
            </p>
          </dd>
        </div>
      </dl>
    </div>
    
    
<div class="overflow-hidden bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">

    <div class="mb-4">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select id="tabs" name="tabs" @change="routes.to({ lang:$event.target.value })" 
            class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
          <option v-for="(label,lang) in langs" :value="lang">{{label}}</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex" aria-label="Tabs">
            <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
            <div v-for="(label,lang) in langs" v-href="{ lang }" 
                :class="['cursor-pointer w-1/4 border-b-2 px-1 py-2 text-center text-sm font-medium text-gray-500', lang == (routes.lang || 'csharp') ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']">
                <div class="flex flex-col justify-center items-center">
                    <img :src="'/img/langs/' + lang + '.svg'" class="w-8 h-8">
                    <span class="mt-3">{{label}}</span>
                </div>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div class="lg:pr-8 lg:pt-4">
        <div class="lg:max-w-lg">
          <h2 class="text-base font-semibold leading-7 text-indigo-600">Developer APIs</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Open AI Chat</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Example of calling an Open AI compatible Chat API. AI Server APIs are executed using 
            the same generic JSON Service Client and the native Typed DTOs generated in each language.
            Each feature supports different call styles for different use-cases.
          </p>
          <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
            <div class="relative pl-9">
              <dt class="inline font-semibold text-gray-900">
                <img class="absolute left-1 top-1 h-5 w-5 text-indigo-600" :src="icons.sync">
                Synchronous API <span class="px-1" aria-hidden="true">·</span>
              </dt>
              <dd class="inline">
                Simplest API ideal for small workloads where the Response is returned
                in the same Request
              </dd>
            </div>
            <div class="relative pl-9">
              <dt class="inline font-semibold text-gray-900">
                <img class="absolute left-1 top-1 h-5 w-5 text-indigo-600" :src="icons.queue">
                Queued API <span class="px-1" aria-hidden="true">·</span>
              </dt>
              <dd class="inline">
                Returns a reference to the queued job executing the AI Request which can be used to
                poll for the API Response
              </dd>
            </div>
            <div class="relative pl-9">
              <dt class="inline font-semibold text-gray-900">
                <img class="absolute left-1 top-1 h-5 w-5 text-indigo-600" :src="icons.reply">
                Reply to Web Callback <span class="px-1" aria-hidden="true">·</span>
              </dt>
              <dd class="inline">
                Ideal for reliable App integrations where responses are posted back to a custom URL Endpoint
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div>
          <div class="flex items-center pt-20">
            <div v-html="openAi.html[routes.lang || 'csharp']"></div>
          </div>
            
            <nav class="flex" aria-label="Breadcrumb">
              <ol role="list" class="flex items-center space-x-4">
                <li>
                  <div>
                    <a :href="'/ui/OpenAiChatCompletion?tab=code&detailSrc=OpenAiChat&lang=' + (routes.lang || 'csharp')" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">
                        Usage from {{langs[routes.lang || 'csharp']}}
                    </a>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg class="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                    <a href="/ui/OpenAiChatCompletion?tab=details" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        API Explorer Docs
                    </a>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg class="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                    <a href="https://docs.servicestack.net/ai-server/chat" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        About Open AI Chat API
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
      </div>
    </div>
    
  </div>
</div>

    <div class="py-12 lg:pb-40">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
      
      
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Built-in UIs</h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Users also have access to custom UIs to access AI features protected by API Keys
          </p>
        </div>
        
        <div class="mt-12 border-b border-gray-200">
          <nav class="-mb-px flex" aria-label="Tabs">
            <div v-for="ui in uis" @click="routes.to({ op:ui.id })" 
                :class="['cursor-pointer w-1/4 border-b-2 px-1 py-2 text-center text-sm font-medium text-gray-500', ui.id == (routes.op || 'Chat') ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']">
                <div class="flex flex-col justify-center items-center">
                    <img :src="ui.icon" class="w-8 h-8">
                    <span class="hidden md:inline mt-3">{{ui.label}}</span>
                </div>
            </div>
          </nav>
        </div>
                
        <div class="mt-8 flow-root">
          <div class="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <img :src="'/img/uis/'+(routes.op || 'chat')+'.webp'" alt="App screenshot" width="2432" height="1442" class="rounded-md shadow-2xl ring-1 ring-gray-900/10">
          </div>
        </div>
      </div>
    </div>    
    
    <div class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">

        <div class="py-8 flex justify-center gap-8">
            <a href="https://docs.servicestack.net/ai-server/" class="rounded-full bg-indigo-600 px-16 py-6 text-2xl text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Read the docs</a>
            <a href="https://github.com/ServiceStack/ai-server" class="rounded-full bg-white px-16 py-6 text-2xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">View the source</a>
        </div>
    
        <h3 class="mt-32 mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            Explore
        </h3>
        <p class="mx-auto mb-5 max-w-prose text-xl text-gray-500">
            Learn about available APIs and Features
        </p>

        <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
            <div class="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                <div>
                  <span class="inline-flex rounded-lg bg-sky-50 p-3 text-sky-700 ring-4 ring-white">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                        <path d="M11 14h1v4h1" />
                        <path d="M12 11h.01" />
                    </svg>
                  </span>
                </div>
                <div class="mt-8">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">
                        <a href="https://docs.servicestack.net/ai-server" class="focus:outline-none">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            AI Server Documentation
                        </a>
                    </h3>
                    <p class="mt-2 text-sm text-gray-500">Learn about how to configure and use AI Server</p>
                </div>
                <span class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
                  </svg>
                </span>
            </div>

            <div class="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:rounded-tr-lg">
                <div>
                  <span class="inline-flex rounded-lg bg-purple-50 p-3 text-purple-700 ring-4 ring-white">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                         aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>
                    </svg>
                  </span>
                </div>
                <div class="mt-8">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">
                        <a href="/ui" class="focus:outline-none">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            API Explorer
                        </a>
                    </h3>
                    <p class="mt-2 text-sm text-gray-500">Explore available APIs via API Explorer</p>
                </div>
                <span class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
                  </svg>
                </span>
            </div>
        </div>

        <h3 class="mt-32 mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            Admin
        </h3>
        <p class="mx-auto mb-5 max-w-prose text-xl text-gray-500">
            Manage AI and Media Providers and other Admin Tasks
        </p>

        <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">

            <div class="group relative rounded-tl-lg rounded-tr-lg bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:rounded-tr-none">
                <div>
                  <span class="inline-flex rounded-lg bg-teal-50 p-3 text-teal-700 ring-4 ring-white">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                         aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </span>
                </div>
                <div class="mt-8">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">
                        <a href="/admin/" class="focus:outline-none">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            Admin Portal
                        </a>
                    </h3>
                    <p class="mt-2 text-sm text-gray-500">
                        Admin Users can manage this AI Server instance via the Admin Portal
                    </p>
                </div>
                <span class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
                  </svg>
                </span>
            </div>

            <div class="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                <div>
                  <span class="inline-flex rounded-lg bg-yellow-50 p-3 text-yellow-700 ring-4 ring-white">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
                    </svg>
                  </span>
                </div>
                <div class="mt-8">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">
                        <a href="/admin-ui" class="focus:outline-none">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            Admin UI
                        </a>
                    </h3>
                    <p class="mt-2 text-sm text-gray-500">
                        Manage API Keys, View Databases, Executed Commands with the Admin UI
                    </p>
                </div>
                <span class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
                  </svg>
                </span>
            </div>
        </div>

    </div>
    
    
  </div>
</div>    
    `,
    setup() {
        const routes = inject('routes')
        
        onMounted(() => {
        })
        
        const uis = Object.keys(prefixes).map(id => ({
            id,
            label: uiLabel(id),
            icon: icons[prefixes[id]],
            prefix: prefixes[id],
        }))
        
        return { routes, langs, openAi, icons, uis }
    }
}

//https://localhost:5005/ui/OpenAiChatCompletion?tab=details&lang=csharp&detailSrc=OpenAiChat
