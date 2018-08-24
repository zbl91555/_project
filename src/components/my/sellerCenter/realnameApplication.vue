<template>
  <div class="certification">
    <div class="rejectReason" v-if="rejectReason">
        驳回原因：{{reason}}
    </div>
    <div class="rejectReason" v-if="overdueReason">
        {{reasonText}}
    </div>
  	<div class="verifyMainReal">
	    <div class="verifyBoxReal userInfo ">
			<div class="avatar">
				<div class="img" :style="{backgroundImage: 'url(' + info.avatar + ')'}">
				</div>
			</div>
			<div class="verifyInfo">
				<div class="userName">
					{{info.nickname}}
				</div>
				<p>
					{{Time}} 
				</p>
			</div>
			<div class="verifyState ">				
                    {{verifyState}}		
			</div>
		</div>
		<div class="unverified">
			<div class="verifyBoxReal apply" v-if="payMoney">
				<div class="title border horizonBottom">
					申请认证
				</div>
				<div class="applyOptionList">
					<div class="applyItem" @click.stop="changeTo">
						
							<div class="applyIcon finished">
								<span class="fi-stack">
									<i class="iconfont icon-yonghudianji"></i></span>
							</div>
							<p>
								个人实名认证
							</p>
 							<div v-if="personApply" class="applyBtns">
    								申请
    							</div>
                            <div v-if="personApplying" class="applyBtnsNew">
                                    个人认证审核中
                            </div>	
                            <div v-if="perapplying" class="applyBtnsGray">
                                    申请
                            </div>
					</div>
					<div class="applyItem" @click="changeToEn">
						<div class="business">
							<div class="applyIcon finished">
								<span class="wptFM fi-stack">
									<i class="iconfont icon-qiye"></i></span>
							</div>
							<p>
								企业实名认证
							</p>
    							<div v-if="enterpriseApply" class="applyBtns " >
    								申请
    							</div>
                                <div v-if="enterpriseApplying" class="applyBtnsNew">
                                    企业认证审核中
                                </div>
                                <div v-if="enterapplying" class="applyBtnsGray">
                                    申请
                                </div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="verifyBoxReal">
		    <div class="title">认证特权</div>
		    <div class="powerList">
		        <div class="powerItem">
		        	<i class="iconfont icon-liwu"></i>
		        	参与平台活动
		    	</div>
		        <div class="powerItem">
		        	<i class="iconfont icon-jinzhi"></i>
		    		黑名单数量增加到300
		    	</div>
		        <div class="powerItem">
			        <i class="iconfont icon-tixian1"></i>
			    	提现次数增加到2次/天
			    </div>
		        <div class="powerItem">
		        	<i class="iconfont icon-iconfontzhizuobiaozhun023106"></i>
		        	店铺当中增加认证标记
		    	</div>
		        <div class="powerItem">
		        	<i class="iconfont icon-xinyi"></i>
		        	增加点赞次数
		        </div>
		        <div class="powerItem">
		        	<i class="iconfont icon-aaa"></i>
			        每日上拍件数不限
			    </div>
		        <div class="powerItem">
		        	<i class="iconfont icon-huangguan"></i>
		        	增加店铺权重
		    </div>
		    </div>
		</div>
        <div class="btn" v-if="payMoneySafe">
          <div v-if="info.state != 'renew'" style="text-align: left;color: #666;">您好，请点击“支付”按钮，完成认证费用的支付</div>
          <div v-else style="text-align: left;color: #666;">您好，请点击“续费”按钮，完成认证有效期的续费</div>
          <div style="text-align: left;margin-top:20px;color: #666;">
                <span>认证费用：</span>
                <span style="color: red">￥{{info.price}}</span>
          </div>
          <button @click="paymentSafe">{{info.state == 'renew'? '立即续费' : '安全支付'}}</button>
        </div>
	</div>
  </div>
