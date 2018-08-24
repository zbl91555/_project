import axios from 'axios';

let base;
if(process.env.NODE_ENV === 'production'){
		base = '/api';
		// base = 'http://tptapi.taopaitang.com';
}else{
   //base = 'http://taopaitang-api.test';
	 base = 'http://tptapi.taopaitang.com';
}

// ***登陆***

//手机号登陆
export const requestMobileLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
//获取微信授权签名
export const getWechatAuth = params => {
    return axios.get(`${base}/auth/weixin`, {params}).then(response => response.data);
};
//用户微信授权 登陆
export const requestWechatLogin = params => {
	return axios.get(`${base}/auth/weixin/callback`, {params: params}).then(res => res.data);
};

export const getWechatWebAuth = () => {return axios.get(`${base}/auth/weixinweb`).then(response => response.data)};
export const requestWechatWebLogin = params => {
    return axios.get(`${base}/auth/weixinweb/callback`, {params: params}).then(response => response.data)
};
//七牛上传接口 时间戳防止缓存
export const getVodSign = params => {
	return axios.get(`${base}/getVodSign?time=${new Date().getTime()}`).then(response => response.data)
};
//手机登陆
export const loginMobile = params => {
    return axios.post(`${base}/login`,params).then(response => response.data)
};
//登陆检查
export const loginCheck = () => {
	return axios.post(`${base}/loginCheck`).then(response => response.data)
};
export const getLoginMobileCode = params => {
    return axios.get(`${base}/verifyCode`,{params:params}).then(response => response.data)
};
export const refreshToken = () => {
    return axios.post(`${base}/token/refresh`).then(response=> response.data)
};

export const login = params => {
	return axios.get(`${base}/verifyCode`,{params:params}).then(response => response.data);
};
export const bindPhone = params => {
    return axios.post(`${base}/login`,params).then(response=> response.data)
};
export const refresh = () => {
    return axios.post(`${base}/token/refresh`).then(response=> response.data)
};
export const getSign = params => {
	return axios.get(`${base}/wx/getJsSign`,{params:params}).then(response => response.data);
};
export const wxPay = params => {
    return axios.post(`${base}/payment`,params).then(response=> response.data)
};
//发送验证码
export const submissionCode = params => {
	return axios.post(`${base}/code_submit`,params).then(response=> response.data)
};

// ***支付***
//商品立即支付界面
export const orderPayment = (order_id) => {
	return axios.get(`${base}/orderPayment/`+order_id).then(response => response.data);
};
//保证金支付界面
export const auctionCash = (auction_id,type) => {
	return axios.get(`${base}/auctionCash/`+auction_id+`/`+type).then(response => response.data);
};
//发起支付
export const payment = (params) => {
	return axios.post(`${base}/payment`,params).then(response => response.data);
};
//发起支付
export const notify = (gateway,params) => {
	return axios.post(`${base}/payment/`+gateway+`/notify`,params).then(response => response.data);
};
//发起支付
export const auctionPublish = (auction_id) => {
	return axios.post(`${base}/auction/`+auction_id+`/publish`).then(response => response.data);
};
//支付成功界面
export const paysuccess = (auction_id) => {
	return axios.get(`${base}/paysuccess/`+auction_id).then(response => response.data);
};
// ***首页*** 
//首页数据
export const getDiscoverList = params => {
    return axios.get(`${base}/discover`,{params: params}).then(response => response.data);
};
//优选数据
export const getRecommend = params => {
	return axios.get(`${base}/recommend`,{params: params}).then(response => response.data);
};

//***分类*** 
//分类列表
export const category = () => {
	return axios.get(`${base}/category`).then(response => response.data);
};
//获取分类详情
export const getClassfication = (id,params) => {
	return axios.get(`${base}/detail/`+id,{params:params}).then(response => response.data);
};
//关键字搜索
export const keywords = (params) => {
	return axios.get(`${base}/keywords`,{params:params}).then(response => response.data);
};
//右上角关键字搜索
export const keywordsSeach = (params) => {
	return axios.get(`${base}/keywordsSeach`,{params:params}).then(response => response.data);
};

