import { reactive } from 'vue'

export const useOptions = {
  key: Symbol('DIC_MANAGE'),
  confine: {},
  emits: [],
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const condition = reactive({
    type: '',
    code: '',
    name: '',
    fixed: '',
    color: ''
  })
  
  return {
    condition
  }
}