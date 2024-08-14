import { computed, getCurrentInstance, inject } from 'vue'
import { TypeUtils } from '@vs-common/utils'
import { useOptions as useOptionsRow } from '../row/index.js'

export const useOptions = {
  key: Symbol('UP_COL'),
  confine: {},
  emits: [],
  props: {
    icon: {
      type: String,
      default: ''
    },
    open: {
      type: Boolean,
      default: false
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const instance = getCurrentInstance()
  const { uid } = instance
  const { key } = instance.vnode
  const spanKey = key ? key + '' : TypeUtils.isNumber(uid) ? uid + '' : uid
  
  const spanMapping = inject(useOptionsRow.key)
  const { area, spanSum, spanClose } = spanMapping
  const { onChange } = spanMapping.register(spanKey, props.open)
  
  const spanArea = computed(() => area[spanKey])
  const spanBox = computed(() => spanArea.value - spanClose ? spanSum - spanClose : 0)
  const spanIcon = computed(() => spanArea.value > spanClose ? spanClose : spanSum)
  
  return {
    spanClose,
    onChange,
    spanArea,
    spanBox,
    spanIcon
  }
}