import { reactive } from 'vue'

export const useOptions = {
  key: Symbol('CONFIG_MANAGE'),
  confine: {},
  emits: [],
  props: {}
}
  
export const useRunning = ({ attrs, slots, emits, props, name }) => {

  const condition = reactive({
    app: '',
    dataType: '',
    attributeName: ''
  })
  
  return {
    condition
  }
}