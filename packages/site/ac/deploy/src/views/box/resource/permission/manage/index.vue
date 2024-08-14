<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { permissionFetch } from '@vs-customize/api-resource'
import { CustomizeUpPageManage, CustomizeUpDicDrop } from '@vs-customize/component-up'
import { DIC } from '@vs-customize/const'

const name = 'permissionManage'

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
  <section class="permission-manage">
    <CustomizeUpPageManage
        :condition="condition"
        :confine-props="{ app: condition.app }"
        :confine-attribute="[ 'app' ]"
        :remote-query="permissionFetch.selectPage"
        :remote-valid="permissionFetch.validOne"
        :remote-remove="permissionFetch.deleteOne">
      <template #default>
        <ElTableColumn prop="app" label="应用程序" width="150" />
        <ElTableColumn prop="code" label="编码" width="200" />
        <ElTableColumn prop="name" label="名称" width="200" />
      </template>
      <template #condition>
        <ElFormItem prop="app" label="应用程序" :rules="[{ required: true, message: '请选择应用程序', trigger: 'blur' }]">
          <CustomizeUpDicDrop v-model="condition.app" :type="DIC.APP" disabled />
        </ElFormItem>
        <ElFormItem prop="code" label="编码">
          <ElInput v-model="condition.code" />
        </ElFormItem>
        <ElFormItem prop="name" label="名称">
          <ElInput v-model="condition.name" />
        </ElFormItem>
      </template>
    </CustomizeUpPageManage>
  </section>
</template>

<style lang="scss" scoped />