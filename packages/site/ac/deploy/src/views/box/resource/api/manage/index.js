import { reactive } from 'vue'

export const useOptions = {
  key: Symbol('API_MANAGE'),
  confine: {},
  emits: [],
  props: {}
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const condition = reactive({
    app: '',
    path: '',
    method: ''
  })
  
  return {
    condition
  }
}