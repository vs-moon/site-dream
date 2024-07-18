<script setup>
import { useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'

const name = 'UpIcon'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })
const modelValue = defineModel()

const {} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})
</script>

<template>
  <ElSelect v-model="modelValue" filterable>
    <template #prefix>
      <ElIcon size="18" :color="color">
        <component v-if="modelValue" :is="modelValue" />
      </ElIcon>
    </template>
    <ElOption
      v-for="iconName in iconNames"
      :key="iconName"
      :label="iconName"
      :value="iconName">
      <span style="float: left;">{{ iconName }}</span>
      <span style="float: right;">
        <ElIcon size="18">
          <component :is="iconName"></component>
        </ElIcon>
      </span>
    </ElOption>
  </ElSelect>
</template>

<style lang="scss">
.el-select {
  min-width: 200px;
}
</style>