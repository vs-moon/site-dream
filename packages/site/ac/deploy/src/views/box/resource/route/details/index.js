import { ref, toRefs } from 'vue'
import { PROPS_PAGE_VIEW } from '@vs-customize/const'

export const useOptions = {
  key: Symbol('MENU_DETAILS'),
  confine: {},
  emits: [],
  props: {
    ...PROPS_PAGE_VIEW,
    app: {
      type: String,
      default: ''
    },
    pid: {
      type: String,
      default: '0'
    }
  }
}
  
export const useRunning = ({ attrs, slots, emits, props, name }) => {

  const modelValue = ref({
    pid: '',
    app: '',
    uri: '',
    mode: '',
    path: '',
    name: '',
    cache: '',
    type: '',
    title: '',
    icon: '',
    linkage: '0',
    linkageConfig: '',
    home: '0',
    hide: '0',
  })
  
  return {
    modelValue
  }
}