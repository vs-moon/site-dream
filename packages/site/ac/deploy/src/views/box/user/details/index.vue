<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { userFetch } from '@vs-customize/api-ac-deploy'
import { CustomizeUpPageView } from '@vs-customize/component-up'

const name = 'userDetails'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {
  modelValue
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})
</script>

<template>
  <section class="user-details">
    <CustomizeUpPageView
      v-model="modelValue"
      :remote-insert="userFetch.insertOne"
      :remote-update="userFetch.updateOne"
      :remote-query="userFetch.selectOne"
      :vm
      :id>
      <ElFormItem prop="username" label="用户名称">
        <ElInput v-model="modelValue.username" />
      </ElFormItem>
      <ElFormItem prop="password" label="用户密码">
        <ElInput v-model="modelValue.password" />
      </ElFormItem>
    </CustomizeUpPageView>
  </section>
</template>

<style lang="scss" scoped />