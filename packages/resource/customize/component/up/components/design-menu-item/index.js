import { useProperty } from '@vs-common/utils'

const aliveProperty = useProperty().aliveStore

export const useConst = {
  key: Symbol('UP_MENU_ITEM'),
  enum: {}
}

export const useEmits = []

export const useProps = {
  menuItem: {
    type: Object,
    default: () => ({
      ...aliveProperty
    })
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  return {
    aliveProperty
  }
}