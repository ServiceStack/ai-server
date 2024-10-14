import { ref, computed, nextTick, shallowRef, onMounted, onUnmounted } from "vue"

const ForwardIcon = {
    template: `
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M16 5L19 8M19 8L16 11M19 8H10.5C7.46243 8 5 10.4624 5 13.5C5 15.4826 5.85204 17.2202 7 18.188"
        stroke-width="1.5" stroke-line-cap="round" stroke-line-join="round" />
      <path d="M13 15V19" stroke-width="1.5" stroke-line-cap="round" stroke-line-join="round" />
      <path d="M16 18V16C16 15.4477 16.4477 15 17 15H18C18.5523 15 19 15.4477 19 16V18C19 18.5523 18.5523 19 18 19H17C16.4477 19 16 18.5523 16 18Z"
        stroke-width="1.5" stroke-line-cap="round" stroke-line-join="round" />
    </svg>`
}
const ForwardButton = {
    components: { ForwardIcon },
    template: `
    <button type="button"
      class="group relative rounded-full focus:outline-none"
      @click="player.seekBy(amount ?? 10)" :aria-label="'Fast-forward ' + (amount ?? 10) + ' seconds'">
      <div class="absolute -inset-4 -left-2 md:hidden" />
      <ForwardIcon class="h-6 w-6 stroke-slate-500 group-hover:stroke-slate-700" />
    </button>`,
    props: { player:Object, amount:Number },
}

const MuteIcon = {
    template:`
    <svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2" stroke-line-cap="round" stroke-line-join="round">
        <template v-if="muted">
          <path d="M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z" />
          <path d="M16 10L19 13" fill="none" />
          <path d="M19 10L16 13" fill="none" />
        </template>
        <template v-else>
          <path d="M12 6L8 10H6C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14H8L12 18V6Z" />
          <path d="M17 7C17 7 19 9 19 12C19 15 17 17 17 17" fill="none" />
          <path d="M15.5 10.5C15.5 10.5 16 10.9998 16 11.9999C16 13 15.5 13.5 15.5 13.5" fill="none" />
        </template>
    </svg>`,
    props: { muted:Boolean }
}
const MuteButton = {
    components: { MuteIcon },
    template:`
        <button type="button" :aria-label="player.muted ? 'Unmute' : 'Mute'"
              class="group relative rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 md:order-none"
              @click="player.toggleMute()">
          <div class="absolute -inset-4 md:hidden" />
          <MuteIcon :muted="player.muted"
            class="h-6 w-6 fill-slate-500 stroke-slate-500 group-hover:fill-slate-700 group-hover:stroke-slate-700" />
        </button>
    `,
    props: { player:Object },
}

const playbackRates = [
    {
        value: 1,
        icon:  {
            template:`
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5" stroke-line-cap="round" stroke-line-join="round">
                    <path d="M13 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V3C15 1.89543 14.1046 1 13 1Z"
                        fill="currentColor" stroke="currentColor" stroke-width="2" />
                    <path d="M3.75 7.25L5.25 5.77539V11.25" />
                    <path d="M8.75 7.75L11.25 10.25" />
                    <path d="M11.25 7.75L8.75 10.25" />
                </svg>
            `,
        },
    },
    {
        value: 1.5,
        icon: {
            template: `
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5" stroke-line-cap="round" stroke-line-join="round">
                    <path
                        d="M13 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V3C15 1.89543 14.1046 1 13 1Z"
                        fill="currentColor" stroke="currentColor" stroke-width="2" />
                    <path d="M2.75 7.25L4.25 5.77539V11.25" />
                    <path d="M7.5 11C7.5 11.2761 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.2761 6.5 11C6.5 10.7239 6.72386 10.5 7 10.5C7.27614 10.5 7.5 10.7239 7.5 11Z" stroke-width="1"/>
                    <path d="M12.25 5.75H9.75V8.25H10.75C11.5784 8.25 12.25 8.92157 12.25 9.75V9.75C12.25 10.5784 11.5784 11.25 10.75 11.25H9.75" />
                </svg>            
            `
        },
    },
    {
        value: 2,
        icon: {
            template: `
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.5" stroke-line-cap="round" stroke-line-join="round">
                    <path d="M13 1H3C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V3C15 1.89543 14.1046 1 13 1Z"
                        fill="currentColor" stroke="currentColor" stroke-width="2" />
                    <path d="M9.75 8.75L12.25 11.25" />
                    <path d="M12.25 8.75L9.75 11.25" />
                    <path d="M3.75 7.25C3.75 7.25 3.90144 5.75 5.63462 5.75C6.1633 5.75 6.5448 5.95936 6.81973 6.25035C7.67157 7.15197 6.97033 8.47328 6.0238 9.28942L3.75 11.25H7.25" />
                </svg>            
            `
        },
    },
]
const PlaybackRateButton = {
    template:`
    <button type="button"
          class="relative flex h-6 w-6 items-center justify-center rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          @click="nextPlaybackRate()"
          aria-label="Playback rate">
      <div class="absolute -inset-4 md:hidden"></div>
      <component :is="playbackRate.icon" class="h-4 w-4" />
    </button>    
    `,
    props: { player:Object },
    setup(props) {
        const playbackRate = shallowRef(playbackRates[0])
        function nextPlaybackRate() {
            let existingIdx = playbackRates.indexOf(playbackRate.value)
            let idx = (existingIdx + 1) % playbackRates.length
            let next = playbackRates[idx]
            playbackRate.value = next
            props.player.playbackRate(next.value)
        }
        return { playbackRate, nextPlaybackRate }
    }
}

