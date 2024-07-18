import { onMounted, onUnmounted, ref } from 'vue'
import { useAuthorizationStore, useMenuStore } from '@vs-common/utils'
import { useRouter } from 'vue-router'

export const useConst = {
  key: Symbol('UP_CROSS_DOMAIN_INJECT'),
  enum: {}
}

export const useEmits = [
  'event:response'
]

export const useProps = {
  src: {
    type: String,
    default: null
  },
  property: {
    type: String,
    default: null
  },
  route: {
    type: Object || String,
    default: null
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const router = useRouter()
  const authorizationStore = useAuthorizationStore()
  const menuStore = useMenuStore()
  const iframeRef = ref(null)
  
  if (authorizationStore.enable) {
    router.push(props.route || menuStore.routeAction).then(() => {})
  } else {
    
    const onMessage = event => {
      if (event.origin === props.src) {
        const {
          success,
          data
        } = event.data
        if (success) {
          authorizationStore.$patch(data)
          emits('event:response', true, event.data)
        } else {
          emits('event:response', false, event.data)
        }
      }
    }
    
    onMounted(() => {
      iframeRef.value['contentWindow'].postMessage({ property: props.property }, props.src)
      addEventListener('message', onMessage, false)
    })
    
    onUnmounted(() => {
      removeEventListener('message', onMessage, false)
    })
  }
  
  return {
    iframeRef
  }
}