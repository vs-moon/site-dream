<script setup>
import { useConst, useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'
import { useDicStore } from '@vs-common/utils/store/unit/dic.js'

const name = 'UpDicDrop'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })
const model = defineModel()

const dicStore = useDicStore()

dicStore.remoteDic(props.type)

const {} = useRunning({ attrs, slots, emits, props, name })
</script>

<template>
  <ElSelect
      v-model="model"
      @change="() => emits('change')">
    <ElOption
        v-for="(item, key) in dicStore.dicCache?.[props.type]"
        :key="key"
        :value="key"
        :label="item.name"
        :disabled="item.disabled" />
  </ElSelect>
</template>

<style scoped lang="scss">
.el-select {
  min-width: 100px;
}
</style>