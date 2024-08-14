<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs, watch } from 'vue'
import { DIC, VALID } from '@vs-customize/const'
import { dicFetch } from '@vs-customize/api-resource'
import {
  CustomizeUpPageManage,
  CustomizeUpDicDrop,
  CustomizeUpDicTag,
  CustomizeUpDicTypeDrop
} from '@vs-customize/component-up'

const name = 'dicManage'

defineOptions({
  name,
  inheritAttrs: true
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const { condition } = useRunning({ attrs, slots, emits, props, name })

watch(() => props.type, v => {
  v && (condition.type = v)
}, { immediate: true })

defineExpose({})

</script>

<template>
  <section class="dic-manage">
    <CustomizeUpPageManage
      :confine-props="{ type: condition.type }"
      :confine-attribute="[ 'type' ]"
      :condition="condition"
      :remote-query="dicFetch.selectPage"
      :remote-valid="dicFetch.validOne"
      :remote-remove="dicFetch.deleteOne"
      :modify-confine="({ row }) => row['fixed'] === VALID.T">
      <template #default>
        <ElTableColumn prop="type" label="类型" width="200" />
        <ElTableColumn prop="code" label="编码" width="200" />
        <ElTableColumn prop="name" label="名称" width="200" />
        <ElTableColumn prop="valid" label="有效性" width="100" #default="{ row }">
          <CustomizeUpDicTag :model-value="row['valid']" :type="DIC.VALID" />
        </ElTableColumn>
      </template>
      <template #condition>
        <ElFormItem prop="type" label="类型">
          <CustomizeUpDicTypeDrop v-model="condition.type" />
        </ElFormItem>
        <ElFormItem prop="code" label="编码">
          <ElInput v-model="condition.code" />
        </ElFormItem>
        <ElFormItem prop="name" label="名称">
          <ElInput v-model="condition.name" />
        </ElFormItem>
        <ElFormItem prop="fixed" label="是否固定">
          <CustomizeUpDicDrop v-model="condition.fixed" :type="DIC.TAF" />
        </ElFormItem>
      </template>
    </CustomizeUpPageManage>
  </section>
</template>

<style lang="scss" scoped />