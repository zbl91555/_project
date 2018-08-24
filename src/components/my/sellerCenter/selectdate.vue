<template>
  <div class="selectdatecontainer">
		<div class="selecttimclass">
			今天:{{nowday}}
			<div class="timels">
				<span v-for="(item,index) in lists" @click="chosenSelection(index)" :class="{selectedclass:index===nowindex}">{{item}}:00</span>
			</div>
		</div>
		<div class="selecttimclass">
			明天:{{tomorrow}}
			<div class="timels">
				<span v-for="(item,indext) in olists" @click="chosenSelectiont(indext)" :class="{selectedclass:indext===nowindext}">{{item}}:00</span>
			</div>
  		</div>
		<div class="selecttimclass">
		    后天:{{ttomorrow}}
		    <div class="timels">
				<span v-for="(item,indextt) in tlists" @click="chosenSelectiontt(indextt)" :class="{selectedclass:indextt===nowindextt}">{{item}}:00</span>
			</div>
		</div>
		<div class="btns">
			<button>上传</button>
			<router-link  to="/sellerCenter/storeManagement" >
				<button>取消</button>
			</router-link>
		</div>
  </div>
</template>
<script>
export default {
	data(){
		return{
		   nowday:0,
		   tomorrow:1,
		   ttomorrow:2,
		   lists:[16,17,18,19,20,21,22],
		   olists:[14,15,16,17,18,19,20,21],
		   tlists:[16,17,18,19,20,21,22],
		   nowindex:0,
		   nowindext:0,
		   nowindextt:0,
		};
	},
	methods:{
		getday:function(){
			this.nowday=this.GetDateStr(0);
			this.tomorrow=this.GetDateStr(1);
		    this.ttomorrow=this.GetDateStr(2);
		},
		GetDateStr:function(AddDayCount) {
			let dd = new Date();
			dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
			let y = dd.getFullYear();
			let m = dd.getMonth()+1;//获取当前月份的日期
			let d = dd.getDate();
			return y+"-"+m+"-"+d;
		},
		chosenSelection:function(index){
			this.nowindex=index
		},
		chosenSelectiont:function(indext){
			this.nowindext=indext
		},
		chosenSelectiontt:function(indextt){
			this.nowindextt=indextt
		}
	},
	mounted() {
        this.getday()
	},
}
</script>
<style scoped>
	.selectdatecontainer{
		background-color: #ededef;
	    max-width: 750px;
	    position: relative;
	    box-sizing: border-box;
	    min-height: 100vh;
	    padding-bottom: 60px;
	    padding: 20px 30px;
	}
	.timels{
		display: flex;
		display: -webkit-flex;
		-webkit-justify-content: flex-start; /* Safari */  
  		justify-content:flex-start;
  		flex-wrap:wrap;  
  		align-content: flex-start; 
	}
	.timels span{
		width: 25%;
		display: inline-block;
		text-align: center;
	}
	.btns{
		text-align: center;
		margin-top: 300px;
	}
	.btns button {
	    padding: 0;
	    height: 48px;
	    line-height: 48px;
	    min-width: 110px;
	    margin-left: 20px;
	    border: 2px solid #f15511;
	    border-radius:4px;
	    font-size: 26px;
	    background-color: #fff;
	    color: #f15511;
	}
    .btns button:last-child {
	    color: #999999;
	    border: 2px solid #999999;
	}
	.selectedclass{
		background: #33ff66;
	}
    .selecttimclass{
    	margin-top:40px;
    }
</style>