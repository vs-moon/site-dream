import { reactive } from 'vue'

export const useConst = {
  key: Symbol('RESOURCE_MENU_MANAGE'),
  enum: {}
}

export const useEmits = []

export const useProps = {}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const condition = reactive({
    source: '',
    menuName: '',
    routeName: '',
    routePath: '',
    parentId: 0
  })
  
  return {
    condition
  }
}