import { reactive } from 'vue'

export const useOptions = {
  key: Symbol('ROLE_MANAGE'),
  confine: {},
  emits: [],
  props: {}
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const condition = reactive({
    app: '',
    code: '',
    name: ''
  })
  
  return {
    condition
  }
}