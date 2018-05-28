/**
 * @file
 * Created by zhong on 16/10/15.
 */

const Home = r => require(['../views/home/home'], r);
const Home_temp = r => require(['../views/home/home_temp'], r);
const Category = r => require(['../views/category/category'], r);
const Catelist = r => require(['../views/category/catelist'], r);
const Brand = r => require(['../views/category/brand'], r);
const BrandGoods = r => require(['../views/category/brandgoods'], r);
const Temp = r => require(['../views/commission'], r);
const Cart = r => require(['../views/cart/cart'], r);
const Settlement = r => require(['../views/cart/settlement'], r);
const Hello = r => require(['../views/hello'], r);
const Diy = r => require(['../views/diy'], r);
//article
const Notice = r => require(['../views/article/notice'], r);
const ArticleContent = r => require(['../views/article/articleContent'], r);

//Member
const Member = r => require(['../views/member/member'], r);
const Po = r => require(['../views/member/po'], r);
const Tabs = r => require(['../views/member/tabs'], r);
const Info = r => require(['../views/member/info/info'], r);
const Editmobile = r => require(['../views/member/info/member_editmobile'], r);
const AlterAddress = r => require(['../views/member/address/alterAddress'], r);
const AppendAddress = r => require(['../views/member/address/appendAddress'], r);
const Balance = r => require(['../views/member/balance/member_balance'], r);
const Integral = r => require(['../views/member/integral/member_integral'], r);
//member_integraldetailed
const Integraldetail = r => require(['../views/member/integral/member_integraldetailed'], r);
const IntegralList = r => require(['../views/member/integral/member_integrallist'], r);
const Balance_recharge = r => require(['../views/member/balance/member_balance_recharge'], r);
const Balance_transfer = r => require(['../views/member/balance/member_balance_transfer'], r);
const Balance_withdrawals = r => require(['../views/member/balance/member_balance_withdrawals'], r);
const Detailed = r => require(['../views/member/balance/member_balance_detailed'], r);
const Screen = r => require(['../views/member/balance/member_balance_screen'], r);
const Details = r => require(['../views/member/balance/member_balance_details'], r);
const Income = r => require(['../views/member/income/member_income'], r);
const Withdrawal = r => require(['../views/member/income/member_income_withdrawal'], r);
const Incomedetails = r => require(['../views/member/income/member_income_incomedetails'], r);
const IncomedetailsInfo = r => require(['../views/member/income/member_income_incomedetails_info'], r);
const PresentationRecord = r => require(['../views/member/income/member_income_presentationRecord'], r);
const PresentationDetails = r => require(['../views/member/income/member_income_presentationRecord_presentationDetails'], r);
const Supplier = r => require(['../views/member/supplier/supplier'], r);



//order
//order_after_express_info
const OrderExpress = r => require(['../views/member/order/order_after_express_info'], r);
const OrderList = r => require(['../views/member/order/order_list'], r);
const Goodsinfo = r => require(['../views/member/order/order_detail'], r);
const Refund = r => require(['../views/member/order/order_list_refund'], r);
const Logistics = r => require(['../views/member/order/order_list_logistics'], r);
const Evaluate = r => require(['../views/comment/evaluate'], r);
const ReplyEvaluate = r => require(['../views/member/order/order_list_replyEvaluate'], r);
const Addevaluate = r => require(['../views/comment/addevaluate'], r);
const Aftersales = r => require(['../views/member/order/order_aftersales'], r);
const Aftersaleslist = r => require(['../views/member/order/order_aftersaleslist'], r);
const OrderPay = r => require(['../views/member/order/order_payment'], r);

const PayErr = r => require(['../views/member/order/order_payErr'], r);
const PayYes = r => require(['../views/member/order/order_payYes'], r);
const Blacklist = r => require(['../views/member/order/order_blacklist'], r);
const Mandate = r => require(['../views/member/order/order_mandate'], r);
//Extension
const Manage = r => require(['../views/extension/manage'], r);
const Extension = r => require(['../views/extension/index'], r);
const Distribution = r => require(['../views/extension/distribution'], r);
const Commission = r => require(['../views/extension/commission'], r);
const CommissionDetails = r => require(['../views/extension/commissionDetails'], r);
const Unsettled = r => require(['../views/extension/unsettled'], r);
const UnsettledDetails = r => require(['../views/extension/unsettledDetails'], r);
const AlreadySettled = r => require(['../views/extension/alreadySettled'], r);
const AlreadySettledDetails = r => require(['../views/extension/alreadySettledDetails'], r);
const NotPresent = r => require(['../views/extension/notPresent'], r);
const NotPresentDetails = r => require(['../views/extension/notPresentDetails'], r);
const Present = r => require(['../views/extension/present'], r);
const PresentDetails = r => require(['../views/extension/presentDetails'], r);
const DistributionOrder = r => require(['../views/extension/distributionOrder'], r);
//plug
const Marketing = r => require(['../views/member/plug/marketing'], r);
const MessageSettings = r => require(['../views/member/plug/messageSettings'], r);
//income
const DistributionCommission = r => require(['../views/member/income/distributionCommission'], r);
const ExtendIncome = r => require(['../views/member/income/extendIncome'], r);//new
const MerchantsDividendRatio = r => require(['../views/member/income/merchants/merchants_dividend_ratio'], r);
const ShareholderCenter = r => require(['../views/member/income/shareholderCenter/shareholderCenter'], r);
const TeamAgentCenter = r => require(['../views/member/income/teamAgentCenter/teamAgentCenter'], r);
const TeamCode = r => require(['../views/member/income/teamAgentCenter/teamCode'], r);
const CodeHistory = r => require(['../views/member/income/teamAgentCenter/codeHistory'], r);
const InvestmentCenter = r => require(['../views/member/income/investmentCenter/investmentCenter'], r)
const RegionalAgencyCenter = r => require(['../views/member/income/regionalAgencyCenter/regionalAgencyCenter'], r);
const ApplyRegionalAgency = r => require(['../views/member/income/regionalAgencyCenter/applyRegionalAgency'], r);


