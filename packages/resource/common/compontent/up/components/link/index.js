import { RouterLink, useLink } from 'vue-router'
import { computed } from 'vue'

export const useConst = {
  key: Symbol('UP_LINK'),
  enum: {}
}

export const useEmits = []

export const useProps = {
  ...RouterLink,
    inactiveClass: String,
}
  
export const useRunning = ({ attrs, slots, emits, props, name }) => {

  const {
    navigate,
    href,
    route,
    isActive,
    isExactActive
  } = useLink(props)

  const isExternalLink = computed(() => typeof this.to === 'string' && this.to.startsWith('http'))

  return {
    navigate,
    href,
    route,
    isActive,
    isExactActive,
    isExternalLink
  }
}