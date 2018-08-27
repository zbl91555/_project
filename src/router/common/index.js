const keyboard = () => import('../../components/home/keyboard.vue')
const keyboards = () => import('../../components/keyboards.vue')
// 倒计时
const countDown = () => import('../../components/common/countDown')
const paySafe = () => import('../../components/my/buyerCenter/paySafe.vue')
const resetPayPsd = () => import('../../components/my/buyerCenter/resetPayPsd.vue')
const forgetPsd = () => import('../../components/my/buyerCenter/forgetPsd.vue')
const forgetPsdNext = () => import('../../components/my/buyerCenter/forgetPsdNext.vue')
const newforgetPsd = () => import('../../components/my/buyerCenter/newforgetPsd.vue')
// 修改身份信息
const modifyId = () => import('../../components/my/buyerCenter/modifyId')
const setData = () => import('../../components/my/setData.vue')
const identityVerifi = () => import('../../components/my/buyerCenter/identityVerifi.vue') // 身份证验证
// 更多物流公司
const sortTest = () => import('../../components/my/allOrder/sortTest.vue')
const groupsentMessage = () => import('../../components/my/sellerCenter/groupsentMessage.vue')
// 查看物流
const checkLogistics = () => import('../../components/my/allOrder/checkLogistics.vue')
const rechargeMethod = () => import('../../components/my/buyerCenter/rechargeMethod.vue')
// 开通余额支付
const dredgeBlancePaid = () => import('../../components/my/allOrder/dredgeBalancePaid.vue')
export default [
  {
    path: '*'
    // component: resolve => require(['../components/home/recommend.vue')], resolve)
  },
  {
    path: '/countDown',
    component: countDown,
    name: 'countDown'
  },
  {
    path: '/paySafe',
    component: paySafe,
    // component: resolve => require(['../components/my/buyerCenter/paySafe.vue')], resolve),
    name: '支付安全',
    meta: {
      title: '支付安全'
    }
  },
  {
    path: '/balance/paySafe/resetPayPsd',
    component: resetPayPsd,
    // component: resolve => require(['../components/my/buyerCenter/resetPayPsd.vue')], resolve),
    name: '重置密码',
    meta: {
      title: '重置密码'
    }
  },
  {
    path: '/verification/:type',
    component: forgetPsd,
    // component: resolve => require(['../components/my/buyerCenter/forgetPsd.vue')], resolve),
    name: '忘记密码',
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/modifyId',
    component: modifyId,
    // component: resolve => require(['../components/my/buyerCenter/modifyId'], resolve),
    name: 'modifyId',
    meta: {
      title: '修改身份信息'
    }
  },
  {
    path: '/newforgetPsd',
    component: newforgetPsd,
    // component: resolve => require(['../components/my/buyerCenter/newforgetPsd'], resolve),
    name: 'newforgetPsd',
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/member/setData',
    component: setData,
    name: '设置资料',
    meta: {
      title: '资料信息'
    }
  },
  {
    path: '/identityVerifi',
    component: identityVerifi,
    // component: resolve => require(['../components/my/buyerCenter/identityVerifi.vue')], resolve),
    name: 'identityVerifi',
    meta: {
      title: '身份证验证'
    }
  },
  {
    path: '/sortTest/:id/:confirmBack?',
    component: sortTest,
    meta: {
      title: '更多物流公司'
    }
  },
  {
    path: '/sellerCenter/groupsentMessage',
    component: groupsentMessage,
    // component: resolve => require(['../components/my/sellerCenter/groupsentMessage.vue')], resolve),
    name: '群发消息',
    mata: {
      title: '群发消息'
    }
  }
]