</template>
<script type="text/javascript">
    import {companyView} from '../../../api/api'
    export default {
        data() {
            return {
                importFileUrl:'',
                fileList:[],
                dialogVisible: false,
                dialogImageUrl:'',
                info:{},
                verifyState:'',
                payMoney:true, //认证未支付
                personApply:true,
                enterpriseApply:true,
                personApplying:false,
                enterpriseApplying:false,
                perapplying:false,
                enterapplying:false,
                payMoneySafe:false,
                Time : '立即实名认证享更多特权服务',
                rejectReason:false,
                reason:'',
                reasonText : '',
                overdueReason:false,
            }
        },
        methods: {
            paymentSafe(){
                if(this.info.state == 'unpaid_business'){
                    this.$router.push('/payment/enterpriseCertiPay')
                }else{
                    this.$router.push('/payment/personalCertificatePay')
                }
            },
            changeTo(){
                if(this.personApply){
                    this.$router.push('/sellerCenter/applicationPersonalCertification')
                }else{
                    return
                }
            },
            changeToEn(){
                if(this.enterpriseApply){
                    this.$router.push('/sellerCenter/applicationEnterpriseCertification')
                }else{
                    return
                }
            },
            //页面加载
             companyView(){
                  companyView().then(
                        res => {
                          this.info=res.data;
                          this.overdueReason = false;
                          if(this.info.state == 'reject'){
                                this.rejectReason = true
                                this.reason = this.info.reason
                          }
                          if(this.info.state == 'new_overdue' || this.info.state == 'overdue'){
                                this.overdueReason = true
                          }
                          if(this.info.state == 'renew_overdue'){
                                this.renewOverdueReason = true
                          }
                          if(this.info.state == 'renew'){
                                this.renew = true
                          }
                          if(this.info.is_company_type == 'individual'){
                                this.verifyState = '已个人认证'
                          }else if(this.info.is_company_type == 'business'){
                                this.verifyState = '已企业认证'
                          }else if(this.info.is_company_type == false){
                                this.verifyState = '未认证'
                          }
                          //判断审核状态
                          if(this.info.state == 'unpaid_person'){
                                this.payMoney = false;
                                this.payMoneySafe = true
                          }else if(this.info.state == 'unpaid_business'){
                                this.payMoney = false;
                                this.payMoneySafe = true
                          }
                          if(this.info.state == 'review_person'){
                                this.personApply = false;
                                this.personApplying = true;
                                this.perapplying = false;
                                this.enterapplying = true;
                                this.enterpriseApplying = false;
                                this.enterpriseApply = false
                          }else if(this.info.state == 'review_business'){
                                this.enterpriseApply = false;
                                this.enterpriseApplying = true;
                                this.enterapplying = false;
                                this.personApply = false;
                                this.personApplying = false;
                                this.perapplying = true;
                          }else if(this.info.state == 'reject'){
                                this.payMoney=true; //认证未支付
                                this.personApply=true;
                                this.enterpriseApply=true;
                                this.personApplying=false;
                                this.enterpriseApplying=false;
                                this.perapplying=false;
                                this.enterapplying=false;
                                this.overdueReason = true;
                                this.reasonText = this.info.reason;
                          }else if(this.info.state == 'initial'){
                                this.payMoney=true; //认证未支付
                                this.personApply=true;
                                this.enterpriseApply=true;
                                this.personApplying=false;
                                this.enterpriseApplying=false;
                                this.perapplying=false;
                                this.enterapplying=false;
                          }else if(this.info.state == 'approve'){
                                this.payMoney = false;
                                this.payMoneySafe = false;
                                this.Time ='认证有效期至：' + this.timestampToTimeYMD(this.info.company_valid);
                          }else if(this.info.state == 'overdue'){//身份过期,重新申请
                                this.payMoney=true; 
                                this.personApply=true;
                                this.enterpriseApply=true;
                                this.personApplying=false;
                                this.enterpriseApplying=false;
                                this.perapplying=false;
                                this.enterapplying=false;
                                this.overdueReason = true;
                                this.reasonText = '您的身份已过期，请重新提交申请';
                          }else if(this.info.state == 'renew_overdue'){//1.0旧用户有效期最后一个月，续费即重新认证
                                this.payMoney=true; 
                                this.personApply=true;
                                this.enterpriseApply=true;
                                this.personApplying=false;
                                this.enterpriseApplying=false;
                                this.perapplying=false;
                                this.enterapplying=false;
                                this.overdueReason = true;
                                this.reasonText = '由于系统更新，身份有效期剩余1个月的旧用户需进行重新认证';
                                this.Time ='认证有效期至：' + this.timestampToTimeYMD(this.info.company_valid);
                          }else if(this.info.state == 'renew'){  //2.0新用户有效期最后一个月，续费
                                this.payMoney = false;
                                this.payMoneySafe = true;
                                this.overdueReason = true;
                                this.reasonText = '您的认证有效期不足一个月，请在过期前续费';
                          }else if(this.info.state == 'new_overdue'){  //2.0用户过期
                                this.payMoney=true; 
                                this.personApply=true;
                                this.enterpriseApply=true;
                                this.personApplying=false;
                                this.enterpriseApplying=false;
                                this.perapplying=false;
                                this.enterapplying=false;
                                this.overdueReason = true;
                                this.reasonText = '您的身份已过期，请重新提交申请';
                          }
                        }
                    ).catch(err=>{
                        console.log(err.data.message);
                    })
            },
        },
        created(){
            window.scrollTo(0,0)
        },
        mounted() {
            this.companyView()
        },
    }
