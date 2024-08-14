<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'

const name = 'CustomizeUpDesignMore'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})
</script>

<template>
  <section class="customize-up-design-more">

  </section>
</template>

<style lang="scss" scoped />