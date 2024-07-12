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

  const {  } = useRunning({ attrs, slots, emits, props, name })

  defineExpose({})
</script>

<template>
  <ElSelect v-model="modelValue">
    <template #prefix>
      <!--  color="teal" -->
      <ElIcon size="18">
        <component :is="modelValue" />
      </ElIcon>
    </template>
    <ElOptionGroup
      v-for="(propValue, key) in options"
      :key="key"
      :label="key">
      <ElOption
        v-for="item in propValue"
        :key="item.key"
        :label="item.value"
        :value="item.key">
        <span style="float: left;">{{ item.key }}</span>
        <span style="float: right; color: var(--el-text-color-secondary);">
          <!-- {{ item.key }}&nbsp;&nbsp; -->
          <ElIcon size="18">
            <component :is="item.key"></component>
          </ElIcon>
        </span>
      </ElOption>
    </ElOptionGroup>
  </ElSelect>
</template>

<style lang="scss">
</style>