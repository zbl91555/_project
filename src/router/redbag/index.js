// 福袋
const luckyBag = () => import('../../components/my/sellerCenter/luckyBag.vue')
const luckyBagrecord = () => import('../../components/my/sellerCenter/luckyBagrecord.vue')
const luckybagDetails = () => import('../../components/my/sellerCenter/luckybagDetails.vue')

export default [
  {
    path: '/sellerCenter/sellerTool/luckyBag',
    component: luckyBag,
    // component: resolve => require(['../components/my/sellerCenter/luckyBag.vue')], resolve),
    name: '福袋'
  },
  {
    path: '/sellerCenter/sellerTool/luckyBagrecord',
    component: luckyBagrecord,
    // component: resolve => require(['../components/my/sellerCenter/luckyBagrecord.vue')], resolve),
    name: '发放福袋记录'
  },
  {
    path: '/sellerCenter/sellerTool/luckybagDetails',
    component: luckybagDetails,
    // component: resolve => require(['../components/my/sellerCenter/luckybagDetails.vue')], resolve),
    name: '福袋详情'
  }
]
