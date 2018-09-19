<template>
  <div class="focus" ref="ctn">
    <tabBar :changeRed="index"></tabBar>
    <!-- 图片瀑布流 -->
    <div class = "main">
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
      <waterfall
              ref="waterfall"
              :class="{ initshow: firstTime }"
              :align="align" :line-gap="gap" :min-line-gap="100" :max-line-gap="maxGap" :single-max-width="300"
              :watch="items"
              @reflowed="reflowed"
      >
        <waterfall-slot v-for="(item, index) in items" :width="item.width" :height="item.height" :order="index" :key="item.uri">
          <div class="item">
            <router-link :to="{name: 'auction', params: {id: item.uri }}">
              <div class="item-image" :style="{ 'background-image': `url(${item.cover})`,'background-position' : 'center top' }"></div>
              <div class="item-cover" :class="{ 'item-loaded': item.loaded }"></div>
            </router-link>
            <div class="info">
              <div v-if="item.sellerAvatar != null " class="avatar" :style="{backgroundImage:'url(' + item.sellerAvatar + ')'}"></div>
              <div v-else class="iconfont icon-wutouxiang"></div>
              <div class="price false">¥
                <span class="money" v-if="item.price > '0'">{{item.price}}</span>
                <span class="money" v-else>{{item.startPrice}}<span> 起</span></span>
              </div>
            </div>
          </div>
        </waterfall-slot>
      </waterfall>
    <!-- </van-pull-refresh> -->

      <!-- loading信息 -->
      <div class="loading-more" v-show="loadingMore">
        <i class="el-icon-loading"></i>
        <span class="loading-text">加载更多...</span>
      </div>
    </div>
    <load-more v-if="elseloading" :show-loading="false" tip="暂无更多数据" background-color="#fbf9fe"></load-more>
  </div>
</template>

<script>
import Waterfall from '../common/waterfall'
import WaterfallSlot from '../common/waterfall-slot'
import { setTimeout, clearTimeout } from 'timers'
import { focusorder } from '../../api/api'
import tabBar from './tabBar'
import assign from '../../assets/js/assign.js' // 混入式方法
import { LoadMore } from 'vux'

