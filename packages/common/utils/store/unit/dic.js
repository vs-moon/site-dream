import { computed, reactive, ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

import { isEmpty } from '../../array/index.js'
import { isFalsely, isFunction } from '../../type/index.js'
import { useRemote } from '../remote.js'
import { useProperty } from '../property.js'
import { IDS, REMOTE } from '../const.js'
import { VALID } from '../../const/enum.js'

export const useDicStore = defineStore(IDS.dic, () => {
  
  const remote = useRemote()
  const dicProperty = useProperty().dicStore
  
  // 👉 State
  const enable = ref(true)
  const dic = reactive({})
  const dicType = reactive({})
  
  const dicCache = computed(() => dic)
  const dicTypeCache = computed(() => dicType)
  
  const remoteDic = type => {
    if (isFunction(remote[REMOTE.dic]) && isFalsely(dic[type])) {
      remote[REMOTE.dic]({ type }).then(response => {
        if (response.success) {
          if (!isEmpty(response.data)) {
            dic[type] = {}
            const dicItem = dic[type]
            response.data.forEach(item => {
              const { code, name, color, valid } = item
              dicItem[code] = {
                code,
                name,
                color,
                valid,
                disabled: valid === VALID.F
              }
            })
            
            remoteDicType(type)
          }
        }
      })
    }
  }
  
  const remoteDicType = (code = '') => {
    if (isFunction(remote[REMOTE.dicType]) && isFalsely(dicType[code])) {
      remote[REMOTE.dicType]({ code }).then(response => {
        if (response.success) {
          if (!isEmpty(response.data)) {
            dicType[code] = response.data.map(item => {
              const {
                code,
                name,
                valid
              } = item
              
              return {
                code,
                name,
                valid,
                disabled: VALID.F === valid
              }
            })[0]
          }
        }
      })
    }
  }

  return {
    enable,
    dic,
    dicType,
    dicCache,
    dicTypeCache,
    remoteDic,
    remoteDicType
  }
})

export default useDicStore

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDicStore, import.meta.hot))
}