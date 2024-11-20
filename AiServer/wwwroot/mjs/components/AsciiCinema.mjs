import { ref, onMounted } from "vue"

export default {
    template:`
        <div ref="el"></div>
    `,
    props:['src','loop','poster','theme','rows'],
    setup(props) {
        const el = ref()
        
        onMounted(() => {
            globalThis.AsciinemaPlayer.create(props.src, el.value, props)
        })
        
        return { el }
    }   
}
