<template>
  <div class="addressInformation">

    <div class="addressMain">

        <div class="addersList" v-for = "(item,index) in Address" :key="item.id">
            <div class="address default" @click='changeTo(item.id)'>
            <!-- <div class="selected" v-show="item.is_default ==1">
                <i class="iconfont icon-chenggong"></i>
            </div>
            <div class="selected" v-show="item.is_default ==2">
                <i class="iconfont icon-yuancircle46"></i>
            </div> -->
                <div class="userInfo">
                    <span>{{item.name}}</span>
                    <span>{{item.tele}}</span>
                </div>
                <div class="addressInfo">
                    {{item.province}}{{item.city}}{{item.country}}{{item.address}}
                </div>
            </div>
            <div class="editorAddres">
             <div @click="defaults(item.id,index)">
                <div v-show="item.is_default ==true">
                    <i class="iconfont icon-chenggong"></i>
                    <span class="defaultSize">设为默认</span>
                </div>
                <div v-show="item.is_default ==false">
                    <i class="iconfont icon-yuancircle46"></i>
                    <span class="defaultSize">设为默认</span>
                </div>
             </div>
                <span @click="showalert(item.id)">  <!-- @click="delAdress(item.id)" -->
                    <i class="iconfont icon-105"></i>
                    删除
                </span>
                <router-link
                    :to="{
                    name: '编辑地址',
                    params: {
                        id: item.id,
                    }
                }">
                <span>
                    <i class="iconfont icon-bianji1"></i>
                    编辑
                </span>
                 </router-link>
            </div>
        </div>
        <div class="whiteBac">
            <router-link  to="/member/receiveAddress/addAddress">
                <div class="addNewAddress">
                        新增地址
                </div>
            </router-link>
        </div>
        <!-- <div class="newAddress">
            <div class="addIcon">
                <i class="iconfont icon-tianjia"></i>
            </div>
            <router-link  to="/member/receiveAddress/addAddress">
                <div class="addAddresss">
                    新增地址
                </div>
            </router-link>
            <div class="arrow">
                <i class="iconfont icon-fm-arrowright"></i>
            </div>
        </div> -->
        <!-- 是否弹出该店铺所有订单 -->
        <div id="fixednumMain" v-if="showlists">
            <div @click="closeshowlists()" class="fixednumMask" style="opacity: 0.38;">
            </div>
            <div class="sharesomething">
                <div style="color:red">确认删除地址吗？</div>
                <div @click="delAdress(selId)" style="border-top:1px solid #EEE;">确认</div>
                <div @click="closeshowlists()" style="border-top:1px solid #EEE;" class="bordertop">取消</div>
            </div>
        </div>
    </div>
     <toast v-model="showSuccess" :text="toastText" width="5rem" type="text"  :time="1000" is-show-mask></toast>
     <router-view></router-view>
  </div>
