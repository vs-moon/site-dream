<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'

const name = 'UpRow'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {} = useRunning({ attrs, slots, emits, props, name })
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