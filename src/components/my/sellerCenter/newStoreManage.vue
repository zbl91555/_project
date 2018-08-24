<template>
    <div class="newStoreManage">
		<div class="menu border horizonBottom">
	        <div class="menuList mode border verticalRight">
	          <div v-for="(list,index) in timeLists" class="menuItem" :class="{ selected:changeRed == index}" :key="index" @click="Red(index)">{{list.text}}</div>
	        </div>
        </div>
		<router-view></router-view>
    </div>

</template>
<script>
  export default {
    data () {
      return {
       		timeLists:[
            {
              "text":"预展中",
              'type':'manprivateView',
              'link':'/newStoreManage/manprivateView',
              'index':0           
            },
		        {
		          "text":"竞拍中",
		          'type':'auctioning',
		          'link':'/newStoreManage/autioning',
              'index':1            
		        },
		        {
		          "text":"已截拍",
		          'type':'jiepai',
		          'link':'/newStoreManage/sectionalPat', 
              'index':2                   
		        },
		        {
		          "text":"已流拍",
		          'type':'liupai',
		          'link':'/newStoreManage/havePassed',
              'index':3  
		        },
		        {
		          "text":"已失败",
		          'type':'shibai', 
		          'link':'/newStoreManage/haveFailed', 
              'index':4                 
		        },
		        {
		          "text":"草稿箱",
		          'type':'caogao',  
		          'link':'/newStoreManage/drafts',
              'index':5                       
		        }
		    ],
		    changeRed:1,
      }
    },
    methods: { 
    	Red(index){
    		this.changeRed = index;
    		this.$router.push(this.timeLists[index].link)
    	}
    },
    watch:{
    	$route(to,from){
    		let changeRed = this.timeLists.find((item,index) =>{
	     		return to.fullPath == item.link
	    	})
	    	this.changeRed = changeRed.index
    	}
    },
    mounted(){
     	let changeRed = this.timeLists.find((item,index) =>{
     		return this.$route.fullPath == item.link
    	})
    	this.changeRed = changeRed.index
    }
  }
</script>

<style scoped lang="less">
  .newStoreManage {
  }
  .newStoreManage .menu {
  	position: fixed;
    top: 0;
    width: 100%;
    height: 78px;
    line-height: 78px;
    max-width: 750px;
    background-color: #FFF;
    z-index: 999;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
  }

  .newStoreManage .menu .menuList.mode {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    padding: 0 15px;
  }
  .newStoreManage .menu .menuList {
    padding: 0 2px;
    float: left;
    height: 100%;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
  }

  .border {
    position: relative;
  }

  .newStoreManage .menu .menuList.mode .menuItem {
    padding: 0;
    width: 16%;
    color: #999999;
    font-size:30px;
    font-family: PingFang-SC-Heavy;
    margin-left: 1.5%;
  }
  .newStoreManage .menu .menuList .menuItem.selected {
    color: #9e2026;
    border-bottom: 4px solid #9e2026;
    font-family: PingFang-SC-Heavy;
  }
  .newStoreManage .menu .menuList .menuItem {
    font-size: 28px;
    cursor: pointer;
    text-align: center;
    padding: 0 16px;
  }
  .newStoreManage .menu .menuList:after {
    height: 40%;
    top: 30%;
  }
  .border.verticalRight:after {
    top: 0;
    right: 0;
  }
  .border.verticalLeft:after, .border.verticalRight:after {
    width: 2px;
    height: 100%;
    -ms-transform: scaleX(0.5);
    transform: scaleX(0.5);
    -webkit-transform: scaleX(0.5);
  }
  .border:after {
    position: absolute;
    content: '';
    background-color: #e5e5e5;
  }
  .newStoreManage .menu .menuList .menuItem i {
    font-size:42px;
    color: #666;
  }
  .newStoreManage .menu .menuList .traces .icon-zuji{
    font-size:50px;
    color: #666;
  }
  .border.horizonBottom:after {
    left: 0;
    bottom: 0;
  }
  .border.horizonTop:after, .border.horizonBottom:after {
    width: 100%;
    height: 2px;
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
  }
  .newStoreManage .blank {
    width: 100%;
    height:91px;
  }
  .newStoreManage .menu .menuList .menuItem.selected {
    color: #9e2026;
    border-bottom: 4px solid #9e2026;
    font-family: PingFang-SC-Heavy;
  }
</style>  
