<template>
	<div class="returnRequest">
		<div>
			<div class="buy-info">
				<div class="goods-info" v-bind:style="{backgroundImage: 'url(' + info.img + ')'}"></div>
				<p class="goods-intr">{{info.express}}</p>
				<ul class="buyer-detail">
					<li>{{info.express_code}}</li>
				</ul>
			</div>
		</div>
    <div class="gray"></div>
    <div class="getAddress">
          <div></div>
          <div class="icon-icon-test iconfont"></div>
          <div>
              [收货地址]{{address.address_province}} {{address.address_city}}{{address.address_country}} {{address.address}}
          </div>
    </div>
    <div class="logisticsLine" v-if="hide">
        <div class="timeline-demo">
          <div class="newtimeline" v-for="(list,index) in info.wuliu" :key="list.AcceptTime">
              <div class="lineTitle">
                  <div :class="index == '0'? 'when':'whennext'">{{list.AcceptTime.slice(5,10)}}</div>
                  <div :class="index == '0'? 'time':'timenext'">{{list.AcceptTime.slice(11,16)}}</div>
              </div>
              <div class="lineTitle" :class="index == (info.wuliu.length-1)? 'highLinenext':'highLine'">
                  <!-- <div :class="index == '0'? 'inway':'inwaynext'">运输中</div> -->
                  <div :class="index == '0'? 'des':'desnext'">{{list.AcceptStation}}</div>
                  <div v-if="index == '0'" class="icon-xiangshang iconfont first"></div>
                  <div v-if="index != '0'&& index != (info.wuliu.length-1)" class="spoint iconfont"></div>
                  <div v-if="index == (info.wuliu.length-1)" class="icon-xiangshang iconfont last"></div>
              </div>
          </div>
          <load-more v-if="loading" tip="正在加载"></load-more>
        </div>
    </div>
    <div style="text-align: center" v-if="!hide">
        <div class="iconfont icon-zanwushuju"></div>
        <div class="noGui">暂无轨迹信息</div>
    </div>
    <div class="gray"></div>
<!--     <div class="guesslike">
          <div>猜你喜欢</div>
    </div> -->
  <!--   <div class="allmaylike">
      <div class="maylike">
        <div class="picstyle">图片</div>
        <div>title</div>
        <div class="price">
          <div class="floatl">￥100起</div>
          <div class="floatr"><i>223</i><i class="icon-huo iconfont"></i></div>
        </div>
      </div>
      <div class="maylike">
        <div class="picstyle">图片</div>
        <div>title</div>
        <div>
          <div>￥120起</div>
          <div>223</div>
        </div>
      </div>
      <div class="maylike">
        <div class="picstyle">图片</div>
        <div>title</div>
        <div>
          <div>￥0起</div>
          <div>223</div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { LoadMore } from 'vux'
import {orderExpress} from '../../../api/api'
export default {
  name: 'checkLogistics',
  components: {
    LoadMore
  },
  data () {
    return {
      info: {},
      order_id: '',
      Type: '',
      count: 100,
      seeMore: true,
      hide: true,
      loading: false,
      address: {}
    }
  },

  methods: {
    // 页面
    orderExpress () {
      let _this = this
      this.order_id = this.$route.params.order_id
      let type = this.$route.params.type
      if (type == 'true') {
        this.Type = 'tuihuo'
      } else {
        this.Type = 'normal'
      }
      let params = {
        type: this.Type
      }
      orderExpress(this.order_id, params).then((res) => {
        _this.info = res.data
        _this.address = res.data.address
        _this.loading = false
        if (typeof (_this.info.wuliu) != 'object') {
          _this.hide = false
        }
        // if(_this.seeMore == true){
        //   if(_this.info.wuliu != '暂无轨迹信息'){
        //     _this.info.wuliu = _this.info.wuliu.slice(0,3)
        //   }else{
        //     _this.hide = false
        //   }
        // }
      }).catch(function (err) {
        this.$router.push({name: 'errorPage'})
      })
    }
  },
  mounted () {
    this.orderExpress()
  }
}
</script>

