const eventChange = 'change'

export const useOptions = {
  key: Symbol('CUSTOMIZE_UP_DIC_DROP'),
  confine: {},
  emits: [
    eventChange
  ],
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const onChange = v => {
    emits(eventChange, v)
  }
  
  return {
    onChange
  }
}