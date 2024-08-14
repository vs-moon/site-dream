import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

import { VIEW_MODE, VALID_REVERSE, OPERATE_WAY, useMenuStore, getRouteJumpProperty } from '@vs-common/utils'
import { useScope } from '@vs-common/hook'

export const useConst = {
  key: Symbol('UP_MANAGE_PAGE'),
  enum: {}
}

export const useEmits = [
  'remote:query',
  'remote:remove',
  'remote:valid',
  'remote:lazy'
]

export const useProps = {
  remoteQuery: {
    type: Function,
    default: null
  },
  remoteRemove: {
    type: Function,
    default: null
  },
  remoteValid: {
    type: Function,
    default: null
  },
  remoteLazy: {
    type: Function,
    default: null
  },
  operates: {
    type: Array,
    default: Reflect.ownKeys(OPERATE_WAY)
  },
  editable: {
    type: Boolean,
    default: true
  },
  property: {
    type: Object,
    default: {
      primary: 'id',
      valid: 'valid'
    }
  },
  rowKey: {
    type: String,
    default: 'id'
  },
  lazy: {
    type: Boolean,
    default: false
  },
  load: {
    type: Function,
    default: null
  },
  treeProps: {
    children: 'children',
    hasChildren: 'hasChildren'
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const { nextRoute } = useMenuStore()
  
  const router = useRouter()
  
  const outcome = ref([])
  
  const status = reactive({
    drawer: false,
    loading: {
      valid: false,
      remove: false,
      outcome: false
    },
    index: {
      valid: -1,
      remove: -1
    }
  })
  
  useScope(() => {
    watch(() => status.loading.valid, v => {
      if (!v) {
        status.index.valid = -1
      }
    })
    
    watch(() => status.loading.remove, v => {
      if (!v) {
        status.index.remove = -1
      }
    })
  })
  
  const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })
  
  const onJump = async (viewMode, id = null) => {
    await router.push({ ...getRouteJumpProperty(nextRoute(), { id, viewMode }) })
  }
  
  const onInsert = async () => {
    await onJump(VIEW_MODE.ADD, null)
  }
  
  const onDetails = async row => {
    await onJump(VIEW_MODE.VIEW, row[props.property.primary])
  }
  
  const onModify = async row => {
    await onJump(VIEW_MODE.MODIFY, row[props.property.primary])
  }
  
  const onRemove = async (row, index) => {
    ElMessageBox.confirm('确认删除吗')
      .then(() => {
        const { isFetching, then } = props.remoteRemove(row[props.property.primary])
        status.loading.remove = isFetching
        status.index.remove = index
        then(response => {
          if (response.success) {
            
            emits('remote:remove')
          }
        })
      })
  }
  
  const onValid = async (row, index) => {
    const reverse = VALID_REVERSE[row[props.property.valid]]
    const { isFetching, then } = props.remoteValid({ by: row[props.property.primary], to: reverse })
    status.loading.valid = isFetching
    status.index.valid = index
    then(response => {
      if (response.success) {
        row[props.property.valid] = reverse
        emits('remote:valid')
      }
    })
  }
  
  const onQuery = (isReset = false) => {
    if (isReset) {
      pagination.pageNum = 1
      pagination.pageSize = 10
    }
    
    const { isFetching, then } = props.remoteQuery({
      ...props.condition,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })
    status.loading.outcome = isFetching
    then(response => {
      if (response.success) {
        outcome.value = response.data.list
        pagination.total = response.data.total
        emits('remote:query', outcome.value)
      }
    })
  }
  
  const onLoad = (row, treeNode, resolve) => {
    const { then } = props.remoteLazy({ [props.rowKey]: row[props.rowKey] })
    then(response => {
      resolve(response.data)
      emits('remote:lazy', response.data)
    })
  }
  
  const hasOperate = operateWay => {
    return props.operates.includes(operateWay) && props.editable
  }
  
  onQuery(true)
  
  return {
    status,
    outcome,
    pagination,
    onQuery,
    onInsert,
    onDetails,
    onModify,
    onRemove,
    onValid,
    onLoad,
    hasOperate
  }
}