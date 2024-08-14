import { reactive } from 'vue'

export const useOptions = {
  key: Symbol('MENU_MANAGE'),
  confine: {},
  emits: [],
  props: {}
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const condition = reactive({
    app: '',
    title: '',
    type: '',
    name: '',
    path: '',
    pid: '0'
  })
  
  return {
    condition
  }
}