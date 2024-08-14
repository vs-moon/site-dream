<script setup>
import { useOptions, useRunning } from './index.js'
import { ref, useAttrs } from 'vue'
import { routeFetch } from '@vs-customize/api-resource'
import { CustomizeUpPageManage, CustomizeUpDicDrop, CustomizeUpDicTag } from '@vs-customize/component-up'
import { DIC, NAV_TYPE, VALID } from '@vs-customize/const'

const name = 'routeManage'

defineOptions({
  name,
  inheritAttrs: true
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {
  condition
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})

</script>

<template>
  <section class="route-manage">
    <CustomizeUpPageManage
        v-model:condition="condition"
        :confine-props="{ app: condition.app }"
        :confine-attribute="[ 'app' ]"
        :remote-query="routeFetch.selectPage"
        :remote-valid="routeFetch.validOne"
        :remote-remove="routeFetch.deleteOne"
        :remote-lazy="routeFetch.selectLazy"
        :add-confine="({ row }) => row['type'] !== NAV_TYPE.I"
        lazy>
      <template #default>
        <ElTableColumn prop="app" label="应用程序" width="200" #default="{ row }">
          <CustomizeUpDicTag v-model="row['app']" :type="DIC.APP" />
        </ElTableColumn>
        <ElTableColumn prop="title" label="导航标题" width="150" />
        <ElTableColumn prop="type" label="导航类型" width="100" #default="{ row }">
          <CustomizeUpDicTag v-model="row['type']" :type="DIC.NAV_TYPE" />
        </ElTableColumn>
        <ElTableColumn prop="name" label="路由名称" width="240" />
        <ElTableColumn prop="path" label="路由路径" width="240" />
      </template>
      <template #condition>
        <ElFormItem prop="app" label="应用程序" :rules="[{ required: true, message: '请选择应用程序', trigger: 'blur' }]">
          <CustomizeUpDicDrop v-model="condition.app" :type="DIC.APP" />
        </ElFormItem>
        <ElFormItem prop="title" label="导航标题">
          <ElInput v-model="condition.title" />
        </ElFormItem>
        <ElFormItem prop="type" label="导航类型">
          <CustomizeUpDicDrop v-model="condition.type" :type="DIC.NAV_TYPE" />
        </ElFormItem>
        <ElFormItem prop="name" label="路由名称">
          <ElInput v-model="condition.name" />
        </ElFormItem>
        <ElFormItem prop="path" label="路由路径">
          <ElInput v-model="condition.path" />
        </ElFormItem>
      </template>
    </CustomizeUpPageManage>
  </section>
</template>

<style lang="scss" scoped />