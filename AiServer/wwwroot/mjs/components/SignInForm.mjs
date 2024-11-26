import { ref } from "vue"
import { useClient, useAuth } from "@servicestack/vue"
import { Authenticate } from "../dtos.mjs"
import { Img } from "/mjs/utils.mjs"

export default {
    template:`
    <div class="mt-8 text-left sm:mx-auto sm:w-full sm:max-w-md">
        <ErrorSummary class="mb-3" except="username,password" />
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form @submit.prevent="submit">
                <div class="flex flex-1 flex-col justify-between">
                    <div class="divide-y divide-gray-200">
                        <div class="space-y-6 pt-6 pb-5">
                            <fieldset class="grid grid-cols-12 gap-6">
                                <text-input class="w-full col-span-12" type="text" id="username" v-model="request.userName" label="Display Name"></text-input>
                                <text-input class="w-full col-span-12" type="password" id="password" v-model="request.password" label="API Key"></text-input>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="mt-8">
                    <PrimaryButton class="w-full">Sign In</PrimaryButton>
                </div>
            </form>
        </div>
    </div>
    `,
    emits:['done'],
    setup(props, { emit }) {
        const client = useClient()
        const { user, signIn } = useAuth()

        const request = ref(new Authenticate({
            provider: 'credentials',
            userName: localStorage.getItem('displayName') ?? '',
        }))

        async function submit() {
            let api = await client.api(request.value)
            if (api.response) {
                localStorage.setItem('displayName', request.value.userName)
                if (!localStorage.getItem('profileUrl')) {
                    localStorage.setItem('profileUrl', Img.createSvgDataUri(request.value.userName[0].toUpperCase()))
                }
                // api = await client.api(new Authenticate())
                if (api.response) {
                    signIn(api.response)
                    emit('done')
                }
            }
        }

        return { user, request, submit }
    }
}
