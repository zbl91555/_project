<template>
  <div class="recommend-templete" ref="ctn">
    <tabBar :changeRed="index"></tabBar>
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <div class ="main">
      <div class="saleList" v-for = "(item,indexs) in userData" :key = "item.uri">
        <div class="saleItem">
          <div class="seller">
            <router-link  :to="{name: '店铺首页', params: {user_id: item.uri}}">
              <div class="avatar">
                <div class="backgroundImg" v-bind:style ="{ backgroundImage: 'url(' + item.avatar + ')'}" > </div>
              </div>
              <div class="nickName">{{item.name}}</div>
          </router-link>
          <div class="attentionIt" @click="focusShop(item.isAttention,item.uri,indexs)" v-show="item.isAttention==true">
              <span>已关注</span> 
            </div>
            <div class="attentionIts attentionIt" @click="focusShop(item.isAttention,item.uri,indexs)" v-show="item.isAttention==false">
              <i class="iconfont icon-untitled44"></i>
              <span>关注</span> 
            </div> 
          </div>
          <swiper dots-position="center" >
            <swiper-item  v-for = "(list,index) in item.shopList" :key="list.uri">
              <div class = "isAuction" v-if="list.isPreview"><span>预展中</span></div>
                <router-link :to="{name: 'auction', params: {id: list.uri }}">
                <div class="lotPic" v-bind:style ="{ backgroundImage: 'url(' + list.img + ')'}">
                  <i class="desc">{{list.desc}}</i>
                </div>
              </router-link>
              <div class="saleInfo" >
                <div class="price">￥{{list.nowPrice}}</div>
                <div class="bidNum">已有{{list.bidNum}}人出价</div>
                <div class="popularity">
                  <span>{{list.viewNum}}</span>
                  <i class="iconfont icon-huo"></i>
                </div>
                <div class="stopClick like" v-show="list.isLiked==true">
                  <span class="stopClick">{{list.likeNum}}</span>
                  <i class="iconfont icon-xin"></i>
                </div>

                <div class="stopClick like step" @click="giveLike(list.uri,indexs,index)" v-show="list.isLiked==false">
                  <span class="stopClick">{{list.likeNum}}</span>
                  <i class="iconfont icon-xin1"></i>
                </div>
              </div>
            </swiper-item>
          </swiper>
        </div>
      </div>
      <toast v-model="showSuccess" :text="toastText" type="text"  :time="1000" is-show-mask></toast>
      <router-view></router-view>
    </div>
    <!-- </van-pull-refresh> -->
        <!-- loading信息 -->
    <div class="loading-more" v-show="loadingMore">
      <i class="el-icon-loading"></i>
      <span class="loading-text">加载更多...</span>
    </div>
    <load-more v-if="elseloading" :show-loading="false" tip="暂无更多数据" background-color="#fbf9fe"></load-more>    
    <actionsheet v-model="focusUser" :menus="menus1" @on-click-menu-menu4="cancelFocus" show-cancel></actionsheet>
  </div>
</template>

