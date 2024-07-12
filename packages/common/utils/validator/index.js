/**
 * 取值范围
 * @param {number} minVal
 * @param {number} maxVal
 * @returns {(function(*): (*|boolean))|*}
 */
export const range = (minVal, maxVal) => {
  return (propsVal) => {
    if (propsVal) {
      return propsVal >= minVal && propsVal <= maxVal
    } else {
      return false
    }
  }
}