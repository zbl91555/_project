<template>
  <div class="artExhibition" ref="artExhibition" :class="{isOpacity : status}">
    <div class="activityImg" ref="ctn" :class="{isOpacity:navFixed}">
      <img src="../../assets/activityimages/tangkaArtExhibition.png" alt="">
    </div>
    <nav :class="{navFixed : navFixed}">
      <div class="tab">
        <div v-for='(item,index) in tabList' :key='item' :class="{selective : type == index + 1}" @click.stop="tabChnage(index)"><span>{{item}}</span></div>
      </div>
    </nav>
    <aside :class="{aside : navFixed}">
      <div class="item" v-for="(item,index) in list" :key="item.uri">
        <swiper dots-position="center" :show-desc-mask="false" :list="item.swiperList" :auto="true" :loop="true">
        </swiper>
        <div class="productInfo">
          <div class="commodityDescription"><span>{{item.title}}</span></div>
          <!-- <div class="commodityEvaluation"><span>估价:￥{{item.gj1}}—￥{{item.gj2}}</span></div> -->
          <div class="commodityEvaluation">
            <div class="currentPrice"><span>当前价:￥{{item.price}}</span></div>
            <!-- <div class="endTime">
              <span>距离结束：</span>
              <span>3</span>
              <span>时</span>
              <span>58</span>
              <span>分</span>
              <span>40</span>
              <span>秒</span>
            </div> -->
            <timeDown :endtime="item.endTime"></timeDown>
          </div>
        </div>
        <div class="followAndOffer">
          <div class="follow" @click.stop="focus(item.uri,index,item.isLiked)"><span>{{item.isLiked? '已关注' : '+关注'}}</span></div>
          <div class="Offer" @click.stop="offer(item.uri)"><span>我要出价</span></div>
        </div>
      </div>
      <load-more v-if="loading" tip="正在加载"></load-more>
      <load-more v-if="elseloading" :show-loading="false" tip="暂无更多数据" background-color="#fbf9fe"></load-more>
    </aside>
    <!-- 弹框 -->
    <!-- <div class="cover" v-if="alert"></div>
    <div class="sharesomething" v-if="alert">
      <div class="alert">
        <div>是否确认取消关注</div>
        <div style="color:rgb(181, 84, 89)" @click.stop="grounding">确定</div>
        <span class="grayTop"></span>
        <div class="cancelTop" @click="closeshowlists">取消 </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { Swiper, SwiperItem, LoadMore } from 'vux'
