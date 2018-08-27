// 买家中心
const buyerCenter = () => import('../../../components/my/buyerCenter/buyerCenter.vue')
const levelDetail = () => import('../../../components/my/buyerCenter/levelDetail.vue')
const footprint = () => import('../../../components/my/buyerCenter/footprint.vue')
const newFootPrint = () => import('../../../components/my/buyerCenter/newFootPrint.vue') // new足迹
const join = () => import('../../../components/my/buyerCenter/join.vue')
const footer = () => import('../../../components/my/buyerCenter/footer.vue')
const footerFocus = () => import('../../../components/my/buyerCenter/footerFocus.vue')
const watch = () => import('../../../components/my/buyerCenter/watch.vue')
const newProduct = () => import('../../../components/my/buyerCenter/newProduct.vue')
const buyerSet = () => import('../../../components/my/buyerCenter/buyerSet.vue')
const signed = () => import('../../../components/my/buyerCenter/signed.vue')
const contacts = () => import('../../../components/my/buyerCenter/contacts.vue')
const nickName = () => import('../../../components/my/buyerCenter/nickName.vue')
const weChat = () => import('../../../components/my/buyerCenter/weChat.vue')
const addressInformation = () => import('../../../components/my/addressInformation.vue')
const addAddress = () => import('../../../components/my/addAddress.vue')
const editAddress = () => import('../../../components/my/editAddress.vue')
const receiveAddress = () => import('../../../components/my/receiveAddress.vue')

export default [
  {
    path: '/buyerCenter',
    component: buyerCenter,
    name: '买家中心',
    meta: {
      title: '买家中心'
    }
  },
  {
    path: '/buyerCenter/buyerSet',
    component: buyerSet,
    name: '设置'
  },
  {
    path: '/signed/:value?',
    component: signed,
    name: 'signed'
  },
  {
    path: '/nickName/:nickName?',
    component: nickName,
    name: 'nickName'
  },
  {
    path: '/contacts/:val',
    component: contacts,
    name: '联系人'
  },
  {
    path: '/weChat/:wenub',
    component: weChat,
    name: '微信号码'
  },
  {
    path: '/buyerCenter/levelDetail',
    component: levelDetail,
    name: '等级说明'
  },
  {
    path: '/buyerCenter/footprint',
    component: footprint,
    name: '足迹'
  },
  {
    path: '/newFootPrint',
    component: newFootPrint,
    name: 'newFootPrint',
    children: [{
      path: 'join',
      component: join,
      name: 'join'
    },
    {
      path: 'watch',
      component: watch,
      name: 'watch'
    },
    {
      path: 'footerFocus',
      component: footerFocus,
      name: 'footerFocus'
    },
    {
      path: 'footer',
      component: footer,
      name: 'footer'
    }
    ]
  },
  {
    path: '/buyerCenter/newProduct',
    component: newProduct,
    name: '新品开拍'
  },

  {
    path: '/member/addressInformation',
    component: addressInformation,
    // component: resolve => require(['../../../components/my/addressInformation.vue')], resolve),
    name: '地址信息'
  },
  {
    path: '/member/receiveAddress/addAddress/:order_id?/:whichPage?',
    component: addAddress,
    // component: resolve => require(['../../../components/my/addAddress.vue')], resolve),
    name: '新增地址'
  },
  {
    path: '/member/receiveAddress/editAddress',
    component: editAddress,
    // component: resolve => require(['../../../components/my/editAddress.vue')], resolve),
    name: '编辑地址'
  },
  {
    path: '/member/receiveAddress/:type/:pay?/:order_id?',
    component: receiveAddress,
    // component: resolve => require(['../../../components/my/receiveAddress.vue')], resolve),
    name: '收货地址',
    meta: {
      title: '地址管理'
    }
  }
]
