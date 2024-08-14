import { computed, nextTick, reactive, provide } from 'vue'

export const useOptions = {
  key: Symbol('UP_ROW'),
  confine: {},
  emits: [],
  props: {}
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const spanSum = 24
  const spanClose = 2
  
  const spanMapping = {
    open: false,
    spanSum,
    spanClose,
    area: reactive({}),
    register: (spanKey, open) => {
      
      spanMapping.area[spanKey] = spanClose
      
      if (open && !spanMapping.open) {
        nextTick().then(() => {
          change(spanKey, open)
        })
      }
      
      return {
        onChange: v => change(spanKey, v)
      }
    }
  }
  
  const change = (spanKey, status) => {
    const keys = Reflect.ownKeys(spanMapping.area)
    if (status) {
      keys.forEach(key => spanMapping.area[key] = key === spanKey ? spanOpen.value : spanClose)
    } else {
      spanMapping.area[spanKey] = spanClose
    }
  }
  
  const spanOpen = computed(() => (spanSum - (Reflect.ownKeys(spanMapping.area).length - 1) * spanClose))
  
  provide(useOptions.key, spanMapping)
  
  return {
    spanSum,
    spanOpen,
    spanClose
  }
}