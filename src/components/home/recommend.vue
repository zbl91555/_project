<template>
  <div class="recommend" ref="ctn">
    <tabBar :changeRed="changeRed"></tabBar>
      <div class = "main" ref="main"
      @touchstart="touchstart"
      @touchend="touchend">
        <activityEntrance :img="activityImg" :activityEntranceShow="activityEntranceShow"></activityEntrance>
        <!-- 轮播图 -->
        <!-- <swiper :list="demoList" style="width:100%;margin:0 auto;" :aspect-ratio="300/800" height="180px" dots-class="custom-bottom" dots-position="center"></swiper> -->

        <!-- 图片瀑布流 -->
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
        <!-- <div class="mescroll" id="mescroll"> -->
        <waterfall
          ref="waterfall"
          :class="{ initshow: firstTime }"
          :align="align" :line-gap="gap" :min-line-gap="100" :max-line-gap="maxGap" :single-max-width="300"
          :watch="items"
          @reflowed="reflowed"
        >
          <waterfall-slot v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.uri">
            <router-link :to="{name: 'auction', params: {id: item.uri }}">
              <div class="item">
                <div class="item-image" :style="{ 'background-image': `url(${item.cover})`,'background-position' : 'center top' }"></div>
                <div class="item-cover" :class="{ 'item-loaded': item.loaded }"></div>
                <div class="info">
                  <div v-if="item.sellerAvatar != null " class="avatar" :style="{backgroundImage:'url(' + item.sellerAvatar + ')'}"></div>
                  <div v-else class="iconfont icon-wutouxiang"></div>
                  <div class="price false">
                    <span class="money" v-if="item.price > item.startPrice">￥{{item.price}}</span>
                    <span class="money" v-else>￥{{item.startPrice}}<span> 起</span></span>
                  </div>
                </div>
              </div>
            </router-link>
          </waterfall-slot>
        </waterfall>
        <!-- </div> -->
        <!-- </van-pull-refresh> -->
        <!-- loading信息 -->
        <div class="loading-more" v-show="loadingMore">
          <i class="el-icon-loading"></i>
          <span class="loading-text">加载更多...</span>
        </div>

        <!-- 绑定手机号 -->
        <div class="loginValidation" v-show="bindphone">
            <div class="maskout"></div>
            <div class="login" v-show="show">
              <i class="iconfont icon-guanbi" @click="close()"></i><p>登录</p>
              <div class="phone" @touchstart.stop="focus('phones')">
                <span class="phones">{{ phones }}</span>
                <p class="placeholder" v-show="phones.length === 0">请输入手机号</p>
              </div>
              <i class="tipe" v-show="verificationCode"> {{tipe}} </i>
              <div class="nextStep" @click="nextStep()" :class="{ selected: hasvalidation }">下一步</div>
            </div>
            <div class="validation" v-show="shows">
              <i class="iconfont icon-guanbi" @click="closes()"></i>
              <p>请输入验证码</p>
              <div class="region">
                {{phones}}
                <i class="time">{{count}}s</i>
              </div>
              <div class="phone" @touchstart.stop="focus('Verification')">
                <span class="Verification">{{ Verification }}</span>
                <p class="placeholder" v-show="Verification.length === 0">请输入验证码</p>
              </div>
              <i class="tipe" v-show="verificationCodes"> {{tipes}} </i>
              <div class="nextStep" @click="login()" :class="{ selected: hasvalidations }" >登录</div>
            </div>
        </div>
        <!-- 自定义键盘 -->
        <keyboard :show="keyboard" @typing="typing"/>
      </div>
      <load-more v-if="elseloading" :show-loading="false" tip="暂无更多数据" background-color="#fbf9fe"></load-more>
  </div>
</template>

<script>
import {
  Tab,
  TabItem,
  Sticky,
  Divider,
  XButton,
  Swiper,
  GroupTitle,
  SwiperItem,
  LoadMore
} from 'vux'
import Waterfall from '../common/waterfall'
import WaterfallSlot from '../common/waterfall-slot'
import { setTimeout, clearTimeout } from 'timers'
import keyboard from '../keyboards' // 数字键盘
import Cookies from 'js-cookie' // cookie
import tabBar from './tabBar'
import { mapState } from 'vuex'
import activityEntrance from '../activityPage/activityEntrance.vue'