const PlayButton = {
    template:`
        <button type="button" :aria-label="player.isPlaying ? 'Pause' : 'Play'"
              class="group relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 dark:bg-slate-200 hover:bg-slate-900 dark:hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-700 dark:focus:ring-slate-200 focus:ring-offset-2 dark:ring-offset-black md:h-14 md:w-14"
              @click="player.toggle()">
          <div class="absolute -inset-3 md:hidden" />
            <svg v-if="player.isPlaying" viewBox="0 0 36 36" aria-hidden="true" class="h-5 w-5 fill-white dark:fill-black group-active:fill-white/80 dark:group-active:fill-black/80 md:h-7 md:w-7">
              <path d="M8.5 4C7.67157 4 7 4.67157 7 5.5V30.5C7 31.3284 7.67157 32 8.5 32H11.5C12.3284 32 13 31.3284 13 30.5V5.5C13 4.67157 12.3284 4 11.5 4H8.5ZM24.5 4C23.6716 4 23 4.67157 23 5.5V30.5C23 31.3284 23.6716 32 24.5 32H27.5C28.3284 32 29 31.3284 29 30.5V5.5C29 4.67157 28.3284 4 27.5 4H24.5Z" />
            </svg>    
            <svg v-else viewBox="0 0 36 36" aria-hidden="true" class="h-5 w-5 fill-white dark:fill-black group-active:fill-white/80 dark:group-active:fill-black/80 md:h-7 md:w-7">
              <path d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z" />
            </svg>
        </button>    
    `,
    props: { player:Object },
}

const RewindIcon = {
    template:`
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-line-cap="round" stroke-line-join="round">
      <path d="M8 5L5 8M5 8L8 11M5 8H13.5C16.5376 8 19 10.4624 19 13.5C19 15.4826 18.148 17.2202 17 18.188" />
      <path d="M5 15V19" />
      <path d="M8 18V16C8 15.4477 8.44772 15 9 15H10C10.5523 15 11 15.4477 11 16V18C11 18.5523 10.5523 19 10 19H9C8.44772 19 8 18.5523 8 18Z" />
    </svg>`,
}
const RewindButton = {
    components: { RewindIcon },
    template:`
        <button type="button"
              class="group relative rounded-full focus:outline-none"
              @click="player.seekBy(-(amount??10))"
              :aria-label="'Rewind ' + (amount??10) + ' seconds'">
          <div class="absolute -inset-4 -right-2 md:hidden" />
          <RewindIcon class="h-6 w-6 stroke-slate-500 group-hover:stroke-slate-700" />
        </button>`,
    props: { player:Object, amount:Number },
}

