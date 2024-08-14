<script setup>
import { useOptions, useRunning } from './index.js'
import { inject, useAttrs } from 'vue'
import { useAliveStore, useRouteStore } from '@vs-customize/plugin'
import { CustomizeUpDesignMenuItem } from '../index.js'
import { useOptions as useOptionsAside } from '../design-aside/index.js'

const name = 'CustomizeUpDesignMenu'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {} = useRunning({ attrs, slots, emits, props, name })

const status = inject(useOptionsAside.key, {
  collapse: false
})

const routeStore = useRouteStore()
const aliveStore = useAliveStore()

defineExpose({})
</script>

<template>
  <ElMenu
    router
    :mode="mode"
    menu-trigger="click"
    :close-on-click-outside="mode === 'horizontal'"
    :collapse="collapse ?? status.collapse"
    :default-active="aliveStore.active">
    <CustomizeUpDesignMenuItem
      v-for="item in routeStore.nesting"
      :key="item.id"
      :route-item="item" />
  </ElMenu>
</template>

<style lang="scss">
.el-menu {
  border: 0;

  &:not(.el-menu--collapse).el-menu--vertical {
    width: 280px;
  }

  &.el-menu--horizontal {
    border-bottom: unset;
  }
}
</style>