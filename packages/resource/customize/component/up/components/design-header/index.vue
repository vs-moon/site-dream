<script setup>
  import { useEmits, useProps, useRunning } from './index.js'
  import { useAttrs } from 'vue'
  import UpNav from '@vs-common/component-up/components/nav/index.vue'
  import UpTools from '@vs-common/component-up/components/tools/index.vue'

  const name = 'UpHeader'

  defineOptions({
    name,
    inheritAttrs: false
  })

  const attrs = useAttrs()
  const slots = defineSlots()
  const emits = defineEmits([ ...useEmits ])
  const props = defineProps({ ...useProps })

  const {  } = useRunning({ attrs, slots, emits, props, name })

  defineExpose({})
</script>

<template>
  <ElHeader>
    <slot>
      <ElRow :gutter="10">
        <ElCol :span="20">
          <UpNav />
        </ElCol>
        <ElCol :span="4">
          <UpTools />
        </ElCol>
      </ElRow>
    </slot>
  </ElHeader>
</template>

<style scoped lang="scss">
  .el-header {
    height: 80px;
    padding: 10px 10px 10px 0;
  }
</style>