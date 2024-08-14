import { ref, toRefs } from 'vue'
import { PROPS_PAGE_VIEW } from '@vs-customize/const'

export const useOptions = {
  key: Symbol('DIC_DETAILS'),
  confine: {},
  emits: [],
  props: {
    ...PROPS_PAGE_VIEW,
    type: {
      type: String,
      default: ''
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const modelValue = ref({
    id: '',
    type: '',
    code: '',
    name: '',
    fixed: '0',
    color: '',
    valid: ''
  })
  
  return {
    modelValue
  }
}