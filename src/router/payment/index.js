// 微信支付 测试
const pay = () => import('../../components/pay.vue')

// 保证金支付页面
const cashDepositPay = () => import('../../components/my/allOrder/cashDepositPay.vue')
// 保证金支付完成页面
const cashDepositPayDown = () => import('../../components/my/allOrder/cashDepositPayDown.vue')
// 支付成功页面
const paySuccess = () => import('../../components/my/allOrder/paySuccess.vue')
const withDrawNextDown = () => import('../../components/my/withDrawNextDown.vue') // 提现完成
const recharge = () => import('../../components/my/buyerCenter/recharge.vue')
const newRecharge = () => import('../../components/my/buyerCenter/newRecharge.vue')
const newRechargeNext = () => import('../../components/my/buyerCenter/newRechargeNext.vue')

export default [
  {
    path: '/pay',
    component: pay,
    meta: {
      title: '支付'
    }
  },
  {
    path: '/withDrawNextDown',
    component: withDrawNextDown,
    // component: resolve => require(['../components/my/withDrawNextDown.vue')], resolve),
    name: 'withDrawNextDown'
  },
  {
    path: '/payment/recharge',
    component: recharge,
    // component: resolve => require(['../components/my/buyerCenter/recharge.vue')], resolve),
    name: 'recharge'
  },
  {
    path: '/newRecharge',
    component: newRecharge,
    // component: resolve => require(['../components/my/buyerCenter/newRecharge.vue')], resolve),
    name: 'newRecharge',
    meta: {
      title: '充值'
    }
  },
  {
    path: '/payment/newRechargeNext',
    component: newRechargeNext,
    // component: resolve => require(['../components/my/buyerCenter/newRechargeNext.vue')], resolve),
    name: 'newRechargeNext',
    meta: {
      title: '充值'
    }
  },
  {
    // path:'/cashDepositPay/:auction_id/:type?/:price?',
    path: '/payment/cashDepositPay',
    component: cashDepositPay,
    // component: resolve => require(['../components/my/allOrder/cashDepositPay.vue')], resolve),
    name: 'cashDepositPay',
    mata: {
      title: '买家保证金'
    }
  },
  {
    path: '/paySuccess/:auction_id',
    component: paySuccess,
    // component: resolve => require(['../components/my/allOrder/paySuccess.vue')], resolve),
    name: 'paySuccess'
  },
  {
    path: '/cashDepositPayDown/:auction_id',
    component: cashDepositPayDown,
    // component: resolve => require(['../components/my/allOrder/cashDepositPayDown.vue')], resolve),
    name: '买家中心-保证金支付完成'
  }
]
