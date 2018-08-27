// 分类部分
const classification = () => import('../../components/classification/classification.vue')
const classificationDetails = () => import('../../components/classification/classificationDetails.vue')
const classifySearch = () => import('../../components/classification/classifySearch.vue')

export default [
  {
    path: '/category',
    name: '分类',
    component: classification,
    meta: {
      title: '分类'
    },
    children: [{
      path: 'categoryDetails/:id?',
      component: classificationDetails,
      name: '分类详情',
      meta: {
        title: '分类详情'
      }
    }]
  },
  {
    path: '/classifySearch',
    name: 'classifySearch',
    component: classifySearch
  }
]
