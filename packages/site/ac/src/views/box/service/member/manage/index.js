import { reactive, ref } from 'vue'

export const useConst = {
  key: Symbol('SERVICE_MEMBER_MANAGE'),
  enum: {}
}

export const useEmits = []

export const useProps = {}

export const useRunning = ({ attrs, slots, emits, props, name }) => {

  const condition = reactive({
    username: ''
  })

  return {
    condition
  }
}