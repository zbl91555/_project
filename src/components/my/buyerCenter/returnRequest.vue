<template>
	<div class="returnRequest">
		<div>
			<div class="buyer-tool" v-bind:style="{backgroundImage: 'url(' + info.headimgurl + ')'}">
				<a href="">{{info.nickname}}</a>	
			</div>
			<div class="buy-info">
				<div class="goods-info" v-bind:style="{backgroundImage: 'url(' + info.auctionImg + ')'}"></div>
				<p class="goods-intr">{{info.desc}}</p>
				<ul class="buyer-detail">
					<li>成交金额：￥{{info.price}}元</li>
					<li>{{info.timeName}}：{{timestampToTime(info.time)}}</li>
				</ul>
			</div>	
		</div>
		<div class="complaintTitle" @click="shangShow()">
		      <i>{{info.name}}理由</i>		      
		      <i v-if="!hide" class="iconfont icon-jiantouxiangxia"></i>
		      <i v-if="hide" class="iconfont icon-jiantouxiangshang"></i>
		      <i>{{title}}</i>
		</div>
        <div class = "descriptor" v-show="show">
            <div class = "descriptorHeader">简要描述</div>
            <div class = "descriptorContent"><textarea @input="calculatedQuantity" placeholder="  请输入简要描述" v-model="desc"></textarea></div>
            <div class="wordLimit"><span>{{textLength}}</span>/<span>{{textTotal}}</span></div> 
        </div>
	    <form id="J_login_form" v-if="reason">
	        <div class="login-frame">
	            <ul>
	                <li  v-for="(list,index) in complaintContent" @click="pitch(list,index)">
	                    <p>
	                        {{list.text}}
	                    </p>
	                    <div class="arrow" v-show ="list.pitchShow == true">
	                        <i class="iconfont icon-finish reRequ"></i>
	                    </div>
	                </li>
	            </ul>
	        </div> 
	    </form>
	    <div class="login-btn">
        	<input @click="orderRefundSubmit()" :value=info.name class="icon-btn" type="button">
          <table v-if="refund != ''">
          <tr>
              <th>事件</th>
              <th>理由</th>
              <th>时间</th>
          </tr>
          <tr v-for="e in refund">
              <td>{{e.refund_type}}</td>
              <td>{{e.refund_reason}}</td>
              <td>{{timestampToTime(e.refund_add_time)}}</td>
          </tr>
        </table>
    	</div>
	</div>
</template>
<script>
  import { Toast } from 'vant'; 
  import {orderRefund,orderRefundSubmit} from '../../../api/api';
	export default {
		components: {},
		data() {
			return {
		      complaintContent:[
              {
                  "text":"未收到货",
                  pitchShow: false               
              },
              {
                  "text":"收到商品破损",
                  pitchShow: false 
              },
              {
                  "text":"收到商品与描述不符" ,
                  pitchShow: false           
              },
              {
                  "text":"商品质量问题", 
                  pitchShow: false             
              },
              {
                  "text":"其他", 
                  pitchShow: false             
              }
          ],
          pitchShow:'',
          show:false,
          hide:false,
          reason:false,
          info:{},
          memberTypeVal:0,
          typeVal:0,
          orderId:0,
          title:'请选择理由',
          refund:[],
          desc : '',
          index : '',
          textLength : 0,
          textTotal : 30
			}
		},
		methods: {
        //计算字数
		calculatedQuantity() {
		if (this.desc.length >= 30) {
			this.desc = this.desc.substring(0,31);
			this.textLength = 30;
			return;
		};
			this.textLength = this.desc.length;
		},
			//勾选投诉原因
	        pitch(list, index){
	            for (let i = 0; i < this.complaintContent.length; i++) {
	                this.complaintContent[i].pitchShow = false;
                  }
                if (index === this.complaintContent.length-1) {
                    this.show = true;
                }else {
                    this.show = false;
                }
                this.index = index;
	            list.pitchShow = true;
                this.title=list.text;
                this.hide = false;
                setTimeout(_ => {
                    this.reason = false;
                },100);
	        },
	        shangShow(){
	        	this.hide=!this.hide;
                this.reason=!this.reason;
                if (this.show) {
                    this.show = false;
                }
	        },
          //页面
          orderRefund() {
            orderRefund(this.orderId , this.memberTypeVal , this.typeVal).then(res=> {
              console.log(res.data);
              this.info = res.data;
              this.refund = res.data.refund;
            }).catch(err =>{
              this.$router.push({name:'errorPage'});
              console.log(err);
            })
          },
          //页面提交
          orderRefundSubmit: function() {
              if (this.index === this.complaintContent.length-1) {
                  this.title = this.desc;
              }
              if(this.title == '请选择理由'){
                 Toast("请选择理由")
                 return
              }else{
                  let params = {
                     reason:this.title,
                  };
                  orderRefundSubmit(this.orderId , this.memberTypeVal , this.typeVal,params).then(res=> {
                    this.$router.push('/orderDetail/'+this.orderId);
                  }).catch(err =>{
                    Toast(err.data.message);
                    console.log(err);
                  })
              }
          },
		},
		mounted() {
      window.scrollTo(0,0)
      this.orderId = this.$route.params.order_id;
      // 1 卖家拒绝退货  2 卖家拒绝退货
      if(this.$route.params.type == 1){
        this.complaintContent=[
              {
                  "text":"七天无理由退货", 
                  pitchShow:false              
              },
              {
                  "text":"未收到货",
                  pitchShow:false                
              },
              {
                  "text":"收到商品破损",
                  pitchShow: false 
              },
              {
                  "text":"收到商品与描述不符" ,
                  pitchShow: false           
              },
              {
                  "text":"商品质量问题", 
                  pitchShow: false             
              },
              {
                  "text":"其他", 
                  pitchShow: false             
              }
          ],
         this.memberTypeVal = 0;
         this.typeVal  = 0;
      }
      if(this.$route.params.type == 2){
        this.complaintContent=[
              {
                  "text":"不喜欢/不想要",
                  pitchShow: false               
              },
              {
                  "text":"未按约定时间发货",
                  pitchShow: false 
              },
              {
                  "text":"其他",
                  pitchShow: false 
              },
          ],
         this.memberTypeVal = 0;
         this.typeVal  = 1;
      }
      if(this.$route.params.type == 3){
        this.complaintContent =[
              {
                  "text":"理由不符",
                  pitchShow: false               
              },
              {
                  "text":"其他",
                  pitchShow: false 

              },
             
          ],
         this.memberTypeVal = 1;
         this.typeVal  = 0;
      }
      if(this.$route.params.type == 4){
        this.complaintContent=[
              {
                  "text":"理由不符",
                  pitchShow: false               
              },
              {
                  "text":"其他",
                  pitchShow: false 

              },
          ],
         this.memberTypeVal = 1;
         this.typeVal  = 1;
      }
			this.orderRefund();
		}
	}
