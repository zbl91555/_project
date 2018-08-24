<template>
    <div class="statements">
      <div class="orderSearchMain" v-show="main">
        <div class="searchItem">
          <div class="title border horizonBottom">
            选择起止时间
              <span class="iconfont icon-yiwen"></span>
          </div>
          <div class="item">
            <div @click="alertDateS" class="searchTime">
              <i>开始：</i> 
              <div class="numInput startyear">
                <span>{{year}}</span>
              </div>
              <i>年</i>
              <div class="numInput startmonth">
                <span>{{month}}</span>
              </div>
              <i>月</i>
              <div class="numInput startday">
                <span>{{data}}</span>
              </div>
              <i>日</i>
            </div>
          <div @click="alertDateE" class="searchTime">
              <i>结束：</i> 
              <div class="numInput startyear">
                <span>{{years}}</span>
              </div>
              <i>年</i>
              <div class="numInput startmonth">
                <span>{{months}}</span>
              </div>
              <i>月</i>
              <div class="numInput startday">
                <span>{{datas}}</span>
              </div>
              <i>日</i>
          </div>
          
          <div class="timeShortcut">
            <div class="shortcutBtn" v-for="(list,index) in timeLists" :class="{ selected:changeRed == index}" @click="Red(index)">{{list.text}}</div>
          </div>
        </div>
        </div>
        <button class="searchBtn" @click="search()">搜 索</button>
      </div>
      <div class="orderList" v-show="list">
        <div class="orderListime">{{stTile}}至{{etTile}}</div>
        <div class="orderListitle">
          <div>收入汇总</div>
          <div>金额(元)</div>
          <div>笔数(笔)</div>
        </div>
        <div class="orderLisdata">
          <div class="income">
            <div>收入</div>
            <div>{{orderLists.shouRu}}</div>
            <div>{{orderLists.shouRu_num}}</div>
            <!-- <div>0 {{item.shouRu_num}}</div> -->
          </div>
           <div class="spending">
            <div>支出</div>
            <div>{{orderLists.zhiChu}}</div>
            <div>{{orderLists.zhiChu_num}}</div>
            <!-- <div>0 {{item.zhiChu_num}}</div> -->
          </div>
        </div>
      </div>
       <actionsheet v-model="showTipe" :menus="menus1" @on-click-menu-menu1="certification"></actionsheet>
    </div>
