<template>
  <div class="shareQrcodes">
    <div class="auctionPic" style="background-image: url(&quot;https://cdn.weipaitang.com/mmopen/20171128d01aa1a1-d5d1-4e7e-a84d-5ca1482f1960/w/0&quot;);">   
    </div>
    <div class="auctionDesc">
        【卓玉馆】龙焰 新疆和田白玉籽料秋梨皮挂件手
    把件 杨曦作品
    </div>
    <div class="auctionPrice">
        ￥30,000
    </div>
    <div class="qrCode"></div>
    <P>长按识别二维码，把宝贝带回家</P>
  </div>
</template>
<script>
    import {/*sharesaveComplaint*/} from '../../api/api'
export default {
    data() {
        return {           
        };
    },
    methods: { 
        saveComplaint(){
            let _this = this;
            _this.id = this.$route.query.id
            let params = {
                type:'update',
                name:_this.name,
            };
                // sharesaveComplaint(params,_this.id).then(function(res) {
                //     console.log('sucess')
                // })
                // .catch(function(error) {
                //     console.log(error);
                // });
            },
         }  
    };
</script>
<style scoped>
    .shareQrcodes{
        max-width: 750px;
        position: relative;
        box-sizing: border-box;
        min-height: 100vh;
        z-index:999;
        padding:31px;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(../../assets/images/sharebg.png);        
    }
    .shareQrcodes .auctionPic {
        width: 100%;
        height: 645px;
        background-size: cover;
        margin-bottom: 31px;

    }
    .shareQrcodes .auctionDesc{
        font-size: 30px;
        color: #333;
    }
    .shareQrcodes .auctionPrice{
        height: 39px;
        font-family: PingFang-SC-Heavy;
        font-size: 42px;
        line-height: 44px;
        color: #9e2026;
        margin:30px 0 55px 0;
    }
    .shareQrcodes .qrCode{
        width: 273px;
        height: 273px;
        margin:0 auto 33px auto;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(../../assets/images/code.jpg);  
        
    }
    .shareQrcodes p{
        text-align: center;
    }
</style>
