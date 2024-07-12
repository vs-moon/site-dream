<script setup>
import { useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'
import { insertOne, selectOne } from '@/api/sso/member.js'
import { UpDetailsPage } from '@vs-component/up'

const name = 'serviceMemberDetails'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const {
  modelValue
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})
</script>

<template>
  <section class="service-member-details">
    <UpDetailsPage v-model="modelValue" :remote-insert="insertOne" :remote-query="selectOne" :view-mode="viewMode" :id="id">
      <ElFormItem label="用户名称">
        <ElInput v-model="modelValue.username" />
      </ElFormItem>
      <ElFormItem label="用户密码">
        <ElInput v-model="modelValue.password" />
      </ElFormItem>
    </UpDetailsPage>
  </section>
</template>

<style lang="scss" scoped />