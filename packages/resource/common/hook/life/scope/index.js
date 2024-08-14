import { effectScope, onActivated, onBeforeMount, onDeactivated, onMounted, onScopeDispose } from 'vue'

export const executeTimingOptions = {
  immediate: 'immediate',
  onBeforeMount: 'onBeforeMount',
  onMounted: 'onMounted'
}

export const useEffectScope = (hook, executeTiming = executeTimingOptions.immediate) => {
  
  let scope = effectScope()
  
  const activateRunning = () => {
    onActivated(() => {
      scope = effectScope()
      scope.run(hook)
    })
  }
  
  if (executeTiming === executeTimingOptions.immediate) {
    scope.run(hook)
  } else if (executeTiming === executeTimingOptions.onBeforeMount) {
    onBeforeMount(() => {
      scope.run(hook)
      activateRunning()
    })
  } else {
    onMounted(() => {
      scope.run(hook)
      activateRunning()
    })
  }
  
  onDeactivated(() => {
    scope.stop()
  })
  
  onScopeDispose(() => {
    scope.stop()
  })
}