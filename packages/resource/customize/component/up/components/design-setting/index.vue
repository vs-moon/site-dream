<script setup>
  import { useEmits, useProps, useRunning } from './index.js'
  import { useAttrs } from 'vue'

  const name = 'UpSetting'

  defineOptions({
    name,
    inheritAttrs: false
  })

  const attrs = useAttrs()
  const slots = defineSlots()
  const emits = defineEmits([ ...useEmits ])
  const props = defineProps({ ...useProps })
  const modelValue = defineModel()

  const {
    onClose
  } = useRunning({ attrs, slots, emits, props, name })

  defineExpose({})
</script>

<template>
  <ElDrawer
    class="up-tools-setting"
    v-model="modelValue"
    @close="onClose">
    Drawer
  </ElDrawer>
</template>

<style lang="scss">
  .up-tools-setting.rtl {
    top: 75px !important;
    width: 20% !important;
    height: calc(100% - 75px);
  }
</style>