const Slider = {
    template:`
      <div class="w-full flex items-center">
        <div ref="sliderRef"
          class="relative flex-grow h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
          @click="handleClick"
          @mousedown="startDrag"
          @mousemove="handleDrag"
          @mouseup="stopDrag"
          @mouseleave="stopDrag">
          <div class="absolute top-0 left-0 h-full bg-blue-500 rounded-full" 
            :style="{ width: progress + '%' }"></div>
          <div class="absolute top-1/2 -mt-2 w-4 h-4 bg-white dark:bg-black border-2 border-blue-500 rounded-full shadow"
            :style="{ left: 'calc(' + progress + '% - 0.5rem)' }"></div>
        </div>
        <div class="hidden ml-2 items-center gap-2 md:flex whitespace-nowrap">
            <span class="hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 md:block text-slate-500 dark:text-slate-400">{{ formatTime(currentTime) }}</span>
            <span class="text-sm leading-6 text-slate-300 dark:text-slate-600" aria-hidden="true">/</span>
            <span class="hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 text-slate-500 dark:text-slate-400 md:block">{{ formatTime(duration) }}</span>
        </div>                    
      </div>    
    `,
    emits: ['update:currentTime'],
    props: {
        currentTime: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 0
        }
    },
    setup(props, { emit }) {
        const sliderRef = ref(null)
        const isDragging = ref(false)
        const progress = computed(() => (props.duration > 0 ? (props.currentTime / props.duration) * 100 : 0))
        function startDrag() {
            isDragging.value = true;
        }
        function stopDrag() {
            isDragging.value = false
        }
        function handleDrag(event) {
            if (isDragging.value) {
                updateProgress(event)
            }
        }
        function handleClick(event) {
            updateProgress(event)
        }
        function updateProgress(event) {
            if (sliderRef.value) {
                const rect = sliderRef.value.getBoundingClientRect()
                const offsetX = event.clientX - rect.left
                const newProgress = (offsetX / rect.width) * 100
                const newTime = (props.duration * newProgress) / 100
                emit('update:currentTime', newTime)
            }
        }

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60)
            const seconds = Math.floor(time % 60)
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        };
        onMounted(() => {
            document.addEventListener('mouseup', stopDrag)
        })
        onUnmounted(() => {
            document.removeEventListener('mouseup', stopDrag)
        })
        return {
            sliderRef,
            progress,
            formatTime,
            startDrag,
            stopDrag,
            handleDrag,
            handleClick,
        }
    }
}

