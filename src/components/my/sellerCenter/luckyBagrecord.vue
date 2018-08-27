<template>
    <div class="luckyBagrecord">
      <div class="top ">
        <div class="title border horizonBottom">发放福袋记录</div>
      </div>
      <div class="wall-container clearfix">
        <div class="wall-col clearfix">
          <div class="itemList">
          <ul id="recorddata" class="border horizonBottom">
            <li>
            <div class="payListLeft">
              <div class="lucky"></div>
            </div>
            <div class="payListMid">
              <i>新手￥515.79</i>
              <p>
                发放时间2017-12-25 15:03
              </p>
            </div>
            <router-link to="luckybagDetails">
              <div class="payListRight">
                <span>立即发放
                  <i class="iconfont icon-right"></i>
                </span>
              </div>
            </router-link>
          </li>
          <li>
            <div class="payListLeft">
              <div class="lucky"></div>
            </div>
            <div class="payListMid">
              <i>新手￥515.79</i>
              <p>
                发放时间2017-12-25 15:03
              </p>
            </div>
            <router-link to="luckybagDetails">
              <div class="payListRight">
                <span>立即发放
                  <i class="iconfont icon-right"></i>
                </span>
              </div>
            </router-link>
          </li>
          </ul>
          <!-- 没有数据 -->
            <!-- <div class="noData">
              <div class="noDataIcon">
                <span class="wptFM fi-stack">
                  <i class="iconfont icon-yuan fi-stack-2x"></i>
                  <i class="iconfont icon-wodehongbao fi-stack-2x"></i>
                </span>
              </div>
              暂无发放福袋记录
            </div> -->
          </div>
        </div>
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
  .luckyBagrecord{
    z-index: 999;
  }
  .luckyBagrecord .itemList ul li {
      height: 130px;
      border-bottom: #e5e5e5 1px solid;
      display: flex;
      margin-left: 30px;
  }
  .luckyBagrecord .itemList ul li:last-child{
    border: none;
  }
  .fi-stack {
      position: relative;
      display: inline-block;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      vertical-align: middle;
  }
  .fi-stack .fi-stack-2x{
    width: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    font-size: 2rem;
    text-align: center;
    line-height: inherit;
  }
  .fi-stack .icon-wodehongbao {
    color: #fff;
    font-size: 1rem;
  }
  .payListLeft {
    line-height: 130px;
    padding:27px 34px 32px 0px;
  }
  .payListLeft .lucky{
    width: 62px;
    height: 72px;
    background: url(../../../assets/images/redPacket.png)no-repeat center /cover;
  }
  .payListMid {
    flex: 3;
}
.payListMid i{
  display: block;
  font-size: 28px;
  color: #333;
  margin-top: 19px;
  margin-bottom: 12px;
}
.payListMid p {
  color: #999;
  font-size: 24px;
}
.payListRight {
  height: 130px;
  line-height: 130px;
  flex: 2.5;
  text-align: right;
}
.payListRight span {
    color: #333;
    font-size: 28px;
    line-height: 70px;
    padding-right: 20px;
    margin-right: 15px;

}
  .icon-right{
    margin:0;
    font-size: 24px;
  }

  .luckyBagrecord {
    background-color: #ededef;
    max-width: 750px;
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
    padding-bottom: 60px;
  }
  .luckyBagrecord {
    min-height: calc(100vh + 60px) !important;
  }
  .luckyBagrecord .top {
    height: 100px;
    line-height: 100px;
    background-color: #FFF;

  }
  .luckyBagrecord .top .title {
    float: left;
    width: 100%;
    font-size: 28px;
    margin-left: 30px;
  }
  .luckyBagrecord .top .help {
    float: right;
    color: #888;
    width: 62px;
    height: 20px;
    font-size: 28px;
    cursor: pointer;
    margin-top: 11px;
    line-height: 20px;
    text-align: center;
    background-size: 20px;
  }
  .luckyBagrecord .top .help span {
    line-height: 20px;
  }
  .luckyBagrecord .itemList {
    background-color: #FFF;
  }
  .luckyBagrecord .itemList .item {
    display: block;
    height: 80px;
    cursor: pointer;
    line-height: 80px;
    margin-left: 15px;
  }
  .luckyBagrecord .itemList .item:last-child:after {
    height: 0;
  }
  .luckyBagrecord .itemList .item .redPack {
    float: left;
    width: 33px;
    height: 100%;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(/res/img/thirdPart/redPack/redpack.png);
  }
  .luckyBagrecord .itemList .item .mid {
    float: left;
    padding: 18px 0;
    line-height: 20px;
    margin-left: 15px;
  }
  .luckyBagrecord .itemList .item .mid .money {
    font-size: 16px;
    height: 24px;
    line-height: 24px;
  }
  .luckyBagrecord .itemList .item .mid .time {
    font-size: 14px;
    color: #888;
  }
  .luckyBagrecord .itemList .item .info {
    position: absolute;
    right: 30px;
    color: #888;
    height: 80px;
    line-height: 80px;
  }
  .luckyBagrecord .itemList .item .arrow {
    width: 10px;
    float: right;
    color: #CFCFCF;
    font-size: 14px;
    margin-right: 15px;
  }
  .luckyBagrecord .itemList .noData {
    width: 100%;
    color: #888;
    font-size: 16px;
    line-height: 30px;
    padding-top: 210px;
    text-align: center;
    background-color: #EEE;
  }
  .luckyBagrecord .itemList .noData .noDataIcon {
    position: absolute;
    top: 130px;
    width: 100%;
    color: #D7D8DA;
    font-size: 66px;
  }
</style>