import {
  getRecommend,
  loginMobile,
  getLoginMobileCode,
  category,
  openActivity
} from '../../api/api'
import assign from '../../assets/js/assign.js' // 混入式方法

export default {
  name: 'recommend',
  components: {
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    GroupTitle,
    Waterfall,
    WaterfallSlot,
    keyboard,
    tabBar,
    LoadMore,
    activityEntrance
  },
  mixins: [assign],
  data () {
    return {
      isFirstEnter: false, // 是否第一次进入，默认false
      scroll: 0,
      isLoading: false,
      // demoList: demoList,
      changeRed: 0,
      timeLists: [
        {
          text: '优选',
          link: '/recommend'
        },
        {
          text: '淘淘',
          link: '/home'
        },
        {
          text: '关注',
          link: '/focus'
        }
      ],
      align: 'center',
      isBusy: false,
      loadingMore: false,
      firstTime: false,
      items: [],
      page: 0,
      pagenum: 15,
      _displayTimer: null,
      show: true,
      shows: false,
      count: '',
      hasvalidation: false,
      hasvalidations: false,
      verificationCode: false,
      verificationCodes: false,
      phones: '',
      Verification: '',
      middleType: 'phones',
      tipe: '',
      tipes: '',
      message: '',
      key: '',
      bindphone: false,

      // 键盘相关data
      cursor: false,
      keyboard: false,
      keyboardTips: false,
      val: '',
      aIllegal: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '0..',
        '.'
      ],
      cursorDuration: 600,
      bodyHeight: '',
      bodyOverflow: '',
      index: 0,
      num: 0,
      // mescroll : {},
      elseloading: false, // 暂无更多数据
      row: '',
      gap: 280,
      maxGap: 300,
      activityEntranceShow: false, // 活动页面是否展示
      activityImg: ''
    }
  },
  props: {
    value: '',
    inter: {
      default: 11
    },
    decimal: {
      default: 2
    }
  },
  computed: {
    ...mapState({
      WxSign: state => state.WxSign
    })
  },
  // 页面离开时 保存数据
  beforeRouteLeave (to, from, next) {
    let recommend = {
      items: this.items,
      page: this.page,
      scroll: this.scroll,
      isBusy: this.isBusy
    }
    sessionStorage.setItem('recommend', JSON.stringify(recommend))
    next()
  },
  beforeRouteEnter (to, from, next) {
    if (from.name == 'auction') {
      to.meta.isBack = true
      // 判断是从哪个路由过来的，
      // 如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }
    next()
  },
  methods: {
    // 活动接口
    openActivity ({ endTime, openTime, img }) {
      let newTime = new Date().getTime() / 1000
      if (newTime > openTime && newTime < endTime) {
        this.activityEntranceShow = true
      } else {
        this.activityEntranceShow = false
      }
      this.activityImg = img
    },
    // 移动端事件
    touchstart (e) {
      this.startY = e.touches[0].clientY
    },
    // touchmove(e) {
    //   console.log('move',e);
    // },
    touchend (e) {
      this.endY = e.changedTouches[0].clientY
      if (this.endY > this.startY) {
        this.$store.commit('revise', true)
      } else {
        this.$store.commit('revise', false)
      }
    },
    // ios位置返回
    positionReturn (home, num) {
      if (this.$refs.main.offsetHeight > this.scroll) {
        if (this.scroll > 0) {
          window.scrollTo(0, this.scroll)
          clearInterval(num)
        }
      }
    },
    isElementInViewport (el, offset = 0) {
      const box = el.getBoundingClientRect()
      const top = box.top >= -offset
      const left = box.left >= -offset
      const bottom =
        box.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) + offset
      const right =
        box.right <=
        (window.innerWidth || document.documentElement.clientWidth) + offset
      return top && left && bottom && right
    },
    shouldLoadMore () {
      const st = document.documentElement.scrollTop || document.body.scrollTop
      this.scroll = st
      const ch = this.$refs.ctn.clientHeight
      return st + window.innerHeight >= ch * 0.5
    },
    async scrollHandler () {
      // 加载和显示可视区域内的图片
      clearTimeout(this._displayTimer)
      this._displayTimer = setTimeout(() => {
        this.$refs.waterfall && this.$refs.waterfall.$children.forEach(slot => {
          if (this.isElementInViewport(slot.$el, 50)) {
            const item = this.items[slot.order]
            // const img = new Image();
            // img.onload = () => {
            item.loaded = true
            // };
            // img.src = item.cover;
          }
        })
      }, this.page <= 1 ? 100 : 50)
      // 滚动加载数据
      if (this.shouldLoadMore() && (!this.loadingMore && !this.isBusy)) {
        await this.fetchMore()
      }
    },
    reflowed () {
      this.isBusy = false
    },
    // 瀑布流加载数据
    async fetchMore () {
      if (!this.loadingMore && !this.isBusy) {
        if (!(this.num > 0)) {
          this.loadingMore = false
          this.elseloading = true
          return
        }
        if (sessionStorage.getItem('recommend')) {
          return
        }
        this.isBusy = true
        this.loadingMore = true
        this.page += 1
        let params = {
          page: this.page,
          pagenum: this.pagenum
        }
        getRecommend(params)
          .then(res => {
            const pageItems = []
            if (res.data.html) {
              // 第一次 分享数据
              this.goShares(res.data.html)
            }

            if (!res.data.items) {
              // 断掉
              this.isBusy = false
              this.loadingMore = false
            }
            this.num = res.data.items.length || 0
            const items = res.data.items || []
            items.forEach((item, i) => {
              let coverUrl
              coverUrl = item.cover
              const m = coverUrl.match(/-W(\d+?)H(\d+)/)
              if (!m) {
                let img = new Image()
                img.onload = () => {
                  item.width = img.width
                  item.height = img.height
                  item.loaded = false
                  item.lazyCover = ''
                  pageItems.push(item)
                }
                img.src = item.coverUrl
              } else {
                coverUrl = coverUrl.substring(0, coverUrl.length - 6)
                if (m && m.length >= 3) {
                  item.width = parseInt(m[1])
                  item.height = parseInt(m[2])
                  item.loaded = false
                  item.lazyCover = ''
                  pageItems.push(item)
                }
              }
            })
            this.items = this.items.concat(pageItems)
            this.loadingMore = false
            this.isBusy = false
            this.firstTime = true
            if (this.page === 1) {
              this.$nextTick(() => {
                this.scrollHandler()
              })
            }
          })
          .catch(err => {
            this.loadingMore = false
            this.elseloading = true
            this.isBusy = true
            // this.$store.commit("updateLoadingStatus", { isLoading: false });
            this.page--
          })
      }
    },
    // 瀑布流相关操作End

    // tab点击跳转End

    // 点击发布按钮
    upload () {
      this.$router.push({ path: '/upload' }) // 允许发布
    },
    // 关闭手机号弹窗及键盘
    close () {
      this.show = false
      this.bindphone = false
      this.keyboard = false
    },
    // 关闭验证码弹窗及键盘
    closes () {
      this.shows = false
      this.bindphone = false
      this.keyboard = false
    },
    // 输入手机号下一步
    nextStep () {
      let _this = this
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (_this.val == '') {
        _this.verificationCode = true
        _this.tipe = '*请输入手机号！'
      } else if (!reg.test(this.val)) {
        _this.verificationCode = true
        _this.tipe = '*手机号输入有误，请重新输入！'
      } else {
        _this.show = false
        _this.shows = true
        _this.middleType = 'Verification'
        _this.focus('Verification')
        let TIME_COUNT = 60
        if (!this.timer) {
          this.count = TIME_COUNT
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      }
    },

    login () {
      let _this = this
      if (_this.Verification == '') {
        _this.verificationCodes = true
        _this.tipes = '*请输入验证码！'
      } else if (!(_this.Verification.length == 4)) {
        _this.verificationCodes = true
        _this.tipes = '*验证码输入有误，请重新输入！'
      } else {
        _this.verificationCodes = false
        let params = {
          phone: this.phones,
          type: 0
        }
        login(params)
          .then(function (response) {
            if (response.code == 200) {
              _this.key = response.data.key
              _this.bindPhone()
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    // 用户绑定手机号
    bindPhone () {
      let _this = this
      let params = {
        verification_key: this.key,
        verification_code: '1234',
        type: 0
      }
      bindPhone(params)
        .then(function (res) {
          if (res.code == 200) {
            _this.keyboard = false
            _this.shows = false
            _this.bindphone = false // 关闭整个弹窗
            // refreshToken存在cookies 有效期设置30天
            // Cookies.set('refreshToken',res.data.refreshToken,{ expires: 30 });
            // access_token添加到请求头 全局设置拦截器
            sessionStorage.setItem('access_token', res.data.access_token)
            let myDate = new Date() // 当前时间
            let currenTime = Date.parse(new Date(myDate)) / 1000
            // console.log(currenTime)
            sessionStorage.setItem('expires_in', currenTime)
            location.reload() // 刷新页面
            _this.$router.push({ path: '/upload' })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    // 键盘事件相关操作start
    focus ($event) {
      // console.log($event)
      this.showKeyboard($event) // 显示键盘
      this.val = ''
      if (this.middleType == 'phones') {
        this.phones = this.val // 手机号
      } else {
        this.Verification = this.val // 验证码
      }
    },
    showKeyboard ($event) {
      this.middleType = $event
      this.keyboard = true
    },
    hideKeyboard () {
      this.keyboard = false // 键盘关闭
    },
    notify () {
      if (this.middleType == 'phones') {
        this.phones = this.val // 手机号
      } else if (this.middleType == 'Verification') {
        this.Verification = this.val // 验证码
      }
    },
    del () {
      /* 删除值并不会触发值的校验, 所以需要手动再触发一次 */
      this.val = this.val.slice(0, -1)
      this.notify()
      if (this.middleType == 'phones') {
        this.phones = this.val // 手机号
      } else if (this.middleType == 'Verification') {
        this.Verification = this.val // 验证码
      }
    },
    /* 输入 */
    typing (value) {
      if (this.middleType == 'phones') {
        this.hasvalidation = true // 高亮
      } else {
        this.hasvalidations = true // 高亮
      }
      /* 如果是点击删除 */
      if (value === '') {
        this.del()
        if (this.middleType == 'phones') {
          this.hasvalidation = false // 高亮
        } else {
          this.hasvalidations = false // 高亮
        }
        this.verificationCode = false
      }
      /* 保存旧的值 */
      let oldValue = this.val
      /* 获取新的值 */
      this.val = this.val + value
      /* 检验新值, 如果没有通过检测, 恢复值 */
      if (!this.passCheck(this.val)) {
        this.val = oldValue
        return
      }
      /* 为了让外界同步输入, 需要发送事件 */
      this.notify()
      if (this.middleType == 'phones') {
        this.phones = this.val // 手机号
      } else if (this.middleType == 'Verification') {
        this.Verification = this.val // 验证码
      }
    },
    passCheck (val) {
      /* 验证规则 */
      let aRules = [this.illegalInput, this.illegalValue, this.accuracy]
      return aRules.every(item => {
        return item(val)
      })
    },
    illegalInput (val) {
      if (this.aIllegal.indexOf(val) > -1) {
        return false
      }
      return true
    },
    /* 非法值 */
    illegalValue (val) {
      if (parseFloat(val) != val) {
        return false
      }
      return true
    },
    /* 验证精度 */
    accuracy (val) {
      let v = val && val.split('.')
      if (this.middleType == 'phones') {
        if (v[0].length > this.inter) {
          return false
        }
      } else {
        if (v[0].length > 4) {
          return false
        }
      }
      if (v[0].length > this.inter) {
        return false
      }
      if (v[1] && v[1].length > this.decimal) {
        return false
      }
      return true
    }
    // 键盘事件相关操作End
  },
  activated () {
    // window.addEventListener('scroll', this.scrollHandler);
    // if (!this.isIos()) {
    // if (this.scroll > 0) {
    //   window.scrollTo(0, this.scroll);
    // }
    // }

    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.str = ''// 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.fetchMore()
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false
  },
  created () {
    this.num = this.pagenum
    if (sessionStorage.getItem('activityTime')) {
      let time = JSON.parse(sessionStorage.getItem('activityTime'))
      this.openActivity(time)
    } else {
      openActivity().then(res => {
        let time = {
          endTime: res.data.eTime,
          openTime: res.data.sTime,
          img: res.data.img
        }
        sessionStorage.setItem('activityTime', JSON.stringify(time))
        this.openActivity(time)
      }).catch(err => {
        this.activityEntranceShow = false
      })
    }
    window.addEventListener('scroll', this.scrollHandler)
    if (this.isPC()) {
      this.gap = 250
      this.maxGap = 300
    } else {
      this.gap = 200
      this.maxGap = 220
    }
    this.isFirstEnter = true
    // 只有第一次进入或者刷新页面后才会执行此钩子函数
    // 使用keep-alive后（2+次）进入不会再执行此钩子函数
  },
  mounted () {
    let data = sessionStorage.getItem('recommend')
    if (data) {
      let recommend = JSON.parse(data)
      this.items = recommend.items
      this.page = recommend.page
      this.firstTime = true
      this.isBusy = recommend.isBusy
      this.$nextTick(_ => {
        if (this.isIos()) {
          this.scroll = recommend.scroll
          let num = setInterval(_ => {
            this.positionReturn(recommend, num)
          }, 100)
        }
      })
      // 清除数据
      sessionStorage.removeItem('recommend')
    } else {
      this.fetchMore()
    }
  },
  deactivated () {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollHandler)
  }
}
</script>
<style>
.recommend .van-pull-refresh__head {
  font-size: 24px;
}
/* .recommend .weui-loadmore_line{
  padding-top : 2.4rem;
} */
</style>
<style scoped lang="less">
/* 修改轮播默认样式 */
.recommend .vux-slider > .vux-indicator > a > .vux-icon-dot.active,
.vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
  background-color: #912020;
}
.recommend .vux-slider > .vux-indicator > a > .vux-icon-dot,
.vux-slider .vux-indicator-right > a > .vux-icon-dot {
  width: 0.15rem;
  height: 0.15rem;
}
.recommend .vux-slider > .vux-indicator > a > .vux-icon-dot,
.vux-slider .vux-indicator-right > a > .vux-icon-dot {
  border-radius: 50%;
}
.recommend .vux-slider > .vux-indicator > a,
.vux-slider .vux-indicator-right > a {
  margin-left: 0.14rem;
}
/*去除滚动条*/
// ::-webkit-scrollbar{
//   width:0 ;
//   height:0 ;
//   display:none;
// }

/*导航栏样式*/
.recommend {
  max-width: 750px;
  box-sizing: border-box;
  // overflow-y: scroll;
  padding-bottom: 1.333rem;
  font-family: PingFang;
}

.main {
  padding-top: 1rem;
  background-color: #eee;
  // padding-bottom: 1.333rem;
  // overflow-y: scroll;
}
.icon-wutouxiang {
  position: absolute;
  top: -32px;
  left: 20px;
  color: #d2d2d2;
  margin: 0;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 0.983333rem;
  font-size: 48px;
  background: #f4f4f4;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid #d6d6d6;
}
/*加载更多样式*/
.loading-more {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin: 20px 0;
}
.loading-text {
  margin-left: 20px;
  color: #999;
}

/*瀑布流样式*/
.recommend .vue-waterfall {
  transition: opacity 1s ease-in;
  opacity: 0;
  // padding-bottom : 1.333rem;
}
.recommend .item .info {
  position: relative;
  background: #fff;
  bottom: 31px; /*no*/
}
/*瀑布流样式*/
.recommend .loading-more {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin: 20px 0;
  color: #999;
}
.recommend .loading-text {
  margin-left: 20px;
}
.recommend .vue-waterfall {
  width: 100%;
  transition: opacity 1s ease-in;
  opacity: 0;
}
.recommend .item .info {
  position: relative;
  background: #fff;
}
.recommend .item .info .avatar {
  position: absolute;
  top: -14px; /*no*/
  left: 20px;
  width: 28px; /*no*/
  height: 28px; /*no*/
  background-color: #dc7a7a;
  // border: solid 1px #c8c8c8;
  border-radius: 50%;
  background-size: contain;
  background-position: center top;
  background-repeat: no-repeat;
  z-index: 2;
  box-sizing: border-box;
}
.recommend .item .info .price {
  line-height: 31px; /*no*/
  text-align: right;
  padding: 0 30px;
  height: 31px; /*no*/
  color: #9e2026;
  font-size: 15px; /*no*/
  font-family: PingFang;
}
.recommend .item .info .price .money span {
  font-size: 12px; /*no*/
}
.recommend .initshow {
  opacity: 1;
}
.recommend .vux-icon-dot {
  display: inline-block;
  vertical-align: middle;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #999;
}
.recommend .vux-slider {
  margin: 10px 0;
}
.recommend .item {
  position: absolute;
  top: 2px;
  left: 0;
  right: 2px;
  bottom: 2px;
  font-size: 1.2em;
  color: rgb(0, 158, 107);
}
.recommend .item-image {
  width: 100%;
  height: 100%;
  // height: calc(~"100% - 60px");/*no*/
  background-size: contain;
  background-position : center top;
}
.recommend .item-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff;
  width: 100%;
  // height: calc(~"100% - 31px");
  transition: opacity 0.5s ease-in;
  opacity: 1;
}
.recommend .item-loaded {
  opacity: 0;
}

/*绑定手机号样式*/
.loginValidation {
  position: fixed;
  display: none;
  top: 0;
  right: 0;
  bottom: -4.32rem;
  left: 0;
  z-index: 9999;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  bottom: 0;
  display: block;
}
.loginValidation .maskout {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
}
.loginValidation .login,
.validation {
  width: 494px;
  height: 320px;
  padding: 52px 73px 68px 73px;
  background-color: #fff;
  border-radius: 8px;
  position: fixed;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  top: 2rem;
  bottom: auto;
}
.loginValidation .validation {
  height: 430px;
}
.loginValidation .phone .placeholder {
  text-align: left;
  font-size: 34px;
  color: #999;
}
.loginValidation p,
.validation p {
  text-align: center;
  font-size: 38px;
  margin: 0 auto 0px auto;
}
.loginValidation .phone,
.region {
  height: 116px;
  line-height: 116px;
  font-size: 31px;
  border-bottom: 1px solid #e5e5e5;
}
.loginValidation .login .region {
  display: none;
}
.loginValidation .phone {
  margin-bottom: 20px;
}
.loginValidation .nextStep {
  width: 494px;
  height: 86px;
  background-color: #d2d2d2;
  border-radius: 5px;
  text-align: center;
  line-height: 86px;
  color: #fff;
  font-size: 30px;
  margin-top: 40px;
}
.loginValidation .validation .nextStep {
  background-color: #d2d2d2;
}
.loginValidation .icon-right {
  font-size: 28px;
  color: #999;
  float: right;
}
.loginValidation .time {
  float: right;
  font-size: 28px;
  color: #9e2026;
}
.loginValidation .icon-guanbi {
  position: absolute;
  right: 30px;
  top: 30px;
  color: #d2d2d2;
  font-size: 60px;
}
.loginValidation input {
  background: none;
  outline: none;
  border: 0px;
  color: #000;
  font-size: 32px;
}
.loginValidation input::-webkit-input-placeholder {
  color: #999;
}
.loginValidation .selected {
  background-color: #9e2026;
}
.loginValidation .validation .selected {
  background-color: #9e2026;
}
.loginValidation .tipe {
  font-size: 24px;
  display: inline-block;
  text-align: left;
  color: #9e2026;
}
</style>
