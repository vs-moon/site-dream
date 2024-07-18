<script setup>
import { useConst, useProps, useEmits, useRunning } from '.'
import { useAttrs } from 'vue'

const name = 'UpCrossDomainInject'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const {
  iframeRef
} = useRunning({ attrs, slots, emits, props, name })
</script>

<template>
  <slot></slot>
  <iframe :src="src" :ref="iframeRef" style="display: none" />
</template>

<style scoped>

</style>