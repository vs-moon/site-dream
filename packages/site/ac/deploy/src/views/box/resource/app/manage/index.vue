<script setup>
  import { useOptions, useRunning } from './index.js'
  import { useAttrs } from 'vue'
  import { appFetch } from '@vs-customize/api-resource'
  import { CustomizeUpPageManage } from '@vs-customize/component-up'

  const name = 'appManage'

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
  <section class="app-manage">
    <CustomizeUpPageManage
      :condition="condition"
      :remote-query="appFetch.selectPage"
      :remote-valid="appFetch.validOne"
      :remote-remove="appFetch.deleteOne">
      <template #default>
        <ElTableColumn prop="code" label="编码" width="200" />
        <ElTableColumn prop="name" label="名称" width="200" />
      </template>
      <template #condition>
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