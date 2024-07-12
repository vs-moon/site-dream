import Persisted, { createPersistedState } from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
import { reactive, readonly } from 'vue'
import { isFalsely } from '../type/index.js'
import { registerRemote } from './remote.js'
import { registerProperty } from './property.js'

export * from './unit/alive.js'
export * from './unit/authorization.js'
export * from './unit/dic.js'
export * from './unit/menu.js'
export * from './property.js'

// Pinia 实例
export const Pinia = createPinia()

/**
 * 原始化
 * @param store
 */
const usePrimitive = ({ store }) => {
  isFalsely(store.$primitive) && (store.$primitive = {})
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

const storesInstance = reactive({})
const nativeStoreModules = import.meta.glob('./unit/**/*.js', { eager: true, import: 'default' })

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
 * @param remote
 * @param property
 */
export const useRegister = ({ module: clientStoreModules, remote = {}, property = {} }) => {
  
  registerRemote(remote)
  registerProperty(property)
  
  const finalStoreModules = clientStoreModules ?
    { ...nativeStoreModules, ...clientStoreModules } : nativeStoreModules
  
  for (const path in finalStoreModules) {
    const store = finalStoreModules[path]
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
  install: (app, {
    module,
    remote,
    property
  } = {}) => {
    
    Pinia.use(usePrimitive)
    Pinia.use(Persisted)
    Pinia.use(createPersistedState({ auto: true }))
    Pinia.use(useResetting)
    
    app.use(Pinia)
    
    useRegister({ module, remote, property })
  }
}