//***个人中心***
//我的-买家个人中心首页数据接口
export const getMember = (type) => {
	return axios.get(`${base}/userCenter/type/`+type).then(response => response.data);
};
export const oneconfirmprice = params => {
    return axios.post(`${base}/auction/addPrice`,params).then(response=> response.data)
};
//***商品***
//出价
export const auctionAddPrice = (params,auction_id) => {
	return axios.post(`${base}/auction/`+auction_id+`/addPrice`,params).then(response => response.data);
};
//点赞
export const auctionFocus = (auction_id) => {
	return axios.post(`${base}/auction/`+auction_id+`/focus`).then(response => response.data);
};
//关注店铺
export const shopFocus = (seller_id) => {
	return axios.post(`${base}/shop/`+seller_id+`/focus`).then(response => response.data);
};
//取消关注
export const shopCancel = (seller_id) => {
	return axios.post(`${base}/shop/`+seller_id+`/cancel`).then(response => response.data);
};
//判断有没有投诉
export const hascomplaint = (auction_id) => {
	return axios.get(`${base}/complaint/`+auction_id).then(response => response.data);
};
//投诉提交
export const saveComplaint = (params,id) => {
    return axios.post(`${base}/complaint/`+id,params).then(response=> response.data)
};
//商品详情二维码
export const commodityDetailsQRCode = params => {
	return axios.get(`${base}/share/auctionCode/` + params).then(response=> response.data)
};

// ***推广有礼*** 
//推广有礼首页
export const reward = () => {
	return axios.get(`${base}/reward`).then(response => response.data);
};
//我的铁粉
export const rewardMember = () => {
	return axios.get(`${base}/reward/member`).then(response => response.data);
};
//我的铁粉列表
export const rewardMemberList = params => {
	return axios.get(`${base}/reward/memberList`,{params:params}).then(response => response.data);
};
//奖金明细
export const rewardBonus = () => {
	return axios.get(`${base}/reward/bonus`,{}).then(response => response.data);
};
//奖金明细列表
export const rewardBonusList = (type,params) => {
	return axios.get(`${base}/reward/bonusList/`+type,{params:params}).then(response => response.data);
};
//推广有礼二维码
export const rewardCode = () => {
	return axios.get(`${base}/share/code`).then(response => response.data);
};
//推广有礼申请提现界面
export const rewardWithdrawal = () => {
	return axios.get(`${base}/reward/withdrawal`).then(response => response.data);
};
//推广有礼申请提现提交申请
export const rewardWithdrawalSubmit = (params) => {
	return axios.post(`${base}/reward/withdrawal`,params).then(response => response.data);
};

//放弃支付
export const companyDelete = () => {
	return axios.delete(`${base}/company/delete`).then(response => response.data);
};

// ***钱包*** 

//余额首页
export const wallet = (type) => {
	return axios.get(`${base}/wallet/index/`+type).then(response => response.data);
};
//余额明细
export const walletDetail = params => {
	return axios.get(`${base}/wallet/detail`,{params:params}).then(response => response.data);
};
//余额明细
export const walletShow = (id) => {
	return axios.get(`${base}/wallet/show/`+id).then(response => response.data);
};
//提现页面
export const walletWithdrawal = () => {
	return axios.get(`${base}/wallet/withdrawal`).then(response => response.data);
};
//提现申请
export const walletWithdrawalSubmit = (params) => {
	return axios.post(`${base}/wallet/withdrawalSubmit`,params).then(response => response.data);
};
//重置密码
export const walletResetpwd = params => {
    return axios.post(`${base}/wallet/resetpwd`,params).then(response=> response.data)
};
//忘记密码
export const walletForgetpwdSubmit = params => {
    return axios.post(`${base}/wallet/forgetpwd`,params).then(response=> response.data)
};
//开通余额页面
export const walletOpen = () => {
	return axios.get(`${base}/wallet/open`).then(response => response.data);
};
//开通余额提交
export const walletOpenSubmit = (params) => {
	return axios.post(`${base}/wallet/open`,params).then(response => response.data);
};

//***买家中心足迹***
//足迹
export const footer = (params) => {
	return axios.get(`${base}/footer`,{params:params}).then(response => response.data);
};
//关注店铺列表
export const footerFocus = (params) => {
	return axios.get(`${base}/focus`,{params:params}).then(response => response.data);
};
//关注店铺  取消关注
export const cancelFocus = (sellerId,type) => {
	return axios.post(`${base}/shop/`+sellerId+'/'+type).then(response => response.data);
};

