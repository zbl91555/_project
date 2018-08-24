<template>
	<div class="returnRequest">
    <div v-if="isshow">
      <div class="address" @click="addesssSelet">
            <div class="iconfont icon-icon-test"></div>
            <div class="addressman" v-if="addressNew">
                <div class="addresses" >
                    <div>收货人:{{addressNew.name}}</div>
                    <div>{{addressNew.tel}}</div>
                </div>
                <div class="divwidth">{{addressNew.province}} {{addressNew.city}} {{addressNew.country}} {{addressNew.address}}</div> 
            </div>
            <div class="noaddesss" v-else>
              无地址（点击添加地址）
            </div>
            <div class="iconfont icon-right"></div>
      </div>
      <div class="gray"></div>
  		<div>
  			<div class="buyer-tool">
  				<a href="">拍品信息</a>	
  			</div>
        <router-link :to="{name: 'auction', params: {id: auctionId }}">
  			<div class="buy-info">
  				<div class="goods-info" v-bind:style="{backgroundImage: 'url(' + info.auction.img + ')'}"></div>
  				<p class="goods-intr">{{info.auction.desc}}</p>
  				<ul class="buyer-detail"> 
            <li>成交时间：{{timestampToTime(info.addTime)}}<i></i></li>
  					<!-- <li>截止时间：{{timestampToTime(info.endTime)}}<i></i></li> -->
            <li><div style="float:left">截止时间：</div><countDown style="width:80px;float:left" :endtime='parseFloat(info.endTime)' :dayShow='false' :secShow='true'></countDown></li>
  				</ul>
  			</div>	
        </router-link> 
  		</div>
      <div class="moneys">
          <div>保证金：￥{{info.auction.cashPrice}}元</div>
          <div>成交金额：￥{{info.price}}元</div>
      </div> 
      <div class="gray"></div>
      <div class="mnyAndcp">
            <div class="salmoney">
                <div>商品金额</div>
                <div>￥{{info.price}}</div>
            </div>
            <!-- <div class="line"></div> -->
            <!-- <div class="salmoney">
                <div>优惠券</div>
                <div>-￥0.00</div>
            </div> -->
      </div>
      <div class="gray"></div>
  		<div class="complaintTitle">
  		      <i>支付金额:</i>
            <i>￥{{info.price}}</i>     
  		</div>
  	  <ul>
        <li class="op" @click="paymentType('balance',0)" :class="{active: sw == 0}">
          <div class="con balance">
            <span><i class="iconfont icon-duihao2"></i></span>
            <div class="icon-wodeqianbao1 iconfont"></div>
            <!-- :to="{name:'recharge',params:{price:info.price}}" -->
              <router-link :to="{path : '/newRecharge',query : {order_id : $route.query.order_id}}" v-if="info.price > info.balance && info.paypasswdIs">
                <div class="pay" v-if="chargeMoney">
                  充值
                </div>
              </router-link>
              <router-link to="/dredgeBlancePaid/payRightnow"  v-if='!info.paypasswdIs'>
                <div class="pay">
                  开通
                </div>
              </router-link>
            <div class="msg">
              <h1>余额支付</h1>
              <p>可用余额:￥{{info.balance}}元</p>
            </div>
          </div>
        </li>
        <li class="op" @click="paymentType('wx_pub',1)" :class="{active: sw == 1}">
          <div class="con">
            <span><i class="iconfont icon-duihao2"></i></span>
            <div class="img">
              <img src="../../../assets/images/travel.png" alt="">
            </div>
            <div class="msg" style="float: left;margin-left: 26px;">
              <h1>微信支付</h1>
              <p>使用微信支付，简单方便</p>
            </div>
          </div>
        </li>
       <!--  <li class="op" @click="paymentType('atm',2)" :class="{active: sw == 2}">
          <div class="con">
            <span><i class="iconfont icon-duihao2"></i></span>
            <div class="img">
              <img src="../../../assets/images/icon_transfer.png">
            </div>
            <div class="msg">
              <h1>转账支付</h1>
              <p>ATM&nbsp;&nbsp;柜台转账&nbsp;&nbsp;网银转账&nbsp;&nbsp;支付宝</p>
            </div>
          </div>
        </li> -->
      </ul>
      <div class="btn">
        <button @click="paymentSafe">安全支付</button>
      </div>
      <!-- 是否弹出去开通  -->
      <div id="fixednumMain" v-if="showshowlists">
        <div @click="closeshowlists" class="fixednumMask" style="opacity: 0.38;">
        </div>
        <div class="sharesomething">
          <div style="border-bottom:1px solid #e5e5e5;">  您还未开通余额，不能使用“余额支付”与“微信支付”功能，快去开通吧！</div>
          <div @click="closeshowlists" style="border-right: 1px solid #e5e5e5;">取消</div>
          <div @click="openRecharge" style="color:red;" class="bordertop">确认</div>          
        </div>
      </div>
      <!-- 自定义键盘 -->
        <div id="fixednumMain" v-if=" bid==true ">
          <div class="fixednumMask" style="opacity: 0.38;"></div>
          <div class="fixednumMain flip-up">
            <div class="padding-bottom">
              <div class="passhead">
                <div class="iconfont icon-zuojiantou"  @click="closekeyBoard()"></div>
                <div class="floatleft">
                  请输入您的支付密码
                </div>     
              </div>
              <div class="sixpasswords">
                    <div v-for="i in items">
                        <span v-if="password[i]">*</span>
                    </div>
              </div>
            </div>
            <div class="numkey">
              <ul>
                <li @touchstart='oneClick()' data-touch="touchEffect" class="num">
                <div class="number">
                  1
                </div>
                <div class="letter">
                </div>
                </li>
                <li @click='twoClick()' data-touch="touchEffect" class="num">
                <div class="number">
                  2
                </div>
                <div class="letter">
                  ABC
                </div>
                </li>
                <li @click='threeClick()' data-touch="touchEffect" class="num">
                <div class="number">
                  3
                </div>
                <div class="letter">
                  DEF
                </div>
                </li>
                <li @click='fourClick()' data-touch="touchEffect" class="num">
                <div class="number">
                  4
                </div>
                <div class="letter">
                  GHI
                </div>
                </li>
                <li @click='fiveClick()' data-touch="touchEffect" class="num">
                <div class="number">
                  5
                </div>
                <div class="letter">
                  JKL
                </div>
                </li>
                <li @click='sixClick()' data-touch="touchEffect" class="num">
                <div class="number">
                  6
                </div>
                <div class="letter">
                  MNO
                </div>
                </li>
                <li @click='sevenClick()' data-touch="touchEffect" class="num">
                <div class="number">
                  7
                </div>
                <div class="letter">
                  PQRS
                </div>
                </li>
                <li @click='eightClick()' data-touch="touchEffect" class="num">
                <div class="number">
                  8
                </div>
                <div class="letter">
                  TUV
                </div>
                </li>
                <li @click='nineClick()' data-touch="touchEffect" class="num">
                <div class="number">
                  9
                </div>
                <div class="letter">
                  WXYZ
                </div>
                </li>
                <li @click='dblzeroClick()' data-touch="touchEffect" class="num othernum" style="line-height: 50px;margin-bottom:6px">.</li>
                <li @click='zeroClick()' data-touch="touchEffect" class="num" style="line-height: 50px;margin-bottom:6px">0</li>
                <li @click='del()' data-touch="touchEffect" class="delete" style="line-height: 50px;margin-bottom:6px"></li>
              </ul>
            </div>
          </div>
          <!-- 支付密码输入错入,请重试 -->
              <div class="wrongPass" v-if="wrongPass==true">    
              </div>
              <div class="enterwrong" v-if="wrongPass==true ">
                  <div class="enterwrong-h">支付密码输入错误,请重试</div>
                  <div class="twobtn">
                        <div>忘记密码</div>
                        <div>重新输入</div>
                  </div>
              </div>
        </div>
    </div>
    <router-view v-model="isshow" :orderId="order_id" :whichP="payment" @getAddress="get"></router-view>
    </div>
