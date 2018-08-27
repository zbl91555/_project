// 消息
const message = () => import('../../components/message/message.vue')
const dealAndInform = () => import('../../components/message/dealAndInform.vue')
const chatting = () => import('../../components/message/chatting.vue')

// 消息
const news = () => import('../../components/news/HelloWorld.vue')

export default [
  {
    path: '/message',
    name: '消息',
    component: message
  },
  {
    path: '/news/:user_id?',
    name: 'letter',
    component: news,
    meta: {
      title: '消息'
    }
  },
  {
    path: '/message/dealAndInform',
    name: '交易物流与通知',
    component: dealAndInform
  },
  {
    path: '/chatting',
    name: 'chatting',
    component: chatting
  }
]
