import { effectScope, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { debounce, useAliveStore, useProperty } from '@vs-common/utils'
import { useMouseLongPress } from '@vs-common/hook'
import { useResizeObserver } from '@vueuse/core'

export const useConst = {
  key: Symbol('UP_ALIVE'),
  enum: {}
}

export const useEmits = []

export const useProps = {}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const aliveStore = useAliveStore()
  const aliveProperty = useProperty().aliveStore
  const scrollRef = ref(null)
  const overflow = ref(false)
  const scrollOptions = { top: 0, left: 100, behavior: 'smooth' }
  const scope = effectScope()
  
  scope.run(() => {
    watch([ () => aliveStore.active, overflow ], ([ newActive, newOverflow ]) => {
      overflow.value && nextTick().then(() => {
        onAim()
      })
    })
  })
  
  const onClick = e => {
    // 冒泡事件委托
    if (e.eventPhase === 3) {
      let id = e.target.dataset.id
      let isUpdate = true
      
      if (e.target.tagName === 'I') {
        isUpdate = false
      }

      const alive = aliveStore.navs.find((nav) => nav[aliveProperty.id] === id)

      if (isUpdate) {
        e.target.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
        aliveStore.update(alive, { isJump: true })
      } else {
        aliveStore.remove(alive)
      }
    }
  }
  
  const onAim = () => {
    scrollRef.value['querySelector']('.is-action')?.['scrollIntoView']?.({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }
  
  const scrollBy = ({ top = 0, left = 100, behavior = 'smooth' } = scrollOptions, { type, done } = {}) => {
    scrollRef.value['scrollBy']({
      top,
      left,
      behavior
    })
  }
  
  const {
    onMouseDown,
    onMouseUp
  } = useMouseLongPress(scrollBy, { exeMouseUp: false })
  
  onMounted(() => {
    useResizeObserver(scrollRef.value, debounce((entries) => {
      for (const entry of entries) {
        overflow.value = entries[0].target.scrollWidth > entries[0].target.clientWidth
      }
    }, 500))
  })
  
  onBeforeUnmount(() => {
    scope.stop()
  })
  
  return {
    overflow,
    scrollRef,
    onAim,
    onClick,
    onMouseDown,
    onMouseUp
  }
}