//围观拍品
export const watch = (params) => {
	return axios.get(`${base}/watch`,{params:params}).then(response => response.data);
};
//参拍拍品
export const join = (params) => {
	return axios.get(`${base}/join`,{params:params}).then(response => response.data);
};

//***订单***
//订单列表
export const order = params => {
	return axios.get(`${base}/order`,{params:params}).then(response => response.data);
}
//买家卖家查看所有订单
export const getSellerOrders = (order_id,params) => {
	return axios.get(`${base}/order/`+order_id+`/getSellerOrders`,{params:params}).then(response => response.data);
}

//售后订单列表
export const afterSale = params => {
	return axios.get(`${base}/order_index`,{params:params}).then(response => response.data);
}

//订单详情
export const orderShow = (order_id) => {
	return axios.get(`${base}/order/`+order_id).then(response => response.data);
};
//拒绝当面交易
export const orderRefuseFace = (order_id) => {
	return axios.post(`${base}/order/`+order_id+`/refuseFace`).then(response => response.data);
};
//买家延期收货
export const orderDelayGoods = (order_id) => {
	return axios.post(`${base}/order/`+order_id+`/delayGoods`).then(response => response.data);
};
//买家拒绝收货
export const orderRefuseGoods = (order_id) => {
	return axios.post(`${base}/order/`+order_id+`/refuseGoods`).then(response => response.data);
};
//当面交易
export const orderTransaction = (order_id) => {
	return axios.post(`${base}/order/`+order_id+`/transaction`).then(response => response.data);
};
//延期付款
export const orderPaylater = (order_id) => {
	return axios.post(`${base}/order/`+order_id+`/paylater`).then(response => response.data);
};
//确认收货
export const orderConfirmGoods = (order_id) => {
	return axios.post(`${base}/order/`+order_id+`/confirmGoods`).then(response => response.data);
};
//立即退货页面
export const orderReturnGoodsNow = (order_id) => {
	return axios.get(`${base}/order/`+order_id+`/returnGoodsNow`).then(response => response.data);
};
//立即退货
export const orderReturnGoodsNowSubmit = (order_id,params) => {
	return axios.post(`${base}/order/`+order_id+`/returnGoodsNow`,params).then(response => response.data);
};
//立即发货页面
export const orderDeliverGoods = (order_id) => {
	return axios.get(`${base}/order/`+order_id+`/deliverGoods`).then(response => response.data);
};
//立即发货
export const orderDeliverGoodsSubmit = (order_id,params) => {
	return axios.post(`${base}/order/`+order_id+`/deliverGoods`,params).then(response => response.data);
};
//评价页面
export const orderComment = (order_id) => {
	return axios.get(`${base}/order/`+order_id+`/comment`).then(response => response.data);
};
//立即评价
export const orderCommentSubmit = (order_id,params) => {
	return axios.post(`${base}/order/`+order_id+`/comment`,params).then(response => response.data);
};
//评价详情
export const orderCommentShow = (order_id) => {
	return axios.get(`${base}/order/`+order_id+`/commentShow`).then(response => response.data);
};
//卖家同意退款
export const orderAgreeRefund = (order_id) => {
	return axios.get(`${base}/order/`+order_id+`/agreeRefund`).then(response => response.data);
};
//卖家同意退款提交
export const orderAgreeRefundSubmit = (order_id) => {
	return axios.post(`${base}/order/`+order_id+`/agreeRefund`).then(response => response.data);
};
//卖家同意退货
export const orderReturnGoods = (order_id) => {
	return axios.get(`${base}/order/`+order_id+`/returnGoods`).then(response => response.data);
};
//卖家同意退货提交
export const orderReturnGoodsSubmit = (params,order_id) => {
	return axios.post(`${base}/order/`+order_id+`/returnGoods`,params).then(response => response.data);
};

//卖家同意退货退款
export const confirmReceipt = (order_id) => {
	return axios.get(`${base}/order/`+order_id+`/confirmReceipt`).then(response => response.data);
};
//卖家同意退货退款提交
export const confirmReceiptSubmit = (order_id) => {
	return axios.post(`${base}/order/`+order_id+`/confirmReceipt`).then(response => response.data);
};

