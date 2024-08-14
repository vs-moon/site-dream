<script setup>
  import { useConst, useEmits, useProps, useRunning } from '.'
  import { computed, useAttrs } from 'vue'

  const name = 'UpMovable'

  defineOptions({
    name,
    inheritAttrs: false
  })

  const attrs = useAttrs()
  const slots = defineSlots()
  const emits = defineEmits([ ...useEmits ])
  const props = defineProps({ ...useProps })

  const { click, mousedown, mousemove, mouseup } = useRunning({ attrs, slots, emits, props, name })

  const sty = computed(() => {
    const map = {}
    map['left'] = props.offsetX + '%'
    map['top'] = props.offsetY + '%'
    map['position'] = props.position
    map['borderRadius'] = props.radius ? '50%' : '5px'
    map['width'] = props.size + 'px'
    map['height'] = props.size + 'px'

    return map
  })
</script>

<template>
  <el-icon
      class="up-movable"
      :style="sty"
      size="24"
      @click="click"
      @mousedown="mousedown"
      @mouseup="mouseup">
    <component is="Search" />
  </el-icon>
</template>

<style scoped lang="scss">
  .up-movable {
    background-color: #1D1E1F;
    cursor: move;
    z-index: 999;

    &:hover {
      color: #0099FF;
    }

    svg {
      pointer-events: none;
    }
  }
</style>