</template>
<script>
import { Toast } from 'vux'
import {addressList, updateView, delAddress, defaults} from '../../api/api'
import assign from '../../assets/js/assign.js'// 混入式方法
export default {
  components: {
    Toast
  },
  mixins: [assign],
  data () {
    return {
      Address: [],
      showAddress: false,
      showSuccess: false,
      toastText: '',
      order_id: '',
      showlists: false,
      selId: ''
    }
  },
  methods: {
    showalert (id) {
      this.showlists = true
      this.selId = id
    },
    closeshowlists () {
      this.showlists = false
    },
    addressList () {
      let type = this.$route.params.type
      let _this = this
      let params = {
        type: type
      }
      addressList(params).then((response) => {
        _this.Address = response.data
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    delAdress (id) {
      delAddress(id).then(res => {
        this.showlists = false
        this.showSuccess = true
        this.toastText = '删除成功'
        this.addressList()
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    defaults (id, index) {
      let type = this.$route.params.type
      defaults(id, type).then(res => {
        for (var i = 0; i < this.Address.length; i++) {
          this.Address[i].is_default = false
        }
        this.Address[index].is_default = true
        this.addressList()
      })
        .catch(err => {
          console.log(error)
          this.showSuccess = true
          this.toastText = '设置失败'
          this.addressList()
        })
    },
    changeTo (wich) {
      let type = this.$route.params.type
      let pay = this.$route.params.pay
      let id = this.$route.params.order_id
      if (type == 'seller') {
        this.$router.push('/sellerCenter/sellerSetting')
      } else {
        this.$router.push({name: '编辑地址', params: {id: wich}
        })
      }
      // if(type == 'user' && pay == 'pay'){
      //     this.$router.push('/payment/'+id+'/false'+'/true')
      // }else
    }
  },
  // beforeRouteEnter(to,from,next){
  //     next(vm => {
  //         vm.addressList()
  //     })
  // },
  mounted () {
    this.addressList()
  }
}
</script>
<style scoped>
.sharesomething{
    position: fixed;
    left:0;
    bottom: 0;
    z-index: 1100;
    width: 100%;
    height:300px;
    background: white;
    text-align: center;
  }
  .sharesomething div{
    height: 90px;
    line-height: 90px;
    font-size: 30px
  }
 .addressInformation{
    background-color: #ededef;
    max-width: 750px;
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
    padding-bottom:150px;
  }
.addressInformation .addressMain {
    width: 100%;
    padding-top: 20px;
}

    .addressInformation  .addressMain .address,
    .addressInformation  .addressMain .newAddress {
        padding: 40px 30px;
        border-bottom: 1px solid #EEE;
        background-color: #FFF;
        overflow: hidden;
        color: #333;
        position: relative;
        cursor: pointer;
        width: 100%;
        box-sizing: border-box;
    }
	.addressInformation  .addressMain .newAddress:last-child{
		border-bottom:none;
		padding: 40px 0 40px 30px;
		margin-top: 20px;
	}
    .addressInformation  .addressMain .address .selected {
        position: absolute;
        top: 70px;
        left: 4%;
        width: 41px;
        height: 41px;
        float: right;
        display: none;
        align-items: center;
        -webkit-align-items: center;
    }

    .addressInformation  .addressMain .address.default .selected {
        display: flex;
        display: -webkit-flex;
    }

    .addressInformation  .addressMain .address .userInfo {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 30px;
        color: #333;
    }

    .addressInformation  .addressMain .address .userInfo span {
        float: left;
    }

    .addressInformation  .addressMain .address .userInfo span:first-child {
        width: 250px;
        height: 30px;
        overflow: hidden;
    }
    .addressInformation  .addressMain .address .userInfo span:nth-child(2){
        float: right;
    }

    .addressInformation  .addressMain .address .addressInfo {
        width: 70%;
        line-height: 31px;
        font-size: 24px;
        color: #333;
        margin-top: 20px;

    }
    .addressInformation .addressMain .newAddress .addIcon {
        position: absolute;
        left: 30px;
        top:45px;
        font-size: 24px;
        line-height: 21px;
    }

    .addressInformation .addressMain .newAddress .addAddresss{
        line-height: 30px;
        padding-left: 65px;
    }

    .addressInformation .addressMain .newAddress .arrow {
        position: absolute;
        top: 50%;
        right: 4%;
        height: 46px;
        color: #C8C8C8;
        margin-top: -23px;
        line-height: 46px;
    }

    .addressInformation  .manageAddress {
        height: 60px;
        line-height: 60px;
        text-align: right;
        margin-right: 4%;
        clear: both;
        color: #888;
        font-size: 14px;
    }
    .addressInformation .editorAddres{
        height: 80px;
        line-height:80px;
        background-color: #fff;
        font-size: 24px;
        position: relative;
        padding:0 20px;
    }
    .addressInformation .editorAddres div{
        float: left;
        height: 80px;
        line-height: 80px;
    }
    .addressInformation  .editorAddres span{
        float: right;
    }
    .addressInformation  .editorAddres span:first-child{
        margin-right: 46px;
     }
    .addressInformation .editorAddres span:last-child{
        margin-right: 30px;
    }
    .addressInformation  .icon-bianji1{
        font-size: 30px;
        color: #333;
    }
    .addressInformation  .icon-105{
        font-size: 30px;
        color: #333;
    }
   .addressInformation  .icon-tianjia{
        color: #f15511;
        font-size: 40px;
        margin: 0
    }
    .addressInformation  .selected {
        width: 0.8rem;
        height: 1.653333rem;
        line-height: 1.653333rem;
	}

    .addressInformation  .selected .icon-chenggong {
        color: #9e2026;
    }
    .addressInformation .selecteded .icon-yuancircle46{
        color: #999;
    }
    .editorAddres .icon-chenggong {
      color: #9e2026;
      margin: 0
    }
    .editorAddres .icon-yuancircle46 {
      margin: 0;
    }
    .defaultSize{
        font-size: 28px;
        line-height: 80px;
        height: 80px;
        display: inline-block;
        margin-left: 5px;
    }
    .icon-yuancircle46,.icon-chenggong{
        font-size:42px;
        line-height: 80px;
    }
    .whiteBac{
        background: white;
        padding: 5px 0;
        margin-top: 20px;
    }
    .addNewAddress{
        width: 90%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        margin: 20px auto;
        background: #9e2026;
        color: white;
        border-radius: 10px;
        font-size: 28px
    }
</style>
