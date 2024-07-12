<script setup>
import { useConst, useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'
import { selectPage, validOne, deleteOne } from '@/api/resource/role.js'
import { UpManagePage } from '@vs-component/up'

const name = 'resourceRoleManage'

defineOptions({
  name,
  inheritAttrs: true
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const {
  condition
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})

</script>

<template>
  <section class="resource-role-manage">
    <UpManagePage
        :condition="condition"
        :remote-query="selectPage"
        :remote-valid="validOne"
        :remote-remove="deleteOne">
      <template #default>
        <ElTableColumn prop="source" label="数据来源" width="150" />
        <ElTableColumn prop="type" label="类型" width="200" />
        <ElTableColumn prop="code" label="编码" width="200" />
        <ElTableColumn prop="name" label="名称" width="200" />
      </template>
      <template #condition>
        <ElForm :model="condition" @submit.prevent label-width="auto">
          <ElFormItem label="数据来源">
            <ElInput v-model="condition.source" />
          </ElFormItem>
          <ElFormItem label="类型">
            <ElInput v-model="condition.type" />
          </ElFormItem>
          <ElFormItem label="编码">
            <ElInput v-model="condition.code" />
          </ElFormItem>
          <ElFormItem label="名称">
            <ElInput v-model="condition.name" />
          </ElFormItem>
        </ElForm>
      </template>
    </UpManagePage>
  </section>
</template>

<style lang="scss" scoped>
</style>