//申请退款
export const orderRefund = (order_id,memberType,type) => {
	return axios.get(`${base}/order/`+order_id+`/`+memberType+`/`+type+`/refund`).then(response => response.data);
};
//申请退款提交
export const orderRefundSubmit = (order_id,memberType,type,params) => {
	return axios.post(`${base}/order/`+order_id+`/`+memberType+`/`+type+`/refund`,params).then(response => response.data);
};

//关注页面
export const focusorder = (params) => {
	return axios.get(`${base}/subscribe`,{params:params}).then(response => response.data);
};

//查看物流
export const orderExpress = (order_id,params) => {
	return axios.get(`${base}/order/`+order_id+`/express`,{params:params}).then(response => response.data);
};
//获取更多物流
export const getExpress = () => {
	return axios.get(`${base}/order/getExpress`).then(response => response.data);
};

//***報表***
//***小二介入***
//小二介入页面
export const platformView = (order_id) => {
	return axios.get(`${base}/platform/`+order_id).then(response => response.data);
};
//小二介入  
export const platformApply = (order_id,params) => {
	return axios.post(`${base}/platform/apply/`+order_id,params).then(response => response.data);
};
//撤销介入
export const platformCancel = (order_id) => {
	return axios.put(`${base}/platform/cancel/`+order_id).then(response => response.data);
};

//***卖家拍品管理***
//列表
export const getstore = params => {
	return axios.get(`${base}/manage`,{params:params}).then(response => response.data);
};
//批量删除
export const somedown = params => {
    return axios.post(`${base}/manage/popDel`,params).then(response=> response.data)
};
//单个删除
export const singledelete = (id) => {
    return axios.delete(`${base}/manage/delete/`+id).then(response=> response.data)
};
//置顶
export const ToTop = (e) => {
	return axios.put(`${base}/manage/top/`+e).then(response => response.data);
};
//批量上传
export const confirmup = params => {
    return axios.post(`${base}/manage/popUp`,params).then(response=> response.data)
};
//隐藏显示
export const swichhide = (params,e) => {
	return axios.put(`${base}/manage/handle/`+e,params).then(response => response.data);
};
//下架
export const singledown = (e) => {
	return axios.put(`${base}/manage/out/`+e).then(response => response.data);
};

//***消保金***
export const pay = () => {
	return axios.get(`${base}/deposit`).then(response => response.data);
};
//消保金提现页面
export const depositWithdrawView = () => {
	return axios.get(`${base}/deposit/tiXian`).then(response => response.data);
};
//消保金提现
export const depositWithdraw = (params) => {
	return axios.post(`${base}/deposit/tiXian`,params).then(response => response.data);
};
export const consumerSecurity = () => {
	return axios.get(`${base}/deposit`).then(response => response.data);
};
//***实名认证***
////实名认证首页
export const companyView = () => {
	return axios.get(`${base}/company`).then(response => response.data);
};
//个人实名认证支付
export const companySelect = () => {
	return axios.get(`${base}/company/select`).then(response => response.data);
};

//认证操作返回店铺名称
export const CompanyViewPage = () => {
	return axios.get(`${base}/company/apply`).then(response => response.data);
};
//认证操作
export const CompanyPerson = (params) => {
	return axios.post(`${base}/company/apply`,params).then(response => response.data);
};


//***********报表**************
export const seller_report = params => {
	return axios.get(`${base}/report/shop`,{params:params}).then(response => response.data);
};
//对账单页面
export const orderCheck = params => {
	return axios.get(`${base}/report/check`).then(response => response.data);
};
//对账单查询
export const orderList = params => {
	return axios.post(`${base}/report/check`,params).then(response => response.data);
};