<script>
import { Swiper, Actionsheet , Toast, SwiperItem,LoadMore} from 'vux';
import { chosen, storehomeusermsg, useinfo, shopFocus, auctionFocus, shopCancel} from '../../api/api'
import tabBar from './tabBar'
import assign from '../../assets/js/assign.js'
export default {
    mixins:[assign],
    name : 'selective',
  data () {
    return {
      isLoading : false,
      scroll : 0,
      userData:[],
      timeLists: [
        {
          text: "淘淘",
          link: "/Home"
        },
        {
          text: "关注",
          link: "/focus"
        },
        {
          text: "精选",
          link: "/selective"
        }
      ],
      page:0,
      pagenum:4,
      menus1: {
        menu3: '取消关注将无法看到该店铺的拍品',
        menu4: '取消关注',
      },
      showSuccess:false,
      focusUser:false,
      toastText:'',
      index : 2,
      flag : false,
      numFlag : false,
      uri : '',
      indexs : 0,
      num : 0,
      loadingMore : false,
      elseloading : false
    }
  },
  components: {
    Actionsheet,
    Toast,
    Swiper,
    SwiperItem,
    tabBar,
    LoadMore
  },
  beforeRouteLeave (to, from, next) {
    let selective = {
      userData : this.userData,
      page : this.page,
      scroll : this.scroll,
    };
    sessionStorage.setItem('selective',JSON.stringify(selective));
    next();
  },
  methods: {
    // onRefresh() {
    //   this.page = 0;
    //   this.chosen('renovate');
    //     setTimeout(() => {
    //       this.$toast('刷新成功');
    //       this.isLoading = false;
    //     }, 500);
    //   },
    //注册scroll事件并监听 
    scrollHandler() {
      const st = document.documentElement.scrollTop || document.body.scrollTop;
      this.scroll = st;
      const ch = this.$refs.ctn.clientHeight * 0.5;
      if (st + window.innerHeight >= ch) {
        this.chosen();
      }
    }, 
    userList_onIndexChange (index) {
      this.userList_index = index
    },
     //信息数据
    chosen(type){
      if ((this.flag || this.numFlag) && type != 'renovate') {
        return false;
      };
      if (!(this.num > 0) && type != 'renovate') {
        this.loadingMore = false;
        this.elseloading = true;
        return false;
      };
      this.loadingMore = true;
      this.flag = true;
      this.page += 1;
      let _this = this;
      let params = {
          page : this.page,
          pagenum:this.pagenum,
      };
      chosen(params).then((res) =>{
          if(res.data.html){
              this.goShares(res.data.html);
          };
          if(res.code == 200) {
            this.loadingMore = false;
            let items = res.data.items;
            if (items.length < this.pagenum) {
              this.numFlag = false;
            }
            if (type == 'renovate') {
              this.userData = items;
            }else {
              this.userData = this.userData.concat(items);
            }
            this.flag = false;
          }
      })
      .catch((error) =>{
        console.log(error);
        this.numFlag = true;
        this.flag = false;
        this.loadingMore = false;
        this.elseloading = true;
        });
      },
      //点击关注按钮
        focusShop(isAttention,uri,index){
          this.indexs = index;
          this.uri = uri;
          let _this = this;
          if(isAttention==false){
            let params = {
              type:'focus',
              seller_id:uri
            };
            shopFocus(uri).then((response) => {
          if(response.code==200){
            this.showSuccess = true;
            this.toastText='关注成功';
            this.userData[_this.indexs].isAttention = true;
          }
        })
        .catch(function (error) {
            console.log(error);
        });
      }else{
          this.focusUser = true;
        }
          
      },
      //取消关注
      cancelFocus(isAttention,uri){
        let _this = this;
        let params = {
          type:'cancel',
          seller_id:this.uri
        };
          shopCancel(this.uri).then( (response)=> {
          if(response.code==200){
            this.showSuccess = true;
            this.toastText='取消关注成功';
            this.userData[this.indexs].isAttention = false;
          }
        })
        .catch(function (error) {
            console.log(error);
        });
      },
      //点赞
      giveLike(uri,indexs,index){
        let _this = this;
        this.article_id = uri;
        console.log(_this.article_id);
          auctionFocus(_this.article_id).then((res) => {
           this.userData[indexs].shopList[index].isLiked = true;
        }).catch(function(error){
          console.log(error);
        })
      },
  },
  created() {
    this.num = this.pagenum;
    window.addEventListener("scroll", this.scrollHandler);
  },
  // activated() {
  //     window.addEventListener('scroll', this.scrollHandler);
  //     if (!this.isIos()) {
  //       if(this.scroll > 0){
  //         window.scrollTo(0, this.scroll);
  //         this.scroll = 0;
  //       };
  //     }
  //   },
  deactivated(){
     window.removeEventListener('scroll', this.scrollHandler);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  mounted() {
      // if (this.isIos()) {
        // let selective = JSON.parse(sessionStorage.getItem('selective'));
        // if (selective && selective.userData.length !=0) {
        //   this.userData = selective.userData;
        //   this.page = selective.page;
        //   this.$nextTick(_ => {
        //     setTimeout(_ => {
        //       this.scroll = selective.scroll;
        //       if(this.scroll > 0){
        //         window.scrollTo(0,this.scroll);
        //       };
        //     },500)
        //   })
        // }else {
          this.chosen();
        // }
    // }else {
    //   this.chosen();
    // }
  },
}

</script>
<style>
.recommend-templete .weui-loadmore  {
  margin-top : 1.4rem;
}
.recommend-templete  .vux-swiper {
  height : 8rem!important;
}
.recommend-templete .weui-actionsheet__cell {
  height : 1.4666rem;
  line-height : 1.4666rem;
  font-size : 26px;
  font-family: PingFang-SC-Medium;
}
.recommend-templete .weui-actionsheet__cell:first-child {
  border-bottom : 1px solid #e5e5e5;
  color : #999;
}
.recommend-templete .weui-actionsheet__cell:last-child {
  font-size : 34px;
  color: #9e2026;
}
.recommend-templete .weui-actionsheet__action .weui-actionsheet__cell {
  color : #333;
  font-size : 34px;
}
.recommend-templete .vux-slider > .vux-indicator > a > .vux-icon-dot,.recommend-templete .vux-slider .vux-indicator-right > a > .vux-icon-dot {
  width : 10px;
  height : 10px;
  border-top-left-radius: 999px;
  border-top-right-radius: 999px;
  border-bottom-left-radius: 999px;
  border-bottom-left-radius: 999px;
  border-radius : 50%;
}
.recommend-templete .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
  background-color: #9e2026!important;
}
</style>

