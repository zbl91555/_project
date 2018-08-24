<template>
    <div class="categoryDetails" ref="ctn">
      <div class="menu border horizonBottom">
        <div class="menuList mode border verticalRight">
          <div v-for="(list,index) in timeLists" class="menuItem" :class="{ selected:changeRed == index}" @click="Red(index)">{{list.text}}</div>
        </div>
        <div class="menuList">
          <router-link to="/buyerCenter/footprint?index=3">
          <div class="menuItem traces">
            <i class="iconfont icon-zuji"></i>
          </div>
          </router-link>
        </div>
      </div>
      <div class="blank"></div>
      <div class="saleList">
         <div class="no-info" v-if="noPaipin">
          <div class="icon"><img src="../../assets/images/fenleinopaipin.png" alt=""></div>
          <p>该分类还没有相关拍品</p>
          <p>可以去看看有哪些想买的~<i @click="toTaotao" style="text-decoration: underline;color: red">淘淘</i></p>
        </div>
        <ul >
          <li class="saleItem" v-for="(item,index) in category">
            <router-link :to="{name: 'auction', params: {id: item.uri }}">
            <div v-if="item.img!=''" class="categorySaleList" v-bind:style="{backgroundImage:'url(' + item.img + ')'}"></div>
            <div v-if="item.img==''" class="categorySaleList" style="backgroundImage:url('../../assets/images/zhanweitu.png')"></div>
            <div class="saleContent">
              <div class="desc">{{item.desc}}</div>
              <div class="saleInfo">
                <div v-if="item.nowPrice!='0'" class="price">￥{{item.nowPrice}}</div>
                <div v-if="item.nowPrice=='0'" class="price">￥{{item.startPrice}} 起</div>
                <div class="classificaIcon">
                  <i class="iconfont icon-huo"></i>
                </div>
                <div class="classifirity">{{item.view}}</div>
              </div>
            </div>
            </router-link>
          </li>
          
        </ul>
       
      </div>
      
    </div>
</template>
<script>
import {getClassfication} from "../../api/api"
export default {
  data() {
    return {
      timeLists:[
        {
          "text":"综合",
          'type':'colligate'                 
        },
        {
          "text":"最新上拍",
          'type':'newTime'                 
        },
        {
          "text":"即将截拍",
          'type':'endTime'                       
        }
      ],
      changeRed:0,
      category:[],
      type:'colligate',
      pagenum:20,
      page:0,
      id:'',    
      noPaipin:false
    };
  },
  created() {
    window.addEventListener("scroll", this.scrollHandler);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  methods: { 
    toTaotao(){
      this.$router.push('/home')
    },
    //注册scroll事件并监听 
    scrollHandler() {
      const st = document.documentElement.scrollTop || document.body.scrollTop;
      const ch = this.$refs.ctn.clientHeight;
      if (st + window.innerHeight >= ch) {
        this.getcategory();
      }
    }, 
    getcategory(){
      this.page += 1;
      this.id = this.$route.params.id
      let _this = this;   // 缓存指针  
      let params = {
          page: this.page,
          pagenum:this.pagenum,
          type:this.type
      }
      getClassfication(this.id,params).then(function (response) { 
         if(response.code==200){
          _this.goShares(response.data.share);
          _this.category = _this.category.concat(response.data.list)
          if(_this.category.length == 0){
            _this.noPaipin = true
          }else{
            _this.noPaipin = false
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    Red:function(index){
      this.page=0;
      this.category=[];
      this.changeRed = index;
      this.type=this.timeLists[index].type;
      this.getcategory(this.type);
    },
  }, 
  mounted() {
    this.getcategory();
  },
};
</script>
<style scoped lang="less">
  .categoryDetails {
    background-color: #ededef;
    max-width: 750px;
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
    padding-bottom: 60px;
  }
  .categoryDetails .menu {
    position: fixed;
    top: 0;
    width: 100%;
    height: 91px;
    line-height: 91px;
    max-width: 750px;
    background-color: #FFF;
    z-index: 999;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
  }

  .categoryDetails .menu .menuList.mode {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    padding: 0 30px;
  }
  .categoryDetails .menu .menuList {
    padding: 0 15px;
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

  .categoryDetails .menu .menuList.mode .menuItem {
    padding: 0;
  }

  .categoryDetails .menu .menuList .menuItem.selected {
    color: #9e2026;
  }
  .categoryDetails .menu .menuList .menuItem {
    font-size: 28px;
    cursor: pointer;
    text-align: center;
    padding: 0 16px;
  }
  .categoryDetails .menu .menuList:after {
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
  .categoryDetails .menu .menuList.mode .menuItem:nth-child(2) {
    margin: 0 auto;
  }
  .categoryDetails .menu .menuList .menuItem i {
    font-size:42px;
    color: #666;
  }
  .categoryDetails .menu .menuList .traces .icon-zuji{
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
  .categoryDetails .blank {
    width: 100%;
    height:91px;
  }
  .categoryDetails .saleList {
    overflow: hidden;
    background-color: #ededef;
    position: relative;
    padding: 5px 0 15px;
  }
  .categoryDetails .saleList .saleItem {
    position: relative;
    width: 4.9rem;
    float: left;
    cursor: pointer;
    background-color: #fff;
    margin-bottom: 11px;
  }
 .saleItem:nth-of-type(odd){ 
    margin-right: 0.2rem;
  }  
  .categoryDetails .saleList .saleItem .categorySaleList{
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 428px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .categoryDetails .saleList .saleItem .saleContent {
    width: 100%;
    margin: 3px 0 7px;
    overflow: hidden;
  }
  .categoryDetails .saleList .saleItem .saleContent .desc {
    width: 95%;
    margin: 4px auto;
    font-size: 24px;
    height: 36px;
    line-height: 36px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    padding: 0 20px;
  }
  .categoryDetails .saleList .saleItem .saleContent .saleInfo {
    position: relative;
    width: 95%;
    height: 36px;
    margin: 5px auto;
    line-height: 36px;
    color: #999;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    padding: 0 20px;
  }
  .categoryDetails .saleList .saleItem .saleContent .saleInfo .price {
    -ms-flex: 1;
    flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    color: #962125;
    font-size: 28px;
  }
  .categoryDetails .saleList .saleItem .saleContent .saleInfo .price i {
    font-size: 28px;
    padding-left: 2px;
  }

  .categoryDetails .saleList .saleItem .saleContent .saleInfo .classificaIcon {
    height: 36px;
    color: #A3A3A3;
    font-size: 32px;
    cursor: default;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
  }
  .categoryDetails .saleList .saleItem .saleContent .saleInfo .classificaIcon  .icon-huo{
    margin: 0
  }
   .categoryDetails .saleList .saleItem .saleContent .saleInfo .classifirity {
    font-size: 28px;
    line-height: 36px;
    padding-right: 20px;
  }
  .no-info {
    height: 375px;
    width:100%;
    margin:200px auto;
    p {
      text-align: center;
    }
    p:nth-of-type(1) {
      margin-top: 25px;
      color: #666;
      font-size: 28px;
    }
    p:nth-of-type(2) {
      color: #999;
      font-size: 24px;
    }
  }
  .icon {
      background: no-repeat;
      background-position: 30px center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 300px;
      width: 100%;
    }
  .icon img{
     width: 100%;
      height: 300px;
  }  
</style>	
