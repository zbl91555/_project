const storeManagement = () => import('../../components/my/sellerCenter/storeManagement.vue')
const newStoreManage = () => import('../../components/my/sellerCenter/newStoreManage.vue') // new拍品管理
const autioning = () => import('../../components/my/sellerCenter/autioning.vue') // new 竞拍中
const sectionalPat = () => import('../../components/my/sellerCenter/sectionalPat.vue') // new 已截拍
const havePassed = () => import('../../components/my/sellerCenter/havePassed.vue') // new 已流拍
const haveFailed = () => import('../../components/my/sellerCenter/haveFailed.vue') // new 已失败
const manprivateView = () => import('../../components/my/sellerCenter/manprivateView.vue') // 拍品管理预展
const drafts = () => import('../../components/my/sellerCenter/drafts.vue') // new 草稿箱
export default [
  {
    path: '/sellerCenter/storeManagement/:drafts?',
    component: storeManagement,
    name: '拍品管理',
    mata: {
      title: '拍品管理'
    }
  },
  // new 拍品管理
  {
    path: '/newStoreManage',
    component: newStoreManage,
    // component: resolve => require(['../components/my/sellerCenter/newStoreManage.vue')], resolve),
    name: 'newStoreManage',
    meta: {
      title: '拍品管理'
    },
    children: [{
      path: 'manprivateView',
      component: manprivateView,
      // component: resolve => require(['../components/my/sellerCenter/manprivateView.vue')], resolve),
      name: 'manprivateView'
    },
    {
      path: 'autioning',
      component: autioning,
      // component: resolve => require(['../components/my/sellerCenter/autioning.vue')], resolve),
      name: 'autioning'
    },
    {
      path: 'sectionalPat',
      component: sectionalPat,
      // component: resolve => require(['../components/my/sellerCenter/sectionalPat.vue')], resolve),
      name: 'sectionalPat'
    },
    {
      path: 'havePassed',
      component: havePassed,
      // component: resolve => require(['../components/my/sellerCenter/havePassed.vue')], resolve),
      name: 'havePassed'
    },
    {
      path: 'haveFailed',
      component: haveFailed,
      // component: resolve => require(['../components/my/sellerCenter/haveFailed.vue')], resolve),
      name: 'haveFailed'
    },
    {
      path: 'drafts',
      component: drafts,
      // component: resolve => require(['../components/my/sellerCenter/drafts.vue')], resolve),
      name: 'drafts'
    }
    ]
  }
]
