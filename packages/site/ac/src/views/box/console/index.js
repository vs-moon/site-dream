import { ref, watch } from 'vue'
import { useScope } from '@vs-common/hook'

export const useConst = {
  key: Symbol('CONSOLE'),
  enum: {}
}

export const useEmits = []

export const useProps = {}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  useScope(() => {})
  
  return {}
}