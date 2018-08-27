<template>
	<div class="returnRequest">
		<div>
			<div class="buyer-tool">
				<!-- <router-link style="">nickname</router-link> -->
				<a href="">支付保证金</a>
			</div>
			<div class="buy-info">
				<div class="goods-info" v-bind:style="{backgroundImage: 'url(' + SuccessMsg.img + ')'}"></div>
				<p class="goods-intr">{{SuccessMsg.desc}}</p>
				<ul class="buyer-detail">
					<li>支付成功</li>
				</ul>
			</div>
		</div>
    <div class="moneys">
        <div>保证金：￥{{SuccessMsg.cashprice}}元</div>
    </div>
    <div class="gray"></div>
    <div>
        <div class="somesquare">
             <div class="square">
                <div class="dot"></div>
                <div>保证金支付成功</div>
             <!--    <div>{{timestampToTime(SuccessMsg.order.addTime)}}</div> -->
             </div>
             <div class="square">
                <div class="greyDot"></div>
                <div style="color:#d2d2d2;">竞拍成功</div>
               <!--  <div>{{timestampToTime(SuccessMsg.order.paymentTime)}}</div> -->
             </div>
        </div>
    </div>
    <div class="btn">
        <router-link :to="'/auction/'+this.auction_id">
          <button >保证金支付完成</button>
        </router-link>
    </div>
  </div>
</template>
<script>
import {paysuccess} from '../../../api/api'
export default {
  components: {},
  data () {
    return {
      SuccessMsg: {},
      auction_id: ''
    }
  },
  methods: {
    paysuccess () {
      this.auction_id = this.$route.params.auction_id
      paysuccess(this.auction_id).then(res => {
        console.log(res.data)
        this.SuccessMsg = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.paysuccess()
  }
}
</script>

<style scoped lang="less">
@border-color: #e5e5e5;
  .returnRequest{
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
      margin-top:40px;
      background: #f7f7f7
    }
    .buyer-detail li {
      height: 25px;
      line-height: 25px;
      background-color: transparent;
      padding: 0;
      color: #999;
      i{
        color:#9e2026;
      }
    }
  }
  .complaintTitle{
    height: 87px;
    line-height: 87px;
    margin:20px 30px 0px 30px;
    font-size: 24px;
    color: #999;
    overflow: hidden;
  }
  .complaintTitle i:nth-child(1){
    font-size: 30px;
    color:black;
    float: left;
  }
  .complaintTitle i:nth-child(2){
    color:#f15511;
  }
  .icon-jiantouxiangxia{
    margin: 0
  }
  .icon-jiantouxiangshang{
    margin: 0
  }
  #J_login_form{
      border-bottom:2px solid #e5e5e5;
  }
  .login-frame{
      background-color: #fff;
  }
  .login-frame li{
      position: relative;
      display: flex;
      height: 110px;
      line-height:110px;
      margin-left: 30px;
      padding-right: 30px;
      border-bottom:2px solid #e5e5e5;
  }
  .login-frame li p{
      font-size: 28px;
      color: #666;
      width: 70%;
  }

  .arrow{
      position: absolute;
      left: 4%;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
  }
  .arrow{
      color: #9e2026;
  }
  .login-frame li:last-child{
      border: none;
  }
  .login-btn {
      padding:0 30px;
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
  .address{
    overflow: hidden;
    padding: 10px 10px;
    position: relative;
  }
  .noaddesss{
    line-height: 100px;
    text-align: center;
    float: left;
    margin-left: 200px;
    font-size: 36px;
  }
  .address .icon-icon-test{
      float: left;
      line-height: 100px;
  }
  .address .addressman{
    float: left;
    margin-left: 150px;
  }
  .address .icon-right{
      float: right;
      line-height: 100px;
      margin: 0 20px;
  }
  .address .icon-icon-test{
      float: left;
      margin: 0 5px;
  }
  .addresses{
    overflow: hidden;
    padding:10px 0px;
  }
  .addresses div:nth-child(1){
    float: left;
  }
  .addresses div:nth-child(2){
    float: right;
  }
  .gray{
    height:20px;
    background: #f7f7f7
  }
  .moneys{
    overflow: hidden;
    padding: 20px 0px 20px 30px;
  }
  .moneys div{
    float: left;
    color: #999999
  }
  .moneys div:nth-child(2){
    margin-left: 50px;
  }
  .mnyAndcp{
    height: 140px;
    padding-left:40px;
  }
  .salmoney{
    overflow: hidden;
  }
  .line{
    border: 1px solid #999999;
  }
  .salmoney{
        padding:20px 40px 20px 0px;
  }
  .salmoney div:nth-child(1){
    float:left;
  }
  .salmoney div:nth-child(2){
    float:right;
    color:#999999;
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
  .op:nth-last-of-type(1) .con{
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
    padding: 265px 30px 0 30px;
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
    }
  }
  .icon-wodeqianbao1{
    font-size: 70px;
    background: #019fe8;
    color: white;
    border-radius:10px;
    margin-left: 35px;
    margin-top: 30px;
  }
  .icon-duihao2{
      margin: 0;
  }
  .pay{
    width: 10%;
    float: right;
    padding: 45px 0;
    color: #f15511
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
    .floatleft{
      float: left;
      text-align: center;
      line-height: 100px;
      width: 90%;
      font-size: 30px;
    }
    .icon-zuojiantou{
      line-height: 100px;
      float: left;
      margin: 0;
      width: 7%;
      padding-left:3%;
      font-size: 36px;
      color: #c9c9c9;
    }
    .passhead{
      background: white;
      height:100px;
      border-bottom: 1px solid #e5e5e5
    }
    .sixpasswords{
      height:166px;
      background: white;
      padding: 60px 10px;
    }
    .padding-bottom{
      margin-bottom: 20px
    }
    .sixpasswords div{
      float: left;
      width: 120px;
      height: 90px;
      border-left:1px solid #bfbfbf;
      border-top:1px solid #bfbfbf;
      border-bottom:1px solid #bfbfbf;
      line-height: 90px;
      text-align: center;
    }
    .sixpasswords div span{
      font-size: 48px;
      display: inline-block;
      margin-top: 10px;
    }
    .sixpasswords div:nth-child(6){
      border-right:1px solid #bfbfbf;
    }
    .square{
      width: 50%;
      border-top: 1px solid #d2d2d2;
      position: relative;
      text-align: center;
      padding-top: 50px;
      float: left;
    }
    .square div:nth-child(2){
      font-size: 36px;
      color: #f15511
    }
    .square div:nth-child(3){
      color: #a9a9a9
    }
    .dot{
      width: 20px;
      height: 20px;
      border-radius: 10px;
      background: #f15511;
      position: absolute;
      left: 45%;
      top:-10px;
    }
    .greyDot{
      width: 20px;
      height: 20px;
      border-radius: 10px;
      background: #d2d2d2;
      position: absolute;
      left: 45%;
      top:-10px;
    }

    .somesquare{
      margin-top: 80px;
      /*overflow: hidden;*/
    }
</style>
