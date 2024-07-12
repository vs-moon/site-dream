import { reactive } from 'vue'
import { PROPS_DETAILS_VIEW } from '@vs-component/up/const/props.js'

export const useConst = {
  key: Symbol('RESOURCE_ORG_DETAILS'),
  enum: {}
}

export const useEmits = []

export const useProps = {
  ...PROPS_DETAILS_VIEW
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const modelValue = ref({
    source: '',
    code: '',
    name: ''
  })
  
  return {
    modelValue
  }
}