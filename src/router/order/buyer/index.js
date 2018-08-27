const buyerOrder = () => import('../../../components/my/buyerCenter/buyerOrder.vue')
const newBuyOrders = () => import('../../../components/my/buyerCenter/newBuyOrders.vue')
const all = () => import('../../../components/my/buyerCenter/all.vue')
const waitPay = () => import('../../../components/my/buyerCenter/waitPay.vue')
const waitSend = () => import('../../../components/my/buyerCenter/waitSend.vue')
const waitGet = () => import('../../../components/my/buyerCenter/waitGet.vue')
const waitEva = () => import('../../../components/my/buyerCenter/waitEva.vue')
const serchOrder = () => import('../../../components/my/buyerCenter/serchOrder.vue')
const returnRequest = () => import('../../../components/my/buyerCenter/returnRequest.vue') // 申请退货

const payRightnow = () => import('../../../components/my/buyerCenter/payRightnow.vue') // 立即支付
const Kojiin = () => import('../../../components/my/buyerCenter/Kojiin.vue') // 小二介入
const afterSale = () => import('../../../components/my/buyerCenter/afterSale.vue') // 小二介入
// 查看物流
const checkLogistics = () => import('../../../components/my/allOrder/checkLogistics.vue')

const buyerWaitPay = () => import('../../../components/my/buyerCenter/buyerWaitPay.vue')
const buyerWaitSend = () => import('../../../components/my/buyerCenter/buyerWaitSend.vue')
const buyerWaitReceive = () => import('../../../components/my/buyerCenter/buyerWaitReceive.vue')
const buyerWaitEvaluate = () => import('../../../components/my/buyerCenter/buyerWaitEvaluate.vue')
const buyerAfterSale = () => import('../../../components/my/buyerCenter/buyerAfterSale.vue')
const buyeralllists = () => import('../../../components/my/buyerCenter/buyeralllists.vue')
const addressInformation = () => import('../../../components/my/addressInformation.vue')
const orderDetail = () => import('../../../components/my/buyerCenter/Orderdetail.vue')
const money = () => import('../../../components/my/buyerCenter/money.vue')
const search = () => import('../../../components/my/buyerCenter/search.vue')
const evaluate = () => import('../../../components/my/buyerCenter/evaluate.vue')

export default [
  {
    path: '/buyerOrder/:type?/:types?',
    component: buyerOrder,
    name: '买家订单'
  },
  // 订单列表
  {
    path: '/newBuyOrders',
    component: newBuyOrders,
    name: 'newBuyOrders',
    children: [{
      path: 'all',
      component: all,
      // component: resolve => require(['../../../components/my/buyerCenter/all.vue')], resolve),
      name: 'all'
    },
    {
      path: 'waitPay',
      component: waitPay,
      // component: resolve => require(['../../../components/my/buyerCenter/waitPay.vue')], resolve),
      name: 'waitPay'
    },
    {
      path: 'waitSend',
      component: waitSend,
      // component: resolve => require(['../../../components/my/buyerCenter/waitSend.vue')], resolve),
      name: 'waitSend'
    },
    {
      path: 'waitGet',
      component: waitGet,
      // component: resolve => require(['../../../components/my/buyerCenter/waitGet.vue')], resolve),
      name: 'waitGet'
    },
    {
      path: 'waitEva',
      component: waitEva,
      // component: resolve => require(['../../../components/my/buyerCenter/waitEva.vue')], resolve),
      name: 'waitEva'
    },
    {
      path: 'serchOrder',
      component: serchOrder,
      // component: resolve => require(['../../../components/my/buyerCenter/serchOrder.vue')], resolve),
      name: 'search-order-buyer'
    }
    ]
  },
  {
    path: '/returnRequest/:order_id/:type',
    component: returnRequest,
    // component: resolve => require(['../../../components/my/buyerCenter/returnRequest.vue')], resolve),
    name: '买家中心-申请退款'
  },
  {
    path: '/payment',
    component: payRightnow,
    name: 'payNow',
    children: [{
      path: 'addressInformation',
      name: 'addressInformation',
      component: addressInformation
      // component: resolve => require(['../../../components/my/addressInformation.vue')], resolve)
    }]
  },
  {
    path: '/checkLogistics/:order_id/:type?',
    component: checkLogistics,
    // component: resolve => require(['../../../components/my/allOrder/checkLogistics.vue')], resolve),
    name: '查看物流'
  },
  {
    path: '/buyerCenter/buyerOrder/buyerWaitPay',
    component: buyerWaitPay,
    // component: resolve => require(['../../../components/my/buyerCenter/buyerWaitPay.vue')], resolve),
    name: '买家中心-待付款'
  },
  {
    path: '/buyeralllists/:types/:orderId',
    component: buyeralllists,
    // component: resolve => require(['../../../components/my/buyerCenter/buyeralllists.vue')], resolve),
    name: '买家中心-该店铺所有订单'
  },
  {
    path: '/buyerCenter/buyerOrder/Kojiin',
    component: Kojiin,
    // component: resolve => require(['../../../components/my/buyerCenter/Kojiin.vue')], resolve),
    name: '买家中心-小二介入'
  },
  {
    path: '/buyerCenter/buyerOrder/buyerWaitSend',
    // component: resolve => require(['../../../components/my/buyerCenter/buyerWaitSend.vue')], resolve),
    component: buyerWaitSend,
    name: '买家中心-待发货'
  },
  {
    path: '/buyerCenter/buyerOrder/buyerWaitReceive',
    // component: resolve => require(['../../../components/my/buyerCenter/buyerWaitReceive.vue')], resolve),
    component: buyerWaitReceive,
    name: '买家中心-待收货'
  },
  {
    path: '/afterSale/:type',
    component: afterSale,
    // component: resolve => require(['../../../components/my/buyerCenter/afterSale.vue')], resolve),
    name: '买家中心-售后'
  },
  {
    path: '/orderDetail/:order_id/:page?',
    component: orderDetail,
    // component: resolve => require(['../../../components/my/buyerCenter/Orderdetail.vue')], resolve),
    name: 'user-order-detail',
    meta: {
      title: '买家中心-订单详情'
    }
  },
  {
    path: '/buyerCenter/buyerOrder/money',
    component: money,
    // component: resolve => require(['../../../components/my/buyerCenter/money.vue')], resolve),
    name: '买家中心-钱款'
  },
  {
    path: '/buyerCenter/buyerOrder/buyerWaitEvaluate',
    // component: resolve => require(['../../../components/my/buyerCenter/buyerWaitEvaluate.vue')], resolve),
    component: buyerWaitEvaluate,
    name: '买家中心-待评价'
  },
  {
    path: '/buyerCenter/buyerOrder/buyerAfterSale',
    // component: resolve => require(['../../../components/my/buyerCenter/buyerAfterSale.vue')], resolve),
    component: buyerAfterSale,
    name: '买家中心-待评价/售后'
  },
  {
    path: '/search/:type',
    // component: resolve => require(['../../../components/my/buyerCenter/search.vue')], resolve),
    component: search,
    name: '搜索'
  },
  {
    path: '/evaluate/:order_id',
    component: evaluate,
    // component: resolve => require(['../../../components/my/buyerCenter/evaluate.vue')], resolve),
    name: '评价'
  }
]