//***个人信息修改设置***
//卖家中心店铺设置页面
export const getSellerUserInfo = () => {
	return axios.get(`${base}/userCenter/sellerInfo`).then(response => response.data);
};
//卖家信息
export const storeInfo = (e) => {
	return axios.get(`${base}/sellerIndex/`+e).then(response => response.data);
};
//买家信息
export const userIndex = (e) => {
	return axios.get(`${base}/userIndex/`+e).then(response => response.data);
};
//个性签名
export const sendSigned = params => {
	return axios.put(`${base}/setting/signature`,params).then(response => response.data);
};
//微信号
export const sendWeChat = params => {
	return axios.put(`${base}/setting/wechat`,params).then(response => response.data);
};
//设置我的
export const switchBtn = params => {
	return axios.put(`${base}/setting/setmylink`,params).then(response => response.data);
};
//出价条件
export const bidSave = params => {
	return axios.put(`${base}/setting/bidder`,params).then(response => response.data);
};
//联系人
export const sendContact = params => {
	return axios.put(`${base}/setting/contract`,params).then(response => response.data);
};
//买家设置
export const SettingInfo = () => {
	return axios.get(`${base}/setting`).then(response => response.data);
};
//修改昵称
export const sendnickName = (params) => {
	return axios.put(`${base}/setting/name`,params).then(response => response.data);
};
//拍品管理 上架
export const grounding = (params) => {
	return axios.get(`${base}/manage/putAway/`+params).then(response => response.data);
};
//消息信息获取
export const groupsentMessage = (params) => {
	return axios.get(`${base}/userCenter/groupShareData?page=`+params.page+'&pagenum='+params.pagenum).then(response => response.data);
};
//消息群发
export const messageGroup = params => { 	
	return axios.post(`${base}/userCenter/groupShare`,{auction_all_id:params}).then(response=> response.data)
};
//分享群发
export const wxShare = params => { 	
	return axios.put(`${base}/userCenter/getShare`,{auction_id : params}).then(response=> response.data);
};

// ***店铺首页***
//店铺首页头部
// export const storehomeusermsg = (e) => {
// 	return axios.get(`${base}/storeTop/`+e).then(response => response.data);
// };
//首页优选
// export const storeyouxuan = (e) => {
// 	return axios.get(`${base}/auctionYouxuan/`+e).then(response => response.data);
// };
//预展拍品
export const storeyuzhan = (user_id,params) => {
	return axios.get(`${base}/storeIndex/`+user_id,{params}).then(response => response.data);
};

//店铺拍品
export const useinfo = (params,e) => {
	return axios.get(`${base}/storeAuction/`+e,{params:params}).then(response => response.data);
};
//店铺二维码
export const ShopTwoDimensionalCode = (params) => {
	return axios.get(`${base}/share/shopCode/`+params).then(response => response.data);
};

//***优惠券***
export const getUnused = params => {
	return axios.get(`${base}/coupon`,{params:params}).then(response => response.data);
};

//***发布产品、存草稿***

//***地址***
// 地址删除
export const delAddress = params => {
	return axios.delete(`${base}/address/`+params).then(response=> response.data)
};
// 地址添加
export const handleAddressAdd = params => {
	return axios.post(`${base}/handleAddress`,params).then(response=> response.data)
};
// 地址编辑
export const handleAddressEdit = (params,id) => {
	return axios.put(`${base}/handleAddress/`+id,params).then(response=> response.data)
};
// 地址列表 时间戳防止缓存
export const addressList = params => {
return axios.get(`${base}/address?time` + new Date().getTime(),{params:params}).then(response => response.data);
};
// 编辑页面
export const updateView = (e) => {
return axios.get(`${base}/updateView/`+e).then(response => response.data);
};
// 设为默认地址
export const defaults = (e,type) => {
return axios.put(`${base}/address/`+e+'?type='+type).then(response => response.data);
};

export const userAddress = () => {
return axios.get(`${base}/updateView/`).then(response => response.data);
};
export const getbasicAllInfo = () => {
	return axios.get(`${base}/userCenter/userInfo`).then(response => response.data);
}


export const getFocusList = (params) => {
	return axios.get(`${base}/user_focus_shop_list/`,{params:params}).then(response => response.data);
};
export const filterNum = params => {
	return axios.get(`${base}/verifyCode`,{params:params}).then(response => response.data);
};
export const subMethod = params => {
    return axios.post(`${base}/code_submit`,params).then(response=> response.data)
};


//我的-卖家个人中心首页数据接口
export const bidConditions = () => {
	return axios.get(`${base}/setting/bidder`).then(response => response.data);
};

//粉丝列表
export const fanInfos = params => {
	return axios.get(`${base}/userCenter/fans`,{params:params}).then(response => response.data);
};

