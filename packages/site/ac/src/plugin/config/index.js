const mergeOptions = []

const mergeStrategies = (parent, child) => {
  return child || parent
}

export default {
  install (app, _options) {
    
    // 异常处理
    app.config.errorHandler = (err, instance, info) => {
      console.log(err, instance, info)
    }
    
    // 全局属性
    app.config.globalProperties.AppName = 'Ac'
    
    // 合并选项
    mergeOptions.forEach(item => {
      app.config.optionMergeStrategies[item] = mergeStrategies
    })
  }
}
