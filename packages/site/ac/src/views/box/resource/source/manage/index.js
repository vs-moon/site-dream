import { reactive } from 'vue'

export const useConst = {
  key: Symbol('RESOURCE_SOURCE_MANAGE'),
  enum: {}
}

export const useEmits = []

export const useProps = {}
  
export const useRunning = ({ attrs, slots, emits, props, name }) => {

  const condition = reactive({
    source: '',
    type: '',
    code: '',
    name: ''
  })
  
  return {
    condition
  }
}