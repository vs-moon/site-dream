<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { CustomizeUpDesignSettingCache } from '../index.js'

const name = 'CustomizeUpDesignSetting'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })
const modelValue = defineModel()

const {
  onClose
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})
</script>

<template>
  <ElDrawer
    class="customize-up-design-setting"
    v-model="modelValue"
    @close="onClose"
    size="50%"
    :with-header="false">
    <ElTabs tab-position="left" style="height: 100%" stretch>
      <ElTabPane label="缓存">
        <CustomizeUpDesignSettingCache />
      </ElTabPane>
    </ElTabs>
  </ElDrawer>
</template>

<style lang="scss">
.el-tabs__content {
  //height: calc(100% - 55px);
  height: 100%;
  padding: 10px;
  //border: 1px solid #414243;
  border-radius: 5px;

  .el-tab-pane {
    height: 100%;
  }
}
</style>