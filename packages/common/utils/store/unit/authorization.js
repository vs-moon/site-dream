import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { useRouter, ROUTE_CONST } from '../../router/index.js'
import { useReset, useMenuStore } from '../index.js'
import { useRemote } from '../remote.js'
import { IDS, REMOTE } from '../const.js'

export const useAuthorizationStore = defineStore(IDS.authorization, () => {
  
  const remote = useRemote()
  const router = useRouter()
  const menuStore = useMenuStore()
  
  // 👉 State
  const enable = ref(false)
  const cross = ref([])
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
        useReset()
        router.value.push(ROUTE_CONST.entrance.path).then(failure => {
          !failure && ElMessage({
            type: 'success',
            message: '已退出'
          })
        })
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
        menuStore.updateMenu()
      }
    })
  }
  return {
    enable,
    cross,
    routine,
    remember,
    hibernation,
    profile,
    
    enter,
    exit,
    updateProfile
  }
})

export default useAuthorizationStore

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthorizationStore, import.meta.hot))
}