import { onMounted, onUnmounted } from 'vue'

export const useConst = {
    key: Symbol('UP_MOVABLE'),
    enum: {}
}

export const useEmits = [ 'click' ]

export const useProps = {
    position: {
        type: String,
        default: 'fixed',
        validator: value => {
            return [ 'absolute', 'fixed' ].includes(value)
        }
    },
    offsetX: {
        type: Number,
        default: 95
    },
    offsetY: {
        type: Number,
        default: 45
    },
    radius: {
        type: Boolean,
        default: true
    },
    size: {
        type: Number,
        default: 50
    }
}

export const useRunning = ({ attrs, slots, emits, props, name }) => {

    let isDown = false
    let isDragging = false
    let isCanClick = false
    let offsetX = 0
    let offsetY = 0

    let target = null
    let offsetParent = null
    let isAbsolute = props.position === 'absolute'

    const scalaOffsetX = event => event.clientX - target.offsetLeft - (isAbsolute ? offsetParent.offsetLeft : 0)

    const scalaOffsetY = event => event.clientY - target.offsetTop - (isAbsolute ? offsetParent.offsetTop : 0)

    const scalaFinalX = event => event.clientX - offsetX - (isAbsolute ? offsetParent.offsetLeft : 0)

    const scalaFinalY = event => event.clientY - offsetY - (isAbsolute ? offsetParent.offsetTop : 0)

    const scalaMaxX = () => (isAbsolute ? offsetParent.clientWidth : document.body.clientWidth) - target.clientWidth

    const scalaMaxY = () => (isAbsolute ? offsetParent.clientHeight : document.body.clientHeight) - target.clientHeight

    const mousedown = event => {

        isDown = true
        target = event.target
        offsetParent = target.offsetParent

        offsetX = scalaOffsetX(event)
        offsetY = scalaOffsetY(event)

        document.addEventListener('mousemove', mousemove)
    }

    const mousemove = event => {
        if (isDown) {
            isDragging = true

            const finalX = scalaFinalX(event)
            const finalY = scalaFinalY(event)

            if (finalX >= 0 && finalX <= scalaMaxX()) {
                target.style.left = finalX + 'px'
            }

            if (finalY >= 0 && finalY <= scalaMaxY()) {
                target.style.top = finalY + 'px'
            }
        }
    }

    const mouseup = () => {
        isDown = false
        isCanClick = !isDragging
        isDragging = false
        document.removeEventListener('mousemove', mousemove)
    }

    const click = () => {
        if (isCanClick) {
            emits('click')
        }
    }

    const resize = () => {
        if (target) {
            target.style.left = null
            target.style.right = 0
            target.style.top = 0
        }
    }

    onMounted(() => {
        window.addEventListener('resize', resize)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', resize)
    })

    return {
        mousedown,
        mousemove,
        mouseup,
        click
    }
}