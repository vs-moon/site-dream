<script setup>
import { useEmits, useProps, useRunning } from '.'
import { ref, useAttrs } from 'vue'

import { useMenuStore } from '@vs-common/utils/store/unit/menu.js'
import { useAliveStore } from '@vs-common/utils/store/unit/alive.js'
import { UpMenuItem } from '../index.js'

const name = 'UpMenu'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const {} = useRunning({ attrs, slots, emits, props, name })

const isCollapse = ref(false)

const menuStore = useMenuStore()
const aliveStore = useAliveStore()

defineExpose({})
</script>

<template>
  <section class="up-menu">
    <ElRow class="up-menu__header">
      <ElCol v-show="!isCollapse" class="up-menu__header-sign" :span="6">
        <img :src="favicon" alt="favicon" />
      </ElCol>
      <ElCol v-show="!isCollapse" class="up-menu__header-name" :span="14">
        <h1>账号中心</h1>
      </ElCol>
      <ElCol class="up-menu__header-on-off" :span="isCollapse ? 24 : 4">
        <ElIcon size="24" @click="isCollapse = !isCollapse">
          <component is="Expand" v-if="isCollapse" />
          <component is="Fold" v-else />
        </ElIcon>
      </ElCol>
    </ElRow>
    <ElScrollbar>
      <ElMenu
          router
          :collapse="isCollapse"
          :default-active="aliveStore.active">
        <UpMenuItem
            v-for="item in menuStore.nesting"
            :key="item.id"
            :menu-item="item" />
      </ElMenu>
    </ElScrollbar>
    <p class="up-menu__footer">

    </p>
  </section>
</template>

<style lang="scss">
.up-menu {
  height: 100%;

  .up-menu__header {
    height: 60px;
    background: #1d1e1f;
    border-radius: 5px;

    .el-col {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .up-menu__header-sign {
      img {
        width: 33px;
        height: 33px;
      }
    }

    .up-menu__header-name {
      justify-content: left;
    }

    .up-menu__header-on-off {
      font-size: large;
    }
  }

  .el-scrollbar {
    margin-top: 10px;
    margin-bottom: 10px;
    height: calc(100% - 140px);
    border-radius: 5px;
    background: #1d1e1f;

    .el-menu {
      /*border: solid 1px var(--el-menu-border-color);*/
      border: 0;

      &:not(.el-menu--collapse) {
        width: 280px;
      }
    }
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