<script setup>
  import { useOptions, useRunning } from './index.js'
  import { useAttrs } from 'vue'

  const name = 'Error'

  defineOptions({
    name,
    inheritAttrs: false
  })

  const attrs = useAttrs()
  const slots = defineSlots()
  const emits = defineEmits([ ...useOptions.emits ])
  const props = defineProps({ ...useOptions.props })
  
  const {} = useRunning({ attrs, slots, emits, props, name })

  defineExpose({})
</script>

<template>
  <div>
    <h1>
      Error
    </h1>
  </div>
</template>

<style lang="scss" scoped >
</style>