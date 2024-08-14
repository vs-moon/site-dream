<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { appFetch } from '@vs-customize/api-resource'
import { CustomizeUpPageView } from '@vs-customize/component-up'

const name = 'appDetails'

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

defineExpose({})
</script>

<template>
  <section class="app-details">
    <CustomizeUpPageView
        v-model="modelValue"
        :remote-insert="appFetch.insertOne"
        :remote-update="appFetch.updateOne"
        :remote-query="appFetch.selectOne"
        :vm
        :id>
      <ElFormItem label="编码">
        <ElInput prop="code" v-model="modelValue.code" />
      </ElFormItem>
      <ElFormItem prop="name" label="名称">
        <ElInput v-model="modelValue.name" />
      </ElFormItem>
    </CustomizeUpPageView>
  </section>
</template>

<style lang="scss" scoped />