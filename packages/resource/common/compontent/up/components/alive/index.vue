<script setup>
import { useOptions, useRunning } from './index.js'
import { computed, useAttrs } from 'vue'

const name = 'UpAlive'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {
  overflow,
  scrollRef,
  onAim,
  onClick,
  onMouseDown,
  onMouseUp
} = useRunning({ attrs, slots, emits, props, name })

const computedClass = computed(() => {
  return (item) => {

    const list = []
    const aliveKey = item[props.primaryKey]

    list.push(props.stamps[aliveKey] ?
      'is-alive' : item[props.cacheKey] === props.validTruly ?
        'is-allow' : 'is-none')
    if (props.active === aliveKey) {
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
        v-for="nav in navs"
        :data-id="nav[primaryKey]"
        :key="nav[primaryKey]"
        :class="computedClass(nav)">
        {{ nav[titleKey] }}
        <ElIcon :data-id="nav[primaryKey]" size="16">
          <component is="Close" />
        </ElIcon>
      </span>
    </div>
    <div :style="{ width: overflow ? '72px' : '0px', overflowX: overflow ? 'unset' : 'hidden' }">
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
  justify-content: space-between;
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
    margin-left: 20px;
    justify-content: center;
    transition: all .1s linear;
  }

  div:nth-of-type(1) {
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