<script setup>
import { useOptions, useRunning } from './index.js'
import { useAttrs } from 'vue'
import { DIC } from '@vs-customize/const'
import { CustomizeUpDicDrop } from '../index.js'

const name = 'CustomizeUpBranch'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {
  condition,
  dataset,
  elTreeRef,

  onRefresh,
  onQuery,
  onLazy,
  onValid,

  onCheck,
  onClick,

  onAppend,
  onEdit,
  onRemove,
  onReduce,
  onFilter,

  onClear,
  onCheckAll,
  onSubmit,

  onAllowDrag,
  onAllowDrop,
  onNodeDrop,

  expose
} = useRunning({ attrs, slots, emits, props, name })

const { FLAG } = useOptions.confine

defineExpose({
  onRefresh,
  onQuery,
  ...expose
})
</script>


<template>
  <ElCard class="up-branch" v-loading="loading">
    <template #header>
      <div>
        <ElButtonGroup>
          <ElTooltip content="清空">
            <ElButton size="large" @click.stop="onClear">
              <ElIcon color="teal" size="20">
                <component is="DocumentDelete" />
              </ElIcon>
            </ElButton>
          </ElTooltip>
          <ElTooltip content="全选">
            <ElButton size="large" @click.stop="onCheckAll">
              <ElIcon color="teal" size="20">
                <component is="DocumentChecked" />
              </ElIcon>
            </ElButton>
          </ElTooltip>
        </ElButtonGroup>
        <ElInput
          v-model="dataset.screenText"
          type="text"
          size="large"
          autocomplete="off"
          placeholder="输入进行筛选"
          clearable>
          <template #prepend>
            <ElButton v-if="!editable"
                      link
                      type="primary"
                      @click.stop="onSubmit"
                      :disabled="dataset.checkedKeys.length === 0">
              <ElIcon color="teal" size="20">
                <component is="Promotion" />
              </ElIcon>
            </ElButton>
            <CustomizeUpDicDrop v-model="condition.app" :type="DIC.APP" @change="onRefresh" />
          </template>
          <template #append>
            <ElButton link type="primary" @click.stop="onRefresh">
              <ElIcon color="teal" size="20">
                <component is="Refresh" />
              </ElIcon>
            </ElButton>
          </template>
        </ElInput>
      </div>
    </template>
    <ElTree
      ref="elTreeRef"
      accordion
      highlightCurrent
      :expandOnClickNode="false"
      :data="dataset.dataSource"
      :props="defaultProps"
      :nodeKey="nodeKey"
      :defaultExpandedKeys="dataset.expandedKeys"
      :showCheckbox="checkbox"
      :lazy="lazy"
      :load="onLazy"
      :filterNodeMethod="onFilter"
      :draggable="draggable"
      :allowDrag="onAllowDrag"
      :allowDrop="onAllowDrop"
      @nodeDrop="onNodeDrop"
      @check="onCheck"
      @nodeClick="onClick">
      <template #default="{ node, data }">
        <span class="node-row" :class="[ `nesting-${node.level === 6 ? 6:node.level % 6}n` ]">
          <span>
            <ElTag :key="node.key" :type="node.key === FLAG.NEW ? 'success' : 'info'">
              {{ node.label }}
            </ElTag>
          </span>
          <span v-if="editable">
            <template v-if="node.key === FLAG.NEW">
              <ElButton link type="danger" @click.stop="() => onReduce(node)">
                  <ElIcon color="teal" size="20">
                    <component is="Remove" />
                  </ElIcon>
                </ElButton>
            </template>
            <template v-else>
              <ElSwitch
                v-model="data[validKey]"
                :disabled="node.parent.data[validKey] === defaultProps.validTruly"
                :active-value="defaultProps.validTruly"
                :inactive-value="defaultProps.validFalsely"
                @change="(v) => onValid(v, node, data)"
                @click.native.stop />
              <ElButton link @click.stop="() => onRemove(node)">
                <ElIcon color="teal" size="20">
                  <component is="Delete" />
                </ElIcon>
              </ElButton>
              <ElButton link @click.stop="() => onEdit(node, data)">
                <ElIcon color="teal" size="20">
                  <component is="Edit" />
                </ElIcon>
              </ElButton>
              <ElButton link @click.stop="() => onAppend(node)">
                <ElIcon color="teal" size="20">
                  <component is="CirclePlus" />
                </ElIcon>
              </ElButton>
            </template>
          </span>
        </span>
      </template>
      <template #empty>
        <ElButton link @click.stop="() => onAppend(null)">
          <ElIcon color="teal" size="24">
            <component is="CirclePlus" />
          </ElIcon>
        </ElButton>
      </template>
    </ElTree>
  </ElCard>
</template>

<style lang="scss" scoped>

.up-branch {
  height: inherit;
  //width: 64.5%;
  width: 60%;

  .el-card__header {
    > div {
      position: relative;
      display: flex;
      align-items: center;
      height: 40px;

      .el-button-group {
        display: inline-flex;
        margin-right: 10px;

        .el-button--large {
          /* background-color: var(--el-fill-color-light); */
          padding: 12px;
        }
      }
    }
  }

  ::v-deep(.el-card__body) {
    height: calc(100% - 77px);
    overflow: auto;

    .el-tree {
      .el-tree-node {
        .el-tree__empty-block {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          background-color: rgba($color: #000000, $alpha: .2);

          .el-tree__empty-text {
            color: white;
          }
        }

        .el-tree-node__content {
          height: 42px;

          .el-tree-node__expand-icon {
            font-size: 24px;
          }

          .el-checkbox__inner {
            width: 18px;
            height: 18px;

            &::after {
              top: 2px;
              left: 6px;
            }
          }

          .node-row {
            position: relative;
            width: calc(100% - 38px);
            display: flex;
            align-items: center;
            justify-content: space-between;

            span {
              &:nth-of-type(1) {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }

              &:nth-of-type(2) {
                padding: 0 10px;

                .el-switch {
                  margin-right: 20px;
                  --el-switch-on-color: teal;
                }
              }
            }

            &::after {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              width: 3px;
            }
          }

          .nesting-1n::after {
            background-color: rgba(255, 0, 0, 0.8); /* Red */
          }

          .nesting-2n::after {
            background-color: rgba(0, 255, 0, 0.8); /* Green */
          }

          .nesting-3n::after {
            background-color: rgba(0, 0, 255, 0.8); /* Blue */
          }

          .nesting-4n::after {
            background-color: rgba(255, 255, 0, 0.8); /* Yellow */
          }

          .nesting-5n::after {
            background-color: rgba(255, 0, 255, 0.8); /* Pink */
          }

          .nesting--6n::after {
            background-color: rgba(0, 255, 255, 0.8); /* Cyan */
          }
        }
      }
    }
  }
}
</style>