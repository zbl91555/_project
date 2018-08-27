<template>
	<div class="footer">
		<ul class="list" ref="ctn">
			<li v-for="e in footers" :key="e.uri">
				<router-link :to="'/auction/'+e.uri">
					<div class="list-img" v-bind:style="{backgroundImage: 'url(' + e.cover + ')'}"></div>
					<p class="title">{{e.desc}}</p>
					<p class="list-info">
						<span v-if="e.nowPrice > '0'">￥{{e.nowPrice}}</span>
						<span v-else>￥{{e.price}}起</span>
						<span>{{e.viewnum}}</span>
						<i class="iconfont icon-huo"></i>
					</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
import { footer } from '../../../api/api'
export default {
  data () {
    return {
      footers: [], // 渲染数据
      page: 0,
      num: 10,
      flag: false // 节流阀
    }
  },
  props: ['value'],
  methods: {
    footer () {
      if (this.flag) {
        return
      };
      this.flag = true
      this.page += 1
      let params = {
        page: this.page,
        pagenum: '10'
      }
      footer(params)
        .then(res => {
          this.footers = this.footers.concat(res.data)
          this.num = res.data.length
          this.flag = false
        })
        .catch(err => {
          console.log(err)
          if (this.footers.length == 0) {
            this.$emit('input', true)
          };
        })
    },
    scrollfooter () {
      const st = document.documentElement.scrollTop || document.body.scrollTop
      const ch = this.$refs.ctn.clientHeight
      if (st + window.innerHeight >= ch * 0.5) {
        this.footer()
      }
    }
  },
  mounted () {
    this.footer()
  },
  created () {
    // 注册scroll事件并监听
    window.addEventListener('scroll', this.scrollfooter)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollfooter)
  }
}
</script>
<style lang="less" scoped>
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
