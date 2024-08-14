<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs, watch } from 'vue'
import { apiFetch } from '@vs-customize/api-resource'
import { CustomizeUpDicDrop, CustomizeUpPageView } from '@vs-customize/component-up'
import { DIC } from '@vs-customize/const'

const name = 'apiDetails'

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

watch(() => props.app, v => {
  v && (modelValue.value.app = v)
}, { immediate: true })

defineExpose({})
</script>

<template>
  <section class="api-details">
    <CustomizeUpPageView
      v-model="modelValue"
      :confine-attribute="[ 'app' ]"
      :remote-insert="apiFetch.insertOne"
      :remote-update="apiFetch.updateOne"
      :remote-query="apiFetch.selectOne"
      :vm
      :id>
      <ElFormItem prop="app" label="应用程序">
        <CustomizeUpDicDrop v-model="modelValue.app" :type="DIC.APP" />
      </ElFormItem>
      <ElFormItem prop="path" label="请求路径">
        <ElInput v-model="modelValue.path" />
      </ElFormItem>
      <ElFormItem prop="method" label="请求方式">
        <CustomizeUpDicDrop v-model="modelValue.method" :type="DIC.HTTP_METHOD" />
      </ElFormItem>
    </CustomizeUpPageView>
  </section>
</template>

<style lang="scss" scoped />