<script setup>
  import { useConst, useEmits, useProps, useRunning } from '.'
  import { useAttrs } from 'vue'

  import { useDicStore } from '@vs-common/utils/store/unit/dic.js'
  import { OPERATE_WAY, VALID_REVERSE } from '@vs-common/utils/const/enum.js'
  import { DIC } from '../../const/enum.js'

  const name = 'UpManagePage'

  defineOptions({
    name,
    inheritAttrs: false
  })

  const attrs = useAttrs()
  const slots = defineSlots()
  const emits = defineEmits([ ...useEmits ])
  const props = defineProps({ ...useProps })

  const {
    status,
    outcome,
    pagination,
    onInsert,
    onDetails,
    onModify,
    onRemove,
    onValid,
    onQuery,
    hasOperate
  } = useRunning({ attrs, slots, emits, props, name })

  const dicStore = useDicStore()

  dicStore.remoteDic(DIC.VALID)

  defineExpose({})
</script>

<template>
  <section class="up-outcome">
    <!--  查询条件抽屉  -->
    <ElDrawer v-model="status.drawer" :show-close="false">
      <template #default>
        <slot name="condition" />
      </template>
      <template #footer>
        <ElButton type="success" @click="onInsert">新增</ElButton>
        <ElButton type="primary" @click="onQuery(true)">查询</ElButton>
      </template>
    </ElDrawer>
    <!--  表格数据  -->
    <ElTable :data="outcome" v-loading="status.loading.outcome" border>
      <template #default>
        <slot />
        <ElTableColumn
            align="right"
            fixed="right"
            min-width="260px"
            label="操作">
          <template #header>
            <slot name="header" />
            <ElButton
                type="success"
                size="small"
                @click="onInsert">
              新增
            </ElButton>
            <ElButton
                type="primary"
                size="small"
                @click="status.drawer = true">
              条件
            </ElButton>
            <ElButton
                type="primary"
                size="small"
                @click="onQuery(true)">
              查询
            </ElButton>
          </template>
          <template #default="{ row, column, $index }">
            <slot name="header-default" :row="row" :column="column" :$index="$index" />
            <ElButton
                v-show="hasOperate(OPERATE_WAY.SELECT)"
                @click="() => onDetails(row)"
                type="info"
                size="small"
                plain>
              详情
            </ElButton>
            <ElButton
                v-show="hasOperate(OPERATE_WAY.UPDATE)"
                @click="() => onModify(row)"
                type="primary"
                size="small"
                plain>
              修改
            </ElButton>
            <ElButton
                v-show="hasOperate(OPERATE_WAY.DELETE)"
                @click="() => onRemove(row, $index)"
                :loading="status.loading.remove && status.index.remove === $index"
                type="danger"
                size="small"
                plain>
              删除
            </ElButton>
            <ElButton
                v-show="hasOperate(OPERATE_WAY.VALID)"
                @click="() => onValid(row, $index)"
                :loading="status.loading.valid && status.index.valid === $index"
                :type="dicStore.dicCache?.[DIC.VALID]?.[VALID_REVERSE[row['valid']]]?.color"
                size="small"
                plain>
              {{ dicStore.dicCache?.[DIC.VALID]?.[row['valid']]?.name }}
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
  </section>
</template>

<style lang="scss" scoped>
  .up-outcome {
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