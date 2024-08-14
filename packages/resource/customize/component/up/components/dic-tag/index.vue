<script setup>
import { useConst, useEmits, useProps, useRunning } from '.'
import { computed, useAttrs } from 'vue'

import { useDicStore } from '@vs-common/utils'

const name = 'UpDicTag'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })
const modelValue = defineModel()

const {} = useRunning({ attrs, slots, emits, props, name })

const dicStore = useDicStore()
const colorComputed = computed(() => dicStore.dicCache?.[props.type]?.[modelValue.value])
dicStore.remoteDic(props.type)
</script>

<template>
  <ElTag :color="colorComputed?.color">
    {{ colorComputed?.name }}
  </ElTag>
</template>

<style scoped lang="scss">
</style>