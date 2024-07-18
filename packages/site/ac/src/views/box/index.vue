<script setup>
import { useEmits, useProps, useRunning } from '.'
import { useAttrs, KeepAlive, computed } from 'vue'

import { useAliveStore } from '@vs-common/utils'
import { UpHeader, UpAside, UpMenu } from '@vs-component/up'

const name = 'Box'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const {} = useRunning({ attrs, slots, emits, props, name })

const aliveStore = useAliveStore()
// const aliveNames = computed(() => aliveStore.aliveNames.join(','))
// const aliveEx = computed(() => aliveNames.value ? '' : 'console')

defineExpose({})
</script>

<template>
  <section class="box">
    <ElContainer>
      <UpAside app-name="账号中心">
        <UpMenu />
      </UpAside>
      <ElContainer>
        <UpHeader />
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