// microshop
const MicroShop_apply = r => require(['../views/member/microshop/microShop_apply.vue'], r);
const MicroShop_baseInfo = r => require(['../views/member/microshop/baseInfo.vue'], r);
const MicroShop_Category = r => require(['../views/member/microshop/category/category.vue'], r);
const Catelist1 = r => require(['../views/member/microshop/category/catelist.vue'], r);
const MicroShop_home = r => require(['../views/member/microshop/home/home'], r);
const MicroShop_ShopKeeperCenter = r => require(['../views/member/microshop/shopKeeperCenter'], r);
const MicroShop_orderDetail = r => require(['../views/member/microshop/orderDetail'], r);
const MicroShop_shareList = r => require(['../views/member/microshop/shareList.vue'], r);
const MicroShop_shareDetail = r => require(['../views/member/microshop/shareDetail'], r);
const MicroShop_selectedGoods = r => require(['../views/member/microshop/selectedGoods'], r);
// microshop 分享出去的模块
const MicroShop_Share_home = r => require(['../views/member/microshop/microshophome/micros_shop_home'], r);
const MicroShop_ShareCategory = r => require(['../views/member/microshop/categoryshare/category'], r);
//添加商品的分类
const ManageShop = r => require(['../views/member/microshop/manage_shop'], r);
const MicroShop_AddCategory = r => require(['../views/member/microshop/category_add/category'], r);
const CatelistShare = r => require(['../views/member/microshop/categoryshare/catelist.vue'], r);

//love 爱心值
const Love_index = r => require(['../views/love/love_index'], r);
const Love_list = r => require(['../views/love/love_list'], r);
const Love_transfer = r => require(['../views/love/love_transfer'], r);
const Love_changein = r => require(['../views/love/love_changein'], r);
const Love_changeto = r => require(['../views/love/love_changeto'], r);
const Love_give = r => require(['../views/love/love_give'], r);
const Love_agent = r => require(['../views/love/love_agent'], r);
const Love_push = r => require(['../views/love/love_push'], r);
const Love_cash = r => require(['../views/love/love_cash'], r);
const Love_record = r => require(['../views/love/love_record'], r);
const Love_details = r => require(['../views/love/love_details'], r);
const Love_activation = r => require(['../views/love/love_activation'], r);
const Love_explain = r => require(['../views/love/love_explain'], r);
//tool
const Footprint = r => require(['../views/member/tool/footprint'], r);
const Collection = r => require(['../views/member/tool/collection'], r);
const MyRelationship = r => require(['../views/member/tool/myRelationship'], r);
const OfflineSearch = r => require(['../views/member/tool/search'], r);
const MyEvaluation = r => require(['../views/comment/myEvaluation'], r);
const Comment = r => require(['../views/member/tool/comment'], r);
const EvaluationDetails = r => require(['../views/member/tool/evaluationDetails'], r);
//Other
const Address = r => require(['../views/member/address/addresslist'], r);
const Search = r => require(['../views/search'], r);
const SearchAll = r => require(['../views/searchall'], r);
const Goods = r => require(['../views/goods/goods'], r);
const GoodsOrder = r => require(['../views/goods/goods_order'], r);
const Goodstabs = r => require(['../views/goods/goodstabs'], r);
const Login = r => require(['../views/login/login'], r);
const Register = r => require(['../views/register/register'], r);
const Findpwd = r => require(['../views/register/findpwd'], r);
const NotFound = r => require(['../views/notfound'], r);
//alipay_detail.vue
const Alipay = r => require(['../views/member/pay/alipay_detail'], r);
//Coupon
const Coupon = r => require(['../views/coupon/coupon_index'], r);
const CouponStore = r => require(['../views/coupon/coupon_store'], r);
const CouponInfo = r => require(['../views/coupon/coupon_info'], r);

//comment
const CommentDetails = r => require(['../views/comment/CommentDetails'], r);
const ReCommentDetails = r => require(['../views/comment/ReCommentDetails'], r);
const OtherCommentDetails = r => require(['../views/comment/OtherCommentDetails'], r);



//Enterpr

const EnterpriseIndex = r => require(['../views/member/enterprise/enterprise_index'], r);
const EnterpriseApply = r => require(['../views/member/enterprise/enterprose_apply'], r);
const EnterpriseSupplier = r => require(['../views/member/enterprise/enterprise_supplier'], r);
const EnterpriseSupplierInfo = r => require(['../views/member/enterprise/enterprise_supplier_info'], r);
const EnterpriseCenterApply = r => require(['../views/member/enterprise/enterprose_center_apply'], r);
const EnterpriseCenterSupplier = r => require(['../views/member/enterprise/enterprise_center_supplier'], r);


