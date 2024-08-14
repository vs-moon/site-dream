import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { addRoute, useRouter, generateRoute, ROUTE } from '../../../router/index.js'
import { PackageUtils } from '@vs-common/utils'
import { PROPERTY_ROUTE } from '@vs-customize/const'
import { useAliveStore } from '../alive/index.js'
import { REMOTE, useRemote } from '../../utils/index.js'

const modules = import.meta.glob('@/views/**/*.vue')

export const useRouteStore = defineStore('routeStore', () => {
  
  const remote = useRemote()
  const router = useRouter()
  const aliveStore = useAliveStore()
  
  // 👉 State
  const enable = ref(false)
  const source = ref([])
  const nesting = ref([])
  const mapping = ref({})
  
  const updateMenu = () => {
    remote[REMOTE.route]().then(response => {
      if (response.success) {
        const nodeBranch = PackageUtils.toBranch(response.data)
        enable.value = true
        source.value = nodeBranch.source
        nesting.value = nodeBranch.nesting
        mapping.value = nodeBranch.mapping
        addRoute(ROUTE.root.name, generateRoute(source.value, modules))
        const { redirectedFrom } = router.value.currentRoute
        if (redirectedFrom) {
          router.value.push({ path: redirectedFrom.path, query: redirectedFrom.query })
        } else {
          router.value.push({ path: ROUTE.root.path })
        }
      }
    })
  }
  
  const nextRoute = () => {
    if (aliveStore.active) {
      return source.value.find(item => item[PROPERTY_ROUTE.pid] === aliveStore.current[PROPERTY_ROUTE.id]) || {}
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

export default useRouteStore

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRouteStore, import.meta.hot))
}