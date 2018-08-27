<template>
	<div class="app-containerAllOrder">
					<div class="buyer-nav">
            <div class="menuItemClass">
            <div v-for="(list,index) in fivebtn" class="menuItem" :class="{ selected:nowindex == index}" :key="list.auction_id" @click="Red(index)">{{list.text}}
            </div>
            </div>
            <router-link class="search iconfont icon-sousuo" to="/search/seller">
            </router-link>
          </div>
          <router-view></router-view>
	</div>
</template>
<script>
export default {
  data () {
    return {
      nowindex: 0,
      fivebtn: [
        {
          'text': '全部',
          'type': '',
          'link': '/newSellerOrder/all'
        },
        {
          'text': '待付款',
          'type': 'daifukuan',
          'link': '/newSellerOrder/waitPay'
        },
        {
          'text': '待发货',
          'type': 'daifahuo',
          'link': '/newSellerOrder/waitSend'
        },
        {
          'text': '待收货',
          'type': 'yifahuo',
          'link': '/newSellerOrder/waitGet'
        }
      ]
    }
  },
  watch: {
    $route (newv, old) {
      if (newv.fullPath == '/newSellerOrder/waitGet') {
        this.nowindex = 3
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.name == 'all') {
        vm.nowindex = 0
      }
      if (vm.$route.name == 'waitPay') {
        vm.nowindex = 1
      }
      if (vm.$route.name == 'waitSend') {
        vm.nowindex = 2
      }
      if (vm.$route.name == 'waitGet') {
        vm.nowindex = 3
      }
      if (vm.$route.name == 'serchOrder') {
        vm.nowindex = 5
      }
    })
  },
  methods: {
    Red (index) {
      this.nowindex = index
      this.$router.push(this.fivebtn[index].link)
    }
  },
  mounted () {
    if (this.$route.name == 'all') {
      this.nowindex = 0
    }
    if (this.$route.name == 'waitPay') {
      this.nowindex = 1
    }
    if (this.$route.name == 'waitSend') {
      this.nowindex = 2
    }
    if (this.$route.name == 'waitGet') {
      this.nowindex = 3
    }
    if (this.$route.name == 'serchOrder') {
      this.nowindex = 5
    }
  }
}
</script>

<style lang="less" scoped>
  .app-containerAllOrder {
    min-height: 1234px;
    background-color: #f4f4f4;
    overflow: hidden;
  }

  .app-containerAllOrder .buyer-nav {
    width: 100%;
    height: 78px;
    margin-bottom: 11px;
    background-color: #fff;
    padding: 0 30px;
    box-sizing: border-box;
    position: relative;
    a {
      display: inline-table;
      line-height: 78px;
      font-size: 60px;
      padding: 0 30px;
      box-sizing: border-box;
      color: #999;
    }
    a.search {
      display: inline-block;
      height: 48px;
      line-height: 48px;
      border-left: 4px solid #e5e5e5;
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 36px;
    }
    a.selected {
      border-bottom: 4px solid #9e2026;
      color: #9e2026;
      font-weight : 700;
    }
  }
  .buyerToolbac {
    width:40px;
    margin-top:18px;
    height:40px;
  }
  .app-containerAllOrder .buyer-list {
    li {
      margin-top: 10px;
      background-color: #fff;
      .buyer-tool {
        height: 76px;
        line-height: 76px;
        padding: 0 30px;
        box-sizing: border-box;
        position: relative;
        a {
          margin-left: 50px;
          display: inline-block;
          line-height: 76px;
          float: left;
          position: relative;
          padding-right: 40px;
          i {
            margin: 0;
            font-size: 21px;
          }
        }
        button,
        i {
          float: right;
        }
        i {
          font-size: 32px;
          margin: 0;
        }
        .op {
          padding: 0 20px;
          color: #999999;
        }
        button {
          outline: none;
          border: none;
          background-color: #fff;
          color: #f15511;
          border-left: 1px solid #e5e5e5;
          /*margin-top: 19px;*/
        }
      }
      .buy-info {
        height: 220px;
        background-color: #f7f7f7;
        padding: 27px 30px;
        box-sizing: border-box;
        position: relative;
        .goods-info {
          height: 166px;
          width: 166px;
          float: left;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          margin-right: 20px;
        }
        .goods-intr {
          float: left;
          height: 60px;
          line-height: 30px;
          margin-bottom: 10px;
          word-break: break-all;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
         /* overflow: hidden;*/
          display: -webkit-box;
          -webkit-box-orient: vertical;
          color: #333;
        }
        .buyer-detail {
          float: left;
          width: 70%;
          position: absolute;
          bottom:27px;
          left:213px;
        }
        .buyer-detail li {
          height: 25px;
          line-height: 25px;
          background-color: transparent;
          padding: 0;
          color: #999;
        }
      }
      .buyer-btn {
        min-height: 90px;
        overflow: hidden;
        padding: 20px 30px;
        box-sizing: border-box;
        button {
          float: right;
          outline: none;
          padding: 0 20px;
          box-sizing: border-box;
          height: 50px;
          line-height: 50px;
          margin-left: 10px;
          background-color: transparent;
          border-radius: 5px;
          margin-top: 10px;
          font-size: 28px;
        }
      }
    }
  }

  .no-info {
    height: 375px;
    width: 277px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 324px;
    .icon {
      width: 277px;
      height: 277px;
      border-radius: 50%;
      background-color: #e1e1e1;
      i {
        line-height: 277px;
        text-align: center;
        font-size: 188px;
        color: #fff;
      }
    }
    p {
      text-align: center;
    }
    p:nth-of-type(1) {
      margin-top: 25px;
      color: #666;
      font-size: 28px;
    }
    p:nth-of-type(2) {
      color: #999;
      font-size: 24px;
    }
  }
  .sharesomething{
    position: fixed;
    left:0;
    bottom: 0;
    z-index: 1100;
    width: 100%;
    height:200px;
    background: white;
    text-align: center;
  }
  .sharesomething div{
    height: 90px;
    line-height: 90px;
    font-size: 30px
  }
  .bordertop{
    border-top: 10px solid #e5e5e5
  }
  .telsharesomething div{
    height: 90px;
    line-height: 90px;
    font-size: 30px
  }
  .telsharesomething{
    position: fixed;
    left:16%;
    top:45%;
    z-index: 1100;
    width: 70%;
    height:200px;
    background: white;
    text-align: center;
    border-radius: 20px
  }
  .menuItemClass{
    width: 88%;
    height: 74px;
    display: flex;
    justify-content: space-between;
  }
  .menuItem {
    font-size: 30px;
    text-align: center;
    padding:0 16px;
    height: 74px;
    line-height: 74px;
    color: #999999
  }
  .selected {
    font-size: 30px;
    color: #9e2026;
      font-weight : 700;
    border-bottom:4px solid #9e2026;
	}
	.buyer-status{
		height: 30px;
		padding-left: 18px;
		color: #f15511;
		font-size: 24px;
		margin-top: 24px;
		line-height: 30px;
	}
	.icon-sousuo{
		margin: 0;
	}
	.unImpotant{
		border: 2px solid #999999;
        color: #999999;
	}
	.isImpotant{
		border: 2px solid #9e2026;
        color: #9e2026;
	}
	.fontTwoE{
		font-size:28px;

	}
	.nickname{
		font-size:28px;
		margin-left:10px;
	}
	.fontCol{
		color: #333;
	}
</style>