</template>
<script>
import countDown from "../../common/countDown";
import { Toast } from "vant";
import wx from "weixin-js-sdk";
import {
  orderPayment,
  payment,
  notify,
  getSign,
  wxPay
} from "../../../api/api";
import md5 from "md5";
import assign from "../../../assets/js/assign.js"; //混入式方法
export default {
  mixins: [assign],
  name: "payRightnow",
  components: {
    countDown
  },
  data() {
    return {
      info: { auction : {}},
      bid: false,
      items: [0, 1, 2, 3, 4, 5],
      password: [],
      lastpassword: "", //传给后台的6位数密码
      wrongPass: false,
      config: {},
      payConfig: {},
      paymentTimeVal: "balance",
      sw: 0,
      price: "", //价格
      type: "",
      types: "order", //类型
      coupon_id: "", //优惠券id
      order_id: "", //订单id
      order_no: "", //订单编号
      body: "",
      auctionId: "", //商品ID
      order_address: "0", //地址id
      addressshow: false, //地址页面
      isshow: true, //付款页面
      addressNew: "", //地址信息
      endtime: "",
      balance: "",
      chargeMoney: false,
      paypasswdIs: "",
      payment: "payment",
      showshowlists: false, //余额开通弹窗
      flag: false,//支付限制
    };
  },
  methods: {
    //开启loading效果
    openLoading() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "正在支付"
      });
    },
    //关闭开通支付弹出框
    closeshowlists() {
      this.showshowlists = false;
    },
    //前往开通余额支付
    openRecharge() {
      this.$router.push({ path: "/dredgeBlancePaid/payRightnow" });
    },
    get(item) {
      this.addressUpdate();
      this.addressNew = item;
      this.order_address = item.id;
    },
    addesssSelet() {
      this.isshow = false;
      sessionStorage.setItem('order_id',this.order_id);
      this.$router.push('/payment/addressInformation');
    },
    addressUpdate() {
      this.addressshow = false;
      this.isshow = true;
    },

    showkeyBoard() {
      this.bid = true;
    },
    closekeyBoard() {
      this.bid = false;
      this.password = [];
    },
    //页面
    orderPayment() {
      orderPayment(this.order_id)
        .then(res => {
          this.info = res.data;
          this.price = res.data.price;
          this.paypasswdIs = res.data.paypasswdIs;
          this.balance = res.data.balance;
          // this.coupon_id =  res.data.coupon_id;
          this.order_address = res.data.address.addressId;
          if (this.$route.query.address == '1' && sessionStorage.getItem('address')) {
            this.addressNew = JSON.parse(sessionStorage.getItem('address'));
          }else {
            this.addressNew = res.data.address;
          }
          this.auctionId = res.data.auction.auctionId;
          if (res.data.address != "") {
            this.noAddress = false;
            this.defaultAddress = true;
          } else {
            this.noAddress = true;
          }
          if (parseFloat(this.balance) > parseFloat(this.price)) {
            this.chargeMoney = false;
          } else {
            this.chargeMoney = true;
          }
          if (!this.paypasswdIs) {
            this.showshowlists = true;
          }
        })
        .catch(err => {
          // this.$router.push({name:'errorPage'})
        });
    },
    // 微信支付开始
    reload() {
      this.getSign();
      wx.config(this.config);
      wx.checkJsApi({
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "chooseImage",
          "chooseWXPay"
        ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          console.log(res);
        }
      });
    },
    getSign() {
      let params = {
        uri: window.location.href
      };
      getSign(params)
        .then(response => {
          this.config = response.data;
          this.config.jsApiList = [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "chooseImage",
            "chooseWXPay"
          ];
        })
        .catch(error => {
          console.log(error.data);
        });
    },
    //微信支付
    wxPay(params) {
      wxPay(params)
        .then(response => {
          this.weixinPay(response.data);
        })
        .catch(error => {});
    },
    weixinPay(data) {
      var vm = this;
      if (typeof WeixinJSBridge == "undefined") {
        //微信浏览器内置对象。参考微信官方文档
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            vm.onBridgeReady(data),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", vm.onBridgeReady(data));
          document.attachEvent("onWeixinJSBridgeReady", vm.onBridgeReady(data));
        }
      } else {
        vm.onBridgeReady(data);
      }
    },
    onBridgeReady(data) {
      var vm = this;
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:cancel") {
          Toast.clear();
          vm.flag = false;
        } else {
          vm.$router.push('/paySuccess/'+vm.auctionId);
          Toast.clear();
          vm.flag = false;
        }
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        // if(res.err_msg == "get_brand_wcpay_request：ok" ){
        //   vm.$router.push("/reservedBerth");
        // }else{
        //   alert("支付失败,请跳转页面"+res.err_msg);
        // }

        //  window.location.href='/reservedBerth'
      });
    },
    // 微信支付结束

    //安全支付
    paymentSafe() {
      if (this.order_address == 0) {
        Toast("请选择地址");
        return;
      }
      let params = {
        channel: this.paymentTimeVal,
        type: this.types,
        price: this.price,
        order_id: this.order_id,
        // coupon_id:_this.coupon_id,
        order_address: this.order_address
      };
      if (this.paymentTimeVal == "balance") {
        if (this.paymentTimeVal == "balance" && this.paypasswdIs == false) {
          Toast("请开通余额");
          return;
        }
        if (parseFloat(this.balance) < parseFloat(this.price)) {
          Toast("余额不足请充值");
          return;
        }
        payment(params)
          .then(res => {
            this.showkeyBoard(); //发起支付
            this.order_no = res.data.order_no;
            this.body = res.data.body;
            this.type = res.data.attach;
          })
          .catch(err => {
            Toast(err.data.message);
          });
      }
      if (this.paymentTimeVal == "wx_pub") {
        if (this.paypasswdIs == false) {
          this.showshowlists = true;
          return;
        }
        this.openLoading();
        if (this.flag) {
          return;
        }
        this.flag = true;
        this.wxPay(params);
      }
      if (this.paymentTimeVal == "atm") {
        //atm支付
      }
    },

    //安全支付发起 回调
    notify() {
      this.openLoading();
      if (this.flag) {
        return;
      }
      this.flag = true;
      let paymentType = this.paymentTimeVal;
      let params = {
        order_no: this.order_no,
        attach: this.type,
        paypasswd: md5(this.lastpassword),
        body: this.body
      };
      notify(paymentType, params)
        .then(res => {
          Toast.clear();
          this.flag = false;
          this.$router.push({
            name: "paySuccess",
            params: { auction_id: this.auctionId }
          });
        })
        .catch(err => {
          alert(err.data.message);
          //清空密码
          this.lastpassword = "";
          this.password = [];
          this.flag = false;
          Toast.clear();
        });
    },

    paymentType(i, index) {
      this.paymentTimeVal = i;
      this.sw = index;
    },

    //删除
    del() {
      this.password.pop();
      this.lastpassword = this.password.join("");
    },

    // 按数字1
    oneClick() {
      if (this.password.length < 6) {
        this.password.push(1);
        this.lastpassword = this.password.join("");
      }
      if (this.password.length == 6) {
        this.notify();
      }
    },
    // 按数字2
    twoClick() {
      if (this.password.length < 6) {
        this.password.push(2);
        this.lastpassword = this.password.join("");
      }
      if (this.password.length == 6) {
        this.notify();
      }
    },
    // 按数字3
    threeClick() {
      if (this.password.length < 6) {
        this.password.push(3);
        this.lastpassword = this.password.join("");
      }
      if (this.password.length == 6) {
        this.notify();
      }
    },
    // 按数字4
    fourClick() {
      if (this.password.length < 6) {
        this.password.push(4);
        this.lastpassword = this.password.join("");
      }
      if (this.password.length == 6) {
        this.notify();
      }
    },
    // 按数字5
    fiveClick() {
      if (this.password.length < 6) {
        this.password.push(5);
        this.lastpassword = this.password.join("");
      }
      if (this.password.length == 6) {
        this.notify();
      }
    },
    // 按数字6
    sixClick() {
      if (this.password.length < 6) {
        this.password.push(6);
        this.lastpassword = this.password.join("");
      }
      if (this.password.length == 6) {
        this.notify();
      }
    },
    // 按数字7
    sevenClick() {
      if (this.password.length < 6) {
        this.password.push(7);
        this.lastpassword = this.password.join("");
      }
      if (this.password.length == 6) {
        this.notify();
      }
    },
    // 按数字8
    eightClick() {
      if (this.password.length < 6) {
        this.password.push(8);
        this.lastpassword = this.password.join("");
      }
      if (this.password.length == 6) {
        this.notify();
      }
    },
    // 按数字9
    nineClick() {
      if (this.password.length < 6) {
        this.password.push(9);
        this.lastpassword = this.password.join("");
      }
      if (this.password.length == 6) {
        this.notify();
      }
    },
    // 按数字.
    dblzeroClick() {
      if (this.password.length < 6) {
        this.password.push(".");
        this.lastpassword = this.password.join("");
      }
      if (this.password.length == 6) {
        this.notify();
      }
    },
    // 按数字0
    zeroClick() {
      // if(this.lastpassword!=''){
      if (this.password.length < 6) {
        this.password.push("0");
        this.lastpassword = this.password.join("");
      }
      if (this.password.length == 6) {
        this.notify();
      }
      // }
    }
  },
  mounted() {
    this.reload();
    this.order_id = this.$route.query.order_id;
    if (this.$route.query.adresspage == "true") {
      this.addressshow = true;
    }
    // if (this.$route.query.nowpage == "false") {
    //   this.isshow = false;
    // }
    // this.addressshow = this.$route.params.adresspage; //地址页面
    // this.isshow = this.$route.params.nowpage;//付款页面
    this.orderPayment();
  },
  beforeRouteEnter(to, from, next) {
    next();
    if (from.path == "/dredgeBlancePaid") {
      Toast("余额开通成功");
    }
  },
  beforeRouteUpdate(to,from,next) {
    if (from.name == 'addressInformation') {
      this.order_id = to.query.order_id;
      this.orderPayment();
    }
    next();
  },
  created() {
    this.timetoEnd("1525326335", this.endtime);
  }
};
</script>

