import { onActivated, reactive, toValue } from 'vue'
import { ObjectUtils } from '@vs-common/utils'

export const useRemoteQuery = (modelValue, { remote, param, attribute, isSilence }) => {
  
  let initValue = JSON.parse(JSON.stringify(toValue(modelValue)))
  let preParam = null
  let preNotSilence = null
  const listeners = []
  
  const status = reactive({
    loading: false
  })
  
  const onUpdateValue = hook => {
    listeners.push(hook)
  }
  
  const listenersRunning = (...args) => {
    listeners.forEach(hook => hook(...args))
  }
  
  const onRemote = args => {
    const { isFetching, then } = toValue(remote)(args)
    status.loading = isFetching
    then(response => {
      if (response.success) {
        if (response.data) {
          listenersRunning(toValue(response.data))
        }
      }
    })
  }
  
  const onRunning = () => {
    // 新增页面不需要远程请求
    if (toValue(isSilence)) {
      // 重置上一次请求参数, 防止二次进入远程请求页面时参数对比逻辑出错
      preParam = null
      // 第一次进入新增页面, 或者上一次不是新增页面
      if (preNotSilence === null || preNotSilence) {
        // 状态设置为上一次是新增页面
        preNotSilence = false
        const confineMap = ObjectUtils.valueTaking(toValue(modelValue), toValue(attribute))
        listenersRunning({ ...initValue, ...confineMap })
      }
    } else {
      // 状态设置为上一次不是新增页面
      preNotSilence = true
      const currentParam = toValue(param)
      // 对比参数, 决定是否远程请求
      if (JSON.stringify(currentParam) !== JSON.stringify(preParam)) {
        preParam = currentParam
        onRemote(currentParam)
      }
    }
  }
  
  onActivated(() => {
    onRunning()
  })
  
  onRunning()
  
  return {
    status,
    onUpdateValue
  }
}