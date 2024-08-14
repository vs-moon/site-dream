import { ref } from 'vue'
import { html } from 'js-beautify'

export const useOptions = {
  key: Symbol('UP_ACE_EDITOR_HTML'),
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
  
  const onFormat = () => {
    localValue.value = html(localValue.value, { indent_size: 2 })
  }
  
  return {
    localValue,
    onFormat
  }
}