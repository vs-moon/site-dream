import { computed, ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { VALID } from '@vs-customize/const'
import { ArrayUtils, TypeUtils, StringUtils } from '@vs-common/utils'
import { REMOTE, useRemote } from '../../utils/index.js'

export const useDicStore = defineStore('dicStore', () => {
  
  const remote = useRemote()
  
  // 👉 State
  const enable = ref(true)
  const dic = ref({})
  const dicType = ref({})
  const dicQueue = ref([])
  const dicTypeQueue = ref([])
  
  const dicCache = computed(() => type => {
    if (dic.value[type]) {
      return dic.value[type]
    } else {
      remoteDic(type)
      return {}
    }
  })
  
  const canRun = (fn, ...args) => {
    fn instanceof Function && fn(...args)
  }
  
  const dicTypeCache = computed(() => code => {
    if (dicType.value[code]) {
      return dicType.value[code]
    } else {
      remoteDicType(code)
      return {}
    }
  })
  
  const removeQueue = (queue, item) => {
    queue.splice(queue.indexOf(item), 1)
  }
  const removeQueueDic = item => {
    removeQueue(dicQueue.value, item)
  }
  const removeQueueDicType = item => {
    removeQueue(dicTypeQueue.value, item)
  }
  
  const remoteDic = (type, resolve = null) => {
    if (dicQueue.value.indexOf(type) < 0) {
      if (TypeUtils.isFunction(remote[REMOTE.dic]) && !StringUtils.isBlank(type)) {
        dicQueue.value.push(type)
        remote[REMOTE.dic]({ type }).then(response => {
          if (response.success) {
            if (!ArrayUtils.isEmpty(response.data)) {
              dic.value[type] = {}
              response.data.forEach(item => {
                const { code, name, color, valid, fixed } = item
                dic.value[type][code] = { type, code, name, color, valid, fixed, disabled: valid === VALID.F }
              })
              
              canRun(resolve, true, { ...dic.value[type] })
              return remoteDicType(type)
            }
          }
          
          removeQueueDic(type)
          canRun(resolve, false)
        }).catch(() => {
          removeQueueDic(type)
          canRun(resolve, false)
        })
      }
    }
  }
  
  const filterDicType = code => {
    let count = 0
    const data = Reflect.ownKeys(dicType.value).reduce((map, key) => {
      if (key.toLowerCase().includes(code.toLowerCase())) {
        count++
        map[key] = dicType.value[key]
      }
      return map
    }, {})
    
    return {
      isFind: count > 0,
      data
    }
  }
  
  const remoteDicType = (code = '', resolve = null) => {
    if (dicTypeQueue.value.indexOf(code) < 0) {
      if (TypeUtils.isFunction(remote[REMOTE.dicType]) && !StringUtils.isBlank(code)) {
        dicTypeQueue.value.push(code)
        remote[REMOTE.dicType]({ code }).then(response => {
          if (response.success) {
            if (!ArrayUtils.isEmpty(response.data)) {
              const { code, name, valid } = response.data[0] || response.data
              dicType.value[code] = { code, name, valid, disabled: VALID.F === valid }
              canRun(resolve, true, { ...dicType.value[code] })
              return remoteDic(code)
            }
          }
          
          removeQueueDicType(code)
          canRun(resolve, false)
        }).catch(() => {
          removeQueueDicType(code)
          canRun(resolve, false)
        })
      }
    } else {
      canRun(resolve, false)
    }
  }
  
  return {
    enable,
    dic,
    dicType,
    dicCache,
    dicTypeCache,
    dicQueue,
    dicTypeQueue,
    removeQueueDic,
    removeQueueDicType,
    remoteDic,
    remoteDicType,
    filterDicType
  }
})

export default useDicStore

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDicStore, import.meta.hot))
}