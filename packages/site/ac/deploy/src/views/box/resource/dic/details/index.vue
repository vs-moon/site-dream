<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs, watch } from 'vue'
import { DIC } from '@vs-customize/const'
import { dicFetch } from '@vs-customize/api-resource'
import { CustomizeUpPageView, CustomizeUpDicDrop, CustomizeUpDicTypeDrop } from '@vs-customize/component-up'

const name = 'dicDetails'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const { modelValue } = useRunning({ attrs, slots, emits, props, name })

watch(() => props.type, v => {
  v && (modelValue.value.type = v)
}, { immediate: true })

defineExpose({})
</script>

<template>
  <section class="dic-details">
    <CustomizeUpPageView
        v-model="modelValue"
        :confine-attribute="[ 'type' ]"
        :remote-insert="dicFetch.insertOne"
        :remote-update="dicFetch.updateOne"
        :remote-query="dicFetch.selectOne"
        :vm
        :id>
      <ElFormItem label="类型">
        <CustomizeUpDicTypeDrop prop="type" v-model="modelValue.type" disabled />
      </ElFormItem>
      <ElFormItem prop="code" label="编码">
        <ElInput v-model="modelValue.code" :disabled="type === DIC.COLOR" />
      </ElFormItem>
      <ElFormItem prop="name" label="名称">
        <ElInput v-model="modelValue.name" />
      </ElFormItem>
      <ElFormItem prop="fixed" label="是否固定">
        <CustomizeUpDicDrop v-model="modelValue.fixed" :type="DIC.TAF" />
      </ElFormItem>
      <ElFormItem prop="color" label="颜色">
        <ElColorPicker v-if="type === DIC.COLOR" v-model="modelValue.color" @change="v => modelValue.code = v" />
        <CustomizeUpDicDrop v-else v-model="modelValue.color" :type="DIC.COLOR" />
      </ElFormItem>
    </CustomizeUpPageView>
  </section>
</template>

<style lang="scss" scoped />