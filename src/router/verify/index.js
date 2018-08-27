// 实名认证
const realnameAuthentication = () => import('../../components/my/sellerCenter/realnameAuthentication.vue')
const realnameApplication = () => import('../../components/my/sellerCenter/realnameApplication.vue')
const applicationPersonalCertification = () => import('../../components/my/sellerCenter/applicationPersonalCertification.vue')
const applicationEnterpriseCertification = () => import('../../components/my/sellerCenter/applicationEnterpriseCertification.vue')
// 个人认证支付页面
const personalCertificatePay = () => import('../../components/my/allOrder/personalCertificatePay.vue')
// 企业认证支付页面
const enterpriseCertiPay = () => import('../../components/my/allOrder/enterpriseCertiPay.vue')
const personalCertificate = () => import('../../components/my/sellerCenter/personalCertificate.vue')
const enterpriseCertification = () => import('../../components/my/sellerCenter/enterpriseCertification.vue')
const payCertification = () => import('../../components/my/sellerCenter/payCertification.vue')
const certificationPaySucces = () => import('../../components/my/sellerCenter/certificationPaySucces.vue')
const enterprisePersonCertification = () => import('../../components/my/sellerCenter/enterprisePersonCertification.vue')

export default [
  {
    path: '/sellerCenter/realnameApplication',
    component: realnameApplication,
    // component: resolve => require(['../components/my/sellerCenter/realnameApplication.vue')], resolve),
    name: '未实名认证',
    meta: {
      title: '实名认证'
    }
  },
  {
    path: '/sellerCenter/applicationPersonalCertification',
    component: applicationPersonalCertification,
    // component: resolve => require(['../components/my/sellerCenter/applicationPersonalCertification.vue')], resolve),
    name: '申请个人认证',
    meta: {
      title: '实名认证'
    }
  },
  {
    path: '/personalCertificate',
    component: personalCertificate,
    // component: resolve => require(['../components/my/sellerCenter/personalCertificate.vue')], resolve),
    name: '个人认证',
    meta: {
      title: '实名认证'
    }
  },
  {
    path: '/payment/personalCertificatePay',
    component: personalCertificatePay,
    // component: resolve => require(['../components/my/allOrder/personalCertificatePay.vue')], resolve),
    name: 'personalCertificatePay',
    meta: {
      title: '实名认证'
    }
  },
  {
    path: '/payment/enterpriseCertiPay',
    component: enterpriseCertiPay,
    // component: resolve => require(['../components/my/allOrder/enterpriseCertiPay.vue')], resolve),
    name: 'enterpriseCertiPay',
    meta: {
      title: '实名认证'
    }
  },
  {
    path: '/sellerCenter/applicationEnterpriseCertification',
    component: applicationEnterpriseCertification,
    // component: resolve => require(['../components/my/sellerCenter/applicationEnterpriseCertification.vue')], resolve),
    name: '申请企业认证',
    meta: {
      title: '实名认证'
    }
  },
  {
    path: '/sellerCenter/enterpriseCertification',
    component: enterpriseCertification,
    // component: resolve => require(['../components/my/sellerCenter/enterpriseCertification.vue')], resolve),
    name: '企业认证',
    meta: {
      title: '实名认证'
    }
  },
  {
    path: '/enterprisePersonCertification',
    component: enterprisePersonCertification,
    // component: resolve => require(['../components/my/sellerCenter/enterprisePersonCertification.vue')], resolve),
    name: 'enterprisePersonCertification',
    meta: {
      title: '实名认证'
    }
  },
  {
    path: '/sellerCenter/realnameAuthentication',
    component: realnameAuthentication,
    // component: resolve => require(['../components/my/sellerCenter/realnameAuthentication.vue')], resolve),
    name: '已实名认证'
  },
  {
    path: '/member/payCertification',
    component: payCertification,
    // component: resolve => require(['../components/my/sellerCenter/payCertification.vue')], resolve),
    name: '支付认证费',
    meta: {
      title: '实名认证'
    }
  },
  {
    path: '/certificationPaySucces',
    component: certificationPaySucces,
    // component: resolve => require(['../components/my/sellerCenter/certificationPaySucces.vue')], resolve),
    name: 'certificationPaySucces'
  }
]
