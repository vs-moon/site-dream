<script setup>
import { useOptions, useRunning } from './index.js'
import { computed, useAttrs } from 'vue'
import { VIEW_MODE, VIEW_MODE_TIP_MAP } from '@vs-customize/const'

const name = 'CustomizeUpPageView'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })
const modelValue = defineModel({ type: Object })

const {
  status,
  onSave
} = useRunning({ attrs, slots, emits, props, name })

const isDisabled = computed(() => props.vm === VIEW_MODE.VIEW || props.disabled)

defineExpose({})
</script>

<template>
  <section class="customize-up-page-view" v-loading="status.loading">
    <ElCard>
      <template v-if="vm !== VIEW_MODE.VIEW" #header>
        <ElButton
          type="primary"
          :disabled="isDisabled"
          @click="onSave">
          {{ VIEW_MODE_TIP_MAP[vm] }}
        </ElButton>
      </template>
      <template #default>
        <ElForm
          :model="modelValue"
          :disabled="isDisabled"
          :inline="inline"
          :label-width="100">
          <slot></slot>
        </ElForm>
      </template>
    </ElCard>
  </section>
</template>

<style lang="scss" scoped>
.customize-up-page-view {
  width: 100%;
  height: 100%;

  .el-card {
    height: 100%;
    display: flex;
    flex-direction: column;

    ::v-deep(.el-card__body) {
      overflow: auto;
    }
  }
}
</style>