   <template>
  <div class="addressInformation">
  <div class="manage">
     <i class="icon-xiaofeimingxidan iconfont"></i>
     <router-link :to="'/member/receiveAddress/user/pay/'+orderId"> 
     <i style="font-size:14px">管理</i>
     </router-link> 
  </div>
    <div class="addressMain">
        <div class="addersList" v-for = "(item,index) in Address">
            <div class="address default" @click="routerLink(item)">
                <div class="userInfo">
                    <span>{{item.name}}</span>
                    <span>{{item.tele}}</span>
                </div>
                <div class="addressInfo">
                    {{item.province}}{{item.city}}{{item.country}}{{item.address}}</div>
            </div>
        </div>
        <div class="whiteBac" v-if="whichP == 'agreeReturnSale'">
            <router-link  :to="'/member/receiveAddress/addAddress/'+orderId+'/agreeReturnSale'">
                <div class="addNewAddress">
                        新增地址
                </div>
            </router-link>
        </div>
        <div class="whiteBac" v-if="whichP == 'payment'">
            <router-link  :to="'/member/receiveAddress/addAddress/'+orderId+'/payment'">
                <div class="addNewAddress">
                        新增地址
                </div>
            </router-link>
        </div>
    </div>
  </div>
</template>
<script>
import { addressList } from "../../api/api";
export default {
  props: ["orderId", "whichP", "value"],
  data() {
    return {
      Address: [],
      type: "order",
      id: ""
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "payNow") {
      this.$emit("input", true);
    }
    next();
  },
  methods: {
    routerLink(item) {
      sessionStorage.setItem('address',JSON.stringify(item));
      this.$router.push('/payment?order_id=' + sessionStorage.getItem('order_id') + '&address=1');
    },
    addressList() {
      let _this = this;
      let params = {
        type: "user"
      };
      addressList(params)
        .then(function(response) {
          _this.Address = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.$emit("input", false);
    this.addressList();
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
  }
};
</script>
<style scoped>
.addressInformation {
  background-color: #ededef;
  max-width: 750px;
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: 150px;
}
.addressInformation .addressMain {
  /* float: left;*/
  width: 100%;
  margin-top: 20px;
}

.addressInformation .addressMain .address {
  padding: 40px 30px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  overflow: hidden;
  color: #333;
  position: relative;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
}

.addressInformation .addressMain .newAddress:last-child {
  border-bottom: none;
  padding: 40px 0 40px 30px;
  margin-top: 20px;
}
.addressInformation .addressMain .address .selected {
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

.addressInformation .addressMain .address.default .selected {
  display: flex;
  display: -webkit-flex;
}

.addressInformation .addressMain .address .userInfo {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 30px;
  color: #333;
}

.addressInformation .addressMain .address .userInfo span {
  float: left;
}

.addressInformation .addressMain .address .userInfo span:first-child {
  width: 140px;
  height: 30px;
  overflow: hidden;
}
.addressInformation .addressMain .address .userInfo span:nth-child(2) {
  float: right;
}

.addressInformation .addressMain .address .addressInfo {
  width: 70%;
  line-height: 31px;
  font-size: 24px;
  color: #333;
  margin-top: 20px;
}
.addressInformation .addressMain .newAddress .addIcon {
  position: absolute;
  left: 30px;
  font-size: 24px;
  line-height: 21px;
}

.addressInformation .addressMain .newAddress .addAddresss {
  line-height: 30px;
}

.addressInformation .addressMain .newAddress .arrow {
  position: absolute;
  top: 50%;
  right: 4%;
  height: 46px;
  color: #c8c8c8;
  margin-top: -23px;
  line-height: 46px;
}

.addressInformation .manageAddress {
  height: 60px;
  line-height: 60px;
  text-align: right;
  margin-right: 4%;
  clear: both;
  color: #888;
  font-size: 14px;
}

.addressInformation .icon-bianji1 {
  font-size: 30px;
  color: #333;
}
.addressInformation .icon-105 {
  font-size: 30px;
  color: #333;
}
.addressInformation .icon-tianjia {
  color: #f15511;
}
.addressInformation .selected {
  width: 0.8rem;
  height: 1.653333rem;
  line-height: 1.653333rem;
}

.addressInformation .selected .icon-chenggong {
  color: #9e2026;
}
.addressInformation .selecteded .icon-yuancircle46 {
  color: #999;
}
.manage {
  height: 80px;
  background: white;
  text-align: right;
  line-height: 80px;
  padding-right: 20px;
}
.manage i {
  line-height: 80px;
}
.icon-xiaofeimingxidan {
  margin: 0;
  font-size: 28px;
  color: #9e2026;
}
.addersList {
  margin-top: 10px;
}
.addNewAddress {
  width: 90%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin: 20px auto;
  background: #9e2026;
  color: white;
  border-radius: 10px;
  font-size: 28px;
}
.whiteBac {
  background: white;
  padding: 5px 0;
  margin-top: 20px;
}
</style>
