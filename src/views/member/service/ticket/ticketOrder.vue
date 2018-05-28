<template>
    <div id="ticketOrder" :class="'ticketOrder'+$store.state.service.lang">
        <c-title :hide="false" :text='language.title'></c-title>
        <div style="height:40px"></div>

        <ul class="list">
        	
	            <li class="item" v-for="(item,index) in ticketOrders">
	                <div class="addr">
	                    <i class="iconfont "></i>
	                    <span class="left">{{item.fromAddr}}</span>	
	                    <span class="left">&nbsp;-&nbsp;</span>
	                    <span class="left">{{item.toAddr}}</span>
	                    <b class="right">{{item.payDetil}}</b>
	                </div>
	                <div class="data">
	                    <div class="time">
	                        <div class="left">
	                            <p class="one">
	                                <span>{{item.data}}</span>&nbsp;&nbsp;
	                                <span>{{item.fromTime}}</span> 至 <span>{{item.toTime}}</span>
	                            </p>
	                            <p class="two"><span>{{item.airline}}</span> <span>{{item.flight}}</span></p>
	                        </div>
	                        <div class="right">¥{{item.price}}</div>
	                    </div>
	                    <div class="btns">
	                        <button type="button" v-for="btn in item.btns" :data-index="btn.type" @click="jump($event)">{{btn.btn}}</button>
	                    </div>
	                </div>
	            </li>
	        <router-link :to="fun.getUrl('ticketOrderDetail')">
            </router-link>
        </ul>
    </div>
</template>

<script>
import  ticketOrder_controller from './ticketOrder_controller';
export default ticketOrder_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.ticketOrderch{
    .list{
        margin:10px 15px;
        .item{
            box-shadow:2px 2px 2px 2px #aaa;
            width:100%;
            height:130px;
            margin-bottom:15px;
            border-radius:6px;
            .addr{
                padding:0 15px;
                height:25px;
                line-height:25px;
                background:#1bba9e;
                color:#fff;
                border-top-left-radius:6px;
                border-top-right-radius:6px;
                span{float: left;}
                b{float: right;font-weight:normal;}
            }
            .data{
                background:#fff;
                height:105px;
                border-bottom-left-radius:6px;
                border-bottom-right-radius:6px;
                .time{
                    padding:0 15px;
                    height:60px;
                    div.left{
                        width:80%;
                        text-align:left;
                        float: left;
                        .one{
                            span{
                                color:#333;
                                font-size:14px;
                                line-height:35px;
                            }
                        }
                        .two{
                            color:#666;
                            font-size:12px;
                        }
                    }
                    div.right{
                        width:20%;
                        float: right;
                        color:#333;
                        font-size:16px;
                        margin-top:20px;
                    }
                }
                .btns{
                    width:100%;
                    height:45px;
                    border-top:1px solid #ccc;
                    button{
                        padding:4px 10px;
                        margin:10px;
                        color:#ff951b;
                        border:1px solid #ff951b;
                        border-radius:4px;
                        font-size:12px;
                        float:right;
                        background:#fff;
                        outline:0;
                    }
                }
            }
        }
    }
}

.ticketOrderwei{
    .list{
        margin:10px 15px;
        .item{
            box-shadow:2px 2px 2px 2px #aaa;
            width:100%;
            height:130px;
            margin-bottom:15px;
            border-radius:6px;
            .addr{
                padding:0 15px;
                height:25px;
                line-height:25px;
                background:#1bba9e;
                color:#fff;
                border-top-left-radius:6px;
                border-top-right-radius:6px;
                span{float: right;}
                b{float: left;font-weight:normal;}
            }
            .data{
                background:#fff;
                height:105px;
                border-bottom-left-radius:6px;
                border-bottom-right-radius:6px;
                .time{
                    padding:0 15px;
                    height:60px;
                    div.left{
                        width:80%;
                        text-align:right;
                        float:right;
                        .one{
                            span{
                                color:#333;
                                font-size:14px;
                                line-height:35px;
                            }
                        }
                        .two{
                            color:#666;
                            font-size:12px;
                        }
                    }
                    div.right{
                        width:20%;
                        float: left;
                        color:#333;
                        font-size:16px;
                        margin-top:20px;
                    }
                }
                .btns{
                    width:100%;
                    height:45px;
                    border-top:1px solid #ccc;
                    button{
                        padding:4px 10px;
                        margin:10px;
                        color:#ff951b;
                        border:1px solid #ff951b;
                        border-radius:4px;
                        font-size:12px;
                        float:left;
                        background:#fff;
                        outline:0;
                    }
                }
            }
        }
    }
}

</style>