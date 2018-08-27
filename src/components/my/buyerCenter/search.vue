<template>
	<div class="app-containerSearch">
		<form>
			<ul>
				<li class="titleSearch">根据拍品名称搜索</li>
				<li class="box">
					<input type="text" v-model="keyword" placeholder="输入拍品关键字" />
					<i class="iconfont icon-search"></i>
				</li>
			</ul>
			<ul>
				<li class="titleSearch">根据截拍时间搜索</li>
				<li class="op">
					<p class="time">
						<span>{{time.year}}</span>
						<span>年</span>
						<span>{{time.month}}</span>
						<span>月</span>
						<span>{{time.day}}</span>
						<span>日</span>
					</p>
					<p class="detail-time">
						<span v-for="(i, $index) in timeList" :key="i" :class="{'active': timeFlag == $index}" @click="swTimeFlag($index)">
							{{i}}
						</span>
					</p>
				</li>
			</ul>
			<ul>
				<li class="titleSearch">根据订单状态搜索</li>
				<li class="titleSearchBtn">
					<p @click="changeIndex(index)" :class="{active:nowindex==index}" v-for="(item,index) in orderstatus" :key="item">{{item.text}}</p>
				</li>
				<!-- <li class="titleSearch"></li> -->
			</ul>
			<div class="subSearch">
				<input type="submit" value="搜索" @click="searchTo">
			</div>
		</form>
	</div>
</template>

<script>
export default {
  data () {
    return {
      timeFlag: 0,
      timeList: ['今天', '近七天', '近30天', '全部'],
      time: {
        year: '0',
        month: '0',
        day: '0'
      },
      orderstatus: [
        {
          'text': '全部',
          'type': ''
        },
        {
          'text': '待付款',
          'type': 'daifukuan'
        },
        {
          'text': '待发货',
          'type': 'daifahuo'
        },
        {
          'text': '待收货',
          'type': 'yifahuo'
        }
      ],
      nowindex: 0,
      keyword: '',
      state: ''
    }
  },
  methods: {
    searchTo () {
      let params = {
        keyword: this.keyword,
        year: this.time.year,
        month: this.time.month,
        day: this.time.day,
        state: this.state,
        type: this.orderstatus[this.nowindex].type
      }
      localStorage.setItem('params', JSON.stringify(params))
      if (this.state == 'buyer') {
        // this.$router.push('/newBuyOrders/search-order-buyer')
        this.$router.push({name: 'search-order-buyer'})
      } else {
        // this.$router.push('/newSellerOrder/search-order-buyer')
        this.$router.push({name: 'search-order-seller'})
      }
    },
    changeIndex (index) {
      this.nowindex = index
    },
    getNowTime: function () {
      let _this = this
      let now = +new Date()
      let timeArr = _this.timestampToTimeYMD(now / 1000).split('.')
      _this.time.year = timeArr[0]
      _this.time.month = timeArr[1]
      _this.time.day = timeArr[2]
    },
    swTimeFlag: function (i) {
      let _this = this
      _this.timeFlag = i // active依据下标切换
      _this.getNowTime() // 时间切换时重新获取当前的时间
      if (i == '1') {
        _this.time.day = parseFloat(_this.time.day) + 7
        if (_this.time.day < 10) {
          _this.time.day = '0' + _this.time.day
        }
      } else if (i == '2') {
        _this.time.month = parseFloat(_this.time.month) + 1
        if (_this.time.month < 10) {
          _this.time.month = '0' + _this.time.month
        }
      } else if (i == '3') {
        _this.time.year = '0000'
        _this.time.month = '00'
        _this.time.day = '00'
      }
    }
  },
  mounted () {
    this.state = this.$route.params.type
    this.getNowTime()
  }
}
</script>

<style lang="less" scoped>
	/*
	* @border-color: 统一边框颜色
	* */

	@border-color: #e5e5e5;
	.app-containerSearch {
		min-height: 1234px;
		background-color: #f4f4f4;
	}

	.iconfont{
		font-size: 24px;
		line-height:30px;
		margin: 0
	}

	.app-containerSearch form {
		margin-bottom: 100px;
	}

	.app-containerSearch form ul {
		margin-bottom: 20px;
		background-color: #fff;
	}

	form ul li {
		border-top: 1px solid @border-color;
		padding: 0 30px;
	}

	li:nth-last-of-type(1) {
		border-bottom: 1px solid @border-color;
	}
    .titleSearchBtn{
		height: 200px;
		line-height: 100px;
		font-size: 28px;
		color: #333333;
		p{
			height: 50%;
			width: 50%;
			float: left;
			text-align: center;
			box-sizing: border-box;
			color: #666;
			font-size: 28px;
			/*border: 1px solid #333333;*/
		}
		p.active{
			color: #f15511;
		}
    }
    .titleSearchBtn p:nth-child(1){
		border-right:1px solid #edece9;
		border-bottom:1px solid #edece9;
    }
    .titleSearchBtn p:nth-child(2){
		border-bottom:1px solid #edece9;
    }
    .titleSearchBtn p:nth-child(3){
		border-right:1px solid #edece9;
    }
	.titleSearch {
		height: 100px;
		line-height: 100px;
		font-size: 28px;
		color: #333333;
	}

	form ul:nth-last-of-type(odd) .titleSearch p:nth-child(odd){
		border-right: 1px solid @border-color;

	}
	.box{
		height: 148px;
		padding: 34px 30px;
		box-sizing: border-box;
		position: relative;
		input{
			display: block;
			height: 100%;
			width: 100%;
			outline: none;
			border: none;
			font-size: 28px;
			background-color: #eeeeee;
			-webkit-tap-highlight-color:transparent;  /*input点击时闪现的背景*/
			border-radius: 10px;
			text-indent: 70px;
			color: #999;
		}
		i{
			display: block;
			font-size: 28px;
			position: absolute;
			top: 60px;
			left: 60px;
		}
	}
	.op{
		height: 250px;
		padding: 38px 30px 42px 30px;
		box-sizing: border-box;
		.time{
			height: 80px;
			line-height: 80px;
			span{
				display: inline-block;
				float: left;
				font-size: 28px;
				height: 100%;
				text-align: center;
			}
			span:nth-child(odd){
				width: 120px;
				color: #333;
				background-color: #eeeeee;
				border-radius: 5px;
			}
			span:nth-child(even){
				width: 70px;
				color: #666;
			}
		}
		.detail-time{
			height: 58px;
			margin-top: 32px;
			span{
				float: left;
				display: inline-block;
				height: 58px;
				padding: 0 32px;
				line-height: 58px;
				color: #666;
				border: 2px solid #999;
				margin-right: 20px;
				border-radius: 4px;
			}
			span.active{
				color: #f15511;
				border: 2px solid #f15511;
			}
		}
	}
	.subSearch{
		width: 100%;
		padding: 0 30px;
		box-sizing: border-box;
		margin-top: 10 0px;
		text-align: center;
		input{
			display: block;
			height: 88px;
			width: 100%;
			outline: none;
			border: none;
			background-color: #9e2026;
			-webkit-appearance: none;  /*input submit时背景颜色兼容问题*/
			border-radius: 5px;
			color: #fff;
			font-size: 30px;
			text-align: center;
		}
	}
</style>
