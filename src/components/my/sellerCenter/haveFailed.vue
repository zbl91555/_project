<template>
    <div class="storeManagement" ref="ctn">
      <div class="listContainer">
        <div>
          <div class="listItem"  @click="toWhere(s.id)" :class="type == 'liupai' ? 'active' : '' " v-for="(s,index) in shibaiStore" :key="s.id">
            <!-- <router-link :to="'/auction/'+s.id"> -->
              <div class="info">
                <div class="image" :style="{ 'background-image': `url(${s.auction_img1})` }">
                </div>
                <div class="mainInfo">
                  <p class="title">
                    {{s.auction_description}}
                  </p>
                    <ul class="otherInfo">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>失败原因：{{s.failreason}}</li>
                      <li>失败时间: {{timestampToTime(s.finish_time)}}</li>
                    </ul>
                </div>
              </div>
              <div class="tools">
              <!-- @click="singledown(index)"  @click="swichshow(index)" -->
                <button class="updown" v-if="s.auction_log == false" @click="isSwichHide(index,'updown')">下架</button>
                <button @click.stop="isSwichHide(index,'grounding')" ref="whichselect" :value="index" v-if="notsoldout">上架</button>
                <button @click="isSwichHide(index,'hide')"  style="color: #999999;border: 1px solid #999999;" v-if="s.is_show=='0'">隐藏</button>
                <button @click="isSwichHide(index,'show')"  :value="index"   v-if="s.is_show=='1'">显示</button>
                <button class="singledelete" ref="whichsingselect" :value="index" v-if="deleted" @click="isSwichHide(index,'delete')">删除</button>
              </div>
           <!--  </router-link> -->
          </div>
        </div>
        <!-- <div class="bottombtn" v-if="btnsshow">
            <button class="btnall" @click="sendmsg()">确认上架</button>

          <button class="btnall canselmgl" @click="cancelbts()">取消</button>
        </div> -->
      </div>
      <!-- 弹出弹框 -->
    <div id="fixednumMain" v-if="showshowlists">
      <div @click="closeshowlists()" class="fixednumMask" style="opacity: 0.38;">
      </div>
      <div class="sharesomething">
         <div style="color:#b55459;" v-if="updown" @click="singledown(isshowIndex)">确认下架</div>
         <div v-if="hide">确认更改当前状态？</div>
         <div v-if="(type == 'liupai' || type == 'caogao') && xiajia">是否确认重新上架</div>
         <div v-if="del">确认删除？</div>
         <div v-if="confirmdelete" @click="singledelete(isshowIndex)">确认</div>
         <div v-if="confirmSomedelete" @click="somedown()">确认</div>
         <div v-if="confirm" @click="swichStatus(isshowIndex)">确认</div>
         <div style="color:rgb(181, 84, 89)" v-if="reconfirm" @click.stop="grounding(isshowIndex)">重新上架</div>
        <span class="grayTop"></span>
        <div class="cancelTop" @click="closeshowlists()">取消 </div>
      </div>
    </div>
      <!--弹出选择时间-->
      <div class="SaleDateTimePicker" v-if="pupup">
          <div class="topContainer" @click="exit()"></div>
            <div class="container flip-up">
              <div class="dayItem" v-if="todayshow">
                <div class="title">
                  {{nowday}}(今天)
                </div>
                <div>
                  <span class="hourItem" v-for="(item,index) in times" @click="chosenSelection(index)" :class="{selected:index===nowindex}" :key="index">{{item}}</span>
                </div>
              </div>
              <div class="dayItem">
                <div class="title">
                  {{tomorrow}}(明天)
                </div>
                <div>
                  <span class="hourItem" v-for="(item,index) in tmortimes" @click="chosenSelection2(index)" :class="{selected:index===nnowindex}" :key="index">{{item}}</span>
                </div>
              </div>
              <div class="dayItem" v-if="ttomorrowshow">
                <div class="title">
                  {{ttomorrow}}(后天)
                </div>
                <div>
                  <span class="hourItem" v-for="(item,index) in ttmortimes" @click="chosenSelection3(index)" :class="{selected:index===nnnowindex}" :key="index">{{item}}</span>
                </div>
              </div>
              <div class="cbtnItem">
                  <!-- <span class="btnItem selected" @click="confirmup()">确认上传</span> -->
                  <span class="btnItem selected" @click="someconfirmup()">确认上传</span>
                  <span class="btnItem" @click="cancel()">取消</span>
              </div>
              </div>
            </div>
            <load-more v-if="loading" tip="正在加载"></load-more>
            <load-more v-if="elseloading" :show-loading="false" tip="暂无更多数据" background-color="#fbf9fe"></load-more>
            <img class="beat" :src="img" alt="" v-if="dataNotAvailable">
          </div>
