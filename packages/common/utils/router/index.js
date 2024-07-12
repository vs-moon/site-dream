import { isNavigationFailure, NavigationFailureType } from 'vue-router'
import { readonly, ref, toRaw, toRefs } from 'vue'
import { JUMP_MODE, JUMP_MODE_PROPERTY, MENU_MODE, VALID, VIEW_MODE_MAP, } from '../const/enum.js'
import { isEmpty } from '../array/index.js'
import { useAliveStore, useAuthorizationStore, useMenuStore, useProperty } from '../store/index.js'

const routeInstance = ref({
  addRoute: () => {},
  push: ({}) => {},
  currentRoute: {}
})

export const useRouter = () => {
  return readonly(routeInstance)
}

/**
 * 路由组件模块集
 */
const _routeComponentsModules = import.meta.glob('@/views/**/*.vue')

/**
 * 获取跳转方式映射(动态获取字段名字段值)
 * @param args
 * @returns {{value: *, key: *}}
 */
export const getJumpModeMapping = args => {
  const aliveProperty = useProperty().aliveStore
  const key = JUMP_MODE_PROPERTY[args[aliveProperty.jumpMode]]
  const value = args[key]
  return {
    key,
    value
  }
}

/**
 * 是否可跳转
 * @param menuMode
 * @returns {boolean}
 */
export const isCanJump = menuMode => {
  return menuMode === MENU_MODE.D || menuMode === MENU_MODE.M
}

/**
 * 重命名路由组件
 * @param {string} name
 * @param {*} module
 * @returns
 */
const renameRouteComponent = (name, module) => {
  return async () => {
    return module().then((component) => {
      component.default.name = name
      return component
    })
  }
}

/**
 * 更新路由跳转
 * @param menuItem
 * @param to
 * @returns {(*&{state: {props}})|(*&{query: undefined})}
 */
export const updateRouteJumpProperty = (menuItem, to) => {
  const aliveProperty = useProperty().aliveStore
  const { query } = to
  if (menuItem[aliveProperty.jumpMode] === JUMP_MODE.P) {
    return menuItem.routeJump.query = query
  } else {
    return menuItem.routeJump.state = {
      props: history.state.props
    }
  }
}

/**
 * 获取路由跳转
 * @param menuItem
 * @param args
 * @returns {{name: *, state: {props}}|{path: *, query}}
 */
export const getRouteJumpProperty = (menuItem, args = {}) => {
  const aliveProperty = useProperty().aliveStore
  const { value } = getJumpModeMapping(menuItem)
  if (menuItem[aliveProperty.jumpMode] === JUMP_MODE.P) {
    return {
      path: value,
      query: args
    }
  } else {
    return {
      name: value,
      state: {
        props: args
      }
    }
  }
}

/**
 * 获取路由跳转
 * @param menuItem
 * @param args
 * @returns {{name: *, state: {props}}|{path: *, query}}
 */
export const setRouteJumpProperty = (menuItem, args = {}) => {
  menuItem.routeJump = getRouteJumpProperty(menuItem, args)
}

/**
 * 获取路由参数
 * @param {*} route
 * @param {string} jumpMode
 * @returns
 */
const getRouteParam = (route, jumpMode) => {
  if (jumpMode === JUMP_MODE.P) {
    return route.query
  } else {
    return history.state.props
  }
}

/**
 * 生成路由项
 * @param menuItem
 * @param modules
 * @param routers
 * @param children
 */
const generateRouteItem = (menuItem, modules, routers, children) => {
  const aliveProperty = useProperty().aliveStore
  const {
    [aliveProperty.modulePath]: modulePath,
    [aliveProperty.routePath]: routePath,
    [aliveProperty.routeName]: routeName,
    [aliveProperty.jumpMode]: jumpMode,
    [aliveProperty.menuName]: menuName,
    [aliveProperty.menuMode]: menuMode
  } = menuItem
  
  setRouteJumpProperty(menuItem)
  
  routers.push({
    path: routePath,
    name: routeName,
    props: route => getRouteParam(route, jumpMode),
    component: renameRouteComponent(routeName, modules[modulePath]),
    children,
    meta: {
      lang: [ 'zh-cn' ],
      title: menuName,
      mode: {
        jump: jumpMode,
        menu: menuMode
      }
    }
  })
}

/**
 * 生成路由集
 * @param {*[]} menus
 * @param {*} modules
 * @returns
 */
export const generateRoute = (menus, modules) => {
  
  const aliveProperty = useProperty().aliveStore
  const routers = []
  
  menus.forEach(menuItem => {
    const {
      [aliveProperty.modulePath]: modulePath,
      [aliveProperty.menuMode]: menuMode
    } = menuItem
    
    if (isCanJump(menuMode) && modules[modulePath]) {
      generateRouteItem(menuItem, modules, routers, null)
    }
  })
  
  return routers
}

export const generateRouteNesting = (menus, modules) => {
  
  const aliveProperty = useProperty().aliveStore
  
  const routers = []
  
  menus.forEach(menuItem => {
    const {
      [aliveProperty.modulePath]: modulePath,
      [aliveProperty.menuMode]: menuMode,
      [aliveProperty.children]: children
    } = menuItem
    
    if (!isEmpty(children)) {
      const childrenRoute = generateRoute(children, modules)
      if (isCanJump(menuMode) && modules[modulePath]) {
        generateRouteItem(menuItem, modules, routers, childrenRoute)
      } else {
        if (!isEmpty(childrenRoute)) {
          routers.push(...childrenRoute)
        }
      }
    } else {
      if (isCanJump(menuMode) && modules[modulePath]) {
        generateRouteItem(menuItem, modules, routers, null)
      }
    }
  })
  
  return routers
}


