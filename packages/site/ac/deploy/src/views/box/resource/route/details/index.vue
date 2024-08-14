<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs, watch } from 'vue'
import { routeFetch } from '@vs-customize/api-resource'
import { UpIconDrop, UpAceEditor } from '@vs-common/component-up'
import { CustomizeUpPageView, CustomizeUpDicDrop } from '@vs-customize/component-up'
import { DIC, VALID, VIEW_MODE } from '@vs-customize/const'

const name = 'routeDetails'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const { modelValue } = useRunning({ attrs, slots, emits, props, name })

watch([ () => props.pid, () => props.app ], ([ newPid, newApp ]) => {
  newPid && (modelValue.value.pid = newPid)
  newApp && (modelValue.value.app = newApp)
}, { immediate: true })


defineExpose({})
</script>

<template>
  <section class="route-details">
    <CustomizeUpPageView
        v-model="modelValue"
        :confine-attribute="[ 'app' ]"
        :remote-insert="routeFetch.insertOne"
        :remote-update="routeFetch.updateOne"
        :remote-query="routeFetch.selectOne"
        :vm
        :id>
      <ElFormItem prop="app" label="应用程序">
        <CustomizeUpDicDrop v-model="modelValue.app" :type="DIC.APP" disabled />
      </ElFormItem>
      <ElFormItem prop="uri" label="模块路径">
        <ElInput v-model="modelValue.uri" />
      </ElFormItem>
      <ElFormItem prop="mode" label="路由模式">
        <CustomizeUpDicDrop v-model="modelValue.mode" :type="DIC.JUMP_MODE" />
      </ElFormItem>
      <ElFormItem prop="path" label="路由路径">
        <ElInput v-model="modelValue.path" />
      </ElFormItem>
      <ElFormItem prop="name" label="路由名称">
        <ElInput v-model="modelValue.name" />
      </ElFormItem>
      <ElFormItem prop="cache" label="路由缓存">
        <CustomizeUpDicDrop v-model="modelValue.cache" :type="DIC.VALID" />
      </ElFormItem>
      <ElFormItem prop="type" label="导航类型">
        <CustomizeUpDicDrop v-model="modelValue.type" :type="DIC.NAV_TYPE" />
      </ElFormItem>
      <ElFormItem prop="title" label="导航标题">
        <ElInput v-model="modelValue.title" />
      </ElFormItem>
      <ElFormItem prop="icon" label="导航图标">
        <UpIconDrop v-model="modelValue.icon" />
      </ElFormItem>
      <ElFormItem prop="linkage" label="是否联动">
        <CustomizeUpDicDrop v-model="modelValue.linkage" :type="DIC.TAF" />
      </ElFormItem>
      <ElFormItem prop="linkageConfig" v-show="modelValue.linkage === VALID.T" label="联动配置">
        <UpAceEditor v-model="modelValue.linkageConfig" :readonly="VIEW_MODE.VIEW === vm" />
      </ElFormItem>
      <ElFormItem prop="home" label="是否首页">
        <CustomizeUpDicDrop v-model="modelValue.home" :type="DIC.TAF" />
      </ElFormItem>
      <ElFormItem prop="hide" label="是否隐藏 ">
        <CustomizeUpDicDrop v-model="modelValue.hide" :type="DIC.TAF" />
      </ElFormItem>
    </CustomizeUpPageView>
  </section>
</template>

<style lang="scss" scoped />