//屏蔽
// export const shielduseruserAdd = (e) => {
// 	return axios.get(`${base}/userAddShield/`+e).then(response => response.data);
// };
// export const shielduseruserCancel = (e) => {
// 	return axios.get(`${base}/userCancelShield/`+e).then(response => response.data);
// };
//屏蔽或取消屏蔽
export const shielduser = (user_id,params) => {
	return axios.post(`${base}/setting/shield/`+user_id,params).then(response => response.data);
};
// export const cancelshielduser = (e) => {
// 	return axios.get(`${base}/userCancelShield/`+e).then(response => response.data);
// };
// export const canselShielding = (e) => {
// 	return axios.get(`${base}/userCancelShield/`+e).then(response => response.data);
// };
//屏蔽用户
export const shieldList = (params) => {
	return axios.get(`${base}/userCenter/shieldList`,{params:params}).then(response => response.data);
};
//身份验证
export const identityCheck = (params) => {
	return axios.post(`${base}/userCenter/identityCheck`,params).then(response => response.data);
};
//修改身份信息
export const updateIdentityCheck = (params) => {
	return axios.post(`${base}/userCenter/updateIdentityCheck`,params).then(response => response.data);
};

//买家头像->已关注店铺列表
export const user_focusShopList = params => {
	return axios.get(`${base}/focus`,{params:params}).then(response => response.data);
};

//更換头像
export const changeTheHeadImage = params => {
	return axios.post(`${base}/setting/avatar?avatar=` + params).then(response => response.data);
};

export const getSellerDate = params => {
	return axios.get(`${base}/user`,{params:params}).then(response => response.data);
};




//我的文件夹下所有结束

export const usermsg = (e) => {
	return axios.get(`${base}/auction/`+e).then(response => response.data);
};
export const getmsg = params => {
	return axios.get(`${base}/wx/getJsSign`,{params:params}).then(response => response.data);
};


export const chosen = params => {
	return axios.get(`${base}/chosen`,{params:params}).then(response => response.data);
};

//活动发布
export const activityRelease = (id,params) => {
	return axios.post(`${base}/publish/`+ id + '/thanka',params).then(response=> response.data);		
};
//唐卡活动数据获取
export const getThanka = (type,params) => {
	return axios.get(`${base}/thanka/` + type,{params}).then(response => response.data);
};
//唐卡活动发布入口
export const isOpenRelease = () => {
	return axios.get(`${base}/active/state`).then(response => response.data);
};
//唐卡活动页面进入入口
export const openActivity = () => {
	return axios.get(`${base}/advertised`).then(response => response.data);
};

export const getPublishStep1 = (id) => {
	if (id) {
		return axios.get(`${base}/publish/step1/` + id).then(response => response.data);
	}else  {
		return axios.get(`${base}/publish/step1`).then(response => response.data);
	}
}
export const getPublishStep2 = (id,params) => {
	return axios.get(`${base}/publish/step2/` + id,{params}).then(response => response.data);
}
export const myUpload = params => {
	return axios.get(`${base}/getUpSign`,{params:params}).then(response => response.data);
};

//存草稿 下一步
export const saveDraft = (params,id) => {
    if (id) {
			return axios.post(`${base}/publish/`+id,params).then(response=> response.data);
		}else {
			return axios.post(`${base}/publish`,params).then(response=> response.data);
		}
};
//重新上架
export const rejoinTheShelves = (id,params) => {
	return axios.put(`${base}/publish/`+ id,params).then(response=> response.data);
};
export const getUpSign = params => {
	return axios.get(`${base}/getUpSign`,{params:params}).then(response => response.data);
};

//home结束


//获取店铺列表
export const getShopList = (auctionId,sellerId) => {
	return axios.get(`${base}/auction/`+auctionId+`/other/`+sellerId).then(response => response.data);
};

//私信
export const getTimLoginInfo = () => {
	return axios.get(`${base}/tim/getSign`).then(response => response.data);
}

//获取私信用户信息
export const getFriend = (parmas) => {
	return axios.post(`${base}/tim/getFriend/`+parmas).then(response => response.data);
}

//买家设置地区城市
export const settingCity = (params) => {
	return axios.put(`${base}/setting/city`,params).then(response => response.data);
}

