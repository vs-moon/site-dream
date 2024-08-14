export const useOptions = {
  key: Symbol('CUSTOMIZE_UP_RELEVANCE_JUMP'),
  confine: {},
  emits: [],
  props: {
    linkageProp: {
      type: String,
      default: ''
    },
    routeParam: {
      type: Object,
      default: {}
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  return {}
}