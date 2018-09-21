<template>
  <div id="app">
    <!--主体内容视图-->
    <transition :name="transitionName" mode="out-in">
        <div  class="main-view">
          <!-- 头部导航 -->
          <navbar v-if="isNavBar" :showIndex='showIndex' :msgLists="msgLists"></navbar>

          <!-- loading -->
          <loading v-model="isLoading" :text="text"></loading>
          <div v-if="isLoading" class="appMask"></div>
          <keep-alive>
              <router-view class="home-view" v-if="$route.meta.keepAlive">
                  <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
                  <recommend></recommend>
                  <index></index>
                  <focus></focus>
              </router-view>
          </keep-alive>

          <router-view class="home-view" v-if="!$route.meta.keepAlive">
              <!-- 这里是不被缓存的视图组件，比如 page3 -->
          </router-view>
        </div>
    </transition>
  </div>
</template>

<script>
import Navbar from './components/common/Navbar.vue' // 用于navbar导航
import { Loading } from 'vux' // loading
import { mapActions, mapState } from 'vuex' // loading

import keyboard from './components/find/find.vue'

import token from './common/token'
import { getSign, category } from './api/api'

import wx from 'weixin-js-sdk'
import assign from './assets/js/assign'
export default {
  components: {
    Navbar,
    Loading,
    keyboard
  },
  // mixins:[assign],
  data () {
    return {
      isIndex: true, // 用于navbar导航
      transitionName: 'slide-left',
      showIndex: 0,
      home: ['recommend', 'focus', 'index'], // 首页高亮的页面
      classifi: ['分类', '分类详情'], // 分类
      find: ['发现'], // 发现
      mine: ['买家中心', '买家中心-订单详情', '设置', '卖家中心', '店铺设置'], // 买家中心
      text: '正在登录中...'
    }
  },

  computed: {
    ...mapState({
      loading: state => state.loading,
      isNavBar: state => state.isNavBar,
      isLoading: state => state.isLoading
    }),
    msgLists () {
      return this.msgList
    }
  },

  watch: {
    $route (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      let ua = window.navigator.userAgent.toLowerCase()
      let uri = ''
      if (ua.match(/micromessenger/i) == 'micromessenger') {
        if (ua.match(/wechatdevtools/i) == 'wechatdevtools') {
          uri = location.href
        } else {
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            uri = this.$store.state.uploadWechatLocation
          } else if (/(Android)/i.test(navigator.userAgent)) {
            uri = location.href
          } else {
            uri = location.href
          }
        }
        if (to.name != 'author') {
          this.getJsSdk(uri)
        }
      }
      // 清除发布信息
      if (localStorage.getItem('uploadInfo')) {
        if (
          to.name != '发布' &&
          to.name != 'upload' &&
          to.name != 'nextUpload' &&
          to.name != 'author' &&
          to.name != '微信号码'
        ) {
          localStorage.removeItem('uploadImg')
          localStorage.removeItem('goodsId')
          localStorage.removeItem('uploadInfo')
        }
      }
      // 清除个人实名认证信息
      if (localStorage.getItem('realNameInformation')) {
        if (
          to.name != '个人认证' &&
          to.name != 'personalCertificatePay' &&
          to.name != 'dredgeBlancePaid'
        ) {
          localStorage.removeItem('realNameInformation')
        }
      }
      // 清除企业实名认证信息
      if (localStorage.getItem('enterpriseRealName')) {
        if (
          to.name != '企业认证' &&
          to.name != 'enterprisePersonCertification' &&
          to.name != 'enterpriseCertiPay' &&
          to.name != 'dredgeBlancePaid'
        ) {
          localStorage.removeItem('enterpriseRealName')
          localStorage.removeItem('storeInformation')
        }
      }
      // 清除Home的数据
      if (sessionStorage.getItem('home')) {
        if (to.name != '首页' && to.name != 'auction') {
          sessionStorage.removeItem('home')
        }
      }
      // 清除recommend的数据
      if (sessionStorage.getItem('recommend')) {
        if (to.name != 'recommend' && to.name != 'auction') {
          sessionStorage.removeItem('recommend')
        }
      }
      // 清除活动页面的数据
      if (sessionStorage.getItem('thankaList')) {
        if (to.name != 'auction' && to.name != 'tangkaArtExhibition') {
          sessionStorage.removeItem('thankaList')
        }
      }
      // 首页高亮的页面
      let val = this.home.some(item => {
        return item == to.name
      })
      if (val) {
        this.showIndex = 0
        return
      } else {
        this.showIndex = 5
      }
      // 分类
      let classifival = this.classifi.some(item => {
        return item == to.name
      })
      if (classifival) {
        this.showIndex = 1
        return
      } else {
        this.showIndex = 5
      }
      // 发现
      let findval = this.find.some(item => {
        return item == to.name
      })
      if (findval) {
        this.showIndex = 2
        return
      } else {
        this.showIndex = 5
      }
      // 我的
      let mineval = this.mine.some(item => {
        return item == to.name
      })
      if (mineval) {
        this.showIndex = 3
      } else {
        this.showIndex = 5
      }
    }
  },
  mounted () {
    // let ua = window.navigator.userAgent.toLowerCase();
    // let uri = "";
    // if (ua.match(/micromessenger/i) == "micromessenger") {
    //   if (ua.match(/wechatdevtools/i) == "wechatdevtools") {
    //     uri = location.href;
    //   } else {
    //     if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //       uri = this.$store.state.uploadWechatLocation;
    //     } else if (/(Android)/i.test(navigator.userAgent)) {
    //       uri = location.href;
    //     } else {
    //       uri = location.href;
    //     }
    //   }
    //   this.getJsSdk(uri);
    // }
    // 首页高亮的页面
    let val = this.home.some(item => {
      return item == this.$route.name
    })
    if (val) {
      this.showIndex = 0
      return
    } else {
      this.showIndex = 5
    }
    // 分类
    let classifival = this.classifi.some(item => {
      return item == this.$route.name
    })
    if (classifival) {
      this.showIndex = 1
      return
    } else {
      this.showIndex = 5
    }
    // 发现
    let findval = this.find.some(item => {
      return item == this.$route.name
    })
    if (findval) {
      this.showIndex = 2
      return
    } else {
      this.showIndex = 5
    }
    // 我的
    let mineval = this.mine.some(item => {
      return item == this.$route.name
    })
    if (mineval) {
      this.showIndex = 3
    } else {
      this.showIndex = 5
    }
  },
  created () {
    this.disabledScale()
    // this.up();
    // 状态保留
    if (token.getToken()) {
      this.$store.dispatch('setAuthUser')
    }
    if (location.hash === '#/author') {
      this.isIndex = false
    }
  },
  methods: {
    // ...mapActions(["startLoding"]),

    // show() {
    //   this.startLoding({ status: true, text: "Loading" });
    // },
    // up() {
    //   this.startLoding({ status: false, text: "Loading" });
    // },
    // 安卓微信端禁止缩放
    disabledScale () {
      function handleFontSize () {
        WeixinJSBridge.invoke('setFontSizeCallback', {
          fontSize: 0
        })
        WeixinJSBridge.on('menu:setfont', function () {
          WeixinJSBridge.invoke('setFontSizeCallback', {
            fontSize: 0
          })
        })
      }
      if (
        typeof WeixinJSBridge == 'object' &&
        typeof WeixinJSBridge.invoke == 'function'
      ) {
        handleFontSize()
      } else {
        if (document.addEventListener) {
          document.addEventListener(
            'WeixinJSBridgeReady',
            handleFontSize,
            false
          )
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', handleFontSize)
          document.attachEvent('onWeixinJSBridgeReady', handleFontSize)
        }
      }
    },
    // 判断是否是微信浏览器
    isWeixin () {
      const ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    isMobile () {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    beforeunloadHandler (e) {}
  },
  destroyed () {
    window.removeEventListener('beforeunload', e =>
      this.beforeunloadHandler(e)
    )
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  /* iPhone微信浏览器禁止文字缩放 */
  -webkit-text-size-adjust: 100% !important;
  text-size-adjust: 100% !important;
  -moz-text-size-adjust: 100% !important;
}
li,
ul {
  list-style: none;
  overflow: scroll;
  /* height: 100%; */
}
img {
  vertical-align: top;
  border: 0 none;
}
a {
  text-decoration: none;
}
a,
a:visited {
  color: #424242;
  text-decoration: none;
}
i {
  font-style: normal;
}
a {
  text-decoration: none;
}
body {
  max-width: 750px;
  margin: 0 auto;
  background: #f4f4f4;
}
#app {
  height: 100%;
}
#app .weui-toast {
  top: 7rem;
}
#app .weui-toast .weui-icon_toast.weui-loading {
  width: 60px;
  height: 60px;
}
#app .weui-toast__content {
  font-size: 28px;
}
/*#app{
    position:absolute;
    height: 600px
  }*/
/* ---------------------------------------- */
main {
  /* main绝对定位，进行内部滚动 */
  position: absolute;
  top: 0;
  bottom: 1.333333rem;
  /* 使之可以滚动 */
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  max-width: 10rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
}

.main-view {
  transition: transform 0.4s ease-in;
}

.slide-left-enter {
  position: absolute !important;
  z-index: 99999;
  width: 100%;
  transform: translate(100%, 0);
}

.slide-right-leave-active {
  position: absolute !important;
  z-index: 99;
  width: 100%;
  transform: translate(100%, 0);
}

.app-nav .tab-bar .icon .icon-camera2 {
  font-size: 0.52rem !important;
}

.appMask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  max-width: 10rem;
  z-index: 991;
  left: 50%;
  margin-left: -5rem;
  background-color: #fff;
}
</style>
