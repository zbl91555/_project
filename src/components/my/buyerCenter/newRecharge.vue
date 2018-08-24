<template>
	<div class="newRecharge">
		<div class="topUp">
			<div class="head">
				<div>充值</div>
			</div>
			<div class="chargeMoney">
				充值金额
			</div>
			<div class="money" @click="openKeyboard">
				￥<span style="font-size:1rem">{{val}}<i v-show="cursor1" id="cursor1" style="font-size:1rem">|</i></span>
				<span v-if="des" style="font-size:0.5rem;color:#d2d2d2;">请输入充值金额</span>
			</div>
			<div :class="val==''? 'nextStep':'nextStepC'" @click="nextStep">
				下一步
			</div>
		</div>
		<!-- 自定义键盘@complete="blur" -->
		<keyboard :show="keyboard" @typing="typing" @complete="closeKeyboard"/>
	</div>
</template>

<script>
import keyboard from "../../home/keyboard"; //数字键盘
export default {
  components: {
    keyboard
  },
  // mixins:[assign],
  data() {
    return {
      // 键盘相关data
      keyboard: false,
      cursor1: false,
      val: "",
      des: true,
			product: "",//拍品id
			bond : '',//保证金id
			type : '',//保证金type
			premium : '',//消保金
			personalAuthentication : '',//个人认证
			enterpriseCertification : '',//企业认证
    };
  },
  mounted() {
		let path = this.$route.query;
    if (path.order_id) {
      this.product = path.order_id;
    }else if(path.auction_id) {
			this.bond = path.auction_id;
			this.type = path.type;
		}else if (path.premium) {
			this.premium = path.premium;
		}else if(path.personal_authentication) {
			this.personalAuthentication = path.personal_authentication;
		}else if (path.enterprise_certification) {
			this.enterpriseCertification = path.enterprise_certification;
		}
  },
  methods: {
    openKeyboard() {
      this.keyboard = true;
      this.cursor1 = true;
      this.des = false;
    },
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
    nextStep() {
      if (!this.val) {
        return;
      }
      if (this.product) {
        this.$router.push({
          path: "/payment/newRechargeNext",
          query: { rechargeYu: this.val,product : this.product }
				});
				return ;
			}else if (this.bond) {
        this.$router.push({
          path: "/payment/newRechargeNext",
          query: { rechargeYu: this.val,bond : this.bond,type : this.type }
				});				
				return ;
			}else if (this.premium) {
				this.$router.push({
          path: "/payment/newRechargeNext",
          query: { rechargeYu: this.val,premium : this.premium }
				});
				return ;
			}else if (this.personalAuthentication) {
				this.$router.push({
          path: "/payment/newRechargeNext",
          query: { rechargeYu: this.val,personalAuthentication : this.personalAuthentication }
				});			
				return ;	
			}else if (this.enterpriseCertification) {
				this.$router.push({
          path: "/payment/newRechargeNext",
          query: { rechargeYu: this.val,enterpriseCertification : this.enterpriseCertification }
				});			
				return ;					
			}
			this.$router.push({path:'/payment/newRechargeNext',query:{rechargeYu:this.val}});
    }
  }
};
</script>

<style scoped>
.newRecharge {
  padding-top: 30px;
}
.newRecharge .topUp {
  width: 95%;
  height: 514px;
  background: #fff;
  margin: 0px auto;
}
.newRecharge .topUp .head {
  height: 35px;
  background: #f6f6f6;
  font-size: 28px;
  padding: 40px 56px;
}
.newRecharge .topUp .chargeMoney {
  padding: 30px 56px;
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