import { ref, toRefs } from 'vue'
import { PROPS_PAGE_VIEW } from '@vs-customize/const'

export const useOptions = {
  key: Symbol('ORG_DETAILS'),
  confine: {},
  emits: [],
  props: {
    ...PROPS_PAGE_VIEW,
    pid: {
      type: String,
      default: '0'
    },
    app: {
      type: String,
      default: ''
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const modelValue = ref({
    pid: '',
    app: '',
    code: '',
    name: ''
  })
  
  return {
    modelValue
  }
}