<style scoped lang="less">
.noGui{
  color: #999;
  font-size: 24px;
  margin-top: 20px;
  padding-bottom:100px;
}
.icon-zanwushuju{
  font-size:52px;
}
.icon-jiantouxiangxia{
  font-size: 28px;
}
.newtimeline{
  overflow: hidden;
  padding:0 20px 0 50px;
}
.newtimeline .lineTitle{
  float: left;
}
.highLine{
  padding-left: 30px;
  border-left: 1px solid #d2d2d2;
  margin-left: 30px;
  position: relative;
}
.highLinenext{
  padding-left: 30px;
  margin-left: 30px;
  position: relative;
}
.des{
  width:510px;
  padding-bottom: 50px;
  word-wrap: break-word;
  word-break: normal;
  font-size: 24px;
  color: #9e2026;
  margin-top: 10px;
}
.desnext{
  width:510px;
  padding-bottom: 50px;
  word-wrap: break-word;
  word-break: normal;
  font-size: 24px;
  color: #999999;
  margin-top: 10px;
}
.first{
  position: absolute;
  left:-15px;
  top:0px;
  margin: 0;
  background:#9e2026;
  color:white;
  width:30px;
  height: 30px;
  font-size:12px;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
}
.last{
  position: absolute;
  left:-15px;
  top:0px;
  margin: 0;
  background:#d2d2d2;
  color:white;
  width:30px;
  height: 30px;
  font-size:12px;
  border-radius: 15px;
  text-align: center ;
  line-height: 30px;
}
.spoint{
  width: 14px;
  height: 14px;
  background-color: #d2d2d2;
  border-radius: 7px;
  position: absolute;
  left:-15px;
  top:0;
}
.when{
  font-size: 30px;
  color: #9e2026;
}
.time{
  font-size: 20px;
  color: #9e2026;
}
.inway{
  font-size: 28px;
  color: #9e2026;
}
.whennext{
  font-size: 30px;
  color: #999999;
}
.timenext{
  font-size: 20px;
  color: #999999;
}
.inwaynext{
  font-size: 28px;
  color: #999999;
}
@border-color: #e5e5e5;
  .returnRequest{
    padding-bottom: 100px;
  }
	.buyer-tool {
        height: 76px;
        line-height: 76px;
        padding: 0 30px;
        position: relative;
        a {
          display: inline-block;
          line-height: 76px;
          float: left;
          position: relative;
          padding-right: 40px;
        }
      }
    .buy-info {
        height: 220px;
        background-color: white;
        padding: 27px 30px;
        box-sizing: border-box;
        .goods-info {
          height: 166px;
          width: 166px;
          float: left;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          margin-right: 20px;
        }
        .goods-intr {
          float: left;
          width: 70%;
          height: 60px;
          line-height: 30px;
          margin-bottom: 10px;
          word-break: break-all;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          color: #9e2026;
          font-size: 24px;
          margin-top: 40px;
        }
        .buyer-detail {
          float: left;
          width: 70%;
          background: white
        }
        .buyer-detail li {
          height: 25px;
          line-height: 25px;
          background-color: transparent;
          padding: 0;
          color: #999;
          i{
            color:#9e2026;
          }
        }
      }
    .gray{
      height:20px;
      background: #f7f7f7
    }
    .getAddress{
      height:90px;
      overflow: hidden;
      position: relative;
      margin-top: 20px;
    }
    .icon-icon-test{
     position: absolute;
     left:122px;
     font-size: 40px;
     margin: 0;
    }
    .getAddress div:nth-child(3){
      width: 530px;
      word-wrap: break-word;
      word-break: normal;
      line-height: 50px;
      color: #999999;
      float: left;
      font-size: 26px;
      margin-left: 178px;
    }
    .timeline-demo {
      position: relative;
      h4 {
        color: #666;
        font-weight: normal;
      }
      .recent {
        color: #9e2026;
        font-size: 32px;
      }
    }
    .fontsize{
      font-size: 26px;
      color: #888;
    }
    .guesslike{
        height: 130px;
        line-height: 130px;
        text-align: center;
    }
    .allmaylike{
    overflow: hidden;
  }
  .maylike{
    width: 49%;
    float: left;
    margin-top: 10px;
  }
  .maylike:nth-child(even){
    margin-left: 2%
  }
  .maylike .price{
    overflow: hidden;
  }
  .maylike .price .floatl{
    float: left;
  }
  .maylike .price .floatr{
    float: right;
    line-height: 21px;
  }
  .maylike .price .floatr i{
    line-height: 21px;
  }
  .picstyle{
    width: 374px;
    height: 374px;
    border: 1px solid red
  }
  .seeMore{
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 1
  }
</style>
