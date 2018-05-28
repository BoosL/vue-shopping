<template>
	<div id="newLife" :class="'newLife'+$store.state.service.lang">
		<div class="m-header">
			<div class="info">
				<img :src="avatar" alt="" />
				<!--<p class="single"><span>{{language.id}}</span>{{title.id}}</p>-->
				<p class="single"><span>{{language.nickname}}</span>{{title.nickname}}</p>
				<p class="single"><span>{{language.leve}}</span>{{title.leve}}</p>
				<p class="single"><span>积分：</span>{{score}}</p>
			</div>
			
			<div @click="langPop" class="change">
				<i class="el-icon-setting"></i>  切换
			</div>
			<!--<div class="change change2" @click="checkIn" :class="{'active':Sign?true:false}">签到</div>-->
			<!--弹出框-->
			<div class="modal" v-show="overdues"  @click="langPop">
				<div class="modal-dialog">
					<button class="title" @click="$store.commit('chineseLang')">中文</button>
					<button class="title" @click="$store.commit('weiLang')">维语</button>
				</div>
			</div>
				
		</div>
		<div class="proxy">
			<span>{{language.proxy}}</span> 
			<button @click="vipPop" :class="{Vipible}">{{language.proxybtn}}</button>
		</div>
		<div class="proxy">
			<span>{{language.exer}}{{title.exer}}</span> 
			<button @click="toBalance">{{language.withdraw}}</button>
		</div>
		<div class="order_all">
			<router-link :to="fun.getUrl('serviceOrderList',{ status:'0' })">
				<div class="order_pub">
					<div class="badge"></div>
					<i class="iconfont icon-dianpu"></i>
					<br>{{language.myOrder}}
				</div>
			</router-link>
			<router-link :to="fun.getUrl('myRelationship')">
				<div class="order_pub">
					<div class="badge"></div>
					<i class="iconfont icon-huiyuanzhongxin-zhengchangzhuangtai"></i>
					<br>{{language.mySubordinate}}
				</div>
			</router-link>
			<router-link :to="fun.getUrl('withdrawal')">
				<div class="order_pub">
					<div class="badge"></div>
					<i class="iconfont icon-huiyuanzhongxin-zhengchangzhuangtai"></i>
					<br>{{language.financial}}
				</div>
			</router-link>			

			<a href="javascript:void(0);">
				<div class="order_pub" @click="openQrCode('block')">
					<div class="badge"></div>
					<i class="iconfont icon-huiyuanzhongxin-zhengchangzhuangtai"></i>
					<br>{{language.QRcode}}
				</div>
			</a>
		</div>
		<template v-if="pluginsFeel">
		<div class="titleTip">免费使用</div>
		<ul class="content">
             <!--手机充值--> 
            <div class="item" style="width: 50%;" v-if="plugins.feel.phoneRecharge">
                <router-link :to= "fun.getUrl('telephone')">
                    <div class="list list1">
                        <i class="iconfont icon-shoujichongzhi1"></i>
                        <h3>{{language.phone}}</h3>
                    </div>
                </router-link>
            </div>
             <!--流量-->
            <div class="item" style="width: 50%;" v-if="plugins.feel.flow">
                <router-link :to= "fun.getUrl('flow')">
                    <div class="list list6">
                        <i class="iconfont icon-youxi"></i>
                        <h3>{{language.flow}}</h3>
                    </div>
                </router-link>
            </div>

    	</ul>
		</template>
    	<template v-if="pluginsVip">
    	<div class="titleTip" v-if="plugins.vip">会员特权专区</div>
    	<ul class="content">
            <!-- 机票 -->
            <div class="item" v-if="plugins.vip.ticket">
                <router-link :to= "fun.getUrl('ticket')">
                    <div class="list list4">
                        <i class="iconfont icon-jipiao1"></i>
                        <h3>{{language.fly}}</h3>
                    </div>
                </router-link>
            </div>
            <!-- 火车票 -->
            <div class="item" v-if="plugins.vip.trainTicket">
                <router-link :to= "fun.getUrl('trainTicket')">
                    <div class="list list5">
                        <i class="iconfont icon-huochepiao1"></i>
                        <h3>{{language.trainTicket}}</h3>
                    </div>
                </router-link>
            </div>
            <!-- 交通罚款 -->
            <div class="item" v-if="plugins.vip.trafficIndex">
                <router-link :to= "fun.getUrl('trafficIndex')">
                    <div class="list list7">
                        <i class="iconfont icon-jiaotongfakuan"></i>
                        <h3>{{language.traffic}}</h3>
                    </div>
                </router-link>
            </div>
            <!-- 电费-->
            <div class="item" v-if="plugins.vip.electricity">
                <router-link :to= "fun.getUrl('electricity')">
                    <div class="list list1">
                        <i class="iconfont icon-dianfei1"></i>
                        <h3>{{language.life}}</h3>
                    </div>
                </router-link>
            </div>
            <!-- 固话-->
            <div class="item" v-if="plugins.vip.fixedTelephone">
                <router-link :to= "fun.getUrl('fixedTelephone')">
                    <div class="list list1">
                        <i class="iconfont icon-dianfei1"></i>
                        <h3>固话</h3>
                    </div>
                </router-link>
            </div>            
            <!-- 水费-->
            <div class="item" v-if="plugins.vip.waterFee">
                <router-link :to= "fun.getUrl('waterFee')">
                    <div class="list list2">
                        <i class="iconfont icon-shuifei1"></i>
                        <h3>水费</h3>
                    </div>
                </router-link>
            </div>
           	<!-- 油卡充值 -->
            <div class="item" v-if="plugins.vip.cardServer">
                <router-link :to= "fun.getUrl('cardServer')">
                    <div class="list list2">
                        <i class="iconfont icon-youqiachongzhi"></i>
                        <h3>{{language.oilCard}}</h3>
                    </div>
                </router-link>
            </div>
            <!-- 宽带-->
            <div class="item" v-if="plugins.vip.broadband">
                <router-link :to= "fun.getUrl('broadband')">
                    <div class="list list4">
                        <i class="iconfont icon-wangfei"></i>
                        <h3>宽带</h3>
                    </div>
                </router-link>
            </div>
        </ul>
        </template>
        <!--升级为会员弹出-->
        <mt-actionsheet
		  :actions="actions"
		  v-model="sheetVisible"
		  cancelText="" v-if="$store.state.service.lang=='ch'">
		</mt-actionsheet>
		
		<mt-actionsheet
		  :actions="actions2"
		  v-model="sheetVisible"
		  cancelText="" v-else-if="$store.state.service.lang=='wei'">
		</mt-actionsheet>
		<!--我的二维码-->
		<div id="ewm" ref="hook" @click="openQrCode('none')">
			<div class="pic">			
					<img :src="poster" alt="">
			</div>
	
		</div>		
		

	</div>