</template>
<script>
import { Toast } from 'vant'
import { LoadMore } from 'vux'
import {
  getstore,
  somedown,
  ToTop,
  confirmup,
  swichhide,
  singledown,
  singledelete
} from '../../../api/api'
export default {
  data () {
    return {
      changeRed: 0,
      store: [],
      auctionStore: [], // 竞拍中
      jiepaiStore: [], // 已截拍
      liupaiStore: [], // 已流拍
      shibaiStore: [], // 已失败
      caogaoStore: [], // 草稿箱
      type: 'auctioning',
      pagenum: 5,
      page: 0,
      auctioning: true,
      jiepai: false,
      liupai: false,
      shibai: false,
      caogao: false,
      soldout: true,
      notsoldout: false,
      toup: true,
      deleted: false,
      checkselectshow: false,
      btnsshow: false,
      ttomorrowshow: false,
      todayshow: true,
      allids: [],
      pupup: false,
      nowday: 0,
      tomorrow: 0,
      ttomorrow: 0,
      nowindex: -1,
      nnowindex: -1,
      nnnowindex: -1,
      year: '',
      month: '',
      day: '',
      totaltime: '',
      oneid: '',
      confirmupshow: false,
      someconfirmupshow: false,
      tohide: false,
      toshow: false,
      isBusy: false,
      showshowlists: false,
      isshowIndex: '',
      updown: false,
      hide: false,
      del: false,
      confirm: false,
      reconfirm: false,
      confirmdelete: false,
      confirmSomedelete: false,
      count: 0,
      loading: false,
      elseloading: false,
      xiajia: true,
      img: require('../../../assets/images/beat.png'), // 无数据时 显示的图片
      dataNotAvailable: false // 无数据时 是否展示
    }
  },
  components: {
    LoadMore
  },
  computed: {
    isLiupai () {
      return this.type == 'liupai'
    }
  },
  created () {
    this.count = this.pagenum
    window.addEventListener('scroll', this.scrollHandler)
  },

  destroyed () {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    // 注册scroll事件并监听
    scrollHandler () {
      const st = document.documentElement.scrollTop || document.body.scrollTop
      const ch = this.$refs.ctn.clientHeight
      if (st + window.innerHeight >= ch) {
        console.log('加载')
        this.getstore()
      }
    },
    // 获取列表
    getstore () {
      if (this.count == 0 || this.loading) {
        return
      }
      this.loading = true
      let _this = this
      this.page += 1
      let params = {
        page: this.page,
        pagenum: this.pagenum,
        type: 'shibai'
      }
      getstore(params)
        .then(response => {
          if (response.code == 200) {
            _this.shibaiStore = _this.shibaiStore.concat(response.data)
            _this.checkselectshow = false
            _this.count = response.data.length
            _this.loading = false
          }
        })
        .catch(error => {
          this.dataNotAvailable = this.shibaiStore.length == 0
          this.loading = false
          this.elseloading = true
          this.count = 0
          console.log(error)
        })
    },
    toWhere (id) {
      if (this.type == 'caogao') {
        return
      }
      if (this.type == 'shibai') {
        this.$router.push({ path: '/orderDetail/' + id })
      } else this.$router.push({ path: '/auction/' + id })
    }
  },
  beforeRouteLeave (to, from, next) {
    localStorage.removeItem('changeRed')
    next()
  },
  mounted () {
    this.getstore()
  }
}
</script>
<style scoped>
.storeManagement {
  background: #f4f4f4;
}
.beat {
  position: absolute;
  width: 507px;
  height: 278px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
.liupaiClass {
  padding-top: 125px;
}
.toup {
  display: block;
  float: right;
}
.updown,
.singledelete {
  float: right;
}
.show {
  display: none;
  float: right;
}
.hide {
  display: block;
  float: right;
}
/*截拍时间样式*/
.SaleDateTimePicker {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}
.SaleDateTimePicker .topContainer {
  width: 750px;
  height: 27%;
}
.SaleDateTimePicker .container {
  width: 750px;
  height: 71%;
  min-height: 350px;
  padding-top: 0.3rem;
  background: #fff;
  cursor: default;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -5rem;
  overflow: scroll;
}
.flip-up {
  -webkit-animation: flipUp 0.2s ease-out;
  animation: flipUp 0.2s ease-out;
  opacity: 1 !important;
  visibility: visible !important;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
.SaleDateTimePicker .container .dayItem {
  margin: 0 35px 35px 35px;
  border-top: 1px dashed #ccc;
}
.SaleDateTimePicker .container .dayItem .title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 28px;
  color: #333;
  margin-left: 35px;
}
.SaleDateTimePicker .container .dayItem .hourItem {
  position: relative;
  display: inline-block;
  height: 72px;
  width: 29.5%;
  font-size: 28px;
  line-height: 72px;
  margin: 0 1.5% 10px;
  border-radius: 3px;
  color: #333;
  background-color: #efefef;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
}
.SaleDateTimePicker .container .cbtnItem {
  margin: 0 35px 35px 35px;
  border-top: 1px dashed #ccc;
  text-align: center;
}
.SaleDateTimePicker .container .cbtnItem .btnItem {
  position: relative;
  display: inline-block;
  height: 60px;
  width: 180px;
  font-size: 28px;
  line-height: 60px;
  margin: 0 1.5% 10px;
  border-radius: 3px;
  color: #333;
  background-color: #efefef;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
}

.SaleDateTimePicker .container .dayItem .hourItem.selected {
  background-color: #9e2026;
  color: #fff;
}
.SaleDateTimePicker .container .cbtnItem .selected {
  background-color: #9e2026;
  color: #fff;
}
.storeManagement {
  max-width: 750px;
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: 1.333rem;
}
.storeManagement .menu {
  position: fixed;
  top: 0;
  width: 100%;
  height: 78px;
  line-height: 78px;
  max-width: 750px;
  background-color: #fff;
  z-index: 999;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
}

.storeManagement .menu .menuList.mode {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  padding: 0 30px;
}
.storeManagement .menu .menuList {
  padding: 0 15px;
  float: left;
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
}

.border {
  position: relative;
}

.storeManagement .menu .menuList.mode .menuItem {
  padding: 0;
  width: 16%;
  color: #999999;
  font-size: 30px;
  font-family: PingFang-SC-Heavy;
  margin-left: 3.5%;
}
.storeManagement .menu .menuList .menuItem.selected {
  color: #9e2026;
  border-bottom: 4px solid #9e2026;
  font-family: PingFang-SC-Heavy;
}
.storeManagement .menu .menuList .menuItem {
  font-size: 28px;
  cursor: pointer;
  text-align: center;
  padding: 0 16px;
}
.storeManagement .menu .menuList:after {
  height: 40%;
  top: 30%;
}
.border.verticalRight:after {
  top: 0;
  right: 0;
}
.border.verticalLeft:after,
.border.verticalRight:after {
  width: 2px;
  height: 100%;
  -ms-transform: scaleX(0.5);
  transform: scaleX(0.5);
  -webkit-transform: scaleX(0.5);
}
.border:after {
  position: absolute;
  content: "";
  background-color: #e5e5e5;
}
.storeManagement .menu .menuList .menuItem i {
  font-size: 42px;
  color: #666;
}
.storeManagement .menu .menuList .traces .icon-zuji {
  font-size: 50px;
  color: #666;
}
.border.horizonBottom:after {
  left: 0;
  bottom: 0;
}
.border.horizonTop:after,
.border.horizonBottom:after {
  width: 100%;
  height: 2px;
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}
.storeManagement .blank {
  width: 100%;
  height: 91px;
}
.storeManagement .listContainer {
  padding-top: 72px;
  background: #f4f4f4;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow-x: hidden;
}
.storeManagement .listContainer .listItem {
  margin: 0.2rem auto;
  background: #fff;
}
.storeManagement .listContainer .active {
  margin-top: 0.2667rem;
}
.storeManagement .listContainer .listItem .info {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -webkit-justify-content: start;
  -ms-flex-pack: start;
  justify-content: start;
  padding: 0.4rem 0.4rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.storeManagement .listContainer .listItem .tools {
  position: relative;
  text-align: right;
  width: 96%;
  margin-left: 4%;
  padding: 20px 4% 20px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
}
.storeManagement .listContainer .listItem .info .image {
  position: relative;
  min-width: 165px;
  width: 165px;
  height: 165px;
  margin-right: 23px;
  background-color: #303135;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 5px;
}
.storeManagement .listContainer .listItem .info .mainInfo {
  width: 82%;
}
.storeManagement .listContainer .listItem .info .singlecheckc {
  width: 16%;
  padding-top: 50px;
  padding-left: 10px;
}
.storeManagement .listContainer .listItem .info .mainInfo .title {
  color: #333;
  height: 66px;
  line-height: 36px;
  margin-bottom: 37px;
  font-size: 28px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.storeManagement .listContainer .listItem .info .mainInfo .otherInfo {
  color: #999;
  height: 57px;
  line-height: 34px;
  font-size: 24px;
}
.storeManagement .listContainer .listItem .tools::before {
  position: absolute;
  left: 0;
  top: 0;
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: #d9d9d9;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.storeManagement .listContainer .listItem .tools button {
  padding: 0;
  height: 48px;
  line-height: 48px;
  min-width: 110px;
  margin-left: 20px;
  border: 2px solid #f15511;
  border-radius: 4px;
  font-size: 26px;
  background-color: #fff;
  color: #f15511;
  text-align: center;
}
/*.storeManagement .listContainer .listItem .tools button:last-child {
    color: #999999;
    border: 2px solid #999999;
}*/
input[type="checkbox"] {
  width: 18px;
  height: 18px;
  position: relative;
  background: transparent;
  border: 0;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
input[type="checkbox"]:before {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1.05px solid #999;
  border-radius: 100%;
  line-height: 30px;
  vertical-align: middle;
}
input[type="checkbox"]:checked:before {
  border: 1px solid transparent;
  background: #9e2026;
}
input[type="checkbox"]:checked:after {
  content: "";
  position: absolute;
  top: 5px;
  left: 12px;
  border-right: 2px solid transparent;
  border-bottom: 2px solid transparent;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  width: 15px;
  height: 20px;
  border-color: #fff;
}
.mgleft {
  position: absolute;
  left: 124px;
  line-height: 100px;
  vertical-align: middle;
  font-size: 30px;
  padding-top: 10px;
  top: 0;
}
.checkselect {
  max-width: 10rem;
  width: 100%;
  padding-left: 20px;
  padding-top: 5px;
  line-height: 30px;
  vertical-align: middle;
  height: 65px;
  background: #ffffff;
  padding: 30px 0px;
  position: fixed;
  z-index: 111;
}
.selectsomeup {
  width: 150px;
  height: 50px;
  position: absolute;
  right: 190px;
  top: 40px;
  border: 2px solid #13b0fd;
  border-radius: 5px;
  color: #13b0fd;
  background: #ffffff;
  text-align: center;
  font-size: 28px;
}
.somedown {
  width: 150px;
  height: 50px;
  position: absolute;
  right: 30px;
  top: 40px;
  background: #ffffff;
  border: 2px solid #999999;
  border-radius: 5px;
  color: #999999;
  text-align: center;
  font-size: 28px;
}
.bottombtn {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  bottom: 0;
  padding-bottom: 50px;
  z-index: 1000;
  background: white;
  text-align: center;
  padding-top: 40px;
}
.canselmgl {
  margin-left: 10px;
}
.allScla {
  margin-left: 40px;
}
.sharesomething {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1100;
  width: 100%;
  background: white;
  text-align: center;
  height: 3.9rem !important;
}
.sharesomething div {
  font-size: 30px;
}
.sharesomething div:nth-child(1) {
  border-bottom: 1px solid #f2f2f2;
  height: 110px;
  line-height: 110px;
  color: #a2a2a2;
}
.sharesomething div:nth-child(2) {
  height: 70px;
  line-height: 70px;
  color: #b55459;
}
.sharesomething .cancelTop {
  height: 80px;
  line-height: 80px;
}
.sharesomething .grayTop:nth-child(2) {
  display: none;
}
.grayTop {
  width: 100%;
  height: 10px;
  background: #ededef;
  display: inline-block;
}
/* .sureDown{
     color: #a2a2a2;
  }
*/
</style>
