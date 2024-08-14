import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { useRouter, ROUTE } from '../../../router/index.js'
import { useReset, useRouteStore } from '../../index.js'
import { useRemote, REMOTE } from '../../utils/index.js'

export const useAuthorizeStore = defineStore('authorizeStore', () => {
  
  const remote = useRemote()
  const router = useRouter()
  const routeStore = useRouteStore()
  
  // 👉 State
  const enable = ref(false)
  const cross = ref([])
  const crossSite = ref('')
  const routine = ref('')
  const remember = ref(false)
  const hibernation = ref('')
  const profile = ref({})
  
  const enter = v => {
    const service = ElLoading.service()
    remote[REMOTE.login](v).then(response => {
      if (response.success) {
        updateProfile()
      }
    }).finally(() => {
      service.close()
    })
  }
  
  const exit = () => {
    ElMessageBox.confirm('确认退出登录?', '提示', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'info'
    }).then(() => {
      remote[REMOTE.logout]().then(response => {
        if (response.success) {
          useReset()
          router.value.push(ROUTE.entrance.path).then(failure => {
            !failure && ElMessage({
              type: 'success',
              message: '已退出'
            })
          })
        }
      }).catch(e => {
        console.log(e)
        ElMessage({
          type: 'error',
          message: '退出失败'
        })
      })
    })
  }
  
  const updateProfile = () => {
    remote[REMOTE.profile]().then(response => {
      if (response.success) {
        enable.value = true
        profile.value = response.data
        routeStore.updateMenu()
      }
    })
  }
  return {
    enable,
    cross,
    crossSite,
    routine,
    remember,
    hibernation,
    profile,
    
    enter,
    exit,
    updateProfile
  }
})

export default useAuthorizeStore

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthorizeStore, import.meta.hot))
}