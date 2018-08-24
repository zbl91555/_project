<template>
  <div id="fixednumMain" v-if="agree">
        <div @click="closeAgree()" class="fixednumMask" style="opacity: 0.38;">
        </div>
        <div class="sharesomething">
          <div class="popHeightone">
              <div>确认发货?</div>
          </div>
          <div class="popHeight red" @click="faHuo">发货</div>
          <div class="gray"></div>
          <div @click="closeAgree()" class="popHeight">取消</div>
        </div>
      </div>
</template>
  <script>
    export default { 
      props:{
        agree:booblean
      } 
      data(){
        return{
          agree:false,
        }
      },
      methods: {
          openAgree(){
              this.agree=true
          },
          closeAgree(){
              this.agree=false
          },
          faHuo(){
               // let params
               //  if(this.toDoor){
               //      params = {
               //           is_express:2,  //1普通发货 2 送货上门
               //        };
               //  }else{
               //    params = {
               //         is_express:1,  //1普通发货 2 送货上门
               //         code:this.orderNb,
               //         express:this.CompId,
               //      };
               //  }
               //  orderFahuo(order_id,params).then(res=> {
               //    console.log(res.data);
               //    this.agree=false;
               //  }).catch(err=> {
               //    console.log(err.response.data.message);
               //  })
            },
      }
    }
  </script>

<style lang="less" scoped>
  
  .iconfont{
    font-size:40px;
    margin:8px;
    display: inline-block;
  }
/*键盘的公共样式*/
#fixednumMain{
  z-index: 999;
}
.fixednumMask {
  position: fixed;
  width: 750px;
  opacity: 0.38;
  top: 0;
  bottom: 0;
  background-color: #000;
  z-index: 999;
}
.fixednumMain {
  position: fixed;
  bottom: 0px;
  left: auto;
  width: 750px;
  z-index: 2199;
  background: #f0f0f0;
}
.fixednumMain .tipBanner {
  height: 90px;
  width: 100%;
  background: #f0f0f0;
  font-size: 28px;
}
.fixednumMain .tipBanner span.title,
.fixednumMain .priceBanner span.title {
  line-height: 90px;
  float: left;
  text-indent: 28px;
  min-width: 170px;
}
.fixednumMain .priceBanner span.titles {
  line-height: 90px;
  float: left;
  /*text-indent: 28px;*/
  min-width: 170px;
  color:#13b0fd;
}
.fixednumMain .tipBanner .last,
.fixednumMain .priceBanner .editTxt {
  float: left;
  color: #13b0fd;

  overflow: hidden;
  font-size: 28px;
  height: 90px;
  line-height: 90px;
  font-family: "Helvetica neue", Verdana, Geneva, sans-serif;
}
.fixednumMain .priceBanner .last{
  float: left;
  color: #13b0fd;

  overflow: hidden;
  font-size: 28px;
  height: 90px;
  line-height: 90px;
  font-family: "Helvetica neue", Verdana, Geneva, sans-serif;
}
.fixednumMain .priceBanner .editTxt{
  width: 360px;
  height: 74px;
  line-height: 90px;
  border:none;
}

.fixednumMain .tipBanner .close{
  width: 84px;
  height: 84px;
  float: right;
}
.fixednumMain .tipBanner .close .icon-guanbi{
  
  font-size: 70px;
  color: #999;
 
}
.fixednumMain .tipBanner .finish {
  float: right;
  width: 42px;
  height: 42px;
  background-size: 30px;
  line-height: 40px;
  font-size: 16px;
  color: #007aff;
}
.fixednumMain .priceBanner {
  background: #fff;
  height: 90px;
  font-size: 28px;
  width: 100%;
  position: relative;
}

.fixednumMain .priceBanner .editTxt .hover {
  border-right: 2px solid red;
}
.fixednumMain .priceBanner i {
  color:#999999;
  font-size: 12px;
  display: inline-block;
}

.fixednumMain .btnBanner {
  margin: 0 auto;
  width: 96%;
  padding: 20px 0;
  display: table;
}
.fixednumMain .btnBanner .confirmBtn,
.fixednumMain .btnBanner .fixedPrice,
.fixednumMain .btnBanner .changePrice {
  background: #9e2026;
  border-radius: 8px;
  width: 66%;
  text-align: center;
  font-size: 28px;
  color: #fff;
  border: none;
  float: left;
  height: 80px;
  line-height: 80px;
}
.fixednumMain .btnBanner .fixedPrice,
.fixednumMain .btnBanner .changePrice {
  background: #f15511;
  width: 32%;
  float: left;
  margin-right: 12px;
  font-size: 28px;
  height: 80px;
  line-height: 80px;
}
.fixednumMain .btnBanner .fixedPricem{
  background: #f15511;
  width: 50%;
  float: left;
  margin-right: 12px;
  font-size: 28px;
  height: 80px;
  line-height: 80px;
  border-radius: 8px;
  text-align: center;
  color: #fff;
}
.fixednumMain .btnBanner .confirmBtnm{
  background: #9e2026;
  border-radius: 8px;
  width: 45%;
  text-align: center;
  font-size: 28px;
  color: #fff;
  border: none;
  float: left;
  height: 80px;
  line-height: 80px;
}
.fixednumMain .btnBanner .changePrice.sub {
  background: #06BC07;
  width: 15%;
  margin-right: 2%;
  margin-left: 0;
  background-image: url("//cdn.weipaitang.com//res/img/subIcon.png");
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
}
.fixednumMain .btnBanner .changePrice.add {
  background: #06BC07;
  width: 15%;
  margin-right: 0;
  margin-left: 2%;
  background-image: url("//cdn.weipaitang.com//res/img/addIcon.png");
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
}
.fixednumMain .btnBanner .confirmBtn:only-child {
  width: 100%;
}

.fixednumMain .numkey {
  width: 100%;
  background-color: #d1d5db;
  display: table;
}
.fixednumMain .numkey ul {
  padding: 0;
  margin: 0;
  width: 100%;
}
.fixednumMain .numkey ul,
.fixednumMain .numkey li {
  text-decoration: none;
  list-style: none;
  vertical-align: middle;
  width: 100%;
}

.fixednumMain .numkey ul li {
  position: relative;
  width: 248px;
  height: 92px;
  max-height: 92px;
  float: left;
  border-right:1px solid #bababa;
  border-bottom:1px solid #bababa;  
  font-size: 56px;
  font-family: "Helvetica neue", Verdana, Geneva, sans-serif;
  text-align: center;
  background: #fff;
  line-height: 1;
}
.fixednumMain .numkey ul li:nth-child(3n) {
  border-right: none;
}
.fixednumMain .numkey ul li.delete {
  background-image: url("//cdn.weipaitang.com//res/img/backspace.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60px;
  background-color: #D1D5DA;
}
.fixednumMain .numkey ul li.othernum {
  background-color: #D1D5DA;
  line-height: 50px;
}
.fixednumMain .numkey ul li .number {
  padding-top: 7.5px;
  color: #000;
}
.fixednumMain .numkey ul li .letter {
  font-size: 24px;
  color: #000;
  padding-bottom: 20px;
}
.icon-shibai{
  position: absolute;
  right:15px;
  top:25px;
}

/*取消chrome下input和textarea的聚焦边框 及textarea可拖动放大：*/
input,button,select,textarea{outline:none}
textarea{resize:none}
</style>