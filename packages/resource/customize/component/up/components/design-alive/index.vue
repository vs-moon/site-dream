<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { UpAlive } from '@vs-common/component-up'
import { useAliveStore } from '@vs-customize/plugin'

const name = 'CustomizeUpDesignAlive'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {
  onRemove,
  onUpdate
} = useRunning({ attrs, slots, emits, props, name })

const aliveStore = useAliveStore()

defineExpose({})
</script>

<template>
  <UpAlive
    :active="aliveStore.active"
    :navs="aliveStore.navs"
    :stamps="aliveStore.aliveStamps"
    @remove="onRemove"
    @update="onUpdate" />
</template>

<style lang="scss" scoped />