<style scoped lang="less">
// 弹框样式
.sharesomething {
  position: fixed;
  left: 0;
  top: 50%;
  left : 50%;
  z-index: 1100;
  width: 550px;
  height: 400px;
  background: white;
  text-align: center;
  border-radius: 10px;
  transform : translate(-50%,-50%);
}
.sharesomething div:nth-child(1) {
  height: 200px;
  font-size: 30px;
  padding-top: 100px;
  text-align: left;
  padding-left: 60px;
  text-indent: 60px;
  padding-right: 60px;
  line-height: 50px;
}
.sharesomething div:nth-child(2),
.sharesomething div:nth-child(3) {
  height: 95px;
  line-height: 90px;
  font-size: 30px;
  width: 49%;
  float: left;
  font-size: 32px;
}
@border-color: #e5e5e5;
.returnRequest {
  min-height: 1334px;
}
.buyer-tool {
  height: 76px;
  line-height: 76px;
  padding: 0 30px;
  position: relative;
  background-color: white;
  a {
    display: inline-block;
    line-height: 76px;
    float: left;
    position: relative;
    padding-right: 40px;
  }
}
.buy-info {
  height: 220px;
  background-color: #f7f7f7;
  padding: 27px 30px;
  box-sizing: border-box;
  .goods-info {
    height: 166px;
    width: 166px;
    float: left;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-right: 20px;
  }
  .goods-intr {
    float: left;
    width: 70%;
    height: 60px;
    line-height: 30px;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    color: #333;
    font-size: 28px;
    padding-top: 5px;
  }
  .buyer-detail {
    float: left;
    width: 70%;
    margin-top: 40px;
    background: #f7f7f7;
  }
  .buyer-detail li {
    height: 28px;
    line-height: 28px;
    background-color: transparent;
    padding: 0;
    color: #999;
    i {
      color: #9e2026;
    }
  }
}
.complaintTitle {
  height: 87px;
  line-height: 87px;
  padding: 20px 30px 0px 30px;
  font-size: 24px;
  color: #999;
  overflow: hidden;
  background-color: white;
}
.complaintTitle i:nth-child(1) {
  font-size: 30px;
  color: black;
  float: left;
}
.complaintTitle i:nth-child(2) {
  color: #f15511;
}
.icon-jiantouxiangxia {
  margin: 0;
}
.icon-jiantouxiangshang {
  margin: 0;
}
#J_login_form {
  border-bottom: 2px solid #e5e5e5;
}
.login-frame {
  background-color: #fff;
}
.login-frame li {
  position: relative;
  display: flex;
  height: 110px;
  line-height: 110px;
  margin-left: 30px;
  padding-right: 30px;
  border-bottom: 2px solid #e5e5e5;
}
.login-frame li p {
  font-size: 28px;
  color: #666;
  width: 70%;
}

