<script setup>
import { useConst, useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'

import { UpManagePage } from '@vs-component/up'

const name = 'serviceMemberManage'

defineOptions({
  name,
  inheritAttrs: true
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const {
  condition,
  selectPage,
  validOne,
  deleteOne
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})

</script>

<template>
  <section class="service-member-manage">
    <UpManagePage
        :condition="condition"
        :remote-query="selectPage"
        :remote-valid="validOne"
        :remote-remove="deleteOne">
      <template #default>
        <ElTableColumn prop="username" label="用户名" width="150" />
      </template>
      <template #condition>
        <ElForm :model="condition" @submit.prevent label-width="auto">
          <ElFormItem label="用户名">
            <ElInput v-model="condition.username" />
          </ElFormItem>
        </ElForm>
      </template>
    </UpManagePage>
  </section>
</template>

<style lang="scss" scoped>
</style>