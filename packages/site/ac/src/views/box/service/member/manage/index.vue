<script setup>
import { useConst, useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'
import { UpManagePage } from '@vs-component/up'
import { selectPage, validOne, deleteOne } from '@/api/sso/member.js'

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
        <ElFormItem label="用户名">
          <ElInput v-model="condition.username" />
        </ElFormItem>
      </template>
    </UpManagePage>
  </section>
</template>

<style lang="scss" scoped>
</style>