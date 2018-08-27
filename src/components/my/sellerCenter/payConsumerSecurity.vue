
  <template>
    <div class="newRecharge">
    <div class="topUp" v-if="nowPage">
      <div class="head">
        <div>消保金</div>
        <div>{{price}}</div>
      </div>
      <div class="chargeMoney">
        缴纳金额
      </div>
      <div class="money" @click="openKeyboard">
        ￥<span style="font-size:1rem">{{val}}<i v-show="cursor1" id="cursor1" style="font-size:1rem">|</i></span>
        <span v-if="des" style="font-size:0.5rem;color:#d2d2d2;">请输入缴纳金额</span>
      </div>
      <div class="border"></div>
      <div class="chargeMoney" style="color:#999999;">至少缴纳1000元</div>
      <div :class="val==''? 'nextStep':'nextStepC'" @click="nextStep">
        下一步
      </div>
      <div class="infuse" >
        下一步即表示同意《淘拍堂消费者保障服务协议》
      </div>
    </div>
    <!-- 自定义键盘-->
    <keyboard :show="keyboard" @typing="typing" @complete="closeKeyboard"/>
  </div>
  </template>
<script>
import { Toast } from 'vant'
import { pay } from '../../../api/api'
import keyboard from '../../home/keyboard' // 数字键盘
export default {
  components: {
    keyboard
  },
  // mixins:[assign],
  data () {
    return {
      // 键盘相关data
      keyboard: false,
      cursor1: false,
      val: '',
      nowPage: true,
      downPage: false,
      title: '余额提现',
      link: '/balanceIndex',
      des: true,
      price: ''
    }
  },
  methods: {
    openKeyboard () {
      this.keyboard = true
      this.cursor1 = true
      this.des = false
    },
    closeKeyboard () {
      this.keyboard = false
      this.cursor1 = false
    },
    /* 输入 */
    typing (value) {
      /* 如果是点击删除 */
      if (value === '') {
        this.del()
      }
      /* 获取新的值 */
      this.val = this.val + value
    },
    del () {
      this.val = this.val.slice(0, -1)
    },
    // 下一步
    nextStep () {
      if (this.val == '') {
        Toast('请输入金额')
        return
      }
      if (this.val >= 1000) {
        localStorage.setItem('payPrice', this.val)
        this.$router.push({name: 'consumerPay'})
      } else {
        Toast('至少缴纳1000元')
      }
    }
  },
  mounted () {
    this.price = this.$store.state.twoprice.deposit
  }
}
</script>
  <style scoped>
.newRecharge {
  padding-top: 30px;
}
.newRecharge .topUp {
  width: 95%;
  height: 643px;
  background: #fff;
  margin: 0px auto;
}
.newRecharge .topUp .head {
  height: 35px;
  background: #f8f8f8;
  font-size: 28px;
  padding: 40px 56px;
}
.newRecharge .topUp .chargeMoney {
  padding: 30px 56px 20px 56px;
  font-size: 24px;
}
.newRecharge .topUp .money {
  padding: 0px 56px;
  font-size: 48px;
}
.newRecharge .topUp .nextStep {
  width: 600px;
  height: 90px;
  background: #d2d2d2;
  border-radius: 8px;
  color: white;
  font-size: 28px;
  text-align: center;
  line-height: 90px;
  margin: 30px auto;
}
.infuse {
  width: 600px;
  margin: 0 auto;
  color: #999999;
}
.infuse i {
  color: #9e2026;
}
.border {
  border: 1px solid #d2d2d2;
  width: 600px;
  margin-left: 56px;
}
.newRecharge .topUp .nextStepC {
  width: 600px;
  height: 90px;
  background: #9e2026;
  border-radius: 8px;
  color: white;
  font-size: 28px;
  text-align: center;
  line-height: 90px;
  margin: 30px auto;
}
.newRecharge .topUp .head div:nth-child(1) {
  float: left;
}
.newRecharge .topUp .head div:nth-child(2) {
  float: right;
  color: #9e2026;
}
#cursor1 {
  animation: play 0.8s linear infinite;
}
</style>
