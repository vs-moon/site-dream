import { ref } from 'vue'
import { PROPS_PAGE_VIEW } from '@vs-customize/const'

export const useOptions = {
  key: Symbol('DIC_DETAILS'),
  confine: {},
  emits: [],
  props: {
    ...PROPS_PAGE_VIEW
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const modelValue = ref({
    id: '',
    code: '',
    name: '',
    valid: '1'
  })
  
  return {
    modelValue
  }
}