<template>
	<div id="trafficIndex" :class="'trafficIndex'+$store.state.service.lang">
		<c-title :hide="false" :text='language.title' tolink='trafficRecord' :totext='language.fineRecord'></c-title>
		<div style="height:40px"></div>
		
		<ul class="content">
			<!--缴费城市-->
			<li>
				<label>{{language.payCity}}</label>
				<div class="traffic"> <span id="chooseCity"></span> 
					<router-link :to= "fun.getUrl('trafficCity')">
                    	<i class="iconfont icon-right" v-if="$store.state.service.lang=='ch'"></i>
						<i class="iconfont icon-left" v-else="$store.state.service.lang=='wei'"></i>
               		</router-link>
				</div>
			</li>
			<!--交通罚款-->
			<li class="nobot">
				<label>{{language.trafficFine}}</label>
				<div class="traffic other">
					{{finebill}}<i class="iconfont icon-down" @click="popfinebill"></i>
				</div>
				<mt-popup
				  	v-model="popupVisible"
				  	position="bottom">
					<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
				</mt-popup>
			</li>
			<!--车牌号-->
			<li>
				<label class="hasright">{{licensePlate}}<i class="iconfont icon-down" @click="poplicensePlate"></i></label>
				<input type="text" class="traffic" placeholder="请输入车牌号"/>
				<mt-popup
				  	v-model="popupVisible2"
				  	position="bottom">
					<mt-picker :slots="slots2" @change="onValuesChange2"></mt-picker>
				</mt-popup>
			</li>
			<!--车辆类型-->
			<li>
				<label>{{language.vehicleType}}</label>
				<div class="traffic other">
					{{vehicleType}} <i class="iconfont icon-down" @click="popVehicleType"></i>
				</div>
				<mt-popup
				  	v-model="popupVisible3"
				  	position="bottom">
					<mt-picker :slots="slots3" @change="onValuesChange3"></mt-picker>
				</mt-popup>
			</li>
			<!--车架号-->
			<li>
				<label>{{language.trafficNum}}</label>
				<input type="text" class="traffic" placeholder="请输入车架号后6位"/>
			</li>
			<!--发动机号-->
			<li class="nobot">
				<label>{{language.engineNum}}</label>
				<input type="text" class="traffic" placeholder="请输入发动机号"/>
			</li>
			<!--违章单号-->
			<li>
				<label>{{language.violationNum}}</label>
				<input type="text" class="traffic" placeholder="请输入违章单号"/>
			</li>
			<!--罚金-->
			<li>
				<label>{{language.fine}}</label>
				<div class="traffic">
					
				</div>
			</li>
			<!--滞纳金-->
			<li class="nobot">
				<label>{{language.lateFee}}</label>
				<div class="traffic">
					
				</div>
			</li>
			
		</ul>
		
		<router-link :to= "fun.getUrl('trafficConfirmOrder')">
        	<div class="btn">
				<button>{{language.btn}}</button>
			</div>
   		</router-link>
		
		
	</div>
</template>

<script>	
import  trafficIndex_controller from './trafficIndex_controller';
export default trafficIndex_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
*{box-sizing: border-box;}
.trafficIndexch{
	.content{
		li{
			padding:0 15px;
			background:#fff;
			height:45px;
			line-height: 45px;
			display: flex;
			flex-flow: row;
			border-bottom:1px solid #e2e2e2;
			label{
				width: 80px;
				text-align: left;
				line-height: 45px;
				i{ font-size: 25px;vertical-align: middle;}
			}
			input{border:0;outline: 0;}
			.traffic{
				flex: 1;
				padding-left: 10px;
				text-align: left;
				line-height: 43px;
				color:#a5a5a5;
				i{float: right; font-size: 25px;color:#a5a5a5;}
			}
			.other{color:#333}
			.hasright{border-right: 1px solid #e2e2e2;}
		}
		.nobot{
			border-bottom:0;
			margin-bottom: 10px;
		}
	}
	.btn{
		padding:0 15px;
		button{
			width:100%;
			border-radius: .2rem;
		    font-weight: 400;
		    vertical-align: middle;
		    white-space: nowrap;
		    background-color: #ff9914;
		    display: block;
		    font-size: 1.1rem;
		    color: #fff;
		    margin-top: 25px;
		    border:0;
		    outline:0;
		    padding: 6px 0;
		}
		
	}
}
.trafficIndexwei{
	.content{
		li{
			padding:0 15px;
			background:#fff;
			height:45px;
			line-height: 45px;
			display: flex;
			flex-flow: row;
			border-bottom:1px solid #e2e2e2;
			label{
				width: 80px;
				text-align: right;
				line-height: 45px;
				order: 2;
				i{ font-size: 25px;vertical-align: middle;}
			}
			input{border:0;outline: 0;}
			.traffic{
				order: 1;
				flex: 1;
				padding-right: 10px;
				text-align: right;
				line-height: 43px;
				color:#a5a5a5;
				i{float: left; font-size: 25px;color:#a5a5a5;}
			}
			.other{color:#333}
			.hasright{border-left: 1px solid #e2e2e2;}
		}
		.nobot{
			border-bottom:0;
			margin-bottom: 10px;
		}
	}
	.btn{
		padding:0 15px;
		button{
			width:100%;
			border-radius: .2rem;
		    font-weight: 400;
		    vertical-align: middle;
		    white-space: nowrap;
		    background-color: #ff9914;
		    display: block;
		    font-size: 1.1rem;
		    color: #fff;
		    margin-top: 25px;
		    border:0;
		    outline:0;
		    padding: 6px 0;
		}
		
	}
}
</style>