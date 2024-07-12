<script setup>
  import { useConst, useEmits, useProps, useRunning } from '.'
  import { useAttrs } from 'vue'

  import { VIEW_MODE } from '@vs-common/utils/const/enum.js'

  const name = 'UpDetailsPage'

  defineOptions({
    name,
    inheritAttrs: false
  })

  const attrs = useAttrs()
  const slots = defineSlots()
  const emits = defineEmits([ ...useEmits ])
  const props = defineProps({ ...useProps })
  const modelValue = defineModel({
    type: Object
  })

  const {
    status,
    onInsert,
  } = useRunning({ attrs, slots, emits, props, name })

  defineExpose({})
</script>

<template>
  <section class="up-details-page" v-loading="status.loading.box">
    <ElCard>
      <template #header>
        <ElButton type="success" :disabled="viewMode === VIEW_MODE.QUERY || viewMode === VIEW_MODE.DETAILS" @click="onInsert">保存</ElButton>
      </template>
      <template #default>
        <ElForm :model="modelValue" :disabled="viewMode === VIEW_MODE.QUERY || viewMode === VIEW_MODE.DETAILS" inline>
          <slot></slot>
        </ElForm>
      </template>
    </ElCard>
  </section>
</template>

<style lang="scss" scoped>
  .up-details-page {
    width: 100%;
    height: 100%;

    .el-card {
      height: 100%;
    }
  }
</style>