import Vue from 'vue';
import Vuex from 'vuex';
import token from '../common/token'
import api from '../api/index'
Vue.use(Vuex);

const store = new Vuex.Store({

  modules: {

  },
  state: {
    // 加载loding
    loading: {
      status: false,
      text: 'Loading'
    },
    isLoading: false,
    //登陆状态
    AuthUser: {
      authorization: false,
      token_expire: null,
    },
    addUploadImg: [], //图片列表
    uploadWechatLocation: '', //微信
    addUploadVideo: '', //视频
    isProtocol: true,
    isCover: false, //upload遮罩层
    params: {},
    userPrice: '', //用户余额
    payPrice: '', //缴纳余额
    twoprice: {},
    isNavBar: true,
    urls: [
      '发布',
      'author',
      'personalCertificatePay',
      'cashDepositPay',
      '买家中心-申请退款',
      '买家中心-立即付款',
      '买家中心-立即付款'
    ],
    rechargeYu: '', //需要充值的余额
    cash: '', //余额提现
    revCash: '', //消保金提现
    imgId: [],
  },

  mutations: {
    //保存上传图片的id值
    saveUploadId(state, payload) {
      state.imgId = payload;
    },
    //修改loading状态
    updateLoadingStatus(state, {
      isLoading
    }) {
      state.isLoading = isLoading;
    },
    //消保金提现
    revCash(state, payload) {
      state.revCash = payload
    },
    //提现金额
    cash(state, payload) {
      state.cash = payload
    },
    //需要充值的余额
    rechargeYu(state, payload) {
      state.rechargeYu = payload
    },
    //缴纳消保金 
    payconsumerPrice(state, payload) {
      state.payPrice = payload
    },
    //消保金余额
    consumerPrice(state, payload) {
      state.twoprice = payload
    },
    // 企业实名认证获取数据
    getPersonCompanyMsg(state, payload) {
      state.params = payload
    },
    // 修改loding状态
    // updateLoadingStatus(state, status) {
    //   state.loading.status = status.status;
    //   state.loading.text = status.text;
    // },
    //修改vuex中用户的登录状态
    setAuthUser(state) {
      //设置用户的登录状态
      state.AuthUser.authorization = true;
      //获取保存到localStorage中的数据expires_in
      state.AuthUser.token_expire = token.getLocalItem('expires_in');
    },
    unsetAuthUser(state) {
      state.AuthUser.authorization = false;
      state.AuthUser.token_expire = null;
      token.removeToken();
      token.removeRefreshToken();
    },

    //添加图片列表
    addUploadImg(state, payload) {
      state.addUploadImg.push(...payload);
    },
    //删除图片
    deleteUploadImg(state, {
      index,
      num
    }) {
      num = num || 1;
      state.addUploadImg.splice(index, num);
    },
    //清空图片列表
    clearUploadList(state, payload) {
      state.addUploadImg = [];
    },
    //添加微信签名的地址
    uploadWechatLocation(state, payload) {
      state.uploadWechatLocation = payload;
    },
    //添加视频
    uploadVideo(state, payload) {
      state.addUploadVideo = payload;
    },
    //upload协议
    reviseProtocolClose(state, payload) {
      state.isProtocol = payload
    },
    //用户记录
    saveUserPath(state, payload) {
      let path = sessionStorage.getItem('user_hash_path') ? JSON.parse(sessionStorage.getItem('user_hash_path')) : [];
      if (!Array.isArray(path)) {
        path = new Array(payload);
      } else {
        path.push(payload);
      }
      if (path.length > 10) {
        path = path.splice(path.length - 11);
      }
      sessionStorage.setItem('user_hash_path', JSON.stringify(path));
    },
    //修改底部导航栏状态
    revise(state, payload = true) {
      state.isNavBar = payload;
    }
  },

  actions: {
    // 控制loding
    // startLoding({state, commit},status){

    //   commit('updateLoadingStatus', status)
    // },
    getWechatAuth({
      dispatch
    }) {
      let url = sessionStorage.getItem('url');
      return api.getWechatAuth({
        redirect_url: url
      }).then(response => {
        sessionStorage.removeItem('url');
        dispatch('ReturnWxUri', response.data);
      })
    },
    //打开微信获取签名
    ReturnWxUri({
      dispatch
    }, data) {
      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + data.appId + "&redirect_uri=" + data.redirect + "&response_type=code&scope=" + data.scope + "&state=" + data.state + "#wechat_redirect";
    },

    //登陆请求
    loginWechatRequest({
      dispatch
    }, formData) {
      return api.requestWechatLogin(formData).then(response => {
        if (response.data.userInfo.type) {
          localStorage.setItem('mylink',true);
        } else {
          localStorage.setItem('mylink',false);
        };
        if (response.code == 200 && response.data) {
          dispatch('loginSuccess', response.data)
        } else {
          dispatch('setAuthUser')
        }

      })

    },
    refreshToken({
      dispatch
    }) {
      //调用api的refreshToken 获取返回的数据
      return api.refreshToken().then(response => {
        //调用loginSuccess方法 将数据提交给他
        dispatch('loginSuccess', response.data)
      }).catch(error => {
        dispatch('getWechatAuth')
      })
    },
    //登陆成功
    loginSuccess({
      dispatch
    }, responseData) {
      //保存状态 在localStorage中
      token.setToken(responseData.access_token);
      token.setRefreshToken(responseData.auth_id);
      //token.setLocalItem('loginMenu',responseData.loginMenu)
      //保存状态 在localStorage中
      token.setLocalItem('expires_in', responseData.expires_in);
      dispatch('setAuthUser');

    },
    setAuthUser({
      commit,
      dispatch
    }) {
      //调用mutations中的setAuthUser 修改vuex中用户登录状态
      commit('setAuthUser')
    },
    unsetAuthUser({
      commit
    }) {
      commit('unsetAuthUser')
    },

    setUploadImageParams({
      commit
    }, responseData) {
      commit('setUploadImageParams', responseData);
    }
  }
});

// store.registerModule('vux', { //vux 全局全局loading
//   state: {
//     isLoading: false
//   },
//   mutations: {
// updateLoadingStatus (state, payload) {
//   state.isLoading = payload.isLoading
// }
//   }
// })

export default store;
