// 开通余额支付
const dredgeBlancePaid = () => import('../../components/my/allOrder/dredgeBalancePaid.vue')
const drawMoney = () => import('../../components/my/buyerCenter/drawMoney.vue')
const withDrawNext = () => import('../../components/my/withDrawNext.vue') // 提现页面
const withDrawNextCash = () => import('../../components/my/withDrawNextCash.vue') // 2次确认提现页面
const rechargeMethod = () => import('../../components/my/buyerCenter/rechargeMethod.vue')
// 零钱明细
const looseChange = () => import('../../components/my/looseChange.vue')

const balance = () => import('../../components/my/balance.vue')
const touchBalance = () => import('../../components/my/touchBalance.vue')
export default [
  {
    path: '/dredgeBlancePaid/:payRightnow?',
    component: dredgeBlancePaid,
    name: 'dredgeBlancePaid'
  },
  {
    path: '/balanceIndex/:type?',
    component: balance,
    // component: resolve => require(['../components/my/balance.vue')], resolve),
    name: '我的钱包',
    meta: {
      title: '我的钱包'
    }
  },
  {
    path: '/balance/touchBalance',
    component: touchBalance,
    // component: resolve => require(['../components/my/touchBalance.vue')], resolve),
    name: '余额明细'
  },
  {
    path: '/looseChange/:id',
    component: looseChange,
    // component: resolve => require(['../components/my/looseChange.vue')], resolve),
    name: 'looseChange'
  },
  {
    path: '/balance/rechargeMethod',
    component: rechargeMethod,
    // component: resolve => require(['../components/my/buyerCenter/rechargeMethod.vue')], resolve),
    name: '支付'
  },
  {
    path: '/drawMoney',
    component: drawMoney,
    // component: resolve => require(['../components/my/buyerCenter/drawMoney.vue')], resolve),
    name: '提现',
    meta: {
      title: '提现'
    }
  },
  {
    path: '/withDrawNext',
    component: withDrawNext,
    // component: resolve => require(['../components/my/withDrawNext.vue')], resolve),
    name: 'withDrawNext',
    meta: {
      title: '提现'
    }
  },
  {
    path: '/withDrawNextCash/:cash?',
    component: withDrawNextCash,
    // component: resolve => require(['../components/my/withDrawNextCash.vue')], resolve),
    name: 'withDrawNextCash',
    meta: {
      title: '提现'
    }
  }
]
