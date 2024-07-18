import { hasInjectionContext, ref } from 'vue'
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
  const confineReplace = newAlive => {
    const minStamp = Math.min(...Object.values(aliveStamps.value))
    
    const newAliveKey = newAlive[aliveProperty.id]
    const newAliveName = newAlive[aliveProperty.routeName]
    
    for (let remoteAliveKey in aliveStamps.value) {
      if (aliveStamps.value[remoteAliveKey] === minStamp) {
        
        const remoteAliveName = aliveMapping.value[remoteAliveKey][aliveProperty.routeName]
        
        active.value = newAliveKey
        current.value = newAlive
        
        Reflect.deleteProperty(aliveStamps.value, remoteAliveKey)
        Reflect.set(aliveStamps.value, newAliveKey, new Date().getTime())
        
        Reflect.deleteProperty(aliveMapping.value, remoteAliveKey)
        Reflect.set(aliveMapping.value, newAliveKey, newAlive)
        
        aliveNames.value.splice(aliveNames.value.indexOf(remoteAliveName), 1, newAliveName)
        
        const navIndex = navs.value.findIndex(nav => (nav[aliveProperty.id] === newAliveKey))
        if (navIndex < 0) {
          navs.value.push(newAlive)
        } else {
          navs.value.splice(navIndex, 1, newAlive)
        }
      }
    }
  }
  
  const update = (alive, { isJump = false } = {}) => {
    
    const aliveKey = alive[aliveProperty.id]
    const aliveName = alive[aliveProperty.routeName]
    const routeAlive = alive[aliveProperty.routeAlive]
    
    if (isJump) {
      router.value.push(alive[aliveProperty.routeJump])
    } else {
      let isUnReset = true
      if (VALID.T === routeAlive) {
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
        const navIndex = navs.value.findIndex(nav => (nav[aliveProperty.id] === aliveKey))
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
      const aliveKey = alive[aliveProperty.id]
      const aliveName = alive[aliveProperty.routeName]
      
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
          if (nav[aliveProperty.id] === aliveKey) {
            nextAlive = navs.value[index + 1] || navs.value[index - 1]
            
            if (nextAlive) {
              active.value = nextAlive[aliveProperty.id]
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
        if (nav[aliveProperty.id] === aliveKey) {
          navs.value.splice(index, 1)
          return true
        }
      })
      
      if (nextAlive) {
        router.value.push(nextAlive[aliveProperty.routeJump])
      } else if (isBlank(active.value)) {
        router.value.push(ROUTE_CONST.root.path)
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