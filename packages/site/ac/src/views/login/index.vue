<script setup>
import { useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'

import { useAuthorizationStore } from '@vs-common/utils/store/unit/authorization.js'


const name = 'Login'

defineOptions({
  name,
  inheritAttrs: false
})


const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const authorizationStore = useAuthorizationStore()

const {
  ruleFormRef,
  ruleForm,
  rules,
  loginForm
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})
</script>

<template>
  <section class="sso-login">
    <ElForm
        class="sso-login__form"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        status-icon>
      <ElFormItem prop="username">
        <ElInput
            v-model="ruleForm.username"
            autocomplete="off"
            placeholder="账号"
            size="large"/>
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="密码"
            type="password"
            size="large"
            @keyup.enter="loginForm"/>
      </ElFormItem>
      <div style="display: flex; justify-content: space-between;">
        <ElCheckbox v-model="authorizationStore.remember" size="large">
          记住我
        </ElCheckbox>
        <ElButton @click="loginForm" size="large">
          登录
        </ElButton>
      </div>
    </ElForm>
  </section>
</template>

<style lang="scss" scoped>
.sso-login {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  background-size: cover;

  .sso-login__form {
    width: 400px;
    height: 200px;
    padding: 20px;
    border-radius: 5px;
  }
}
</style>