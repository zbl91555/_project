// 首页
const home = () => import(/* webpackChunkName: "home" */ '../../components/Home')

const index = () => import(/* webpackChunkName: "homeIndex" */ '../../components/home/index')

// 优选
const recommend = () => import(/* webpackChunkName: "home" */ '../../components/home/recommend')

// 关注
const focus = () => import(/* webpackChunkName: "home" */ '../../components/home/focus')

const selective = () => import(/* webpackChunkName: "home" */ '../../components/home/selective.vue')

export default [
  {
    path: '/',
    component: home,
    children: [
      {
        path: '/home',
        component: index,
        name: 'index',
        meta: {
          keepAlive: true, // 此组件需要被缓存
          isBack: true, // 用于判断上一个页面是哪个
          requiresAuth: true,
          requiresWx: true,
          title: '淘拍堂'
        }
      },
      {
        path: '/focus',
        component: focus,
        name: 'focus',
        meta: {
          requiresAuth: true,
          title: '淘拍堂',
          isBack: true, // 用于判断上一个页面是哪个
          keepAlive: true // 此组件需要被缓存
        } // 需要登陆
      },
      {
        path: '/recommend',
        name: 'recommend',
        component: recommend,
        meta: {
          title: '淘拍堂',
          isBack: false, // 用于判断上一个页面是哪个
          keepAlive: true // 此组件需要被缓存
        }
      }
    ]
  }, {
    path: '/selective',
    component: selective,
    name: '精选',
    meta: {
      title: '淘拍堂'
    }
  }
]
