import { ref, watch, inject } from "vue"

export default {
    template: `
    <button type="button" :aria-label="'Play episode ' + title" @click="toggle()"
            class="flex items-center gap-x-3 font-bold leading-6 text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200 active:text-indigo-900 dark:active:text-indigo-50">
        <div v-if="!playing" class="flex items-center gap-x-1">
            <svg aria-hidden="true" viewBox="0 0 10 10" class="h-3 w-3 fill-current">
                <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
            </svg>
            <span aria-hidden="true">Listen</span>
        </div>
        <div v-else class="flex items-center gap-x-1">
            <svg aria-hidden="true" viewBox="0 0 10 10" class="h-3 w-3 fill-current">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z" />
            </svg>
            <span aria-hidden="true">Listen</span>
        </div>
    </button>    
    `,
    emits: ['play','pause'],
    props: {
      src: String,
      title: String,
      playing: Boolean,
    },
    setup(props, { emit }) {
        
        function toggle() {
            const { src, title } = props
            if (props.playing) {
                emit('pause', null)
            } else {
                emit('play', { src, title })
            }
        }
        
        return { toggle }
    }
}
