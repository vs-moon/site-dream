import { reactive } from 'vue'

export const useOptions = {
  key: Symbol('DIC_TYPE_MANAGE'),
  confine: {},
  emits: [],
  props: {}
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const condition = reactive({
    code: '',
    name: '',
    valid: ''
  })
  
  return {
    condition
  }
}