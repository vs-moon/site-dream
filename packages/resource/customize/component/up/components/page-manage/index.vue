<script setup>
import { useOptions, useRunning } from './index.js'
import { computed, useAttrs } from 'vue'
import { useDicStore } from '@vs-customize/plugin'
import { DIC, OPERATE_WAY, VALID_REVERSE, VALID_TYPE } from '@vs-customize/const'

const name = 'CustomizeUpPageManage'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })
const condition = defineModel('condition', {
  type: Object
})

const {
  status,
  container,
  pagination,
  mergeTreeProps,
  onInsert,
  onAppend,
  onDetails,
  onModify,
  onRemove,
  onValid,
  onQuery,
  onLoad,
  hasOperate,
  elFormRef
} = useRunning({ attrs, slots, emits, props, name })

const dicStore = useDicStore()

const dicComputed = computed(() => dicStore.dicCache(DIC.VALID))

defineExpose({})
</script>

<template>
  <section class="customize-up-page-manage">
    <div class="">
      <!--  表格数据  -->
      <ElTable
        v-loading="status.loading.container"
        :data="container"
        :row-key="rowKey"
        :lazy="lazy"
        :load="onLoad"
        :tree-props="mergeTreeProps"
        border>
        <template #default>
          <slot />
          <ElTableColumn
            align="right"
            fixed="right"
            min-width="350px"
            label="操作">
            <template #header>
              <slot name="header" />
              <ElButton
                type="primary"
                size="small"
                @click="onQuery(true)">
                查询
              </ElButton>
              <ElButton
                type="primary"
                size="small"
                @click="status.drawer = true">
                条件
              </ElButton>
              <ElButton
                type="success"
                size="small"
                @click="onInsert">
                新增
              </ElButton>
            </template>
            <template #default="{ row, column, $index }">
              <slot name="header-default" :row="row" :column="column" :$index="$index" />
              <ElButton
                :disabled="validConfine && addConfine({ row, column, $index })"
                v-show="hasOperate(OPERATE_WAY.Add) && lazy"
                @click="onAppend(row)"
                type="success"
                size="small"
                plain>
                追加
              </ElButton>
              <ElButton
                :disabled="validConfine && viewConfine({ row, column, $index })"
                v-show="hasOperate(OPERATE_WAY.VIEW)"
                @click="onDetails(row)"
                type="info"
                size="small"
                plain>
                详情
              </ElButton>
              <ElButton
                :disabled="modifyConfine && modifyConfine({ row, column, $index })"
                v-show="hasOperate(OPERATE_WAY.EDIT)"
                @click="onModify(row)"
                type="primary"
                size="small"
                plain>
                修改
              </ElButton>
              <ElButton
                :disabled="deleteConfine && deleteConfine({ row, column, $index })"
                v-show="hasOperate(OPERATE_WAY.DELETE)"
                @click="onRemove(row, $index)"
                :loading="status.loading.remove && status.index.remove === $index"
                type="danger"
                size="small"
                plain>
                删除
              </ElButton>
              <ElButton
                :disabled="validConfine && validConfine({ row, column, $index })"
                v-show="hasOperate(OPERATE_WAY.VALID)"
                @click="onValid(row, $index)"
                :loading="status.loading.valid && status.index.valid === $index"
                :type="VALID_TYPE[VALID_REVERSE[row['valid']]]"
                size="small"
                plain>
                {{ dicComputed?.[row['valid']]?.name }}
              </ElButton>
            </template>
          </ElTableColumn>
        </template>
      </ElTable>
      <!--  分页组件  -->
      <ElPagination
        v-model:currentPage="pagination.pageNum"
        @update:currentPage="() => onQuery()"
        v-model:pageSize="pagination.pageSize"
        @update:pageSize="() => onQuery()"
        :total="pagination.total"
        layout="slot, prev, pager, next, sizes, ->, jumper"
        background>
        <ElRow :gutter="10">
          <ElCol :span="24">
            <ElInput :model-value="pagination.total" readonly size="default">
              <template #prepend>
                <ElButton icon="Coin" />
              </template>
            </ElInput>
          </ElCol>
        </ElRow>
      </ElPagination>
    </div>
    <div>
      <ElForm ref="elFormRef" :model="condition" @submit.prevent label-width="auto">
        <slot name="condition" />
      </ElForm>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.customize-up-page-manage {
  width: 100%;
  height: 100%;

  .el-table {
    width: 100%;
    height: 90%;
  }

  .el-pagination {
    height: 10%;
    border: 1px solid #363637;
    padding: 0 0 0 10px;

    .el-row {
      width: 150px;
    }
  }
}
</style>