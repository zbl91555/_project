<template>
	<div class="modifyId">
		<div v-if="modifyIdShow">
			<div class="list">
				<div>
					姓名
				</div>
				<input type="text" v-model="cardname" placeholder="请输入姓名" />
			</div>
			<div class="list">
				<div>
					身份证号
				</div>
				<input type="text" v-model="cardid" placeholder="请输入身份证号" />
			</div>
			<div class="nextStep" @click="identityCheck">
				下一步
			</div>
		</div>
		<div v-else>
			<div class="list">
				<div>
					密码
				</div>
				<input @input="passwordVerifiers" type="password" v-model="newAgainPwd" placeholder="请输入原支付密码" pattern="[0-9]*"/>
			</div>
			<div class="nextStep" @click="pwdSubmit">
				确认
			</div>
		</div>
	</div>
</template>

<script>
	import md5 from 'md5';
	import { Toast } from 'vant';
	import {updateIdentityCheck} from '../../../api/api'
	export default {
		data() {
			return {
				modifyIdShow:true,
				cardid:'',
				cardname:'',
				newAgainPwd:''
			}
		},
		methods: {
    //密码输入校验
    passwordVerifiers() {
      let reg = /(^\s+)|(\s+$)|\s+/g;
      if (reg.test(this.newAgainPwd)) {
        this.newAgainPwd = this.Trim(this.newAgainPwd, "g");
				Toast("支付密码必须是6位数字");
				return true;
      };
      if (isNaN(+this.newAgainPwd)) {
        let length = this.newAgainPwd.length;
        this.newAgainPwd = this.newAgainPwd.slice(0, length - 1);
				Toast("支付密码必须是6位数字");
				return true;
      };
      if (this.newAgainPwd.length > 6) {
        this.newAgainPwd = this.newAgainPwd.slice(0, 6);
				Toast("支付密码必须是6位数字");
				return true
			};
			return false;
    },
			identityCheck(){
				let _this = this;
				if (_this.Trim(_this.cardname, 'g') == '') {
					Toast('姓名不能为空');
					return;
				}
				if (_this.Trim(_this.cardid, 'g') == '') {
					Toast('身份证号码不能为空');
					return;
				}
				this.modifyIdShow = false
			},
			pwdSubmit() {
				if (this.Trim(this.newAgainPwd, 'g').length < 6) {
					this.wrongNowPsd = '密码必须是6位数字'
					return;
				}
				let params = {
					 newPwd: md5(this.newAgainPwd),
					 cardid: this.cardid,
				 	 cardname: this.cardname,
				};
				updateIdentityCheck(params).then(res =>{
					this.$router.push('/balanceIndex/user')
				}).catch(err =>{
				 	Toast(err.data.message);
				})
			}	
		},

	}
</script>

<style lang="less" scoped>
	.modifyId .list{
		height: 110px;
		background: white;
		overflow:hidden;
		margin-top: 20px;
		padding-left: 30px;
	}
	.modifyId .list:nth-child(2){
		margin-top: 0px;
	}
	.modifyId .list div{
		float:left;
		line-height: 110px;
		font-size: 28px;
	}
	.modifyId .list input{
		float:right;
		line-height:50px;
		margin-top:30px;
		width: 500px;
		border: none;
		font-size: 28px;
	}
	.modifyId .nextStep{
		width: 690px;
		height: 88px;
		text-align: center;
		line-height: 88px;
		background-color: #9e2026;
		border-radius: 5px;
		color: white;
		font-size: 28px;
		margin: 250px auto;
	}
</style>