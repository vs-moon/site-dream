<script setup>
import { useEmits, useProps, useRunning } from '.'
import { inject, useAttrs } from 'vue'

import { useAliveStore, useMenuStore } from '@vs-common/utils'
import { useConst as useConstAside } from '../aside/index.js'
import { UpMenuItem } from '../index.js'

const name = 'UpMenu'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const {} = useRunning({ attrs, slots, emits, props, name })

const status = inject(useConstAside.key, {
  collapse: false
})

const menuStore = useMenuStore()
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
    <UpMenuItem
      v-for="item in menuStore.nesting"
      :key="item.id"
      :menu-item="item" />
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