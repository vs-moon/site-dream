<script setup>
  import { useConst, useEmits, useProps, useRunning } from '.'
  import { useAttrs } from 'vue'

  import { UpAlive, UpMenu, UpCol, UpMore, UpRow } from '../index.js'

  const name = 'UpNav'

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
  <UpRow class="up-nav">
    <UpCol icon="Guide" open>
      <UpAlive />
    </UpCol>
    <UpCol icon="Menu">
      <UpMenu mode="horizontal" />
    </UpCol>
    <UpCol icon="Suitcase">
      <UpMore />
    </UpCol>
  </UpRow>
</template>

<style lang="scss" scoped>
  .up-alive {
    height: inherit;
  }
</style>