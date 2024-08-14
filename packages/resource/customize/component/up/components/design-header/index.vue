<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import CustomizeUpDesignNav from '../design-nav/index.vue'
import CustomizeUpDesignTools from '../design-tools/index.vue'

const name = 'CustomizeUpDesignHeader'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})
</script>

<template>
  <ElHeader>
    <slot>
      <ElRow :gutter="10">
        <ElCol :span="20">
          <CustomizeUpDesignNav />
        </ElCol>
        <ElCol :span="4">
          <CustomizeUpDesignTools />
        </ElCol>
      </ElRow>
    </slot>
  </ElHeader>
</template>

<style scoped lang="scss">
.el-header {
  height: 80px;
  padding: 10px 10px 10px 0;
}
</style>