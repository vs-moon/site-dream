<script setup>
import { useConst, useEmits, useProps, useRunning } from '.'
import { computed, useAttrs } from 'vue'
import { useDicStore } from '@vs-common/utils'

const name = 'UpDicDrop'

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

const dicStore = useDicStore()
const dicComputed = computed(() => dicStore.dicCache?.[props.type])
dicStore.remoteDic(props.type)

</script>

<template>
  <ElSelect
      v-model="modelValue"
      @change="() => emits('change')">
    <ElOption
        v-for="(item, key) in dicComputed"
        :key="key"
        :value="key"
        :label="item.name"
        :disabled="item.disabled" />
  </ElSelect>
</template>

<style scoped lang="scss">
.el-select {
  min-width: 200px;
}
</style>