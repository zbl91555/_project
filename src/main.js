// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import 'lib-flexible'
import routes from './router/routers.js'
import VueRouter from 'vue-router'
import store from './vuex/store'
import token from './common/token'
import './assets/iconfont/iconfont.css' //字体图标
import Util from './assets/js/util.js'; // 引入公共方法
import { Swiper, DatetimePlugin } from 'vux'
import { PullRefresh } from 'vant'; //引入vant
import wx from 'weixin-js-sdk';
import { getSign, wxShare, openActivity } from './api/api';
import Vconsole from 'vconsole'

let vConsole = new Vconsole();
Vue.use(DatetimePlugin);

Vue.use(PullRefresh); //引入vux
Vue.component('swiper', Swiper); //插件全局注册轮播插件

Vue.use(Util, {
  wx,
  getSign,
  wxShare
});
Vue.use(VueRouter);

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;


let nowTime = Math.round(new Date().getTime() / 1000);
//拦截器 当token的时候每次请求都会携带过去
axios.interceptors.request.use(config => {
  if (token.getToken() && store.state.AuthUser.token_expire > nowTime) {
    config.headers['Authorization'] = 'Bearer ' + token.getToken();
  }
  return config
}, error => {
  return Promise.reject(error)
});

//响应拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  /*if (error.response.status === 401) {
    //清除cookie
    store.commit('unsetAuthUser');
    sessionStorage.setItem('url', document.URL);
    return router.push({
      path: '/author'
    });
  }else if(error.response.status === 503) {
    return router.push('/503Error');
  }else if(error.response.status == 403) {
    if (JSON.parse(error.request.response).code == 40001) {
      store.commit('updateLoadingStatus',{isLoading : false});
      return router.push({
        path : '/errorPage?type=40001&msg=' + JSON.parse(error.request.response).message
      })
    }
  }*/
  switch (error.response.status) {
    case 401:
      //清除cookie
      store.commit('unsetAuthUser');
      sessionStorage.setItem('url', document.URL);
      return router.push({
        path: '/author'
      });
      break;
    case 403:
      switch (JSON.parse(error.request.response).code) {
        case 40001:
          store.commit('updateLoadingStatus', {
            isLoading: false
          });
          return router.push({
            path: '/errorPage?type=40001&msg=' + JSON.parse(error.request.response).message
          });
          break;
        case 40002:
          break;
      }
      break;
    case 503:
      return router.push('/503Error');
      break;

  }
  return Promise.reject(error.response)
});
const routeParams = {
  mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      if (to.name == '首页') {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(savedPosition);
          }, 200)
        })
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    }
  }
};
//页面无底部导航
const urls = [
  '发布',
  'author',
  'personalCertificatePay',
  'cashDepositPay',
  '买家中心-申请退款',
  '买家中心-立即付款',
  '买家订单',
  'signed',
  'nickName',
  '编辑地址',
  'sharedTwoDimensionalCode',
  '推荐有礼-专属二维码',
  '竞拍协议',
  '设置资料',
  '忘记密码',
  'newRecharge',
  'withDrawNext',
  'withDrawNextCash',
  'newRechargeNext',
  '支付安全',
  '重置密码',
  'identityVerifi',
  'modifyId',
  '未实名认证',
  '申请个人认证',
  '个人认证',
  'personalCertificatePay',
  'enterpriseCertiPay',
  '申请企业认证',
  '企业认证',
  'enterprisePersonCertification',
  '消保金',
  'consumerPay',
  'classifySearch',
  '搜索',
  'merchantRecruit',
  'payNow',
  '503Error',
  'nextUpload',
];
let titles = [
  "拍品详情",
  "分类",
  "分类详情",
  "发现",
  "买家中心",
  "卖家中心",
  "个人信息",
  "资料信息",
  "地址管理",
  "实名认证",
  "消保金",
  "出价条件设置",
  "粉丝",
  "屏蔽用户",
  "我的钱包",
  "拍品管理",
  "群发消息",
  "推荐有礼",
  "营销工具",
  "扩展服务",
  "充值",
  "提现",
  "支付安全",
  "重置密码",
  "忘记支付密码",
  "修改身份信息",
  "买家保证金",
  "消息",
  "身份证验证",
  "忘记密码",
  "系统维护中..."
];
//挂载路由
const router = new VueRouter(routeParams);
//vue-router的全局钩子
let isLogin;
let ua = window.navigator.userAgent.toLowerCase();
// 登录后跳转方法
Vue.prototype.goBeforeLoginUrl = () => {
  let url = sessionStorage.getItem('user_hash_path') || '';
  if (url) {
    let routerPath = JSON.parse(sessionStorage.getItem('user_hash_path'));
    router.push(routerPath[routerPath.length - 1]);
  } else {
    url = '/home'
    router.push(url);
  }
};
//活动时间判断
// function activityTime({
//   endTime,
//   openTime
// }, name) {
//   let newTime = new Date().getTime() / 1000;
//   if (newTime > openTime && newTime < endTime) {
//     Vue.set(Vue.prototype.msgList, 2, {
//       iconClass: '',
//       iconClasses: '',
//       linkTo: "/thanka",
//       title: "",
//       selected: false
//     })
//   } else {
//     if (name == '卖家中心' || name == 'auction') {
//       Vue.set(Vue.prototype.msgList, 2, {
//         iconClass: 'icon-camera2',
//         iconClasses: 'icon-camera2',
//         linkTo: "/upload",
//         title: "发布",
//         selected: false
//       })
//     } else {
//       Vue.set(Vue.prototype.msgList, 2, {
//         iconClass: 'icon-faxian2',
//         iconClasses: 'icon-faxian',
//         linkTo: "/find",
//         title: "发现",
//         selected: false
//       })
//     }
//   }
// }
//判断底导航是否需要切换
function isNavChange(name) {
  if (localStorage.getItem('mylink') == 'true') {
    Vue.prototype.msgList[3].linkTo = "/sellerCenter";
  } else {
    Vue.prototype.msgList[3].linkTo = "/buyerCenter";
  };
  if (name == '卖家中心' || name == 'auction') {
    Vue.set(Vue.prototype.msgList, 2, {
      iconClass: 'icon-camera2',
      iconClasses: 'icon-camera2',
      linkTo: "/upload",
      title: "发布",
      selected: false
    })
  } else {
    Vue.set(Vue.prototype.msgList, 2, {
      iconClass: 'icon-faxian2',
      iconClasses: 'icon-faxian',
      linkTo: "/find",
      title: "发现",
      selected: false
    })
  }
  // if (sessionStorage.getItem('activityTime')) {
  //   let activity = JSON.parse(sessionStorage.getItem('activityTime'));
  //   activityTime(activity, name);
  // } else {
  //   openActivity().then(res => {
  //     let time = {
  //       endTime: res.data.eTime,
  //       openTime: res.data.sTime,
  //       img: res.data.img
  //     };
  //     sessionStorage.setItem('activityTime', JSON.stringify(time));
  //     activityTime(time, name);
  //   }).catch(err => {
  //     if (err.status == 404) {
  //       activityTime({endTime:0,newTime:0},name);
  //     }
  //   })
  // }
}
router.beforeEach((to, from, next) => {
  //修改头部title
  /*if (to.name != '店铺首页' && to.name != '卖家信息') {
    let title = titles.find(item => {
      return to.meta.title == item;
    });
    if (title) {
      document.title = title;
    }else {
      document.title = "淘拍堂";
    }
  }*/
  document.title = to.meta.title ? to.meta.title : '淘拍堂';

  //路由发生变化 修改底导航
  isNavChange(to.name);

  if (urls.some((item, index) => {
      return item == to.name
    })) {
    store.commit('revise', false);
  } else {
    store.commit('revise');
  }

  if (to.name != 'author' && to.name != '503Error' && to.name != 'errorPage') {
    store.commit('saveUserPath', to.fullPath);
  }

  if (!store.state.AuthUser.authorization || !token.getRefreshToken() || !token.getToken()) {
    isLogin = false;
  } else {
    isLogin = true;
  }

  if (!store.state.uploadWechatLocation) {
    store.commit('uploadWechatLocation', location.origin + to.fullPath);
  }

  if (!isLogin && to.query.r === "wechat" && ua.match(/micromessenger/i) == 'micromessenger') {
    next({
      path: '/author'
    });
  }

  // 检测路由 权限
  if (to.meta.requiresAuth) {
    if (!store.state.AuthUser.authorization || (token.getToken() && store.state.AuthUser.token_expire > nowTime)) {
      next();
    } else {
      next({
        path: '/author'
      });
    }
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: {
    App
  },
  mounted() {
    window.addEventListener('resize', _ => {
      this.responsive();
    })
  },
  render: h => h(App)
}).$mount('#app')
