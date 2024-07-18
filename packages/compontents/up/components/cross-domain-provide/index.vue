<script setup>
import { useConst, useProps, useEmits, useRunning } from '.'
import { useAttrs } from 'vue'

const name = 'UpCrossDomainProvide'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const {} = useRunning({ attrs, slots, emits, props, name })
</script>

<template>

</template>

<style scoped>

</style>