/**
 * 追加路由
 * @param {string} parentName  父级路由名称
 * @param {*[]} routes      路由对象集合
 */
export const addRoute = (parentName, routes) => {
  routes.forEach(route => {
    routeInstance.value.addRoute(parentName, route)
  })
}

const getViewModeName = routeArgs => {
  if (routeArgs) {
    const { viewMode } = routeArgs
    if (viewMode) {
      return VIEW_MODE_MAP[viewMode]
    }
  }
  
  return ''
}

export default {
  install (app, { router, routeModules, routeConst = {}, titlePrefix = 'Route' }) {
    
    const aliveProperty = useProperty().aliveStore
    
    const aliveStore = useAliveStore()
    const authorizationStore = useAuthorizationStore()
    const menuStore = useMenuStore()
    
    const finalRouteConst = {
      ...ROUTE_CONST,
      ...routeConst
    }
    
    const defaultRouteJump = candidateRoute => {
      // TODO [存在访问中页面](重定向至访问中页面)
      if (aliveStore.active) {
        return {
          ...toRaw(aliveStore.current[aliveProperty.routeJump])
        }
      }
      
      const canJumpRouteAction = menuStore.source.find(item => item[aliveProperty.routeAction] === VALID.T)
      
      // TODO [存在可跳转默认页面](重定向至默认页面)
      if (canJumpRouteAction) {
        aliveStore.update(canJumpRouteAction)
        return {
          ...toRaw(canJumpRouteAction[aliveProperty.routeJump])
        }
      }
      
      return candidateRoute
    }
    
    // 👉 BeforeEach
    const onBeforeEach = async (to, from) => {
      // TODO [如果跳转目标为登录页面]
      if (to.path === finalRouteConst.entrance.path) {
        // TODO [如果已认证](拦截登录页面跳转, 重定向至访问中页面或根页面, 只有登出成功后才可访问)
        if (authorizationStore.enable) {
          // TODO [存在访问中页面]
          if (aliveStore.active) {
            return {
              ...toRaw(aliveStore.current[aliveProperty.routeJump])
            }
          } else {
            return finalRouteConst.root.path
          }
        }
      } else {
        // TODO [如果已认证]
        if (authorizationStore.enable) {
          
          // TODO 如果跳转目标为根页面
          if (to.path === finalRouteConst.root.path) {
            return defaultRouteJump()
          } else {
            const canJumpRoute = menuStore.source.find(item => item[aliveProperty.routePath] === to.path)
            // TODO [不存在可跳转页面]
            if (!canJumpRoute) {
              return defaultRouteJump(finalRouteConst.root.path)
            }
          }
        } else {
          // TODO [未认证, 重定向至登录页面]
          return finalRouteConst.entrance.path
        }
      }
    }
    
    // 👉 BeforeResolve
    const onBeforeResolve = async (to, from) => {}
    
    // 👉 AfterEach
    const onAfterEach = (to, from, failure) => {
      
      if (isNavigationFailure(failure)) {
        
        let message = ''
        
        // AfterEach > Failure Handle
        // aborted     在导航守卫中返回 false 中断了本次导航
        // cancelled   在当前导航还没有完成之前又有了一个新的导航。比如，在等待导航守卫的过程中又调用了 router.push
        // duplicated  导航被阻止，因为我们已经在目标位置了
        
        if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
          message = '路由中断'
        } else if (isNavigationFailure(failure, NavigationFailureType.cancelled)) {
          message = '路由变向'
        } else if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
          message = '路由重复'
        }
        
        console.log(failure + ': [' + message + ']' + ' Route From: %s -> To: %s', from.path, to.path)
        
      } else {
        
        const { mode } = to.meta
        let viewModeName = ''
        
        if (mode) {
          if (mode.menu === MENU_MODE.D) {
            viewModeName = ' | ' + getViewModeName(mode.jump === JUMP_MODE.N ? router.options.history.state.props : to.query)
          }
        }
        
        document.title = to.meta.title ? `${titlePrefix} | ${ to.meta.title }${ viewModeName }` : titlePrefix
        
        let canJumpRoute = menuStore.source.find(item => item[aliveProperty.routePath] === to.path)
        
        if (canJumpRoute) {
          updateRouteJumpProperty(canJumpRoute, to)
          aliveStore.update(canJumpRoute)
        }
      }
    }
    
    // 👉 Error
    const onError = error => {
      console.error(error)
    }
    
    // 📦 Other ===================================================================================================
    
    const onMount = () => {
      routeInstance.value = router
      if (menuStore.enable) {
        addRoute(finalRouteConst.root.name, generateRoute(menuStore.source, routeModules || _routeComponentsModules))
      }
      
      app.use(router)
    }
    
    // 1, 导航被触发。
    // 2, 在失活的组件里调用 beforeRouteLeave 守卫。
    // 3, 调用全局的 beforeEach 守卫。
    router.beforeEach(onBeforeEach)
    // 4, 在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
    // 5, 在路由配置里调用 beforeEnter。
    // 6, 解析异步路由组件。
    // 7, 在被激活的组件里调用 beforeRouteEnter。
    // 8, 调用全局的 beforeResolve 守卫(2.5+)。
    router.beforeResolve(onBeforeResolve)
    // 9, 导航被确认。
    // 10, 调用全局的 afterEach 钩子。
    router.afterEach(onAfterEach)
    // 11, 触发 DOM 更新。
    // 12, 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
    
    router.onError(onError)
    
    onMount()
  }
}

export const ROUTE_CONST = {
  entrance: {
    path: '/login',
    name: 'login'
  },
  root: {
    path: '/',
    name: 'root'
  }
}