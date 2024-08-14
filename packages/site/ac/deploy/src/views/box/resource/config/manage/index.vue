<script setup>
  import { useOptions, useRunning } from './index.js'
  import { useAttrs } from 'vue'
  import { configFetch } from '@vs-customize/api-resource'
  import { CustomizeUpDicDrop, CustomizeUpPageManage } from '@vs-customize/component-up'
  import { DIC } from '@vs-customize/const'

  const name = 'sourceManage'

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
  <section class="source-manage">
    <CustomizeUpPageManage
      :condition="condition"
      :confine-props="{ app: condition.app }"
      :confine-attribute="[ 'app' ]"
      :remote-query="configFetch.selectPage"
      :remote-valid="configFetch.validOne"
      :remote-remove="configFetch.deleteOne">
      <template #default>
        <ElTableColumn prop="app" label="应用程序" width="150" />
        <ElTableColumn prop="dataType" label="数据类型" width="200" />
        <ElTableColumn prop="attributeName" label="属性名称" width="200" />
      </template>
      <template #condition>
        <ElFormItem prop="app" label="应用程序" :rules="[{ required: true, message: '请选择应用程序', trigger: 'blur' }]">
          <CustomizeUpDicDrop v-model="condition.app" :type="DIC.APP" disabled />
        </ElFormItem>
        <ElFormItem prop="dataType" label="数据类型">
          <CustomizeUpDicDrop v-model="condition.dataType" :type="DIC.CONFIG_DATA_TYPE" />
        </ElFormItem>
        <ElFormItem prop="attributeName" label="属性名称">
          <ElInput v-model="condition.attributeName" />
        </ElFormItem>
      </template>
    </CustomizeUpPageManage>
  </section>
</template>

<style lang="scss" scoped />