<script setup>
import { useOptions, useRunning } from './index.js'
import { reactive, useAttrs, watch } from 'vue'
import { useDicStore } from '@vs-customize/plugin'
import { PROPERTY_DIC } from '@vs-customize/const'
import { ElNotification } from 'element-plus'

const name = 'CustomizeUpDesignSettingCache'

defineOptions({
  name
})

const attrs = useAttrs()
const slots = defineSlots()
const emits = defineEmits([ ...useOptions.emits ])
const props = defineProps({ ...useOptions.props })

const {} = useRunning({ attrs, slots, emits, props, name })

let dicStore = useDicStore()

const status = reactive({
  loading: {
    dic: -1,
    dicType: -1
  }
})

const onNotification = success => {
  ElNotification({
    title: success ? 'Success' : 'Fail',
    type: success ? 'success' : 'error',
    message: success ? '更新成功' : '更新失败',
    offset: 80,
    duration: 1000,
    position: 'top-left'
  })
}

const updateDic = (type, index) => {
  status.loading.dic = index
  dicStore.removeQueueDic(type)
  dicStore.remoteDic(type, success => {
    setTimeout(() => status.loading.dic = -1, 1000)
    onNotification(success)
  })
}

const updateDicType = (code, index) => {
  status.loading.dicType = index
  dicStore.removeQueueDicType(code)
  dicStore.remoteDicType(code, success => {
    setTimeout(() => status.loading.dicType = -1, 1000)
    onNotification(success)
  })
}

defineExpose({})
</script>

<template>
  <ElTabs class="customize-up-design-setting-cache" stretch>
    <ElTabPane label="字典项">
      <ElSpace wrap fill>
        <ElCard
          :key="typeKey"
          v-for="(typeArray, typeKey, typeIndex) in dicStore.dic"
          v-loading="status.loading.dic === typeIndex"
          :element-loading-spinner="useOptions.confine.loadingSpinner">
          <template #header>
            <span>{{ typeKey }}</span>
            <ElButton
              @click="updateDic(typeKey, typeIndex)"
              icon="Refresh"
              size="default"
              text
              circle />
          </template>
          <ElTable :data="Object.values(typeArray)">
            <ElTableColumn label="编码" :prop="PROPERTY_DIC.code" />
            <ElTableColumn label="名称" :prop="PROPERTY_DIC.name" />
          </ElTable>
        </ElCard>
      </ElSpace>
    </ElTabPane>
    <ElTabPane label="字典类">
      <ElSpace wrap fill>
        <ElTable :data="Object.values(dicStore.dicType)">
          <ElTableColumn label="编码" :prop="PROPERTY_DIC.code" />
          <ElTableColumn label="名称" :prop="PROPERTY_DIC.name" />
          <ElTableColumn #default="{ row, $index }">
            <ElButton
              @click="updateDicType(row[PROPERTY_DIC.code], $index)"
              :loading="status.loading.dicType === $index"
              icon="Refresh"
              size="default"
              text
              circle />
          </ElTableColumn>
        </ElTable>
      </ElSpace>
    </ElTabPane>
  </ElTabs>
</template>

<style lang="scss">
.customize-up-design-setting-cache {

  height: 100%;
  overflow-y: auto;

  .el-tabs__content {
    height: calc(100% - 55px);

    .el-tab-pane {
      height: 100%;
      overflow-y: auto;

      .el-space {
        width: 100%;

        .el-card {
          .el-card__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;

            i:hover {
              color: #0099FF;
            }
          }
        }
      }
    }
  }
}
</style>