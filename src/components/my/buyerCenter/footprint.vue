<template>
	<div class="app-containerfoot">
	
		<ul class="nav">              
			<li @click="join(0)" :class="{'actives':navFlag == 0}">
				<span>参拍拍品</span>
			</li>
			<li @click="watch(1)" :class="{'actives':navFlag == 1}">
				<span>围观拍品</span>
			</li>
			<li @click="footerFocus(2)" :class="{'actives':navFlag == 2}">
				<span>关注店铺</span>
			</li>
			<li class="zujiClass" @click="footer(3)" :class="{'actives':navFlag== 3}">
				<i class="iconfont icon-zuji"></i>
				<span>足迹</span>
			</li>
		</ul>
		<!--参拍拍品-->
		<ul class="list" v-if="navFlag == '0'" id="join">
		
			<li v-for="(e, $index) in joinList">
			<router-link :to="{name: 'auction', params: {id:e.uri}}">
					<div class="list-img" v-bind:style="{backgroundImage:'url(' +e.cover +')'}"></div>
					<p class="title">{{e.desc}}</p>
					<p class="list-info">
						<span>￥{{e.price}}起</span>
						<span>{{e.viewnum}}</span>
						<i class="iconfont icon-huo"></i>
					</p>
			</router-link>
			</li>
		</ul>
		<!--围观拍品-->
		<ul class="list" v-if="navFlag == '1'">
		
			<li v-for="e in likeList">
				<router-link :to="{name: 'auction', params: {id:e.uri}}">
					<div class="list-img" v-bind:style="{backgroundImage: 'url(' + e.cover + ')'}"></div>
					<p class="title">{{e.desc}}</p>
					<p class="list-info">
						<span>￥{{e.price}}起</span>
						<span>{{e.viewnum}}</span>
						<i class="iconfont icon-huo"></i>
					</p>
				</router-link>
			</li>
		</ul>
		<!--关注店铺-->
		<ul class="focus" v-if="navFlag == '2'">
		
			<li v-for="e in focusList">
				<router-link :to="'/storeHome/'+e.sellerId">
					<img :src="e.headimgurl" />
					<h3>{{e.nickname}}</h3>
					<p><span></span>评分:{{e.points}}</p>
				</router-link>
			</li>
		</ul>
		<!--足迹-->
		<ul class="list" v-if="navFlag == '3'">
		
			<li v-for="e in footers">
				<router-link :to="{path:'/goodsDetails',query: {auctionId: e.uri}}">
					<div class="list-img" v-bind:style="{backgroundImage: 'url(' + e.cover + ')'}"></div>
					<p class="title">{{e.desc}}</p>
					<p class="list-info">
						<span>￥{{e.price}}起</span>
						<span>{{e.viewnum}}</span>
						<i class="iconfont icon-huo"></i>
					</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
