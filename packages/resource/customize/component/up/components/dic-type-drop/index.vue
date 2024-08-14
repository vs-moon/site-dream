<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'

const name = 'CustomizeUpDicTypeDrop'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })
const modelValue = defineModel()

const { dicStore, status, options, onChange, onRemote } = useRunning({ attrs, slots, emits, props, name })

</script>

<template>
  <ElSelect
    @change="onChange"
    v-model="modelValue"
    :loading="status.loading"
    :remote-method="onRemote"
    filterable
    remote>
    <ElOption
      v-for="(item, key) in options"
      :key="key"
      :value="key"
      :label="item.name"
      :disabled="item.disabled">
      <div class="flex-items-center">
        <span>
          {{ item.name }}
        </span>
        <span>
          {{ item.code }}
        </span>
      </div>
    </ElOption>
    <template #label>
      {{ modelValue }}
    </template>
  </ElSelect>
</template>

<style scoped lang="scss">
.el-select {
  min-width: 240px;
}

.flex-items-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: inherit;

  span + span {
    margin-left: 10px;
  }
}
</style>