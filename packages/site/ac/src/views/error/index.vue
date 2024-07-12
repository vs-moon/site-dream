<script setup>
  import { useEmits, useProps, useRunning } from '.'
  import { useAttrs } from 'vue'

  const name = 'Error'

  defineOptions({
    name,
    inheritAttrs: false
  })

  const attrs = useAttrs()
  const slots = defineSlots()
  const emits = defineEmits([ ...useEmits ])
  const props = defineProps({ ...useProps })
  
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