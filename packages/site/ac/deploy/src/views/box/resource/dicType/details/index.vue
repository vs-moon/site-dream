<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { dicTypeFetch } from '@vs-customize/api-resource'
import { CustomizeUpPageView, CustomizeUpDicDrop } from '@vs-customize/component-up'
import { DIC } from '@vs-customize/const'

const name = 'dicTypeDetails'

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
  <section class="dic-type-details">
    <CustomizeUpPageView
        v-model="modelValue"
        :remote-insert="dicTypeFetch.insertOne"
        :remote-update="dicTypeFetch.updateOne"
        :remote-query="dicTypeFetch.selectOne"
        :vm
        :id>
      <ElFormItem label="编码">
        <ElInput prop="code" v-model="modelValue.code" />
      </ElFormItem>
      <ElFormItem prop="name" label="名称">
        <ElInput v-model="modelValue.name" />
      </ElFormItem>
      <ElFormItem prop="valid" label="有效性">
        <CustomizeUpDicDrop v-model="modelValue.valid" :type="DIC.VALID" />
      </ElFormItem>
    </CustomizeUpPageView>
  </section>
</template>

<style lang="scss" scoped />