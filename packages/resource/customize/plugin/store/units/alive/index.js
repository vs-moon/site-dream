import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { StringUtils } from '@vs-common/utils'
import { VALID, PROPERTY_ROUTE } from '@vs-customize/const'
import { useRouter, ROUTE } from '../../../router/index.js'


export const useAliveStore = defineStore('aliveStore', () => {
  
  const router = useRouter()
  
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
  const confineReplace = newAlive => {
    const minStamp = Math.min(...Object.values(aliveStamps.value))
    
    const newAliveKey = newAlive[PROPERTY_ROUTE.id]
    const newAliveName = newAlive[PROPERTY_ROUTE.name]
    
    for (let remoteAliveKey in aliveStamps.value) {
      if (aliveStamps.value[remoteAliveKey] === minStamp) {
        
        const remoteAliveName = aliveMapping.value[remoteAliveKey][PROPERTY_ROUTE.name]
        
        active.value = newAliveKey
        current.value = newAlive
        
        Reflect.deleteProperty(aliveStamps.value, remoteAliveKey)
        Reflect.set(aliveStamps.value, newAliveKey, new Date().getTime())
        
        Reflect.deleteProperty(aliveMapping.value, remoteAliveKey)
        Reflect.set(aliveMapping.value, newAliveKey, newAlive)
        
        aliveNames.value.splice(aliveNames.value.indexOf(remoteAliveName), 1, newAliveName)
        
        const navIndex = navs.value.findIndex(nav => (nav[PROPERTY_ROUTE.id] === newAliveKey))
        if (navIndex < 0) {
          navs.value.push(newAlive)
        } else {
          navs.value.splice(navIndex, 1, newAlive)
        }
      }
    }
  }
  
  const update = (alive, { isJump = false } = {}) => {
    
    const aliveKey = alive[PROPERTY_ROUTE.id]
    const aliveName = alive[PROPERTY_ROUTE.name]
    const cache = alive[PROPERTY_ROUTE.cache]
    
    if (isJump) {
      router.value.push(alive[PROPERTY_ROUTE.routeJump])
    } else {
      let isUnReset = true
      if (VALID.T === cache) {
        if (aliveNames.value.length >= max.value && aliveNames.value.indexOf(aliveName) < 0) {
          confineReplace(alive)
          isUnReset = false
        } else {
          Reflect.set(aliveStamps.value, aliveKey, new Date().getTime())
          Reflect.set(aliveMapping.value, aliveKey, alive)
          
          if (aliveNames.value.indexOf(aliveName) < 0) {
            aliveNames.value.push(aliveName)
          }
        }
      }
      
      if (isUnReset) {
        active.value = aliveKey
        current.value = alive
        const navIndex = navs.value.findIndex(nav => (nav[PROPERTY_ROUTE.id] === aliveKey))
        if (navIndex < 0) {
          navs.value.push(alive)
        } else {
          navs.value.splice(navIndex, 1, alive)
        }
      }
    }
  }
  
  const remove = alive => {
    if (alive) {
      let nextAlive
      const aliveKey = alive[PROPERTY_ROUTE.id]
      const aliveName = alive[PROPERTY_ROUTE.name]
      
      Reflect.deleteProperty(aliveStamps.value, aliveKey)
      Reflect.deleteProperty(aliveMapping.value, aliveKey)
      
      aliveNames.value.findIndex((name, index) => {
        if (name === aliveName) {
          aliveNames.value.splice(index, 1)
          return true
        }
      })
      
      if (active.value === aliveKey) {
        navs.value.findIndex((nav, index) => {
          if (nav[PROPERTY_ROUTE.id] === aliveKey) {
            nextAlive = navs.value[index + 1] || navs.value[index - 1]
            
            if (nextAlive) {
              active.value = nextAlive[PROPERTY_ROUTE.id]
              current.value = nextAlive
            } else {
              active.value = ''
              current.value = {}
            }
            
            return true
          }
        })
      }
      
      navs.value.findIndex((nav, index) => {
        if (nav[PROPERTY_ROUTE.id] === aliveKey) {
          navs.value.splice(index, 1)
          return true
        }
      })
      
      if (nextAlive) {
        router.value.push(nextAlive[PROPERTY_ROUTE.routeJump])
      } else if (StringUtils.isBlank(active.value)) {
        router.value.push(ROUTE.root.path)
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