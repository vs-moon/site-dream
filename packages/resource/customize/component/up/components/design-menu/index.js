export const useOptions = {
  key: Symbol('CUSTOMIZE_UP_DESIGN_MENU'),
  confine: {},
  emits: [],
  props: {
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
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  return {}
}