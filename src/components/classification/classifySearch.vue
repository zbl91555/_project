<template>
<div class="classifySearch">
	<div class="serchHead">
    <div>
      <input @input.stop="getData" class="serchBox" type="text" v-model="keywords">
      <div class="iconfont icon-search"></div>
      <div class="iconfont icon-guanbi1" @click="clear"></div>
    </div>
    <div @click="serchKeywords">搜索</div>
  </div>
  <div>
    <div class="rencentSerch" v-if="searchResult">
      <div>搜索结果</div>
      <!-- <div class="iconfont icon-shanchu" @click="allclear"></div> -->
    </div>
    <div class="someBox">
        <div v-for="item in boxes" @click="linkTo(item.id)" :key="item.id">{{item.name}}</div>
        <div class="icon-dianpu iconfont" v-for="list in sellers" :key="list.id" @click="linkToStore(list.id,list.name)">{{list.name}}</div>
    </div>
  </div>
  <div class="no-info" v-if="noPaipin">
          <div class="icon"><img src="../../assets/images/fenleinopaipin.png" alt=""></div>
          <p>该分类还没有相关拍品</p>
          <p>可以去看看有哪些想买的~<i @click="toTaotao" style="text-decoration: underline;color: red">淘淘</i></p>
  </div>
</div>
</template>
<script>
import { keywords, keywordsSeach } from '../../api/api'
export default {
  data () {
    return {
      keywords: '',
      boxes: [],
      sellers: [],
      noPaipin: false,
      searchResult: false
    }
  },
  created () {},
  methods: {
    toTaotao () {
      this.$router.push('/home')
    },
    getData () {
      this.noPaipin = false
      let params = {
        keywords: this.keywords
      }
      keywords(params)
        .then(res => {
          this.boxes = res.data.cate
          this.sellers = res.data.seller
          if (this.boxes != [] || this.sellers != []) {
            this.searchResult = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    serchKeywords () {
      let params = {
        keywords: this.keywords
      }
      keywordsSeach(params)
        .then(res => {
          let id = res.data.id
          let type = res.data.type
          if (type == 1) {
            this.$router.push('/category/categoryDetails/' + id)
          }
          if (type == 2) {
            this.$router.push('/storeHome/' + id)
          }
          if (type == 3) {
            this.boxes = []
            this.sellers = []
            this.noPaipin = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    allclear () {
      this.boxes = []
      this.sellers = []
    },
    linkTo (id) {
      this.$router.push('/category/categoryDetails/' + id)
    },
    linkToStore (id, name) {
      this.$router.push('/storeHome/' + id)
      localStorage.setItem('name', name)
    },
    clear () {
      this.keywords = ''
    }
  }
}
</script>
<style scoped lang="less">
.serchHead {
  height: 68px;
  background-color: #ededef;
  overflow: hidden;
  padding: 15px 20px;
}
.serchHead div:nth-child(1) {
  float: left;
}
.serchHead div:nth-child(2) {
  float: right;
  line-height: 68px;
  font-size: 28px;
}
.serchBox {
  height: 70px;
  width: 642px;
  border: none;
  border-radius: 10px;
  text-indent: 60px;
  font-size: 30px;
}
.icon-search {
  position: absolute;
  top: 18px;
  left: 30px;
  font-size: 28px;
  color: #999999;
  margin: 0;
}
.icon-guanbi1 {
  color: #c8c8c8;
  font-size: 32px;
  position: absolute;
  right: 105px;
  top: 32px;
  margin: 0;
}
.rencentSerch {
  overflow: hidden;
  height: 68px;
  padding: 20px;
}
.rencentSerch div:nth-child(1) {
  float: left;
  line-height: 68px;
  font-size: 28px;
  color: #999999;
}
.rencentSerch div:nth-child(2) {
  float: right;
  line-height: 68px;
}
.icon-shanchu {
  margin: 0;
  color: #999999;
  font-size: 32px;
}
.someBox div {
  padding: 16px 46px;
  background: #ebebeb;
  float: left;
  margin-left: 20px;
  margin-top: 20px;
}
.icon-dianpu {
  font-size: 24px;
}
.no-info {
  height: 375px;
  width: 100%;
  margin: 200px auto;
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
.icon {
  // background: no-repeat;
  // background-position: 30px center;
  // background-repeat: no-repeat;
  // background-size: cover;
  // height: 300px;
  // width: 100%;
}
.icon img {
  display : block;
  width: 507px;
  margin : 0 auto;
}
</style>