export default {
  name: 'focus',
  components: { Waterfall, WaterfallSlot, tabBar, LoadMore },
  props: ['changeRed'],
  changeRed: 2,
  mixins: [assign],
  data () {
    return {
      isLoading: false,
      align: 'center',
      isBusy: false,
      loadingMore: false,
      firstTime: false,
      items: [],
      page: 0,
      pagenum: 10,
      scroll: 0,

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
      _displayTimer: null,
      index: 2,
      num: 0,
      elseloading: false, // 暂无更多数据
      gap: 200,
      maxGap: 220
    }
  },
  beforeRouteLeave (to, from, next) {
    let focus = {
      items: this.items,
      page: this.page,
      scroll: this.scroll
    }
    sessionStorage.setItem('focus', JSON.stringify(focus))
    next()
  },
  mounted () {
    // if (this.isIos()) {
    // let focus = JSON.parse(sessionStorage.getItem('focus'));
    // if (focus && focus.items.length !=0) {
    //   this.items = focus.items;
    //   this.page = focus.page;
    //   this.firstTime = true;
    //   this.$nextTick(_ => {
    //     setTimeout(_ => {
    //       this.scroll = focus.scroll;
    //       if(this.scroll > 0){
    //         window.scrollTo(0,this.scroll);
    //       };
    //     },500)
    //   })
    // }else {
    this.fetchMore()
    // }
    // }else {
    //   this.fetchMore();
    // }
  },
  created () {
    this.row = this.isPc ? 3 : 2
    this.num = this.pagenum
    window.addEventListener('scroll', this.scrollHandler)
    if (this.isPC()) {
      this.gap = 250
      this.maxGap = 300
    } else {
      this.gap = 200
      this.maxGap = 220
    }
  },
  activated () {
    // window.addEventListener('scroll', this.scrollHandler);
    // if (!this.isIos()) {
    // if(this.scroll > 0){
    //   window.scrollTo(0, this.scroll);
    //   this.scroll = 0;
    // };
    // }
  },
  deactivated () {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //       vm.fetchMore();
  //   })
  // },
  methods: {
    // onRefresh() {
    //   this.page = 0;
    //   this.fetchMore('renovate');
    //     setTimeout(() => {
    //       this.$toast('刷新成功');
    //       this.isLoading = false;
    //     }, 500);
    //   },
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
      // 滚动加载数据
      if (this.shouldLoadMore() && (!this.loadingMore && !this.isBusy)) {
        await this.fetchMore()
      }

      // 加载和显示可视区域内的图片
      clearTimeout(this._displayTimer)

      this._displayTimer = setTimeout(() => {
        this.$refs.waterfall.$children.forEach(slot => {
          if (this.isElementInViewport(slot.$el, 50)) {
            const item = this.items[slot.order]
            // const img = new Image();
            // img.onload = () => {
            // item.lazyCover = item.cover;
            item.loaded = true
            // };
            // img.src = item.cover;
          }
        })
      }, this.page <= 1 ? 100 : 50)
    },

    reflowed () {
      this.isBusy = false
    },

    async fetchMore () {
      if (!this.loadingMore && !this.isBusy) {
        if (!(this.num > 0)) {
          this.loadingMore = false
          this.elseloading = true
          return
        }
        this.isBusy = true
        this.loadingMore = true
        this.page += 1
        let params = {
          page: this.page,
          pagenum: this.pagenum
        }
        focusorder(params)
          .then(res => {
            const pageItems = []
            if (res.data.html) {
              // 第一次 分享数据
              // console.log(res.data.html)
              this.goShares(res.data.html)
            }
            if (!res.data.items) {
              // 断掉
              this.isBusy = false
              this.loadingMore = false
            }
            this.num = res.data.items.length || 0;
            (res.data.items || []).forEach((item, i) => {
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
            // if (type == "renovate") {
            //   this.items = pageItems;
            // } else {
            this.items = this.items.concat(pageItems)
            setTimeout(_ => {
              this.scrollHandler()
            })
            // }
            this.loadingMore = false
            this.isBusy = false
            this.firstTime = true
            if (this.page === 1) {
              this.$nextTick(() => {
                // if (!this.count) {
                //   this.loadMore();
                //   this.count++;
                // }
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
    }
  }
}
</script>
<style>
.focus .van-pull-refresh__head {
  font-size: 24px;
}
/* .focus .weui-loadmore_line{
  padding-top : 2.4rem;
} */
</style>
<style scoped lang="less">
/* 修改轮播默认样式 */
.focus .vux-slider > .vux-indicator > a > .vux-icon-dot.active,
.vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
  background-color: #912020;
}
.focus .vux-slider > .vux-indicator > a > .vux-icon-dot,
.vux-slider .vux-indicator-right > a > .vux-icon-dot {
  width: 0.15rem;
  height: 0.15rem;
}
.focus .vux-slider > .vux-indicator > a > .vux-icon-dot,
.vux-slider .vux-indicator-right > a > .vux-icon-dot {
  border-radius: 50%;
}
.focus .vux-slider > .vux-indicator > a,
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
.focus {
  max-width: 750px;
  box-sizing: border-box;
  // overflow-y: scroll;
  padding-bottom: 1.333rem;
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
.focus .vue-waterfall {
  transition: opacity 1s ease-in;
  opacity: 0;
  // padding-bottom : 1.333rem;
}
.focus .item .info {
  position: relative;
  background: #fff;
  bottom: 31px; /*no*/
}
/*瀑布流样式*/
.focus .loading-more {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin: 20px 0;
  color: #999;
}
.focus .loading-text {
  margin-left: 20px;
}
.focus .vue-waterfall {
  width: 100%;
  transition: opacity 1s ease-in;
  opacity: 0;
}
.focus .item .info {
  position: relative;
  background: #fff;
  bottom: 31px; /*no*/
}
.focus .item .info .avatar {
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
.focus .item .info .price {
  line-height: 31px; /*no*/
  text-align: right;
  padding: 0 30px;
  height: 31px; /*no*/
  color: #9e2026;
  font-size: 15px; /*no*/
  font-family: PingFang;
}
.focus .item .info .price .money span {
  font-size: 12px; /*no*/
}
.focus .initshow {
  opacity: 1;
}
.focus .vux-icon-dot {
  display: inline-block;
  vertical-align: middle;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #999;
}
.focus .vux-slider {
  margin: 10px 0;
}
.focus .item {
  position: absolute;
  top: 2px;
  left: 0;
  right: 2px;
  bottom: 5px;
  font-size: 1.2em;
  color: rgb(0, 158, 107);
}
.focus .item-image {
  width: 100%;
  height: 100%;
  // height: calc(~"100% - 60px");
  background-size: contain;
  background-position : center top;
}
.focus .item-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff;
  width: 100%;
  height: calc(~"100% - 31px");
  transition: opacity 0.5s ease-in;
  opacity: 1;
}
.focus .item-loaded {
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
