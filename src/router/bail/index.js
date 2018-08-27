// 消保金
const payConsumerSecurity = () => import('../../components/my/sellerCenter/payConsumerSecurity.vue')
// 消保金支付
const consumerPay = () => import('../../components/my/allOrder/consumerPay.vue')
const consumerSecurity = () => import('../../components/my/sellerCenter/consumerSecurity.vue')
const withdrawDeposit = () => import('../../components/my/sellerCenter/withdrawDeposit.vue')
const withdrawDepositCash = () => import('../../components/my/sellerCenter/withdrawDepositCash.vue')

export default [
  {
    path: '/payConsumerSecurity',
    component: payConsumerSecurity,
    // component: resolve => require(['../components/my/sellerCenter/payConsumerSecurity.vue')], resolve),
    name: '消保金',
    meta: {
      requiresAuth: true,
      title: '消保金'
    } // 需要登陆
  },
  // 消保金支付
  {
    path: '/payment/consumerPay',
    component: consumerPay,
    // component: resolve => require(['../components/my/allOrder/consumerPay.vue')], resolve),
    name: 'consumerPay',
    meta: {
      requiresAuth: true,
      title: '消保金'
    } // 需要登陆
  },
  {
    path: '/member/consumerSecurity',
    component: consumerSecurity,
    // component: resolve => require(['../components/my/sellerCenter/consumerSecurity.vue')], resolve),
    name: 'consumerSecurity',
    meta: {
      requiresAuth: true,
      title: '消保金'
    } // 需要登陆
  },
  {
    path: '/sellerCenter/withdrawDeposit/:money',
    component: withdrawDeposit,
    // component: resolve => require(['../components/my/sellerCenter/withdrawDeposit.vue')], resolve),
    name: 'withdrawDeposit',
    meta: {
      title: '消保金提现'
    }
  },
  {
    path: '/payment/withdrawDepositCash/:price',
    component: withdrawDepositCash,
    // component: resolve => require(['../components/my/sellerCenter/withdrawDepositCash.vue')], resolve),
    name: 'withdrawDepositCash',
    meta: {
      title: '提现'
    }
  }
]
