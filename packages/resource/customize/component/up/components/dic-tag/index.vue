<script setup>
import { useOptions, useRunning } from './index.js'
import { computed, useAttrs } from 'vue'
import { useDicStore } from '@vs-customize/plugin'

const name = 'CustomizeUpDicTag'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })
const modelValue = defineModel()

const {} = useRunning({ attrs, slots, emits, props, name })

const dicStore = useDicStore()
const dicComputed = computed(() => dicStore.dicCache(props.type)[modelValue.value])
</script>

<template>
  <ElTag :color="dicComputed?.color" style="color: white" size="default">
    {{ dicComputed?.name }}
  </ElTag>
</template>

<style scoped lang="scss">
</style>