import { join, watch, footer, footerFocus } from "../../../api/api";
export default {
  data() {
    return {
      // 导航开关
      navFlag: 0,
      // 参拍拍品信息
      joinList: [],
      // 围观拍品信息
      likeList: [],
      // 关注店铺信息
      focusList: [],
      // 足迹信息
      footers: [],
      // 参拍拍品页数
      nums: [
        {
          page: 1,
          num: 10
        },
        {
          page: 1,
          num: 10
        },
        {
          page: 1,
          num: 10
        },
        {
          page: 1,
          num: 10
        }
      ]
    };
  },
  methods: {
    // 获取参拍拍品信息
    join(i) {
      let _this = this;
      this.navFlag = i;
      _this.nums[0].page = 1;
      let params = {
        page: _this.nums[0].page,
        pagenum: "10"
      };
      join(params)
        .then(function(res) {
          console.log(res.data);
          _this.joinList = res.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 获取围观拍品信息
    watch(i) {
      let _this = this;
      this.navFlag = i;
      _this.nums[1].page = 1;
      let params = {
        page: _this.nums[1].page,
        pagenum: "10"
      };
      watch(params)
        .then(function(res) {
          if (res.code == "200") {
            _this.likeList = res.data;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 获取关注店铺信息
    footerFocus(i) {
      let _this = this;
      this.navFlag = i;
      let params = {
        page: "1",
        pagenum: "10"
      };
      footerFocus(params)
        .then(function(res) {
          _this.focusList = res.data.list;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 获取足迹信息
    // 足迹接口未出，暂时请求参拍拍品的接口，后期更换
    footer(i) {
      let _this = this;
      this.navFlag = i;
      _this.nums[3].page = 1;
      let params = {
        page: _this.nums[3].page,
        pagenum: "10"
      };
      footer(params)
        .then(function(res) {
          _this.footers = res.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 滚动获取获取参拍拍品信息
    scrollJoin: function() {
      let _this = this;
      if (
        document.documentElement.scrollTop + window.innerHeight >=
        document.body.offsetHeight * 0.9
      ) {
        if (_this.nums[0].num < 10) {
          // 当前一次请求返回的数据小于规定的一次返回10条，
          return;
        }
        _this.nums[0].page++; // 页数相加
        let params = {
          page: _this.nums[0].page,
          pagenum: "10"
        };
        join(params)
          .then(function(res) {
            if (res.code == "200") {
              /*
							 * 1.将获取的下一页的数据保存到数组list里面
							 * 2.循环list
							 * 3.把list里面的每个对象push到data的joinList里面
							 * 
							 * */
              let list = res.data;
              _this.nums[0].num = list.length; // 当前请求的数据条目数量
              list.forEach(function(val, i) {
                _this.joinList.push(val);
              });
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    // // 滚动获取围观拍品信息
    scrollLike: function() {
      let _this = this;
      if (
        document.documentElement.scrollTop + window.innerHeight >=
        document.body.offsetHeight
      ) {
        if (_this.nums[1].num < 10) {
          // 当前一次请求返回的数据小于规定的一次返回10条，
          return;
        }

        _this.nums[1].page++; // 页数相加
        let params = {
          page: _this.nums[1].page,
          pagenum: "10"
        };
        watch(params)
          .then(function(res) {
            if (res.code == "200") {
              /*
							 * 1.将获取的下一页的数据保存到数组list里面
							 * 2.循环list
							 * 3.把list里面的每个对象push到data的joinList里面
							 * 
							 * */
              let list = res.data;
              _this.nums[1].num = list.length; // 当前请求的数据条目数量
              list.forEach(function(val, i) {
                _this.likeList.push(val);
              });
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    //获取足迹
    scrollfooter: function() {
      let _this = this;
      if (
        document.documentElement.scrollTop + window.innerHeight >=
        document.body.offsetHeight
      ) {
        if (_this.nums[3].num < 10) {
          // 当前一次请求返回的数据小于规定的一次返回10条，
          return;
        }

        _this.nums[3].page++; // 页数相加
        let params = {
          page: _this.nums[3].page,
          pagenum: "10"
        };
        footer(params)
          .then(function(res) {
            if (res.code == "200") {
              /*
							 * 1.将获取的下一页的数据保存到数组list里面
							 * 2.循环list
							 * 3.把list里面的每个对象push到data的joinList里面
							 * 
							 * */
              let list = res.data;
              _this.nums[3].num = list.length; // 当前请求的数据条目数量
              list.forEach(function(val, i) {
                _this.footers.push(val);
              });
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    let index = this.$route.query.index; //从买家中心进入的话直接切入到关注店铺tab
    if (index == "2") {
      this.footerFocus(index); // 如果检测到index=2
    } else if (index == "3") {
      this.footer(index);
    } else {
      this.join("0");
    }
  },
  created() {
    // 注册scroll事件并监听
    window.addEventListener("scroll", this.scrollJoin);
    window.addEventListener("scroll", this.scrollLike);
    window.addEventListener("scroll", this.scrollfooter);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollJoin);
    window.removeEventListener("scroll", this.scrollLike);
    window.removeEventListener("scroll", this.scrollfooter);
  }
};
</script>
<style lang="less" scoped>
/*
	 * @border-color: 统一边框颜色coupon
	 * */

@border-color: #d2d2d2;
.app-containerfoot {
  min-height: 1234px;
  background-color: #ededed;
  overflow: hidden;
}

.app-containerfoot .nav {
  height: 90px;
  background-color: #fff;
  margin-bottom: 20px;
  li {
    width: 25%;
    float: left;
    text-align: center;
    font-size: 28px;
    padding: 31px 0;
    box-sizing: border-box;
    position: relative;
    i {
      font-size: 44px;
      margin-right: 40%;
    }
  }
  li:nth-child(3) span {
    display: block;
    border-right: 1px solid @border-color;
  }
  li:nth-child(4) span {
    position: absolute;
    right: 50px;
  }
}

.app-containerfoot .list,
.app-containerfoot .focus {
  margin-bottom: 100px;
  float: left;
  width: 100%;
}

.app-containerfoot .list li {
  height: 540px;
  width: 49%;
  float: left;
  background-color: #fff;
  margin-bottom: 10px;
  .list-img {
    width: 100%;
    height: 428px;
    background-size: cover;
    background-position: center;
  }
  .title {
    height: 52px;
    line-height: 52px;
    padding: 0 23px;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
  }
  .list-info {
    padding: 0 23px;
    box-sizing: border-box;
    height: 60px;
    line-height: 60px;
    span:nth-of-type(2),
    i {
      float: right;
    }
  }
  &:nth-child(2n) {
    margin-left: 2%;
  }
}

.app-containerfoot .focus {
  padding: 0 18px;
  box-sizing: border-box;
  li {
    height: 260px;
    width: 32%;
    float: left;
    background-color: #fff;
    margin-right: 2%;
    margin-bottom: 20px;
    padding: 0 23px;
    box-sizing: border-box;
    border-radius: 5px;
    position: relative;
    img {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      position: absolute;
      left: 0;
      right: 0;
      top: 30px;
      margin: auto;
    }
    h3 {
      margin-top: 126px;
      line-height: 70px;
      border-bottom: 1px solid @border-color;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p {
      height: 64px;
      line-height: 64px;
      color: #999;
      text-align: left;
      span {
        display: block;
        height: 30px;
        width: 50px;
        margin: 17px 5px 0 5px;
        background-image: url(../../../assets/images/sellerLevels.png);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: left top;
        float: left;
      }
    }
  }
  li:nth-child(3n) {
    margin-right: 0;
  }
}
.actives,
.actives {
  color: #9e2026;
}
.icon-zuji {
  position: absolute;
  top: 18px;
  left: 20px;
}
.zujiClass {
  position: relative;
}
.icon-huo {
  color: #f15511;
  margin: 0;
}
</style>