</template>

<script>
	import  lifeService_controller from './lifeService_controller';
	export default lifeService_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    #ewm {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        background: rgba(140, 140, 140, 0.72);
        z-index: 9;
        display: none;
        padding-top: 5%;
        .pic {
            width: 70%;
            margin: auto;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            .title {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                img {
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                    display: inline-block;
                    vertical-align: middle;
                }
                span {
                    margin-left: 15px;
                    vertical-align: middle;
                    font-size: 1rem;
                }
            }
            .ewm {
                img {
                    width: 50%;
                    display: block;
                    float: right;
                }
            }
        }
        img {
            width: 100%;
            display: block;
        }
    }
.change2{
	border:1px solid #ccc;
	background:#f3f5f7;
	margin-top: 7px;
	border-radius: 6px;
	font-size:10px;
	padding: 0;
}
.active{background:#008000;color: #fff;}

/*弹窗样式*/
   .modal{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:rgba(0,0,0,.7);
        z-index:999;
        .modal-dialog{
            width:80%;
            height:60px;
            background:#fff;
            border-radius:6px;
            margin:70% auto;
            position:relative;
            .title{
                color:#666;
                width: 100%;
                height: 30px;
                line-height:30px;
                text-align:center;
                outline:0;
            }
        }
    }


.newLifech{
	.m-header{
		padding:15px;
		background:#fff;
		overflow:hidden;
		border-bottom:1px solid #ccc;
		.info{
			width:70%;
			float:left;
			img{
				width:75px;
				height:75px;
				float:left;
				border-radius:50%;
				background:#ccc;
			}
			p{text-align:left;margin-left:80px;line-height:22px;}
		}
		.change{
			width:20%;
			float:right;
		}
	}
	
	.proxy{
		height:40px;
		line-height:40px;
		padding:0 15px;
		margin-bottom:7px;
		background:#fff;
		span{
			float:left;
		}
		button{
			width:100px;
			height:30px;
			color:#fff;
			background:#ff951b;
			line-height:30px;
			border-radius:6px;
			outline:0;
			border:0;
			float:right;
			margin-top:5px;
		}
		button.Vipible{background: #ccc;}
	}
	.titleTip{
		height: 40px;
		line-height: 40px;
		text-align: left;
		background: #fff;
		overflow: hidden;
		margin-top: 7px;
		padding: 0 15px;
		border-bottom: 1px solid #f3f5f7;
		color: #666;
	}
	.titleTip:after{
		display: table;
		content: '';
		clear: both;
	}
}

.newLifewei{
	
	@font-face {
    font-family: "UKIJ Tor";
    src: url('http://mtmovie.cn/font/UKIJTor.eot');
    src: local('http://mtmovie.cn/font/UKIJ Tor'), url('http://mtmovie.cn/font/UKIJTor.ttf') format('truetype'), url('http://mtmovie.cn/font/UKIJTor.eot?#iefix') format('embedded-opentype'), url('http://mtmovie.cn/font/UKIJTor.woff') format('woff'), url('http://mtmovie.cn/font/UKIJTor.svg#UKIJ TOR') format('svg');
    font-weight: normal;
    font-style: normal;
	}
	font-family: "UKIJ Tor";
	
	.m-header{
		padding:15px;
		background:#fff;
		overflow:hidden;
		border-bottom:1px solid #ccc;
		.info{
			width:75%;
			float:right;
			img{
				width:75px;
				height:75px;
				float:right;
				border-radius:50%;
				background:#ccc;
			}
			.single{text-align:right;margin-right:80px;line-height:22px;span{float:right}}
		}
		.change{
			width:20%;
			float:left;
		}
	}
	
	.proxy{
		line-height:22px;
		padding:10px 15px;
		margin-bottom:7px;
		background:#fff;
		display: flex;
		flex-flow:row ;
		span{
			flex: 1;
			order:2;
			text-align: left;
			padding-left: 5px;
		}
		button{
			order:1;
			width:100px;
			height:30px;
			color:#fff;
			background:#ff951b;
			line-height:30px;
			border-radius:6px;
			outline:0;
			border:0;
			/*margin-top:5px;*/
		}
	}
	.order_all {
		.order_pub{float:right}
	}
	.content{ 
		.item{
			height: 100px;
			float: right;
		}
	}
	.titleTip{
		height: 40px;
		line-height: 40px;
		text-align: right;
		background: #fff;
		overflow: hidden;
		margin-top: 7px;
		padding: 0 15px;
		border-bottom: 1px solid #f3f5f7;
		color: #666;
	}
	.titleTip:after{
		display: table;
		content: '';
		clear: both;
	}
}


.order_all {width:100%; padding:14px 0; color:#666;overflow: hidden;background:#fff}
.order_all a i{ font-size: 28px;}
.order_pub{width: 25%;position: relative;box-sizing: border-box;
float:left; border-left:1px solid #eee; padding-top:2px; text-align:center; color:#8c8c8c; position:relative;font-size: .8rem}
.order_pub span {height:14px; background:#f30; border-radius:8px; position:absolute; top:0; right:6%;padding: 0 5px;font-size:.8rem; color:#fff; line-height:14px;}
.content{
    width:100%;
    margin:0 auto;
    overflow: hidden;background: #FFF;
    .item{
        width:33.3%;
        height:90px;
        text-align:center;
        border-right:2px solid #f3f5f7;
        border-bottom:2px solid #f3f5f7;
        float:left;
        box-sizing:border-box;
        padding-top:20px;
        background:#fff;
        .list{
            color:#000;
            i{
                font-size:30px;
            }
            h3{
                font-weight:normal;
                padding-top:10px;
                font-size:13px;
            }
        }
        .list1>i{
            color:#9cbfe4;
        }
        .list2>i{
            color:#efcd46;
        }
        .list3>i{
            color:#e78d8d;
        }
        .list4>i{
            color:#efcf4f;
        }
        .list5>i{
            color:#88ced7;
        }
        .list6>i{
            color:#8dd47e;
        }
        .list7>i{
            color:#87c5e2;
        }
    }
    .item:nth-child(3),.item:nth-child(6){
        border-right:0;
    }
    .item:after{
		display: table;
		content: '';
		clear: both;
	}
}
</style>