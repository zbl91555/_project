<template>
    <div class="sellerReport">
      <div class="menu border horizonBottom">
        <div class="menuList mode border verticalRight">
          <div v-for="(list,index) in timeLists" class="menuItem" :class="{ selected:changeRed == index}" @click="Red(index)">{{list.text}}</div>
        </div>
      </div>
      <div class="reportsMain">
        <div class="reportItem">
          <div class="reportTitle border horizonBottom" targetstatus="deal">
            成拍报表            
            <!-- <a href="/reports/capital#type=deal" class="more"> -->
              <!-- <i class="iconfont icon-right"></i> -->
            <!-- </a> -->
          </div>
          <div class="reportInfo">
            <div class="reportData" id="reportData">
              <div>
                金额: <span>￥{{reportList.chengpai_price}}</span>
              </div>
              <div>
                笔数: <span>{{reportList.chengpai_count}}笔</span>
              </div>
            </div>
          </div>
        </div>
        <div class="reportItem">
          <div class="reportTitle border horizonBottom" targetstatus="deal">销售报表</div> 
          <div class="reportInfo">
            <div class="reportData">
              <div>
                已付款: <span>￥{{reportList.yifu_price}}</span>
              </div>
              <div>
                笔数: <span>{{reportList.yifu_count}}笔</span>
              </div>
            </div>
          </div>
            <div class="reportInfo">
            <div class="reportData">
              <div>
                已退款: <span>￥{{reportList. yitui_price}}</span>
              </div>
              <div>
                笔数: <span>{{reportList.yitui_count}}笔</span>
              </div>
            </div>
          </div>
            <div class="reportInfo">
            <div class="reportData">
              <div>
                已收款: <span>￥{{reportList. yituihuo_price}}</span>
              </div>
              <div>
                笔数: <span>{{reportList.yituihuo_count}}笔</span>
              </div>
            </div>
          </div>
        </div> 
        <div class="reportItem">
          <div class="reportTitle border horizonBottom" targetstatus="deal">待收款报表</div>
          <div class="reportInfo">
            <div class="reportData">
              <div>
                未发货: <span>￥{{reportList.weifahuo_price}}</span>
              </div>
              <div>
                笔数: <span>{{reportList.weifahuo_count}}笔</span>
              </div>
            </div>
          </div>
            <div class="reportInfo">
            <div class="reportData">
              <div>
                待确认: <span>￥{{reportList.daiqueren_price}}</span>
              </div>
              <div>
                笔数: <span>{{reportList.daiqueren_count}}笔</span>
              </div>
            </div>
          </div>
          <div class="reportInfo">
            <div class="reportData">
              <div>
                退款中: <span>￥{{reportList.tuikuanzhong_price}}</span>
              </div>
              <div>
                笔数: <span>{{reportList.tuikuanzhong_count}}笔</span>
              </div>
            </div>
          </div>
          <div class="reportInfo">
            <div class="reportData">
              <div>
                退货中: <span>￥{{reportList.tuihuozhong_price}}</span>
              </div>
              <div>
                笔数: <span>{{reportList.tuihuozhong_count}}笔</span>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
</template>
<script>
  import {seller_report} from '../../../api/api'
export default {
  data() {
    return {
      timeLists:[
        {
          "text":"截拍时间",
          'type':'colligate'                 
        },
        {
          "text":"今天",
          'type':'today'                 
        },
        {
          "text":"昨天",
          'type':'yesterday'                 
        },
        {
          "text":"7天",
          'type':'recent7'                 
        },
        {
          "text":"30天",
          'type':'recent30'                       
        }
      ],
      changeRed:1,
      reportList:[],
      type:'today',
      pagenum:5,
      page:1,
    };
  },
  created(){ 
  },
  methods: { 
    sendParames(e){
      this.$router.push({
        path: 'goodsDetails', 
        query: {
          id: e
        }
      })
    },
    seller_report(){
      let _this = this;   // 缓存指针  
      let params = {
        type:this.type
      };
      seller_report(params).then(function (response) { 
         if(response.code==200){
          _this.reportList = response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    Red:function(index){
      this.changeRed = index;
      this.type=this.timeLists[index].type;
      this.seller_report();
    },
  
  }, 
  mounted() {
    this.seller_report();
  }, 
};
</script>
<style scoped>
  .sellerReport {
    background-color: #ededef;
    max-width: 750px;
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
    padding-bottom: 60px;
  }
  .sellerReport .menu {
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

  .sellerReport .menu .menuList.mode {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    padding: 0 30px;
  }
  .sellerReport .menu .menuList {
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

  .sellerReport .menu .menuList.mode .menuItem {
    padding: 0;
    width: 20%;
  }
  .sellerReport .menu .menuList .menuItem.selected {
    color: #9e2026;
  }
  .sellerReport .menu .menuList .menuItem {
    font-size: 28px;
    cursor: pointer;
    text-align: center;
    padding: 0 16px;
  }
  .sellerReport .menu .menuList:after {
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
  .sellerReport .menu .menuList .menuItem i {
    font-size:42px;
    color: #666;
  }
  .sellerReport .menu .menuList .traces .icon-zuji{
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
  .sellerReport .blank {
    width: 100%;
    height:91px;
  }
  .reportsMain {
    width: 100%;
    padding-top: 78px;
}
  .reportsMain .reportItem {
    background-color: #FFF;
    padding-left: 40px;
    margin-top: 10px;
    font-size: 28px;
}
.reportsMain .reportTitle {
    width: 100%;
    font-size: 28px;
    line-height: 90px;
    color: #333;
}
.border {
    position: relative;
}
.border.horizonTop:after, .border.horizonBottom:after {
    width: 100%;
    height: 2px;
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
}
.border:after {
    position: absolute;
    content: '';
    background-color: #D9D9D9;
}
.border.horizonBottom:after {
    left: 0;
    bottom: 0;
}
.reportsMain .reportTitle .more {
    float: right;
    display: inline-block;
    font-size: 24px;
    color: #999;
    padding-right: 20px;
}
.reportsMain .reportTitle .more::before {
    content: "更多";
    color: #999;
}
.sellerReport .icon-right{
  font-size: 24px;
}

#reportData:first-child {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 20px 0;
    line-height:80px;
    width: 100%;
    box-sizing: border-box;
}


.reportsMain .reportInfo .reportData {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 20px 0;
    line-height:40px;
    width: 100%;
    box-sizing: border-box;
}
.reportsMain .reportInfo .reportData div {
    color: #999;
    margin: 0 auto;
}
.reportsMain .reportInfo .reportData div span {
    color: #333;
}

</style>	
