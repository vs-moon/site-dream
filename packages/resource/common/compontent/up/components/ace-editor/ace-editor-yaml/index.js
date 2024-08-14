import { ref } from 'vue'

export const useOptions = {
  key: Symbol('UP_ACE_EDITOR_YAML'),
  confine: {},
  emits: [],
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const localValue = ref('')
  
  return {
    localValue
  }
}