.arrow {
  position: absolute;
  left: 4%;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.arrow {
  color: #9e2026;
}
.login-frame li:last-child {
  border: none;
}
.login-btn {
  padding: 0 30px;
}
.login-btn .icon-btn {
  display: block;
  border: none;
  height: 82px;
  line-height: 82px;
  background: #9e2026;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  width: 100%;
  margin-top: 135px;
  outline: none;
  -webkit-appearance: none;
}
.address {
  overflow: hidden;
  padding: 10px 20px;
  position: relative;
  background-color: white;
}
.noaddesss {
  line-height: 100px;
  text-align: center;
  float: left;
  margin-left: 150px;
  font-size: 36px;
}
.address .icon-icon-test {
  float: left;
  line-height: 100px;
  font-size: 48px;
}
.address .addressman {
  margin-left: 100px;
  width: 80%;
}
.address .addressman .divwidth {
  width: 80%;
}
.address .icon-right {
  line-height: 100px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 40px;
}
.address .icon-icon-test {
  float: left;
  margin: 0 5px;
}
.addresses {
  overflow: hidden;
  padding: 10px 0px;
  width: 80%;
}
.addresses div:nth-child(1) {
  float: left;
}
.addresses div:nth-child(2) {
  float: right;
}
.gray {
  height: 20px;
  background: #f7f7f7;
}
.moneys {
  overflow: hidden;
  padding: 20px 0px 20px 30px;
  background-color: white;
}
.moneys div {
  float: left;
  color: #999999;
}
.moneys div:nth-child(2) {
  margin-left: 50px;
}
.mnyAndcp {
  padding-left: 30px;
  background-color: white;
}
.salmoney {
  overflow: hidden;
}
.line {
  border: 1px solid #ededed;
}
.salmoney {
  padding: 20px 40px 20px 0px;
}
.salmoney div:nth-child(1) {
  float: left;
}
.salmoney div:nth-child(2) {
  float: right;
  color: #999999;
}
ul {
  background-color: #fff;
}
ul li {
  color: #333;
  font-size: 24px;
  width: 100%;
}
.list {
  height: 100px;
}
.op {
  height: 130px;
}
.list,
.op {
  padding-left: 30px;
  box-sizing: border-box;
}
.list .con {
  line-height: 100px;
}
.list .con span {
  margin-left: 25px;
  color: #f15511;
}
.list .con,
.op .con {
  height: 100%;
  width: 100%;
}
.op .balance {
  border-bottom: 1px solid @border-color;
  border-top: 1px solid @border-color;
}
.op .con {
  span {
    display: block;
    width: 40px;
    height: 40px;
    border: 2px solid @border-color;
    box-sizing: border-box;
    border-radius: 50%;
    float: left;
    margin-top: 45px;
  }
  .img {
    height: 100%;
    width: 70px;
    padding: 30px 0;
    box-sizing: border-box;
    float: left;
    img {
      margin-left: 35px;
      width: 100%;
    }
  }
  .msg {
    height: 100%;
    padding: 30px 0;
    box-sizing: border-box;
    width: 68%;
    margin-left: 162px;
    /* float: right;*/
    h1 {
      font-size: 28px;
      color: #333;
      line-height: 1.5;
    }
    p {
      font-size: 24px;
      color: #999;
    }
  }
}
.op .con span i {
  display: none;
  color: #9e2026;
  font-size: 40px;
}
.op.active .con span {
  border: none;
  i {
    display: block;
  }
}
.btn {
  width: 100%;
  padding: 65px 30px 0 30px;
  box-sizing: border-box;
  button {
    background-color: #9e2026;
    display: block;
    width: 100%;
    height: 88px;
    outline: none;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 28px;
    text-align: center;
  }
}
.icon-wodeqianbao1 {
  font-size: 70px;
  background: #019fe8;
  color: white;
  border-radius: 10px;
  margin-left: 35px;
  margin-top: 30px;
  float: left;
}
.icon-duihao2 {
  margin: 0;
}
.floatleft {
  float: left;
  text-align: center;
  line-height: 100px;
  width: 90%;
  font-size: 30px;
}
.icon-zuojiantou {
  line-height: 100px;
  float: left;
  margin: 0;
  width: 7%;
  padding-left: 3%;
  font-size: 36px;
  color: #c9c9c9;
}
.passhead {
  background: white;
  height: 100px;
  border-bottom: 1px solid #e5e5e5;
}
.sixpasswords {
  height: 166px;
  background: white;
  padding: 60px 14px;
  width: 100%;
}
.padding-bottom {
  margin-bottom: 20px;
}
.sixpasswords div {
  float: left;
  width: 116px;
  height: 90px;
  border-left: 1px solid #bfbfbf;
  border-top: 1px solid #bfbfbf;
  border-bottom: 1px solid #bfbfbf;
  line-height: 90px;
  text-align: center;
  /*width: 16.6%*/
}
.sixpasswords div span {
  font-size: 48px;
  display: inline-block;
  margin-top: 10px;
}
.sixpasswords div:nth-child(6) {
  border-right: 1px solid #bfbfbf;
}
.wrongPass {
  position: fixed;
  width: 750px;
  opacity: 0.38;
  top: 0;
  bottom: 0;
  background-color: #000;
  z-index: 2999;
}
.enterwrong {
  width: 584px;
  height: 242px;
  background: #ffffff;
  z-index: 3900;
  position: fixed;
  left: 10%;
  top: 40%;
  border-radius: 20px;
}
.enterwrong-h {
  height: 138px;
  line-height: 138px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
  font-size: 36px;
}
.twobtn {
  overflow: hidden;
}
.twobtn div {
  color: #9e2026;
  float: left;
  width: 49%;
  line-height: 96px;
  height: 96px;
  text-align: center;
  font-size: 32px;
}
.twobtn div:nth-child(1) {
  border-right: 1px solid #e5e5e5;
}
.pay {
  width: 10%;
  float: right;
  padding: 45px 0;
  color: #f15511;
}
</style>