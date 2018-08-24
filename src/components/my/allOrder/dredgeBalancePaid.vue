<template>
	<div class="dredgeBlancePaid">
  <div class="commons">
	  <div class="common">
      <div>姓名</div>
      <div>
          <input class="write" type="text"  v-model="cardname" placeholder="填写真实姓名">
      </div>
    </div>
    <div class="commonT">
      <div>身份证号</div>
      <div>
          <input class="write" type="text" v-model="cardid"  value="" placeholder="填写身份证号">
      </div>
    </div>
  </div>
  <div class="descr">
      请设置您的安全支付密码(6位数字)
  </div>
  <div class="commons">
    <div class="common">
      <div>支付密码</div>
      <div>
          <input class="write" type="password" v-model="paypasswd"  placeholder="填写支付密码">
      </div>
    </div>
    <div class="commonT">
      <div>确认支付密码</div>
      <div>
          <input class="write" type="password" v-model="rePaypasswd"  placeholder="请再次填写支付密码">
      </div>
    </div>
  </div>
  <div class="confirm" @click="walletOpenSubmit">
    确认
  </div>
	</div>
</template>
<script>
  import { Toast } from 'vant'; 
  import md5 from 'md5';
  import {walletOpen,walletOpenSubmit} from '../../../api/api';
	export default {

		data() {
			return {
          info: {},
          cardname:'',
          cardid:'',
          paypasswd:'',
          rePaypasswd:'',
			}
		},
		methods: {
      //页面
      walletOpen: function() {
        let _this = this;
        walletOpen().then(res=>{
           _this.info = res.data;
           _this.cardname = res.data.cardname;
           _this.cardid = res.data.cardid;
        }).catch(function(err) {
            _this.$router.push({name:'errorPage'})
        })
      },

      //提交
      walletOpenSubmit(){
        let _this = this;
        var reg = new RegExp(/^\d{6}$/);
        
        if(!reg.test(_this.paypasswd)){
            Toast('密码请输入6位数字');
            return;
        }
        if(!reg.test(_this.rePaypasswd)){
            Toast('确认密码请输入6位数字');
            return;
        }
        if(_this.paypasswd != _this.rePaypasswd){
            Toast('两次密码输入不一致');
            return;
        }
        let params = {
           cardname:_this.cardname,
           cardid:_this.cardid,
           paypasswd:md5(_this.paypasswd),
           rePaypasswd:md5(_this.rePaypasswd),
        };
        walletOpenSubmit(params).then(res=> {
          localStorage.setItem('wallet','true')
          if(_this.$route.params.payRightnow == 'payRightnow'){
            _this.$router.go(-1);
          }else if(_this.$route.params.payRightnow == 'persCertiPay'){
            _this.$router.push('/payment/personalCertificatePay')
          }else if(_this.$route.params.payRightnow == 'enterCertiPay'){
            _this.$router.push('/payment/enterpriseCertiPay')
          }else if(_this.$route.params.payRightnow == 'consumerPay'){
            _this.$router.push('/payment/consumerPay')
          }else if(_this.$route.params.payRightnow == 'cashDepositPay'){
            _this.$router.push({path:'/payment/cashDepositPay',query:{auction_id:this.$route.query.auctionId,type:this.$route.query.projectType}})
          }else{
            _this.$router.go(-1)
          }
        }).catch(err=> {
          Toast(err.data.message);
        })
      },
		},
		 mounted() {
        this.walletOpen();
		 }
	}
</script>

<style scoped lang="less">
  .dredgeBlancePaid{
    background: #f4f4f4;
    height: 1300px;
    padding-top:24px; 
  }
  .dredgeBlancePaid .common{
    background: #ffffff;
    height: 109px;
    overflow: hidden;
    margin-left: 30px;
    border-bottom: 1px solid #e5e5e5
  }
  .dredgeBlancePaid .commonT{
    background: #ffffff;
    height: 110px;
    overflow: hidden;
    margin-left: 30px;
  }
  .dredgeBlancePaid .commons{
    background: #ffffff;
    height: 220px;
    overflow: hidden;
  }
  .dredgeBlancePaid .common div{
    float:left;
    font-size: 28px;
  }
  .dredgeBlancePaid .common div:nth-child(1){
    width: 224px;
    line-height:110px; 
  }
  .dredgeBlancePaid .commonT div{
    float:left;
    font-size: 28px;
  }
  .dredgeBlancePaid .commonT div:nth-child(1){
    width: 224px;
    line-height:110px; 
  }
  .write{
    border:none;
    height: 110px; 
    width: 450px;
  }
  input{
    font-size: 32px;
  }
  input::-webkit-input-placeholder { /* WebKit browsers */  
        color:#c9c9c9;
    }  
    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
        color:#c9c9c9; 
    }  
    input::-moz-placeholder { /* Mozilla Firefox 19+ */  
        color:#c9c9c9;  
    }  
    input:-ms-input-placeholder { /* Internet Explorer 10+ */  
        color:#c9c9c9;
    } 
  .descr{
    height: 78px;
    color: #999999;
    font-size: 28px;
    line-height: 78px;
    padding-left: 30px;
  }
  .confirm{
    width: 670px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    background: #9e2026;
    color: white;
    border-radius: 5px;
    margin: 206px auto;
  }
</style>