<template>
  <div class="fans"  ref="ctn">
    <div class="friendsMain">
	    <div class="friend" v-for = "(item,index) in ShieldList">
		    <div class="avatar" v-bind:style="{backgroundImage: 'url(' + item.avatar + ')'}"></div>
		    <div class="friendDetails">
		        <div class="nickname">
		            <span>{{item.nickname}}</span>
		        </div>
				<div class="signature">{{item.signature}}</div>
		        <div class="attention" @click="shielduser(item.user_id,index)">
			        <div class="status"> 
			            <span>取消屏蔽</span>
			        </div>
			    </div>
		    </div>
    	</div>
    </div>
    <toast v-model="showSuccess" :text="toastText" type="text" :time="1000" is-show-mask></toast>
  </div>
</template>
<script>
    import { Toast } from 'vux';

	import {shieldList,shielduser} from '../../api/api'
export default {
	components: {
	    Toast
  	},
  	data() {
	    return {
	      ShieldList:[],
	      pagenum:10,
	      page:0,
	      showSuccess:false,
	      toastText:'',
	    };
  	},
  	created() {
		window.addEventListener("scroll", this.scrollHandler);
	},

	destroyed() {
		window.removeEventListener("scroll", this.scrollHandler);
	},
  	methods: { 
  		//注册scroll事件并监听 
		scrollHandler() {
		    const st = document.documentElement.scrollTop || document.body.scrollTop;
		    const ch = this.$refs.ctn.clientHeight;
		    if (st + window.innerHeight >= ch) {
		       	this.shieldList();
		    }
		}, 
	    shieldList(){
	    	this.page += 1;   
	        let  params = {
	        	page: this.page,
	          	pagenum:this.pagenum,
	        };
	        shieldList(params).then(res =>{ 
		        if(res.code==200){
		           this.ShieldList = this.ShieldList.concat(res.data);
		        }
	    	}).catch(err =>{
	        	console.log(err);
	        });
	    }, 
	    shielduser(user_id,index){
	    	let _this = this;
	    	let params = {
	    		type : 'cancel'
	    	}   
	        shielduser(user_id,params).then(function (response) { 
	        	_this.showSuccess = true;
	    		_this.toastText='操作成功';
	    		_this.page = 0;
	    		if(_this.ShieldList.length == 0){
	    			_this.$router.push('/sellerCenter/sellerSetting')
	    	    }
	    		_this.ShieldList = []
	    		_this.shieldList();
	        		        	
	    })
	    .catch(function (error) {
	        console.log(error);
	        });
	    }
  	}, 
  	mounted() {
    	this.shieldList();
  	},
};
</script>
<style scoped>
	.fans .friendsMain {
	    width: 100%;
	    display: table;
	}
	.fans .friendsMain .friend {
	    position: relative;
	    width: 100%;
	    height: 150px;
	    display: table;
	    background-color: #fff;
	}
	.fans .friendsMain .friend .avatar {
	    float: left;
	    width: 89px;
	    height: 89px;
	    margin: 30px;
	    cursor: pointer;
	    background-size: cover;
	    background-position: center;
	    border-radius:50px;
	}
	.friendsMain .friend .friendDetails {
	    height: 150px;
	    cursor: pointer;
	    border-bottom:1px solid #e5e5e5;
	}
	.friendsMain .friend .attention .status.unsubscribe {
	    color: #9F9F9F;
	    border-color: #9F9F9F;
	}
	.friendsMain .friend .friendDetails .nickname {
	    height: 26px;
	    line-height: 26px;
	    color: #333;
	    padding-top: 38px;
	    width: 40%;
	    font-size: 28px;
	    position: relative;
	    overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.friendsMain .friend .friendDetails .signature {
	    height: 36px;
	    line-height: 36px;
	    font-size: 24px;
	    width: 55%;
	    color: #999;
	    margin-top: 26px;
	    overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.friendsMain .friend .attention {
	    position: absolute;
	    width: 170px;
	    height: 150px;
	    top: 0;
	    right: 0;
	}
	.friendsMain .friend .attention .status {
	    position: absolute;
	    width:180px;
	    color: #EA4416;
	    padding: 0 20px;
	    border: 4px solid #EA4416;
	    font-size: 42px;
	    text-align: center;
	    height: 80px;
	    line-height: 80px;
	    margin: auto;
	    cursor: pointer;
	    border-radius: 4px;
	    transform: scale(0.5);
	    -webkit-transform: scale(0.5);
	    transform-origin: 0 84%;
	    -webkit-transform-origin: 0 84%;
	}
	.fans .friendsMain .icon-untitled44{
		color: #f15511;
		font-size: 42px; 
	}
</style>
