import { reactive, ref } from 'vue'
import { useAuthorizationStore } from '@vs-common/utils/store/unit/authorization.js'

export const useConst = {
  key: Symbol('LOGIN'),
  enum: {}
}

export const useEmits = []

export const useProps = {}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const authorizationStore = useAuthorizationStore()
  
  const ruleFormRef = ref(null)
  const ruleForm = reactive({
    username: 'vs',
    password: 'vs'
  })
  
  const rules = reactive({
    username: [ { required: true, message: '请输入账号', trigger: 'blur' } ],
    password: [ { required: true, message: '请输入密码', trigger: 'blur' } ]
  })
  
  const loginForm = () => {
    ruleFormRef.value.validate((valid) => {
      if (valid) {
        authorizationStore.enter(ruleForm)
      }
    })
  }
  
  
  return {
    ruleFormRef,
    ruleForm,
    rules,
    loginForm,
    authorizationStore
  }
}