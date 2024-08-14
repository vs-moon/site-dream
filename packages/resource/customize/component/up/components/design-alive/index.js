import { useAliveStore } from '@vs-customize/plugin'
import { PROPERTY_ROUTE } from '@vs-customize/const'

export const useOptions = {
  key: Symbol('DESIGN_CUSTOMIZE_UP_ALIVE'),
  confine: {},
  emits: [],
  props: {}
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const aliveStore = useAliveStore()
  
  const aliveFind = id => aliveStore.navs.find((nav) => nav[PROPERTY_ROUTE.id] === id)
  
  const onRemove = id => {
    aliveStore.remove(aliveFind(id))
  }
  
  const onUpdate = id => aliveStore.update(aliveFind(id), { isJump: true })
  
  return {
    onRemove,
    onUpdate
  }
}