const newSellerOrder = () => import('../../../components/my/sellerCenter/newSellerOrder.vue')
const all = () => import('../../../components/my/buyerCenter/all.vue')
const waitPay = () => import('../../../components/my/buyerCenter/waitPay.vue')
const waitSend = () => import('../../../components/my/buyerCenter/waitSend.vue')
const waitGet = () => import('../../../components/my/buyerCenter/waitGet.vue')
const serchOrder = () => import('../../../components/my/buyerCenter/serchOrder.vue')
const agreeReturnMoney = () => import('../../../components/my/allOrder/agreeReturnMoney.vue')
const agreeReturnSale = () => import('../../../components/my/allOrder/agreeReturnSale.vue')
const agreeReturnConfirmReceipt = () => import('../../../components/my/allOrder/agreeReturnConfirmReceipt.vue')
const confirmSend = () => import('../../../components/my/allOrder/confirmSend.vue')
const confirmBack = () => import('../../../components/my/allOrder/confirmBack.vue')
const refuseReturnSale = () => import('../../../components/my/allOrder/refuseReturnSale.vue')
const sellerOrder = () => import('../../../components/my/sellerCenter/sellerOrder.vue')
const lotSorting = () => import('../../../components/my/sellerCenter/lotSorting.vue')
const storeManagement = () => import('../../../components/my/sellerCenter/storeManagement.vue')

export default [
  {
    path: '/newSellerOrder',
    component: newSellerOrder,
    // component: resolve => require(['../components/my/sellerCenter/newSellerOrder.vue')], resolve),
    name: 'newSellerOrder',
    children: [{
      path: 'all',
      component: all,
      // component: resolve => require(['../components/my/buyerCenter/all.vue')], resolve),
      name: 'all'
    },
    {
      path: 'waitPay',
      component: waitPay,
      // component: resolve => require(['../components/my/buyerCenter/waitPay.vue')], resolve),
      name: 'waitPay'
    },
    {
      path: 'waitSend',
      component: waitSend,
      // component: resolve => require(['../components/my/buyerCenter/waitSend.vue')], resolve),
      name: 'waitSend'
    },
    {
      path: 'waitGet',
      component: waitGet,
      // component: resolve => require(['../components/my/buyerCenter/waitGet.vue')], resolve),
      name: 'waitGet'
    },
    {
      path: 'serchOrder',
      component: serchOrder,
      // component: resolve => require(['../components/my/buyerCenter/serchOrder.vue')], resolve),
      name: 'search-order-seller'
    }
    ]
  },

  {
    path: '/agreeReturnMoney/:order_id',
    component: agreeReturnMoney,
    // component: resolve => require(['../components/my/allOrder/agreeReturnMoney.vue')], resolve),
    name: '卖家同意退款'
  },
  {
    path: '/agreeReturnSale/:order_id/:nowpage?/:adresspage?',
    component: agreeReturnSale,
    // component: resolve => require(['../components/my/allOrder/agreeReturnSale.vue')], resolve),
    name: '卖家同意退货'
  },
  {
    path: '/agreeReturnConfirmReceipt/:order_id',
    component: agreeReturnConfirmReceipt,
    // component: resolve => require(['../components/my/allOrder/agreeReturnConfirmReceipt.vue')], resolve),
    name: '卖家同意退货退款'
  },
  {
    path: '/confirmSend/:order_id/:name?/:type?',
    component: confirmSend,
    // component: resolve => require(['../components/my/allOrder/confirmSend.vue')], resolve),
    name: '确认发货'
  },
  {
    path: '/confirmBack/:order_id/:name?/:type?',
    component: confirmBack,
    // component: resolve => require(['../components/my/allOrder/confirmBack.vue')], resolve),
    name: '确认退货'
  },
  {
    path: '/allOrder/refuseReturnSale',
    component: refuseReturnSale,
    // component: resolve => require(['../components/my/allOrder/refuseReturnSale.vue')], resolve),
    name: '卖家拒绝退货'
  },
  {
    path: '/sellerCenter/sellerOrder',
    component: sellerOrder,
    // component: resolve => require(['../components/my/sellerCenter/sellerOrder.vue')], resolve),
    name: '卖家订单'
  },
  {
    path: '/lotSorting',
    component: lotSorting,
    // component: resolve => require(['../components/my/sellerCenter/lotSorting.vue')], resolve),
    name: '拍品排序'
  },
  {
    path: '/sellerCenter/storeManagement/:drafts?',
    component: storeManagement,
    // component: resolve => require(['../components/my/sellerCenter/storeManagement.vue')], resolve),
    name: 'order-seller',
    mata: {
      title: '拍品管理'
    }
  }

]
