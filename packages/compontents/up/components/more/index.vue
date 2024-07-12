<script setup>
  import { useConst, useEmits, useProps, useRunning } from '.'
  import { useAttrs } from 'vue'

  const name = 'UpMore'

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
  <section class="up-more">

  </section>
</template>

<style lang="scss" scoped>

</style>