</script>

<style scoped lang="less">
    // 描述框样式
    .descriptor {
        width : 100%;
        height : 367px;
        margin-top : 20px;
        padding : 10px;
        box-sizing : border-box;
        background-color : #fff;
        position: relative;

        .wordLimit {
            position: absolute;
            bottom : 10px;
            right : 20px;
            color : #999;
        }
    }
    .descriptorHeader {
        height : 30%;
        line-height : 110px;
        box-sizing : border-box;
        border-bottom : 1px solid #e5e5e5;
        font-size : 32px;
        padding-left : 20px;
    }
    .descriptorContent {
        height : 70%;
        background-color : yellow;

        textarea {
            width : 100%;
            height : 100%;
            padding : 10px;
            box-sizing : border-box;
            border : none;
        }
    }
    .returnRequest {
        background-color : #f4f4f4;
        height: 1300px;
    }
	.buyer-tool {
        height: 76px;
        line-height: 76px;
        background-position: 30px center;
        background-repeat: no-repeat;
        background-size: 38px;
        padding: 0 30px;
        box-sizing: border-box;
        position: relative;
        background-color : #fff;
        a {
          margin-left: 50px;
          display: inline-block;
          line-height: 76px;
          float: left;
          position: relative;
          padding-right: 40px;
        }
      }
    .buy-info {
        height: 220px;
        background-color: #fff;
        padding: 27px 30px;
        box-sizing: border-box;
        margin-top : 20px;
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
        }
        .buyer-detail li {
          height: 25px;
          line-height: 25px;
          background-color: transparent;
          padding: 0;
          color: #999;
        }
      }
      .complaintTitle{
        height: 87px;
        line-height: 87px;
        padding:20px 30px 0px 30px;
        font-size: 24px;
        color: #999;
        overflow: hidden;
        background-color : #fff;
        margin-top : 20px;
    	}
    	.complaintTitle i:nth-child(1){
				font-size: 30px;
				color:black;
				float: left;
    	}
    	.complaintTitle i:nth-child(2){
				font-size:32px;
				float: right;
    	}
    	.complaintTitle i:nth-child(3){
    		    float: right;
    		    padding-right: 20px		
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
        right: 4%;
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
        margin-top: 185px;
        outline: none;
        -webkit-appearance: none; 
        font-size: 28px;
    }
      table{
    width: 100%;
    background: white;
    height:150px;
    padding: 0 30px;
    margin-top: 40px;
  }
  table tr th{
    text-align: left;
  }
  table tr th:nth-child(1){
    width: 35%
  }
  table tr th:nth-child(2){
    width: 35%
  }
  table tr th:nth-child(3){
    width: 30%
  }
  table tr td{
    text-align: left;
    border-top: 1px solid #ededef
  }
  .reasons div{
    height: 50px;
    border-bottom: 1px solid #ededef;
    padding: 10px 20px;
    line-height: 50px;
    margin: 0 30px;
  }
  .reRequ{
    font-size:48px;
  }
</style>