import { reactive } from 'vue'

export const useOptions = {
  key: Symbol('CUSTOMIZE_UP_DESIGN_TOOLS'),
  confine: {},
  emits: [],
  props: {}
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {

  const state = reactive({
    setting: false
  })

  return {
    state
  }
}