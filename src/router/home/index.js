// 首页
const home = () => import(/* webpackChunkName: "home" */ '../../components/Home.vue')

// 优选
const recommend = () => import(/* webpackChunkName: "home" */ '../../components/home/recommend')
// 关注
const focus = () => import(/* webpackChunkName: "home" */ '../../components/home/focus')

const selective = () => import(/* webpackChunkName: "home" */ '../../components/home/selective.vue')

export default [
  {
    path: '/home',
    component: home,
    name: '首页',
    meta: {
      //   keepAlive : true,
      requiresAuth: true,
      requiresWx: true,
      title: '淘拍堂'
    }
  }, {
    path: '/focus',
    component: focus,
    name: 'focus',
    meta: {
      requiresAuth: true,
      title: '淘拍堂'
    } // 需要登陆
  }, {
    path: '/selective',
    component: selective,
    name: '精选',
    meta: {
      title: '淘拍堂'
    }
  }, {
    path: '/recommend',
    name: 'recommend',
    component: recommend,
    meta: {
      title: '淘拍堂'
    }
  }
]
