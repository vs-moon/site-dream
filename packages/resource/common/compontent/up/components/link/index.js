import { RouterLink, useLink } from 'vue-router'
import { computed } from 'vue'

export const useOptions = {
  key: Symbol('UP_LINK'),
  confine: {},
  emits: [],
  props: {
    ...RouterLink.props,
    inactiveClass: String
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {

  const {
    navigate,
    href,
    route,
    isActive,
    isExactActive
  } = useLink(props)

  const isExternalLink = computed(() => typeof props.to === 'string' && props.to.startsWith('http'))

  return {
    navigate,
    href,
    route,
    isActive,
    isExactActive,
    isExternalLink
  }
}