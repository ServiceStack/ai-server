import { inject } from "vue"
import SignInForm from "./SignInForm.mjs"

export default {
    components: {
        SignInForm,  
    },
    template:`
        <sign-in-form @done="routes.to({ admin:undefined })"></sign-in-form>
    `,
    setup() {
        const routes = inject('routes')
        
        return { routes }
    }
}