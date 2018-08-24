<template>
	<div class="app-containertouch" ref="banctn">
		<ul v-if="nomsg">
			<li v-for="(e, i) in info" @click="changeDetail(i)" style="position:relative;" :key="e.id">
				<div class="left">
					<p class="titletouch">{{e.reason}}</p>
					<p class="time">
						<!--支付类型后期需要修改-->
						<span>支付类型：{{e.pos}}</span>
						<span>{{timestampToTime(e.addTime)}}</span>
					</p>
				</div>
				<div class="right" :class="{up: e.type == 0, down: e.type == 1}">
					<span v-if="e.type == 0">+</span>
					<span v-if="e.type == 1">-</span>
					<span>{{e.price}}</span>
				</div>
				<div v-if="e.reason == '提现'" style="font-size:12px;color:#999;position:absolute;right:15px;bottom:10px;">提现中</div>
			 </li>
			 <div v-if="nomsg" class="balance">余额<span>{{price}}</span></div>
		</ul>
		
		<div v-else style="text-align: center;margin-top: 200px;padding-bottom: 280px">
			<img src="../../assets/images/fenleinopaipin.png" alt="">
			<div style="color: #999999">暂无相关数据</div>
		</div>
	</div>

</template>

<script>
import { walletDetail } from "../../api/api";
// 加载更多后期做
export default {
  data() {
    return {
      info: [],
      price: "0",
      page: 0,
      nomsg: true,
      id: ""
    };
  },
  created() {
    window.addEventListener("scroll", this.scrollHandler);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  methods: {
    changeDetail(i) {
      this.id = this.info[i].id;
      this.$router.push("/looseChange/" + this.id);
    },
    //注册scroll事件并监听
    scrollHandler() {
      const st = document.documentElement.scrollTop || document.body.scrollTop;
      const ch = this.$refs.banctn.clientHeight;
      if (st + window.innerHeight >= ch) {
        this.walletDetail();
      }
    },
    walletDetail() {
      this.page += 1; // 缓存指针
      let params = {
        page: this.page,
        pagenum: 15
      };
      walletDetail(params)
        .then(res => {
					this.info = this.info.concat(res.data.list);
          if (this.info.length == 0) {
            this.nomsg = false;
          } else {
            this.nomsg = true;
          }
          this.price = "￥" + res.data.price;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.walletDetail();
  }
};
</script>

<style lang="less" scoped>
/*
	 * @border-color: 统一边框颜色
	 * */

@border-color: #e5e5e5;
.app-containertouch {
  /*min-height: 1234px;*/
  background-color: #f4f4f4;
  padding-top: 30px;
  /*margin-bottom: 200px;*/
  box-sizing: border-box;
  position: relative;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.app-containertouchNext {
  min-height: 1234px;
}
.app-containertouch .balance {
  height: 100px;
  width: 750px;
  line-height: 100px;
  text-align: center;
  background-color: #e4e4e4;
  color: #666;
  font-size: 30px;
  position: fixed;
  bottom: 100px;
  span {
    margin-left: 10px;
    color: #9e2026;
    font-size: 32px;
  }
}

.app-containertouch ul {
  overflow: hidden;
  background-color: #fff;
}

.app-containertouch ul li {
  height: 140px;
  border-top: 1px solid @border-color;
  padding: 0 30px;
  box-sizing: border-box;
  .left,
  .right {
    height: 100%;
  }
  .left {
    width: 60%;
    float: left;
    .titletouch {
      line-height: 3;
      width: 100%;
      font-size: 28px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .time {
      font-size: 24px;
      color: #999;
    }
  }
  .right {
    line-height: 140px;
    text-align: right;
    width: 40%;
    float: right;
    font-size: 36px;
  }
  .right.up {
    color: #06bc07;
  }
  .right.down {
    color: #f19333;
  }
}

.app-containertouch ul li:nth-last-of-type(1) {
  border-bottom: 1px solid @border-color;
}
img {
	width : 606px;
	height : 197px;
}
</style>