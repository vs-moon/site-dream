<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { CustomizeUpPageManage } from '@vs-customize/component-up'
import { userFetch } from '@vs-customize/api-ac-deploy'

const name = 'userManage'

defineOptions({
  name,
  inheritAttrs: true
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {
  condition,
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})

</script>

<template>
  <section class="user-manage">
    <CustomizeUpPageManage
        :condition="condition"
        :remote-query="userFetch.selectPage"
        :remote-valid="userFetch.validOne"
        :remote-remove="userFetch.deleteOne">
      <template #default>
        <ElTableColumn prop="username" label="用户名" width="150" />
      </template>
      <template #condition>
        <ElFormItem prop="username" label="用户名">
          <ElInput v-model="condition.username" />
        </ElFormItem>
      </template>
    </CustomizeUpPageManage>
  </section>
</template>

<style lang="scss" scoped />