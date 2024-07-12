<script setup>
import { useConst, useEmits, useProps, useRunning } from '.'
import { useAttrs } from 'vue'
import { selectOne, insertOne } from '@/api/resource/source.js'
import { UpDetailsPage } from '@vs-component/up'

const name = 'resourceSourceDetails'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const {
  modelValue,
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})
</script>

<template>
  <section class="resource-source-details">
    <UpDetailsPage
        v-model="modelValue"
        :remote-insert="insertOne"
        :remote-query="selectOne"
        :view-mode="viewMode"
        :id="id">

    </UpDetailsPage>
  </section>
</template>

<style lang="scss" scoped>
</style>