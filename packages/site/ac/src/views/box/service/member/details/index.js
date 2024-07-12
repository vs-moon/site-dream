import { reactive, toRefs } from 'vue'
import { PROPS_DETAILS_VIEW } from '@vs-component/up/const/props.js'


export const useConst = {
  key: Symbol('SERVICE_MEMBER_DETAILS'),
  enum: {}
}

export const useEmits = []

export const useProps = {
  ...PROPS_DETAILS_VIEW
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const modelValue = ref({
    username: '',
    password: ''
  })
  
  return {
    modelValue
  }
}