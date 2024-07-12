<script setup>
import { useEmits, useProps, useRunning } from '.'
import { computed, useAttrs } from 'vue'
import { VALID, useAliveStore } from '@vs-common/utils'

const name = 'UpAlive'

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

const { update, remove } = aliveStore

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
    <span v-for="item in aliveStore.navs"
          :class="computedClass(item)"
          @click="update(item, { isJump: true })">
      {{ item.menuName }}
      <ElIcon size="16">
        <component is="Close" @click.stop="remove(item, { isJump: true, isRemoveNav: true })"/>
      </ElIcon>
    </span>
  </section>
</template>

<style lang="scss">
.up-alive {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 10px;
  border-radius: 5px;
  overflow-x: auto;
  overflow-y: hidden;
  background: #1D1E1F;

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
</style>