import { reactive, ref, toRefs } from 'vue'
import { PROPS_DETAILS_VIEW } from '@vs-component/up/const/props.js'

export const useConst = {
  key: Symbol('RESOURCE_MENU_DETAILS'),
  enum: {}
}

export const useEmits = []

export const useProps = {
  ...PROPS_DETAILS_VIEW,
  parentId: {
    type: String,
    default: '0'
  }
}
  
export const useRunning = ({ attrs, slots, emits, props, name }) => {

  const { parentId } = toRefs(props)
  
  const modelValue = ref({
    parentId,
    source: '',
    modulePath: '',
    jumpMode: '',
    routePath: '',
    routeName: '',
    routeAlive: '',
    menuMode: '',
    menuName: '',
    menuIcon: ''
  })
  
  return {
    modelValue
  }
}