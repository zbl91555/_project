<template>
  <div class="editAddress">
    <form id="J_login_form">
        <div class="login-frame">
            <ul>
                <li>
                    <p>
                        收件人
                    </p>
                    <input type="text" class="userName" name="userName" placeholder="名字" v-model="name"  ref="userName">
                    <div class="arrow">
                        <i class="iconfont icon-guanbi1" @click="clear1($event)"></i>
                    </div>
                </li>
                <li>
                    <p>
                        联系方式
                    </p>
                    <input type="tel" class="telNumber" name="telNumber" placeholder="11位手机号"  v-model="tele" ref="telNumber">
                    <div class="arrow">
                        <i class="iconfont icon-guanbi1" @click="clear2($event)" ></i>
                    </div>
                </li>
                <group label-width="5em" label-align="left">
                  <x-address :title="title2" v-model="value2" raw-value :list="addressData" value-text-align="left" :value="getName(value2)"></x-address>
                </group>
                <li>
                    <p>
                        详细地址
                    </p>
                    <input type="text" class="address" name="address" placeholder="街道门牌信息" v-model="address"  ref="address">
                    <div class="arrow">
                        <i class="iconfont icon-guanbi1" @click="clear3($event)"></i>
                    </div>
                </li>
            </ul>
        </div> 
    </form>
    <div class="login-btn" @click="saveAdress()">
        <input value="保存" class="icon-btn" type="button">
    </div>
    <toast v-model="showSuccess" :text="toastText" width="5rem" type="text"  :time="1000" is-show-mask></toast>
  </div>
</template>
<script>
import { Group, XAddress, ChinaAddressV4Data, Value2nameFilter as value2name , Toast } from 'vux';
import {userAddress,handleAddressEdit} from '../../api/api'
export default {
    components: {
        Group,
        XAddress,
        Toast,
    },
    data() {
    return {
        addressList:[],
        id:'',
        city:'',
        name:'',
        tele:'',
        province:'',
        country:'',
        address:'',
        title2: '选择地区',
        value2: [],
        addressData: ChinaAddressV4Data,
        showSuccess:false,
        toastText:'',
    };
  },
  methods: { 
    userAddress(){
	   let _this = this;
        _this.id = this.$route.params.id;
            userAddress(_this.id).then(function(res) {
                _this.addressList = res.data;
                    _this.name = res.data.name;
                    _this.tele = res.data.tele;
                    _this.province = res.data.province;
                    _this.country = res.data.country;
                    _this.address = res.data.address;
                    _this.city = res.data.city;
                    _this.value2.push(res.data.province);
                    _this.value2.push(res.data.city);
                    _this.value2.push(res.data.country);
            })
            .catch(function(error) {
                console.log(error);
            });
	    },
    saveAdress(){
        let _this = this;
        if(!this.name){
            _this.showSuccess = true;
            _this.toastText='姓名不能为空'
            return false;
        }
        if(!this.tele){
            _this.showSuccess = true;
            _this.toastText='手机不能为空'
            return false;
        }
        let reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if(!reg.test(this.tele)){
            _this.showSuccess = true;
            _this.toastText='手机号输入有误'
            return false;
        }
        if(!this.province||!this.city||!this.country){
            _this.showSuccess = true;
            _this.toastText='地区不能为空'
            return false;
        }
        if(!this.address){
             _this.showSuccess = true;
            _this.toastText='详细地址不能为空'
            return false;
        }
        _this.id = this.$route.params.id
        let params = {
                    name:_this.name,
                    tele:_this.tele,
                    province:_this.province,
                    city:_this.city,
                    country:_this.country,
                    address:_this.address,
        };
        console.log(params)
            handleAddressEdit(params,_this.id).then(function(res) {
                window.history.back();
            })
            .catch(function(error) {
                console.log(error);
            });
       },
        clear1(userName){
            this.$refs.userName.value='' 
            this.name =''
        },
        clear2(telNumber){
            this.$refs.telNumber.value='' 
            this.tele = ''
        },
        clear3(address){
            this.$refs.address.value='' 
            this.address =''
        },
         doShowAddress () {
          this.showAddress = true
          setTimeout(() => {
            this.showAddress = false
          }, 2000)
        },
        onShadowChange (ids, names) {
          console.log(ids, names)
        },
        getName (value) {
            let address = value2name(value, ChinaAddressV4Data)
            let addressArr = address.split(' ')
            this.province = addressArr[0]
            this.city= addressArr[1]
            this.country = addressArr[2]
            return value2name(value, ChinaAddressV4Data)
          return value2name(value, ChinaAddressV4Data)
        },
        logHide (str) {
          console.log('on-hide', str)
        },
        logShow (str) {
          console.log('on-show')
        }
      	}, 
      	mounted() {
            this.userAddress();
  	 },
};
</script>
<style>
    .icon-guanbi1{
        font-size:42px;
        display: inline-block;
        margin: 0.106667rem;
    }
    .editAddress .login-frame .weui-cells.vux-no-group-title{
        height: 110px;
        line-height: 110px;
        margin-left: 30px;
        margin-top:0;
        font-size: 28px;
        padding-left: 0
    }
    .editAddress .login-frame .weui-cells:before{
        display:none;
    }
    .editAddress .login-frame .weui-label{
        color: #666;
        margin-right: 8px;
    }
    .editAddress .login-frame .vux-popup-picker-value{
        color: #333;
    }
    .editAddress .login-frame .weui-cell{
        padding: 0;
    }
    .editAddress .login-frame .weui-cell_access .weui-cell__ft:after{
        display:none;   
    }
    .vux-popup-picker-container .vux-popup-header.vux-1px-b{
        height: 80px;
        line-height: 80px;
        font-size: 28px;
    }
    .editAddress{
        background-color: #f4f4f4;
        max-width: 750px;
        position: relative;
        box-sizing: border-box;
        min-height: 100vh;
    }
    .editAddress #J_login_form{
        padding-top: 20px;
        border-bottom:2px solid #e5e5e5;
    }
    .editAddress .login-frame{
        background-color: #fff;
    }
    .editAddress .login-frame li{
        position: relative;
        display: flex;
        height: 110px;
        line-height:110px;
        margin-left: 30px;
        padding-right: 30px;
        border-bottom:2px solid #e5e5e5;
    }
    .editAddress .login-frame li p{
        font-size: 28px;
        color: #666;
        width: 20%;
    }
    .editAddress .login-frame li input {
        float: left;
        border: none;
        height: 110px;
        outline: none;
        box-sizing: border-box;
        font-size: 28px;
        width: 70%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .editAddress .arrow{
        position: absolute;
        right: 4%;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .editAddress .arrow{
        color: #C8C8C8;
    }
    .editAddress .login-frame li:last-child{
        /*border: none;*/
        border-top:2px solid #e5e5e5;
        border-bottom:0;
    }
    .editAddress .login-btn {
        padding:0 30px;
    }
    .editAddress .login-btn .icon-btn {
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
        font-size: 28px;
    }
</style>