<style scoped>
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
.main .icon-untitled44+span {
  color : #f15511;
}
.main {
  margin-top :  1rem;
  font-family: PingFang-SC-Medium;
}
/* .recommend-templete .saleList:nth-child(3) {
  padding-bottom : 1.3333rem;
} */
.recommend-templete .isAuction {
  width: 110px;
	height: 42px;
	background-color: #52b1e1;
  position : absolute;
  right : 30px;
  top : 30px;
  color : #fff;
  text-align : center;
  line-height : 42px;
  z-index : 10;
  border-radius : 20px;
  font-family: PingFang-SC-Medium;
}

.recommend-templete .isAuction span {
  font-size : 22px;
  font-family: PingFang-SC-Medium;
}

/*导航栏样式*/
.recommend-templete{
  position: absolute;
  top : 0;
  width : 100%;
  max-width: 750px;
  box-sizing: border-box;
  min-height: 170px;
  padding-bottom: 1.3333rem;  
  height : 100%;
}
.recommend-templete .navigation{
  width: 100%;
  height: 78px;
  background-color: #fff;
}
.recommend-templete .navigationbar{
  float: left;
  width: 94px;
  color: #999;
  font-size: 32px;
  line-height: 74px;
  text-align: center;
  margin-left: 0.73333rem;
  border-bottom: 4px solid transparent;
}
.recommend-templete .navigationbar.selected {
  color: #9e2026;
  border-bottom: 4px solid #9e2026;
}
.recommend-templete .navigation .navupload {
  float: right;
  margin-right: 30px;
}
.recommend-templete .navigation .icon-camera2 {
  margin: 0;
  width: 50px;
  text-align: center;
  margin-top: 10px;
  color: #999;
  font-size: 32px;
}
.recommend-templete .navigation .issue{
  width: 50px;
  text-align: center;
  color: #999;
}

/*轮播图样式*/
.recommend-templete .vux-slider{
  position: static;
}
.recommend-templete .vux-slider > .vux-indicator-center{
  right: 50%;
  position: absolute;
}