//rentCenter
const RentIndex = r => require(['../views/rent/rentIndex'], r);
const GoodsDetail = r => require(['../views/rent/goodsDetail'], r);
const ConfirmOrder = r => require(['../views/rent/confirmOrder'], r);
const RentOrderPay = r => require(['../views/rent/orderPay'], r);
const RentCenter = r => require(['../views/rent/rentCenter'], r);
const RentMyOrder = r => require(['../views/rent/rentMyOrder'], r);
const RentCharge = r => require(['../views/rent/rentCharge'], r);
const RentDeposit = r => require(['../views/rent/rentDeposit'], r);
const RentDepositDetail = r => require(['../views/rent/rentDepositDetail'], r);
const RentReturnGoods = r => require(['../views/rent/rentReturnGoods'], r);


const ToBeReturned = r => require(['../views/rent/allRentOrders/toBeReturned'], r);
const OverdueReturn = r => require(['../views/rent/allRentOrders/overdueReturn'], r);
const HasTransferred = r => require(['../views/rent/allRentOrders/hasTransferred'], r);
const HasBeenReturned = r => require(['../views/rent/allRentOrders/hasBeenReturned'], r);
const TransferRecord = r => require(['../views/rent/allRentOrders/transferRecord'], r);
const RentGuide = r => require(['../views/rent/allRentOrders/rentGuide'], r);
const RentAfterSalas = r => require(['../views/rent/allRentOrders/rentAfterSalas'], r);
const ReturnRecord = r => require(['../views/rent/allRentOrders/returnRecord'], r);
const ToBePay = r => require(['../views/rent/allRentOrders/toBePay'], r);
const ToBeSend = r => require(['../views/rent/allRentOrders/toBeSend'], r);
const ToBetakeGoods = r => require(['../views/rent/allRentOrders/toBetakeGoods'], r);
const ToBeClose = r => require(['../views/rent/allRentOrders/toBeClose'], r);
const ToBeComplete = r => require(['../views/rent/allRentOrders/toBeComplete'], r);
const ToBeReturneding = r => require(['../views/rent/allRentOrders/toBeReturneding'], r);

//订单全返
const SingleReturnCenter = r => require(['../views/member/income/singleReturn/single_return_center'], r);
const SingleReturnListInfo = r => require(['../views/member/income/singleReturn/single_return_list_info'], r);

//团队等级全返
const TeamLevelReturnCenter = r => require(['../views/member/income/teamLevelReturn/teamlevel_return_center'], r);
const TeamLevelReturnListInfo = r => require(['../views/member/income/teamLevelReturn/teamlevel_return_list_info'], r);

//消费全返
const ConsumeReturnCenter = r => require(['../views/member/income/consumeReturn/consume_return_center'], r);
const ConsumeReturnListInfo = r => require(['../views/member/income/consumeReturn/consume_return_list_info'], r);

// service
//const Service = r => require(['../views/member/service/service'],r);
////phone
//const PhoneRecharge = r => require(['../views/member/service/phone/phoneRecharge'],r);
//const RechargePay = r => require(['../views/member/service/phone/rechargePay'],r);
//const OrderDetailsPaied = r =>require(['../views/member/service/phone/orderDetailsPaied'],r);
//const OrderDetailsNoPay = r =>require(['../views/member/service/phone/orderDetailsNoPay'],r);
//const RechargeRecord = r =>require(['../views/member/service/phone/rechargeRecord'],r);
////oilCard
//const AddCard = r =>require(['../views/member/service/oilCard/addCard'],r);
//const CardServer = r =>require(['../views/member/service/oilCard/cardServer'],r);
//const OilNoPay = r =>require(['../views/member/service/oilCard/oilNoPay'],r);
//const OilDetailsPaied = r =>require(['../views/member/service/oilCard/oilDetailsPaied'],r);
//const OilRecharge = r =>require(['../views/member/service/oilCard/oilRecharge'],r);
////ticket 机票
//const Ticket = r => require(['../views/member/service/ticket/index'], r);
//const City = r => require(['../views/member/service/ticket/city'], r);
//const TicketOrder = r =>require(['../views/member/service/ticket/ticketOrder'],r);
//const AddOrder = r =>require(['../views/member/service/ticket/addOrder'],r);
//const RefundApplication = r=>require(['../views/member/service/ticket/refundApplication'],r);
//
////Game
//const GameSearch = r => require(['../views/member/service/game/gameSearch'],r);
//const GameIsPay = r => require(['../views/member/service/game/gameIsPay'],r);
//const GameNoPay = r => require(['../views/member/service/game/gameNoPay'],r);
//const GameFlingRecharge = r =>require(['../views/member/service/game/gameFlingRecharge'],r);
//const GamePasswordRecharge =r =>require(['../views/member/service/game/gamePasswordRecharge'],r);






// 根目录
const rootPath = '';

