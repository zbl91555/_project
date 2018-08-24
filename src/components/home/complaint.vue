<template>
  <div class="complaint">
    <div class="complaintTitle">
      请选择投诉原因
    </div>
    <form id="J_login_form">
        <div class="login-frame">
            <ul>
                <li  v-for="(list,index) in complaintContent" @click="pitch(list,index)">
                    <p>
                        {{list.text}}
                    </p>
                    <div class="arrow" v-show ="list.pitchShow == true">
                        <i class="iconfont icon-finish"></i>
                    </div>
                </li>
            </ul>
        </div> 
    </form>
    <div class="descBox">
        <textarea maxlength="200" @input="descInput" v-model="desc" placeholder="请输入投诉描述"></textarea>
        <div class="wordsNum">
            <span class="counts">{{hasnum}}</span>
            / 200
        </div>
    </div>
    <div v-show="idSubmit==true ? true : false" class="login-btn" @click="complaintSubmit()"> <!-- :class="{'gray':greynone}" -->
        <input value="提交" class="icon-btn"  type="button">
    </div>
    <div v-show="idSubmit==false ? true : false" class="login-btn">
        <input value="您对此商品已经投诉" class="icon-btn gray" type="button">
    </div>
  </div>
</template>
<script>
    import {Toast} from 'vant';
    import {hascomplaint,saveComplaint} from '../../api/api'
export default {
    data() {
        return {
            complaintContent:[
                {
                    "text":"违禁品",
                    pitchShow: true               
                },
                {
                    "text":"图片、设置与描述不符",
                    pitchShow: false 

                },
                {
                    "text":"售假" ,
                    pitchShow: false           
                },
                {
                    "text":"分类错误", 
                    pitchShow: false             
                }
            ],
            pitchShow:'违禁品',
            remnant: 200,
            hasnum:0,
            greynone:true,
            desc:'',
            id:'',
            auction_id:'',
            title:'违禁品',
            idSubmit:true
        }
    },
    mounted(){
        this.complaint()
    },
    methods: { 
        //判断有没有投诉过
        complaint(){
            hascomplaint(this.$route.query.auction_id).then(res => {
                this.idSubmit = res.data.idSubmit
            })
        },
        //勾选投诉原因
        pitch(list, index){
            for (let i = 0; i < this.complaintContent.length; i++) {
                this.complaintContent[i].pitchShow = false;
              }
            list.pitchShow = true;
            this.greynone = false
            this.title=list.text
        },
        //已写了的字数
        descInput(){
            let txtVal = this.desc.length;
            this.hasnum = txtVal
            if (txtVal>0){
                this.greynone=false
            }else{
                this.greynone=true
            }
        },
        // 提交投诉
        complaintSubmit(){
            let _this = this;
            _this.id = this.$route.query.auction_id;
            let params = {
                title:_this.title,
                content:_this.desc,
            };
            // if(_this.title == '' && _this.desc == ''){
            //     Toast('请勾选原因或填写原因')
            //     return
            // } 
            saveComplaint(params,_this.id).then(function(res) {
                    Toast(res.message)
                     _this.$router.push({ path: '/auction/'+_this.id})
                })
                .catch(function(error) {
                    console.log(error);
                });
            },
         },
        // 获取有没有投诉过   
    };
</script>
<style scoped>
    .complaint .icon-finish{
        font-size: 48px;
    }
    .complaint .login-frame .weui-cells.vux-no-group-title{
        height: 110px;
        line-height: 110px;
        margin-left: 30px;
        margin-top:0;
        font-size: 28px;
    }
    .complaint .complaintTitle{
        height: 87px;
        line-height: 87px;
        margin-left: 30px;
        font-size: 24px;
        color: #999;
        background-color: #f4f4f4;
    }
    .complaint .login-frame .weui-cells:before{
        display:none;
    }
    .complaint .login-frame .weui-label{
        color: #666;
        margin-right: 8px;
    }
    .complaint .login-frame .vux-popup-picker-value{
        color: #333;
    }
    .complaint .login-frame .weui-cell{
        padding: 0;
    }
    .complaint .login-frame .weui-cell_access .weui-cell__ft:after{
        display:none;   
    }
    .vux-popup-picker-container .vux-popup-header.vux-1px-b{
        height: 80px;
        line-height: 80px;
        font-size: 28px;
    }
    .complaint{
        background-color: #f4f4f4;
        max-width: 750px;
        position: relative;
        box-sizing: border-box;
        min-height: 100vh;
    }
    .complaint #J_login_form{
        border-bottom:2px solid #e5e5e5;
    }
    .complaint .login-frame{
        background-color: #fff;
    }
    .complaint .login-frame li{
        position: relative;
        display: flex;
        height: 110px;
        line-height:110px;
        margin-left: 30px;
        padding-right: 30px;
        border-bottom:2px solid #e5e5e5;
    }
    .complaint .login-frame li p{
        font-size: 28px;
        color: #666;
        width: 70%;
    }
   
    .complaint .arrow{
        position: absolute;
        right: 4%;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .complaint .arrow{
        color: #9e2026;
    }
    .complaint .login-frame li:last-child{
        border: none;
    }
    .complaint .login-btn {
        padding:0 30px;
    }
    .complaint .login-btn .icon-btn {
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
    .complaint .descBox {
        position: relative;
        height: 258px;
        padding:30px;
        background-color: #fff;
        box-sizing: border-box;
    }
    .complaint textarea {
        position: absolute;
        resize: none;
        outline: 0;
        height: 228px;
        font-size: 28px;
        border: 0px;
        width: 700px;
    }
    .complaint .wordsNum {
        position: absolute;
        width: 100px;
        right: 30px;
        bottom: 30px;
        color: #999;
        height: 25px;
        text-align: right;
        font-size: 20px;
        line-height: 25px;
    }
    .complaint .login-btn .gray{
        background-color: #d2d2d2;
    }
</style>
