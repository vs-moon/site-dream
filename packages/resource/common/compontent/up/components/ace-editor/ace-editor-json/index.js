import { ref } from 'vue'

export const useOptions = {
  key: Symbol('UP_ACE_EDITOR_JSON'),
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
  
  const onFormat = space => {
    localValue.value = JSON.stringify(JSON.parse(localValue.value), null, space)
  }
  
  return {
    localValue,
    onFormat
  }
}