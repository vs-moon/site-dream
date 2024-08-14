<script setup>
  import { useEmits, useProps, useRunning } from './index.js'
  import { useAttrs } from 'vue'

  import { useAuthorizationStore } from '@vs-common/utils'

  const name = 'UpTools'

  defineOptions({
    name,
    inheritAttrs: false
  })

  const attrs = useAttrs()
  const slots = defineSlots()
  const emits = defineEmits([ ...useEmits ])
  const props = defineProps({ ...useProps })

  const {
    state
  } = useRunning({ attrs, slots, emits, props, name })

  const { exit } = useAuthorizationStore()

  defineExpose({})
</script>

<template>
  <ElRow class="up-tools">
    <ElCol :span="6">
      <ElIcon :size="24">
        <component is="Message" />
      </ElIcon>
    </ElCol>
    <ElCol :span="6">
      <ElIcon :size="24">
        <component is="Avatar" />
      </ElIcon>
    </ElCol>
    <ElCol :span="6">
      <ElIcon :size="24">
        <component is="SwitchButton" @click="exit" />
      </ElIcon>
    </ElCol>
    <ElCol :span="6">
      <ElIcon :size="24">
        <component is="Setting" />
      </ElIcon>
    </ElCol>
  </ElRow>
</template>

<style lang="scss">
  .up-tools {
    height: 60px;
    border-radius: 5px;
    background: #1d1e1f;

    .el-col {
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: rgba($color: #000000, $alpha: .2);
      }
    }
  }
</style>