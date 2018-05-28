<template>
    <div id="orderList">

        <el-checkbox-group v-model="checkList"
                           @change="multiplePayChange">
            <div class="shop"
                 v-for="order in datasource" @click="goOrder(order.has_one_order.status,order.order_id)">
                <div class="title">
                    <el-checkbox :label="order.id"
                                 v-if="status == 1">&nbsp</el-checkbox>
                    <h4>订单号：{{order.recharge_no}}</h4> <span>{{order.has_one_order.status_name}}</span>
                </div>
                <a
                             v-for=" good in order.has_one_order.has_many_order_goods">
                    <div class="goods">
                        <div class="img"><img :src="good.thumb"></div>
                        <div class="warp">
                             <div class="inner">
                            <div class="name">{{good.title}}</div>
                            <div class="option">规格: {{good.goods_option_title}}</div>
                        </div>
                        <div class="price">
                            ￥{{good.price}}
                       
                        </div>
                        </div>
                       
                    </div>
    
                </a>
                <div class="title">
                    <h4> 实付：￥<b>{{order.price}}</b></h4>
                    <span class="del"
                          v-if="order.length == 1"
                          @click="operation(order.button_models[0],order)">{{order.button_models[0].name}}</span>
                </div>
                <div class="allbt"
                     v-if="order.length > 1">
                    <div style="flex: 3;"></div>
                    <span v-for="item in order.button_models"
                          @click="operation(item,order)">{{item.name}}</span>
                </div>
            </div>
        </el-checkbox-group>
        
    </div>
