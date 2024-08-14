<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs, KeepAlive } from 'vue'
import { useAliveStore } from '@vs-customize/plugin'
import { CustomizeUpDesignHeader, CustomizeUpDesignAside, CustomizeUpDesignMenu } from '@vs-customize/component-up'

const name = 'Box'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {} = useRunning({ attrs, slots, emits, props, name })

const aliveStore = useAliveStore()

defineExpose({})
</script>

<template>
  <section class="box">
    <ElContainer>
      <CustomizeUpDesignAside app-name="调度中心">
        <CustomizeUpDesignMenu />
      </CustomizeUpDesignAside>
      <ElContainer>
        <CustomizeUpDesignHeader />
        <ElMain>
          <RouterView v-slot="{ Component, route }">
            <KeepAlive :max="aliveStore.max" :include="aliveStore.aliveNames">
              <component :is="Component" :key="route.path" />
            </KeepAlive>
          </RouterView>
        </ElMain>
        <ElFooter>
          <ElRow :gutter="10">
            <ElCol :span="24">
              <p>
              </p>
            </ElCol>
          </ElRow>
        </ElFooter>
      </ElContainer>
    </ElContainer>
  </section>
</template>

<style lang="scss">
.box {

  > .el-container {
    height: inherit;

    > .el-aside {
      width: fit-content;
      padding: 10px;
    }

    > .el-container {
      .el-main {
        padding: 0 10px 0 0;

        > [class^=vs-] {
          background: rgba(29, 30, 31, 1);
          height: 100%;
          border-radius: 5px;
        }

        .v-enter-active,
        .v-leave-active {
          transition: opacity 0.5s ease;
        }

        .v-enter-from,
        .v-leave-to {
          opacity: 0;
        }
      }

      .el-footer {
        height: 80px;
        padding: 10px 10px 10px 0;

        .el-row {
          height: 60px;

          .el-col {

            > p {
              border-radius: 5px;
              height: 100%;
              background: #1d1e1f;
            }
          }
        }
      }
    }
  }
}
</style>