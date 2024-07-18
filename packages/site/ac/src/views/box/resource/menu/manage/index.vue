<script setup>
import { useConst, useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'
import { selectPage, selectLazy, validOne, deleteOne } from '@/api/resource/menu.js'
import { UpManagePage } from '@vs-component/up'

const name = 'resourceMenuManage'

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
  <section class="resource-menu-manage">
    <UpManagePage
        v-model:condition="condition"
        :remote-query="selectPage"
        :remote-valid="validOne"
        :remote-remove="deleteOne"
        :remote-lazy="selectLazy"
        lazy>
      <template #default>
        <ElTableColumn prop="source" label="数据来源" width="150" />
        <ElTableColumn prop="menuName" label="菜单名称" width="200" />
        <ElTableColumn prop="routeName" label="路由名称" width="200" />
        <ElTableColumn prop="routePath" label="路由路径" width="200" />
      </template>
      <template #condition>
        <ElFormItem label="数据来源">
          <ElInput v-model="condition.source" />
        </ElFormItem>
        <ElFormItem label="菜单名称">
          <ElInput v-model="condition.menuName" />
        </ElFormItem>
        <ElFormItem label="路由名称">
          <ElInput v-model="condition.routeName" />
        </ElFormItem>
        <ElFormItem label="路由路径">
          <ElInput v-model="condition.routePath" />
        </ElFormItem>
      </template>
    </UpManagePage>
  </section>
</template>

<style lang="scss" scoped>
</style>