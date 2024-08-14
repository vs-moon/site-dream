<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'

const name = 'Login'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {
  rules,
  formData,
  elFormRef,
  loginForm,
  authorizeStore
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})
</script>

<template>
  <section class="login">
    <ElForm
      class="login__form"
      ref="elFormRef"
      :model="formData"
      :rules="rules"
      status-icon>
      <ElFormItem prop="username">
        <ElInput
          v-model="formData.username"
          autocomplete="off"
          placeholder="账号"
          size="large" />
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput
          v-model="formData.password"
          autocomplete="off"
          placeholder="密码"
          type="password"
          size="large"
          @keyup.enter="loginForm" />
      </ElFormItem>
      <div style="display: flex; justify-content: space-between;">
        <ElCheckbox v-model="authorizeStore.remember" size="large">
          Remember Me
        </ElCheckbox>
        <ElButton @click="loginForm" size="large">
          登录
        </ElButton>
      </div>
    </ElForm>
  </section>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  padding-top: 100px;
  background-size: cover;

  &__form {
    width: 400px;
    height: 200px;
    padding: 20px;
    border-radius: 5px;
  }
}
</style>