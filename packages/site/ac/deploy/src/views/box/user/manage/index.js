import { reactive } from 'vue'

export const useOptions = {
  key: Symbol('USER_MANAGE'),
  confine: {},
  emits: [],
  props: {}
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {

  const condition = reactive({
    username: ''
  })

  return {
    condition
  }
}