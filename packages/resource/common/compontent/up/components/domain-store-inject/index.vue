<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'

const name = 'UpDomainStoreInject'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const { iframeRef } = useRunning({ attrs, slots, emits, props, name })
</script>

<template>
  <iframe :src="src" :ref="iframeRef" style="display: none" />
</template>

<style scoped>

</style>