export const debounce = (callback, delay = 3000, callbackBefore) => {
  let time = null
  return (...args) => {
    const context = this
    time && clearTimeout(time)
    time = setTimeout(() => {
      callback instanceof Function && Reflect.apply(callback, context, [ ...args ])
      callbackBefore instanceof Function && Reflect.apply(callbackBefore, context, [ ...args ])
    }, delay)
  }
}

export const throttle = (callback, delay = 3000, callbackBefore) => {
  let previous = 0
  return (...args) => {
    let context = this
    let now = new Date()
    if (now - previous > delay) {
      callbackBefore instanceof Function && Reflect.apply(callbackBefore, context, [ ...args ])
      callback instanceof Function && Reflect.apply(callback, context, [ ...args ])
      previous = now
    }
  }
}