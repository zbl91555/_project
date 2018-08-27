<template>
    <div class="bidConditions">
      <div class="back">
        <div class="backLeft">
          <a href="javascript:history.go(-1);">取消</a>
        </div>
        <div class="backRight">
          <a href="#" @click="bidSave()" id="save">保存</a>
        </div>
      </div>
      <div class="sellerInfoMain">
        <div class="uerInfoItem">
          <div class="discoverLeft">
            <span>违约率小于30%（2笔以上）</span>
          </div>
            <div class="switchBtn" @click="switchBtn()">
              <input type="checkbox" class="switch" :checked="check">
            </div>
        </div>
      </div>
    </div>
</template>
<script>
import {bidConditions, bidSave} from '../../../api/api'
export default {
  data () {
    return {
      store: [],
      check: false,
      checked: '',
      old: ''
    }
  },
  methods: {
    bidConditions () {
      let _this = this
      bidConditions().then(function (response) {
        if (response.code == 200) {
          if (response.data == '1') {
            _this.switchBtn()
            _this.check = true
          } else {
            _this.check = false
          }
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    switchBtn () {
      if (this.check == true) {
        this.check = false
        this.checked = 0
      } else {
        this.check = true
        this.checked = 1
      }
    },
    bidSave () {
      if (this.old == this.checked) {
        this.$router.push('/sellerCenter/sellerSetting')
      } else {
        let params = {
          is_weiyue: this.checked
        }
        bidSave(params).then(res => {
          if (res.code == 200) {
            this.$router.push('/sellerCenter/sellerSetting')
          }
        })
          .catch(err => {
            console.log(error)
          })
      }
    }
  },
  mounted () {
    this.old = this.$route.params.setting
    if (this.old == '未开启') {
      this.old = 0
    } else if (this.old == '已开启') {
      this.old = 1
    }
    this.bidConditions()
  }
}
</script>
<style scoped>
  .bidConditions {
    background-color: #ededef;
    max-width: 750px;
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
  }
  .back {
    height: 78px;
    line-height: 78px;
    padding-left: 30px;
    font-size: 28px;
    background: #fff;
  }
  .backLeft {
    width: 150px;
    height: 80px;
    float: left;
    color: #333;
  }
  .backRight {
    width: 150px;
    height: 78px;
    float: right;
    padding: 0 26px;
    text-shadow: 0px 0px 0px #FFF;
    text-align: right;
    cursor: pointer;
  }
  .backRight a {
      color: #9e2026;
  }
  .sellerInfoMain {
      width: 100%;
      display: table;
  }
  .uerInfoItem {
      height: 110px;
      line-height: 110px;
      margin-top: 20px;
      background: #fff;
  }
  .discoverLeft {
      width: 60%;
      height: 110px;
      float: left;
  }
  .uerInfoItem span {
      width: 400px;
      margin-left:30px;
      line-height: 110px;
      float: left;
      color: #333;
      font-size:28px;
  }
  input.switch:checked {
      background-color: #d32838;
      border: solid 1px #d32838;
  }
  input.switch:checked:before {
      -webkit-transform: scale(0);
      -ms-transform: scale(0);
      transform: scale(0);
  }
  input.switch:checked:after {
      -webkit-transform: translateX(40px);
      -ms-transform: translateX(40px);
      transform: translateX(40px);
  }
  .switchBtn {
    overflow: hidden;
    float: right;
    margin: 24px 3%;
  }
  input.switch {
        position: relative;
        width: 104px;
        height: 65px;
        outline: none;
        display: block;
        margin: 0;
        border-radius: 35px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: none;
        border: solid 2px #DFDFDF;
        background-color: #DFDFDF;
        cursor: pointer;
    }
    input.switch:before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100px;
        height: 60px;
        border-radius: 34px;
        background-color: #FFF;
        -webkit-transition: -webkit-transform 0.3s;
        transition: -webkit-transform 0.3s;
        -o-transition: transform 0.3s;
        transition: transform 0.3s;
        transition: transform 0.3s, -webkit-transform 0.3s;
    }
    input.switch:after {
        position: absolute;
        content: '';
        top: 1px;
        left: 0;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #FFF;
        -webkit-transition: -webkit-transform 0.3s;
        transition: -webkit-transform 0.3s;
        -o-transition: transform 0.3s;
        transition: transform 0.3s;
        transition: transform 0.3s, -webkit-transform 0.3s;
        -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    }

</style>
