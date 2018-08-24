<template>
    <div class="storeManagement" ref="ctn">
      <div class="listContainer">
        <div>
          <div>
              <div class="checkselect" v-if="checkselectshow">
                <!-- <input @click="allselect" class="allScla" id="check" name="allcheck" type="checkbox" ref="allselects"> -->
                <div class="allChecked" @click.stop="allselect"><span class="iconfont" :class="allChecked ? 'icon-duihao2' : 'icon-right-1'"></span></div>
                <div class="mgleft" for="check">全选</div>
                <button class="selectsomeup" @click="selectsomeup()">{{allids.length >=2? '批量上架' : '上架'}}</button>
                <button class="somedown" @click="isSwichHide('','somedelete')">{{allids.length >=2? '批量删除' : '删除'}}</button>
            </div>
            <div class="liupaiClass" v-if="checkselectshow">
              <div  class="listItem" :class="type == 'liupai' ? 'active' : '' " v-for="(s,index) in liupaiStore" :key="s.id">
                <!-- <router-link :to="'/auction/'+s.id"> -->
                  <div class="info">
                    <div class="singlecheckc">
                      <!-- <input :value="s.id" id="check" name="singlecheck" type="checkbox" ref="singlechecks" @click="singleselect(s.id,index,s)"> -->
                      <div class="checked" @click.stop="singleselect(s.id,index,s)">
                        <span class="iconfont" :class="s.checked? 'icon-duihao2':'icon-right-1'"></span>
                      </div>
                    </div>
                    <div  @click="toWhere(s.order_id?s.order_id:s.id)" class="image" :style="{ 'background-image': `url(${s.auction_img1})` }">
                    </div>
                    <div class="mainInfo" @click="toWhere(s.order_id?s.order_id:s.id)">
                      <p class="title">
                        {{s.auction_description}}
                      </p>
                        <ul class="otherInfo">
                          <!-- <li><span>&nbsp;</span></li> -->                
                          <li>流拍时间: {{timestampToTime(s.end_time)}}</li>
                        </ul>
                    </div>
                  </div>
                  <div class="tools">
                  <!-- @click="singledown(index)"  @click="swichshow(index)" -->
                    <button @click="isSwichHide(index,'hide')"  style="color: #999999;border: 1px solid #999999;" v-if="s.is_show=='0'">隐藏</button>
                    <button @click="isSwichHide(index,'show')"  :value="index" v-if="s.is_show=='1'">显示</button>
                  </div>
               <!--  </router-link> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 弹出弹框 -->
    <div id="fixednumMain" v-if="showshowlists">
      <div @click="closeshowlists()" class="fixednumMask" style="opacity: 0.38;">
      </div>
      <div class="sharesomething">
        <!-- 重新上架 -->
        <div v-if="xiajia">
          <div>是否确认重新上架</div>
          <div style="color:rgb(181, 84, 89)" @click.stop="grounding">确定</div>
          <span class="grayTop"></span>
          <div class="cancelTop" @click="closeshowlists()">取消 </div> 
        </div>
        <!-- 删除 -->
        <div v-if="del">
         <div>确认删除？</div>
         <div @click="somedown">确认</div>
         <span class="grayTop"></span>
         <div class="cancelTop" @click="closeshowlists()">取消 </div> 
        </div>
        <!-- 修改状态 -->
        <div v-if="hide">
          <div>确认更改当前状态？</div>
          <div @click="swichStatus(isshowIndex)">确认</div>
          <span class="grayTop"></span>
          <div class="cancelTop" @click="closeshowlists()">取消 </div> 
        </div>
         
         <!-- <div v-if="confirmdelete" @click="singledelete(isshowIndex)">确认</div> -->
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
             <img class ="beat" :src="img" alt="" v-if="dataNotAvailable">
          </div>
