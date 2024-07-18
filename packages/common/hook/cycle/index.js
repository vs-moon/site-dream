import {
  effectScope,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onScopeDispose,
  reactive,
  toValue,
} from 'vue'

import { VIEW_MODE } from '@vs-common/utils/const/enum.js'
import { UPDATE_MODEL_VALUE } from '@vs-common/utils/const/event.js'

export const useActivate = ({ modelValue, viewMode, remoteQuery, id, emits }) => {
  let initValue = JSON.parse(JSON.stringify(toValue(modelValue)))
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
      emits(UPDATE_MODEL_VALUE, { ...initValue })
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

export const useScope = (effectBlock, addedClearBlock = () => {}) => {
  
  let scope = effectScope()
  
  const scopeRun = () => {
    scope.run(effectBlock)
  }
  
  onMounted(() => {
    console.log('onMounted')
    scopeRun()
    onActivated(() => {
      console.log('onActivated')
      scope = effectScope()
      scopeRun()
    })
  })
  
  onBeforeUnmount(() => {
    console.log('onBeforeUnmount')
  })
  
  onDeactivated(() => {
    console.log('onDeactivated')
  })
  
  onScopeDispose(() => {
    scope.stop()
    addedClearBlock()
  })
}