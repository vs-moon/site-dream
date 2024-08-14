import { provide, reactive } from 'vue'

export const useOptions = Object.freeze({
  key: Symbol('CUSTOMIZE_UP_ASIDE'),
  confine: {},
  emits: [],
  props: {
    favicon: {
      type: String,
      default: '/favicon.ico'
    },
    appName: {
      type: String,
      default: 'Vue'
    }
  }
})

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const status = reactive({
    collapse: false
  })
  
  provide(useConst.key, status)
  
  return {
    status
  }
}