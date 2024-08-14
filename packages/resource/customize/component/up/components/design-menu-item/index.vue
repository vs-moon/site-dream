<script setup>
import { useEmits, useProps, useRunning } from '.'
import { computed, useAttrs } from 'vue'
import { MENU_MODE, VALID } from '@vs-common/utils'
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

const showMenuItem = computed(() => props.menuItem[aliveProperty.menuMode] === MENU_MODE.M && props.menuItem[aliveProperty.hide] !== VALID.T)
const showSubMenu = computed(() => props.menuItem[aliveProperty.menuMode] === MENU_MODE.P && !isEmpty(props.menuItem[aliveProperty.children]))

defineExpose({})
</script>

<template>
  <ElMenuItem
      v-if="showMenuItem"
      :route="menuItem[aliveProperty.routeJump]"
      :index="menuItem[aliveProperty.id]">
    <ElIcon>
      <component :is="menuItem[aliveProperty.menuIcon]" />
    </ElIcon>
    <span>
      {{ menuItem[aliveProperty.menuName] }}
    </span>
  </ElMenuItem>

  <ElSubMenu
      v-else-if="showSubMenu"
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