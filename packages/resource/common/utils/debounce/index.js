/**
 * 防抖节流
 * @param {*} callback
 * @param {*} delay
 * @returns
 */
export const debounce = (callback, delay = 3000) => {
  let time = null
  return (...args) => {
    const context = this
    time && clearTimeout(time)
    time = setTimeout(() => {
      Reflect.apply(callback, context, [ ...args ])
    }, delay)
  }
}

export const throttle = (callback, delay = 3000) => {
  let previous = 0
  return (...args) => {
    let context = this
    let now = new Date()
    if (now - previous > delay) {
      callback.apply(context, args)
      previous = now
    }
  }
}