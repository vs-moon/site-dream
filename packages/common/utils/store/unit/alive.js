import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { VALID } from '../../const/enum.js'
import { IDS } from '../const.js'
import { useRouter, ROUTE_CONST } from '../../router/index.js'
import { isBlank } from '../../string/index.js'
import { useProperty } from '../property.js'

export const useAliveStore = defineStore(IDS.alive, () => {
  
  const router = useRouter()
  const aliveProperty = useProperty().aliveStore
  
  // 👉 State
  const enable = ref(true)
  const max = ref(3)
  
  const active = ref('')
  const current = ref({})
  const navs = ref([])
  
  const aliveStamps = ref({})
  const aliveNames = ref([])
  const aliveMapping = ref({})
  
  // 👉 Other
  /**
   * 获取最久远的缓存项
   * @returns {*}
   */
  const getAliveRemote = () => {
    const minStamp = Math.min(...Object.values(aliveStamps.value))
    for (let aliveKey in aliveStamps.value) {
      if (aliveStamps.value[aliveKey] === minStamp) {
        return aliveMapping.value[aliveKey]
      }
    }
  }
  
  const hasNav = aliveKey => navs.value.find(nav => nav[aliveProperty.id] === aliveKey)
  const hasAliveNames = routeName => aliveNames.value.indexOf(routeName) > -1
  
  /**
   * 更新常规的当前缓存键、当前缓存项
   * @param aliveKey
   * @param alive
   */
  const updateCommonSeries = (aliveKey, alive) => {
    active.value = aliveKey
    current.value = alive
  }
  
  /**
   * 更新缓存项映射、缓存项时间戳
   * @param aliveKey
   * @param alive
   */
  const updateCacheSeries = (aliveKey, alive) => {
    aliveStamps.value[aliveKey] = new Date().getTime()
    aliveMapping.value[aliveKey] = alive
  }
  
  const getNavIndex = aliveKey => {
    return navs.value.findIndex(nav => (nav[aliveProperty.id] === aliveKey))
  }
  
  const removeNav = (aliveKey, alive) => {
    const oldNavIndex = getNavIndex(aliveKey)
    if (oldNavIndex > -1) {
      navs.value.splice(oldNavIndex, 1)
    }
  }
  
  const replaceNav = (aliveKey, alive) => {
    const oldNavIndex = getNavIndex(aliveKey)
    if (oldNavIndex > -1) {
      navs.value.splice(oldNavIndex, 1)
      navs.value.splice(oldNavIndex, 0, alive)
    }
  }
  
  const removeAliveName = (routeName) => {
    const oldAliveNameIndex = aliveNames.value.indexOf(routeName)
    if (oldAliveNameIndex > -1) {
      aliveNames.value.splice(oldAliveNameIndex, 1)
    }
  }
  
  const update = (alive, { isJump = false } = {}) => {
    
    if (alive) {
      
      const aliveKey = alive[aliveProperty.id]
      const aliveName = alive[aliveProperty.routeName]
      const routeAlive = alive[aliveProperty.routeAlive]
      
      if (aliveKey === active.value) {
        
        if (routeAlive === VALID.T) {
          updateCacheSeries(aliveKey, alive)
        }
        
        updateCommonSeries(aliveKey, alive)
        replaceNav(aliveKey, alive)
        
      } else {
        
        if (aliveNames.value.length >= max.value) {
          remove(getAliveRemote(), { isRemoveNav: true })
        } else {
          if (routeAlive === VALID.T) {
            updateCacheSeries(aliveKey, alive)
            if (!hasAliveNames(aliveName)) {
              aliveNames.value.push(aliveName)
            }
          }
          
          updateCommonSeries(aliveKey, alive)
          if (!hasNav(aliveKey)) {
            navs.value.push(alive)
          }
        }
      }
      
      if (isJump) {
        router.value.push(alive[aliveProperty.routeJump])
      }
    }
  }
  
  const remove = (alive, { isJump = false, isRemoveNav = false } = {}) => {
    
    if (alive) {
      
      let nextAlive
      const aliveKey = alive[aliveProperty.id]
      const routeName = alive[aliveProperty.routeName]
      
      Reflect.deleteProperty(aliveStamps.value, aliveKey)
      Reflect.deleteProperty(aliveMapping.value, aliveKey)
      removeAliveName(routeName)
      
      if (active.value === aliveKey) {
        for (const index in navs.value) {
          if (navs.value[index][aliveProperty.id] === aliveKey) {
            
            nextAlive = navs.value[index + 1] || navs.value[index - 1]
            
            if (nextAlive) {
              const nextAliveKey = nextAlive[aliveProperty.id]
              updateCommonSeries(nextAliveKey, nextAlive)
            } else {
              updateCommonSeries('', {})
            }
            
            break
          }
        }
      }
      
      if (isRemoveNav) {
        removeNav(aliveKey)
      }
      
      if (isJump) {
        if (nextAlive) {
          router.value.push(nextAlive[aliveProperty.routeJump])
        } else if (isBlank(active.value)) {
          router.value.push(ROUTE_CONST.root.path)
        }
      }
    }
  }
  
  
  return {
    enable,
    max,
    active,
    current,
    aliveStamps,
    aliveNames,
    aliveMapping,
    navs,
    update,
    remove
  }
})

export default useAliveStore

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAliveStore, import.meta.hot))
}