<script setup>
import { useOptions, useRunning } from './index.js'
import { computed, useAttrs } from 'vue'
import { useDicStore } from '@vs-customize/plugin'

const name = 'CustomizeUpDicDrop'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })
const modelValue = defineModel()

const { onChange } = useRunning({ attrs, slots, emits, props, name })

const dicStore = useDicStore()
const dicComputed = computed(() => dicStore.dicCache(props.type))

</script>

<template>
  <ElSelect
    v-model="modelValue"
    :="attrs"
    @change="onChange"
    placeholder=""
    value-on-clear=""
    clearable>
    <ElOption
      v-for="(item, key) in dicComputed"
      :key="key"
      :value="key"
      :label="item.name"
      :disabled="item.disabled">
      <div class="flex-items-center">
        <span>
          {{ item.name }}
        </span>
        <span :style="{ color: item.color }">
          {{ item.code }}
        </span>
      </div>
    </ElOption>
  </ElSelect>
</template>

<style scoped lang="scss">
.el-select {
  min-width: 200px;

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