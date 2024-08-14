import { computed, getCurrentInstance, inject } from 'vue'
import { isNumber } from '@vs-common/utils/type/index.js'
import { useConst as useConstRow } from '../row/index.js'

export const useConst = {
    key: Symbol('UP_COL'),
    enum: {}
}

export const useEmits = []

export const useProps = {
    icon: {
        type: String,
        default: ''
    },
    open: {
        type: Boolean,
        default: false
    }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {

    const instance = getCurrentInstance();
    const { uid } = instance
    const { key } = instance.vnode
    const spanKey = key ? key + '' : isNumber(uid) ? uid + '' : uid

    const spanMapping = inject(useConstRow.key)
    const { area, spanSum, spanClose } = spanMapping
    const { onChange } = spanMapping.register(spanKey, props.open)

    const spanArea = computed(() => area[spanKey])
    const spanBox = computed(() => spanArea.value - spanClose ? spanSum - spanClose : 0)
    const spanIcon = computed(() => spanArea.value > spanClose ? spanClose : spanSum)

    return {
        spanClose,
        onChange,
        spanArea,
        spanBox,
        spanIcon
    }
}