<script setup>
import { useConst, useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'
import { selectOne, insertOne } from '@/api/resource/menu.js'
import { UpDetailsPage, UpDicDrop, UpIcon } from '@vs-component/up'
import { DIC } from '@vs-component/up/const/enum.js'
import { iconNames } from '@/plugin/icon/index.js'

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
        <UpDicDrop v-model="modelValue.jumpMode" :type="DIC.JUMP_MODE" />
      </ElFormItem>
      <ElFormItem label="路由路径">
        <ElInput v-model="modelValue.routePath" />
      </ElFormItem>
      <ElFormItem label="路由名称">
        <ElInput v-model="modelValue.routeName" />
      </ElFormItem>
      <ElFormItem label="路由缓存">
        <UpDicDrop v-model="modelValue.routeAlive" :type="DIC.VALID" />
      </ElFormItem>
      <ElFormItem label="菜单模式">
        <UpDicDrop v-model="modelValue.menuMode" :type="DIC.MENU_MODE" />
      </ElFormItem>
      <ElFormItem label="菜单名称">
        <ElInput v-model="modelValue.menuName" />
      </ElFormItem>
      <ElFormItem label="菜单图标">
        <UpIcon v-model="modelValue.menuIcon" :icon-names="iconNames" />
      </ElFormItem>
    </UpDetailsPage>
  </section>
</template>

<style lang="scss" scoped>
</style>