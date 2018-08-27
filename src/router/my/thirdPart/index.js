// 拓展服务
const sellerTool = () => import('../../../components/my/sellerCenter/sellerTool.vue')
const sellerReport = () => import('../../../components/my/sellerCenter/sellerReport.vue')
const extendedService = () => import('../../../components/my/sellerCenter/extendedService.vue')
const marketingCenter = () => import('../../../components/my/sellerCenter/marketingCenter.vue')
const statements = () => import('../../../components/my/sellerCenter/statements.vue')
const coupon = () => import('../../../components/my/buyerCenter/coupon.vue')

export default [
  {
    path: '/sellerCenter/extendedService',
    component: extendedService,
    // component: resolve => require(['../components/my/sellerCenter/extendedService.vue')], resolve),
    name: '扩展服务',
    mata: {
      title: '扩展服务'
    }
  },
  {
    path: '/sellerReport',
    component: sellerReport,
    // component: resolve => require(['../components/my/sellerCenter/sellerReport.vue')], resolve),
    name: '销售报表',
    mata: {
      title: '销售报表'
    }
  },
  {
    path: '/sellerCenter/marketingCenter',
    component: marketingCenter,
    // component: resolve => require(['../components/my/sellerCenter/marketingCenter.vue')], resolve),
    name: '分销中心',

    mata: {
      title: '分销中心'
    }
  },
  {
    path: '/statements',
    component: statements,
    // component: resolve => require(['../components/my/sellerCenter/statements.vue')], resolve),
    name: '对账单',
    mata: {
      title: '对账单'
    }
  },
  {
    path: '/sellerCenter/sellerTool',
    component: sellerTool,
    // component: resolve => require(['../components/my/sellerCenter/sellerTool.vue')], resolve),
    name: '营销工具',
    mata: {
      title: '营销工具'
    }
  },
  {
    path: '/coupon',
    component: coupon,
    // component: resolve => require(['../components/my/buyerCenter/coupon.vue')], resolve),
    name: '优惠券'
  }
]
