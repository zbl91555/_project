<template>
  <div>
    <div class="title">私信消息
      <div class="icon-wendang iconfont"></div>
      <div class="icon-gengduo iconfont"></div>
    </div>
    <div class="content">
      <div class="answer clear">
        <img src="../../assets/1.png" alt="头像" class="title">
        <div></div>
        <p>请问有什么需要帮助的嘛</p>
      </div>
      <div class="question clear">
        <img src="../../assets/1.png" alt="头像" class="title">
        <div></div>
        <p>请问有什么需要帮助的嘛</p>
      </div>
      <div class="question clear">
        <img src="../../assets/1.png" alt="头像" class="title">
        <img src="../../assets/logo.png" alt="图片" class="image" @click="getLastC2CHistoryMsgs">
      </div>
      <div class="answer clear" @click="onSendMsg">
        <img src="../../assets/1.png" alt="头像" class="title">
        <img src="../../assets/5.png" alt="图片" class="image">
      </div>
    </div>
    <div class="footer">
      <form><input type="text" v-model="value"></form>
     <!--  <div class="icon-icon02 iconfont"></div>
      <div class="icon-xiaolian iconfont"></div> -->
    </div>
  </div>
</template>

<script>
import webim from 'webim'
import {getTimLoginInfo} from '../../api/api'

export default {
  data () {
    return {
      loginInfo: '',
      selType: webim.SESSION_TYPE.C2C, // 当前聊天类型
      selToID: 14, // 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
      selSess: null, // 当前聊天会话对象
      recentSessMap: null, // 保存最近会话列表
      reqRecentSessCount: 50, // 每次请求的最近会话条数，业务可以自定义
      friendHeadUrl: '', // 用于没有设置过头像的好友 默认头像
      infoMap: '', // 初始化时，可以先拉取我的好友和我的群组信息
      emotionFlag: false, // 是否打开过表情选择框
      curPlayAudio: null, // 当前正在播放的audio对象
      getPrePageC2CHistroyMsgInfoMap: {}, // 保留下一次拉取好友历史消息的信息
      isLogOn: false, // 是否开启sdk在控制台打印日志
      isAccessFormalEnv: true, // 是否访问正式环境
      msgCache: {} // 消息缓存，用于判重
    }
  },
  created () {
    getTimLoginInfo().then(response => {
      this.loginInfo = response.data
      console.log(this.loginInfo)
    })
  },
  methods: {
    onSendMsg () {
      if (!this.selToID) {
        alert('你还没有选中好友或者群组，暂不能聊天')
        $('#send_msg_text').val('')
        return
      }
      // 获取消息内容
      var msgtosend = this.value
      var msgLen = webim.Tool.getStrBytes(msgtosend)
      if (msgtosend.length < 1) {
        alert('发送的消息不能为空!')
        $('#send_msg_text').val('')
        return
      }
      var maxLen, errInfo
      if (this.selType == webim.SESSION_TYPE.C2C) {
        maxLen = webim.MSG_MAX_LENGTH.C2C
        errInfo = '消息长度超出限制(最多' + Math.round(maxLen / 3) + '汉字)'
      } else {
        maxLen = webim.MSG_MAX_LENGTH.GROUP
        errInfo = '消息长度超出限制(最多' + Math.round(maxLen / 3) + '汉字)'
      }
      if (msgLen > maxLen) {
        alert(errInfo)
        return
      }
      if (!this.selSess) {
        var selSess = new webim.Session(this.selType, this.selToID, this.selToID, this.friendHeadUrl, Math.round(new Date().getTime() / 1000))
      }
      var isSend = true// 是否为自己发送
      var seq = -1// 消息序列，-1表示 SDK 自动生成，用于去重
      var random = Math.round(Math.random() * 4294967296)// 消息随机数，用于去重
      var msgTime = Math.round(new Date().getTime() / 1000)// 消息时间戳
      var subType// 消息子类型
      if (this.selType == webim.SESSION_TYPE.C2C) {
        subType = webim.C2C_MSG_SUB_TYPE.COMMON
      } else {
        // webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
        // webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
        // webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
        // webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
        subType = webim.GROUP_MSG_SUB_TYPE.COMMON
      }
      var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, this.loginInfo.identifier, subType, this.loginInfo.identifierNick)
      var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex
      // 解析文本和表情
      var expr = /\[[^[\]]{1,3}\]/mg
      var emotions = msgtosend.match(expr)
      if (!emotions || emotions.length < 1) {
        text_obj = new webim.Msg.Elem.Text(msgtosend)
        msg.addText(text_obj)
      } else {
        for (var i = 0; i < emotions.length; i++) {
          tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]))
          if (tmsg) {
            text_obj = new webim.Msg.Elem.Text(tmsg)
            msg.addText(text_obj)
          }
          emotionIndex = webim.EmotionDataIndexs[emotions[i]]
          emotion = webim.Emotions[emotionIndex]
          if (emotion) {
            face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i])
            msg.addFace(face_obj)
          } else {
            text_obj = new webim.Msg.Elem.Text(emotions[i])
            msg.addText(text_obj)
          }
          restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length
          msgtosend = msgtosend.substring(restMsgIndex)
        }
        if (msgtosend) {
          text_obj = new webim.Msg.Elem.Text(msgtosend)
          msg.addText(text_obj)
        }
      }
      let _this = this
      webim.sendMsg(msg, function (resp) {
        if (_this.selType == webim.SESSION_TYPE.C2C) { // 私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
          // addMsg(msg);

        }
        webim.Tool.setCookie('tmpmsg_' + _this.selToID, '', 0)
        $('#send_msg_text').val('')
        // turnoffFaces_box();
      }, function (err) {
        alert(err.ErrorInfo)
        $('#send_msg_text').val('')
      })
    },

    getLastC2CHistoryMsgs () {
      let ni = webim.MsgStore.sessByTypeId(this.selType, this.selToID)
      console.log(3232323)
      console.log(ni)
      console.log(32233233)
    }
    //   var lastMsgTime=0;
    //   var msgKey='';
    //   var options={
    //     'Peer_Account': this.selToID,
    //     'MaxCnt':1,
    //     // 'LastMsgTime': .LastMsgTime,
    //     // 'MsgKey': resp.MsgKey
    //   };
    //   webim.getC2CHistoryMsgs(
    //     options,
    //     resp=>{
    //       console.log('成功')
    //       console.log(resp);
    //       console.log(2333);
    //     },cbError=>{
    //       console.log('失败')
    //     console.log(cbError);
    //     console.log(2332)
    //   })
    // }
  }
}
</script>

