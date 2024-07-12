// 日期格式转换
export const dateMutate = (date, format = 'YYYY-MM-DD hh:mm:ss') => {
  if (date) {
    if (typeof date === 'string') {
      date = date.replace(/-/g, '/')
    }
    
    if (typeof date === 'number') {
      date = new Date(String(date).length === 10 ? date * 1000 : date)
    }
    
    date = new Date(Date.parse(date))
    
    let y = date.getFullYear() + ''
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    h = h < 10 ? '0' + h : h
    let minute = date.getMinutes()
    minute = minute < 10 ? '0' + minute : minute
    let second = date.getSeconds()
    second = second < 10 ? '0' + second : second
    
    if (format.indexOf('YYYY') >= 0 || format.indexOf('yyyy') >= 0) {
      format = format.replace(/YYYY/g, y)
      format = format.replace(/yyyy/g, y)
    }
    if (format.indexOf('MM') >= 0) {
      format = format.replace(/MM/g, m)
    }
    if (format.indexOf('DD') >= 0 || format.indexOf('dd') >= 0) {
      format = format.replace(/DD/g, d)
      format = format.replace(/dd/g, d)
    }
    if (format.indexOf('HH') >= 0 || format.indexOf('hh') >= 0) {
      format = format.replace(/hh/g, h)
      format = format.replace(/HH/g, h)
    }
    if (format.indexOf('mm') >= 0) {
      format = format.replace(/mm/g, minute)
    }
    if (format.indexOf('SS') >= 0 || format.indexOf('ss') >= 0) {
      format = format.replace(/ss/g, second)
      format = format.replace(/SS/g, second)
    }
    return format
  } else {
    return ''
  }
}