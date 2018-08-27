 <template>
	<div class="returnRequest">
		<div>
			<div class="buyer-tool">
				<a>拍品信息</a>
			</div>
      <!-- <router-link :to="{name: 'auction', params: {id: info.auctionId }}"> -->
			<div class="buy-info">
				<div class="goods-info" v-bind:style="{backgroundImage: 'url(' + info.img + ')'}"></div>
				<p class="goods-intr">{{info.desc}}</p>
				<ul class="buyer-detail">
          <li>截止时间：<i>{{timestampToTime(info.endTime)}}</i></li>
				</ul>
			</div>
      <!-- </router-link>  -->
		</div>
    <div class="moneys">
        <div>保证金：￥{{info.cashPrice}}元</div>
    </div>
    <div class="gray"></div>
    <ul>
      <li class="op" @click="paymentType('balance',0)" :class="{active: sw == 0}">
        <div class="con">
          <span><i class="iconfont icon-duihao2"></i></span>
          <div class="icon-wodeqianbao1 iconfont">
          </div>

         <div @click.stop="goRecharge('充值')" v-if='info.paypasswdIs'>
              <div class="pay" v-if='info.cashPrice>info.balance'>
                充值
              </div>
          </div>
          <div @click.stop="goRecharge('开通')" v-else>
            <div class="pay">
              开通
            </div>
          </div>

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
            <img src="../../../assets/images/travel.png" alt="" />
          </div>
          <div class="msg2">
            <h1>微信支付</h1>
            <p>使用微信支付，简单方便</p>
          </div>
        </div>
      </li>
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
                  <div v-for="i in items" :key="i"><span v-if="password[i]">*</span></div></div>
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
            <div class="wrongPass" v-if="wrongPass==true ">
            </div>
            <div class="enterwrong" v-if="wrongPass==true ">
                <div class="enterwrong-h">支付密码输入错误,请重试</div>
                <div class="twobtn">
                    <div>忘记密码</div>
                    <div>重新输入</div>
                </div>
            </div>
      </div>
    <div data-v-56c8d168="" id="fixednumMain" v-if="isShow">
      <div data-v-56c8d168="" @click.stop="isShow=false" class="fixednumMask" style="opacity: 0.38;"></div>
      <div data-v-56c8d168="" class="sharesomething">
        <div data-v-56c8d168="">是否放弃本次支付</div>
        <div data-v-56c8d168="" style="color: rgb(181, 84, 89);" @click.stop="goSkip">确定</div>
        <span data-v-56c8d168="" class="grayTop"></span>
        <div data-v-56c8d168="" class="cancelTop" @click.stop="isShow=false">取消</div>
      </div></div>
    <!-- 弹出提示框 -->
    <div id="fixednumMain" v-if="showalert">
      <div @click="exitalert()" class="fixednumMask" style="opacity: 0.38;">
      </div>
      <div class="alertWrongPrice">
        <div class="wrongPrice">
          {{alertmessage}}
        </div>
        <div class="priceGray"></div>
        <div class="knowPrice" @click="exitalert()">
          知道了
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import md5 from 'md5'
import { Toast } from 'vant'
import addressInformation from '../addressInformation'
import wx from 'weixin-js-sdk'
import {
  orderPayment,
  payment,
  notify,
  getSign,
  wxPay,
  auctionCash,
  auctionPublish,
  auctionAddPrice
} from '../../../api/api'
export default {
  data () {
    return {
      alertmessage: '',
      showalert: false,
      info: {},
      addressshow: false,
      isshow: true,
      bid: false,
      items: [0, 1, 2, 3, 4, 5],
      password: [],
      lastpassword: '', // 传给后台的6位数密码
      wrongPass: false,
      config: {},
      payConfig: {},
      sw: 0,
      price: '0', // 价格
      paymentTimeVal: 'balance',
      type: 'cash', // 类型
      attach: '',
      order_id: '', // 订单id
      order_no: '', // 订单编号
      body: '',
      auctionId: '', // 商品ID
      projectType: '0', // 1诚信保证金  0商品保证金
      sellerIs: 'true', // true 商家   false 用户
      auctionPrice: '0', // 出价价格
      isShow: false, // 弹出窗
      isSkip: false, // 是否可以离开当前页面
      next: {},
      showveri: false,
      showshowlists: false,
      wallet: false,
      flag: false
    }
  },
  beforeRouteEnter (to, form, next) {
    // 判断当前是不是由发布页面跳转过来
    if (form.name == 'nextUpload') {
      sessionStorage.setItem('next', 'true')
      next(vm => {
        vm.auctionPrice = '200'
      })
    } else {
      sessionStorage.setItem('next', 'false')
    }
    next()
  },
  beforeRouteLeave (to, from, next) {
    this.$router.replace(from.fullPath)
    let flag = sessionStorage.getItem('next')
    if (this.isSkip || flag == 'false') {
      sessionStorage.removeItem('next')
      next()
    } else {
      this.isShow = true
      sessionStorage.removeItem('next')
      this.next = next
    }
  },
  methods: {
    // 开启loading效果
    openLoading () {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '正在支付'
      })
    },
    exitalert () {
      this.showalert = false
      this.$router.push('/auction/' + this.auctionId)
    },
    openRecharge () {
      this.isSkip = true
      this.$router.push({
        path: '/dredgeBlancePaid/cashDepositPay',
        query: { auctionId: this.auctionId, projectType: this.projectType }
      })
    },
    closeshowlists () {
      this.showshowlists = false
    },
    // 充值
    goRecharge (text) {
      this.isSkip = true
      if (text == '充值') {
        this.$router.push({path: '/newRecharge', query: {auction_id: this.$route.query.auction_id, type: this.$route.query.type}})
      } else {
        this.$router.push({
          path: '/dredgeBlancePaid/cashDepositPay',
          query: { auctionId: this.auctionId, projectType: this.projectType }
        })
      }
    },
    // 放弃支付
    goSkip () {
      this.$router.push('/newStoreManage/drafts')
      this.next && this.next()
    },
    showkeyBoard () {
      this.bid = true
    },
    closekeyBoard () {
      this.bid = false
      this.password = []
    },
    paymentType (i, index) {
      this.paymentTimeVal = i
      this.sw = index
    },
    auctionCash () {
      auctionCash(this.auctionId, this.projectType)
        .then(res => {
          this.info = res.data
          this.sellerIs = res.data.sellerIs
          this.wallet = res.data.paypasswdIs
          if (this.wallet) {
            this.showshowlists = false
          } else {
            this.showshowlists = true
          }
        })
        .catch(err => {
          // this.$router.push({name:'errorPage'})
        })
    },

    // 安全支付
    paymentSafe () {
      if (!this.wallet) {
        this.showshowlists = true
        return
      }
      let params = {
        channel: this.paymentTimeVal,
        type: this.type,
        price: this.auctionPrice, // _this.info.cashPrice
        auction_id: this.auctionId,
        project_type: this.projectType
      }
      if (this.paymentTimeVal == 'balance') {
        payment(params)
          .then(res => {
            this.showkeyBoard() // 发起支付
            this.order_no = res.data.order_no
            this.body = res.data.body
            this.attach = res.data.attach
          })
          .catch(err => {
            this.showalert = true
            this.alertmessage = err.data.message
          })
      }
      if (this.paymentTimeVal == 'wx_pub') {
        if (this.flag) {
          return
        };
        this.flag = true
        this.wxPay(params)
      }
      if (this.paymentTimeVal == 'atm') {
        // atm支付
      }
    },

    // 余额支付 安全支付回调
    notify () {
      let paymentType = this.paymentTimeVal
      let params = {
        order_no: this.order_no,
        attach: this.attach,
        paypasswd: md5(this.lastpassword),
        body: this.body
      }
      notify(paymentType, params)
        .then(res => {
          this.isSkip = true
          if (this.sellerIs) {
            this.upload()
          } else {
            this.confirmprice()
          }
        })
        .catch(err => {
          alert(err.data.message)
          this.password = []
          this.lastpassword = []
        })
    },
    // 买家出价
    confirmprice () {
      let _this = this
      let params = {
        auction_price: _this.auctionPrice
      }
      let reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/

      if (reg.test(_this.auctionPrice)) {
        auctionAddPrice(params, _this.auctionId)
          .then(function (res) {
            if (res.code == 200) {
              _this.$router.push('/auction/' + _this.auctionId)
            } else {
              Toast(res.message)
            }
          })
          .catch(function (error) {
            let err = {
              err: 'err',
              errmsg: error.data.message
            }
            sessionStorage.setItem('err', JSON.stringify(err))
            _this.$router.push('/auction/' + _this.auctionId)
          })
      }
    },
    // 卖家上传拍品
    upload () {
      let _this = this
      auctionPublish(_this.auctionId)
        .then(function (res) {
          console.log(res.code)
          if (res.code == 200) {
            _this.$router.push('/auction/' + _this.auctionId)
            // _this.alertmessage = res.message
          } else {
            Toast(res.message)
          }
        })
        .catch(function (error) {
          // console.log(error)
          Toast(error.message)
        })
      console.log('卖家上传拍品')
    },

    // *****微信支付开始*****
    reload () {
      this.getSign()
      wx.config(this.config)
      wx.checkJsApi({
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'chooseImage',
          'chooseWXPay'
        ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          console.log(res)
        }
      })
    },
    wxReady () {
      wx.ready(function () {})
    },
    getSign () {
      let params = {
        uri: window.location.href
      }
      getSign(params)
        .then(response => {
          this.config = response.data
          this.config.jsApiList = [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'chooseImage',
            'chooseWXPay'
          ]
        })
        .catch(error => {
          console.log(error.data)
        })
    },
    // 微信支付
    wxPay (params) {
      wxPay(params)
        .then(response => {
          console.log(response)
          this.weixinPay(response.data)
        })
        .catch(error => {})
    },
    weixinPay (data) {
      var vm = this
      if (typeof WeixinJSBridge == 'undefined') {
        // 微信浏览器内置对象。参考微信官方文档
        if (document.addEventListener) {
          document.addEventListener(
            'WeixinJSBridgeReady',
            vm.onBridgeReady(data),
            false
          )
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data))
          document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data))
        }
      } else {
        vm.onBridgeReady(data)
      }
    },
    onBridgeReady (data) {
      var vm = this
      WeixinJSBridge.invoke('getBrandWCPayRequest', data, function (res) {
        if (res.err_msg == 'get_brand_wcpay_request:cancel') {
          console.log('11')
          vm.flag = false
          Toast.clear()
        } else {
          vm.isSkip = true
          if (vm.sellerIs) {
            vm.upload()
          } else {
            vm.confirmprice()
          };
          vm.flag = false
          Toast.clear()
        }

        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        // if(res.err_msg == "get_brand_wcpay_request：ok" ){
        //     if(_this.sellerIs){
        //         this.upload();
        //     }else{
        //         this.confirmprice();
        //     }
        // vm.$router.push("/reservedBerth");
        // }else{
        //   alert("支付失败,请跳转页面"+res.err_msg);
        // }
      })
    },
    // *****微信支付结束*****

    // 删除
    del () {
      this.password.pop()
      this.lastpassword = this.password.join('')
    },
    // 按数字1
    oneClick () {
      console.log(this.password)
      if (this.password.length < 6) {
        this.password.push(1)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字2
    twoClick () {
      if (this.password.length < 6) {
        this.password.push(2)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字3
    threeClick () {
      if (this.password.length < 6) {
        this.password.push(3)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字4
    fourClick () {
      if (this.password.length < 6) {
        this.password.push(4)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字5
    fiveClick () {
      if (this.password.length < 6) {
        this.password.push(5)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字6
    sixClick () {
      if (this.password.length < 6) {
        this.password.push(6)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字7
    sevenClick () {
      if (this.password.length < 6) {
        this.password.push(7)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字8
    eightClick () {
      if (this.password.length < 6) {
        this.password.push(8)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字9
    nineClick () {
      if (this.password.length < 6) {
        this.password.push(9)
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字.
    dblzeroClick () {
      if (this.password.length < 6) {
        this.password.push('.')
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
    },
    // 按数字0
    zeroClick () {
      // if(this.lastpassword!=''){
      if (this.password.length < 6) {
        this.password.push('0')
        this.lastpassword = this.password.join('')
      }
      if (this.password.length == 6) {
        this.notify()
      }
      // }
    }
  },
  mounted () {
    this.auctionId = this.$route.query.auction_id
    this.projectType = this.$route.query.type
    this.auctionPrice = this.$route.query.price
    this.auctionCash()
    this.reload()
  },
  destroyed () {
    window.removeEventListener('popstate')
  }
}
</script>

<style scoped lang="less">
.alertWrongPrice {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1100;
  width: 100%;
  height: 240px;
  background: white;
  text-align: center;
}
.wrongPrice {
  height: 130px;
  color: #999999;
  line-height: 130px;
  font-size: 28px;
}
.priceGray {
  height: 10px;
  background: #ededef;
}
.knowPrice {
  height: 100px;
  color: #9e2026;
  line-height: 100px;
  font-size: 32px;
}
.sharesomething {
  position: fixed;
  left: 50%;
  top: 50%;
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
.sharesomething div:nth-child(4) {
  height: 95px;
  line-height: 90px;
  font-size: 30px;
  width: 49%;
  float: left;
  font-size: 32px;
}
@border-color: #e5e5e5;
.returnRequest {
  min-height: 1000px;
}
.buyer-tool {
  height: 76px;
  line-height: 76px;
  padding: 0 30px;
  position: relative;
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
    margin-bottom: 10px;
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    color: #333;
  }
  .buyer-detail {
    float: left;
    width: 70%;
    margin-top: 40px;
    background: #f7f7f7;
  }
  .buyer-detail li {
    height: 25px;
    line-height: 25px;
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
  margin: 20px 30px 0px 30px;
  font-size: 24px;
  color: #999;
  overflow: hidden;
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
  padding: 10px 10px;
  position: relative;
}
.noaddesss {
  line-height: 100px;
  text-align: center;
  float: left;
  margin-left: 200px;
  font-size: 36px;
}
.address .icon-icon-test {
  float: left;
  line-height: 100px;
}
.address .addressman {
  float: left;
  margin-left: 150px;
}
.address .icon-right {
  float: right;
  line-height: 100px;
  margin: 0 20px;
}
.address .icon-icon-test {
  float: left;
  margin: 0 5px;
}
.addresses {
  overflow: hidden;
  padding: 10px 0px;
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
}
.moneys div {
  float: left;
  color: #999999;
}
.moneys div:nth-child(2) {
  margin-left: 50px;
}
.mnyAndcp {
  height: 140px;
  padding-left: 40px;
}
.salmoney {
  overflow: hidden;
}
.line {
  border: 1px solid #999999;
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
  font-size: 28px;
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
  border-bottom: 1px solid @border-color;
}
.op:nth-last-of-type(1) .con {
  border-bottom: none;
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
    width: 65%;
    float: left;
    margin-left: 25px;
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
  padding: 165px 30px 0 30px;
  box-sizing: border-box;
  text-align: center;
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
.pay {
  width: 10%;
  float: right;
  padding: 45px 0;
  color: #f15511;
}
.msg2 {
  height: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  width: 75%;
  float: right;
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
  box-sizing: border-box;
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
.telsharesomething {
  position: fixed;
  left: 5%;
  top: 35%;
  z-index: 1100;
  width: 90%;
  height: 400px;
  background: white;
  text-align: center;
  border-radius: 10px;
  padding-top: 20px;
}
.telsharesomething .main {
  overflow: hidden;
  margin-top: 0;
}
.telsharesomething .sub {
  height: 88px;
  margin-top: 50px;
  padding: 0 30px;
}
.telsharesomething .sub span {
  display: block;
  width: 100%;
  height: 100%;
  line-height: 88px;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  font-size: 28px;
}
.telsharesomething .sub .spanBac {
  background: #d2d2d2;
}
.telsharesomething .sub .spanBack {
  background: #9e2026;
}
.telsharesomething .main .list {
  background-color: #fff;
  padding-left: 30px;
  height: 100px;
}
.telsharesomething .main .list.last .list-detail {
  border-bottom: none;
}
.telsharesomething .main .list .list-detail {
  border-bottom: 1px solid #d2d2d2;
  box-sizing: border-box;
  height: 101px;
  width: 100%;
  float: left;
  position: relative;
}
.telsharesomething .main .list p {
  line-height: 100px;
  width: 160px;
  color: #000;
  font-size: 28px;
  float: left;
}
.telsharesomething .main .list input {
  display: block;
  width: 75%;
  height: 90px;
  margin-top: 5px;
  color: #999;
  font-size: 24px;
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  float: left;
}
.telsharesomething .main .list .list-detail span {
  display: block;
  width: 174px;
  height: 60px;
  border-radius: 30px;
  background-color: #9e2026;
  line-height: 60px;
  text-align: center;
  color: #fff;
  position: absolute;
  right: 30px;
  top: 0;
  bottom: 0;
  margin: auto;
}
.mobileAlert {
  text-align: center;
  margin-top: 5px;
  color: #f15511;
}
</style>
