<script setup>
import { useOptions, useRunning } from './index.js'
import { reactive, useAttrs } from 'vue'

const name = 'Console'

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
  <section>
  </section>
</template>

<style lang="scss" scoped />