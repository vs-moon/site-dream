import { computed, toRefs } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useRemoteQuery } from '@vs-common/hook'
import { UPDATE_MODEL_VALUE } from '@vs-common/const'
import { VIEW_MODE, PROPS_PAGE_VIEW, VIEW_MODE_TIP_MAP } from '@vs-customize/const'

const eventRemoteInsert = 'remote:insert'
const eventRemoteUpdate = 'remote:update'

export const useOptions = {
  key: Symbol('CUSTOMIZE_UP_PAGE_VIEW'),
  confine: {},
  emits: [
    eventRemoteInsert,
    eventRemoteUpdate
  ],
  props: {
    ...PROPS_PAGE_VIEW,
    remoteQuery: {
      type: Function,
      default: null
    },
    remoteInsert: {
      type: Function,
      default: null
    },
    remoteUpdate: {
      type: Function,
      default: null
    },
    confineAttribute: {
      type: [ String, Array ],
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const {
    modelValue,
    remoteQuery: remote,
    confineAttribute: attribute,
    id: param,
    vm
  } = toRefs(props)
  
  const resetValue = JSON.parse(JSON.stringify(modelValue.value))
  
  const isSilence = computed(() => vm.value === VIEW_MODE.ADD)
  
  const { status, onUpdateValue } = useRemoteQuery(modelValue, {
    remote,
    param,
    attribute,
    isSilence
  })
  
  onUpdateValue(value => {
    emits(UPDATE_MODEL_VALUE, value)
  })
  
  const onSave = () => {
    ElMessageBox.confirm(`确定${VIEW_MODE_TIP_MAP[vm.value]} ?`)
      .then(() => {
        const isAdd = vm.value === VIEW_MODE.ADD
        const { isFetching, then, notification } = isAdd ? props.remoteInsert(modelValue) : props.remoteUpdate(modelValue)
        status.loading = isFetching
        then(response => {
          if (response.success) {
            
            if (isAdd) {
              emits(UPDATE_MODEL_VALUE, { ...resetValue })
              emits(eventRemoteInsert)
            } else {
              emits(eventRemoteUpdate)
            }
            
            notification()
          }
        })
      })
  }
  
  return {
    status,
    onSave
  }
}