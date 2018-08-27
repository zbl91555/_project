<template>
    <div class="luckybagDetails">
      <div class="packPop" style="">
        <div class="packPopDiv">
        <i class="iconfont icon-guanbi"></i>
          <h3>
            <span class="reword_price">2.81</span>元
          </h3>
        </div>
      </div>
      <div class="packinfoTop">
        <img src="http://thirdwx.qlogo.cn/mmopen/ibKHP1TZZeXI8J7cwNOKv55ulgScbiaLMr8EpTVdgWI9z84Giasibicp7v1MhtzPD18G1tCeeqh1xibGhLCghXiaOBCbKYzGibGdBgicR/132" width="400" height="400">
        <p>今夕何夕的福袋</p>
        <h4>ceshi</h4>
        <b>
        <span>****</span>
          <!-- 已领<span>8.88</span>
          <i>元</i> -->
        </b>
        <p>领取后存入<a href="index.php?act=my&amp;op=myinfo">淘拍堂</a>余额，可直接<a href="index.php?act=my&amp;op=myinfo">消费</a>或<a href="index.php?act=my&amp;op=myinfo">提现</a></p>
        <!-- <p>
          把福袋分享给您的小伙伴吧！
        </p> -->

        <div class="openBn"><a href="javascript:;" class="lingqu" id="lingqu">立即领取</a></div>
      </div>
      <div class="packinfoNote">
        <span>
          福袋已被领取0.00元/27.72
        </span>
        <router-link to="/sellerCenter/sellerTool/luckybag">
          我也要发福袋
        </router-link>
      </div>
      <div class="packinfoList">
        <ul id="recorddata">
          <li>
            <div class="packListLeft">
              <img src="http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLOiauf1eGFPCPGOVS2rXAeeCiciayjaAmDpyP2E18icdEJEoIkDkRRjDiaAVQw6iaM51cmEib9mjG8OS8sg/132" width="400" height="400">
            </div>
            <div class="packListMid">
              <div>张三</div>
              <p>2018-03-13 16:47</p>
              </div>
            <div class="packListRight"><span>2.00元</span></div>
          </li>
          <li>
            <div class="packListLeft">
              <img src="http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLOiauf1eGFPCPGOVS2rXAeeCiciayjaAmDpyP2E18icdEJEoIkDkRRjDiaAVQw6iaM51cmEib9mjG8OS8sg/132" width="400" height="400">
            </div>
            <div class="packListMid">
              <div>李四</div>
              <p>2018-03-13 16:47</p>
              </div>
            <div class="packListRight"><span>2.00元</span></div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created () {
  },
  methods: {

    getstore () {
      let _this = this
    }

  },
  mounted () {
    // this.getstore();
  }
}
</script>
<style scoped>
  .luckybagDetails{
    width: 100%;
    max-width: 750px;
    background-color: #fff;
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
    z-index: 999;
  }
  .packinfoTop {
    text-align:center;
    background:#fff url(../../../assets/images/pack.png) top center no-repeat/100%;
  }
  .packinfoTop img {
    width:134px;
    height:134px;
    margin-top:120px;
  }
  .packinfoTop p:first-child{
    font-size:28px;
    color: #333;
    margin:24px 0 50px 0;
  }
  .packinfoTop h4 {
    color:#999;
    font-size:24px;
    font-weight:100;
    margin:50px 0 37px 0;
  }
  .packinfoTop b {
    font-weight:100;
    color: #333;
    font-size: 28px;
  }
  .packinfoTop b span {
    font-size:84px;
    font-weight: 700
  }
  .packinfoTop b i{
    color: #333;
    font-size: 40px;
    font-weight: 700;
  }
  .packinfoTop p:last-child {
    font-size:24px;
    color: #999;
    margin:53px 0 77px 0;
  }
  .packinfoNote {
    height:90px;
    line-height:90px;
    padding:0px 31px;
    background:#f4f4f4;
    font-size: 24px;
    color: #333;
  }
  .packinfoNote a {
    color: #f15511;
    font-size:24px;
    float:right;
  }
  .packinfoList {
    min-height:300px;
    background:#fff;
  }
  .packinfoList ul li {
    height:129px;
    display:flex;
    border-bottom:#e5e5e5 1px solid;
  }
  .packListLeft {flex:1.2;}
  .packListLeft img {
    width:90px;
    height:90px;
    margin-left:30px;
    margin-top:20px;
  }
  .packListMid {flex: 3;}
  .packListMid > div {
    font-size:28px;
    margin-top:23px;
    margin-bottom:12px;
    color:#333;
  }
  .packListMid p {
    color:#999;
    font-size: 24px;
   }
  .packListRight {
    flex: 1.4;
    text-align:right;
  }
  .packListRight span {
    font-size:28px;
    color: #333;
    line-height:129px;
    margin-right:34px;
  }

  .openBn, .disopenBn {
    height: 80px;
    padding: 102px 30px;
}

.openBn a {
    color: #fff;
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    color: #fff;
    background: #9e2026;
    border-radius: 5px;
    display: block;
}

/*弹窗样式*/
.packPop {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.5);
}
.packPopDiv {
    color: #ffde78;
    width: 531px;
    height: 652px;
    text-align: center;
    margin: 280px auto;
    background: url(../../../assets/images/packsge.png)no-repeat center /100%;
    position: relative;
}
.icon-guanbi {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size:70px;
    color: rgba(92, 22, 28, 0.67);
}
.packPopDiv h3 {
    padding-top: 230px;
    font-size: 40px;
    font-weight: 100;
    color: #fff;
}

.packPopDiv h3 span {
    font-size: 100px;
}
</style>