<style scoped lang="less">
.clear:after{
  content:"";
  display: block;
  clear:both;
}
.title{
  height: 80px;
  background: #fff;
  text-align: center;
  line-height: 80px;
  font-size:32px;
  border-bottom:2px solid rgb(229,229,229);
  .iconfont{
    position:absolute;
    top:-6px;
    display:none;
  }
  .iconfont:first-child{
    right:100px;
  }
  .iconfont:last-child{
    right:30px;
  }
}
.content{
  margin-bottom:120px;
  .answer{
    font-size: 0;
    padding: 24px 30px;
    .title{
      float: left;
      width: 80px;
      margin-right: 20px;
    }
    .image{
      float:left;
      border-radius:8px;
    }
    div{
      float: left;
      width: 20px;
      height: 20px;
      border-top:2px solid rgb(210,210,210);
      border-left:2px solid rgb(210,210,210);
      transform: rotate(-45deg);
      background: #fff;
      margin-right:-10px;
      margin-top: 32px;
    }
    p{
      font-size: 32px;
      float: left;
      border: 2px solid rgb(210,210,210);
      border-radius: 8px;
      padding: 20px 28px;
      color: rgb(48,49,53);
      background: #fff;
      margin-top: -6px;
    }
  }
  .question{
    font-size: 0;
    padding: 24px 30px;
    .title{
      float: right;
      width: 80px;
      margin-left: 20px;
    }
    .image{
      float:right;
      border-radius:8px;
    }
    div{
      float: right;
      width: 20px;
      height: 20px;
      border-top:2px solid rgb(210,210,210);
      border-left:2px solid rgb(210,210,210);
      transform: rotate(135deg);
      background: #fff;
      margin-left:-10px;
      margin-top: 32px;
    }
    p{
      font-size: 32px;
      float: right;
      border: 2px solid rgb(210,210,210);
      border-radius: 8px;
      padding: 20px 28px;
      color: rgb(48,49,53);
      background: #fff;
      margin-top: -6px;
    }
  }
}
.footer{
  position: fixed;
  z-index:1000;
  width: 100%;
  max-width:10rem;
  bottom: 0;
  margin:0 auto;
  height: 100px;
  background:rgb(244,244,244);
  border-top:2px solid rgb(210,210,210);
  padding-left: 30px;
  line-height: 100px;
  box-sizing:border-box;
  input{
    padding-left:20px;
    width: 64%;
    height: 60px;
    outline: none;
    font-size:32px;
  }
  .iconfont{
    float:right;
    margin-right:30px;
    font-size:60px;
    margin-top:-2px;
  }
}
</style>
