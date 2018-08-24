<template>
  <div class="fans"  ref="ctn">
    <div class="friendsMain">
	    <div class="friend" v-for = "(item,index) in fansList" :key="item.uid">
	        <router-link :to="{path: '/member/fansDetails/'+item.uid}">
		    <div class="avatar" v-bind:style="{backgroundImage: 'url(' + item.avatar + ')'}"></div>
		    <div class="friendDetails">
		        <div class="nickname">
		            <span>{{item.nickname}}</span>
		        </div>
				<div class="signature">{{item.signature}}</div>
		        
		    </div>
    		</router-link>
    		<div class="attention" @click="focus(item.uid,item.guanzhu,index)">
			    <div class="status"  v-show="item.guanzhu == 0"> 
			       	<i class="iconfont icon-untitled44"></i>
			        <span>关注</span>
			    </div>
			    <div class="statuses" v-show="item.guanzhu == 1"> 
			        <span>已关注</span>
			    </div>
			</div>
    	</div>
    </div>
    <toast v-model="showSuccess" :text="toastText" type="text"  :time="1000" is-show-mask></toast>
  </div>
</template>
<script>
import { Toast } from "vux";
import { fanInfos, shopFocus, shopCancel } from "../../../api/api";
export default {
  components: {
    Toast
  },
  data() {
    return {
      fansList: [],
      pagenum: 10,
      page: 0,
      showSuccess: false,
      toastText: "",
      guanzhu: "",
      index: 0,
      falg: false, //关注限制
      dropDown: false //下拉限制
    };
  },
  created() {
    window.addEventListener("scroll", this.scrollHandler);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  methods: {
    //注册scroll事件并监听
    scrollHandler() {
      const st = document.documentElement.scrollTop || document.body.scrollTop;
      const ch = this.$refs.ctn.clientHeight;
      if (st + window.innerHeight >= ch) {
        this.fanInfos();
      }
    },
    fanInfos() {
      let _this = this;
      if (this.dropDown) {
        return;
      }
      this.dropDown = true;
      _this.page += 1;
      let params = {
        page: this.page,
        pagenum: this.pagenum
      };
      fanInfos(params)
        .then(response => {
          if (response.code == 200) {
            _this.fansList = _this.fansList.concat(response.data);
            this.dropDown = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //关注用户
    shopFocus(uid) {
      shopFocus(uid)
        .then(response => {
          if (response.code == 200) {
            this.showSuccess = true;
            this.toastText = "关注成功";
            this.fansList[this.index].guanzhu = 1;
            this.flag = false;
          }
        })
        .catch(function(error) {
          this.toastText = "未成功";
          this.flag = false;
        });
    },
    //取消关注
    shopCancel(uid) {
      shopCancel(uid)
        .then(res => {
          if (res.code == 200) {
            this.showSuccess = true;
            this.toastText = "取消关注成功";
            this.fansList[this.index].guanzhu = 0;
            this.flag = false;
          }
        })
        .catch(err => {
          this.toastText = "未成功";
          this.flag = false;
        });
    },
    focus(uid, guanzhu, index) {
      if (this.flag) {
        return false;
      }
      this.flag = true;
      this.index = index;
      if (guanzhu == 0) {
        this.shopFocus(uid);
      } else {
        this.shopCancel(uid);
      }
    }
  },
  mounted() {
    this.fanInfos();
  }
};
</script>
<style scoped>
.fans {
  max-width: 750px;
  background-color: #ededef;
  width: 100%;
  height: 100%;
}
.fans .friendsMain {
  width: 100%;
  display: table;
  padding-bottom: 1.333rem;
}
.fans .friendsMain .friend {
  position: relative;
  width: 100%;
  height: 150px;
  display: table;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
}
.fans .friendsMain .friend .avatar {
  float: left;
  width: 89px;
  height: 89px;
  margin: 30px;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  border-radius: 50px;
}
.friendsMain .friend .friendDetails {
  height: 150px;
  cursor: pointer;
  margin: 0 170px 0 140px;
}
.friendsMain .friend .attention .status.unsubscribe {
  color: #9f9f9f;
  border-color: #9f9f9f;
}
.friendsMain .friend .friendDetails .nickname {
  height: 26px;
  line-height: 26px;
  color: #333;
  padding-top: 38px;
  max-width: 250px;
  font-size: 28px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.friendsMain .friend .friendDetails .signature {
  height: 36px;
  line-height: 36px;
  font-size: 24px;
  max-width: 380px;
  color: #999;
  margin-top: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.friendsMain .friend .attention {
  position: absolute;
  width: 170px;
  height: 150px;
  top: 0px;
  right: 0;
}
.friendsMain .friend .attention .status {
  position: absolute;
  width: 180px;
  color: #f15511;
  padding: 0 20px;
  border: 2px solid #f15511;
  font-size: 42px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  margin: auto;
  cursor: pointer;
  border-radius: 4px;
  transform: scale(0.5);
  -webkit-transform: scale(0.5);
  transform-origin: 0 84%;
  -webkit-transform-origin: 0 84%;
}
.friendsMain .friend .attention .statuses {
  position: absolute;
  width: 180px;
  color: #999;
  padding: 0 20px;
  border: 2px solid #999;
  font-size: 42px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  margin: auto;
  cursor: pointer;
  border-radius: 4px;
  transform: scale(0.5);
  -webkit-transform: scale(0.5);
  transform-origin: 0 84%;
  -webkit-transform-origin: 0 84%;
}
.fans .friendsMain .icon-untitled44 {
  color: #f15511;
  font-size: 42px;
  margin: 0;
}
</style>
