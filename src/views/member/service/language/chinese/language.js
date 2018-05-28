//生活缴费首页
import lifeService from './lifeService/lifeService';

//话费充值
import telephone from './phone/telephone';
//import rechargePay from './phone/rechargePay';
import orderDetailsNoPay from './phone/orderDetailsNoPay';
import orderDetailsPaied from './phone/orderDetailsPaied';
import rechargeRecord from './phone/rechargeRecord';

//流量充值
import flow from './flow/flow';
//油卡
import cardServer from './oilCard/cardServer';

import oilRecharge from './oilCard/oilRecharge';
import oilPay from './oilCard/oilPay';
import oilCheck from './oilCard/oilCheck';

import addCard from './oilCard/addCard';
import oilDetailsPaied from './oilCard/oilDetailsPaied';  //已付款
import oilNoPay from './oilCard/oilNoPay';  //未付款
//生活缴费
import electricity from './lifePayment/electricity';//电费
import waterFee from './lifePayment/waterFee'; //水费
import fixedTelephone from './lifePayment/fixedTelephone'; //固话
import broadband from './lifePayment/broadband'; //宽带
import lifePayIsPaied from './lifePayment/lifePayIsPaied';
import lifePayNoPay from './lifePayment/lifePayNoPay';

//交通罚款
import trafficIndex from './trafficFine/trafficIndex'; 
import trafficConfirmOrder from './trafficFine/trafficConfirmOrder'; 
import trafficCity from './trafficFine/trafficCity'; 
import trafficRecord from './trafficFine/trafficRecord'; 
import trafficOrderlsPaied from './trafficFine/trafficOrderlsPaied'; 
import trafficOrderNoPay from './trafficFine/trafficOrderNoPay';
//机票
import ticket from './ticket/ticket';
import city from './ticket/city';
import ticketOrder from './ticket/ticketOrder';
import searchResults from './ticket/searchResults';
import flightPrice from './ticket/flightPrice';
import newAddPassenger from './ticket/newAddPassenger';
import ticketOrderDetail from './ticket/ticketOrderDetail';
import addOrder from './ticket/addOrder';
import modifyContacts from './ticket/modifyContacts';
import refundApplication from './ticket/refundApplication';
import ticketPay from './ticket/ticketPay';

//火车票
import trainTicket from './trainTicket/trainTicket';
import trainTicketOrder from './trainTicket/trainTicketOrder';
import trainSearchResults from './trainTicket/trainSearchResults';
import trainAddOrder from './trainTicket/trainAddOrder';
import trainPay from './trainTicket/trainPay';


export default {
	//生活缴费首页
	lifeService,
	//话费充值
	telephone,
	//rechargePay,
	orderDetailsNoPay,
	orderDetailsPaied,
	rechargeRecord,
	//流量充值
	flow,
	//油卡
	oilRecharge,
	oilPay,
	oilCheck,
	cardServer,
	addCard,
	oilDetailsPaied,
	oilNoPay,
	//生活缴费
	electricity,
	waterFee,
	fixedTelephone,
	broadband,
	lifePayIsPaied,
	lifePayNoPay,
	//交通罚款
	trafficIndex,
	trafficConfirmOrder,
	trafficCity,
	trafficRecord,
	trafficOrderlsPaied,
	trafficOrderNoPay,
	//机票
	ticket,
	city,
	ticketOrder,
	searchResults,
	flightPrice,
	newAddPassenger,
	ticketOrderDetail,
	addOrder,
	modifyContacts,
	refundApplication,
	ticketPay,
	//火车票
	trainTicket,
	trainTicketOrder,
	trainSearchResults,
	trainAddOrder,
	trainPay,
}