<script setup>
import { useEmits, useProps, useRunning } from '.'
import { computed, useAttrs, watch } from 'vue'
import { VALID, useAliveStore, useProperty } from '@vs-common/utils'

const name = 'UpAlive'

defineOptions({
  name,
  inheritAttrs: false
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useEmits ])
const props = defineProps({ ...useProps })

const {
  overflow,
  scrollRef,
  onAim,
  onClick,
  onMouseDown,
  onMouseUp
} = useRunning({ attrs, slots, emits, props, name })

const aliveStore = useAliveStore()
const aliveProperty = useProperty().aliveStore

const computedClass = computed(() => {
  return (item) => {
    const list = []
    const aliveKey = item.id

    list.push(aliveStore.aliveStamps[aliveKey] ?
      'is-alive' : item.routeAlive === VALID.T ?
        'is-allow' : 'is-none')
    if (aliveStore.active === aliveKey) {
      list.push('is-action')
    }

    return list
  }
})

defineExpose({})
</script>

<template>
  <section class="up-alive">
    <div ref="scrollRef" @click="onClick">
      <span
        v-for="nav in aliveStore.navs"
        :data-id="nav[aliveProperty.id]"
        :key="nav[aliveProperty.id]"
        :class="computedClass(nav)">
        {{ nav[aliveProperty.menuName] }}
        <ElIcon :data-id="nav[aliveProperty.id]" size="16">
          <component is="Close" />
        </ElIcon>
      </span>
    </div>
    <div v-show="overflow">
      <ElIcon size="24">
        <component
          is="CaretLeft"
          @mousedown="onMouseDown({ left: -10, behavior: 'auto' })"
          @mouseup="onMouseUp({ left: -120 })" />
      </ElIcon>
      <ElIcon size="24">
        <component is="Aim" @click.stop="onAim" />
      </ElIcon>
      <ElIcon size="24">
        <component
          is="CaretRight"
          @mousedown="onMouseDown({ left: 10, behavior: 'auto' })"
          @mouseup="onMouseUp({ left: 120 })" />
      </ElIcon>
    </div>
  </section>
</template>

<style lang="scss">
.up-alive {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 10px;
  border-radius: 5px;
  background: #1D1E1F;

  div {
    display: flex;
    align-items: center;
    height: 60px;

    > i:hover {
      transform: scale(1.2);
      transform-origin: center;
      color: #0099FF;
    }
  }

  div:nth-of-type(2) {
    justify-content: center;
    margin-left: 20px;
    width: 70px;
  }

  div:nth-of-type(1) {
    //flex: auto;
    overflow-x: hidden;
    overflow-y: hidden;

    span {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 10px 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
      height: 40px;
      white-space: nowrap;
      background: rgba($color: #000000, $alpha: .2);

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 5px 0 0 0;
        clip-path: polygon(0% 0%, 100% 0, 0 100%);
      }

      &:hover {
        color: #0099FF;
      }

      i {
        margin-left: 5px;

        &:hover {
          background: rgba($color: #AAAAAA, $alpha: .2);
          border-radius: 50%;
        }

        svg {
          pointer-events: none;
          path {
            pointer-events: none;
          }
        }
      }
    }

    .is-action {
      color: #0099FF;
    }

    .is-alive {
      &::before {
        background-color: rgba(13, 197, 0, .7);
      }
    }

    .is-allow {
      &::before {
        background-color: rgba(0, 153, 255, .7);
      }
    }

    .is-none {
      &::before {
        background-color: rgba(255, 255, 255, 0.7);
      }
    }

    span + span, span + i {
      margin-left: 10px;
    }
  }
}
</style>