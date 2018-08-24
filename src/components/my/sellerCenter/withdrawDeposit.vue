<!-- <template>
	<div class="app-container">
		<div v-if="nowPage">
			<div class="title">
				提现
				<router-link to="/member/consumerSecurity">
				<div class="icon-zuojiantou iconfont"></div>
				</router-link>
			</div>
			<div class="list">
				<div>可提现金额</div>
				<div>{{price}}元</div>
			</div>
			<div class="tips">
				提取现金
			</div>
			<div class="list">
				<p>金额</p>
				<input v-model="nowprice" type="text" placeholder="" />
			</div>
			<div class="remindermoney">
				预计24小时前到账
			</div>
			<div class="sub" @click="depositWithdraw">
					<span>提现</span>
					<div class="nextAgree">下一步即表示同意《淘拍堂消费者保障服务协议》</div>
			</div>
		</div>
		<withDrawNextDown :price='nowprice' :title="title" :link="link" v-if="downPage"></withDrawNextDown>
	</div>
</template> -->
<template>
	<div class="newRecharge">
		<div class="topUp" v-if="nowPage">
			<div class="head">
				<div>可提现金额</div>
				<div>{{price}}元</div>
			</div>
			<div class="chargeMoney">
				提现金额
			</div>
			<div class="money">
				￥<span style="font-size:1rem">{{val}}</span>
			</div>
			<div class="border"></div>
			<div class="chargeMoney" style="color:#999999;">预计48小时到账</div>
			<div :class="val==''? 'nextStep':'nextStepC'" @click="depositWithdraw">
				下一步
			</div>
			<div class="infuse">
				下一步即表示同意《淘拍堂消费者保障服务协议》
			</div>
		</div>
		<!-- 自定义键盘-->
		<keyboard :show="keyboard" @typing="typing" @complete="closeKeyboard"/>
		<withDrawNextDown :price='nowprice' :title="title" :link="link" v-if="downPage"></withDrawNextDown>
	</div>
</template>
<script>
import withDrawNextDown from "../withDrawNextDown";
import { Toast } from "vant";
import { depositWithdrawView, depositWithdraw } from "../../../api/api";
import keyboard from "../../home/keyboard"; //数字键盘
export default {
  components: {
    keyboard,
    withDrawNextDown
  },
  data() {
    return {
      // 键盘相关data
      keyboard: false,
      cursor1: false,
      val: "",
      nowPage: true,
      downPage: false,
      title: "余额提现",
      link: "/balanceIndex",
      des: true,
      price: ""
    };
  },
  methods: {
    closeKeyboard() {
      this.keyboard = false;
      this.cursor1 = false;
    },
    /*输入*/
    typing(value) {
      /*如果是点击删除*/
      if (value === "") {
        this.del();
      }
      /*获取新的值*/
      this.val = this.val + value;
    },
    del() {
      this.val = this.val.slice(0, -1);
    },
    depositWithdrawView() {
      depositWithdrawView()
        .then(res => {
          this.price = res.data;
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    depositWithdraw() {
      if (
        isNaN(this.val) == true ||
        this.Trim(this.val, "g") == "" ||
        this.val.charAt(0) == "0"
      ) {
        Toast("请输入正确的金额");
        return;
      }
      if (this.val <= 0) {
        Toast("提现金额必须大于￥1元");
        return;
      }
      // this.$store.commit("revCash", this.val);
      this.$router.push({ name: "withdrawDepositCash",params : {price:this.val} });
      //     let params = {
      //     	price :this.val
      //     };
      //     depositWithdraw(params).then(res=> {
      //       this.nowPage = false
      // this.downPage = true
      //     }).catch(err=> {
      //     	Toast(err.data.message)
      //     })
    }
  },
  created() {
    this.val = this.$route.params.money;
    this.depositWithdrawView();
  }
};
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
<!-- <script>
import {Toast} from 'vant'
import withDrawNextDown from '../withDrawNextDown'
import {depositWithdrawView,depositWithdraw} from '../../../api/api'
export default {
		components:{
			withDrawNextDown
		},
		data() {
			return {
				importFileUrl:'',
                fileList:[],
                dialogVisible: false,
                dialogImageUrl:'',
                price:'',
                nowprice:'',
                nowPage:true,
				downPage:false,
				title:'消保金提现',
				link:'/member/consumerSecurity'
			}
		},
		methods: {
			depositWithdrawView(){
              depositWithdrawView().then(
                    res => {
                      this.price=res.data;
                    }
                ).catch(err=>{
                    console.log(err.response.data.message);
                })
            },
            depositWithdraw(){
                let params = {
                	price :this.nowprice
                };
                depositWithdraw(params).then(res=> {
                  console.log(res.data);
                  this.nowPage = false
		          this.downPage = true
                }).catch(err=> {
                	Toast(err.data.message)
                })
            },
		},
		created() {
			this.depositWithdrawView()
		}
	}
</script> -->

<style lang="less" scoped>
/*
	 * @border-color: 统一边框颜色
	 * */

@border-color: #e5e5e5;
.title {
  text-align: center;
  position: relative;
  height: 60px;
  line-height: 60px;
}
.title div {
  position: absolute;
  left: 0;
  top: 0;
  line-height: 60px;
}
.icon-zuojiantou {
  margin: 0;
  font-size: 24px;
  padding-left: 20px;
}
.app-container {
  min-height: 1234px;
  background-color: #f4f4f4;
}

.list {
  height: 110px;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid @border-color;
  border-top: 1px solid @border-color;
  overflow: hidden;
  p {
    width: 178px;
    line-height: 110px;
    font-size: 28px;
    color: #333;
    padding: 0 30px;
    box-sizing: border-box;
  }
  input {
    display: inline-block;
    width: 72%;
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    font-size: 24px;
    color: #999;
    height: 107px;
    margin-top: 1px;
  }
  p,
  input {
    float: left;
  }
}
.tips {
  height: 65px;
  line-height: 65px;
  color: #999;
  padding: 0 30px;
}
.sub {
  height: 88px;
  margin-top: 100px;
  padding: 0 30px;
  span {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 88px;
    text-align: center;
    background-color: #9e2026;
    border-radius: 5px;
    color: #fff;
    font-size: 30px;
  }
}
.list div:nth-child(1) {
  float: left;
  line-height: 110px;
  padding-left: 30px;
}
.list div:nth-child(2) {
  float: right;
  line-height: 110px;
  padding-right: 30px;
}
.remindermoney {
  text-align: right;
  margin-top: 10px;
  padding-right: 10px;
}
.nextAgree {
  text-align: right;
  margin-top: 10px;
}
</style>