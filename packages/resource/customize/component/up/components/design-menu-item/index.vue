<script setup>
import { useOptions, useRunning } from './index.js'
import { computed, useAttrs } from 'vue'
import { ArrayUtils } from '@vs-common/utils'
import { NAV_TYPE, VALID, PROPERTY_ROUTE } from '@vs-customize/const'
import { CustomizeUpDesignMenuItem } from '../index.js'

const name = 'CustomizeUpDesignMenuItem'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const { } = useRunning({ attrs, slots, emits, props, name })

const showMenuItem = computed(() => props.routeItem[PROPERTY_ROUTE.type] === NAV_TYPE.V && props.routeItem[PROPERTY_ROUTE.hide] !== VALID.T)
const showSubMenu = computed(() => props.routeItem[PROPERTY_ROUTE.type] === NAV_TYPE.P && !ArrayUtils.isEmpty(props.routeItem[PROPERTY_ROUTE.children]))

defineExpose({})
</script>

<template>
  <ElMenuItem
    v-if="showMenuItem"
    :route="routeItem[PROPERTY_ROUTE.routeJump]"
    :index="routeItem[PROPERTY_ROUTE.id]">
    <ElIcon>
      <component :is="routeItem[PROPERTY_ROUTE.icon]" />
    </ElIcon>
    <span>
      {{ routeItem[PROPERTY_ROUTE.title] }}
    </span>
  </ElMenuItem>

  <ElSubMenu
    v-else-if="showSubMenu"
    :index="routeItem[PROPERTY_ROUTE.id]">
    <template #title>
      <ElIcon>
        <component :is="routeItem[PROPERTY_ROUTE.icon]" />
      </ElIcon>
      <span>
        {{ routeItem[PROPERTY_ROUTE.title] }}
      </span>
    </template>

    <CustomizeUpDesignMenuItem
      v-for="_subItem in routeItem[PROPERTY_ROUTE.children]"
      :key="_subItem[PROPERTY_ROUTE.id]"
      :routeItem="_subItem" />
  </ElSubMenu>
</template>

<style lang="scss" scoped />