<script setup>
  import { useConst, useEmits, useProps, useRunning } from '.'
  import { useAttrs } from 'vue'

  const name = 'UpCol'

  defineOptions({
    name,
    inheritAttrs: false
  })

  const attrs = useAttrs()
  const slots = defineSlots()
  const emits = defineEmits([ ...useEmits ])
  const props = defineProps({ ...useProps })

  const {
    spanClose,
    spanArea,
    spanBox,
    spanIcon,
    onChange
  } = useRunning({ attrs, slots, emits, props, name })

</script>

<template>
  <ElCol class="up-col" :span="spanArea">
    <ElRow>
      <ElCol :span="spanBox">
        <slot></slot>
      </ElCol>
      <ElCol class="up-col_icon" :span="spanIcon">
        <ElIcon v-show="spanArea > spanClose" @click="onChange(false)" :size="24" color="#0099FF">
          <slot name="icon">
            <component v-if="props.icon" :is="props.icon" />
            <component v-else is="CaretLeft" />
          </slot>
        </ElIcon>
        <ElIcon v-show="spanArea <= spanClose" @click="onChange(true)" :size="24">
          <slot name="icon">
            <component v-if="props.icon" :is="props.icon" />
            <component v-else is="CaretRight" />
          </slot>
        </ElIcon>
      </ElCol>
    </ElRow>
  </ElCol>
</template>

<style scoped lang="scss">
  .up-col {
    transition: all .3s linear;

    > .el-row {
      border-radius: 5px;
      overflow-x: auto;
      overflow-y: hidden;
      background: #1D1E1F;

      > .up-col_icon {
        display: flex;
        justify-content: center;
        align-items: center;

        > i:hover {
          transform: scale(1.2);
          transform-origin: center;

          &:nth-of-type(1) {
            color: inherit;
          }

          &:nth-of-type(2) {
            color: #0099FF;
          }
        }
      }
    }
  }

  .el-col {
    height: 60px;
  }
</style>