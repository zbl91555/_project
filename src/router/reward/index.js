// 推广有礼
const PromotionGift = () => import('../../components/my/promotionGift.vue')
const myFans = () => import('../../components/my/buyerCenter/myFans.vue')
const bonus = () => import('../../components/my/buyerCenter/bonus.vue')
const qrCode = () => import('../../components/my/buyerCenter/qrCode.vue')
const qrCodeold = () => import('../../components/my/buyerCenter/qrCodeold.vue')
const promotionGiftDrawMoney = () => import('../../components/my/buyerCenter/promotionGiftDrawMoney.vue')

export default [
  {
    path: '/buyerCenter/PromotionGift',
    component: PromotionGift,
    name: '推荐有礼'
  },
  {
    path: '/myFans',
    component: myFans,
    // component: resolve => require(['../components/my/buyerCenter/myFans.vue')], resolve),
    name: '推荐有礼-我的铁粉',
    mata: {
      title: '推荐有礼'
    }
  },
  {
    path: '/bonus',
    component: bonus,
    // component: resolve => require(['../components/my/buyerCenter/bonus.vue')], resolve),
    name: '推荐有礼-奖金明细',
    mata: {
      title: '推荐有礼'
    }
  },
  {
    path: '/qrCode',
    component: qrCode,
    name: '推荐有礼-专属二维码',
    mata: {
      title: '推荐有礼'
    }
  },
  // {
  //   path: '/qrCodeold',
  //   component: qrCodeold,
  //   // component: resolve => require(['../components/my/buyerCenter/qrCodeold.vue')], resolve),
  //   name: '推荐有礼-专属二维码',
  //   mata: {
  //     title: '推荐有礼'
  //   }
  // },
  {
    path: '/promotionGiftDrawMoney',
    component: promotionGiftDrawMoney,
    // component: resolve => require(['../components/my/buyerCenter/promotionGiftDrawMoney.vue')], resolve),
    name: '推荐有礼-提现',
    mata: {
      title: '推荐有礼'
    }
  }
]