import { Toast } from 'vant'
import timeDown from './timeDown.vue'
import { getThanka, auctionFocus } from '../../api/api.js'
import assign from '../../assets/js/assign.js' // 混入式方法
export default {
  data () {
    return {
      tabList: ['唐卡艺术', '欧式家具', '明清家具杂项'],
      // select: 0, //tab栏选中
      imgHeight: 0, // 顶部图片的高度
      navFixed: false, // tab栏是否浮动
      alert: false, // 弹出层
      type: 1, // 1唐卡 2欧式 3明清
      page: 0,
      pagenum: 5,
      flag: false,
      list: [], // 渲染列表
      thanka: [], // 唐卡数据
      europeanStyle: [], // 欧式数据
      mingqing: [], // 明清数据
      loading: false,
      elseloading: false,
      saveList: {// 缓存数据
        thanka: '',
        europeanStyle: '',
        mingqing: ''
      },
      isScroll: false, // 当前tab栏是否要悬浮
      num: '', // 定时器
      Initialization: false,
      status: false
    }
  },
  mixins: [assign],
  components: {
    Swiper,
    SwiperItem,
    timeDown,
    LoadMore
  },
  beforeRouteLeave (to, from, next) {
    this.status = true
    // 离开当前页面时 清除定时器
    this.num && clearInterval(this.num)
    // 数据保存到session中
    this.saveData()// 更新离开前要保存的数据
    this.saveList.type = this.type
    sessionStorage.setItem('thankaList', JSON.stringify(this.saveList))
    next()
  },
  created () {
    window.addEventListener('scroll', this.scrollHander)
    // 判断当前有没有列表数据
    let saveList = sessionStorage.getItem('thankaList') && JSON.parse(sessionStorage.getItem('thankaList'))
    if (saveList) {
      let type = this.isType(saveList.type)
      if ((saveList[type].list || []).length > 0) {
        this.saveList = saveList
        this.type = saveList.type
        this.list = this.getSaveData()
        this.flag = this.saveList[type].flag
        this.positionReturn(saveList[type].scroll)
        sessionStorage.removeItem('thankaList')
        return
      }
    };
    this.getData(this.type)
  },
  mounted () {
    // this.$nextTick(_ => {
    //   let num = setInterval(_ => {
    //     if (this.$refs.ctn.offsetHeight > 0) {
    //       this.imgHeight = this.$refs.ctn.offsetHeight;console.log(this.imgHeight,'---height');
    //       clearInterval(num);
    //     }
    //   }, 100);
    // });
  },
  methods: {
    // 数据重置
    dataReset (index) {
      this.select = index
      this.flag = false
      this.list = []
      this.page = 0
      this.type = index + 1
      this.loading = false
      this.elseloading = false
    },
    // tab栏切换
    tabChnage (index) {
      this.isScroll = this.navFixed
      this.saveData()
      this.dataReset(index)
      let type = this.isType()
      if (this.saveList[type] && this.saveList[type].list.length > 0) {
        this.list = this.saveList[type].list
        if (this.saveList[type].scroll < this.imgHeight && this.isScroll) {
          let scroll = this.imgHeight
        } else {
          let scroll = this.saveList[type].scroll
        };
        this.positionReturn(scroll)
        if (this.saveList[type].flag) {
          this.flag = true
        }
      } else {
        if (this.isScroll && this.page == 0) {
          this.Initialization = true
        };
        this.getData()
      }
    },
    // 滚动事件
    scrollHander () {
      if (!this.imgHeight) {
        this.imgHeight = this.$refs.ctn.offsetHeight
      };
      this.tabFixed()
      const st = document.documentElement.scrollTop || document.body.scrollTop
      this.scroll = st
      const ch = this.$refs.ctn.clientHeight
      if (st + window.innerHeight >= ch * 0.5 && !this.flag) {
        this.getData(this.type)
      }
    },
    // 导航栏固定定位
    tabFixed () {
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop
      if (distance >= this.imgHeight || this.Initialization) {
        this.navFixed = true
        this.Initialization = false
      } else {
        this.navFixed = false
      }
    },
    // 出价
    offer (uri) {
      this.$router.push('/auction/' + uri)
    },
    // 关注
    focus (id, index, isLiked) {
      if (isLiked) {
        Toast('您已关注该拍品')
        return
      }
      auctionFocus(id)
        .then(res => {
          this.list[index].isLiked = true
          Toast('关注成功')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取列表数据
    getData () {
      if (this.flag) {
        return
      };
      this.flag = true
      this.loading = true
      var list = this.getSaveData()
      let type = this.isType()
      let params = {
        page: ++this.page,
        pagenum: this.pagenum
      }
      getThanka(this.type, params)
        .then(res => {
          // 分享
          res.data.html && this.goShares(res.data.html)
          this.flag = false
          this.loading = false
          let data
          res.data.items.forEach((item, index) => {
            item.swiperList = []
            let uri = '/auction/' + item.uri
            item.imgList.forEach((items, index) => {
              item.swiperList.push({ img: items, url: uri })
            })
          })
          this[type] = this[type].concat(res.data.items)
          this.list = this[type]
          this.saveData()
          if (this.page == 1 && this[type].length >= 1 && this.isScroll) {
            this.$nextTick(_ => {
              this.navFixed = true
              window.scrollTo(0, this.imgHeight)
              this.Initialization = false
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.loading = false
          this.elseloading = true
        })
    },
    // 数据保存
    saveData () {
      let type = this.isType()
      let params = {
        list: this.list, // 数据列表
        page: this.page, // 当前页码
        pagenum: this.pagenum,
        flag: this.flag, // 限制阀
        scroll: document.documentElement.scrollTop || document.body.scrollTop // scroll
      }
      this.saveList[type] = params
    },
    // 缓存数据获取填充
    getSaveData () {
      let type = this.isType()
      if (this.saveList[type]) {
        this.page = this.saveList[type].page
        this.pagenum = this.saveList[type].pagenum
        return this.saveList[type].list
      }
    },
    // type判断
    isType (type) {
      type = type || this.type
      if (type == 1) {
        return 'thanka'
      } else if (type == 2) {
        return 'europeanStyle'
      } else {
        return 'mingqing'
      }
    },
    // 位置返回
    positionReturn (scroll) {
      clearInterval(this.num)
      let clientHeight = window.innerHeight || document.documentElement.clientHeight
      let totalHeight = scroll + clientHeight
      this.num = setInterval(_ => {
        if (this.$refs.artExhibition.offsetHeight >= totalHeight) {
          window.scrollTo(0, scroll)
          clearInterval(this.num)
        }
      }, 100)
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollHander)
  }
}
</script>

<style>
.artExhibition .vux-slider > .vux-indicator > a, .vux-slider .vux-indicator-right > a {
  margin-right : 0.11rem;
}
.artExhibition  .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img  {
   background-position : center;
}
.artExhibition aside > .item:nth-child(odd) .vux-swiper {
  height: 8.006rem !important;
}
.artExhibition aside > .item:nth-child(even) .vux-swiper {
  height: 8.006rem !important;
}
.artExhibition .vux-indicator-center {
  height: 0rem;
  bottom: -0.7rem !important;
  bottom : -20px!important;
}
.artExhibition .vux-slider {
  overflow: visible;
}
.artExhibition .vux-icon-dot {
  width: 12px !important;
  height: 12px !important;
  border-radius: 50% !important;
  border: solid 1px #c9c9c9 !important;
  background-color: #fff !important;
}
.artExhibition .vux-icon-dot.active {
  background-color: #999 !important;
}
</style>

<style lang="less" scoped>
  .isOpacity {
    opacity : 0;
    transition : all 0.5s ease;
  }
.artExhibition {
  background-color: #f4f4f4;
  padding-bottom : 50px;/*no*/
  .activityImg {
    max-width: 10rem;
    padding-bottom: 11px;

    img {
      width: 100%;
    }
  }
  nav {
    width: 100%;
    height: 92px;
    border-bottom: 1px solid #ebebeb;
    box-sizing: border-box;
    background-color: #fff;

    .tab {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > div {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          width: 1px;
          height: 34px;
          // background-color: #999;
          border-right : 1px solid #999;
          right: 0;
        }

        &:last-child::after {
          border-color: transparent;
        }

        span {
          font-size: 28px;
          height: 100%;
          line-height: 92px;
          text-align: center;
          color: #999;
        }
      }
    }
  }
  .navFixed {
    position: fixed;
    top: 0;
    left: 50%;
    max-width: 10rem;
    z-index: 999;
    transform : translateX(-50%);
  }
  aside {
    .item {
      padding: 22px 22px 0;
      margin-bottom: 21px;
      background-color: #fff;

      .productInfo {
        height: 178px;
        border-bottom: 1px solid #e5e5e5;
        margin : 70px 13px 0;

        .commodityDescription {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: PingFang-SC-ExtraLight;
          font-size: 28px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #010101;
        }
        .commodityEvaluation {
          font-family: PingFang-SC-ExtraLight;
          font-size: 28px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #666666;
          margin:24px 0 8px;
        }
        .priceAndTime {
          font-family: PingFang-SC-ExtraLight;
          font-size: 28px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #666666;
          div:first-child {
            float: left;
          }
          div:last-child {
            // float: right;

            span:nth-child(odd) {
              color: #666;
            }
            span:nth-child(even) {
              color: #c50405;
            }
          }
        }
      }
      .followAndOffer {
        height: 105px;
        position: relative;
        text-align: center;
        div {
          box-sizing: border-box;
        }

        div:first-child {
          position: absolute;
          left: 13px;
          top : 18px;
          width: 113px;
          height: 50px;
          border-radius: 24px;
          border: 1px solid #333333;
          line-height: 48px;
        }
        div:last-child {
          position: absolute;
          right: 13px;
          top: 18px;
          width: 180px;
          height: 54px;
          background-color: #c50405;
          border-radius: 27px;
          line-height: 55px;

          span {
            color: #fff;
          }
        }
      }
    }
  }
  .aside {
    margin-top: 92px;
  }

  // .sharesomething {
  //   position: fixed;
  //   bottom: 0;
  //   left: 50%;
  //   z-index: 999;
  //   width: 100%;
  //   height: 3.9rem !important;
  //   background: white;
  //   text-align: center;
  //   max-width: 10rem;
  //   margin-left: -5rem;
  // }
  // .sharesomething div div {
  //   font-size: 30px;
  // }
  // .sharesomething div div:nth-child(1) {
  //   border-bottom: 1px solid #f2f2f2;
  //   height: 110px;
  //   line-height: 110px;
  //   color: #a2a2a2;
  // }
  // .sharesomething div div:nth-child(2) {
  //   height: 70px;
  //   line-height: 70px;
  //   color: #b55459;
  // }
  // .sharesomething .cancelTop {
  //   height: 80px;
  //   line-height: 80px;
  // }
  // .sharesomething .grayTop:nth-child(2) {
  //   display: none;
  // }
  // .grayTop {
  //   width: 100%;
  //   height: 10px;
  //   background: #ededef;
  //   display: inline-block;
  // }
  .cover {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.38);
    max-width: 10rem;
    z-index: 999;
  }
}

.artExhibition .selective span {
  color: #9e2026 !important;
  border-bottom: 3px solid #9e2026;
  box-sizing: border-box;
  font-weight : 700;
}
</style>
