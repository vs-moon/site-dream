export default {
  install(app, _options) {
    const version = Number(app.version.split('.')[0])
    if (version < 3) {
      console.warn('This Plugin Requires Vue 3')
    }
  }
}
