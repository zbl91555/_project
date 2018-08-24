  <template>
  <div class="addAddress">
    <div class="manage"><i @click.stop="back" class="iconfont icon-zuojiantou"></i></div>
    <form id="J_login_form">
        <div class="login-frame">
            <ul>
                <li>
                    <p>
                        收件人
                    </p>
                    <input type="text" class="userName" name="userName" placeholder="名字" v-model="name"  ref="userName">
                    <div class="arrow">
                        <i class="iconfont icon-guanbi1" @click="clear1($event)"></i>
                    </div>
                </li>
                <li>
                    <p>
                        联系方式
                    </p>
                    <input type="tel" class="telNumber" name="telNumber" placeholder="11位手机号"  v-model="tele" ref="telNumber">
                    <div class="arrow">
                        <i class="iconfont icon-guanbi1" @click="clear2($event)" ></i>
                    </div>
                </li>
                <group label-width="5em" label-align="left" >
                  <x-address :title="title" v-model="addressValue"  raw-value :list="addressData" value-text-align="left" :value="getName(addressValue)"></x-address>
                </group>
                <li>
                    <p>
                        详细地址
                    </p>
                    <input type="text" class="address" name="address" placeholder="街道门牌信息" v-model="address"  ref="address">
                    <div class="arrow">
                        <i class="iconfont icon-guanbi1" @click="clear3($event)"></i>
                    </div>
                </li>
            </ul>
        </div> 
    </form>
    <div class="login-btn" @click="saveAdress()">
        <div class="icon-btn">保存</div>
    </div>
    <toast v-model="showSuccess" :text="toastText" width="5rem" type="text"  :time="1000" is-show-mask></toast>
  </div>
</template>
<script>
import {
  Group,
  XAddress,
  ChinaAddressV4Data,
  XButton,
  Cell,
  Value2nameFilter as value2name,
  Toast
} from "vux";
import { userAddress, handleAddressAdd } from "../../api/api";
import assign from "../../assets/js/assign.js"; //混入式方法
export default {
  components: {
    Group,
    XAddress,
    XButton,
    Cell,
    Toast
  },
  mixins: [assign],
  data() {
    return {
      addressList: [],
      id: "",
      city: "",
      name: "",
      tele: "",
      province: "",
      country: "",
      address: "",
      title: "选择地区",
      addressValue: [],
      addressData: ChinaAddressV4Data,
      showSuccess: false,
      toastText: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    userAddress() {
      let _this = this;
      userAddress()
        .then(res => {
          _this.name = res.data.name;
          _this.tele = res.data.tele;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    saveAdress() {
      let _this = this;
      if (!this.name) {
        _this.showSuccess = true;
        _this.toastText = "姓名不能为空";
        return false;
      }
      if (!this.tele) {
        _this.showSuccess = true;
        _this.toastText = "手机不能为空";
        return false;
      }
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!reg.test(this.tele)) {
        _this.showSuccess = true;
        _this.toastText = "手机号输入有误";
        return false;
      }
      if (!this.province || !this.city) {
        _this.showSuccess = true;
        _this.toastText = "地区不能为空";
        return false;
      }
      if (!this.address) {
        _this.showSuccess = true;
        _this.toastText = "详细地址不能为空";
        return false;
      }
      let params = {
        name: _this.name,
        tele: _this.tele,
        province: _this.province,
        city: _this.city,
        country: _this.country,
        address: _this.address
      };
      handleAddressAdd(params)
        .then(res => {
          let id = this.$route.params.order_id;
          if (this.$route.params.whichPage == "agreeReturnSale") {
            this.$router.push("/agreeReturnSale/" + id + "/false" + "/true");
          } else if (this.$route.params.whichPage == "payment") {
            this.$router.push({
              path: "/payment/addressInformation",
              query: { order_id: id, nowpage: "false", adresspage: "true" }
            });
          } else {
            this.$router.go(-1);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clear1(userName) {
      this.$refs.userName.value = "";
      this.name = "";
    },
    clear2(telNumber) {
      this.$refs.telNumber.value = "";
      this.tele = "";
    },
    clear3(address) {
      this.$refs.address.value = "";
      this.address = "";
    },
    doShowAddress() {
      this.showAddress = true;
      setTimeout(() => {
        this.showAddress = false;
      }, 2000);
    },
    onShadowChange(ids, names) {

    },

    getName(value) {
      let address = value2name(value, ChinaAddressV4Data);
      let addressArr = address.split(" ");
      this.province = addressArr[0];
      this.city = addressArr[1];
      this.country = addressArr[2];
      return value2name(value, ChinaAddressV4Data);
    },
    logHide(str) {
    },
    logShow(str) {
    }
  },
  mounted() {
    this.userAddress();
  }
};
</script>
<style>
.addAddress .manage {
  height: 1.066667rem;
  background: white;
  text-align: right;
  line-height: 1.066667rem;
  padding: 0 0.4rem;
}

.addAddress .manage i{
  float : left;
  line-height : 1.0666667rem;
  color : #c8c8c8;
  font-size : 0.5rem;
}
.addAddress .login-frame .weui-cells.vux-no-group-title {
  height: 110px;
  line-height: 110px;
  margin-left: 30px;
  margin-top: 0;
  font-size: 28px;
  padding-left: 0;
}
.addAddress .login-frame .weui-cells:before {
  display: none;
}
.addAddress .login-frame .weui-label {
  color: #666;
  margin-right: 8px;
}
.addAddress .login-frame .vux-popup-picker-value {
  color: #333;
}
.addAddress .login-frame .weui-cell {
  padding: 0;
}
.addAddress .login-frame .weui-cell_access .weui-cell__ft:after {
  display: none;
}
.vux-popup-picker-container .vux-popup-header.vux-1px-b {
  height: 80px;
  line-height: 80px;
  font-size: 28px;
}
.addAddress {
  background-color: #f4f4f4;
  max-width: 750px;
  position: relative;
  box-sizing: border-box;
  min-height: 100vh;
}
.addAddress #J_login_form {
  padding-top: 20px;
  border-bottom: 2px solid #e5e5e5;
}
.addAddress .login-frame {
  background-color: #fff;
}
.addAddress .login-frame li {
  position: relative;
  display: flex;
  height: 110px;
  line-height: 110px;
  margin-left: 30px;
  padding-right: 30px;
  border-bottom: 2px solid #e5e5e5;
}
.addAddress .login-frame li p {
  font-size: 28px;
  color: #666;
  width: 20%;
}
.addAddress .login-frame li input {
  float: left;
  border: none;
  height: 110px;
  outline: none;
  box-sizing: border-box;
  font-size: 28px;
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.addAddress .arrow {
  position: absolute;
  right: 4%;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.addAddress .arrow {
  color: #c8c8c8;
}
.addAddress .login-frame li:last-child {
  border-top: 2px solid #e5e5e5;
}
.addAddress .login-btn {
  padding: 0 30px;
}
.addAddress .login-btn .icon-btn {
  display: block;
  border: none;
  height: 82px;
  line-height: 82px;
  background: #9e2026;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  width: 100%;
  margin-top: 135px;
  outline: none;
  -webkit-appearance: none;
  font-size: 28px;
}
</style>
