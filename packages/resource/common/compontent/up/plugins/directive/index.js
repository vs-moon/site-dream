import * as directiveUnits from './units'

/**
 * 指令注册
 */
export default {
  install: (app, _options) => {
    for (const [ name, option ] of Object.entries(directiveUnits)) {
      app.directive(name.toLocaleLowerCase(), option)
    }
  }
}
