import { provide, reactive } from 'vue'

export const useConst = {
  key: Symbol('UP_ASIDE'),
  enum: {}
}

export const useEmits = []

export const useProps = {
  favicon: {
    type: String,
    default: '/favicon.ico'
  },
  appName: {
    type: String,
    default: 'Vue'
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const status = reactive({
    collapse: false
  })
  
  provide(useConst.key, status)
  
  return {
    status
  }
}