</script>
<style scoped lang="less">
    .certification .rejectReason{
        padding-top:10px;
        padding-bottom:10px;
        padding-left:30px;
        font-size:24px;
        color:white;
        background-color:#db0909;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .btn {
      width: 100%;
      padding: 15px 30px 0 30px;
      box-sizing: border-box;
      text-align: center;
      button {
        margin-top: 20px;
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
.certification{
	position: relative;
	box-sizing: border-box;
	min-height: 100vh;
	background-color: #f4f4f4;
	padding-bottom: 100px;
}
.applyOptionList{
    overflow: hidden;
}
.certification .verifyMainReal .verifyBoxReal {
    width: 94%;
    padding: 0.46rem 3% 0.53rem;
    background-color: #FFF;
    position: relative;
}
.certification .verifyMainReal .verifyBoxReal:after {
    content : '';
    position: absolute;
    width : 97%;
    height : 1px;
    border-bottom : 1px solid #e5e5e5;
    bottom : 0;
    right : 0;
}

.certification .verifyMainReal .verifyBoxReal .avatar, .certification .verifyMainReal .verifyBoxReal .logo {
    float: left;
    width: 107px;
    height: 107px;
    overflow: hidden;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 3px #e5e5e5 solid;
}
.certification .verifyMainReal .verifyBoxReal .avatar .img, .certification .verifyMainReal .verifyBoxReal .logo .img {
    width: 105px;
    margin: 1px;
    height:105px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.certification .verifyMainReal .verifyBoxReal .verifyInfo {
    height: 120px;
    float: left;
    margin-left: 30px;
    width: 58%;
}
.certification .verifyMainReal .verifyBoxReal .verifyInfo .userName, .certification .verifyMainReal .verifyBoxReal .verifyInfo .shopName {
    display: -webkit-box;
    overflow: hidden;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: #333;
    font-size: 28px;
    margin-top: 8px;
}
.certification .verifyMainReal .verifyBoxReal .verifyInfo p {
    font-size: 24px;
    color: #999;
    margin-top: 20px;
}
.certification .verifyMainReal .verifyBoxReal .verifyState {
    width: 130px;
    height:110px;
    float: right;
    margin-right: 3%;
    line-height: 110px;
    text-align: center;
    color: #999;
}
.certification .verifyMainReal .verifyBoxReal .verifyState .arrow, .certification .verifyMainReal .verifyBoxReal .shopInfo .arrow {
    position: absolute;
    top: 50%;
    right: 0;
    height: 46px;
    display: none;
    color: #C8C8C8;
    font-size: 18px;
    margin-top: -24px;
    line-height: 46px;
}

.certification .verifyMainReal .verifyBoxReal .title {
    font-size: 34px;
    color: #333;
}
.border.horizonBottom:after {
    left: 0;
    bottom: 0;
}
.border.horizonTop:after, .border.horizonBottom:after {
    width: 100%;
    height:2px;
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
}
.border:after {
    position: absolute;
    // content: '';
    background-color: #D9D9D9;
}
.certification .verifyMainReal .verifyBoxReal .applyItem {
    width: 48.5%;
    float: left;
}
.certification .verifyMainReal .verifyBoxReal .applyItem a{ display: block; }
.certification .verifyMainReal .verifyBoxReal .applyItem .applyIcon {
    width: 116px;
    height: 116px;
    color: #999;
    font-size: 80px;
    border-radius: 50%;
    margin: 40px auto 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-align-items: center;
}

.certification .verifyMainReal .verifyBoxReal .applyItem p {
    text-align: center;
    font-size: 28px;
    color: #333;
    margin : 15px 0 45px;
}
.certification .verifyMainReal .verifyBoxReal .applyItem .applyBtns {
    width:120px;
    height: 54px;
    margin: 0 auto;
    border-radius:27px;
    text-align: center;
    font-size: 28px;
    line-height: 62px;
    color: #FFF;
    background-color: #9d2929;
}
.applyBtnsNew {
    width:240px;
    height: 54px;
    margin: 0 auto;
    border-radius:27px;
    text-align: center;
    font-size: 28px;
    line-height: 54px;
    color: #FFF;
    background-color: #9d2929;
}
.applyBtnsGray{
    width:120px;
    height: 54px;
    margin: 0 auto;
    border-radius:27px;
    text-align: center;
    font-size: 28px;
    line-height: 54px;
    color: #FFF;
    background-color: #b2b0ac;
}
.fi-stack-2x {
    position: absolute;
    left: 0;
    width: 100%;
    font-size: 2em;
    text-align: center;
    line-height: inherit;
}
.fi-stack {
    display: inline-block;
    width: 116px;
    height: 116px;
    line-height: 116px;
    // vertical-align: middle;
    text-align : center;
    border : 1px solid #e5e5e5;/*no*/
    border-radius : 50%;
}
.iconfont{
    margin: 0;
    font-size: 0.41rem;
}
.icon-yuancircle46{
	font-size: 160px;
	margin-left: -20px;

}
.icon-yonghudianji{
	top: -140px;
	left: 20px;
	font-size: 80px;
}
.icon-qiye{
	top: -140px;
	left: 10px;
	font-size: 70px;
}
.verifyMainReal .verifyBoxReal {
    width: 97%;
    display: table;
    padding: 5px 0 5px 3%;
    background-color: #FFF;
}
.verifyMainReal .verifyBoxReal .title {
	margin: 34px 0;
    font-size: 34px;
    color: #333;
    width: 100%
}
.verifyMainReal .verifyBoxReal .powerList {
    width: 100%;
    overflow: hidden;
}
.verifyMainReal .verifyBoxReal .powerList .powerItem {
    width: 50%;
    height:80px;
    float: left;
    margin: 8px 0;
    line-height: 80px;
    font-size: 28px;
    color: #666;
}
.verifyMainReal .verifyBoxReal .powerList .powerItem:nth-child(2n) {
    // text-align : right;
    width : 46%;
    float : right;
}
</style>