<template>
	<div class="release"  ref="release" v-cloak>
	<div id="release" ref="isProtocolCover" style="width : 100%">
	<div class = "keyboardCover" v-show="isCover" @click.stop="blur"></div>
	<div id="fixednumMain" v-if="mobileVeri" data="mobileVeri">
      <div @click.stop="closeCover" class="fixednumMask" style="opacity: 0.38;"></div>
      <div class="telsharesomething">
        <form class="main">
          <div class="list">
            <div class="list-detail">
              <p>手机号</p >
              <input type="text" v-model="phone" placeholder="输入手机号" pattern="[0-9]*"/>
              <span @click="filterNum()">{{msg}}</span>
            </div>
          </div>
          <div class="list">
            <div class="list-detail">
              <p>验证码</p >
              <input type="text" v-model="code" placeholder="输入验证码" pattern="[0-9]*"/>
            </div>
          </div>
          <div class="sub">
            <span :class="code==''?'spanBac':'spanBack'" @click="subMethod()">下一步</span>
          </div>
        </form>
      </div>
    </div>
    <div class="upload" v-show="basicSetup">
      <div class="topBanner">
        <div class="btn draft" @click.stop="$router.go(-1)">上一步</div>
        <div class="btn next" @click.stop="release">发布</div>
      </div>
			<div class="basic">
				<div class="cert border horizonTop" @click.stop="chooseEndtime()">
					<div class="lihead">
						截止时间
					</div>

					<div class="endTimeInput">
						<span>{{title}}</span>
					</div>
					<div class="certIcon">
						<i class="iconfont icon-calendarrili"></i>
					</div>
				</div>
				<div class="cert border horizonTop" @click.stop="chooseclassification()" v-show="isVerify">
					<div class="lihead">
						分类
					</div>
					<div class="endTimeInput"><span>{{choseName}}</span></div>
					<div class="certIcon">
						<i class="iconfont icon-fenlei2"></i>
					</div>
				</div>
				<div class="cert border horizonTop" ref="firstPricePrice" @click.stop="focus('firstPrice')">
					<div class="lihead">
						起拍价
					</div>
					<div class="numInput">
						<span class="firstPrice">{{firstPrice}}<i v-show="cursor1" id="cursor1" style="font-size:0.5rem">|</i></span>
					</div>
					<!-- 光标 -->
					<p class="cursor" :style="{visibility: cursor ? 'visible' : 'hidden'}"></p>
				</div>
				<div class="cert" ref="certRange" @click.stop="focus('increase')">
					<div class="lihead">
						加价幅度
					</div>
					<div class="numInput">
						<span class="increase">{{increase}}<i v-show="cursor2" id="cursor1" style="font-size:0.5rem">|</i></span>
						<!-- 光标 -->
						<p class="cursor" :style="{visibility: cursor ? 'visible' : 'hidden'}"></p>
					</div>
				</div>
			</div>
			<div class = "moreUpload">
				<div class="optionalTitle">可选设置</div>
				<div class="optionalSettings">
					<group class="border horizonTop">
							<x-switch title="7天包退" v-model="isReturn" prevent-default @on-click="onClick"></x-switch>
						</group>
						<group  class="border horizonTop">
							<x-switch title="包邮" v-model="freeShip" prevent-default @on-click="onClickes"></x-switch>
						</group>
						<group  class="border horizonTop" v-if="isRecommend">
							<x-switch title="优选" v-model="recommend" prevent-default @on-click="onSelective"></x-switch>
						</group>
					<div class="cert " @click.stop="securityDeposit()">
						<div class="lihead">
							保证金
						</div>
						<div class="numInput"><span>{{bondPrice}}</span></div>
						<div class="verifyIcon">
							<i v-show="openmargin">点击开通</i>
							<i class="iconfont icon-iconfontzhizuobiaozhun023106"></i>
						</div>
					</div>
					<div class="bidpresentationList" v-show="securitymoney" >
						<div class="presentation" v-for="(item,index) in presentation" @click.stop="margin(item)" :key="index">
							{{item}}
						</div>
					</div>
				</div>
			</div>
			<div class="cert more border horizonTop" @click.stop="moreSettings">
				<div class="lihead">
					更多设置
				</div>
				<div class="endTimeInput"><span></span></div>
				<div class="certIcon">
					<i class="iconfont icon-right"></i>
				</div>
			</div>
				<div class="agreeBanner">
					<div class = "agreeBannerPrice" style="float:left;margin-left:0.4rem;color:#888;font-size : 0.25rem;">
						<p style="text-align : left" v-show="oneBitePrice">一口价￥{{oneBitePrice}}</p>
						<p v-show="referencePricesLow && referencePricesUp">参考价￥{{referencePricesLow + '~' + referencePricesUp}} </p>
					</div>
				</div>
			<!-- 分类一级与二级 -->
			<div class="category"  v-show="classification">
				<div class="tptMask" style="opacity: 0.4;" @click.stop="tptMask"></div>
				<div class="categoryBox" >
					<div class="categoryTitle">
						<span class="title">分 类（请谨慎选择，切勿跨品类）</span>
					</div>
					<div class="categoryList">
						<div class="categoryItem" v-for="(item,index) in categoryListes"
						@click.stop="chooseOne(item,index)" :key="index">
							<div class="categoryClass">
								<i class="iconfont icon-shafa" :class="{ choose:changeRed === index }"></i>
								<i class = "iconfont icon-right" style="float:right"></i>
                        {{item.name}}
								<span>{{item.content}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="chooseSecondary" v-show="secondary" >
					<div class="secondsort" v-for="(item,index) in categoryListes" v-if="changeRed===index" :key="index">
						<div class="sTitle">
							<div class="sTitleLeft" @click.stop="rechoose">
								重选
							</div>
							<div class="sTitleMid">
								{{item.name}}
							</div>
							<div class="sTitleRight" @click.stop="chooseComplete">
								完成
							</div>
						</div>
						<div class="sContent" >
							<p>请选择二级分类</p>
							<div class="sContentSort" >
								<span @click.stop="chooseSecondary(list,index)" v-for="(list,index) in item.childCategory" :class="{ smallObj:changeRedes === index }" :key="index">{{list.name}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 截拍时间-->
		<div class="SaleDateTimePicker" v-show="sectionalTime" @click.stop="closeSaleDateTimePicker">
			<div class="container flip-up">
				<!-- 立即截拍start -->
				<div class="dayItem" v-show="cutShot">
					<div class="title">
						默认
					</div>
					<div>
						<span class="hourItem" :class="{selected : isSelected}" @click.stop="Immediately">立即开拍</span>
					</div>
				</div>
				<!-- 立即截拍样式end -->
				<div class="dayItem" v-show="todays">
					<div class="title">
						{{month}}月{{data}}日(今天)
					</div>
					<div class= "today">
						<span class="hourItem" :class="{selected : isCutShot('todays') == index}" v-for="(item,index) in todayList" @click.stop="chooseTimetoday(item,index)" :key="index">{{item}}</span>
					</div>
				</div>
				<div class="dayItem" v-show="tomorrows">
					<div class="title">
						{{time.after}}(明天)
					</div>
					<div class= "today">
						<span class="hourItem" :class="{selected : isCutShot('tomorrowList') == index}" v-for="(item,index) in tomorrowList" @click.stop="chooseTimetomorrow(item,index)" :key="index">{{item}}</span>
					</div>
				</div>
				<div class="dayItem" v-show="aftertomorrows">
					<div class="title">
					{{time.tomorrow}}(后天)
					</div>
					<div class= "today">
						<span class="hourItem" :class="{selected : isCutShot('aftertomorrowList') == index}" :key="index" v-for="(item,index) in aftertomorrowList" @click.stop="chooseTimeaftertomorrow(item,index)">{{item}}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 高级设置 -->
		<div class="moreUpload" v-show="advancedSettings" ref="moreUpload">
      <div class="topBanner">
        <div class="btn draft" @click.stop="cancelStep('draft')">取 消</div>
        <div class="btn next"  @click.stop="cancelStep('next')">完成</div>
      </div>
			<div class="optionalTitle">高级设置</div>
			<div class="cert more" @click.stop="shooting">
				<div class="lihead">
					开拍时间
				</div>
				<div class="openTimeInput"><span>{{titles}}</span></div>
				<!-- <div class="verifyIcon" v-show="isVerify">
					已实名认证
					<i class="iconfont icon-renzhengyonghu"></i>
				</div> -->

				<div class="verifyIcon" v-show="!isVerify">
					未实名认证
					<i class="iconfont icon-renzhengyonghu"></i>
				</div>
			</div>
			<div class="tip openTime">截拍时间：{{title}}</div>
			<div class="cert more " ref="fixedPrice" @click.stop="focus('fixedPrice')">
				<div class="lihead">
					一口价
				</div>
				<div class="numInput">
					<span style="width:2.333333rem;height:50%;position:absolute;top:50%;transform:translateY(-50%);border : 1px solid #e5e5e5" class="fixedPrice">{{fixedPrice}}<i v-show="cursor3" id="cursor1" style="font-size:0.5rem">|</i></span>
				</div>
			</div>
			<div class="tip">出价达到或超过此价格立即成交（无一口价请设0元）</div>
			<div class="cert more " ref="referencePrice">
				<div class="lihead">
					参考价
				</div>
				<div class="numInput referencePriceScope">
					<div class = "referencePricesLow" @click.stop="focus('referencePriceLow')"><span class="referencePrice">{{referencePricesLow}}<i v-show="cursor4" id="cursor1" style="font-size:0.5rem">|</i></span></div> <span class="transitTally">~</span>
					<div class = "referencePricesUp" @click.stop="focus('referencePriceUp')"><span class="referencePrice">{{referencePricesUp}}<i v-show="cursor5" id="cursor1" style="font-size:0.5rem">|</i></span></div>
				</div>
			</div>
			<div class="tip">提供此拍品的参考价格（无参考价请设0元）</div>
    </div>
		</div>
    <biddingAgreement></biddingAgreement>
					<!-- 自定义键盘 -->
		<keyboard :show="keyboard" @typing="typing" @complete="blur"/>
		<actionsheet v-model="goauthorized" :menus="menus2"  @on-click-menu-menu2="goauthorizedes" show-cancel></actionsheet>
		<actionsheet v-model="deposit" :menus="menus1"  @on-click-menu-menu2="security" show-cancel></actionsheet>
  </div>
</template>
<script>
import moment from 'moment' // 格式化时间
import keyboard from './keyboard' // 数字键盘
import { XSwitch, Group, Actionsheet, XTextarea } from 'vux'
import {
  getPublishStep2,
  myUpload,
  savePublish,
  getUpSign,
  getSign,
  getLoginMobileCode,
  submissionCode,
  rejoinTheShelves,
  activityRelease
} from '../../api/api'
import { Toast } from 'vant' // 引入vant的弹出框 提示 和表单组件
// import uploadOther from  './uploadOther';
import uploadImg from './uploadImg'
import wx from 'weixin-js-sdk'
import { mapState } from 'vuex'
import assign from '../../assets/js/assign' // 混入式方法
import biddingAgreement from './biddingAgreement' // 协议

export default {
  mixins: [assign],
  name: 'nextUpload',
  components: {
    biddingAgreement,
    keyboard,
    XSwitch,
    Group,
    Actionsheet,
    Toast,
    XTextarea,
    uploadImg
  },
  data () {
    return {
      isBrowser: {
        Other: false,
        Wechat: false
      },
      textLength: 0, // 字符串长度
      basicSetup: true,
      goodsId: '', // 商品id
      isVerify: false, //  是否认证
      showSuccess: false,
      toastText: '',
      presentation: [0, 10, 30, 50, 100, 200, 500, 1000, 2000], // 保证金
      releaseCount: 1,

      // 上传相关data
      dialogImageUrl: '',
      dialogVisible: false,
      appId: '',
      importFileUrl: '',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: ''
      },
      fileList: [],
      // 时间相关data
      sectionalTime: false, // 截拍时间
      immediateTime: false, // 立即开拍时间
      aftertomorrows: false,
      isSelected: true,
      nextMonth: '',
      nextYear: '',
      todays: true,
      tomorrows: true,
      data: '',
      month: '',
      tomorrow: '',
      aftertomorrow: '',
      year: '',
      title: '请选择截拍时间',
      titles: '立即开拍',
      cutShot: '', // 是否立即截拍
      todayList: [
        '10:00',
        '12:00',
        '16:00',
        '17:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00'
      ],
      tomorrowList: [
        '10:00',
        '12:00',
        '16:00',
        '17:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00'
      ],
      aftertomorrowList: [
        '10:00',
        '12:00',
        '16:00',
        '17:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00'
      ],
      todayListSelected: {
        // 选中高亮
        endTimeSelected: -1,
        startTimeSelected: -1
      },
      tomorrowListSelected: {
        endTimeSelected: -1,
        startTimeSelected: -1
      },
      aftertomorrowListSelected: {
        endTimeSelected: -1,
        startTimeSelected: -1
      },
      time: {
        day: '',
        after: '',
        tomorrow: ''
      },
      // 保存开拍及截拍时间时间 取消时 时间还原
      saveOpenTime: '',
      saveTitles: '',
      saveEndTime: '',
      saveTitle: '',
      saveSelective: {}, // 取消时 保存的高亮效果
      // 分类相关data
      categoryListes: [], // 分类数据
      classification: false, // 是否展开一级分类
      secondary: false, // 是否展开二级分类
      changeRed: '', // 一级分类点击变色
      changeRedes: '', // 二级分类点击变色
      name: '',
      sname: '',
      choseName: '请选择分类', // 分类

      // 键盘相关data
      cursor: false,
      keyboard: false,
      keyboardTips: true,
      /* value 在组件中的值 */
      val: '',
      aIllegal: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '0..',
        '.'
      ],
      cursorDuration: 600,
      bodyHeight: '',
      bodyOverflow: '',
      middleType: '',
      imgSet: [],

      // 提交信息相关data
      desc: '', // 描述
      imgList: [], // 图片
      videoUri: '', // 视频
      cid: '0', // 一级分类
      scid: '0', // 二级分类
      endTime: '', // 截止时间 时间戳
      openTime: '', // 立即截拍时间
      firstPrice: 0, // 起拍价
      increase: 100, // 加价
      bondPrice: 0, // 保证金
      fixedPrice: '', // 一口价
      referencePricesLow: '', // 参考价1
      referencePricesUp: '', // 参考价2
      saveFixedPrice: '', // 取消时 保存的一口价和参考价的数据
      saveGj1: '',
      saveGj2: '',

      // 高级设置相关data
      advancedSettings: false,
      isReturn: false, // 7天包退  0否 1是
      freeShip: false, // 包邮 1是 2否
      recommend: false, // 优选
      isRecommend: false, // 优选是否展示
      hasChosenPublish: false, // 是否能发布优选商品
      securitymoney: false, // 选择缴纳保证金
      deposit: false, // 同意缴纳保证金弹窗
      menus1: {
        menu1: '买卖双方都缴纳保证金,如一方发生违约,将赔付给对方',
        menu2: '同意'
      },
      goauthorized: false, // 去认证弹窗
      menus2: {
        menu1: '设置开拍时间,需要开通实名认证',
        menu2: '去实名认证'
      },
      open: true, // 可以开启同意弹窗
      openmargin: true, // 点击开通

      // 弹窗相关设置
      tel: '',
      color: '#4b0',
      codeInfo: '发送验证码',
      countDown: true,
      codeKey: '',
      show: false,
      ActionsheetFlag: false,
      fullPath: '',
      next: '',
      departFromFlag: false,
      oneBitePrice: '',
      mreferencePrice: '',
      isCover: false,
      cursor1: false,
      cursor2: false,
      cursor3: false,
      cursor4: false,
      cursor5: false,
      obj: {}, // 上架页面的数据
      res: [],
      videoSet: '',
      // 手机号验证数据
      filterTime: '60',
      msg: '获取验证码',
      flag: true, // 获取验证码开关
      phone: '', // 发送短信手机号码
      type: '2', // 获取验证码类型
      _key: '', // 获取到的验证码
      code: '', // 输入的验证码
      mobileVeri: false
    }
  },
  created () {
    this.userifon()
  },
  computed: {
    ...mapState({
      uploadImageParams: state => state.uploadImageParams
    }),
    isProtocolCover () {
      return this.$store.state.isProtocol
    }
  },
  props: {
    value: '',
    inter: {
      default: 8
    },
    decimal: {
      default: 2
    }
  },
  beforeRouteLeave (to, form, next) {
    next()
  },
  methods: {
    // 判断截拍和开拍时间
    judgeTime (num) {
      let time = ''
      let val = '23:00'
      if (num == 0) {
        time = this.timeInitialization(1)
      } else if (num == 1) {
        time = this.timeInitialization(2)
      } else {
        time = this.timeInitialization(3)
      };
      this.todayListSelected.endTimeSelected = -1
      this.tomorrowListSelected.endTimeSelected = -1
      this.aftertomorrowListSelected.endTimeSelected = -1
      // 拼接显示时间
      let times = time.year + '/' + time.month + '/' + time.date + ' ' + val // 拼接时间
      this.endTime = Date.parse(new Date(times)) / 1000
      this.title = time.month + '月' + time.date + '日' + val
    },
    // 时间初始化
    timeInitialization (num, val) {
      let time = new Date().getTime() + 86400000 * num
      let year = new Date(parseInt(time)).getFullYear()
      let month = new Date(parseInt(time)).getMonth() + 1
      let date = new Date(parseInt(time)).getDate()
      return {
        year,
        month,
        date
      }
    },
    // 选中之后 之前的选中状态清除
    clearSelected () {
      if (this.cutShot) {
        this.isSelected = false
        this.todayListSelected.startTimeSelected = -1
        this.tomorrowListSelected.startTimeSelected = -1
        this.aftertomorrowListSelected.startTimeSelected = -1
      } else {
        this.todayListSelected.endTimeSelected = -1
        this.tomorrowListSelected.endTimeSelected = -1
        this.aftertomorrowListSelected.endTimeSelected = -1
      }
    },
    // 截拍 开拍 高亮状态
    isCutShot (info) {
      switch (info) {
        case 'todays':
          return this.cutShot
            ? this.todayListSelected.startTimeSelected
            : this.todayListSelected.endTimeSelected
          break
        case 'tomorrowList':
          return this.cutShot
            ? this.tomorrowListSelected.startTimeSelected
            : this.tomorrowListSelected.endTimeSelected
          break
        case 'aftertomorrowList':
          return this.cutShot
            ? this.aftertomorrowListSelected.startTimeSelected
            : this.aftertomorrowListSelected.endTimeSelected
          break
      }
    },
    // session数据清除
    localClear () {
      localStorage.removeItem('uploadImg')
      localStorage.removeItem('goodsId')
      localStorage.removeItem('uploadInfo')
      localStorage.removeItem('desc')
    },
    telmobile () {
      this.showveri = true
    },
    closeshowveri () {
      this.showveri = false
    },
    // 获取手机验证码
    filterNum () {
      let _this = this
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(_this.phone)) {
        Toast('请输入正确的手机号')
        return false
      }
      if (_this.flag == true) {
        _this.flag = false
        _this.filterTime = 60
        let t = setInterval(() => {
          _this.filterTime--
          if (_this.filterTime <= 0) {
            clearInterval(t) // 当倒计时时间小于0时，清除时间函数并且将时间开关打开
            _this.flag = true
            _this.msg = '获取验证码'
          } else {
            _this.msg = '重新发送(' + _this.filterTime + ')' // 返回最初状态；
          }
        }, 1000)
        let params = {
          phone: _this.phone,
          type: 1
        }
        getLoginMobileCode(params)
          .then(res => {
            this.codeKey = res.data.key
          })
          .catch(function (err) {
            Toast('验证码获取失败')
          })
      }
    },
    // 提交手机号
    subMethod () {
      if (this.Trim(this.phone, 'g') == '') {
        Toast('手机号不能为空')
        return
      }
      if (this.Trim(this.code, 'g') == '') {
        Toast('请正确输入你收到的验证码')
        return
      }
      if (!this.codeKey) {
        Toast('请先获取验证码')
        return
      }
      let params = {
        verification_key: this.codeKey,
        verification_code: this.code,
        type: 1
      }
      submissionCode(params)
        .then(res => {
          Toast('恭喜您绑定成功')
          this.mobileVeri = false
        })
        .catch(function (error) {
          if (error.status === 400) {
            Toast(error.data.message)
            return
          }
          Toast(error.message)
        })
    },
    // 获取重新上架分类
    getClassify (data, info) {
      for (let index = 0; index < data.length; index++) {
        if (data[index].id == info) {
          return data[index]
        }
      }
    },
    // 上传回调
    upload (list) {
      if (list.name === 'img') {
        this.imgList = list.list
      } else {
        this.videoUri = list.list
      }
    },
    // 发布错误处理
    error (error) {
      // 判断返回的状态码
      if (error.status == 422 || error.status == 400) {
        Toast(error.data.message)
      } else if (error.status == 402) {
        // 连续发送三次请求
        if (this.releaseCount <= 3) {
          this.release()
          this.releaseCount++
        }
      } else if (error.status == 403) {
        if (error.data.code == 40002) {
          this.$router.push('/errorPage?type=40002')
          return
        }
        this.mobileVeri = true
      }
    },
    // 数据填充
    dataFilling (res) {
      let data = res.data
      this.desc = data.sale.content || '' // 描述
      this.cid = data.sale.cid || '0' // 一级分类
      this.scid = data.sale.scid || '0' // 二级分类
      if (this.cid != '0' && this.scid != '0') {
        // 分类显示
        let choseName1 = this.getClassify(data.categoryList, this.cid)
        let choseName2 = this.getClassify(choseName1.childCategory, this.scid)
        this.choseName = choseName1.name + '-' + choseName2.name // 分类显示文字
      }
      this.referencePricesLow = +data.sale.gj1 == '0' ? '' : +data.sale.gj1 // 估价1
      this.referencePricesUp = +data.sale.gj2 == '0' ? '' : +data.sale.gj2 // 估价2
      if (this.referencePricesLow != '') {
        // 展示参考价
        this.mreferencePrice = true
      }
      this.firstPrice = +data.sale.firstPrice || 0 // 起拍价
      this.increase = +data.sale.increase || 100 // 加价
      this.fixedPrice = +data.sale.fixedPrice || '' // 一口价
      if (this.fixedPrice != '') {
        // 展示一口价
        this.oneBitePrice = this.fixedPrice
      }
      this.bondPrice = data.sale.bondPrice == '0.00' ? '' : data.sale.BondPrice // 保证金
      if (this.bondPrice) {
        this.openmargin = false
      }
      this.isReturn = data.sale.isReturn // 包退
      this.freeShip = true // 包邮
      if (data.shop.isRecommend) {
        // 是否能优选发布
        this.isRecommend = true
        this.hasChosenPublish = data.shop.hasChosenPublish // 优选的数量有没有达到上限
      }
    },
    isdepartFromFlag (to, next) {
      this.ActionsheetFlag = true
      this.fullPath = to.fullPath
      this.next = next
    },
    // 离开当前页面
    departFrom (to) {
      this.$router.push(this.fullPath)
      this.next()
    },
    // 协议
    isProtocol () {
      this.$store.commit('reviseProtocolClose', true)
    },
    // 点击空白处关闭截拍时间
    closeSaleDateTimePicker () {
      this.sectionalTime = false
    },
    // 关闭遮罩层
    closeCover () {
      this.mobileVeri = false
    },
    // 手机号正则校验
    isPoneAvailable (str) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(str)) {
        return false
      } else {
        return true
      }
    },
    // 获取用户信息
    userifon () {
      let id = this.$route.params.id || localStorage.getItem('goodsId')
      let params = {
        active: this.$route.params.active
      }
      getPublishStep2(id, params)
        .then(res => {
          this.isVerify = res.data.shop.isVerify
          this.categoryListes = res.data.categoryList
          // 获取上架发送的数据
          // if (this.$route.params.id) {
          this.obj = this.$route.params.id
          this.dataFilling(res)
          // }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 更多设置
    moreSettings () {
      this.basicSetup = false
      this.advancedSettings = true
      window.scrollTo(0, 0)
      this.saveSelective = {
        todayListSelected: this.todayListSelected.startTimeSelected,
        tomorrowListSelected: this.tomorrowListSelected.startTimeSelected,
        aftertomorrowListSelected: this.aftertomorrowListSelected.startTimeSelected
      }
      this.saveOpenTime = this.openTime
      this.saveTitles = this.titles
      this.saveEndTime = this.endTime
      this.saveTitle = this.title
      this.saveFixedPrice = this.fixedPrice
      this.saveGj1 = this.referencePricesLow
      this.saveGj2 = this.referencePricesUp
    },
    // 缴纳保证金
    securityDeposit () {
      if (this.open == true) {
        this.deposit = true // 显示同意弹窗
      } else {
        this.deposit = false // 不在显示同意弹窗
        this.securitymoney = !this.securitymoney
      }
    },
    // 同意缴纳保证金
    security () {
      this.securitymoney = true
      this.open = false // 同意之后不在显示弹窗
      this.openmargin = false
    },
    // 缴纳保证金（元）
    margin (item) {
      this.bondPrice = item
      this.securitymoney = false
    },
    // 需实名认证方可设置开拍时间
    shooting () {
      if (this.isVerify == false) {
        this.goauthorized = true // 去认证弹窗
      } else {
        this.cutShot = true
        this.sectionalTime = true // 选择立即开拍时间弹窗
      }
    },
    // 去实名认证
    goauthorizedes () {
      this.$router.push({ path: '/sellerCenter/realnameApplication' })
    },
    // 7天包退
    onClick (newVal, oldVal) {
      this.isReturn = newVal
    },
    // 包邮
    onClickes (newVal, oldVal) {
      this.freeShip = newVal
    },
    // 优选
    onSelective (newVal, oldVal) {
      if (this.hasChosenPublish) {
        this.recommend = newVal
      } else {
        Toast('优选拍品的数量达到上限')
      }
    },
    // 取消更多设置
    cancelStep (info) {
      this.basicSetup = true
      this.advancedSettings = false
      if (info === 'next') {
        this.mreferencePrice = this.referencePrices || ''
        this.oneBitePrice = this.fixedPrice || ''
        if (
          !(this.referencePricesLow === '' && this.referencePricesUp === '')
        ) {
          if (this.referencePricesLow === '' || this.referencePricesUp === '') {
            Toast('参考价不能只填一个')
            return
          }
          if (+this.referencePricesLow >= +this.referencePricesUp) {
            Toast('价格必须由低到高排列')
          }
        }
      } else {
        if (this.openTime) {
          this.openTime = this.saveOpenTime
          this.titles = this.saveTitles
        }
        if (this.endTime) {
          this.endTime = this.saveEndTime
          this.title = this.saveTitle
        }
        this.fixedPrice = this.saveFixedPrice
        this.referencePricesLow = this.saveGj1
        this.referencePricesUp = this.saveGj2
        this.todayListSelected.startTimeSelected = this.saveSelective.todayListSelected
        this.tomorrowListSelected.startTimeSelected = this.saveSelective.tomorrowListSelected
        this.aftertomorrowListSelected.startTimeSelected = this.saveSelective.aftertomorrowListSelected
      }
    },

    // 时间相关操作start
    // 初始化时间
    checkTime () {
      let myDate = new Date() // 当前时间
      this.year = myDate.getFullYear().toString() // 年
      this.month = (myDate.getMonth() + 1).toString() // 月
      this.data = myDate.getDate().toString() // 今天
      let timeDay = this.timeInitialization(0)
      this.time.day = timeDay.month + '月' + timeDay.date + '日'
      let timeAfter = this.timeInitialization(1)
      this.time.after = timeAfter.month + '月' + timeAfter.date + '日'
      let timeTomorrow = this.timeInitialization(2)
      this.time.tomorrow = timeTomorrow.month + '月' + timeTomorrow.date + '日'
      // 如果日或者月不满十位数，前面补0
      // if (this.data.length < 2) {
      //   this.data = "0" + this.data;
      // }
      // if (this.month.length < 2) {
      //   this.month = "0" + this.month;
      // }
      // if (this.tomorrow.length < 2) {
      //   this.tomorrow = "0" + this.tomorrow;
      // }

      let hour = myDate.getHours()
      if (hour < 10) {
        this.todayList = this.todayList.slice(0)
        this.aftertomorrows = false
      } else if (hour >= 10 && hour < 12) {
        this.todayList = this.todayList.slice(1)
        this.aftertomorrowList = this.aftertomorrowList.slice(0, 1)
        this.aftertomorrows = true
      } else if (hour >= 12 && hour < 16) {
        this.todayList = this.todayList.slice(2)
        this.aftertomorrowList = this.aftertomorrowList.slice(0, 2)
        this.aftertomorrows = true
      } else if (hour >= 16 && hour < 17) {
        this.todayList = this.todayList.slice(3)
        this.aftertomorrowList = this.aftertomorrowList.slice(0, 3)
        this.aftertomorrows = true
      } else if (hour >= 17 && hour < 19) {
        this.todayList = this.todayList.slice(4)
        this.aftertomorrowList = this.aftertomorrowList.slice(0, 4)
        this.aftertomorrows = true
      } else if (hour >= 19 && hour < 20) {
        this.todayList = this.todayList.slice(5)
        this.aftertomorrowList = this.aftertomorrowList.slice(0, 5)
        this.aftertomorrows = true
      } else if (hour >= 20 && hour < 21) {
        this.todayList = this.todayList.slice(6)
        this.aftertomorrowList = this.aftertomorrowList.slice(0, 6)
        this.aftertomorrows = true
      } else if (hour >= 21 && hour < 22) {
        this.todayList = this.todayList.slice(7)
        this.aftertomorrowList = this.aftertomorrowList.slice(0, 7)
        this.aftertomorrows = true
      } else if (hour >= 22 && hour < 23) {
        this.todayList = this.todayList.slice(8)
        this.aftertomorrowList = this.aftertomorrowList.slice(0, 8)
        this.aftertomorrows = true
      } else if (hour >= 23) {
        this.aftertomorrows = true
        this.todays = false
      }
    },

    // 选择截拍时间
    chooseEndtime () {
      this.cutShot = false
      this.sectionalTime = true // 点击展开弹窗
      // this.aftertomorrows = true;
    },
    chooseTimetoday (val, index) {
      this.clearSelected() // 清除所有选中状态
      let times = this.year + '/' + this.month + '/' + this.data + ' ' + val // 拼接时间
      this.sectionalTime = false
      if (this.cutShot == true) {
        this.todayListSelected.startTimeSelected = index
        this.openTime = Date.parse(new Date(times)) / 1000
        this.titles = this.month + '月' + this.data + '日' + val
        this.judgeTime(0, val, index)
      } else {
        this.todayListSelected.endTimeSelected = index
        this.endTime = Date.parse(new Date(times)) / 1000
        this.title = this.month + '月' + this.data + '日' + val
        if (this.openTime) {
          this.Immediately()
          this.todayListSelected.startTimeSelected = -1
          this.tomorrowListSelected.startTimeSelected = -1
          this.aftertomorrowListSelected.startTimeSelected = -1
        }
      }
    },

    chooseTimetomorrow (val, index) {
      let object = this.timeInitialization(1, val)
      let times =
        object.year + '/' + object.month + '/' + object.date + ' ' + val
      this.clearSelected() // 清除所有选中状态
      this.sectionalTime = false
      if (this.cutShot == true) {
        this.tomorrowListSelected.startTimeSelected = index
        this.openTime = Date.parse(new Date(times)) / 1000
        this.titles = object.month + '月' + object.date + '日' + val
        this.judgeTime(1, val, index)
      } else {
        this.tomorrowListSelected.endTimeSelected = index
        this.endTime = Date.parse(new Date(times)) / 1000
        this.title = object.month + '月' + object.date + '日' + val
        if (this.openTime) {
          this.Immediately()
          this.todayListSelected.startTimeSelected = -1
          this.tomorrowListSelected.startTimeSelected = -1
          this.aftertomorrowListSelected.startTimeSelected = -1
        }
      }
    },

    chooseTimeaftertomorrow (val, index) {
      let object = this.timeInitialization(2, val)
      let times =
        object.year + '/' + object.month + '/' + object.date + ' ' + val
      this.clearSelected() // 清除所有选中状态
      this.sectionalTime = false
      if (this.cutShot == true) {
        this.aftertomorrowListSelected.startTimeSelected = index
        this.openTime = Date.parse(new Date(times)) / 1000
        this.titles = object.month + '月' + object.date + '日' + val
        this.judgeTime(2, val, index)
      } else {
        this.aftertomorrowListSelected.endTimeSelected = index
        this.endTime = Date.parse(new Date(times)) / 1000
        this.title = object.month + '月' + object.date + '日' + val
        if (this.openTime) {
          this.Immediately()
          this.todayListSelected.startTimeSelected = -1
          this.tomorrowListSelected.startTimeSelected = -1
          this.aftertomorrowListSelected.startTimeSelected = -1
        }
      }
    },

    // 立即开拍
    Immediately () {
      this.sectionalTime = false
      this.openTime = Date.parse(new Date()) / 1000
      this.clearSelected()
      this.isSelected = true
      this.titles = '立即开拍'
    },

    // 分类相关操作start

    // 点击分类
    chooseclassification (cid) {
      this.classification = true
    },
    // 点击分类mask部分,选择分类隐藏
    tptMask () {
      if (this.cid === '0') {
        this.classification = false
      } else if (this.scid === '0') {
        Toast('请选择分类')
      } else if (this.scid != '0' && this.cid != '0') {
        this.classification = false
        this.choseName = this.sname
      }
    },
    // 点选一级分类
    chooseOne (item, index) {
      this.name = item.name // 一级分类名字
      this.changeRed = index // 点选变色
      this.secondary = true // 展开二级菜单
      this.cid = item.id // 存一级id
    },
    // 点选二级分类
    chooseSecondary (item, indexes) {
      this.sname = item.name // 二级分类名字
      this.changeRedes = indexes // 点选变色
      this.scid = item.id // 存二级id
      this.chooseComplete()
    },
    // 点选二级分类时重选
    rechoose () {
      this.secondary = false
      this.changeRedes = ''
    },
    // 点选二级分类时完成
    chooseComplete () {
      // 二级分类如果没有选择 不关闭
      if (this.scid === '0') {
        Toast('分类不能为空')
        return
      }
      this.secondary = false
      this.classification = false
      this.choseName = this.name + '-' + this.sname
    },
    // 分类相关操作end
    // 发布
    release () {
      if (this.fixedPrice != '') {
        if (+this.fixedPrice < +this.increase) {
          Toast('一口价不能低于加价幅度')
          return false
        }
      }
      if (!this.endTime) {
        Toast('截拍时间不能为空')
        return false
      }
      if (this.isVerify) {
        if (!this.cid || !this.scid) {
          Toast('您已实名认证，请选择分类')
          return false
        }
      }
      if (this.openTime >= this.endTime) {
        Toast('开拍时间不能晚于或等于截拍时间')
        return false
      }
      if (this.isReturn == true) {
        let isReturn = 1
      } else {
        let isReturn = 0
      }
      if (this.freeShip == true) {
        let freeShip = 1
      } else {
        let freeShip = 2
      }
      let _this = this
      let params = {
        cid: _this.cid, // 一级分类
        scid: _this.scid, // 二级分类
        endTime: _this.endTime, // 截拍时间
        openTime: _this.openTime, // 开拍时间
        firstPrice: _this.firstPrice, // 起拍价
        increase: _this.increase, // 加价
        isReturn: isReturn, // 包邮
        freeShip: freeShip, // 包退
        bondPrice: _this.bondPrice, // 保证金
        fixedPrice: _this.fixedPrice, // 一口价
        gj1: _this.referencePricesLow, // 估价1
        gj2: _this.referencePricesUp, // 估价2
        status: 0
      }
      // 添加优选
      if (this.recommend) {
        params.recommend = this.recommend
      }
      let id = this.obj || localStorage.getItem('goodsId')
      // if (!this.$route.params.id) {
      // 发布
      let active = this.$route.params.active
      if (active) {
        params.active = active
        activityRelease(id, params)
          .then(res => {
            this.localClear()
            this.departFromFlag = true
            this.$router.push('/sellerCenter/extendedService')
          })
          .catch(err => {
            this.error(err)
          })
      } else {
        rejoinTheShelves(id, params)
          .then(res => {
            this.localClear()
            this.departFromFlag = true
            if (res.code == 200) {
              this.goodsId = res.data.goodsId
              Toast('发布成功')
              this.$router.push('/auction/' + this.goodsId)
            } else if (res.code > 200) {
              this.goodsId = res.data.goodsId
              this.$router.push({
                path: '/payment/cashDepositPay',
                query: { auction_id: this.goodsId, type: 0 }
              })
            }
          })
          .catch(error => {
            this.error(error)
          })
      }
    },
    // 键盘事件相关操作start
    focus (event) {
      /* 显示键盘 */
      this.showKeyboard(event)
      /* 显示光标 */
      // this.showCursor();
      /* 闪烁光标 */
      // this.blinkCursor();
      /* 遮罩层显示 */
      this.isCover = true
      /*
      @cursor 显示光标
      判断当前加价幅度有没有被遮住 已取消不用
      */
      if (event == 'firstPrice') {
        this.cursor1 = true
        this.firstPrice = this.firstPrice === 0 ? '' : this.firstPrice
        let size = this.$refs.firstPricePrice.getBoundingClientRect().bottom
      } else if (event == 'increase') {
        this.cursor2 = true
        let size = this.$refs.certRange.getBoundingClientRect().bottom
      } else if (event == 'fixedPrice') {
        this.cursor3 = true
        let size = this.$refs.fixedPrice.getBoundingClientRect().bottom
      } else if (event == 'referencePriceLow') {
        this.cursor4 = true
        let size = this.$refs.referencePrice.getBoundingClientRect().bottom
      } else if (event == 'referencePriceUp') {
        this.cursor5 = true
        let size = this.$refs.referencePrice.getBoundingClientRect().bottom
      }
    },
    blinkCursor () {
      clearInterval(this.intervalID)
      this.intervalID = setInterval(() => {
        this.cursor = !this.cursor
      }, this.cursorDuration)
    },
    unblinkCursor () {
      clearInterval(this.intervalID)
    },
    /* blur */
    blur (e) {
      /* 隐藏光标 */
      // this.hideCursor();
      /* 停止光标闪烁 */
      // this.unblinkCursor();
      /* 隐藏键盘 */
      this.hideKeyboard()
      /* 遮罩层隐藏 */
      this.coverClose = true
      this.checkValue()
      this.notify()
      this.cursor1 = false
      this.cursor2 = false
      this.cursor3 = false
      this.cursor4 = false
      this.cursor5 = false
      this.isCover = false
    },
    showKeyboard (event) {
      this.middleType = event
      this.keyboard = true // 弹出键盘
      this.val = ''
    },
    hideKeyboard () {
      this.keyboard = false
    },
    showCursor () {
      this.cursor = true
    },
    hideCursor () {
      this.cursor = false
    },
    checkValue () {
      if (parseFloat(this.val) === 0) {
        this.val = ''
      }
    },
    /* 输入 */
    typing (value) {
      /* 如果是点击删除 */
      if (value === '') {
        this.del()
      }
      /* 保存旧的值 */
      let oldValue = this.val
      /* 获取新的值 */
      this.val = this.val + value
      /* 检验新值, 如果没有通过检测, 恢复值 */
      if (!this.passCheck(this.val)) {
        this.val = oldValue
        return
      }
      /* 为了让外界同步输入, 需要发送事件 */
      this.notify()
      if (this.middleType == 'firstPrice') {
        this.firstPrice = this.val // 起拍价
      } else if (this.middleType == 'increase') {
        this.increase = this.val // 加价
      } else if (this.middleType == 'fixedPrice') {
        this.fixedPrice = this.val // 一口价
      } else {
        this.referencePrices = this.val // 参考价
      }
    },
    completion (len) {
      if (this.middleType == 'firstPrice') {
        this.firstPrice = this.val // 起拍价
      } else if (this.middleType == 'increase') {
        this.increase = this.val // 加价
      } else if (this.middleType == 'fixedPrice') {
        this.fixedPrice = this.val // 一口价
      } else if (this.middleType === 'referencePriceLow') {
        this.referencePricesLow = this.val // 参考价低
      } else {
        this.referencePricesUp = this.val // 参考价高
      }
    },
    notify () {
      // this.$emit('numInput',this.val);
      if (this.middleType == 'firstPrice') {
        this.firstPrice = this.val // 起拍价
        if (this.firstPrice == '') {
          this.firstPrice = 0
        }
      } else if (this.middleType == 'increase') {
        this.increase = this.val // 加价
        if (this.increase == '') {
          this.increase = 0
        }
      } else if (this.middleType == 'fixedPrice') {
        this.fixedPrice = this.val // 一口价
      } else if (this.middleType === 'referencePriceLow') {
        this.referencePricesLow = this.val // 参考价低
      } else {
        this.referencePricesUp = this.val // 参考价高
      }
    },
    del () {
      /* 删除值并不会触发值的校验, 所以需要手动再触发一次 */
      this.val = this.val.slice(0, -1)
      this.notify()
    },

    passCheck (val) {
      /* 验证规则 */
      let aRules = [this.illegalInput, this.illegalValue, this.accuracy]
      return aRules.every(item => {
        return item(val)
      })
    },
    illegalInput (val) {
      if (this.aIllegal.indexOf(val) > -1) {
        return false
      }
      return true
    },
    /* 非法值 */
    illegalValue (val) {
      if (parseFloat(val) != val) {
        return false
      }
      return true
    },
    /* 验证精度 */
    accuracy (val) {
      let v = val && val.split('.')
      if (v[0].length > this.inter) {
        return false
      }
      if (v[1] && v[1].length > this.decimal) {
        return false
      }
      return true
    }
    // 键盘事件相关操作start
  },
  mounted () {
    this.checkTime()
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="less">
.release .weui-actionsheet {
  max-width: 10rem;
  left: 50%;
  margin-left: -5rem;
}
.release .weui-mask_transparent {
  max-width: 10rem;
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
}
.release .fixednumMask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 111;
  max-width: 10rem;
}
.release .telsharesomething {
  position: fixed;
  left: 50%;
  top: 35%;
  z-index: 990;
  width: 90%;
  height: 400px;
  background: white;
  text-align: center;
  border-radius: 10px;
  padding-top: 20px;
  max-width: 9rem;
  margin-left: -4.55rem;
}
.release .telsharesomething .main {
  overflow: hidden;
  margin-top: 0;
}
.release .telsharesomething .sub {
  height: 88px;
  margin-top: 50px;
  padding: 0 30px;
}
.release .telsharesomething .sub span {
  display: block;
  width: 100%;
  height: 100%;
  line-height: 88px;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  font-size: 28px;
}
.release .telsharesomething .sub .spanBac {
  background: #d2d2d2;
}
.release .telsharesomething .sub .spanBack {
  background: #9e2026;
}
.release .telsharesomething .main .list {
  background-color: #fff;
  padding-left: 30px;
  height: 100px;
}
.release .telsharesomething .main .list.last .list-detail {
  border-bottom: none;
}
.release .telsharesomething .main .list .list-detail {
  border-bottom: 1px solid #d2d2d2;
  box-sizing: border-box;
  height: 101px;
  width: 100%;
  float: left;
  position: relative;
}
.release .telsharesomething .main .list p {
  line-height: 100px;
  width: 160px;
  color: #000;
  font-size: 28px;
  float: left;
}
.release .telsharesomething .main .list input {
  display: block;
  width: 75%;
  height: 90px;
  margin-top: 5px;
  color: #999;
  font-size: 24px;
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  float: left;
}
.release .telsharesomething .main .list .list-detail span {
  display: block;
  width: 174px;
  height: 60px;
  border-radius: 30px;
  background-color: #9e2026;
  line-height: 60px;
  text-align: center;
  color: #fff;
  position: absolute;
  right: 30px;
  top: 0;
  bottom: 0;
  margin: auto;
}
.referencePriceScope {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.referencePricesLow,
.referencePricesUp {
  width: 175px;
  height: 50%;
  margin-right: 25px;
  margin-left: 25px;
  border: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
}
.mCursor {
  display: inline-block;
  height: 30%;
  width: 1px;
  border-right: 2px solid black;
  box-sizing: border-box;
}
#cursor1 {
  animation: play 0.8s linear infinite;
}
@keyframes play {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.release {
  width: 100%;
  position: absolute;
  z-index: 999;
}
#release {
  height: 100%;
  overflow: hidden;
}
.release .weui-actionsheet__cell {
  height: 1.466667rem;
  line-height: 1.466667rem;
  padding: 0;
  color: #333;
  font-size: 0.4rem;
}
.release .weui-actionsheet__menu div:nth-child(2) {
  color: red;
}
.keyboardCover {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
}
.verifyIcon .iconfont {
  font-size: 0.5rem;
}
.today {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
}
.weui-textarea-counter {
  height: 10px;
}

.basic .iconfont {
  font-size: 0.5rem;
  line-height: 0.8rem;
}

.certIcon .iconfont {
  font-size: 0.5rem;
  margin: 0;
}

.categoryList .iconfont {
  font-size: 0.5rem;
}

/* 正在上传样式 */
.uploading {
  width: 200px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 111;
}

.uploadingIcon {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: white;
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
}

.uploadingIcon i {
  width: 100%;
  height: 100%;
  animation: run 0.4s linear infinite;
  font-size: 0.8rem;
  /* position: absolute; */
}

.uploadingInfo {
  width: 100%;
  height: 30%;
  position: absolute;
  bottom: 0;
  font-size: 25px;
  color: white;
  text-align: center;
}

@keyframes run {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 清除浮动的代码 */
.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}

[v-cloak] {
  display: none;
}

.btn-left {
  width: 50% !important;
  display: block !important;
}
.btn-right {
  width: 50% !important;
  float: right;
}
.van-model {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
.van-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 85%;
  font-size: 16px;
  overflow: hidden;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  border-radius: 4px;
  background-color: #fff;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
}
[class*="van-hairline"] {
  position: relative;
}
.van-cell {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding: 10px 15px;
  box-sizing: border-box;
  line-height: 24px;
  position: relative;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  overflow: hidden;
  height: 1rem;
}
.van-cell_tel {
  flex: 0.3;
}
.van-cell_code {
  flex: 0.4;
}
.van-cell:not(:last-child)::after {
  left: 15px;
  right: 0;
  width: auto;
  -webkit-transform: scale(1, 0.5);
  transform: scale(1, 0.5);
  border-bottom-width: 1px;
}
[class*="van-hairline"]::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  pointer-events: none;
  box-sizing: border-box;
}
.van-field .van-cell__title {
  line-height: 0.6rem;
}
.van-field .van-cell__value {
  position: relative;
}
.van-cell__value {
  -webkit-box-flex: 0.5;
  -webkit-flex: 0.5;
  flex: 0.5;
  text-align: right;
  vertical-align: middle;
  overflow: hidden;
  height: 100%;
  padding-left: 10px;
}
.van-field__control {
  border: 0;
  padding: 0;
  display: block;
  width: 100%;
  resize: none;
  box-sizing: border-box;
  height: 100% !important;
}
input,
button,
textarea {
  font: inherit;
}
input,
textarea,
select,
button {
  text-rendering: auto;
  color: initial;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  margin: 0em;
  font: 400 13.3333px Arial;
}
input,
textarea,
select,
button,
meter,
progress {
  -webkit-writing-mode: horizontal-tb;
}
.van-dialog__footer {
  overflow: hidden;
  height: 1rem;
}
.van-cell--center {
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 1rem;
}
.van-cell-group {
  background-color: #fff;
  border: 1px solid #e5e5e5;
}
.van-field .van-cell__title {
  line-height: 0.6rem;
  max-width: none;
}
.van-cell__text {
  vertical-align: middle;
}
.van-field--has-icon .van-field__control {
  padding-right: 20px;
  height: 100%;
}
.van-field__button {
  padding-left: 10px;
}
.van-button {
  position: relative;
  padding: 0;
  display: inline-block;
  height: 100%;
  line-height: 43px;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  text-align: center;
  -webkit-appearance: none;
  padding: 10px;
  line-height: 3px;
}
.van-button--primary {
  color: #fff;
  background-color: #4b0;
  border: 1px solid #0a0;
}
.van-button--small {
  height: 30px;
  padding: 0 8px;
  font-size: 12px;
  line-height: 28px;
}
.warn {
  width: 6.666667rem;
  height: 50px;
  background-color: #fdf6ec;
  color: #ecb96d;
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  border-radius: 20px;
  line-height: 50px;
  text-align: center;
}

.release {
  overflow: scroll;
  background-color: #f4f4f4;
  max-width: 750px;
  padding-bottom : 30px;
}
.upload {
  background-color: #f4f4f4;
  max-width: 750px;
  position: relative;
  box-sizing: border-box;
}

/*上传样式*/
.el-col {
  width: auto;
}
.el-upload--picture-card {
  width: 130px;
  height: 130px;
}

.el-upload-list--picture-card .el-upload-list__item {
  width: 130px;
  height: 130px;
  margin-right: 9px;
  margin-bottom: 9px;
}
.el-upload-list--picture-card .el-upload-list__item:nth-child(5) {
  margin-right: 0;
}
.upload .icon-untitled44,
.upload .icon-shipin {
  margin-top: 22px;
  font-size: 0.7rem;
  margin: 0;
  color: #d2d2d2;
}

.upload .editMain .el-upload--picture-card {
  background-color: #fff !important;
  border: 2px solid #d2d2d2 !important;
  line-height: 0.6rem;
  padding-top: 22px;
}
.upload .editMain .el-upload--picture-card > div {
  font-size: 20px;
  color: #d2d2d2;
}
.el-upload .el-upload-dragger {
  width: 148px;
  height: 148px;
}
.el-upload-dragger {
  width: 1.973333rem;
  height: 1.973333rem;
}
.user-button {
  border: none;
  background-color: #fff;
  line-height: 80px;
  font-size: 24px;
}

.topBanner {
  width: 100%;
  background-color: #fff;
  display: table;
}
.topBanner .btn {
  float: right;
  color: #9e2026;
  line-height: 50px;
  font-size: 32px;
  cursor: pointer;
  text-align: right;
  padding: 13px 35px;
  text-shadow: 0 0 0 #fff;
}
.topBanner .draft,
.topBanner .back {
  float: left;
  color: #999;
  text-align: left;
}
.editMain {
  width: 100%;
  margin: 11px 0 0 0;
  display: table;
  background-color: #fff;
  padding: 0px 30px 30px 30px;
  box-sizing: border-box;
}
/*.editMain .desc {
    margin: 0 10px;
    position: relative;
	}*/
.editMain .desc textarea {
  border: none;
  outline: none;
  width: 100%;
  /*padding: 10px;*/
  height: 233px;
  /*margin-top: 22px;*/
  border-bottom: 1px solid #eee; /*no*/
  font-size: 28px;
  border-radius: 4px;
  color: #333;
  font-family: PingFang-SC-Medium;
  resize: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
textarea::-webkit-input-placeholder {
  color: #999;
}
.mediaList {
  position: relative;
  padding: 15px;
}
.uploader--3pwSF {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.uploadButton--2B_RJ {
  margin-right: 0.1rem;
  /*margin-bottom: .12rem;*/
  height: 130px;
  width: 130px;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  color: #888;
  background: #eee;
  border-radius: 2px;
}
.uploadButton--2B_RJ .icon--3fJFD {
  color: #888;
  font-size: 0.56rem;
}
.uploadButton--2B_RJ.disabled--gFVy- {
  background: #eeeeee;
}
.agreeBanner {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  text-align: right;
  color: #888;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-right: 30px solid transparent;
  margin-top: 20px;
}
.agreeBanner div {
  color: #f15511;
  display: inline-block;
}
.basic {
  background-color: #fff;
  color: #333;
  margin-bottom: 8px;
}
.upload .cert {
  position: relative;
  margin-top: 20px;
  margin-left: 30px;
  font-size: 28px;
  cursor: pointer;
  height: 100px;
  line-height: 100px;
}
.border.horizonTop:after {
  left: 0;
  bottom: 0;
}
.border.horizonTop:after,
.border.horizonBottom:after {
  width: 100%;
  height: 2px;
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}
.optionalSettings .border:after {
  width: 0;
}
.cert .horizonBottom:after {
  width: 0;
}

.border:after {
  position: absolute;
  content: "";
  background-color: #e5e5e5;
}
.certIcon {
  float: right;
  height: 100px;
  line-height: 100px;
  color: #999;
  font-size: 28px;
  margin-right: 15px;
}
.upload .more {
  background-color: #fff;
  margin-left: 0;
  padding-left: 30px;
}
.upload .lihead {
  line-height: 100px;
  font-size: 32px;
  float: left;
  width: 150px;
  color: #424242;
}

.upload .numInput,
.upload .bidBzjInput,
.upload .multiWinsInput {
  float: left;
  font-family: "Helvetica neue", Verdana, Geneva, sans-serif;
  height: 100px;
  line-height: 100px;
}

.upload .numInput span,
.upload .bidBzjInput span,
.upload .multiWinsInput span {
  line-height: 46px;
  font-size: 30px;
  color: #666;
  margin: 0 10px;
}
.upload .endTimeInput {
  float: left;
  height: 100px;
  font-size: 28px;
  color: #d2d2d2;
}

/*截拍时间样式*/
.SaleDateTimePicker {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 50%;
  right: 0;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  max-width: 10rem;
}
.SaleDateTimePicker .container {
  width: 750px;
  height: 78%;
  min-height: 350px;
  padding-top: 0.3rem;
  background: #fff;
  cursor: default;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -5rem;
  overflow: scroll;
  font-family: MicrosoftYaHei;
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
  margin: 0.5rem 0.26666rem 0.26666rem 0.26666rem;
}
.SaleDateTimePicker .container .dayItem .title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 28px;
  color: #333;
  margin-left: 0.3rem;
}
.SaleDateTimePicker .container .dayItem .hourItem {
  position: relative;
  display: inline-block;
  height: 72px;
  width: 29.5%;
  font-size: 28px;
  line-height: 72px;
  margin: 0.15rem 1.9% 10px;
  border-radius: 3px;
  color: #333;
  background-color: #efefef;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
}
.SaleDateTimePicker .container .dayItem .hourItem.selected {
  background-color: #9e2026;
  color: #fff;
}
/*分类样式*/
.upload .category .tptMask {
  opacity: 0.4 !important;
}
.upload .category .tptMask {
  position: fixed;
  height: 100%;
  opacity: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #000;
  z-index: 1999;
  max-width: 10rem;
}
.upload .category .categoryBox {
  position: fixed;
  background: #fff;
  bottom: -356px;
  width: 100%;
  z-index: 1999;
  max-width: 750px;
  margin: 0 auto;
  bottom: 0;
}
.upload .category .categoryBox .categoryTitle {
  display: table;
  width: 100%;
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #e5e5e5;
}
.upload .category .categoryBox .categoryTitle .title {
  float: left;
  font-size: 28px;
  color: #333;
  margin-left: 30px;
}

.upload .category .categoryBox .categoryList .categoryItem {
  display: table;
  width: 100%;
  background-color: #fff;
  height: 100px;
  line-height: 100px;
  font-size: 28px;
  border-bottom: 1px solid #e5e5e5;
}
.upload .category .categoryBox .categoryList .categoryItem:last-child {
  border: none;
}
.upload .category .categoryBox .categoryList .categoryItem div:first-child {
  margin-left: 30px;
  margin-right: 30px;
  color: #333;
  height: 100px;
  overflow: hidden;
}

.upload .category .categoryBox .categoryList .categoryItem div .iconfont {
  color: #999;
  margin: 0;
}
/*.choose{
		color: #9e2026;
	}*/

.upload
  .category
  .categoryBox
  .categoryList
  .categoryItem
  div
  .iconfont.choose {
  color: #9e2026;
}
.upload
  .category
  .chooseSecondary
  .secondsort
  .sContent
  .sContentSort
  .smallObj {
  color: #fff;
  background-color: #9e2026;
}
.upload .category .categoryBox .categoryList .categoryItem div span {
  margin-left: 8px;
  font-size: 22px;
  color: #999;
}
.upload .chooseSecondary .secondsort {
  width: 100%;
  height: 999px;
  text-align: left;
  position: fixed;
  bottom: 0;
  background: #fff;
  z-index: 2000;
  max-width: 750px;
  margin: 0 auto;
}
.upload .chooseSecondary .secondsort .sTitle {
  height: 100px;
  line-height: 100px;
  padding: 0 30px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
}
.upload .chooseSecondary .secondsort .sTitle .sTitleLeft {
  width: 30%;
  height: 100px;
  float: left;
  font-size: 28px;
  color: #999;
}
.upload .chooseSecondary .secondsort .sTitle .sTitleRight {
  width: 30%;
  height: 100px;
  text-align: right;
  float: left;
  font-size: 28px;
  color: #9e2026;
}
.upload .chooseSecondary .secondsort .sTitle .sTitleMid {
  width: 40%;
  height: 100px;
  text-align: center;
  font-size: 28px;
  float: left;
  color: #333;
}

.upload .chooseSecondary .secondsort .sContent {
  height: 100%;
  box-sizing: border-box;
  font-size: 28px;
  padding: 0 30px;
  color: #333;
}
.upload .chooseSecondary .sContent p {
  font-size: 24px;
  margin: 73px 0 30px 0;
}
.upload .chooseSecondary .secondsort .sContentSort {
  width: 100%;
  height: 100%;
}
.upload .chooseSecondary .secondsort .sContentSort span {
  float: left;
  color: #333;
  font-size: 28px;
  width: 158px;
  height: 72px;
  line-height: 72px;
  text-align: center;
  background-color: #efefef;
  border-radius: 3px;
  margin: 0 18px 18px 0;
}
.upload .chooseSecondary .secondsort .sContentSort span:nth-child(4n) {
  margin: 0 0px 18px 0;
}

/*高级设置样式*/

.moreUpload {
  background-color: #eee;
  /* height : 100%; */
  // min-height: 1234px;
  overflow: hidden;
}
.moreUpload .topBanner {
  width: 100%;
  background-color: #fff;
  display: table;
}
.moreUpload .topBanner .btn {
  float: right;
  color: #9e2026;
  line-height: 50px;
  font-size: 32px;
  cursor: pointer;
  text-align: right;
  padding: 13px 35px;
  text-shadow: 0 0 0 #fff;
}
.moreUpload .topBanner .draft,
.topBanner .back {
  float: left;
  color: #999;
  text-align: left;
}

.moreUpload .optionalSettings {
  background-color: #fff;
  color: #333;
  margin-bottom: 8px;
}
.moreUpload .optionalTitle {
  width: 92%;
  color: #666;
  font-size: 24px;
  padding: 18px 4% 18px;
}
.moreUpload .tip {
  color: #999;
  margin: 0 30px;
  line-height: 54px;
  font-size: 25px;
}
.moreUpload .cert,
.title {
  position: relative;
  margin-left: 30px;
  font-size: 28px;
  cursor: pointer;
  height: 100px;
  line-height: 100px;
}
.moreUpload .lihead {
  line-height: 100px;
  font-size: 32px;
  float: left;
  width: 150px;
  color: #424242;
}
.moreUpload .numInput,
.moreUpload .bidBzjInput,
.moreUpload .multiWinsInput {
  float: left;
  font-family: "Helvetica neue", Verdana, Geneva, sans-serif;
  height: 100px;
  line-height: 100px;
}

.moreUpload .numInput span,
.moreUpload .bidBzjInput span,
.moreUpload .multiWinsInput span {
  line-height: 46px;
  font-size: 30px;
  color: #666;
  margin: 0 10px;
}
.moreUpload .lihead .certIcon {
  float: right;
  height: 100px;
  line-height: 100px;
  color: #6388d4;
  font-size: 28px;
  margin-right: 15px;
}
.moreUpload .more {
  background-color: #fff;
  margin-left: 0;
  padding-left: 30px;
}
.moreUpload .icon-kaiguan4 {
  color: #d32838;
  font-size: 80px;
}
.moreUpload .openTimeInput {
  float: left;
  height: 100px;
  color: #999;
  font-size: 28px;
}
.moreUpload .verifyIcon {
  float: right;
  display: block;
  margin-right: 35px;
  color: #999;
}
.moreUpload .verifyIcon .icon-renzhengyonghu {
  margin: 0;
  color: #999;
  font-size: 34px;
}

/*XSwitch样式*/
.weui-cells .weui-cell {
  padding-left: 0;
}
.moreUpload .weui-cells .vux-no-group-title {
  margin: 0;
}
.moreUpload .weui-cells {
  height: 100px;
  margin-top: 0;
}
.weui-cells:before {
  display: none;
  height: 0;
}
.weui-cells:after {
  display: none;
  height: 0;
}
.moreUpload .vux-x-switch.weui-cell_switch {
  padding-right: 30px !important;
  padding-left: 30px;
}
.moreUpload .weui-cell_switch {
  padding: 0;
  height: 100px;
}
.moreUpload .weui-cell__ft .weui-switch {
  width: 92px;
  height: 52px;
  border-radius: 35px;
}
.weui-label {
  color: #333;
  font-size: 28px;
}
.moreUpload .weui-switch:before,
.weui-switch-cp__box:before {
  width: 90px;
  height: 50px;
  border-radius: 34px;
}
.moreUpload .weui-switch:after,
.weui-switch-cp__box:after {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.moreUpload .weui-switch:checked:after,
.weui-switch-cp__input:checked ~ .weui-switch-cp__box:after {
  -webkit-transform: translateX(0.556667rem);
  transform: translateX(0.556667rem);
}
.moreUpload .weui-switch:checked {
  border-color: #d32838;
  background-color: #d32838;
}

/*Actionsheet样式*/
.moreUpload .weui-mask {
  background: rgba(0, 0, 0, 0.4);
}
.moreUpload .weui-actionsheet__cell {
  height: 110px;
  line-height: 110px;
  padding: 0;
  color: #9e2026;
  font-size: 30px;
}
.moreUpload .weui-actionsheet__cell:first-child {
  color: #333;
}

.moreUpload .weui-actionsheet__action .weui-actionsheet__cell {
  color: #999;
}
.moreUpload .weui-actionsheet__action {
  margin-top: 11px;
}

/*保证金选择*/
.moreUpload .bidpresentationList {
  -webkit-transition: height 0.15s;
  -o-transition: height 0.15s;
  transition: height 0.15s;
  height: 240px;
}

.moreUpload .bidpresentationList .presentation {
  float: left;
  width: 33%;
  height: 80px;
  display: block;
  color: #576b95;
  font-size: 24px;
  cursor: pointer;
  line-height: 80px;
  text-align: center;
}
</style>
