import { reactive } from 'vue'

export const useOptions = {
  key: Symbol('APP_MANAGE'),
  confine: {},
  emits: [],
  props: {}
}
  
export const useRunning = ({ attrs, slots, emits, props, name }) => {

  const condition = reactive({
    code: '',
    name: ''
  })
  
  return {
    condition
  }
}