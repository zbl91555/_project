<template>
    <div class="contain">
        <div class="singPic" v-for="item in Store">   
            <div class="bacPic" :style="{backgroundImage: 'url(' + item.auction_img + ')'}">
                <div class="time">距离开拍:<countDownCo style="position:absolute;top:0;right:5px" :endtime='parseFloat(item.time)' ></countDownCo></div>
            </div>
            <div class="desc">
                <div style="font-size: 14px;">{{item.auction_description}}</div>
                <div class="down">
                    <div class="price">￥{{item.price}}起</div>
                    <div class="peop">已有<i style="color:black">{{item.likenum}}</i>人围拍报名</div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
  import { LoadMore } from 'vux'
  import countDownCo from '../../common/countDownCo'
  import {getstore,storeyuzhan} from '../../../api/api'
  export default {
    components:{
      countDownCo,
      LoadMore
    },
    data () {
      return {
          Store:[],
          page:0,
          pagenum:5,
          viewClass:true,
          count:'',
          user_id:'',
          tostahour:'00',
          tostamin:'00',
          tostasec:'00',
          starttimer:'' //定时器
      }
    },
    methods: { 
      // created() {
      //     window.addEventListener("scroll", this.scrollHandler);
      // },
      // destroyed() {
      //     window.removeEventListener("scroll", this.scrollHandler);
      // },
      // //注册scroll事件并监听 
      // scrollHandler() {
      //   const st = document.documentElement.scrollTop || document.body.scrollTop;
      //   const ch = this.$refs.ctn.clientHeight;
      //   if (st + window.innerHeight >= ch) {
      //     this.storeyuzhan();
      //   }
      // }, 
      //Get
      storeyuzhan(){
          // if (this.count < this.pagenum) {
          //   return ;
          // };
          this.user_id = this.$route.query.user_id
          let params = {
            type:'total'
          }
            storeyuzhan(this.user_id,params).then(res =>{
                  // if (response.data.length === 0) {
                  //   _this.elseloading = true;
                  // }else {
                  //   _this.elseloading = false;
                  // } 
                    this.Store = res.data
                    // _this.loading = false;
            })
            .catch(err =>{
              console.log(err);
            }); 
      },
      //开拍倒计时
      Kaitimetoend(starttime){
        let self = this;
        clearInterval(this.starttimer)
        this.starttimer = setInterval(function(){
          let nowTime = new Date();
          let t = starttime - Math.floor(nowTime.getTime()/1000);              
          if(t>0){
            let stahour=Math.floor((t/3600));
            let stamin=Math.floor((t/60)%60);
            let stasec=Math.floor(t%60);
            stahour = stahour < 10 ? "0" + stahour : stahour;
            stamin = stamin < 10 ? "0" + stamin : stamin;
            stasec = stasec < 10 ? "0" + stasec : stasec;
            if(stahour <= 0){
              self.tostahour = '00';
            }
            if(stahour <= 0 && stamin <= 0){
              self.tostahour = '00';
            }
            if(stamin <= 0){
              self.tostamin = '00';
            }
            self.tostahour = stahour;
            self.tostamin = stamin;
            self.tostasec = stasec;
          }else{
              clearInterval(this.starttimer);
              self.tostahour = '00';
              self.tostamin = '00';
              self.tostasec = '00';
            }
        },1000)
      },
    },
    mounted(){
        this.storeyuzhan()
    }
  }
</script>

<style scoped lang="less">
   .contain .singPic{
      width: 100%;
      height: 488px; 
      border-bottom: 1px solid #e5e5e5;
      background:white;
      margin-bottom:20px;
   }
   .contain .singPic .bacPic{
      height: 346px; 
      width:100%;
      position:relative;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
   }
   .contain .singPic .bacPic .time{
      width:260px;
      height:37px;
      background: rgba(0,0,0,0.35);
      opacity: 0.35;
      border-radius: 18px;
      color:white;
      text-indent:10px;
      line-height:37px; 
      position: absolute;
      left: 20px;
      top:20px;
   }
   .contain .singPic .desc{
      height: 80px;
      padding:20px 20px;
   }
   .contain .singPic .desc .down{
      overflow:hidden;
   }
   .contain .singPic .desc .down .price{
      float: left;
      font-size: 34px;
      color: #9e2026;
      margin-top: 10px
   }
   .contain .singPic .desc .down .peop{
      float: right;
      color: #999999;
      font-size: 24px;
      margin-top: 20px
   }
</style>  