</template>
<script>
import { Toast } from "vant";
import { LoadMore } from "vux";
import {
  getstore,
  somedown,
  ToTop,
  confirmup,
  swichhide,
  singledown,
  singledelete
} from "../../../api/api";
export default {
  data() {
    return {
      times: [
        "10:00",
        "12:00",
        "16:00",
        "17:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
      ],
      tmortimes: [
        "10:00",
        "12:00",
        "16:00",
        "17:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
      ],
      ttmortimes: [
        "10:00",
        "12:00",
        "16:00",
        "17:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
      ],
      changeRed: 0,
      store: [],
      liupaiStore: [], //已流拍
      type: "auctioning",
      pagenum: 8,
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
      year: "",
      month: "",
      day: "",
      totaltime: "",
      oneid: "",
      confirmupshow: false,
      someconfirmupshow: false,
      tohide: false,
      toshow: false,
      isBusy: false,
      showshowlists: false,
      isshowIndex: "",
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
      textGrounding: "上架",
      textDelete: "删除",
      indexs: [],
      flag: false,
      xiajia: true,
      deleteArr: [],
      img: require("../../../assets/images/beat.png"), //无数据时 显示的图片
      dataNotAvailable: false, //无数据时 是否展示
      allChecked: false //全选按钮
    };
  },
  components: {
    LoadMore
  },
  computed: {
    isLiupai() {
      return this.type == "liupai";
    }
  },
  created() {
    this.count = this.pagenum;
    window.addEventListener("scroll", this.scrollHandler);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  methods: {
    grounding() {
      //上架
      if (!this.liupaiStore[this.indexs[0]].is_can) {
        this.$router.push("/nextUpload/" + this.allids[0]);
      } else {
        this.$router.push("/upload/" + this.allids[0]);
      }
    },
    isSwichHide(indexs, type) {
      this.isshowIndex = indexs;
      this.showshowlists = true;
      this.hide = false;
      this.del = false;
      this.xiajia = false;
      if (type == "show" || type == "hide") {
        //显示隐藏
        this.hide = true;
      } else if (type == "somedelete") {
        //删除
        if (this.allids.length == 0) {
          Toast("请选择拍品");
          return;
        }
        this.del = true;
      } else if (type == "grounding") {
        //上架
        this.xiajia = true;
      }
    },
    //关闭
    closeshowlists() {
      this.showshowlists = false;
    },
    toWhere(id) {
      if (this.type == "caogao") {
        return;
      }
      if (this.type == "shibai") {
        this.$router.push({ path: "/orderDetail/" + id });
      } else this.$router.push({ path: "/auction/" + id });
    },

    //隐藏
    swichStatus: function(index) {
      if (this.flag) {
        return false;
      }
      let _this = this;
      _this.numBer = _this.liupaiStore[index].is_show;
      let type = "";
      if (_this.numBer == "0") {
        type = "hide";
      } else {
        type = "show";
      }
      let hideid = this.liupaiStore[index].id;
      let params = {
        type: type
      };
      swichhide(params, hideid)
        .then(response => {
          _this.showshowlists = false;
          _this.liupaiStore[index].is_show = response.message;
          this.flag = false;
        })
        .catch(error => {
          console.log(error);
          this.flag = false;
        });
    },
    //取消
    cancel: function() {
      this.pupup = false;
    },
    //注册scroll事件并监听
    scrollHandler() {
      const st = document.documentElement.scrollTop || document.body.scrollTop;
      const ch = this.$refs.ctn.clientHeight;
      if (st + window.innerHeight >= ch) {
        this.getstore();
      }
    },
    sendParames(e) {
      this.$router.push({
        path: "goodsDetails",
        query: {
          id: e
        }
      });
    },
    checktime() {
      let dd = new Date();
      let hour = dd.getHours();
      if (hour < 10) {
        this.times = this.times.slice(0);
      } else if (hour >= 10 && hour < 12) {
        this.times = this.times.slice(1);
        this.ttmortimes = this.ttmortimes.slice(0, 1);
        this.ttomorrowshow = true;
      } else if (hour >= 12 && hour < 16) {
        this.times = this.times.slice(2);
        this.ttmortimes = this.ttmortimes.slice(0, 2);
        this.ttomorrowshow = true;
      } else if (hour >= 16 && hour < 17) {
        this.times = this.times.slice(3);
        this.ttmortimes = this.ttmortimes.slice(0, 3);
        this.ttomorrowshow = true;
      } else if (hour >= 17 && hour < 19) {
        this.times = this.times.slice(4);
        this.ttmortimes = this.ttmortimes.slice(0, 4);
        this.ttomorrowshow = true;
      } else if (hour >= 19 && hour < 20) {
        this.times = this.times.slice(5);
        this.ttmortimes = this.ttmortimes.slice(0, 5);
        this.ttomorrowshow = true;
      } else if (hour >= 20 && hour < 21) {
        this.times = this.times.slice(6);
        this.ttmortimes = this.ttmortimes.slice(0, 6);
        this.ttomorrowshow = true;
      } else if (hour >= 21 && hour < 22) {
        this.times = this.times.slice(7);
        this.ttmortimes = this.ttmortimes.slice(0, 7);
        this.ttomorrowshow = true;
      } else if (hour >= 22 && hour < 23) {
        this.times = this.times.slice(8);
        this.ttmortimes = this.ttmortimes.slice(0, 8);
        this.ttomorrowshow = true;
      } else if (hour >= 23) {
        this.todayshow = false;
        this.ttomorrowshow = true;
      }
    },
    chosenSelection(index) {
      this.nnowindex = -1;
      this.nowindex = index;
      this.nnnowindex = -1;
      let hms = this.times[index];
      this.seltime(index, 0, hms);
    },
    chosenSelection2(index) {
      this.nowindex = -1;
      this.nnowindex = index;
      this.nnnowindex = -1;
      let hms = this.tmortimes[index];
      this.seltime(index, 1, hms);
    },
    chosenSelection3(index) {
      this.nowindex = -1;
      this.nnnowindex = index;
      this.nnowindex = -1;
      let hms = this.ttmortimes[index];
      this.seltime(index, 2, hms);
    },
    seltime(index, whatday, hms) {
      let dd = new Date();
      this.year = dd.getFullYear().toString();
      this.month = (dd.getMonth() + 1).toString();
      this.day = (dd.getDate() + whatday).toString();
      let change = this.year + "/" + this.month + "/" + this.day + " " + hms;
      this.totaltime = Date.parse(new Date(change)) / 1000;
    },
    getday() {
      this.nowday = this.GetDateStr(0);
      this.tomorrow = this.GetDateStr(1);
      this.ttomorrow = this.GetDateStr(2);
    },
    GetDateStr(AddDayCount) {
      let dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
      let y = dd.getFullYear();
      let m = dd.getMonth() + 1; //获取当前月份的日期
      let d = dd.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      return m + "月" + d + "日";
    },
    exit() {
      this.pupup = false;
    },
    //获取列表
    getstore() {
      if (this.count == 0) {
        return;
      }
      this.loading = true;
      let _this = this;
      this.page += 1;
      let params = {
        page: this.page,
        pagenum: this.pagenum,
        type: "liupai"
      };
      getstore(params)
        .then(response => {
          if (response.code == 200) {
            for (let i = 0; i < response.data.length; i++) {
              if (this.allChecked) {
                response.data[i].checked = true;
              } else {
                response.data[i].checked = false;
              }
            }
            _this.liupaiStore = _this.liupaiStore.concat(response.data);
            if (_this.liupaiStore.length != 0) {
              _this.checkselectshow = true;
            } else {
              _this.checkselectshow = false;
            }
            this.count = response.data.length;
            this.loading = false;
          }
        })
        .catch(error => {
          this.dataNotAvailable = this.liupaiStore.length == 0;
          this.loading = false;
          this.elseloading = true;
          this.count = 0;
          console.log(error);
        });
    },
    //删除
    somedown() {
      if (this.flag) {
        return false;
      }
      this.flag = true;
      let params = {
        auc_id: this.allids
      };
      somedown(params)
        .then(response => {
          if (response.code == 200) {
            this.showshowlists = false;
            this.flag = false;
            //数据清除
            let num = 0;
            for (let i = 0, len = this.deleteArr.length; i < len; i++) {
              num = this.liupaiStore.indexOf(this.deleteArr[i]);
              this.liupaiStore.splice(num, 1);
            }
            if (this.allChecked) {
              this.allChecked = false;
            }
            //选中的数据清空
            this.allids = [];
            this.indexs = [];
            this.deleteArr = [];
          }
        })
        .catch(error => {
          this.flag = false;
          console.log(error);
        });
    },
    //选中全选
    allselect() {
      this.allids = [];
      this.indexs = [];
      this.deleteArr = [];
      this.allChecked = !this.allChecked;
      for (let i = 0; i < this.liupaiStore.length; i++) {
        if (this.allChecked) {
          this.liupaiStore[i].checked = true;
          this.allids.push(this.liupaiStore[i].id);
          this.deleteArr.push(this.liupaiStore[i]);
          this.indexs.push(i);
        } else {
          this.liupaiStore[i].checked = false;
        }
      }
    },
    //选中数据 单选
    singleselect(id, index, item) {
      let num = this.allids.indexOf(id);
      if (num > -1) {
        this.allids.splice(num, 1);
        this.indexs.splice(num, 1);
        this.deleteArr.splice(num, 1);
        item.checked = false;
      } else {
        this.allids.push(id);
        this.indexs.push(index);
        item.checked = true;
        // let data = JSON.stringify(item);
        // this.deleteArr.push(JSON.parse(data));
        this.deleteArr.push(item);
      }
      if (this.allids.length === this.liupaiStore.length) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
    },
    cancelbts() {
      this.btnsshow = false;
    },
    //判断当前上传数量
    selectsomeup() {
      if (this.allids.length > 1) {
        this.pupup = true;
      } else if (this.allids.length == 1) {
        this.isSwichHide(this.indexs[0], "grounding");
      } else {
        Toast("请选择拍品");
      }
    },
    //多个确认上架
    someconfirmup() {
      this.pupup = false;
      let _this = this;
      var params = {
        auc_id: this.allids,
        time: this.totaltime
      };
      confirmup(params)
        .then(response => {
          if (response.code == 200) {
            this.$router.push("/newStoreManage/autioning");
          }
        })
        .catch((error) =>{
          console.log(error);
          if (error.status == 403) {
            if (error.data.code == 40002) {
              this.$router.push("/errorPage?type=40002");
              sessionStorage.setItem("err", JSON.stringify(error.data));
            }
          }
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    localStorage.removeItem("changeRed");
    next();
  },
  mounted() {
    this.checktime();
    this.getday();
    this.getstore();
  }
};
</script>
<style>
.storeManagement {
  background : #f4f4f4;
}
.storeManagement .iconfont {
  font-size: 0.5333rem !important;
}
.storeManagement span.icon-duihao2 {
  color: #9e2026 !important;
}
.storeManagement .allChecked {
  padding-left: 0.5rem !important;
}
.storeManagement .iconfont {
  color: #e5e5e5 !important;
}
.storeManagement .allChecked {
  line-height: 0.65rem !important;
}
</style>

<style scoped>
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
  width: 100%;
  left: 50%;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  max-width: 10rem;
  transform: translateX(-50%);
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
  border: 1.65px solid #999;
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
  bottom: 0;
  left: 50%;
  z-index: 1100;
  width: 100%;
  height: 3.9rem !important;
  background: white;
  text-align: center;
  max-width: 10rem;
  margin-left: -5rem;
}
.sharesomething div div {
  font-size: 30px;
}
.sharesomething div div:nth-child(1) {
  border-bottom: 1px solid #f2f2f2;
  height: 110px;
  line-height: 110px;
  color: #a2a2a2;
}
.sharesomething div div:nth-child(2) {
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
