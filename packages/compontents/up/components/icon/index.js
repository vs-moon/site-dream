export const useConst = {
  key: Symbol('UP_ICON'),
  enum: {}
}

export const useEmits = []

export const useProps = {
  color: {
    type: String,
    default: 'teal'
  },
  iconNames: {
    type: Array,
    default: []
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  return {}
}