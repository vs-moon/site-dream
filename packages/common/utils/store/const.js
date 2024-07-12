export const IDS = {
  alive: 'aliveStore',
  authorization: 'authorizationStore',
  dic: 'dicStore',
  menu: 'menuStore'
}

export const REMOTE = {
  dic: 'dic',
  dicType: 'dicType',
  login: 'login',
  logout: 'logout',
  profile: 'profile',
  route: 'route'
}

export const PROPERTY = {
  [IDS.alive]: {
    id: 'id',
    parentId: 'parentId',
    modulePath: 'modulePath',
    jumpMode: 'jumpMode',
    routeJump: 'routeJump',
    routeAction: 'routeAction',
    routePath: 'routePath',
    routeName: 'routeName',
    routeAlive: 'routeAlive',
    menuMode: 'menuMode',
    menuName: 'menuName',
    menuIcon: 'menuIcon',
    children: 'children'
  },
  [IDS.dic]: {
    code: 'code',
    name: 'name',
    color: 'color',
    valid: 'valid',
    disabled: 'disabled'
  }
}