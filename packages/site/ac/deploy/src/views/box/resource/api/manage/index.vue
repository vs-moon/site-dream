<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { DIC } from '@vs-customize/const'
import { apiFetch } from '@vs-customize/api-resource'
import { CustomizeUpPageManage, CustomizeUpDicDrop, CustomizeUpDicTag } from '@vs-customize/component-up'

const name = 'apiManage'

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
  <section class="api-manage">
    <CustomizeUpPageManage
        :condition="condition"
        :confine-props="{ app: condition.app }"
        :confine-attribute="[ 'app' ]"
        :remote-query="apiFetch.selectPage"
        :remote-valid="apiFetch.validOne"
        :remote-remove="apiFetch.deleteOne">
      <template #default>
        <ElTableColumn prop="app" label="应用程序" width="150" #default="{ row }">
          <CustomizeUpDicTag v-model="row['app']" :type="DIC.APP" />
        </ElTableColumn>
        <ElTableColumn prop="path" label="路径" width="200" />
        <ElTableColumn prop="method" label="方式" width="200" />
      </template>
      <template #condition>
        <ElFormItem prop="app" label="应用程序" :rules="[{ required: true, message: '请选择应用程序', trigger: 'blur' }]">
          <CustomizeUpDicDrop v-model="condition.app" :type="DIC.APP" disabled />
        </ElFormItem>
        <ElFormItem prop="path" label="请求路径">
          <ElInput v-model="condition.path" />
        </ElFormItem>
        <ElFormItem prop="method" label="请求方式">
          <CustomizeUpDicDrop v-model="condition.method" :type="DIC.HTTP_METHOD" />
        </ElFormItem>
      </template>
    </CustomizeUpPageManage>
  </section>
</template>

<style lang="scss" scoped />