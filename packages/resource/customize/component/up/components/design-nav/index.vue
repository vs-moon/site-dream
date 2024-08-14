<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { UpCol, UpRow } from '@vs-common/component-up'
import { CustomizeUpDesignAlive, CustomizeUpDesignMenu, CustomizeUpDesignMore } from '../index.js'

const name = 'CustomizeUpDesignNav'

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
  <UpRow class="customize-up-design-nav">
    <UpCol icon="Guide" open>
      <CustomizeUpDesignAlive />
    </UpCol>
    <UpCol icon="Menu">
      <CustomizeUpDesignMenu mode="horizontal" />
    </UpCol>
    <UpCol icon="Suitcase">
      <CustomizeUpDesignMore />
    </UpCol>
  </UpRow>
</template>

<style lang="scss" scoped />