// 页面路由
const routes = [

  { path: '', redirect: { name: 'home' }, meta: { title: '', foot: false } },
  { path: '/home', component: Home, name: 'home', meta: { title: '', foot: false } },
  { path: '/home_temp', component: Home_temp, name: 'home_temp', meta: { title: '自定义首页', foot: false } },
  { path: '/temp', component: Temp, name: 'temp', meta: { title: '模板', foot: false } },
  { path: '/hello', component: Hello, name: 'hello' },
  { path: '/diy', component: Diy, name: 'Diy' },

  ////Member
  { path: '/member', component: Member, name: 'member', meta: { title: '会员中心', foot: false } },

  { path: '/member/tabs', component: Tabs, name: 'tabs', meta: { title: 'tabs', foot: false } },
  { path: '/member/po', component: Po, name: 'po', meta: { title: 'po', foot: false } },
  { path: '/member/info/:item', component: Info, name: 'info', meta: { title: '会员信息', foot: true } },
  { path: '/member/editmobile', component: Editmobile, name: 'editmobile', meta: { title: '绑定手机', foot: true } },
  { path: '/member/balance', component: Balance, name: 'balance', meta: { title: '余额', foot: true } },
  { path: '/member/detailed', component: Detailed, name: 'detailed', meta: { title: '余额明细', foot: true } },
  { path: '/member/screen', component: Screen, name: 'screen', meta: { title: '余额筛选', foot: true } },
  { path: '/member/details/:item', component: Details, name: 'details', meta: { title: '余额详情', foot: true } },
  { path: '/member/integral', component: Integral, name: 'integral', meta: { title: '积分', foot: true } },
  { path: '/member/income', component: Income, name: 'income', meta: { title: '收入', foot: true } },
  { path: '/member/balance_recharge', component: Balance_recharge, name: 'balance_recharge', meta: { title: '充值', foot: true } },
  //{path: '/member/balance_recharge/:balance/:wx/:alipay', component: Balance_recharge, name: 'balance_recharge',meta: { title: '充值', foot:true }},
  { path: '/member/balance_transfer/:balance', component: Balance_transfer, name: 'balance_transfer', meta: { title: '转账', foot: true } },
  { path: '/member/balance_withdrawals', component: Balance_withdrawals, name: 'balance_withdrawals', meta: { title: '提现', foot: true } },
  { path: '/member/withdrawal', component: Withdrawal, name: 'withdrawal', meta: { title: '收入提现', foot: true } },
  { path: '/member/incomedetails', component: Incomedetails, name: 'incomedetails', meta: { title: '收入明细', foot: true } },
  { path: '/member/member_income_incomedetails_info', component: IncomedetailsInfo, name: 'income_details_info', meta: { title: '收入明细详情', foot: true } },



  { path: '/member/integraldetail/:item', component: Integraldetail, name: 'integraldetail', meta: { title: '积分详情', foot: true } },
  { path: '/member/integrallist', component: IntegralList, name: 'integrallist', meta: { title: '积分列表', foot: true } },
  { path: '/member/presentationRecord', component: PresentationRecord, name: 'presentationRecord', meta: { title: '提现记录', foot: true } },
  { path: '/member/presentationDetails/:record_id', component: PresentationDetails, name: 'presentationDetails', meta: { title: '提现详情', foot: true } },
  { path: '/member/address', component: Address, name: 'address', meta: { title: '默认地址', foot: true } },
  { path: '/member/alterAddress', component: AlterAddress, name: 'alterAddress', meta: { title: '修改收货地址', foot: true } },
  { path: '/member/appendAddress', component: AppendAddress, name: 'appendAddress', meta: { title: '添加收货地址', foot: true } },
  //income
  { path: '/member/distributionCommission', component: DistributionCommission, name: 'distributionCommission', meta: { title: '未提现分销佣金', foot: true } },
  //tool
  { path: '/member/footprint', component: Footprint, name: 'footprint', meta: { title: '我的足迹', foot: true } },
  { path: '/member/collection', component: Collection, name: 'collection', meta: { title: '我的收藏', foot: true } },
  { path: '/member/myrelationship', component: MyRelationship, name: 'myRelationship', meta: { title: '我的关系', foot: true } },
  { path: '/member/offlineSearch', component: OfflineSearch, name: 'offlineSearch', meta: { title: '下线搜索', foot: true } },
  { path: '/member/myEvaluation', component: MyEvaluation, name: 'myEvaluation', meta: { title: '我的评价', foot: true } },
  { path: '/member/comment', component: Comment, name: 'comment', meta: { title: '多商品评价', foot: true } },
  { path: '/member/evaluationDetails', component: EvaluationDetails, name: 'evaluationDetails', meta: { title: '评价详情', foot: true } },

  //Love 爱心值 
  { path: '/love_index', component: Love_index, name: 'love_index', meta: { title: '爱心值', foot: true } },
  { path: '/love_list', component: Love_list, name: 'love_list', meta: { title: '爱心值明细', foot: true } },
  { path: '/love_transfer', component: Love_transfer, name: 'love_transfer', meta: { title: '爱心值转账', foot: true } },
  { path: '/love_changein', component: Love_changein, name: 'love_changein', meta: { title: '爱心值转入', foot: true } },
  { path: '/love_changeto', component: Love_changeto, name: 'love_changeto', meta: { title: '爱心值转出', foot: true } },
  { path: '/love_give', component: Love_give, name: 'love_give', meta: { title: '购物赠送详情', foot: true } },
  { path: '/love_details', component: Love_details, name: 'love_details', meta: { title: '消费抵扣详情', foot: true } },
  { path: '/love_agent', component: Love_agent, name: 'love_agent', meta: { title: '代理商奖励详情', foot: true } },
  { path: '/love_push', component: Love_push, name: 'love_push', meta: { title: '直推奖奖励详情', foot: true } },
  { path: '/love_cash', component: Love_cash, name: 'love_cash', meta: { title: '收入提现奖励详情', foot: true } },
  { path: '/love_record', component: Love_record, name: 'love_record', meta: { title: '爱心值激活记录', foot: true } },
  { path: '/love_explain', component: Love_explain, name: 'love_explain', meta: { title: '爱心值说明', foot: true } },
  { path: '/love_activation/:id', component: Love_activation, name: 'love_activation', meta: { title: '激活详情', foot: true } },
  //article
  { path: '/notice', component: Notice, name: 'notice', meta: { title: '公告列表', foot: true } },
  { path: '/articleContent/:id', component: ArticleContent, name: 'articleContent', meta: { title: '文章内容', foot: true } },


  // microshop
  { path: '/microShopShare/home/:shop_id', component: MicroShop_Share_home, name: 'micro_shop_share_home', meta: { title: '微店首页', foot: true } },
  { path: '/microShopShare/micro_shop_category', component: MicroShop_ShareCategory, name: 'micro_shop_share_category', meta: { title: '微店分类', foot: true } },
  { path: '/microShopShare/micro_share_catelist/:id/', component: CatelistShare, name: 'micro_shop_share_carelist', meta: { title: '微店商品', foot: true } },


  { path: '/microShopAdd/micro_shop_category', component: MicroShop_AddCategory, name: 'micro_shop_add_category', meta: { title: '微店分类', foot: true } },


  { path: '/microShop_apply', component: MicroShop_apply, name: 'microShop_apply', meta: { title: '微店申请', foot: true } },
  { path: '/microShop/baseinfo', component: MicroShop_baseInfo, name: 'microShop_baseinfo', meta: { title: '微店设置', foot: true } },
  { path: '/microShop/micro_shop_category', component: MicroShop_Category, name: 'micro_shop_category', meta: { title: '微店分类', foot: true } },

  //参数id用来接收从分类页面传递过来的具体类别参数
  { path: '/catelist1/:id/', component: Catelist1, name: 'catelist1', meta: { title: '分类列表', foot: true } },
  //{path: '/catelist1/:id/:isSelect', component: Catelist1, name: 'catelist1',meta: {	title: '分类列表', foot:true }},
  { path: '/microShop/home', component: MicroShop_home, name: 'microShop_home', meta: { title: '微店首页', foot: true } },
  { path: '/microShop/shopKeeperCenter', component: MicroShop_ShopKeeperCenter, name: 'microShop_ShopKeeperCenter', meta: { title: '用户中心', foot: true } },

  //路由参数用来控制显示哪个时间段的订单
  { path: '/microShop/orderDetail/:date', component: MicroShop_orderDetail, name: 'microShop_orderDetail', meta: { title: '订单详情', foot: true } },

  //路由参数用来控制显示哪个时间段的分红订单 （）
  { path: '/microShop/shareList/:date', component: MicroShop_shareList, name: 'microShop_shareList', meta: { title: '分红列表', foot: true } },

  //路由参数用来控制显示哪个分红订单的具体详情
  { path: '/microShop/shareDetail/:orderID', component: MicroShop_shareDetail, name: 'microShop_shareDetail', meta: { title: '分红详情', foot: true } },
  { path: '/microShop/selectedGoods/:goods', component: MicroShop_selectedGoods, name: 'microShop_selectedGoods', meta: { title: '已选商品', foot: true } },
  { path: '/microShop/manageShop', component: ManageShop, name: 'manage_shop', meta: { title: '微店管理', foot: true } },

  //extension
  { path: '/extension/manage', component: Manage, name: 'manage', meta: { title: '管理奖', foot: true } },
  { path: '/member/extension', component: Extension, name: 'extension', meta: { title: '我的推广', foot: false } },
  { path: '/extension/distribution', component: Distribution, name: 'distribution', meta: { title: '分销商', foot: true } },
  { path: '/extension/commission', component: Commission, name: 'commission', meta: { title: '预计佣金', foot: true } },
  { path: '/extension/commissionDetails', component: CommissionDetails, name: 'commissionDetails', meta: { title: '预计佣金详情', foot: true } },
  { path: '/extension/unsettled', component: Unsettled, name: 'unsettled', meta: { title: '未结算佣金', foot: true } },
  { path: '/extension/unsettledDetails', component: UnsettledDetails, name: 'unsettledDetails', meta: { title: '未结算佣金详情', foot: true } },
  { path: '/extension/alreadySettled', component: AlreadySettled, name: 'alreadySettled', meta: { title: '已结算佣金', foot: true } },
  { path: '/extension/alreadySettledDetails', component: AlreadySettledDetails, name: 'alreadySettledDetails', meta: { title: '已结算佣金详情', foot: true } },
  { path: '/extension/notPresent', component: NotPresent, name: 'notPresent', meta: { title: '未提现佣金', foot: true } },
  { path: '/extension/notPresentDetails', component: NotPresentDetails, name: 'notPresentDetails', meta: { title: '未提现佣金详情', foot: true } },
  { path: '/extension/present', component: Present, name: 'present', meta: { title: '已提现佣金', foot: true } },
  { path: '/extension/presentDetails', component: PresentDetails, name: 'presentDetails', meta: { title: '已提现佣金详情', foot: true } },
  { path: '/extension/distributionOrder', component: DistributionOrder, name: 'distributionOrder', meta: { title: '分销订单', foot: true } },
  { path: '/extension/extendIncome', component: ExtendIncome, name: 'extendIncome', meta: { title: '推广收入', foot: false } }, //new
  { path: '/extension/merchantsDividendRatio', component: MerchantsDividendRatio, name: 'merchantsDividendRatio', meta: { title: '招商员', foot: true } }, //new
  { path: '/shareholderCenter', component: ShareholderCenter, name: 'shareholderCenter', meta: { title: '股东中心', foot: true } },
  { path: '/teamAgentCenter', component: TeamAgentCenter, name: 'teamAgentCenter', meta: { title: '团队代理中心', foot: true } },
  { path: '/teamCode', component: TeamCode, name: 'teamCode', meta: { title: '我的激活码', foot: true } },
  { path: '/codeHistory', component: CodeHistory, name: 'codeHistory', meta: { title: '使用记录', foot: true } },
  { path: '/investmentCenter', component: InvestmentCenter, name: 'investmentCenter', meta: { title: '招商中心', foot: true } },
  { path: '/regionalAgencyCenter', component: RegionalAgencyCenter, name: 'regionalAgencyCenter', meta: { title: '区域代理中心', foot: true } },
  { path: '/applyRegionalAgency', component: ApplyRegionalAgency, name: 'applyRegionalAgency', meta: { title: '申请区域代理', foot: true } },





  //supplier
  { path: '/member/supplier', component: Supplier, name: 'supplier', meta: { title: '供应商申请', foot: true } },
  //comment
  { path: '/CommentDetails/:order_id/:goods_id/:uid', component: CommentDetails, name: 'CommentDetails', meta: { title: '评价详情', foot: true } },
  { path: '/ReCommentDetails', component: ReCommentDetails, name: 'ReCommentDetails', meta: { title: '追加评价', foot: true } },
  { path: '/OtherCommentDetails', component: OtherCommentDetails, name: 'othercommentdetails', meta: { title: '其它评价', foot: true } },
  //order
  { path: '/member/alipay/:status/:recharge_money/:order_pay_id/:uid', component: Alipay, name: 'alipay', meta: { title: '支付宝', foot: true } },
  { path: '/member/orderList/:status', component: OrderList, name: 'orderlist', meta: { title: '订单', foot: true } },
  { path: '/member/express/:refund_id', component: OrderExpress, name: 'express', meta: { title: '退款快递信息', foot: true } },
  { path: '/member/orderdetail/:order_id', component: Goodsinfo, name: 'orderdetail', meta: { title: '订单详情', foot: true } },
  { path: '/member/logistics', component: Logistics, name: 'logistics', meta: { title: '物流详情', foot: true } },
  { path: '/member/evaluate/:order_id/:goods', component: Evaluate, name: 'evaluate', meta: { title: '评价', foot: true } },
  { path: '/member/replyEvaluate', component: ReplyEvaluate, name: 'replyEvaluate', meta: { title: '回复评论', foot: true } },
  { path: '/member/addevaluate', component: Addevaluate, name: 'addevaluate', meta: { title: '追加评价', foot: true } },
  { path: '/member/refund/:order_id/:type', component: Refund, name: 'refund', meta: { title: '申请售后', foot: true } },
  { path: '/member/aftersaleslist', component: Aftersaleslist, name: 'aftersaleslist', meta: { title: '售后列表', foot: true } },
  { path: '/member/aftersales/:refund_id', component: Aftersales, name: 'aftersales', meta: { title: '售后详情', foot: true } },
  { path: '/member/orderpay/:order_ids', component: OrderPay, name: 'orderpay', meta: { title: '订单支付', foot: true } },
  //{path: '/member/orderpay/:status/:order_ids', component: OrderPay, name: 'orderpay',meta: { title: '订单支付', foot:true }},
  //orderpay
  { path: '/member/payErr', component: PayErr, name: 'payErr', meta: { title: '支付错误', foot: 'true' } }, //支付错误
  { path: '/member/payYes', component: PayYes, name: 'PayYes', meta: { title: '支付成功', foot: 'true' } }, //支付成功
  { path: '/member/blacklist', component: Blacklist, name: 'blacklist', meta: { title: '黑名单', foot: 'true' } },
  { path: '/member/mandate', component: Mandate, name: 'mandate', meta: { title: '微信授权失败', foot: 'true' } },
  //coupon
  { path: '/coupon/coupon_index', component: Coupon, name: 'coupon', meta: { title: '优惠券', foot: true } },
  { path: '/coupon/coupon_store', component: CouponStore, name: 'couponStore', meta: { title: '领券中心', foot: true } },
  { path: '/coupon/coupon_info', component: CouponInfo, name: 'couponInfo', meta: { title: '详情', foot: true } },
  //plug
  { path: '/member/marketing', component: Marketing, name: 'marketing', meta: { title: '营销工具', foot: true } },
  { path: '/member/messageSettings', component: MessageSettings, name: 'messageSettings', meta: { title: '消息提醒设置', foot: true } },
  //Other
  { path: '/search', component: Search, name: 'search', meta: { title: '搜索', foot: true } },
  { path: '/searchall', component: SearchAll, name: 'searchAll', meta: { title: '全部商品', foot: true } },
  { path: '/login', component: Login, name: 'login', meta: { title: '登录', foot: true } },
  { path: '/register', component: Register, name: 'register', meta: { title: '注册', foot: true } },
  { path: '/findpwd', component: Findpwd, name: 'findpwd', meta: { title: '忘记密码', foot: true } },
  { path: '/category', component: Category, name: 'category', meta: { title: '分类', foot: false } },
  { path: '/catelist/:id', component: Catelist, name: 'catelist', meta: { title: '分类列表', foot: true } },
  { path: '/brand', component: Brand, name: 'brand', meta: { title: '品牌', foot: false } },
  { path: '/brandgoods', component: BrandGoods, name: 'brandgoods', meta: { title: '品牌商品', foot: true } },
  { path: '/cart', component: Cart, name: 'cart', meta: { title: '购物车', foot: false } },
  { path: '/cart/settlement', component: Settlement, name: 'settlement', meta: { title: '结算', foot: true } },
  { path: '/goods/:id', component: Goods, name: 'goods', meta: { title: '商品详情', foot: true } },
  //{path: '/goodsorder/:tag/:goodsId/:optionsId/:total/:cart_ids', component: GoodsOrder,name: 'goodsorder',meta: {  title: '填写订单', foot:true }},
  { path: '/goodsorder', component: GoodsOrder, name: 'goodsorder', meta: { title: '填写订单', foot: true } },
  { path: '/goods/goodstabs/:id/:goods', component: Goodstabs, name: 'goodstab', meta: { title: '商品详情内容', foot: true } },
  //{path:'/addons/yun_shop',redirect:'/'}


  //rentCenter
  { path: '/rentIndex', component: RentIndex, name: 'rentIndex', meta: { title: '首页', foot: true } },
  { path: '/goodsDetail/:id', component: GoodsDetail, name: 'goodsDetail', meta: { title: '商品详情', foot: true } },
  // { path: '/confirmOrder/:goodsId/:optionsId/:total/:rentDate/:rentDay', component: ConfirmOrder, name: 'confirmOrder', meta: { title: '确认下单', foot: true } },
  { path: '/confirmOrder', component: ConfirmOrder, name: 'confirmOrder', meta: { title: '确认下单', foot: true } },
  { path: '/rentOrderPay', component: RentOrderPay, name: 'rentOrderPay', meta: { title: '订单支付', foot: true } },

  { path: '/rentCenter', component: RentCenter, name: 'rentCenter', meta: { title: '租赁中心', foot: true } },
  { path: '/rentMyOrder/:status', component: RentMyOrder, name: 'rentMyOrder', meta: { title: '我的租借', foot: true } },
  { path: '/rentCharge', component: RentCharge, name: 'rentCharge', meta: { title: '押金充值', foot: true } },
  { path: '/rentDeposit', component: RentDeposit, name: 'rentDeposit', meta: { title: '押金提现', foot: true } },
  { path: '/rentDepositDetail', component: RentDepositDetail, name: 'rentDepositDetail', meta: { title: '押金明细', foot: true } },
  { path: '/rentReturnGoods/:id', component: RentReturnGoods, name: 'rentReturnGoods', meta: { title: '归还商品', foot: true } },


  { path: '/toBePay/:id', component: ToBePay, name: 'toBePay', meta: { title: '订单详情', foot: true } },
  { path: '/toBeSend/:id', component: ToBeSend, name: 'toBeSend', meta: { title: '订单详情', foot: true } },
  { path: '/toBetakeGoods/:id', component: ToBetakeGoods, name: 'toBetakeGoods', meta: { title: '订单详情', foot: true } },
  { path: '/toBeReturneding/:id', component: ToBeReturneding, name: 'toBeReturneding', meta: { title: '订单详情', foot: true } },

  { path: '/toBeClose/:id', component: ToBeClose, name: 'toBeClose', meta: { title: '订单详情', foot: true } },
  { path: '/toBeComplete/:id', component: ToBeComplete, name: 'toBeComplete', meta: { title: '订单详情', foot: true } },

  { path: '/toBeReturned/:id', component: ToBeReturned, name: 'toBeReturned', meta: { title: '订单详情', foot: true } },
  { path: '/overdueReturn', component: OverdueReturn, name: 'overdueReturn', meta: { title: '逾期未归还', foot: true } },
  { path: '/hasTransferred', component: HasTransferred, name: 'hasTransferred', meta: { title: '已转赠', foot: true } },
  { path: '/hasBeenReturned', component: HasBeenReturned, name: 'hasBeenReturned', meta: { title: '已归还', foot: true } },
  { path: '/transferRecord', component: TransferRecord, name: 'transferRecord', meta: { title: '转赠记录', foot: true } },
  { path: '/rentGuide', component: RentGuide, name: 'rentGuide', meta: { title: '租赁指南', foot: true } },
  { path: '/rentAfterSalas', component: RentAfterSalas, name: 'rentAfterSalas', meta: { title: '售后列表（待退款）', foot: true } },
  { path: '/returnRecord', component: ReturnRecord, name: 'returnRecord', meta: { title: '归还记录', foot: true } },

  //招商中心
  { path: '/member/enterprise/index', component: EnterpriseIndex, name: 'enterprise_index', meta: { title: '招商', foot: true } },
  { path: '/member/enterprise/apply', component: EnterpriseApply, name: 'enterprise_apply', meta: { title: '招商', foot: true } },
  { path: '/member/enterprise/supplier', component: EnterpriseSupplier, name: 'enterprise_supplier', meta: { title: '我的供应商', foot: true } },
  { path: '/member/enterprise/supplierInfo/:id', component: EnterpriseSupplierInfo, name: 'enterprise_supplier_info', meta: { title: '供应商详情', foot: true } },
  { path: '/member/enterprise/center/apply', component: EnterpriseCenterApply, name: 'enterprose_center_apply', meta: { title: '招商中心', foot: true } },
  { path: '/member/enterprise/center/supplier', component: EnterpriseCenterSupplier, name: 'enterprise_center_supplier', meta: { title: '我的供应商', foot: true } },

  //订单全返
  { path: '/member/income/singleReturn', component: SingleReturnCenter, name: 'single_return_center', meta: { title: '订单返现', foot: true } },
  { path: '/member/income/singleReturnListInfo/:id', component: SingleReturnListInfo, name: 'single_return_list_info', meta: { title: '返现详情', foot: true } },

  //团队等级全返
  { path: '/member/income/teamLevelReturn', component: TeamLevelReturnCenter, name: 'teamlevel_return_center', meta: { title: '团队返现', foot: true } },
  { path: '/member/income/teamLevelReturnListInfo/:id', component: TeamLevelReturnListInfo, name: 'teamlevel_return_list_info', meta: { title: '返现详情', foot: true } },

  //消费全返
  { path: '/member/income/consumeReturn', component: ConsumeReturnCenter, name: 'consume_return_center', meta: { title: '消费返现', foot: true } },
  { path: '/member/income/consumeReturnListInfo/:id', component: ConsumeReturnListInfo, name: 'consume_return_list_info', meta: { title: '返现详情', foot: true } },

  //service
  //手机充值
  //{path: '/service', component: Service, name: 'service',meta: { title: '我的服务', foot:true }},
  //{path: '/phoneRecharge', component: PhoneRecharge, name: 'phoneRecharge',meta: { title: '手机充值', foot:true }},
  //{path: '/rechargePay', component: RechargePay, name: 'rechargePay',meta: { title: '充值支付', foot:true }},
  //{path: '/orderDetailsPaied', component: OrderDetailsPaied, name: 'orderDetailsPaied',meta: { title: '已支付', foot:true }},
  //{path: '/orderDetailsNoPay', component: OrderDetailsNoPay, name: 'orderDetailsNoPay',meta: { title: '未支付', foot:true }},
  //{path: '/rechargeRecord', component: RechargeRecord, name: 'rechargeRecord',meta: { title: '支付记录', foot:true }},
  ////油卡充值
  //{path: '/addCard', component: AddCard, name: 'addCard',meta: { title: '新增油卡', foot:true }},
  //{path: '/cardServer', component: CardServer, name: 'cardServer',meta: { title: '油卡服务', foot:true }},
  //{path: '/oilNoPay', component: OilNoPay, name: 'oilNoPay',meta: { title: '油卡未支付', foot:true }},
  //{path: '/oilDetailsPaied', component: OilDetailsPaied, name: 'oilDetailsPaied',meta: { title: '油卡已支付', foot:true }},
  //{path: '/oilRecharge', component: OilRecharge, name: 'oilRecharge',meta: { title: '油卡已支付', foot:true }},
  ////Ticket机票
  //{path: '/ticket', component: Ticket, name: 'ticket',meta: { title: '国内｜国际机票', foot:true }},
  //{path: '/ticket/city', component: City, name: 'city',meta: { title: '城市', foot:true }},
  //{path: '/ticketOrder', component: TicketOrder, name: 'ticketOrder',meta: { title: '机票订单', foot:true }},
  //{path: '/addOrder', component: AddOrder, name: 'addOrder',meta: { title: '添加订单', foot:true }},
  //{path: '/refundApplication', component: RefundApplication, name: 'refundApplication',meta: { title: '退票申请', foot:true }},
  //
  //
  ////game
  //{path: '/gameSearch', component: GameSearch, name: 'gameSearch',meta: { title: '游戏搜索', foot:true }},
  //{path: '/gameIsPay', component: GameIsPay, name: 'gameIsPay',meta: { title: '游戏已支付', foot:true }},
  //{path: '/gameNoPay', component: GameNoPay, name: 'gameNoPay',meta: { title: '游戏未支付', foot:true }},
  //{path: '/gameFlingRecharge', component: GameFlingRecharge, name: 'gameFlingRecharge',meta: { title: '游戏直冲充值', foot:true }},
  //{path: '/gamePasswordRecharge', component: GamePasswordRecharge, name: 'gamePasswordRecharge',meta: { title: '游戏卡密充值', foot:true }},






].map(route => {
  route.path = rootPath + route.path;
  return route;
});
// 404 页
routes.push({ path: '*', component: NotFound, name: 'notfound', meta: { title: '404', foot: true } });
//routes.push({path: '/wx-app', redirect: '/' });
export default routes;