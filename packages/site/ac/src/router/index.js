import { createRouter, createWebHistory } from 'vue-router'
import RouterPlugin, { ROUTE_CONST } from '@vs-common/utils/router/index.js'

export const router = createRouter({
  history: createWebHistory(`${import.meta.env.BASE_URL}sso/box`),
  strict: true,
  routes: [
    {
      ...ROUTE_CONST.entrance,
      meta: {
        lang: [ 'zh-cn' ],
        title: '登录'
      },
      component: () => import('../views/login/index.vue')
    },
    {
      ...ROUTE_CONST.root,
      meta: {
        lang: [ 'zh-cn' ],
        title: '管理'
      },
      component: () => import('@/views/box/index.vue'),
      children: [
        {
          path: '/:error(.*)',
          name: 'error',
          meta: {
            lang: [ 'zh-cn' ],
            title: '异常'
          },
          component: () => import('../views/error/index.vue')
        }
      ]
    }
  ]
})

export default {
  install (app, _options) {
    app.use(RouterPlugin, { router })
  }
}