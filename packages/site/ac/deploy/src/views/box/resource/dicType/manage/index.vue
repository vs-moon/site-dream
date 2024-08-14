<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { dicTypeFetch } from '@vs-customize/api-resource'
import { CustomizeUpPageManage, CustomizeUpDicTag, CustomizeUpRelevanceJump } from '@vs-customize/component-up'
import { DIC } from '@vs-customize/const'

const name = 'resourceDiTypeManage'

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
  <section class="resource-dic-type-manage">
    <CustomizeUpPageManage
        :condition="condition"
        :remote-query="dicTypeFetch.selectPage"
        :remote-valid="dicTypeFetch.validOne"
        :remote-remove="dicTypeFetch.deleteOne">
      <template #default>
        <ElTableColumn prop="name" label="名称" width="200" />
        <ElTableColumn prop="code" label="编码" width="200" #default="{ row }">
          <CustomizeUpRelevanceJump linkage-prop="code" :route-param="{ type: row['code'] }">
            {{ row['code'] }}
          </CustomizeUpRelevanceJump>
        </ElTableColumn>
        <ElTableColumn prop="valid" label="有效性" width="100" #default="{ row }">
          <CustomizeUpDicTag :model-value="row['valid']" :type="DIC.VALID" />
        </ElTableColumn>
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