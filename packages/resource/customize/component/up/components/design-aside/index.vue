<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'

const name = 'CustomizeUpAside'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {
  status
} = useRunning({ attrs, slots, emits, props, name })

defineExpose({})
</script>

<template>
  <ElAside class="up-aside">
    <ElRow class="up-aside__header">
      <slot name="header">
        <ElCol v-show="!status.collapse" class="up-aside__header-sign" :span="6">
          <img :src="favicon" alt="favicon" />
        </ElCol>
        <ElCol v-show="!status.collapse" class="up-aside__header-name" :span="14">
          <h1>{{ appName }}</h1>
        </ElCol>
        <ElCol class="up-aside__header-on-off" :span="status.collapse ? 24 : 4">
          <ElIcon size="24" @click="status.collapse = !status.collapse">
            <component is="Expand" v-if="status.collapse" />
            <component is="Fold" v-else />
          </ElIcon>
        </ElCol>
      </slot>
    </ElRow>
    <ElScrollbar>
      <slot />
    </ElScrollbar>
    <p class="up-aside__footer">
      <slot name="header">
      </slot>
    </p>
  </ElAside>
</template>

<style lang="scss">
.up-aside {
  height: 100%;

  .up-aside__header {
    height: 60px;
    background: #1d1e1f;
    border-radius: 5px;

    .el-col {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .up-aside__header-sign {
      img {
        width: 33px;
        height: 33px;
      }
    }

    .up-aside__header-name {
      justify-content: left;
    }

    .up-aside__header-on-off {
      font-size: large;
    }
  }

  .el-scrollbar {
    margin-top: 10px;
    margin-bottom: 10px;
    height: calc(100% - 140px);
    border-radius: 5px;
    background: #1d1e1f;
  }

  &__footer {
    height: 60px;
    border-radius: 5px;
    background: #1d1e1f;
    display: flex;
    align-items: center;
    position: relative;
  }
}
</style>