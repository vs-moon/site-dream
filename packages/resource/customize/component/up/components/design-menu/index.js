export const useConst = {
  key: Symbol('UP_MENU'),
  enum: {}
}

export const useEmits = []

export const useProps = {
  favicon: {
    type: String,
    default: '/favicon.ico'
  },
  mode: {
    type: String,
    default: 'vertical'
  },
  collapse: {
    type: Boolean,
    default: undefined
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  return {}
}