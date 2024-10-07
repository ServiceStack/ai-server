import { ref, computed, onMounted, inject, watch, nextTick, getCurrentInstance} from "vue"
import { useFormatters, useClient } from "@servicestack/vue"
import { QueryPrompts, ActiveAiModels, OpenAiChatCompletion } from "dtos"
import {TextToImage} from "../dtos.mjs";

export default {
    template:`
<div class="flex w-full">
    <div class="flex flex-col flex-grow pr-4 overflow-y-auto h-screen pl-1" style="">
        <div>
            
            <div class="text-base px-3 m-auto lg:px-1 pt-3">
                <div class="flex flex-1 gap-4 text-base md:gap-5 lg:gap-6">
                    <form :disabled="waitingOnResponse" class="w-full" type="button" @submit.prevent="send">
                        <div class="relative flex h-full max-w-full flex-1 flex-col">
                            <div class="absolute bottom-full left-0 right-0 z-20">
                                <div class="relative h-full w-full">
                                    <div class="flex flex-col gap-3.5 pb-3.5 pt-2"></div>
                                </div>
                            </div>
                            <div class="flex flex-col w-full items-center">
                                
                                <fieldset class="w-full">
                                    <ErrorSummary :except="visibleFields" class="mb-4" />
                                    <div class="grid grid-cols-6 gap-4">
                                        <div class="col-span-6 sm:col-span-2">
                                            <TextInput id="model" v-model="request.model" required placeholder="Model to use" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-4">
                                            <TextInput id="negativePrompt" v-model="request.negativePrompt" required placeholder="Negative Prompt" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-1">
                                            <TextInput type="number" id="width" v-model="request.width" min="0" required />
                                        </div>
                                        <div class="col-span-6 sm:col-span-1">
                                            <TextInput type="number" id="height" v-model="request.height" min="0" required />
                                        </div>
                                        <div class="col-span-6 sm:col-span-1">
                                            <TextInput type="number" id="batchSize" v-model="request.batchSize" min="0" required />
                                        </div>
                                        <div class="col-span-6 sm:col-span-1">
                                            <TextInput type="number" id="seed" v-model="request.seed" min="0" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-2">
                                            <TextInput id="tag" v-model="request.tag" placeholder="Tag" />
                                        </div>
                                    </div>

                                    <div class="mt-4 flex w-full flex-col gap-1.5 rounded-lg p-1.5 transition-colors bg-[#f4f4f4]">
                                        <div class="flex items-end gap-1.5 md:gap-2">
                                            <div class="pl-4 flex min-w-0 flex-1 flex-col">
                                                <textarea ref="refMessage" id="txtMessage" v-model="request.positivePrompt" :disabled="waitingOnResponse" rows="1" 
                                                    placeholder="Generate Image Prompt..." @keydown.ctrl.enter="send"
                                                    :class="[{'opacity-50' : waitingOnResponse},'m-0 resize-none border-0 bg-transparent px-0 text-token-text-primary focus:ring-0 focus-visible:ring-0 max-h-[25dvh] max-h-52']" 
                                                    style="height: 40px; overflow-y: hidden;"></textarea>
                                            </div>
                                            <button :disabled="!validPrompt || waitingOnResponse" title="Send (CTRL+Enter)" 
                                                class="mb-1 me-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:bg-[#D7D7D7] disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:bg-white dark:text-black dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary">
                                                <svg v-if="!waitingOnResponse" class="ml-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267z"/></svg>
                                                <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M8 16h8V8H8zm4 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                </fieldset>
                                            
                            </div>
                        </div>
                    </form>     
                </div>
            </div>
                        
        </div>
    </div>
    <div class="w-60 md:w-72 h-screen border-l h-full md:py-2 md:px-2 bg-white">
        <h3 class="p-2 sm:block text-xl md:text-2xl font-semibold">History</h3>
    </div>
</div>
    `,
    setup(props) {
        const waitingOnResponse = ref(false)
        const prefs = ref(JSON.parse(localStorage.getItem('image2text.prefs') || JSON.stringify({ model: '', prompt: '' })))
        const validPrompt = computed(() => newMessage.value && prefs.value.model)
        const newMessage = ref('')
        const refMessage = ref()
        const refBottom = ref()
        const visibleFields = 'positivePrompt,negativePrompt,width,height,batchSize,seed,tag'.split(',')
        const defaults = {
            negativePrompt: '(nsfw),(explicit),(gore),(violence),(blood)',
            width: 1024,
            height: 1024,
            batchSize: 4,
        }
        const request = ref(new TextToImage(defaults))

        async function send() {
        }
        
        return {
            request,
            visibleFields,
            waitingOnResponse,
            validPrompt,
            newMessage,
            refMessage,
            refBottom,
            send,
        }
    }
}