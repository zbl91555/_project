 <template>
	<div class="app-containerbal" v-if="info!={}">
		<div class="head">
			<router-link to="/balance/touchBalance" class="balance">
				余额明细
				<i class="iconfont icon-right"></i>
			</router-link>
			<p class="titleDetail">余额（元）</p>
			<h1 class="containerbalDetail">{{info.price}}</h1>
			<p class="balance-detail" v-if="user">
				<span>提现中款项：{{indexMoney.withdrawalsPrice}}</span>
				<span>冻结中款项：{{indexMoney.frozenPrice}}</span>
			</p>
			<p class="balanceDetail" v-else>
				<span>待付款：{{indexMoney.waitPay}}</span>
				<span>待发货：{{indexMoney.waitDeliver}}</span>
				<span>待收货：{{indexMoney.waitReceive}}</span>
			</p>
		</div>
		<div class="list">
			<a href="javascript:void(0)" @click="recharge">
				<i class="iconfont icon-chongzhi0101"></i>
				充值
				<i class="iconfont icon-right"></i>
			</a>
			<a href="javascript:void(0)" @click="DrawNext">
				<i class="iconfont icon-tixian"></i>
				提现
				<i class="iconfont icon-right"></i>
			</a>
			<!-- <router-link to="/coupon">
				<i class="iconfont icon-coupon"></i>
				优惠券
				<i class="iconfont icon-right"></i>
			</router-link> -->
		</div>
		<div class="list">
			<router-link to="/paySafe" v-if="info.paypasswdIs">
				<i class="iconfont icon-anquan"></i>
				支付安全
				<i class="iconfont icon-right"></i>
			</router-link>
			<router-link to="/dredgeBlancePaid" v-else>
				<i class="iconfont icon-anquan"></i>
				设置支付密码
				<i class="iconfont icon-right"></i>
			</router-link>

			<!--<router-link to="/">
				<i class="iconfont icon-qian"></i>
				专场保证金
				<i class="iconfont icon-right"></i>
			</router-link>-->
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
import { Toast } from 'vant'
import { wallet } from '../../api/api'
export default {
  data () {
    return {
      info: {},
      user: true,
      indexMoney: {}
    }
  },
  methods: {
    // 提现
    DrawNext () {
      if (this.info.paypasswdIs) {
        sessionStorage.setItem('balPath', this.$route.path)
        this.$router.push('/withDrawNext')
      } else {
        this.$router.push('/dredgeBlancePaid')
      }
    },
    // 充值
    recharge () {
      if (this.info.paypasswdIs) {
        this.$router.push('/newRecharge')
      } else {
        this.$router.push('/dredgeBlancePaid')
      }
    },
    wallet () {
      wallet(this.$route.params.type)
        .then(res => {
          this.info = res.data
          this.indexMoney = res.data.indexMoney
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.wallet()
  },
  mounted () {
    if (this.$route.params.type == 'user') {
      this.user = true
    } else {
      this.user = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next()
    if (from.path == '/balance/paySafe/resetPayPsd') {
      Toast('重置密码成功')
    }
    if (from.path == '/newforgetPsd') {
      Toast('成功找回密码')
    }
    if (from.path == '/modifyId') {
      Toast('修改身份信息成功')
    }
  }
}
</script>

<style lang="less" scoped>
  /*
  * @border-color: 统一边框颜色coupon
  *
  */

@border-color: #d2d2d2;
.app-containerbal {
  min-height: 1234px;
}
.app-containerbal .iconfont {
  font-size: 24px;
}
.app-containerbal .head {
  height: 290px;
  box-sizing: border-box;
  background-color: #fff;
  .balance {
    display: block;
    text-align: right;
    color: #666;
    padding: 0 30px;
    padding-top: 20px;
  }
  .titleDetail {
    color: #999;
    line-height: 2;
    text-align: center;
  }
  .containerbalDetail {
    color: #9e2026;
    text-align: center;
    font-size: 56px;
    line-height: 56px;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-color;
    margin-top: 20px;
  }
  .balance-detail {
    padding: 30px 0;
    overflow: hidden;
    span {
      display: inline-block;
      width: 50%;
      float: left;
      border-right: 1px solid @border-color;
      box-sizing: border-box;
      height: 40px;
      text-align: center;
      font-size: 28px;
      color: #333;
    }
    span:last-of-type {
      border: none;
    }
  }
  .balanceDetail {
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      width: 50%;
      border-right: 1px solid @border-color;
      box-sizing: border-box;
      height: 40px;
      text-align: center;
      font-size: 28px;
      color: #333;
    }
    span:last-of-type {
      border: none;
    }
  }
}
.app-containerbal .list {
  background-color: #fff;
  margin-top: 20px;
  padding-left: 30px;
  a {
    display: block;
    line-height: 100px;
    border-bottom: 1px solid @border-color;
    font-size: 28px;
    color: #333;
    padding-right: 30px;
    i:nth-child(1) {
      font-size: 36px;
      color: #f15511;
    }
    i:nth-child(2) {
      float: right;
    }
  }
  a:nth-last-of-type(1) {
    border: none;
  }
}
.app-containerbal .list:last-of-type a i:nth-child(1) {
  color: #13b0fd;
}
.app-containerbal .icon-right {
  color: #999;
}
</style>
