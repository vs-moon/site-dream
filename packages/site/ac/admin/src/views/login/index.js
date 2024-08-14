import { reactive, ref } from 'vue'
import { useAuthorizeStore } from '@vs-customize/plugin'

export const useOptions = {
  key: Symbol('LOGIN'),
  confine: {},
  emits: [],
  props: {}
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const authorizeStore = useAuthorizeStore()
  
  const elFormRef = ref(null)
  const formData = reactive({
    username: 'admin',
    password: 'admin'
  })
  
  const rules = {
    username: [ { required: true, message: '请输入账号', trigger: 'blur' } ],
    password: [ { required: true, message: '请输入密码', trigger: 'blur' } ]
  }
  
  const loginForm = () => {
    elFormRef.value.validate((valid) => {
      if (valid) {
        authorizeStore.enter(formData)
      }
    })
  }
  
  
  return {
    rules,
    elFormRef,
    formData,
    loginForm,
    authorizeStore
  }
}