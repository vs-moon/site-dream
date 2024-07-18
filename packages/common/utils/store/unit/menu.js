import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

import { addRoute, useRouter, generateRoute, ROUTE_CONST } from '../../router/index.js'
import { toBranch } from '../../package/index.js'
import { useRemote } from '../remote.js'
import { MENU_MODE } from '../../const/enum.js'
import { useAliveStore } from './alive.js'
import { IDS, REMOTE } from '../const.js'
import { useProperty } from '../property.js'

const modules = import.meta.glob('@/views/**/*.vue')

export const useMenuStore = defineStore(IDS.menu, () => {
  
  const remote = useRemote()
  const router = useRouter()
  const aliveStore = useAliveStore()
  const aliveProperty = useProperty().aliveStore
  
  // 👉 State
  const enable = ref(false)
  const source = ref([])
  const nesting = ref([])
  const mapping = ref({})
  
  const updateMenu = () => {
    remote[REMOTE.route]().then(response => {
      if (response.success) {
        const nodeBranch = toBranch(response.data)
        enable.value = true
        source.value = nodeBranch.source
        nesting.value = nodeBranch.nesting
        mapping.value = nodeBranch.mapping
        addRoute(ROUTE_CONST.root.name, generateRoute(source.value, modules))
        const { redirectedFrom } = router.value.currentRoute
        if (redirectedFrom) {
          router.value.push({ path: redirectedFrom.path, query: redirectedFrom.query })
        } else {
          router.value.push({ path: ROUTE_CONST.root.path })
        }
      }
    })
  }
  
  const nextRoute = () => {
    if (aliveStore.active) {
      if (aliveStore.current[aliveProperty.menuMode] === MENU_MODE.M) {
        return source.value.find(item => item[aliveProperty.parentId] === aliveStore.current[aliveProperty.id])
      } else {
        return {}
      }
    } else {
      return {}
    }
  }
  
  return {
    enable,
    source,
    mapping,
    nesting,
    updateMenu,
    nextRoute
  }
})

export default useMenuStore

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
}