const AudioPlayer = {
    components: {
        PlayButton,
        MuteButton,
        RewindButton,
        ForwardButton,
        PlaybackRateButton,
        Slider,
    },
    template:`
        <div v-if="src" :class="v.cls">
            <audio ref="refPlayer"
                @play="onPlay()" @pause="onPause()"
                @timeupdate="onTimeUpdate(Math.floor($event.currentTarget.currentTime))"
                @durationchange="onDurationChange(Math.floor($event.currentTarget.duration))"
                :muted="muted"
            />
            <div class="hidden md:block">
                <PlayButton :player="player"/>
            </div>
            <div :class="v.innerCls">
                <a :href="'/podcasts/' + id"
                    class="truncate text-center text-sm font-bold leading-6 md:text-left"
                    :title="title">
                    {{title}}
                </a>
                <div :class="v.controlsCls">
                    <div :class="v.startControlsCls">
                        <MuteButton :player="player"/>
                    </div>
                    <div :class="v.midControlsCls">
                        <RewindButton :player="player"/>
                        <div class="md:hidden">
                            <PlayButton :player="player"/>
                        </div>
                        <ForwardButton :player="player"/>
                    </div>
                    <Slider :currentTime="currentTime" :duration="duration" @update:currentTime="player.currentTime=$event" />
                    <div :class="v.endControlsCls">
                        <div class="flex items-center">
                            <PlaybackRateButton :player="player"/>
                        </div>
                        <div class="hidden items-center md:flex">
                            <MuteButton :player="player"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    `,
    props: {
        bus: Object,
        id: String,
        title: String,
        src: String,
        playbackRate: Number,
        currentTime: Number,
        autoPlay: Boolean,
        variant: String,
        beaconUrl: String,
        cls: { 
            type: String,
            default: 'flex items-center gap-6 bg-white/90 dark:bg-black/90 px-4 py-4 shadow shadow-slate-200/80 dark:shadow-slate-700/80 ring-1 ring-slate-900/5 dark:ring-slate-50/5 backdrop-blur-sm md:px-6'
        },
        innerCls: {
            type: String,
            default: 'mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1'
        },
        controlsCls: {
            type: String,
            default: 'flex justify-between gap-6'
        },
        startControlsCls: {
            type: String,
            default: 'flex items-center md:hidden'
        },
        midControlsCls: {
            type: String,
            default: 'flex flex-none items-center gap-4'
        },
        endControlsCls: {
            type: String,
            default: 'flex items-center gap-4'
        },
    },
    emit: ['playing','paused'],
    setup(props, { emit, expose }) {
        const refPlayer = ref()
        const muted = ref(false)
        const state = ref('paused')
        const currentTime = ref()
        const duration = ref()
        const playbackRate = ref(props.playbackRate || 1)

        const variants = {
            cls: {
                compact: 'flex items-center bg-white/90 dark:bg-black/90 shadow shadow-slate-200/80 dark:shadow-slate-700/80 ring-1 ring-slate-900/5 dark:ring-slate-50/5 backdrop-blur-sm gap-2 pl-1 pr-4 rounded-full'
            },
            innerCls: {
                compact: 'mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-1 overflow-hidden p-1'
            },
            controlsCls: {
                compact: 'flex justify-between gap-2'
            },
            startControlsCls: {},
            midControlsCls: {
                compact: 'flex flex-none items-center gap-1 mr-1'
            },
            endControlsCls: {
                compact: 'flex items-center gap-1'
            },
        }
        const v = {
            cls: variants.cls[props.variant] ?? props.cls,
            innerCls: variants.innerCls[props.variant] ?? props.innerCls,
            controlsCls: variants.controlsCls[props.variant] ?? props.controlsCls,
            startControlsCls: variants.startControlsCls[props.variant] ?? props.startControlsCls,
            midControlsCls: variants.midControlsCls[props.variant] ?? props.midControlsCls,
            endControlsCls: variants.endControlsCls[props.variant] ?? props.endControlsCls,
        }

        function onPlay() {
            state.value = 'playing'
            const { src, title } = props
            emit('playing', { src, title })
        }
        function onPause() {
            state.value = 'paused'
            emit('paused', null)
        }
        function onTimeUpdate(time) {
            currentTime.value = time
        }
        function onDurationChange(value) {
            duration.value = value
        }
        
        const player = globalThis.player = {
            get url() { return props.url },
            get id() { return props.id },
            get title() { return props.title },
            play() {
                // console.log('play', state.value, refPlayer.value.src, props.src)
                if (refPlayer.value.src !== props.src) {
                    refPlayer.value.src = props.src
                    refPlayer.value.load()
                    refPlayer.value.pause()
                    refPlayer.value.playbackRate = playbackRate.value
                    refPlayer.value.currentTime = props.currentTime || 0
                    if (props.beaconUrl) {
                        navigator.sendBeacon(props.beaconUrl)
                    }
                }
                refPlayer.value.play()
                onPlay()
            },
            pause() {
                refPlayer.value.pause()
                onPause()
            },
            toggle() {
                if (this.isPlaying) {
                    this.pause()
                } else {
                    this.play()
                }
            },
            set muted(muted) {
                refPlayer.value.muted = muted.value = muted;
            },
            get muted() {
                return muted.value
            },
            toggleMute() {
                refPlayer.value.muted = muted.value = !muted.value
            },
            seekBy(secs) {
                refPlayer.value.currentTime += secs
            },
            /** @param {Number} value */
            set currentTime(value) {
                refPlayer.value.currentTime = value
            },
            playbackRate(rate) {
                playbackRate.value = rate
            },
            get isPlaying() { return state.value === 'playing' },
        }
        
        expose({ player })

        let sub = props.bus?.subscribe('toggleAudioPlayer', () => player.toggle())
        onMounted(() => {
            if (props.autoPlay) {
                player.toggle()
            }
        })
        onUnmounted(() => sub?.unsubscribe())
        // console.log('AudioPlayer.mjs', globalThis.player)
        
        return {
            v,
            refPlayer,
            muted,
            player,
            currentTime,
            duration,
            playbackRate,
            onPlay,
            onPause,
            onTimeUpdate,
            onDurationChange,
        }
    }
}

export default AudioPlayer