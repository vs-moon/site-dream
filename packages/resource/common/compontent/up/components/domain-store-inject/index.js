import { onMounted, ref } from 'vue'
import { useEventListener } from '@vueuse/core'

const eventResponse = 'event:response'
const eventUnlike = 'event:unlike'
const eventQuit = 'event:quit'

export const useOptions = Object.freeze({
  key: Symbol('UP_DOMAIN_STORE_INJECT'),
  confine: {},
  emits: [
    eventResponse,
    eventUnlike,
    eventQuit
  ],
  props: {
    src: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: false
    }
  }
})

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  const iframeRef = ref(null)
  
  if (props.status) {
    useEventListener(window, 'message', event => {
      if (event.origin === props.src) {
        emits(eventResponse, event.data)
      } else {
        emits(eventUnlike)
      }
    })
    
    onMounted(() => {
      iframeRef.value['contentWindow'].postMessage(null, props.src)
    })
  } else {
    emits(eventQuit)
  }
  
  return {
    iframeRef
  }
}