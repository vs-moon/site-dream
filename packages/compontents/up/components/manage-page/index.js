
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

import { VIEW_MODE, VALID_REVERSE, OPERATE_WAY } from '@vs-common/utils/const/enum.js'
import { getRouteJumpProperty } from '@vs-common/utils/router/index.js'
import { useMenuStore } from '@vs-common/utils/store/unit/menu.js'

export const useConst = {
  key: Symbol('UP_MANAGE_PAGE'),
  enum: {}
}

export const useEmits = [
  'remote:query',
  'remote:remove',
  'remote:valid'
]

export const useProps = {
  condition: {
    type: Object,
    default: {}
  },
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
      remove: -1,
    }
  })
  
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

  const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })
  
  const onJump = async (viewMode, id = null) => {
    await router.push({ ...getRouteJumpProperty(nextRoute(), { id, viewMode }) })
  }

  const onInsert = async () => {
    await onJump(VIEW_MODE.INSERT, null)
  }
  
  const onDetails = async row => {
    await onJump(VIEW_MODE.DETAILS, row[props.property.primary])
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
    
    const { isFetching, then } = props.remoteQuery({ ...props.condition, ...pagination })
    status.loading.outcome = isFetching
    then(response => {
      if (response.success) {
        outcome.value = response.data.list
        pagination.total = response.data.total
        emits('remote:query', outcome.value)
      }
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
    hasOperate
  }
}