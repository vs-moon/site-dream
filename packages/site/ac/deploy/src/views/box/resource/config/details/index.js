import { ref } from 'vue'
import { PROPS_PAGE_VIEW } from '@vs-customize/const'

export const useOptions = {
  key: Symbol('CONFIG_DETAILS'),
  confine: {},
  emits: [],
  props: {
    ...PROPS_PAGE_VIEW,
    app: {
      type: String,
      default: ''
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const modelValue = ref({
    app: '',
    datatype: 'text',
    attributeName: '',
    attributeValue: ''
  })
  
  return {
    modelValue
  }
}