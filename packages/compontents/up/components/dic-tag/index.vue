<script setup>
import { useConst, useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'

import { useDicStore } from '@vs-common/utils/store/unit/dic.js'
import { VALID_TYPE } from '@vs-common/utils/const/enum.js'

const name = 'UpDicTag'

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
  <ElTag :type="dicStore.dicCache?.[props.type]?.[model]?.color">
    {{ dicStore.dicCache?.[props.type]?.[model]?.name }}
  </ElTag>
</template>

<style scoped lang="scss">
</style>