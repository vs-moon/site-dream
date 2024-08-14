<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { useAuthorizeStore } from '@vs-customize/plugin'
import { CustomizeUpDesignSetting } from '../index.js'

const name = 'CustomizeUpDesignTools'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {
  state
} = useRunning({ attrs, slots, emits, props, name })

const { exit } = useAuthorizeStore()

defineExpose({})
</script>

<template>
  <ElRow class="customize-up-design-tools">
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
      <ElIcon :size="24" @click="exit">
        <component is="SwitchButton" />
      </ElIcon>
    </ElCol>
    <ElCol :span="6">
      <ElIcon :size="24" @click="state.setting = true">
        <component is="Setting" />
      </ElIcon>
    </ElCol>
  </ElRow>
  <CustomizeUpDesignSetting v-model="state.setting" />
</template>

<style lang="scss">
.customize-up-design-tools {
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