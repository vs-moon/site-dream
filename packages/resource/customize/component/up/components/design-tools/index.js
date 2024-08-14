import { reactive } from 'vue'

export const useConst = {
  key: Symbol('UP_TOOLS'),
  enum: {}
}

export const useEmits = []

export const useProps = {}

export const useRunning = ({ attrs, slots, emits, props, name }) => {

  const state = reactive({
    setting: false
  })

  return {
    state
  }
}