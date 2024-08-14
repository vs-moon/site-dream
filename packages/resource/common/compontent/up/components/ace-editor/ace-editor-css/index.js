import { ref } from 'vue'
import { css } from 'js-beautify'

export const useOptions = {
  key: Symbol('UP_ACE_EDITOR_CSS'),
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
    localValue.value = css(localValue.value, { indent_size: 2 })
  }
  
  return {
    localValue,
    onFormat
  }
}