.recommend-templete .vux-slider > .vux-indicator > a:first-child > .vux-icon-dot {
  width: 10px;
  height: 10px;
  border-radius : 50%!important;
}
.recommend-templete .vux-slider > .vux-indicator, .vux-slider .vux-indicator-right{
  bottom: 0.2rem;
}
.recommend-templete .vux-slider > .vux-swiper > .vux-swiper-item > a{
  height: 75%;
}
.recommend-templete .desc {
    height : 116px;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.3);
    background-image:none;
    font-size: 28px;
    white-space:normal;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    color: #fff;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-family: PingFang-SC-Medium;
}
.recommend-templete .lotPic .desc {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
  .recommend-templete .saleList {
    overflow: hidden;
    width: 100%;
    background-color: #EEE;
  }
  .recommend-templete .saleList .saleItem:first-child {
    margin-top:10px;
  }
  .recommend-templete .saleList .saleItem {
      position: relative;
      background-color: #FFF;
  }
  .recommend-templete .saleList .saleItem .seller {
    height: 85px;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
}
.recommend-templete .saleList .saleItem .seller a {
    -ms-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    -webkit-box-flex: 1;
}
.recommend-templete .saleList .saleItem .seller .nickName {
    float: left;
    line-height:85px;
    margin-left: 130px;
    font-size: 28px;
    color: #333;
}

/* 已关注样式 */
.recommend-templete .saleList .saleItem .seller .attentionIt {
    color: #d1d1d1;
    padding: 0 28px;
    box-sizing: border-box;
    border: 1px solid #d1d1d1;
    font-size: 48px;
    text-align: center;
    height: 80px;
    line-height: 80px;
    cursor: pointer;
    -ms-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    -ms-transform-origin: 100% 40%;
    transform-origin: 100% 40%;
    -webkit-transform-origin: 100% 40%;
    margin-right:30px;
    border-radius : 8px;
    margin-top : 10px;
}

.recommend-templete .saleList .saleItem .seller .attentionIts {
  color:#9e2026;
  border : 1px solid #f15511;
}


.recommend-templete .saleList .saleItem:first-child .avatar {
  top: 0.26rem;
}
.recommend-templete .saleList .saleItem .avatar {
    position: absolute;
    top: 21px;
    left: 30px;
    height: 85px;
    width: 85px;
    border-radius: 50%;
    overflow: hidden;
    border:2px solid #FFF;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
}
.recommend-templete .saleList .saleItem .avatar .backgroundImg {
    position: absolute;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.recommend-templete .recommend-templete .saleList .saleItem .slider {
    position: relative;
    width: 100%;
}
.recommend-templete  .saleItem .vux-swiper-item .lotPic{
  width: 100%;
  height: 490px;
  float: left;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

}
.recommend-templete .saleList .saleItem .saleInfo {
    padding-top : 10px;
    width: 92%;
    height: 100px;
    line-height: 1.04rem;
    color: #999;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
}
.recommend-templete .saleList .saleItem .saleInfo .price {
    font-size: 0.55rem;
    color: #9e2026;
    font-family: PingFang-SC-Medium;
    padding-left : 10px;
    line-height : 100px;
}
.recommend-templete .saleList .saleItem .saleInfo .bidNum {
    padding-left: 0.5em;
    text-align: left;
    font-size: 24px;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    -webkit-box-flex: 1;
    padding-top : 3px;
    line-height : 100px;
}
.recommend-templete .saleList .saleItem .saleInfo .popularity, .recommend-templete .saleList .saleItem .saleInfo .like {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    cursor: pointer;
    display: -webkit-flex;
    line-height : 100px;
}
.recommend-templete .saleList .saleItem .saleInfo .like {
    padding-left: 0.2rem;
}
.recommend-templete .saleList .saleItem .saleInfo .stopClick {
    position: relative;
    z-index: 999;
}
.recommend-templete .saleList .saleItem .saleInfo .popularity span, .recommend-templete .saleList .saleItem .saleInfo .like span {
    font-size: 28px;
    display: inline-block;
}
.recommend-templete .saleList .saleItem .slider .sliderBox .sliderImg .saleInfo .bidNum {
    padding-left: 0.5em;
    text-align: left;
    font-size: 26px;
    line-height: 1.1rem;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    -webkit-box-flex: 1;
}
.recommend-templete .step .icon-xin1 {
  color: #999;
  margin:0;
  font-size : 32px;
  line-height : 1.2rem;
}
.recommend-templete .icon-xin , .recommend-templete .icon-huo{
  color: #f15511;
  margin:0;
  font-size:34px;
}

.recommend-templete .icon-untitled44{
  color: #f15511;
  margin:0;
  font-size:34px;
  vertical-align: bottom;
}


/*弹窗样式*/
  .recommend-templete .weui-mask{
      background: rgba(0, 0, 0, 0.4);
  }
  .recommend-templete  .weui-actionsheet__cell{
    height: 110px;
    line-height: 110px;
    padding:0;
    color: #333;
    font-size: 30px;
  }
  .recommend-templete  .weui-actionsheet__action{
    margin-top: 11px;
  }
</style>