</template>
<script>
  import {orderCheck,orderList} from '../../../api/api'
  import { Datetime, XButton, Actionsheet ,Group} from 'vux'
  export default {
  components: {
    Datetime,
    XButton,
    Actionsheet,
    Group
  },
  data() {
    return {
      timeLists:[
        {
          "text":"今日",
          'type':'today'                 
        },
        {
          "text":"昨日",
          'type':'yesterday'                 
        },
        {
          "text":"近7天",
          'type':'7day'                 
        },
        {
          "text":"近30天",
          'type':'30day'                 
        },
      ],
      changeRed:0,
      orderLists:[],
      type:'',
      menus1: {
        menu3: '仅限认证用户使用，赶快去认证吧',       
        menu1: '知道了',
      },
      showTipe:false,
      title:'开始：',
      titles:'结束：',
      main:true,
      list:false,
      st:'',
      et:'',
      stTile:'',
      etTile:'',
      certifications:'',
      year:'',
      month:'',
      data:'',
      years:'',
      months:'',
      datas:'',
      currentime:'', //当前时间时间戳

    };
  },
  methods: {
    //选择开始时间
    alertDateS(){
      let _this = this
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          value: '', // 其他参数同 props
          onHide () {
            
          },
          onShow () {
            
          },
          onConfirm (val) {
            _this.year=val.split("-")[0]
            _this.month=val.split("-")[1]
            _this.data=val.split("-")[2]
            _this.st =  Date.parse(new Date(val))/1000   //开始时间时间戳
            if(_this.st > _this.currentime){
              _this.showTipe= true;
              _this.menus1.menu3 ='时间不能大于当前时间'
            }
          },
        })
    },
    //选择结束时间
    alertDateE(){
      let _this = this
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          value: '', // 其他参数同 props
          onHide () {
          },
          onShow () {
            
          },
          onConfirm (val) {
            _this.years=val.split("-")[0]
            _this.months=val.split("-")[1]
            _this.datas=val.split("-")[2]
            _this.et =  Date.parse(new Date(val))/1000 //结束时间时间戳
              if(_this.et > _this.st + 30*86400){
                _this.showTipe= true;
                _this.menus1.menu3 ='查询时间不能超过一个月'
              }
              if(_this.et > _this.currentime){
              _this.showTipe= true;
              _this.menus1.menu3 ='时间不能大于当前时间'
            }
          },
        })
    },
    //用戶是否认證，初始化自定义时间 
    orderCheck(){
      let _this = this;   // 缓存指针  
        let myDate = new Date();  //当前时间
        _this.currentime = Date.parse(new Date(myDate))/1000
        _this.et = _this.currentime
        _this.st = _this.currentime
        _this.year = (myDate.getFullYear()).toString(); //年
        _this.years = (myDate.getFullYear()).toString(); //年
        _this.month =(myDate.getMonth()+1).toString(); //月
        _this.months =(myDate.getMonth()+1).toString(); //月
        _this.data = (myDate.getDate()).toString(); //日
        _this.datas = (myDate.getDate()).toString(); //日
        //如果日或者月不满十位数，前面补0
        if(_this.data.length<2){
           _this.data='0'+_this.data;
        }
        if(_this.month.length<2){
            _this.month='0'+_this.month;
        }  
        if(_this.datas.length<2){
           _this.datas='0'+_this.datas;
        }
        if(_this.months.length<2){
            _this.months='0'+_this.months;
        }  
        orderCheck().then(function (res) { 
         if(res.code==200){
          _this.certifications = res.data
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // 搜索請求數據
    orderList(){
      let _this = this;   // 缓存指针  
      // 自定义时间的限制
      if(_this.et > _this.currentime || _this.st > _this.currentime ){
        _this.showTipe= true;
        _this.menus1.menu3 ='时间不能大于当前时间'
        return  false;
      }
      if(_this.et-_this.st > 2678400){
        _this.showTipe= true;
        _this.menus1.menu3 ='搜索时间范 围超31天，请重新选择'
        return  false;
      }
      if(_this.type==''){
        let params = {
          type:'custom',
          start_time:_this.st,
          end_time:_this.et
        }
        _this.stTile = _this.year + "-" + _this.month + "-" + _this.data
        _this.etTile = _this.years + "-" + _this.months + "-" + _this.datas
        orderList(params).then(function (res) { 
         if(res.code==200){
          _this.orderLists = res.data;
          _this.main = false;//关闭当前页
          _this.list = true ;//打开列表页
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      }else{
         let params = {
          type:_this.type,
        }
        orderList(params).then(function (res) { 
         if(res.code==200){
          _this.orderLists = res.data;
          _this.main = false;//关闭当前页
          _this.list = true ;//打开列表页
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }  
    },
    
    
    
    //点击搜索按钮
    search(){
      // 如果认证了就可以搜索
      if(this.certifications){ 
        this.orderList();
      }else{
        // 没认证跳出弹窗去认证
        this.showTipe= true;
      } 
    },
    // 跳转认证
    certification(){
      if(this.certifications){
        return false
      }else{
        if(this.menus1.menu3 ='时间不能大于当前时间'){

        }else{
          this.$router.push({path:'/sellerCenter/realnameApplication'})
        }
      }
    },
    Red:function(index){
      this.changeRed = index;
      this.type=this.timeLists[index].type;
      this.orderCheck();
      if(index==0){
        this.stTile = this.year + "-" + this.month + "-" + this.data
        this.etTile = this.years + "-" + this.months + "-" + this.datas
      }else if(index==1){
       let clicktime = this.currentime-86400
       let clicktimes=new Date(parseInt(clicktime) * 1000)
        this.year = (clicktimes.getFullYear()).toString(); //年
        this.month =(clicktimes.getMonth()+1).toString(); //月
        this.data = (clicktimes.getDate()).toString(); //日
      //如果日或者月不满十位数，前面补0
        if(this.data.length<2){
          this.data='0'+this.data;
        }
        if(this.month.length<2){
          this.month='0'+this.month;
        }  
          this.stTile = this.year + "-" + this.month + "-" + this.data
          this.etTile = this.years + "-" + this.months + "-" + this.datas
      }else if(index==2){
       let clicktime = this.currentime-604800
       let clicktimes=new Date(parseInt(clicktime) * 1000)
        this.year = (clicktimes.getFullYear()).toString(); //年
        this.month =(clicktimes.getMonth()+1).toString(); //月
        this.data = (clicktimes.getDate()).toString(); //日
       //如果日或者月不满十位数，前面补0
        if(this.data.length<2){
          this.data='0'+this.data;
        }
        if(this.month.length<2){
          this.month='0'+this.month;
        } 
        this.stTile = this.year + "-" + this.month + "-" + this.data
        this.etTile = this.years + "-" + this.months + "-" + this.datas
      }else{
       let clicktime = this.currentime-2592000
       let clicktimes=new Date(parseInt(clicktime) * 1000)
        this.year = (clicktimes.getFullYear()).toString(); //年
        this.month =(clicktimes.getMonth()+1).toString(); //月
        this.data = (clicktimes.getDate()).toString(); //日
       //如果日或者月不满十位数，前面补0
        if(this.data.length<2){
          this.data='0'+this.data;
        }
        if(this.month.length<2){
          this.month='0'+this.month;
        } 
        this.stTile = this.year + "-" + this.month + "-" + this.data
        this.etTile = this.years + "-" + this.months + "-" + this.datas
      } 
    },
  }, 
  mounted() {
    this.orderCheck();
  }, 
};
</script>
<style>
  .statements {
    background-color: #f4f4f4;
    max-width: 750px;
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
    padding-bottom: 60px;
  }
  .statements .searchItem {
    margin-bottom: 10px;
    background-color: #FFF;
  }
  .statements .searchBtn {
    margin-top: 10px;
    width: 94%;
    color: #FFF;
    height:80px;
    border: none;
    font-size: 28px;
    margin: 20px 3% 0;
    line-height: 42px;
    border-radius: 3px;
    background: #9e2026;
    text-align: center;
  }
.orderSearchMain .searchItem .searchTime {
    height: 70px;
    line-height: 70px;
    padding: 30px 0 30px 30px;
    /*position: absolute;*/
    /*margin-left: 100px;*/
}

.statements .searchItem .searchTime i {
    float: left;
    padding: 0 20px;
    font-size: 28px;
    color: #666;
}
.statements .searchItem .numInput {
    border-bottom: 2px solid #d2d2d2;
    float: left;
    width: 80px;
    height: 70px;
    line-height: 70px;
    font-size: 28px;
    color: #333;
    text-align: center;
}
  .statements .orderSearchMain .searchItem .title {
    height: 78px;
    padding-left: 30px;
    font-size: 30px;
    line-height: 78px;
    color: #333;
  }
 .statements .orderSearchMain .iconfont{
    position: relative;
    display: inline-block;
    width: 2em;
    height: 2em;
    line-height: 2em;
    vertical-align: middle;
    float: right;
    color: #999;
  }
.orderSearchMain .searchItem .timeShortcut {
    height: 90px;
    margin-left: 30px;
    margin-top: 25px;
}
.orderSearchMain .searchItem .timeShortcut .shortcutBtn {
    float: left;
    cursor: pointer;
    text-align: center;
    margin-right: 50px;
    border-radius: 2px;
    border: 1px solid #aaaaaa;
    border-radius: 5px;
    width: 120px;
    height: 66px;
    line-height: 66px;
}
.orderSearchMain .searchItem .timeShortcut .shortcutBtn.selected {
    color: #f26521;
    border: 1px solid #f26521;
}

  /*搜索列表样式*/
  .statements .orderList{
    background-color: #fff;
  }
  .statements .orderList .orderListime{
    padding-left: 30px;
    height: 76px;
    line-height: 76px;
    font-size: 24px;
    color: #999;
    background-color: #f4f4f4;
  }
  .statements .orderList .orderListitle{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .statements .orderList .orderListitle > div {
    width: 33.3%;
    float: left;
    font-size: 28px;
    color: #333;
  }
  .statements .orderList .orderLisdata{
    width: 100%;
  }
  .statements .orderList .orderLisdata .income ,.statements .orderList .orderLisdata .spending{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .statements .orderList .orderLisdata .income > div,.statements .orderList .orderLisdata .spending > div{
    width: 33.3%;
    float: left;
    font-size: 28px;
    color: #666;
  }

  /*弹窗样式*/
  .statements .weui-mask{
      background: rgba(0, 0, 0, 0.4);
  }
  .statements .weui-actionsheet__cell{
    height: 110px;
    line-height: 110px;
    padding:0;
    color: #333;
    font-size: 30px;
  }
  .statements  .weui-actionsheet__action{
    margin-top: 11px;
  }
 .dp-container .dp-header{
    line-height: 70px;
    height: 70px;
    border-bottom: 1px solid #d0d0d0;
  }
  .dp-container  .dp-header .dp-item{
     font-size: 32px;
  }
  .dp-content .scroller-component{
    height:4.3rem;
  }
  .dp-content .dp-item .scroller-indicator{
    width: 100%;
    height: 100px;
    position: absolute;
    left: 0;
    top: 1.36rem;
    z-index: 3;
  }
  .dp-content .dp-item .scroller-item{
    height: 100px;
    line-height: 100px;
    font-size: 30px;
  }
  .statements .vux-no-group-title{
    margin:0;
    padding-left: 30px;
    box-sizing: border-box;
    height: 100px;
    line-height: 100px;
    font-size: 28px;
    overflow: inherit;
    position: relative;
  }
  .statements .weui-cell{
    padding:0;
    width: 100%;
  }
  .statements  .weui-cells:before{
    display: none;
  }
  .weui-cell_access p{
    color: #333;
    font-size: 28px;
  }
  .statements  .weui-cell__ft{
    text-align: center;
  }
  .statements .weui-cell_access .weui-cell__ft:after{
    display: none;
  }
  .statements .weui-cells:after{
    display: none;
  }
  .statements .weui-cell__ft {
    text-align: left;
    margin-left: 30px;
  }
  .dp-container .dp-header .dp-item.dp-right{
    color: #9e2026;
  }

</style>	
