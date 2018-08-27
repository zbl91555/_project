// 卖家中心
const fans = () => import('../../../components/my/sellerCenter/fans.vue')

const sellerCenter = () => import('../../../components/my/sellerCenter/sellerCenter.vue')
const shieldingUsers = () => import('../../../components/my/shieldingUsers.vue')

const privateView = () => import('../../../components/my/sellerCenter/privateView.vue') // new 预展

const sellerSetting = () => import('../../../components/my/sellerCenter/sellerSetting.vue')
const fansDetails = () => import('../../../components/my/sellerCenter/fansDetails.vue')

const bidConditions = () => import('../../../components/my/sellerCenter/bidConditions.vue')

export default [
  // 卖家中心
  {
    path: '/sellerCenter',
    component: sellerCenter,
    // component: resolve => require(['../components/my/sellerCenter/sellerCenter.vue')], resolve),
    name: '卖家中心',
    meta: {
      title: '卖家中心'
    }
  },
  {
    path: '/sellerCenter/sellerSetting',
    component: sellerSetting,
    // component: resolve => require(['../components/my/sellerCenter/sellerSetting.vue')], resolve),
    name: '店铺设置',
    meta: {
      title: '个人信息'
    }
  },
  {
    path: '/bidConditions/:setting?',
    component: bidConditions,
    // component: resolve => require(['../components/my/sellerCenter/bidConditions.vue')], resolve),
    name: '买家出价条件设置',
    meta: {
      title: '出价条件设置'
    }
  },
  {
    path: '/shieldingUsers',
    component: shieldingUsers,
    // component: resolve => require(['../components/my/shieldingUsers.vue')], resolve),
    name: '屏蔽用户列表',
    meta: {
      title: '屏蔽用户'
    }
  },
  {
    path: '/fans',
    component: fans,
    // component: resolve => require(['../components/my/sellerCenter/fans.vue')], resolve),
    name: '粉丝列表',
    meta: {
      title: '粉丝'
    }
  },

  // 预展
  {
    path: '/privateView',
    component: privateView,
    // component: resolve => require(['../components/my/sellerCenter/privateView.vue')], resolve),
    name: 'privateViews'
  },

  {
    path: '/member/fansDetails/:user_id?',
    component: fansDetails,
    // component: resolve => require(['../components/my/sellerCenter/fansDetails.vue')], resolve),
    name: '买家信息'
  }
]
