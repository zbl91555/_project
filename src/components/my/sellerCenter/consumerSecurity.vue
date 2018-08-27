<template>
  <div class="consumerSecurity">
    <div class="bailMain">
      <div class="bailMoney">
        <span>消保金余额
          <i>{{deposit}}</i>
        </span>
        <div class="options">
          <router-link to="/payConsumerSecurity">
            <div class="payBn" @click='payMoney'>缴纳</div>
          </router-link>
            <div class="exportBnOn" @click="withdrawal()">提取</div>
        </div>
      </div>
    </div>
    <div class="rechargeTips">消保金在30天内不能提取</div>
    <div class="recordDiv">
      <div class="rechargeItem">
        <div class="title">消费记录</div>
      </div>
      <div class="recordList">
        <ul id="depositdata">
          <li v-for = "(item,index) in consumer" :key="index">
            <div class="recordList_left">
              <i>{{item.deposit_name}}</i>
              <p>订单编号：{{item.deposit_sn}}</p>
              <p>处理时间：{{timestampToTime(item.deposit_add_time)}}</p>
            </div>
            <div class="recordList_right">￥{{item.deposit_price}}元</div>
        </li>
        </ul>
      </div>
    </div>
    <!-- 是否弹出提现 -->
    <div id="fixednumMain" v-if="showtel">
      <div @click="closeshowdel()" class="fixednumMask" style="opacity: 0.38;">
      </div>
      <div class="telsharesomething">
          <div style="font-size:22px">您还没有可提现的金额</div>
          <div style="height:70px">规则：消保金在充值30天内不可进行提现</div>
        <div>
          <div style="border-top:1px solid #e5e5e5;color:#5cbf24;font-size:20px" @click="closeshowdel">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import {consumerSecurity} from '../../../api/api'
export default {
  data () {
    return {
      consumer: [],
      deposit: '',
      shengyu_price: '',
      userPrice: '',
      showtel: false,
      wallet: ''
    }
  },
  methods: {
    closeshowdel () {
      this.showtel = false
    },
    payMoney () {
      let params = {
        deposit: this.deposit,
        userPrice: this.userPrice
      }
      localStorage.setItem('payMoney', this.userPrice)
      localStorage.setItem('wallet', this.wallet)
      // this.$store.commit('consumerPrice',params)
    },
    consumerSecurity () {
      let _this = this
      consumerSecurity().then(function (response) {
        if (response.code == 200) {
          _this.consumer = response.data.datalist
          _this.deposit = response.data.balance
          _this.userPrice = response.data.user_price
          _this.shengyu_price = response.data.shengyu_price
          _this.wallet = response.data.wallet
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    withdrawal () {
      if (this.shengyu_price > 0) {
        this.$router.push('/sellerCenter/withdrawDeposit/' + this.shengyu_price)
      } else {
        this.showtel = true
      }
    }
  },
  mounted () {
    this.consumerSecurity()
  }
}
</script>

<style scoped>
.fixednumMask {
    position: fixed;
    width: 10rem;
    opacity: 0.38;
    top: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.38;
    z-index: 999;
}
.consumerSecurity{
    max-width: 750px;
    min-height: 100vh;
    background-color: #f4f4f4;
    padding-top: 20px;
}
.consumerSecurity .bailMain {
    width: 100%;
    height: 110px;
    line-height: 110px;
    background-color: #FFF;
    font-size: 28px;
    color: #333;
}

.consumerSecurity .bailMain .bailMoney {
    margin-left: 30px;
}
.consumerSecurity .bailMoney span {
    font-size: 28px;
}
.consumerSecurity .bailMoney i {
    margin-left: 30px;
    font-size: 28px;
    color: #f15511;
}
.consumerSecurity .options {
    width: 225px;
    height: 110px;
    float: right;
}
.consumerSecurity .options .payBn {
    color: #fff;
    width: 115px;
    height: 110px;
    line-height: 110px;
    text-align: center;
    background: #f15511;
    display: block;
    float: left;
}
.consumerSecurity .options .exportBnOn {
    color: #fff;
    width: 110px;
    height: 110px;
    line-height: 110px;
    text-align: center;
    background: #c8c8c8;
    display: block;
    float: left;
}
.consumerSecurity .bailMain .bailMoney p {
    display: block;
    float: right;
    text-align: right;
    color: #9E0006;
}
.consumerSecurity .rechargeTips {
    height: 75px;
    line-height: 75px;
    margin: 0 30px;
    color: #999;
    font-size: 24px;
}
.consumerSecurity .rechargeItem {
    height: 110px;
    padding: 0 30px;
    background-color: #FFF;
    line-height: 110px;
    font-size: 28px;
    color: #2a94c8;
}
.consumerSecurity .recordDiv {
    background: #fff;
}
.recordList ul li {
    height:120px;
    padding: 50px 0px;
    border-top: #f6f6f6 2px solid;
    margin: 0 30px;
}

.recordList ul li i {
    color: #333;
    font-size: 28px;
}
.recordList ul li p {
    color: #666;
    margin-top: 12px;
    font-size:24px;
}
.recordList ul li  .recordList_left{
  float: left;
}
.recordList ul li .recordList_right {
    height: 220px;
    float: right;
    line-height: 220px;
    font-size: 32px;
    color: #333;
}
.telsharesomething div:nth-child(2){
    line-height:45px;
    font-size: 30px;
    padding:20px 40px
  }
.telsharesomething div:nth-child(1){
    height: 90px;
    line-height: 90px;
    font-size: 30px
  }
  .telsharesomething{
    position: fixed;
    left:50%;
    top:50%;
    z-index: 1100;
    width: 7rem;
    background: white;
    text-align: center;
    border-radius: 20px;
    transform : translate(-50%,-50%);
  }
</style>
