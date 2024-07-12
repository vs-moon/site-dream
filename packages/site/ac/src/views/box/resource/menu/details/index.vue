<script setup>
import { useConst, useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'
import { selectOne, insertOne } from '@/api/resource/menu.js'
import { UpDetailsPage } from '@vs-component/up'

const name = 'resourceMenuDetails'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const {
  modelValue,
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})
</script>

<template>
  <section class="resource-menu-details">
    <UpDetailsPage
        v-model="modelValue"
        :remote-insert="insertOne"
        :remote-query="selectOne"
        :view-mode="viewMode"
        :id="id">
      <ElFormItem label="数据来源">
        <ElInput v-model="modelValue.source" />
      </ElFormItem>
      <ElFormItem label="模块路径">
        <ElInput v-model="modelValue.modulePath" />
      </ElFormItem>
      <ElFormItem label="路由模式">
        <ElInput v-model="modelValue.jumpMode" />
      </ElFormItem>
      <ElFormItem label="路由路径">
        <ElInput v-model="modelValue.routePath" />
      </ElFormItem>
      <ElFormItem label="路由名称">
        <ElInput v-model="modelValue.routeName" />
      </ElFormItem>
      <ElFormItem label="路由缓存">
        <ElInput v-model="modelValue.routeAlive" />
      </ElFormItem>
      <ElFormItem label="菜单模式">
        <ElInput v-model="modelValue.menuMode" />
      </ElFormItem>
      <ElFormItem label="菜单名称">
        <ElInput v-model="modelValue.menuName" />
      </ElFormItem>
      <ElFormItem label="菜单图标">
        <ElInput v-model="modelValue.menuIcon" />
      </ElFormItem>
    </UpDetailsPage>
  </section>
</template>

<style lang="scss" scoped>
</style>