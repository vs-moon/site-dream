import { nextTick, reactive, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useEffectScope } from '@vs-common/hook'
import { TypeUtils, ArrayUtils, PackageUtils } from '@vs-common/utils'
import { VALID, VIEW_MODE, VALID_TEXT } from '@vs-customize/const'

const eventClick = 'click'
const eventCheckbox = 'checkbox'
const eventClose = 'close'
const eventSubmit = 'submit'
const eventAppend = 'append'
const eventEdit = 'edit'

export const useOptions = {
  key: Symbol('CUSTOMIZE_UP_BRANCH'),
  confine: {
    FLAG: {
      NEW: 'X',
      ROOT: '0'
    }
  },
  emits: [
    eventClick,
    eventCheckbox,
    eventClose,
    eventSubmit,
  ],
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    remoteQuery: {
      type: Function,
      default: null
    },
    remoteRemove: {
      type: Function,
      default: null
    },
    remoteUpdate: {
      type: Function,
      default: null
    },
    remoteValid: {
      type: Function,
      default: null
    },
    valueKey: {
      type: String,
      default: 'code'
    },
    validKey: {
      type: String,
      default: 'valid'
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    parentKey: {
      type: String,
      default: 'pid'
    },
    defaultProps: {
      label: 'name',
      disabled: 'disabled',
      children: 'children',
      isLeaf: 'leaf',
      validTruly: '1',
      validFalsely: '0'
    }
  }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {
  
  const { FLAG } = useOptions.confine
  
  const condition = reactive({
    app: ''
  })
  
  const dataset = reactive({
    dataSource: [],
    checkedNodes: [],
    checkedKeys: [],
    nodeKeys: [],
    expandedKeys: [],
    screenText: '',
    rootResolve: null,
    newNode: null
  })
  
  const status = reactive({
    loading: {
      dataSource: false
    }
  })
  
  const elTreeRef = ref()
  
  useEffectScope(() => {
    watch(() => dataset.screenText, newVal => {
      elTreeRef.value.filter(newVal)
    })
  })
  
  /**
   * 清空
   */
  const onClear = () => {
    dataset.screenText = ''
    dataset.checkedNodes = []
    dataset.checkedKeys = []
    elTreeRef.value.setCheckedKeys([])
    onReduce(null)
  }
  
  /**
   * 全选
   */
  const onCheckAll = () => {
    elTreeRef.value.setCheckedKeys(dataset.nodeKeys)
    dataset.checkedNodes = elTreeRef.value.getCheckedNodes()
    dataset.checkedKeys = elTreeRef.value.getCheckedKeys()
  }
  
  /**
   * 创建新的节点
   * @param {*} parentId
   * @param parentValid
   */
  const createNode = (parentId = FLAG.ROOT, parentValid = VALID.T) => {
    return {
      [props.nodeKey]: FLAG.NEW,
      [props.parentKey]: parentId,
      [props.validKey]: parentValid,
      [props.valueKey]: '',
      [props.defaultProps.label]: 'New',
      [props.defaultProps.disabled]: false,
      [props.defaultProps.children]: [],
      [props.defaultProps.isLeaf]: true,
    }
  }
  
  /**
   * 更新 nodeKeys
   */
  const updateNodeKeys = () => {
    dataset.nodeKeys = Reflect.ownKeys(elTreeRef.value.store.nodesMap)
  }
  
  /**
   * 复选框选中
   * @param data
   * @param node
   * @param indeterminate
   */
  const onCheck = (data, node, indeterminate) => {
    dataset.checkedKeys = node.checkedKeys
    dataset.checkedNodes = node.checkedNodes
    emits(eventCheckbox, node.checkedNodes, node.checkedKeys)
  }
  
  /**
   * 点击事件
   * @param {*} data
   * @param {*} node
   * @param {*} treeNode
   * @param {*} pointerEvent
   */
  const onClick = (data, node, treeNode, pointerEvent) => {
    const { children, ...residue } = data
    emits(eventClick, {
      data: residue,
      key: node.key === FLAG.NEW ? FLAG.NEW : node.key,
      vm: node.key === FLAG.NEW ? VIEW_MODE.ADD : VIEW_MODE.VIEW
    })
  }
  
  /**
   * 追加
   * @param node
   */
  const onAppend = async node => {
    node = node || elTreeRef.value.root
    if (dataset.newNode) {
      ElMessage.warning('已有新建节点')
      elTreeRef.value.setCurrentKey(FLAG.NEW, true)
    } else {
      dataset.newNode = createNode(node.key, node[props.validKey])
      if (props.lazy) {
        node.loaded = false
        node.expand()
      } else {
        elTreeRef.value.append(dataset.newNode, node.key)
        elTreeRef.value.setCurrentKey(FLAG.NEW, true)
      }
    }
    
    emits(eventAppend, { data: dataset.newNode, key: FLAG.NEW, vm: VIEW_MODE.ADD })
  }
  
  /**
   * 编辑事件
   * @param {*} node
   * @param {*} data
   */
  const onEdit = (node, data) => {
    const { children, ...residue } = data
    emits(eventEdit, { data: residue, key: node.key, vm: VIEW_MODE.MODIFY })
  }
  
  /**
   * 移除新增节点
   * @param {*} node
   */
  const onReduce = node => {
    if (dataset.newNode) {
      elTreeRef.value.remove(dataset.newNode)
      if (node?.parent) {
        elTreeRef.value.setCurrentKey(node.parent.key, true)
      }
      dataset.newNode = null
    }
  }
  
  /**
   * 展开节点
   * @param {*} key
   */
  const onExpand = (key) => {
    dataset.expandedKeys.push(key)
  }
  
  /**
   * 过滤节点回调方法
   * @param {*} value
   * @param {*} data
   */
  const onFilter = (value, data) => {
    return value ? data[props.defaultProps.label].indexOf(value) !== -1 : true
  }
  
  /**
   * 点击关闭按钮后回调-该组件内部不提供自关闭功能
   */
  const onClose = () => {
    dataset.checkedNodes = []
    dataset.checkedKeys = []
    elTreeRef.value.setCheckedKeys([])
    emits(eventClose, false)
  }
  
  /**
   * 点击提交按钮后回调-回调值为勾选项集合
   */
  const onSubmit = () => {
    if (TypeUtils.isArray(dataset.checkedNodes) &&  TypeUtils.isArray(dataset.checkedKeys)) {
      if (ArrayUtils.isEmpty(dataset.checkedNodes) && ArrayUtils.isEmpty(dataset.checkedKeys)) {
        ElMessage.warning('请选择节点')
      } else {
        emits(eventSubmit, dataset.checkedNodes, dataset.checkedKeys)
      }
    }
  }
  
  /**
   * 刷新
   */
  const onRefresh = () => {
    onClear()
    if (props.lazy) {
      elTreeRef.value.root.childNodes.splice(0)
      onLazy(elTreeRef.value.root, dataset.rootResolve).then(() => {
      })
    } else {
      onQuery(null)
    }
  }
  
  /**
   * 请求数据
   * @param {*} nodeKey
   */
  const onQuery = nodeKey => {
    
    const { isFetching, then } = props.remoteQuery({ ...condition })
    status.loading.dataSource = isFetching
    then(response => {
      if (response.success) {
        if (!ArrayUtils.isEmpty(response.data)) {
          response.data.forEach(item => item.disabled = item.valid === '0')
          dataset.dataSource = PackageUtils.toBranch(response.data).nesting
          elTreeRef.value.setCurrentKey(nodeKey || response.data[0][props.nodeKey], true)
        } else {
          dataset.dataSource = []
        }
        
        nextTick().then(() => {
          updateNodeKeys()
        })
      }
    })
  }
  
  /**
   * 节点加载 [ 懒加载 ]
   * @param node
   * @param resolve
   */
  const onLazy = async (node, resolve) => {
    
    let nodeKey = node.key || FLAG.ROOT
    
    if (node.level === 0) {
      dataset.rootNode = node
      dataset.rootResolve = resolve
    }
    
    const { then } = props.remoteQuery({ ...condition, [props.parentKey]: nodeKey })
    then(response => {
      if (!ArrayUtils.isEmpty(response.data)) {
        response.data.forEach(item => item.disabled = item.valid === '0')
        if (dataset.newNode && (dataset.newNode[props.parentKey] === node.key || node.level === 0)) {
          resolve([ ...response.data, dataset.newNode ])
          elTreeRef.value.setCurrentKey(FLAG.NEW, true)
        } else {
          resolve(response.data)
        }
      } else {
        if (dataset.newNode && (dataset.newNode[props.parentKey] === node.key || node.level === 0)) {
          resolve([ dataset.newNode ])
          elTreeRef.value.setCurrentKey(FLAG.NEW, true)
        } else {
          resolve([])
        }
      }
      
      nextTick().then(() => {
        updateNodeKeys()
      })
    })
  }
  
  /**
   * 切换有效性状态
   * @param to
   * @param node
   * @param data
   */
  const onValid = (to, node, data) => {
    const by = node.key
    ElMessageBox.confirm(`此操作将 ${ VALID_TEXT[to] } 该节点及下级节点, 是否继续?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true
    }).then(() => {
      const { then, notification } = props.remoteValid({ by, to })
      then(response => {
        notification()
        if (response.success) {
          onRefresh()
        }
      })
    }).catch(() => {
      data[props.validKey] = to === VALID.T ? VALID.F : VALID.T
    })
  }
  
  /**
   * 删除
   * @param {*} node
   */
  const onRemove = node => {
    const id = node.key
    const { then, notification } = props.remoteRemove(id)
    then(response => {
      notification()
      if (response.success) {
        onReduce(node)
      }
    })
  }
  
  /**
   * 拖拽操作步骤 (1)
   * 拖拽前判断回调事件
   * @param draggingNode
   * @returns {boolean}
   */
  const onAllowDrag = (draggingNode) => {
    // 根节点与新增节点不能拖拽
    return draggingNode.key !== FLAG.ROOT && draggingNode.key !== FLAG.NEW
  }
  
  /**
   * 拖拽操作步骤 (2)
   * 放置前判断回调事件
   * @param draggingNode
   * @param dropNode
   * @param dropType {'prev'|'inner'|'next'|'none'}
   * @returns {boolean}
   */
  const onAllowDrop = (draggingNode, dropNode, dropType) => {
    if (dropNode.key === FLAG.ROOT) {
      return [ 'inner', 'none' ].includes(dropType)
    } else if (dropNode.key === FLAG.NEW) {
      return [ 'prev', 'next' ].includes(dropType)
    } else {
      return true
    }
  }
  
  /**
   * 拖拽操作步骤 (3)
   * 拖拽结束回调事件
   * @param draggingNode
   * @param dropNode
   * @param dropType {'prev'|'inner'|'next'|'none'}
   * @returns {boolean}
   */
  const onNodeDrop = (draggingNode, dropNode, dropType) => {
    if (dropType === 'none') {
      return false
    }
    
    let isUpdate = true
    const source = draggingNode.data
    
    if (dropType === 'inner') {
      source[props.parentKey] = dropNode.key
    } else {
      if (draggingNode.level !== dropNode.level) {
        source[props.parentKey] = dropNode.data[props.parentKey]
      } else {
        isUpdate = false
      }
    }
    
    if (isUpdate) {
      const { children, ...residue } = source
      const { [props.nodeKey]: id, [props.parentKey]: parentId } = residue
      const { then, notification } = props.remoteUpdate({ [props.nodeKey]: id, [props.parentKey]: parentId })
      then(response => {
        notification()
        if (response.success) {
          onRefresh()
        }
      })
    }
  }
  
  const expose = {
    updateCurrentNode: (key, data) => {
      elTreeRef.value.updateKeyChildren(key, data)
    }
  }
  
  if (!props.lazy) {
    onQuery(null)
  }
  
  return {
    condition,
    dataset,
    status,
    elTreeRef,
    onClear,
    onCheckAll,
    createNode,
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
    onExpand,
    onFilter,
    onClose,
    onSubmit,
    onAllowDrag,
    onAllowDrop,
    onNodeDrop,
    expose,
  }
}