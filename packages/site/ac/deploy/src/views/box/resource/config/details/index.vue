<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs, watch } from 'vue'
import { configFetch } from '@vs-customize/api-resource'
import { DIC } from '@vs-customize/const'
import { UpAceEditor } from '@vs-common/component-up'
import { CustomizeUpPageView, CustomizeUpDicDrop } from '@vs-customize/component-up'

const name = 'configDetails'

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

watch(() => props.app, v => {
  v && (modelValue.value.app = v)
}, { immediate: true })

defineExpose({})
</script>

<template>
  <section class="config-details">
    <CustomizeUpPageView
        v-model="modelValue"
        :confine-attribute="[ 'app' ]"
        :remote-insert="configFetch.insertOne"
        :remote-update="configFetch.updateOne"
        :remote-query="configFetch.selectOne"
        :vm
        :id>
      <ElFormItem label="应用程序">
        <CustomizeUpDicDrop prop="app" v-model="modelValue.app" :type="DIC.APP" disabled />
      </ElFormItem>
      <ElFormItem prop="dataType" label="数据类型">
        <CustomizeUpDicDrop v-model="modelValue.datatype" :type="DIC.CONFIG_DATA_TYPE" />
      </ElFormItem>
      <ElFormItem prop="attributeName" label="属性名称">
        <ElInput v-model="modelValue.attributeName" />
      </ElFormItem>
      <ElFormItem prop="attributeValue" label="属性值">
        <UpAceEditor v-model="modelValue.attributeValue" v-model:lang="modelValue.datatype" />
      </ElFormItem>
    </CustomizeUpPageView>
  </section>
</template>

<style lang="scss" scoped />