<script setup>
  import { useConst, useEmits, useProps, useRunning } from '.'
  import { useAttrs } from 'vue'

  const name = 'UpRow'

  defineOptions({
    name,
    inheritAttrs: false
  })

  const attrs = useAttrs()
  const slots = defineSlots()
  const emits = defineEmits([ ...useEmits ])
  const props = defineProps({ ...useProps })

  const {  } = useRunning({ attrs, slots, emits, props, name })
</script>

<template>
  <ElRow class="up-row" :gutter="10">
    <slot></slot>
  </ElRow>

</template>

<style scoped lang="scss">
  .el-row {
    height: 60px;
    transition: transform .7s;
  }
</style>