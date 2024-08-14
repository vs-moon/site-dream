<script setup>
import { useOptions, useRunning } from './index.js'
import { computed, useAttrs } from 'vue'
import { StringUtils } from '@vs-common/utils'
import { getRouteJumpProperty, useAliveStore, useRouteStore } from '@vs-customize/plugin'
import { PROPERTY_ROUTE } from '@vs-customize/const'

const name = 'CustomizeUpRelevanceJump'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {} = useRunning({ attrs, slots, emits, props, name })

const aliveStore = useAliveStore()
const routeStore = useRouteStore()

const linkageConfig = computed(() => {
  if (!StringUtils.isBlank(aliveStore.current[PROPERTY_ROUTE.linkageConfig])) {
    return JSON.parse(aliveStore.current[PROPERTY_ROUTE.linkageConfig])?.[props.linkageProp]
  }
})
const linkageConfigTarget = computed(() => routeStore.source.find(route => route[PROPERTY_ROUTE.path] === linkageConfig.value))

</script>

<template>
  <ElLink v-if="!linkageConfig" type="primary" disabled>
    <slot />
  </ElLink>
  <RouterLink v-else :to="getRouteJumpProperty(linkageConfigTarget, routeParam)">
    <slot />
  </RouterLink>
</template>

<style scoped lang="scss">
</style>