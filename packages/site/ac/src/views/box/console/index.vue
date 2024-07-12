<script setup>
import { useEmits, useProps, useRunning } from '.'
import { ref, useAttrs } from 'vue'
import { UpDicDrop, UpDicTag } from '@vs-component/up'
import { DIC } from '@vs-component/up/const/enum.js'

const name = 'UpConsole'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const {} = useRunning({ attrs, slots, emits, props, name })

const value = ref('0')

defineExpose({})
</script>

<template>
  <section>
    <UpDicDrop v-model="value" :type="DIC.VALID" />
    <UpDicTag v-model="value" :type="DIC.VALID" />
  </section>
</template>

<style lang="scss" scoped>
</style>