import { onActivated, reactive, ref, unref } from 'vue'
import { VIEW_MODE } from '@vs-common/utils/const/enum.js'
import { UPDATE_MODEL_VALUE } from '@vs-common/utils/const/event.js'

export const useActivate = ({ modelValue, viewMode, remoteQuery, id, emits }) => {
  
  let scopePre = null
  const status = reactive({
    loading: {
      box: false
    }
  })
  
  const onRemote = id => {
    const { isFetching, then } = remoteQuery.value(id)
    status.loading.box = isFetching
    then(response => {
      if (response.success) {
        if (response.data) {
          emits(UPDATE_MODEL_VALUE, response.data)
        }
      }
    })
  }
  
  const onRunning = () => {
    if (viewMode.value === VIEW_MODE.INSERT) {
      scopePre = null
      emits(UPDATE_MODEL_VALUE, { ...modelValue.value })
    } else {
      const sourceValue = id.value
      if (sourceValue !== scopePre) {
        scopePre = sourceValue
        onRemote(sourceValue)
      }
    }
  }
  
  onActivated(() => {
    onRunning()
  })
  
  onRunning()
  
  return {
    status
  }
}