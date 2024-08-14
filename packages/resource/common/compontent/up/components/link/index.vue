<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'

const name = 'UpLink'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {
  isExternalLink
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})
</script>

<template>
  <section class="up-link">
    <a v-if="isExternalLink" v-bind="attrs" :href="to" target="_blank">
      <slot />
    </a>
    <router-link
      v-else
      v-bind="$props"
      custom
      v-slot="{ isActive, href, navigate }">
      <a
        v-bind="attrs"
        :href="href"
        @click="navigate"
        :class="isActive ? activeClass : inactiveClass">
        <slot />
      </a>
    </router-link>
  </section>
</template>

<style lang="scss" scoped />