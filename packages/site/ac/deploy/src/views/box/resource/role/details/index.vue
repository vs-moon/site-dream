<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs, watch } from 'vue'
import { roleFetch } from '@vs-customize/api-resource'
import { CustomizeUpPageView, CustomizeUpDicDrop } from '@vs-customize/component-up'
import { DIC } from '@vs-customize/const'

const name = 'roleDetails'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {
  modelValue,
} = useRunning({ attrs, slots, emits, props, name })

watch([ () => props.pid, () => props.app ], ([ newPid, newApp ]) => {
  newPid && (modelValue.value.pid = newPid)
  newApp && (modelValue.value.app = newApp)
}, { immediate: true })


defineExpose({})
</script>

<template>
  <section class="role-details">
    <CustomizeUpPageView
        v-model="modelValue"
        :confine-attribute="[ 'app' ]"
        :remote-insert="roleFetch.insertOne"
        :remote-update="roleFetch.updateOne"
        :remote-query="roleFetch.selectOne"
        :vm
        :id>
      <ElFormItem prop="app" label="应用程序">
        <CustomizeUpDicDrop v-model="modelValue.app" :type="DIC.APP" disabled />
      </ElFormItem>
      <ElFormItem prop="code" label="编码">
        <ElInput v-model="modelValue.code" />
      </ElFormItem>
      <ElFormItem prop="name" label="名称">
        <ElInput v-model="modelValue.name" />
      </ElFormItem>
    </CustomizeUpPageView>
  </section>
</template>

<style lang="scss" scoped />