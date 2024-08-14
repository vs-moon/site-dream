<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs, watch } from 'vue'
import { UPDATE_MODEL_VALUE } from '@vs-common/const'

const name = 'UpAceEditorHtml'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })
const modelValue = defineModel({ default: '' })

const { localValue, onFormat } = useRunning({ attrs, slots, emits, props, name })

watch(modelValue, v => {
  localValue.value = v
}, {
  immediate: true
})

watch(localValue, v => {
  if (modelValue.value !== v) {
    emits(UPDATE_MODEL_VALUE, v)
  }
})

</script>

<template>
  <ElSpace v-show="!readonly">
    <ElButton type="info" text bg icon="Setting" @click="onFormat">
      格式化
    </ElButton>
  </ElSpace>
</template>

<style lang="scss" scoped />