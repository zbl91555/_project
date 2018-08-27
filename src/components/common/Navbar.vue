<template>
  <nav class="app-nav" >
    <div  v-bind:key = "item.title" v-for = "(item, $index) in isMsgList" v-bind:class="{'activity' : item.linkTo == '/thanka'}">
    <!-- <router-link  :to="item.linkTo" >  -->
      <div class="tab-bar" :class="$index == showIndex?'selected':''" @click="selectNav(item, $index)">
        <div class="icon">    <!-- item.selected ? item.iconClasses : item.iconClass -->
          <i class="iconfont" :class="$index == showIndex?item.iconClasses:item.iconClass"></i>
        </div>
        <div class="text">
          <span>{{item.title}}</span>
        </div>
      </div>
    <!-- </router-link>  -->
    </div>
  </nav>
</template>
<script>
export default {
  props: ['showIndex', 'msgLists'],
  data () {
    return {
      isMsgList: {}
    }
  },
  methods: {
    selectNav (item, index) {
      this.$router.push(this.isMsgList[index].linkTo)
      for (let i = 0; i < this.msgList.length; i++) {
        this.msgList[i].selected = false
      }
      this.isMsgList[index].selected = true
    }
  },
  created () {
    this.isMsgList = this.msgLists
  },
  mounted () {}
}
</script>

<style lang="less">
.app-nav {
  display : flex;
  align-items: center;
  justify-content: flex-start;
}
.app-nav > div {
  width : 25%;
  height : 100%;
  box-sizing : border-box;
}
.app-nav > .activity:nth-child(3) {
  padding-top : 0.16rem;
  display : flex;
  justify-content: center;
}
.app-nav .tab-bar .icon {
  position: absolute;
  top: 12px;
  width: 25%;
  text-align: center;
  line-height: 40px;
}
.app-nav .tab-bar .icon .iconfont {
  font-size: 50px;
}
.app-nav .tab-bar .text {
  padding-top: 27px;/*no*/
  height: 44px;
  line-height: 44px;
  font-size: 12px;/*no*/
  width: 100%;
}
.app-nav .tab-bar .icon .icon-fenlei2,
.app-nav .tab-bar .icon .icon-fenlei1 {
  font-size: 18px;/*no*/
}

.app-nav .tab-bar .icon .icon-shouye2,
.app-nav .tab-bar .icon .icon-shouye1 {
  font-size: 25px;/*no*/
}

.app-nav .tab-bar .icon .icon-xiaoxi3,
.app-nav .tab-bar .icon .icon-xiaoxi2 {
  font-size: 25px;/*no*/
}
.app-nav .tab-bar .icon .icon-faxian2,
.app-nav .tab-bar .icon .icon-faxian {
  font-size: 25px;/*no*/
}
.app-nav .tab-bar .icon .icon-wode,
.app-nav .tab-bar .icon .icon-wode1 {
  font-size: 23px;/*no*/
}
.app-nav > .activity:nth-child(3) .tab-bar {
  width : 138px;
  height : 77px;
  background : url('../../assets/activityimages/navBarTangka.png');
  background-size : 100%;
}
.app-nav .selected {
  color: #9e2026 !important;
}
.weui-grid {
  margin: 0;
  padding: 0;
}
.weui-grid:before {
  background: none;
  display: none;
}
.iconfont {
  font-size: 40px;
  margin: 8px;
  display: inline-block;
}
.app-nav {
  z-index: 990;
  height: 50px; /*no*/
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  transform: translateZ(0);
  background: #fff;
  max-width: 750px;
  margin: 0 auto;
  // padding: 8px 0 20px 0;

  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }

  .tab-bar {
    color: #999;
    padding-top: 2px;
    width: 100%;
    float: left;
    height: 100px;
    text-align: center;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    justify-content: space-between;

    a {
      color: #5d656b;
      flex: 1;
      text-align: center;
      box-sizing: border-box;
      display: block;
      font-size: 24px;
      height: 100px;
    }
  }
}
.custom-active {
  color: #ff6666 !important;
}

.border {
  position: relative;
}
.border.horizonBottom:after {
  left: 0;
  bottom: 0;
}
.border.horizonTop:after,
.border.horizonBottom:after {
  width: 100%;
  height: 2px;
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}

/*键盘的公共样式*/
#fixednumMain {
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
  overflow: hidden;
}
.fixednumMain .tipBanner span.title {
  line-height: 90px;
  text-indent: 28px;
  min-width: 170px;
  float: left;
}
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
  color: #13b0fd;
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
.fixednumMain .priceBanner .last {
  float: left;
  color: #13b0fd;
  overflow: hidden;
  font-size: 28px;
  height: 90px;
  line-height: 90px;
  font-family: "Helvetica neue", Verdana, Geneva, sans-serif;
}
.fixednumMain .priceBanner .lasttwo {
  float: right;
  color: #13b0fd;
  overflow: hidden;
  font-size: 28px;
  height: 90px;
  line-height: 90px;
  margin-right: 100px;
  font-family: "Helvetica neue", Verdana, Geneva, sans-serif;
}
.fixednumMain .priceBanner .editTxt {
  width: 360px;
  height: 74px;
  line-height: 90px;
  border: none;
}

.fixednumMain .tipBanner .close {
  width: 84px;
  height: 84px;
  float: right;
}
.fixednumMain .tipBanner .close .icon-guanbi {
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
  overflow: hidden;
}

.fixednumMain .priceBanner .editTxt .hover {
  border-right: 2px solid red;
}
.fixednumMain .priceBanner i {
  color: #999999;
  font-size: 32px;
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
.fixednumMain .btnBanner .fixedPricem {
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
.fixednumMain .btnBanner .confirmBtnm {
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
  background: #06bc07;
  width: 15%;
  margin-right: 2%;
  margin-left: 0;
  background-image: url("//cdn.weipaitang.com//res/img/subIcon.png");
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
}
.fixednumMain .btnBanner .changePrice.add {
  background: #06bc07;
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
  border-right: 1px solid #bababa;
  border-bottom: 1px solid #bababa;
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
  background-color: #d1d5da;
}
.fixednumMain .numkey ul li.othernum {
  background-color: #d1d5da;
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
.icon-shibai {
  position: absolute;
  right: 15px;
  top: 25px;
}

/*取消chrome下input和textarea的聚焦边框 及textarea可拖动放大：*/
input,
button,
select,
textarea {
  outline: none;
}
textarea {
  resize: none;
}
</style>
