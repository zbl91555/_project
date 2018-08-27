<template>
    <div class="storeManagement" ref="ctn">
      <div class="menu border horizonBottom">
        <div class="menuList mode border verticalRight">
          <div v-for="(list,index) in timeLists" class="menuItem" :class="{ selected:changeRed == index}" :key="index" @click="Red(index)">{{list.text}}</div>
        </div>
      </div>
      <div class="listContainer">

        <div>
          <div v-if="changeRed == '0'" class="listItem" :class="type == 'liupai' ? 'active' : '' " v-for="(s,index) in auctionStore" :key="s.id">
            <!-- <router-link :to="'/auction/'+s.id"> -->
              <div class="info">
                <!-- <div class="singlecheckc" v-if="checkselectshow">
                  <input :value="s.id" id="check" name="singlecheck" type="checkbox" ref="singlechecks" @click="singleselect(s.id,index)">
                </div> -->
                <div  @click="toWhere(s.order_id?s.order_id:s.id)" class="image" :style="{ 'background-image': `url(${s.auction_img1})` }">
                </div>
                <div class="mainInfo" @click="toWhere(s.order_id?s.order_id:s.id)">
                  <p class="title">
                    {{s.auction_description}}
                  </p>
                    <ul class="otherInfo" v-show="auctioning">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>当前价格：￥{{s.leadingprice}}</li>
                      <li>出价次数: {{s.count}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="jiepai">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>成交金额：￥{{s.leadingprice}}</li>
                      <li>成交时间: {{timestampToTime(s.add_time)}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="liupai">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>流拍时间: {{timestampToTime(s.end_time)}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="shibai">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>失败原因：{{s.failreason}}</li>
                      <li>失败时间: {{timestampToTime(s.finish_time)}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="caogao">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>创建时间: {{timestampToTime(s.add_time)}}</li>
                    </ul>
                </div>
              </div>
              <div class="tools">
              <!-- @click="singledown(index)"  @click="swichshow(index)" -->
                <button class="updown" v-if="s.auction_log == false" @click="isSwichHide(index,'updown')">下架</button>
                <button @click="ToTop(s.id,index)" ref="toup" :value="index" class="toup" v-if="index != 0 && type == 'auctioning'" style="border-color:#d2d2d2;color:#d2d2d2">置顶</button>
                <button @click.stop="isSwichHide(index,'grounding')" ref="whichselect" :value="index" v-if="notsoldout">上架</button>
                <button @click="isSwichHide(index,'hide')"  style="color: #999999;border: 1px solid #999999;" v-if="s.is_show=='0'">隐藏</button>
                <button @click="isSwichHide(index,'show')"  :value="index"   v-if="s.is_show=='1'">显示</button>
                <button class="singledelete" ref="whichsingselect" :value="index" v-if="deleted" @click="isSwichHide(index,'delete')">删除</button>
              </div>
           <!--  </router-link> -->
          </div>
          <div v-if="changeRed == '1'" class="listItem" :class="type == 'liupai' ? 'active' : '' " v-for="(s,index) in jiepaiStore" :key="s.id">
            <!-- <router-link :to="'/auction/'+s.id"> -->
              <div class="info">
                <!-- <div class="singlecheckc" v-if="checkselectshow">
                  <input :value="s.id" id="check" name="singlecheck" type="checkbox" ref="singlechecks" @click="singleselect(s.id,index)">
                </div> -->
                <div  @click="toWhere(s.order_id?s.order_id:s.id)" class="image" :style="{ 'background-image': `url(${s.auction_img1})` }">
                </div>
                <div class="mainInfo" @click="toWhere(s.order_id?s.order_id:s.id)">
                  <p class="title">
                    {{s.auction_description}}
                  </p>
                    <ul class="otherInfo" v-show="auctioning">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>当前价格：￥{{s.leadingprice}}</li>
                      <li>出价次数: {{s.count}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="jiepai">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>成交金额：￥{{s.leadingprice}}</li>
                      <li>成交时间: {{timestampToTime(s.add_time)}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="liupai">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>流拍时间: {{timestampToTime(s.end_time)}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="shibai">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>失败原因：{{s.failreason}}</li>
                      <li>失败时间: {{timestampToTime(s.finish_time)}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="caogao">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>创建时间: {{timestampToTime(s.add_time)}}</li>
                    </ul>
                </div>
              </div>
              <div class="tools">
              <!-- @click="singledown(index)"  @click="swichshow(index)" -->
                <button class="updown" v-if="s.auction_log == false" @click="isSwichHide(index,'updown')">下架</button>
                <button @click="ToTop(s.id,index)" ref="toup" :value="index" class="toup" v-if="index != 0 && type == 'auctioning'" style="border-color:#d2d2d2;color:#d2d2d2">置顶</button>
                <button @click.stop="isSwichHide(index,'grounding')" ref="whichselect" :value="index" v-if="notsoldout">上架</button>
                <button @click="isSwichHide(index,'hide')"  style="color: #999999;border: 1px solid #999999;" v-if="s.is_show=='0'">隐藏</button>
                <button @click="isSwichHide(index,'show')"  :value="index"   v-if="s.is_show=='1'">显示</button>
                <button class="singledelete" ref="whichsingselect" :value="index" v-if="deleted" @click="isSwichHide(index,'delete')">删除</button>
              </div>
           <!--  </router-link> -->
          </div>
          <div v-if="changeRed == '2'">
              <div class="checkselect" v-if="checkselectshow">
                <input @click="allselect" class="allScla" id="check" name="allcheck" type="checkbox" ref="allselects">
                <div class="mgleft" for="check">全选</div>
                <button class="selectsomeup" @click="selectsomeup()">{{allids.length >=2? '批量上架' : '上架'}}</button>
                <button class="somedown" @click="isSwichHide(index,'somedelete')">{{allids.length >=2? '批量删除' : '删除'}}</button>
            </div>
            <div class="liupaiClass">
              <div  class="listItem" :class="type == 'liupai' ? 'active' : '' " v-for="(s,index) in liupaiStore" :key="s.id">
                <!-- <router-link :to="'/auction/'+s.id"> -->
                  <div class="info">
                    <div class="singlecheckc" v-if="checkselectshow">
                      <input :value="s.id" id="check" name="singlecheck" type="checkbox" ref="singlechecks" @click="singleselect(s.id,index)">
                    </div>
                    <div  @click="toWhere(s.order_id?s.order_id:s.id)" class="image" :style="{ 'background-image': `url(${s.auction_img1})` }">
                    </div>
                    <div class="mainInfo" @click="toWhere(s.order_id?s.order_id:s.id)">
                      <p class="title">
                        {{s.auction_description}}
                      </p>
                        <ul class="otherInfo" v-show="auctioning">
                          <!-- <li><span>&nbsp;</span></li> -->
                          <li>当前价格：￥{{s.leadingprice}}</li>
                          <li>出价次数: {{s.count}}</li>
                        </ul>
                        <ul class="otherInfo" v-show="jiepai">
                          <!-- <li><span>&nbsp;</span></li> -->
                          <li>成交金额：￥{{s.leadingprice}}</li>
                          <li>成交时间: {{timestampToTime(s.add_time)}}</li>
                        </ul>
                        <ul class="otherInfo" v-show="liupai">
                          <!-- <li><span>&nbsp;</span></li> -->
                          <li>流拍时间: {{timestampToTime(s.end_time)}}</li>
                        </ul>
                        <ul class="otherInfo" v-show="shibai">
                          <!-- <li><span>&nbsp;</span></li> -->
                          <li>失败原因：{{s.failreason}}</li>
                          <li>失败时间: {{timestampToTime(s.finish_time)}}</li>
                        </ul>
                        <ul class="otherInfo" v-show="caogao">
                          <!-- <li><span>&nbsp;</span></li> -->
                          <li>创建时间: {{timestampToTime(s.add_time)}}</li>
                        </ul>
                    </div>
                  </div>
                  <div class="tools">
                  <!-- @click="singledown(index)"  @click="swichshow(index)" -->
                    <button class="updown" v-if="s.auction_log == false" @click="isSwichHide(index,'updown')">下架</button>
                    <button @click="ToTop(s.id,index)" ref="toup" :value="index" class="toup" v-if="index != 0 && changeRed == '0'" style="border-color:#d2d2d2;color:#d2d2d2">置顶</button>
                    <button @click.stop="isSwichHide(index,'grounding')" ref="whichselect" :value="index" v-if="notsoldout">上架</button>
                    <button @click="isSwichHide(index,'hide')"  style="color: #999999;border: 1px solid #999999;" v-if="s.is_show=='0'">隐藏</button>
                    <button @click="isSwichHide(index,'show')"  :value="index"   v-if="s.is_show=='1'">显示</button>
                    <button class="singledelete" ref="whichsingselect" :value="index" v-if="deleted" @click="isSwichHide(index,'delete')">删除</button>
                  </div>
               <!--  </router-link> -->
              </div>
            </div>
          </div>
          <div v-if="changeRed == '3'" class="listItem" :class="type == 'liupai' ? 'active' : '' " v-for="(s,index) in shibaiStore" :key="s.id">
            <!-- <router-link :to="'/auction/'+s.id"> -->
              <div class="info">
                <!-- <div class="singlecheckc" v-if="checkselectshow">
                  <input :value="s.id" id="check" name="singlecheck" type="checkbox" ref="singlechecks" @click="singleselect(s.id,index)">
                </div> -->
                <div  @click="toWhere(s.order_id?s.order_id:s.id)" class="image" :style="{ 'background-image': `url(${s.auction_img1})` }">
                </div>
                <div class="mainInfo" @click="toWhere(s.order_id?s.order_id:s.id)">
                  <p class="title">
                    {{s.auction_description}}
                  </p>
                    <ul class="otherInfo" v-show="auctioning">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>当前价格：￥{{s.leadingprice}}</li>
                      <li>出价次数: {{s.count}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="jiepai">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>成交金额：￥{{s.leadingprice}}</li>
                      <li>成交时间: {{timestampToTime(s.add_time)}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="liupai">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>流拍时间: {{timestampToTime(s.end_time)}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="shibai">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>失败原因：{{s.failreason}}</li>
                      <li>失败时间: {{timestampToTime(s.finish_time)}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="caogao">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>创建时间: {{timestampToTime(s.add_time)}}</li>
                    </ul>
                </div>
              </div>
              <div class="tools">
              <!-- @click="singledown(index)"  @click="swichshow(index)" -->
                <button class="updown" v-if="s.auction_log == false" @click="isSwichHide(index,'updown')">下架</button>
                <button @click="ToTop(s.id,index)" ref="toup" :value="index" class="toup" v-if="index != 0 && type == 'auctioning'" style="border-color:#d2d2d2;color:#d2d2d2">置顶</button>
                <button @click.stop="isSwichHide(index,'grounding')" ref="whichselect" :value="index" v-if="notsoldout">上架</button>
                <button @click="isSwichHide(index,'hide')"  style="color: #999999;border: 1px solid #999999;" v-if="s.is_show=='0'">隐藏</button>
                <button @click="isSwichHide(index,'show')"  :value="index"   v-if="s.is_show=='1'">显示</button>
                <button class="singledelete" ref="whichsingselect" :value="index" v-if="deleted" @click="isSwichHide(index,'delete')">删除</button>
              </div>
           <!--  </router-link> -->
          </div>
          <div v-if="changeRed == '4'" class="listItem" :class="type == 'liupai' ? 'active' : '' " v-for="(s,index) in caogaoStore" :key="s.id">
            <!-- <router-link :to="'/auction/'+s.id"> -->
              <div class="info">
                <!-- <div class="singlecheckc" v-if="checkselectshow">
                  <input :value="s.id" id="check" name="singlecheck" type="checkbox" ref="singlechecks" @click="singleselect(s.id,index)">
                </div> -->
                <div  @click="toWhere(s.order_id?s.order_id:s.id)" class="image" :style="{ 'background-image': `url(${s.auction_img1})` }">
                </div>
                <div class="mainInfo" @click="toWhere(s.order_id?s.order_id:s.id)">
                  <p class="title">
                    {{s.auction_description}}
                  </p>
                    <ul class="otherInfo" v-show="auctioning">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>当前价格：￥{{s.leadingprice}}</li>
                      <li>出价次数: {{s.count}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="jiepai">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>成交金额：￥{{s.leadingprice}}</li>
                      <li>成交时间: {{timestampToTime(s.add_time)}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="liupai">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>流拍时间: {{timestampToTime(s.end_time)}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="shibai">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>失败原因：{{s.failreason}}</li>
                      <li>失败时间: {{timestampToTime(s.finish_time)}}</li>
                    </ul>
                    <ul class="otherInfo" v-show="caogao">
                      <!-- <li><span>&nbsp;</span></li> -->
                      <li>创建时间: {{timestampToTime(s.add_time)}}</li>
                    </ul>
                </div>
              </div>
              <div class="tools">
              <!-- @click="singledown(index)"  @click="swichshow(index)" -->
                <button class="updown" v-if="s.auction_log == false" @click="isSwichHide(index,'updown')">下架</button>
                <button @click="ToTop(s.id,index)" ref="toup" :value="index" class="toup" v-if="index != 0 && type == 'auctioning'" style="border-color:#d2d2d2;color:#d2d2d2">置顶</button>
                <button @click.stop="isSwichHide(index,'grounding')" ref="whichselect" :value="index" v-if="notsoldout">上架</button>
                <button @click="isSwichHide(index,'hide')"  style="color: #999999;border: 1px solid #999999;" v-if="s.is_show=='0'">隐藏</button>
                <button @click="isSwichHide(index,'show')"  :value="index"   v-if="s.is_show=='1'">显示</button>
                <button class="singledelete" ref="whichsingselect" :value="index" v-if="deleted" @click="isSwichHide(index,'delete')">删除</button>
              </div>
           <!--  </router-link> -->
          </div>
        </div>
        <!-- <div class="bottombtn" v-if="btnsshow">
            <button class="btnall" @click="sendmsg()">确认上架</button>

          <button class="btnall canselmgl" @click="cancelbts()">取消</button>
        </div> -->
      </div>
      <!-- 弹出弹框 -->
    <div id="fixednumMain" v-if="showshowlists">
      <div @click="closeshowlists()" class="fixednumMask" style="opacity: 0.38;">
      </div>
      <div class="sharesomething">
         <div style="color:#b55459;" v-if="updown" @click="singledown(isshowIndex)">确认下架</div>
         <div v-if="hide">确认更改当前状态？</div>
         <div v-if="(type == 'liupai' || type == 'caogao') && xiajia">是否确认重新上架</div>
         <div v-if="del">确认删除？</div>
         <div v-if="confirmdelete" @click="singledelete(isshowIndex)">确认</div>
         <div v-if="confirmSomedelete" @click="somedown()">确认</div>
         <div v-if="confirm" @click="swichStatus(isshowIndex)">确认</div>
         <div style="color:rgb(181, 84, 89)" v-if="reconfirm" @click.stop="grounding(isshowIndex)">重新上架</div>
        <span class="grayTop"></span>
        <div class="cancelTop" @click="closeshowlists()">取消 </div>
      </div>
    </div>
      <!--弹出选择时间-->
      <div class="SaleDateTimePicker" v-if="pupup">
          <div class="topContainer" @click="exit()"></div>
            <div class="container flip-up">
              <div class="dayItem" v-if="todayshow">
                <div class="title">
                  {{nowday}}(今天)
                </div>
                <div>
                  <span class="hourItem" v-for="(item,index) in times" @click="chosenSelection(index)" :class="{selected:index===nowindex}" :key="index">{{item}}</span>
                </div>
              </div>
              <div class="dayItem">
                <div class="title">
                  {{tomorrow}}(明天)
                </div>
                <div>
                  <span class="hourItem" v-for="(item,index) in tmortimes" @click="chosenSelection2(index)" :class="{selected:index===nnowindex}" :key="index">{{item}}</span>
                </div>
              </div>
              <div class="dayItem" v-if="ttomorrowshow">
                <div class="title">
                  {{ttomorrow}}(后天)
                </div>
                <div>
                  <span class="hourItem" v-for="(item,index) in ttmortimes" @click="chosenSelection3(index)" :class="{selected:index===nnnowindex}" :key="index">{{item}}</span>
                </div>
              </div>
              <div class="cbtnItem">
                  <!-- <span class="btnItem selected" @click="confirmup()">确认上传</span> -->
                  <span class="btnItem selected" @click="someconfirmup()">确认上传</span>
                  <span class="btnItem" @click="cancel()">取消</span>
              </div>
              </div>
            </div>
            <load-more v-if="loading" tip="正在加载"></load-more>
            <load-more v-if="elseloading" :show-loading="false" tip="暂无更多数据" background-color="#fbf9fe"></load-more>
          </div>
</template>
<script>
import { Toast } from 'vant'
import { LoadMore } from 'vux'
import {getstore, somedown, ToTop, confirmup, swichhide, singledown, singledelete} from '../../../api/api'
export default {
  data () {
    return {
      timeLists: [
        {
          'text': '竞拍中',
          'type': 'auctioning'
        },
        {
          'text': '已截拍',
          'type': 'jiepai'
        },
        {
          'text': '已流拍',
          'type': 'liupai'
        },
        {
          'text': '已失败',
          'type': 'shibai'
        },
        {
          'text': '草稿箱',
          'type': 'caogao'
        }
      ],
      times: ['10:00', '12:00', '16:00', '17:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      tmortimes: ['10:00', '12:00', '16:00', '17:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      ttmortimes: ['10:00', '12:00', '16:00', '17:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      changeRed: 0,
      store: [],
      auctionStore: [], // 竞拍中
      jiepaiStore: [], // 已截拍
      liupaiStore: [], // 已流拍
      shibaiStore: [], // 已失败
      caogaoStore: [], // 草稿箱
      type: 'auctioning',
      pagenum: 5,
      page: 0,
      auctioning: true,
      jiepai: false,
      liupai: false,
      shibai: false,
      caogao: false,
      soldout: true,
      notsoldout: false,
      toup: true,
      deleted: false,
      checkselectshow: false,
      btnsshow: false,
      ttomorrowshow: false,
      todayshow: true,
      allids: [],
      pupup: false,
      nowday: 0,
      tomorrow: 0,
      ttomorrow: 0,
      nowindex: -1,
      nnowindex: -1,
      nnnowindex: -1,
      year: '',
      month: '',
      day: '',
      totaltime: '',
      oneid: '',
      confirmupshow: false,
      someconfirmupshow: false,
      tohide: false,
      toshow: false,
      isBusy: false,
      showshowlists: false,
      isshowIndex: '',
      updown: false,
      hide: false,
      del: false,
      confirm: false,
      reconfirm: false,
      confirmdelete: false,
      confirmSomedelete: false,
      count: 0,
      loading: false,
      elseloading: false,
      textGrounding: '上架',
      textDelete: '删除',
      indexs: [],
      flag: false,
      xiajia: true
    }
  },
  components: {
    LoadMore
  },
  computed: {
    isLiupai () {
      return this.type == 'liupai'
    }
  },
  created () {
    this.count = this.pagenum
    window.addEventListener('scroll', this.scrollHandler)
  },

  destroyed () {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    grounding (index) { // 上架
      if (this.type == 'liupai') {
        this.$router.push({name: '发布', params: {id: this.allids[0]}})
      } else {
        let id = this.caogaoStore[index].id
        this.$router.push({name: '发布', params: {id}})
      }
    },
    isSwichHide (indexs, type) {
      this.xiajia = true
      if (type == 'updown') {
        this.showshowlists = true
        this.isshowIndex = indexs
        this.updown = true
        this.reconfirm = true
        this.hide = false
        this.confirm = false
        this.del = false
        this.confirmdelete = false
        this.confirmSomedelete = false
      } else if (type == 'delete') {
        this.showshowlists = true
        this.isshowIndex = indexs
        this.del = true
        this.confirm = false
        this.hide = false
        this.reconfirm = false
        this.updown = false
        this.confirmdelete = true
        this.confirmSomedelete = false
      } else if (type == 'somedelete') {
        if (this.allids.length == 0) {
          Toast('请选择拍品')
          return
        }
        this.showshowlists = true
        this.isshowIndex = indexs
        this.del = true
        this.confirm = false
        this.hide = false
        this.reconfirm = false
        this.updown = false
        this.confirmdelete = false
        this.confirmSomedelete = true
      } else if (type == 'grounding') {
        this.showshowlists = true
        this.isshowIndex = indexs
        this.updown = false
        this.reconfirm = true
        this.hide = false
        this.confirm = false
        this.del = false
        this.confirmdelete = false
        this.confirmSomedelete = false
      } else {
        this.xiajia = false
        this.showshowlists = true
        this.isshowIndex = indexs
        this.hide = true
        this.confirm = true
        this.reconfirm = false
        this.del = false
        this.updown = false
        this.confirmdelete = false
        this.confirmSomedelete = false
      }
    },
    // 关闭
    closeshowlists () {
      this.showshowlists = false
    },
    toWhere (id) {
      if (this.type == 'caogao') {
        return
      }
      if (this.type == 'shibai') {
        this.$router.push({ path: '/orderDetail/' + id })
      } else {
        (
          this.$router.push({ path: '/auction/' + id })
        )
      }
    },
    // 隐藏

    swichStatus: function (index) {
      if (this.flag) {
        return false
      }
      let _this = this
      _this.numBer = _this.store[index].is_show
      let type = ''
      if (_this.numBer == '0') {
        type = 'hide'
      } else {
        type = 'show'
      }
      let hideid = this.store[index].id
      let params = {
        type: type
      }
      swichhide(params, hideid).then(function (response) {
        _this.showshowlists = false
        console.log(response.message)
        _this.store[index].is_show = response.message
        this.flag = false
      })
        .catch(function (error) {
          console.log(error)
          this.flag = false
        })
    },
    // 取消
    cancel: function () {
      this.pupup = false
    },
    // 下架
    singledown: function (index) {
      if (this.flag) {
        return false
      }
      this.flag = true
      let _this = this
      let downid = this.store[index].id
      singledown(downid).then((response) => {
        if (response.code == 200) {
          _this.showshowlists = false
          this.flag = false
          _this.Red(4)
        }
      })
        .catch(function (error) {
          console.log(error)
          _this.flag = true
        })
    },
    // 注册scroll事件并监听
    scrollHandler () {
      const st = document.documentElement.scrollTop || document.body.scrollTop
      const ch = this.$refs.ctn.clientHeight
      if (this.$refs.allselects.checked) {
        this.allids = []
        for (var i = 0; i < this.liupaiStore.length; i++) {
          this.$refs.singlechecks[i].checked = true
          this.allids.push(this.$refs.singlechecks[i].value)
        }
      }
      if (st + window.innerHeight >= ch) {
        console.log('加载')
        this.getstore(this.timeLists[this.changeRed].type)
      }
    },
    sendParames (e) {
      this.$router.push({
        path: 'goodsDetails',
        query: {
          id: e
        }
      })
    },
    checktime: function () {
      let dd = new Date()
      let hour = dd.getHours()
      if (hour < 10) {
        this.times = this.times.slice(0)
      } else if (hour >= 10 && hour < 12) {
        this.times = this.times.slice(1)
        this.ttmortimes = this.ttmortimes.slice(0, 1)
        this.ttomorrowshow = true
      } else if (hour >= 12 && hour < 16) {
        this.times = this.times.slice(2)
        this.ttmortimes = this.ttmortimes.slice(0, 2)
        this.ttomorrowshow = true
      } else if (hour >= 16 && hour < 17) {
        this.times = this.times.slice(3)
        this.ttmortimes = this.ttmortimes.slice(0, 3)
        this.ttomorrowshow = true
      } else if (hour >= 17 && hour < 19) {
        this.times = this.times.slice(4)
        this.ttmortimes = this.ttmortimes.slice(0, 4)
        this.ttomorrowshow = true
      } else if (hour >= 19 && hour < 20) {
        this.times = this.times.slice(5)
        this.ttmortimes = this.ttmortimes.slice(0, 5)
        this.ttomorrowshow = true
      } else if (hour >= 20 && hour < 21) {
        this.times = this.times.slice(6)
        this.ttmortimes = this.ttmortimes.slice(0, 6)
        this.ttomorrowshow = true
      } else if (hour >= 21 && hour < 22) {
        this.times = this.times.slice(7)
        this.ttmortimes = this.ttmortimes.slice(0, 7)
        this.ttomorrowshow = true
      } else if (hour >= 22 && hour < 23) {
        this.times = this.times.slice(8)
        this.ttmortimes = this.ttmortimes.slice(0, 8)
        this.ttomorrowshow = true
      } else if (hour >= 23) {
        this.todayshow = false
        this.ttomorrowshow = true
      }
    },
    chosenSelection: function (index) {
      this.nnowindex = -1
      this.nowindex = index
      this.nnnowindex = -1
      let hms = this.times[index]
      this.seltime(index, 0, hms)
    },
    chosenSelection2: function (index) {
      this.nowindex = -1
      this.nnowindex = index
      this.nnnowindex = -1
      let hms = this.tmortimes[index]
      this.seltime(index, 1, hms)
    },
    chosenSelection3: function (index) {
      this.nowindex = -1
      this.nnnowindex = index
      this.nnowindex = -1
      let hms = this.ttmortimes[index]
      this.seltime(index, 2, hms)
    },
    seltime: function (index, whatday, hms) {
      let dd = new Date()
      this.year = (dd.getFullYear()).toString()
      this.month = (dd.getMonth() + 1).toString()
      this.day = (dd.getDate() + whatday).toString()
      let change = this.year + '/' + this.month + '/' + this.day + ' ' + hms
      this.totaltime = Date.parse(new Date(change)) / 1000
      console.log(this.totaltime)
    },
    getday: function () {
      this.nowday = this.GetDateStr(0)
      this.tomorrow = this.GetDateStr(1)
      this.ttomorrow = this.GetDateStr(2)
    },
    GetDateStr: function (AddDayCount) {
      let dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount)// 获取AddDayCount天后的日期
      let y = dd.getFullYear()
      let m = dd.getMonth() + 1// 获取当前月份的日期
      let d = dd.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      return m + '月' + d + '日'
    },
    exit () {
      this.pupup = false
    },
    // 获取列表
    getstore (e) {
      if (this.count < this.pagenum) {
        return
      };
      this.loading = true
      let _this = this
      this.page += 1
      let params = {
        page: this.page,
        pagenum: this.pagenum,
        type: e
      }
      getstore(params).then(function (response) {
        if (response.code == 200) {
          if (response.data.length === 0) {
            _this.elseloading = true
          } else {
            _this.elseloading = false
          }
          if (e == 'auctioning') {
            _this.auctionStore = _this.auctionStore.concat(response.data)
            _this.checkselectshow = false
          }
          if (e == 'jiepai') {
            _this.jiepaiStore = _this.jiepaiStore.concat(response.data)
            _this.checkselectshow = false
          }
          if (e == 'liupai') {
            _this.liupaiStore = _this.liupaiStore.concat(response.data)
            if (e == 'liupai' && _this.liupaiStore.length != 0) {
              _this.checkselectshow = true
            } else {
              _this.checkselectshow = false
            }
          }
          if (e == 'shibai') {
            _this.shibaiStore = _this.shibaiStore.concat(response.data)
            _this.checkselectshow = false
          }
          if (e == 'caogao') {
            _this.caogaoStore = _this.caogaoStore.concat(response.data)
            _this.checkselectshow = false
          }
          // _this.store = _this.store.concat(response.data);

          _this.count = response.data.length
          _this.loading = false
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 删除
    somedown: function () {
      if (this.flag) {
        return false
      }
      this.flag = true
      let _this = this
      let delids = this.allids.join(',')
      let params = {
        auc_id: delids
      }
      somedown(params).then((response) => {
        this.allids = []
        this.textGrounding = '上架'
        this.textDelete = '删除'
        if (response.code == 200) {
          this.showshowlists = false
          this.flag = false
          this.Red(2)
        }
      })
        .catch(function (error) {
          this.flag = false
          console.log(error)
        })
    },
    // 单个删除
    singledelete: function (index) {
      if (this.flag) {
        return false
      }
      this.flag = true
      this.oneid = ''
      if (this.$refs.whichsingselect[index].value == index) {
        this.oneid = this.store[index].id
      }
      let _this = this
      let auc_id = this.oneid
      singledelete(auc_id).then(function (response) {
        if (response.code == 200) {
          _this.showshowlists = false
          this.flag = false
          _this.Red(4)
        }
      })
        .catch(function (error) {
          console.log(error)
          this.flag = false
        })
    },
    // 点击切换数据显示
    Red: function (index) {
      this.showshowlists = false
      this.elseloading = false
      this.allids = []
      this.count = this.pagenum
      this.changeRed = index
      localStorage.setItem('changeRed', index)
      this.type = this.timeLists[index].type
      this.page = 0
      this.auctionStore = []
      this.jiepaiStore = []
      this.liupaiStore = []
      this.shibaiStore = []
      this.caogaoStore = []
      this.getstore(this.type)
      console.log(this.type)
      if (this.type == 'jiepai') {
        this.auctioning = false
        this.jiepai = true
        this.liupai = false
        this.shibai = false
        this.caogao = false
        this.soldout = false
        this.notsoldout = false
        this.toup = false
        this.tohide = true
        this.deleted = false
        this.toshow = false
        this.checkselectshow = false
      } else if (this.type == 'auctioning') {
        this.auctioning = true
        this.jiepai = false
        this.liupai = false
        this.shibai = false
        this.caogao = false
        this.soldout = true
        this.notsoldout = false
        this.toup = true
        this.deleted = false
        this.tohide = false
        this.toshow = false
        this.checkselectshow = false
      } else if (this.type == 'liupai') {
        this.auctioning = false
        this.jiepai = false
        this.liupai = true
        this.shibai = false
        this.caogao = false
        this.soldout = false
        this.notsoldout = false
        this.toup = false
        this.tohide = true
        this.deleted = false
        this.toshow = false
      } else if (this.type == 'shibai') {
        this.auctioning = false
        this.jiepai = false
        this.liupai = false
        this.shibai = true
        this.caogao = false
        this.soldout = false
        this.notsoldout = false
        this.toup = false
        this.tohide = false
        this.deleted = false
        this.toshow = false
        this.checkselectshow = false
      } else if (this.type == 'caogao') {
        this.auctioning = false
        this.jiepai = false
        this.liupai = false
        this.shibai = false
        this.caogao = true
        this.soldout = false
        this.notsoldout = true
        this.toup = false
        this.tohide = false
        this.deleted = true
        this.toshow = false
        this.checkselectshow = false
        console.log(this.checkselectshow)
      };
    },
    // 置顶
    ToTop (e, index) {
      if (this.flag) {
        return
      }
      this.flag = true
      let _this = this
      ToTop(e).then(function (response) {
        if (response.code == 200) {
          let arr = _this.store.splice(index, 1)
          _this.store.unshift(arr[0])
          _this.flag = false
        }
      })
        .catch(function (error) {
          console.log(error)
          _this.flag = false
        })
    },
    allselect () {
      this.allids = []
      if (this.$refs.allselects.checked) {
        for (let i = 0; i < this.$refs.singlechecks.length; i++) {
          this.$refs.singlechecks[i].checked = true
          this.allids.push(this.$refs.singlechecks[i].value)
        }
      } else {
        for (let i = 0; i < this.$refs.singlechecks.length; i++) {
          this.$refs.singlechecks[i].checked = false
          this.allids = []
        }
      }
      console.log(this.allids)
    },
    singleselect: function (id, index) {
      let num = this.allids.indexOf(id)
      let quantity = this.indexs.indexOf(index)
      if (quantity > -1) {
        this.indexs.splice(index, 1)
      } else {
        this.indexs.push(index)
      };console.log(this.indexs)
      if (num > -1) {
        this.allids.splice(num, 1)
      } else {
        this.allids.push(id)
      }
      if (this.allids.length > 1) {
        this.textGrounding = '批量上架'
        this.textDelete = '批量删除'
      } else {
        this.textGrounding = '上架'
        this.textDelete = '删除'
      }
      if (this.$refs.singlechecks.length > this.allids.length) {
        this.$refs.allselects.checked = false
      } else {
        this.$refs.allselects.checked = true
      }
      console.log(this.allids)
    },
    cancelbts () {
      this.btnsshow = false
    },
    // 批量上传
    selectsomeup () {
      console.log(this.allids)
      if (this.allids.length > 1) {
        this.pupup = true
        this.allids = this.allids.join(',')
      } else if (this.allids.length == 1) {
        this.isSwichHide(this.indexs[0], 'grounding')
      } else {
        Toast('请选择拍品')
      }
    },
    // 多个确认上架
    someconfirmup: function () {
      this.pupup = false
      let _this = this
      if (this.allids.length == 1) {
        let params = {
          time: this.totaltime,
          auc_id: this.oneid
        }
      } else if (this.allids.length > 1) {
        let params = {
          auc_id: this.allids,
          time: this.totaltime
        }
      };
      confirmup(params).then(function (response) {
        _this.allids = []
        _this.textGrounding = '上架'
        _this.textDelete = '删除'
        if (response.code == 200) {
          window.location.reload()
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    }
    // 选择单个上架跳出选择时间
    // selsingleup:function(index){
    //   this.confirmupshow=true;
    //   this.someconfirmupshow=false;
    //   this.pupup=true;
    //   if(this.$refs.whichselect[index].value==index){
    //         this.oneid=this.store[index].id
    //   }
    // },
  },
  beforeRouteLeave (to, from, next) {
    localStorage.removeItem('changeRed')
    next()
  },
  mounted () {
    this.checktime()
    this.getday()
    if (localStorage.getItem('changeRed') != null) {
      this.changeRed = localStorage.getItem('changeRed')
    }
    if (this.$route.params.drafts == 4) {
      this.getstore('caogao')
      this.Red('4')
    } else {
      this.getstore(this.timeLists[this.changeRed].type)
    }
  }
}
</script>
<style scoped>
  .liupaiClass{
    padding-top: 125px;
  }
  .toup{
    display: block;
    float: right
  }
  .updown , .singledelete{
    float: right
  }
  .show{
    display: none;
    float: right
  }
  .hide{
    display: block;
    float: right;
  }
  /*截拍时间样式*/
  .SaleDateTimePicker {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 999;
  }
  .SaleDateTimePicker .topContainer{
    width: 750px;
      height: 27%;
  }
  .SaleDateTimePicker .container {
      width: 750px;
      height: 71%;
      min-height: 350px;
      padding-top: .3rem;
      background: #fff;
      cursor: default;
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -5rem;
      overflow: scroll;
  }
  .flip-up {
      -webkit-animation: flipUp 0.2s ease-out;
      animation: flipUp 0.2s ease-out;
      opacity: 1 !important;
      visibility: visible !important;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
  }
  .SaleDateTimePicker .container .dayItem {
      margin: 0 35px 35px 35px;
      border-top: 1px dashed #ccc;
  }
  .SaleDateTimePicker .container .dayItem .title {
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 28px;
      color: #333;
      margin-left: 35px;
  }
  .SaleDateTimePicker .container .dayItem .hourItem {
      position: relative;
      display: inline-block;
      height: 72px;
      width: 29.5%;
      font-size: 28px;
      line-height: 72px;
      margin: 0 1.5% 10px;
      border-radius: 3px;
      color: #333;
      background-color: #efefef;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      cursor: pointer;
  }
  .SaleDateTimePicker .container .cbtnItem {
      margin: 0 35px 35px 35px;
      border-top: 1px dashed #ccc;
      text-align: center;

  }
  .SaleDateTimePicker .container .cbtnItem .btnItem {
      position: relative;
      display: inline-block;
      height: 60px;
      width: 180px;
      font-size: 28px;
      line-height: 60px;
      margin: 0 1.5% 10px;
      border-radius: 3px;
      color: #333;
      background-color: #efefef;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      cursor: pointer;
  }

  .SaleDateTimePicker .container .dayItem .hourItem.selected{
    background-color: #9e2026;
    color: #fff;
  }
  .SaleDateTimePicker .container .cbtnItem .selected{
    background-color: #9e2026;
    color: #fff;
  }
  .storeManagement {
    background-color: #ededef;
    max-width: 750px;
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
    padding-bottom: 1.333rem;
  }
  .storeManagement .menu {
    position: fixed;
    top: 0;
    width: 100%;
    height: 78px;
    line-height: 78px;
    max-width: 750px;
    background-color: #FFF;
    z-index: 999;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
  }

  .storeManagement .menu .menuList.mode {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    padding: 0 30px;
  }
  .storeManagement .menu .menuList {
    padding: 0 15px;
    float: left;
    height: 100%;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
  }

  .border {
    position: relative;
  }

  .storeManagement .menu .menuList.mode .menuItem {
    padding: 0;
    width: 16%;
    color: #999999;
    font-size: 30px;
    font-family: PingFang-SC-Heavy;
    margin-left: 3.5%;
  }
  .storeManagement .menu .menuList .menuItem.selected {
    color: #9e2026;
    border-bottom: 4px solid #9e2026;
    font-family: PingFang-SC-Heavy;
  }
  .storeManagement .menu .menuList .menuItem {
    font-size: 28px;
    cursor: pointer;
    text-align: center;
    padding: 0 16px;
  }
  .storeManagement .menu .menuList:after {
    height: 40%;
    top: 30%;
  }
  .border.verticalRight:after {
    top: 0;
    right: 0;
  }
  .border.verticalLeft:after, .border.verticalRight:after {
    width: 2px;
    height: 100%;
    -ms-transform: scaleX(0.5);
    transform: scaleX(0.5);
    -webkit-transform: scaleX(0.5);
  }
  .border:after {
    position: absolute;
    content: '';
    background-color: #e5e5e5;
  }
  .storeManagement .menu .menuList .menuItem i {
    font-size:42px;
    color: #666;
  }
  .storeManagement .menu .menuList .traces .icon-zuji{
    font-size:50px;
    color: #666;
  }
  .border.horizonBottom:after {
    left: 0;
    bottom: 0;
  }
  .border.horizonTop:after, .border.horizonBottom:after {
    width: 100%;
    height: 2px;
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
  }
  .storeManagement .blank {
    width: 100%;
    height:91px;
  }
  .storeManagement .listContainer {
    padding-top: 72px;
    background: #f4f4f4;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-x:hidden
}
.storeManagement .listContainer .listItem {
    margin: .2rem auto;
    background: #fff;
}
.storeManagement .listContainer .active {
  margin-top : 0.2667rem;
}
.storeManagement .listContainer .listItem .info {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -webkit-justify-content: start;
    -ms-flex-pack: start;
    justify-content: start;
    padding: .4rem .4rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.storeManagement .listContainer .listItem .tools {
    position: relative;
    text-align: right;
    width: 96%;
    margin-left: 4%;
    padding: 20px 4% 20px 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
}
.storeManagement .listContainer .listItem .info .image {
    position: relative;
    min-width: 165px;
    width: 165px;
    height: 165px;
    margin-right: 23px;
    background-color: #303135;;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
}
.storeManagement .listContainer .listItem .info .mainInfo {
    width: 82%;
}
.storeManagement .listContainer .listItem .info .singlecheckc {
    width: 16%;
    padding-top: 50px;
    padding-left: 10px;
}
.storeManagement .listContainer .listItem .info .mainInfo .title {
    color: #333;
    height: 66px;
    line-height: 36px;
    margin-bottom: 37px;
    font-size: 28px;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
 .storeManagement .listContainer .listItem .info .mainInfo .otherInfo {
    color: #999;
    height: 57px;
    line-height: 34px;
    font-size: 24px;
}
.storeManagement .listContainer .listItem .tools::before {
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: #d9d9d9;
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.storeManagement .listContainer .listItem .tools button {
    padding: 0;
    height: 48px;
    line-height: 48px;
    min-width: 110px;
    margin-left: 20px;
    border: 2px solid #f15511;
    border-radius:4px;
    font-size: 26px;
    background-color: #fff;
    color: #f15511;
    text-align: center;
}
/*.storeManagement .listContainer .listItem .tools button:last-child {
    color: #999999;
    border: 2px solid #999999;
}*/
input[type='checkbox']{
  width:18px;
  height:18px;
  position:relative;
  background:transparent;
  border:0;
  outline:none;
  appearance:none;
  -webkit-appearance:none;
  -moz-appearance:none;
}
input[type='checkbox']:before{
  content:"";
  position:absolute;
  width:40px;
  height:40px;
  border:1.05px solid #999;
  border-radius:100%;
   line-height: 30px;
   vertical-align: middle;
}
input[type='checkbox']:checked:before{
  border:1px solid transparent;
  background:#9e2026;
}
input[type='checkbox']:checked:after {
  content:"";
  position:absolute;
  top:5px;
  left:12px;
  border-right:2px solid transparent;
  border-bottom:2px solid transparent;
  -webkit-transform:rotate(45deg);
  transform:rotate(45deg);
  width:15px;
  height:20px;
  border-color:#fff;
}
.mgleft{
  position: absolute;
  left:124px;
  line-height: 100px;
  vertical-align: middle;
  font-size: 30px;
  padding-top: 10px;
  top:0;
}
.checkselect{
  max-width : 10rem;
  width:100%;
  padding-left: 20px;
  padding-top: 5px;
  line-height: 30px;
  vertical-align: middle;
  height: 65px;
  background: #ffffff;
  padding: 30px 0px;
  position: fixed;
  z-index : 111;
}
.selectsomeup{
  width: 150px;
  height: 50px;
  position: absolute;
  right: 190px;
  top:40px;
  border:2px solid #13b0fd;
  border-radius: 5px;
  color:#13b0fd;
  background: #ffffff;
  text-align: center;
  font-size: 28px;
}
.somedown{
  width: 150px;
  height: 50px;
  position: absolute;
  right: 30px;
  top:40px;
  background: #ffffff;
  border:2px solid #999999;
  border-radius: 5px;
  color:#999999;
  text-align: center;
  font-size: 28px;
}
.bottombtn{
  width:100%;
  height: 80px;
  position:fixed;
  left: 0;
  bottom:0;
  padding-bottom: 50px;
  z-index: 1000;
  background: white;
  text-align: center;
  padding-top: 40px;
}
.canselmgl{
  margin-left: 10px;
}
.allScla{
  margin-left:40px;
}
.sharesomething{
    position: fixed;
    left:0;
    bottom: 0;
    z-index: 1100;
    width: 100%;
    background: white;
    text-align: center;
  }
  .sharesomething div{
    font-size: 30px
  }
  .sharesomething div:nth-child(1){
    border-bottom: 1px solid #f2f2f2;
    height: 110px;
    line-height: 110px;
    color: #a2a2a2;
  }
  .sharesomething div:nth-child(2){
    height: 70px;
    line-height: 70px;
    color: #b55459;
  }
  .sharesomething .cancelTop{
    height: 80px;
    line-height: 80px;
  }
  .sharesomething .grayTop:nth-child(2) {
    display : none;
  }
  .grayTop{
    width: 100%;
    height:10px;
    background: #ededef;
    display: inline-block;
  }
 /* .sureDown{
     color: #a2a2a2;
  }
*/
</style>
