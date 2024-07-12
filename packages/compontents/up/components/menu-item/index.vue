<script setup>
import { useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'
import { useAliveStore } from '@vs-common/utils/store/unit/alive.js'
import { MENU_MODE } from '@vs-common/utils/const/enum.js'
import { isEmpty } from '@vs-common/utils/array/index.js'
import { UpMenuItem } from '../index.js'

const name = 'UpMenuItem'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const { aliveProperty } = useRunning({ attrs, slots, emits, props, name })

const aliveStore = useAliveStore()

const { update } = aliveStore

defineExpose({})
</script>

<template>
  <ElMenuItem
      v-if="menuItem[aliveProperty.menuMode] === MENU_MODE.M"
      :route="menuItem[aliveProperty.routeJump]"
      :index="menuItem[aliveProperty.id]"
      @click="update(menuItem)">
    <ElIcon>
      <component :is="menuItem[aliveProperty.menuIcon]" />
    </ElIcon>
    <span>
      {{ menuItem[aliveProperty.menuName] }}
    </span>
  </ElMenuItem>
  <ElSubMenu
      v-else-if="menuItem[aliveProperty.menuMode] === MENU_MODE.P && !isEmpty(menuItem[aliveProperty.children])"
      :index="menuItem[aliveProperty.id]">
    <template #title>
      <ElIcon>
        <component :is="menuItem[aliveProperty.menuIcon]" />
      </ElIcon>
      <span>
        {{ menuItem[aliveProperty.menuName] }}
      </span>
    </template>
    <UpMenuItem
        v-for="_subItem in menuItem[aliveProperty.children]"
        :key="_subItem[aliveProperty.id]"
        :menuItem="_subItem" />
  </ElSubMenu>
</template>

<style lang="scss">
</style>