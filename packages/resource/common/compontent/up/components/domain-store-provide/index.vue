<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'

const name = 'UpDomainStoreProvide'

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

</template>

<style scoped>

</style>