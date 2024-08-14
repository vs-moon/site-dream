import Persisted, { createPersistedState } from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
import { reactive, readonly } from 'vue'
import { TypeUtils } from '@vs-common/utils'
import stores from './units/index.js'
import { registerRemote } from './utils/index.js'
export * from './units/index.js'
export * from './utils/index.js'

// Pinia 实例
export const Pinia = createPinia()

// Store 实例集
const storesInstance = reactive({})

/**
 * 原始化
 * @param store
 */
const usePrimitive = ({ store }) => {
  TypeUtils.isFalsely(store.$primitive) && (store.$primitive = {})
  store.$primitive = JSON.parse(JSON.stringify(store.$state))
}

/**
 * 重置化
 * @param store
 */
const useResetting = ({ store }) => {
  store.$reset = () => {
    store.$state = JSON.parse(JSON.stringify(store.$primitive))
  }
}

/**
 * 载入上下文
 * @param store
 */
const loadContext = store => {
  storesInstance[store.$id] = store(Pinia)
}

/**
 * 注册
 * @param module
 */
export const useRegister = module => {
  
  for (const key in module) {
    const store = module[key]
    if (store instanceof Function) {
      if (store.$id) {
        loadContext(store)
      } else {
        store().then(mod => {
          loadContext(mod.default || mod)
        })
      }
    } else {
      loadContext(store.default)
    }
  }
}

/**
 * 获取
 */
export const useStore = (storeKey) => {
  return readonly(storesInstance)
}

/**
 * 重置
 */
export const useReset = () => {
  Reflect.ownKeys(storesInstance).forEach(key => storesInstance[key].$reset())
}

export default {
  install: (app, { module, remote } = {}) => {
    
    Pinia.use(usePrimitive)
    Pinia.use(Persisted)
    Pinia.use(createPersistedState({ auto: true }))
    Pinia.use(useResetting)
    
    app.use(Pinia)
    
    registerRemote(remote)
    useRegister(stores)
    useRegister(module)
  }
}