</template>
<script>
import { Actionsheet } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default
    {

        //select_inde-当前选择行,datasource-数据源,currentdata-当前选择的数据
        props: ['datasource', 'status','getAllLoaded'],
        data() {
            return {
                isShow: false,
                toi: this.fun.getKeyByI(),
                checkList: [],
                loading: false,
				allLoaded: false,
				goload: true,
                //   actions:[],
                //   sheetVisible:''


            }
        },
        methods:
        {
            setCheckList()
            {
                this.checkList = [];

            },
            goOrder(e,order_ids){
            	if (e == 0) {
            		this.$router.push(this.fun.getUrl('orderpay', { status: "2", order_ids}));
            	}
            },
            operation(btn, order) {

                //this.actions=[{name:"无理由",method:"sheetAction"},{name:"不退了",method:"sheetAction"}];
                if (btn.value == 8) {
                    this.checklogistics(order, btn);
                } else if (btn.value == 12) {
                    this.deleteOrder(order, btn);

                } else if (btn.value == 10) {
                    this.comment(order, btn);

                } else if (btn.value == 1) {
                    this.toPay(order, btn);
                } else if (btn.value == 13) {
                    //退款
                    this.toRefund(order, btn);

                } else if (btn.value == 9) {
                    //取消订单
                    this.cancleOrder(order, btn);

                } else if (btn.value == 5) {
                    //确认订单
                    this.confirmOrder(order, btn);

                } else if (btn.value == 18) {
                    //退款中
                    this.toRefundDetail(order, btn);

                }

            },
            //多订单合并支付的响应方法
            multiplePayChange(value) {


                this.$emit('MultiplePayNotification', this.checkList);

            },
            toDetail(order) {

                this.$emit('ToDetailNotification', order);
            }
            ,
            //查看物流
            checklogistics(item, btn) {
                this.$router.push(this.fun.getUrl("logistics",{ order: item }));

            },
            //取消订单
            cancleOrder(item, btn) {
                MessageBox({
                    title: '提示',
                    message: '确定取消此订单?',
                    showCancelButton: true
                }).then(action => {
                    if (action == 'confirm') {
                        //删除当前选中的地址
                        this.datasource.splice(this.datasource.indexOf(item), 1);
                        this.sentRequest(btn.api, { order_id: item.id }, false);

                    }

                });

            },
            //删除订单
            deleteOrder(item, btn) {
                MessageBox({
                    title: '提示',
                    message: '确定删除此订单?',
                    showCancelButton: true
                }).then(action => {
                    if (action == 'confirm') {
                        //删除当前选中的地址
                        this.datasource.splice(this.datasource.indexOf(item), 1);
                        this.sentRequest(btn.api, { order_id: item.id }, false);

                    }

                });


            },
            toPay(item, btn) {
                //status-2合并支付 type-1订单支付
                this.$router.push(this.fun.getUrl("orderpay",{status:2,order_ids: item.id }));

            },
            //评价订单
            comment(item, btn) {

                this.$router.push(this.fun.getUrl("comment",{ order: item }));

            },
            //确认收货
            confirmOrder(item, btn) {
                MessageBox({
                    title: '提示',
                    message: '您确定收到货物?',
                    showCancelButton: true
                }).then(action => {
                    if (action == 'confirm') {
                        //this.$emit('ConfrimOrderNotification');
                        //调用接口通知服务器收到货物请求
                        var that = this;
                        $http.get(btn.api, { order_id: item.id}).then(function (response) {
                            if (response.result == 1) {
                                that.$emit('ConfrimOrderNotification', item);

                            } else {
                                MessageBox.alert(response.msg);
                            }


                        }, function (response) {
                            // error callback
                        });

                    } else {

                    }

                });


            },
            //追加评价
            reCommend(item, btn) {

            },
            toRefundDetail(item, btn) {
                this.$router.push(this.fun.getUrl('aftersales',{ refund_id: item.refund_id }));
            },
            //退款
            toRefund(item, btn) {
                //refund
                this.$router.push(this.fun.getUrl("refund",{ order_id: item.id, type: 1 }));

            },
            sentRequest(action, params, isIndicator) {
                $http.get(action, params, '').then(function (response) {

                }, function (response) {
                    // error callback
                });
            },
            sheetAction() {
                console.log(this.sheetVisible);
            },
            //更新
		loadTop() {
			// this.initData();
			// this.getOrderList(this.selected);
            alert('刷新');
			 this.$refs.loadmore.onTopLoaded();

		},
		// 加载更多
		loadBottom() {
			console.log('加载更多');
			this.$refs.loadmore.onBottomLoaded();
				//this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
			if (this.getAllLoaded) {
                this.allLoaded = false;
			}else{
				this.allLoaded = true;
			}



		}


        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.olis{height: 100vh;}
.shop {
    background: #FFF;
    margin-top: 2px;
    border-bottom: 1px solid #e2e2e2;
    border-top: 1px solid #e2e2e2;
    a {
        color: #000000;
    }
    .title:after{
    	content:'';
    	display: block;
    	clear: both;
    }
    .title {
        padding: 0 10px;
        display: flex;
        align-items: center;
        h4 {
            text-align: left;
            font-weight: normal;
            margin: 10px 0;
            flex: 8;
            font-size: .8rem;
            b {
                font-size: 1.1rem;
            }
        }
        span {
            color: #f15353;
            text-align: right;
            margin-right: 1px;
            flex: 2;
        }
    }
    span.del {
        border-radius: 14px;
        border: 1px solid #F15353;
        text-align: center;
        padding: 5px 7px;
        font-size: .7rem;
    }
    .allbt {
        display: flex;
        align-items: center;
        margin: 0 0 10px;
        -ms-flex-pack: justify;
        justify-content: space-between;
        border-top: 1px solid #e2e2e2;
        padding-top: 10px;
        span {
            flex: 2;
            border-radius: 14px;
            border: 1px solid #b1a6a6;
            margin: 0 10px 0 0;
            padding: 5px 7px;
            text-align: center;
            font-size: .7rem;
        }
        span:last-child {
            color: #f15353;
            border: 1px solid #f15353;
        }
    }
}





.goods:after{
            content: "";
            display: block;
            clear: both;
        }
        .goods {
            /*display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: stretch;
            -ms-flex-align: stretch;
            align-items: stretch;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-flow: row wrap;
            flex-flow: row wrap;
            */
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
            background: #fafafa;
            .img {
                /*flex: 1;*/
                width: 30%;
                float: left;
                display: inline-block;
                /*background:blue;*/
                img {
                    width: 100%;
                }
            }
            .warp{
                width: 70%;
                float: left;
                display: inline-block;
                .inner {
                    width: 70%;
                    float: left;
                    box-sizing: border-box;
                    padding: 0 5px;
                    text-align:left;
                    .name {
                        text-align: left;
                        color: #333333;
                        margin-bottom: 10px;
                    }
                }
                
                .price {
                    width: 30%;
                    align-items: center;
                    text-align: right;
                    color: #333333;
                    box-sizing: border-box;
                    float: left;
                    padding-right: 4px;
                    p {
                        margin-top: 0
                    }
                }
            }
            




    .option {
        color: #888;
        font-size: .6rem;
        flex: 1;
    }
}

#tbs {
    display: flex;
    align-items: center;
    background: #FFF;
    flex-flow: row wrap;
    padding: 10px;
    line-height: 1.5rem;
    border-bottom: 1px solid #D9D9D9;
    .left {
        text-align: left;
        flex: 50%;
        color: #858585;
    }
    .right {
        text-align: right;
        flex: 50%;
    }
    .add {
        color: #259b24;
    }
    .reduce {
        color: #e51c23;
    }
}
</style>
