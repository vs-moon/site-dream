import { effectScope, nextTick, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import { debounce } from '@vs-common/utils'
import { useMouseLongPress } from '@vs-common/hook'
import { useResizeObserver } from '@vueuse/core'

const eventUpdate = 'update'
const eventRemove = 'remove'

export const useOptions = {
  key: Symbol('UP_ALIVE'),
  confine: {},
  emits: [
    eventUpdate,
    eventRemove
  ],
  props: {
    active: {
      type: String,
      default: ''
    },
    navs: {
      type: Array,
      default: []
    },
    stamps: {
      type: Object,
      default: {}
    },
    primaryKey: {
      type: String,
      default: 'id'
    },
    titleKey: {
      type: String,
      default: 'title'
    },
    cacheKey: {
      type: String,
      default: 'cache'
    },
    validTruly: {
      type: [ String,Boolean, Number ],
      default: '1'
    },
    validFalsely: {
      type: [ String,Boolean, Number ],
      default: '0'
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const { active } = toRefs(props)
  
  
  const scrollRef = ref(null)
  const overflow = ref(false)
  const scrollOptions = { top: 0, left: 100, behavior: 'smooth' }
  const scope = effectScope()
  
  scope.run(() => {
    watch([ () => active.value, overflow ], ([ newActive, newOverflow ]) => {
      overflow.value && nextTick().then(() => {
        setTimeout(onAim, 100)
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
      
      if (isUpdate) {
        e.target.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
        emits(eventUpdate, id)
      } else {
        emits(eventRemove, id)
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