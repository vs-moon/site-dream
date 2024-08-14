import { computed, onActivated, onScopeDispose, reactive, ref } from 'vue'
import { useDicStore } from '@vs-customize/plugin'
import { debounce } from '@vs-common/utils'

const eventChange = 'change'

export const useOptions = {
  key: Symbol('CUSTOMIZE_UP_DIC_TYPE_DROP'),
  confine: {},
  emits: [
    eventChange
  ],
  props: {}
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  let valuePre = null
  const dicStore = useDicStore()
  dicStore.remoteDicType(props.modelValue)
  
  const status = reactive({
    loading: false
  })
  
  const options = ref({})
  
  let onDebounce = debounce(dicStore.remoteDicType)
  
  const onChange = v => {
    emits(eventChange, v)
  }
  
  const onRemote = v => {
    if (v) {
      const { isFind, data } = dicStore.filterDicType(v)
      if (isFind) {
        options.value = data
      } else {
        status.loading = true
        onDebounce(v, (success, response) => {
          status.loading = false
          if (success) {
            options.value = { [response.code]: response }
          } else {
            options.value = {}
          }
        })
      }
    } else {
      options.value = dicStore.dicType
    }
  }
  
  onActivated(() => {
    if (valuePre !== props.modelValue.value) {
      valuePre = props.modelValue.value
      dicStore.remoteDicType(props.type)
    }
  })
  
  onScopeDispose(() => {
    onDebounce = null
  })
  
  return {
    dicStore,
    status,
    options,
    onChange,
    onRemote
  }
}