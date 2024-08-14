import { isNavigationFailure, NavigationFailureType } from 'vue-router'
import { readonly, ref, toRaw } from 'vue'
import { ArrayUtils } from '@vs-common/utils'
import { JUMP_MODE, JUMP_MODE_PROPERTY, NAV_TYPE, VIEW_MODE_MAP, PROPERTY_ROUTE, VALID } from '@vs-customize/const'
import { useAliveStore, useAuthorizeStore, useRouteStore } from '../store/index.js'

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
  const key = JUMP_MODE_PROPERTY[args[PROPERTY_ROUTE.mode]]
  const value = args[key]
  return {
    key,
    value
  }
}

/**
 * 是否可跳转
 * @param type
 * @returns {boolean}
 */
export const isCanJump = type => {
  return type === NAV_TYPE.V
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
 * @param routeItem
 * @param to
 * @returns {(*&{state: {props}})|(*&{query: undefined})}
 */
export const updateRouteJumpProperty = (routeItem, to) => {
  const { query } = to
  if (routeItem[PROPERTY_ROUTE.mode] === JUMP_MODE.P) {
    return routeItem.routeJump.query = query
  } else {
    return routeItem.routeJump.state = {
      props: history.state.props
    }
  }
}

/**
 * 获取路由跳转
 * @param routeItem
 * @param args
 * @returns {{name: *, state: {props}}|{path: *, query}}
 */
export const getRouteJumpProperty = (routeItem, args = {}) => {
  const { value } = getJumpModeMapping(routeItem)
  if (routeItem[PROPERTY_ROUTE.mode] === JUMP_MODE.P) {
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
 * @param routeItem
 * @param args
 * @returns {{name: *, state: {props}}|{path: *, query}}
 */
export const setRouteJumpProperty = (routeItem, args = {}) => {
  routeItem.routeJump = getRouteJumpProperty(routeItem, args)
}

/**
 * 获取路由参数
 * @param {*} route
 * @param {string} jumpMode
 * @returns
 */
export const getRouteParam = (route, jumpMode) => {
  if (jumpMode === JUMP_MODE.P) {
    return route.query
  } else {
    return history.state.props
  }
}

/**
 * 生成路由项
 * @param routeItem
 * @param modules
 * @param routers
 * @param children
 */
const generateRouteItem = (routeItem, modules, routers, children) => {
  const {
    [PROPERTY_ROUTE.uri]: uri,
    [PROPERTY_ROUTE.path]: path,
    [PROPERTY_ROUTE.name]: name,
    [PROPERTY_ROUTE.mode]: mode,
    [PROPERTY_ROUTE.title]: title,
  } = routeItem
  
  setRouteJumpProperty(routeItem)
  
  routers.push({
    path,
    name,
    props: route => getRouteParam(route, mode),
    component: renameRouteComponent(name, modules[uri]),
    children,
    meta: {
      lang: [ 'zh-cn' ],
      title,
      mode
    }
  })
}

/**
 * 生成路由集
 * @param {*[]} routes
 * @param {*} modules
 * @returns
 */
export const generateRoute = (routes, modules) => {
  
  const routers = []
  
  routes.forEach(routeItem => {
    const {
      [PROPERTY_ROUTE.uri]: uri,
      [PROPERTY_ROUTE.type]: type
    } = routeItem
    
    if (isCanJump(type) && modules[uri]) {
      generateRouteItem(routeItem, modules, routers, null)
    }
  })
  
  return routers
}

export const generateRouteNesting = (routes, modules) => {
  
  
  const routers = []
  
  routes.forEach(routeItem => {
    const {
      [PROPERTY_ROUTE.uri]: uri,
      [PROPERTY_ROUTE.type]: type,
      [PROPERTY_ROUTE.children]: children
    } = routeItem
    
    if (!ArrayUtils.isEmpty(children)) {
      const childrenRoute = generateRoute(children, modules)
      if (isCanJump(type) && modules[uri]) {
        generateRouteItem(routeItem, modules, routers, childrenRoute)
      } else {
        if (!ArrayUtils.isEmpty(childrenRoute)) {
          routers.push(...childrenRoute)
        }
      }
    } else {
      if (isCanJump(type) && modules[uri]) {
        generateRouteItem(routeItem, modules, routers, null)
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
    const { vm } = routeArgs
    if (vm) {
      return VIEW_MODE_MAP[vm]
    }
  }
  
  return ''
}

export default {
  install (app, { router, routeModules, routeConst = {}, titlePrefix = 'Route' }) {
    
    const aliveStore = useAliveStore()
    const authorizeStore = useAuthorizeStore()
    const routeStore = useRouteStore()
    
    const finalRouteConst = {
      ...ROUTE,
      ...routeConst
    }
    
    const defaultRouteJump = candidateRoute => {
      // TODO [存在访问中页面](重定向至访问中页面)
      if (aliveStore.active) {
        return {
          ...toRaw(aliveStore.current[PROPERTY_ROUTE.routeJump])
        }
      }
      
      return candidateRoute
    }
    
    // 👉 BeforeEach
    const onBeforeEach = async (to, from) => {
      // TODO [如果跳转目标为登录页面]
      if (to.path === finalRouteConst.entrance.path) {
        // TODO [如果已认证](拦截登录页面跳转, 重定向至访问中页面或根页面, 只有登出成功后才可访问)
        if (authorizeStore.enable) {
          return defaultRouteJump(finalRouteConst.root.path)
        }
      } else {
        // TODO [如果已认证]
        if (authorizeStore.enable) {
          // TODO 如果跳转目标为根页面
          if (to.path === finalRouteConst.root.path) {
            // TODO 如果存在默认展示页
            const homeRoute = routeStore.source.find(item => item[PROPERTY_ROUTE.home] === VALID.T)
            // TODO 防止无法离开默认展示页
            return defaultRouteJump(homeRoute?.[PROPERTY_ROUTE.path] === from.path ? undefined : homeRoute?.[PROPERTY_ROUTE.routeJump])
          } else {
            const canJumpRoute = routeStore.source.find(item => item[PROPERTY_ROUTE.path] === to.path)
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
        let vmName = ''
        
        if (mode) {
          vmName = ' | ' + getViewModeName(mode === JUMP_MODE.N ? router.options.history.state.props : to.query)
        }
        
        document.title = to.meta.title ? `${titlePrefix} | ${ to.meta.title }${ vmName }` : titlePrefix
        
        let canJumpRoute = routeStore.source.find(item => item[PROPERTY_ROUTE.path] === to.path)
        
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
      if (routeStore.enable) {
        addRoute(finalRouteConst.root.name, generateRoute(routeStore.source, routeModules || _routeComponentsModules))
      }
      
      app.use(router)
    }
    
    // 1, 导航被触发。
    // 2, 在失活的组件里调用 beforeRouteLeave 守卫。
    // 3, 调用全局的 beforeEach 守卫。
    // 4, 在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
    // 5, 在路由配置里调用 beforeEnter。
    // 6, 解析异步路由组件。
    // 7, 在被激活的组件里调用 beforeRouteEnter。
    // 8, 调用全局的 beforeResolve 守卫(2.5+)。
    router.beforeEach(onBeforeEach)
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

export const ROUTE = {
  entrance: {
    path: '/login',
    name: 'login'
  },
  root: {
    path: '/',
    name: 'root'
  }
}