import { onActivated, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElNotification } from 'element-plus'
import { useEffectScope } from '@vs-common/hook'
import { ObjectUtils } from '@vs-common/utils'
import { useRouteStore, getRouteJumpProperty } from '@vs-customize/plugin'
import { VIEW_MODE, VALID_REVERSE, OPERATE_WAY } from '@vs-customize/const'

const eventRemoteQuery = 'remote:query'
const eventRemoteRemove = 'remote:remove'
const eventRemoteValid = 'remote:valid'
const eventRemoteLazy = 'remote:lazy'

const defaultTreeProps = {
  children: 'children',
  hasChildren: 'hasChildren'
}

export const useOptions = {
  key: Symbol('CUSTOMIZE_UP_PAGE_MANAGE'),
  confine: {},
  emits: [
    eventRemoteQuery,
    eventRemoteRemove,
    eventRemoteValid,
    eventRemoteLazy
  ],
  props: {
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
    viewConfine: {
      type: Function,
      default: null
    },
    addConfine: {
      type: Function,
      default: null
    },
    modifyConfine: {
      type: Function,
      default: null
    },
    deleteConfine: {
      type: Function,
      default: null
    },
    validConfine: {
      type: Function,
      default: null
    },
    operates: {
      type: Array,
      default: Object.values(OPERATE_WAY)
    },
    editable: {
      type: Boolean,
      default: true
    },
    confineProps: {
      type: Object,
      default: null
    },
    confineAttribute: {
      type: [ String, Array ],
      default: null
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    parentKey: {
      type: String,
      default: 'pid'
    },
    validKey: {
      type: String,
      default: 'valid'
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
      type: Object,
      default: () => (defaultTreeProps)
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const { nextRoute } = useRouteStore()
  
  const router = useRouter()
  
  const container = ref([])
  
  const status = reactive({
    collapse: '0',
    drawer: false,
    loading: {
      valid: false,
      remove: false,
      container: false
    },
    index: {
      valid: -1,
      remove: -1
    }
  })
  
  const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })
  
  const mergeTreeProps = { ...defaultTreeProps, ...props.treeProps }
  
  const elFormRef = ref(null)
  
  const onJump = async (vm, id = null, args) => {
    await router.push({ ...getRouteJumpProperty(nextRoute(), { id, vm, ...args}) })
  }
  
  const onAppend = async row => {
    const confineMapping = ObjectUtils.valueTaking(row, props.confineAttribute)
    const args = props.lazy ? { ...confineMapping, [props.parentKey]: row[props.rowKey] } : confineMapping
    await onJump(VIEW_MODE.ADD, null, args)
  }
  
  const onInsert = async () => {
    if (props.confineProps) {
      const valid = await elFormRef.value.validate()
      if (!valid) {
        status.drawer = true
        return false
      }
    }
    const args = props.lazy ? { [props.parentKey]: '0', ...props.confineProps } : { ...props.confineProps }
    await onJump(VIEW_MODE.ADD, null, args)
  }
  
  const onDetails = async row => {
    await onJump(VIEW_MODE.VIEW, row[props.rowKey])
  }
  
  const onModify = async row => {
    await onJump(VIEW_MODE.MODIFY, row[props.rowKey])
  }
  
  const onRemove = async (row, index) => {
    ElMessageBox.confirm('确认删除吗')
      .then(() => {
        const { isFetching, then, notification } = props.remoteRemove(row[props.rowKey])
        status.loading.remove = isFetching
        status.index.remove = index
        then(response => {
          if (response.success) {
            notification()
            emits(eventRemoteRemove)
            onQuery()
          }
        })
      })
  }
  
  const onValid = async (row, index) => {
    const reverse = VALID_REVERSE[row[props.validKey]]
    const { isFetching, then, notification } = props.remoteValid({ by: row[props.rowKey], to: reverse })
    status.loading.valid = isFetching
    status.index.valid = index
    then(response => {
      if (response.success) {
        notification()
        row[props.validKey] = reverse
        emits(eventRemoteValid)
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
    
    status.loading.container = isFetching
    
    then(response => {
      if (response.success) {
        container.value = response.data.list
        pagination.total = response.data.total
        emits(eventRemoteQuery, container.value)
      }
    })
  }
  
  const onLoad = (row, treeNode, resolve) => {
    const { then } = props.remoteLazy({ [props.rowKey]: row[props.rowKey] })
    then(response => {
      resolve(response.data)
      emits(eventRemoteLazy, response.data)
    })
  }
  
  const hasOperate = operateWay => {
    return props.operates.includes(operateWay) && props.editable
  }
  
  
  useEffectScope(() => {
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
  
  
  onActivated(() => {
    onQuery(true)
  })
  
  return {
    status,
    container,
    pagination,
    mergeTreeProps,
    onQuery,
    onAppend,
    onInsert,
    onDetails,
    onModify,
    onRemove,
    onValid,
    onLoad,
    hasOperate,
    elFormRef
  }
}