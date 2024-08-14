<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { useIconNames } from '../../plugins/icon/index.js'

const name = 'UpIconDrop'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })
const modelValue = defineModel()

const {} = useRunning({ attrs, slots, emits, props, name })

const iconNames = useIconNames()

defineExpose({})
</script>

<template>
  <ElSelect
    v-model="modelValue"
    filterable
    clearable
    placeholder=""
    value-on-clear="">
    <ElOption
      v-for="iconName in iconNames"
      :key="iconName"
      :label="iconName"
      :value="iconName">
      <ElIcon size="18" style="margin-right: 10px">
        <component :is="iconName"></component>
      </ElIcon>
      {{ iconName }}
    </ElOption>
  </ElSelect>
</template>

<style lang="scss" scoped>
.el-select {
  min-width: 200px;
}

.el-select-dropdown__item {
  display: flex;
  align-items: center;
}
</style>