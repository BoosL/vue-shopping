<template>
	<div id="service">
		<div id="map"> <i class="iconfont icon-sousuo1"></i> {{maps}}</div>
		<ul class="content">
			<!-- 手机充值 -->
			<div class="item">
				<router-link :to="fun.getUrl('phoneRecharge')">
					<div class="list list1">
						<i class="iconfont icon-shoujichongzhi1"></i>
						<h3>手机充值</h3>
					</div>
				</router-link>
			</div>
			<!-- 油卡充值 -->
			<div class="item">
				<router-link :to="fun.getUrl('cardServer')">
					<div class="list list2">
						<i class="iconfont icon-youqiachongzhi"></i>
						<h3>油卡充值</h3>
					</div>
				</router-link>
			</div>
			<!-- 生活缴费 -->
			<div class="item">
				<router-link :to="fun.getUrl('lifePayIndex')">
					<div class="list list3">
						<i class="iconfont icon-shenghuojiaofei"></i>
						<h3>生活缴费</h3>
					</div>
				</router-link>
			</div>
			<!-- 机票 -->
			<div class="item">
				<router-link :to="fun.getUrl('ticket')">
					<div class="list list4">
						<i class="iconfont icon-jipiao1"></i>
						<h3>机票</h3>
					</div>
				</router-link>
			</div>
			<!-- 火车票 -->
			<div class="item">
				<router-link :to="fun.getUrl('trainTicket')">
					<div class="list list5">
						<i class="iconfont icon-huochepiao1"></i>
						<h3>火车票</h3>
					</div>
				</router-link>
			</div>
			<!-- 游戏 -->
			<div class="item">
				<router-link :to="fun.getUrl('gameSearch')">
					<div class="list list6">
						<i class="iconfont icon-youxi"></i>
						<h3>游戏</h3>
					</div>
				</router-link>
			</div>
			<!-- 交通罚款 -->
			<div class="item">
				<router-link :to="fun.getUrl('trafficIndex')">
					<div class="list list7">
						<i class="iconfont icon-jiaotongfakuan"></i>
						<h3>交通罚款</h3>
					</div>
				</router-link>
			</div>
		</ul>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				maps:'加载中'
			}
		},
		methods: {
			onLoaddd() {
				let that = this;
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					if(this.getStatus() == BMAP_STATUS_SUCCESS) {
				
						//console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
						var geoc = new BMap.Geocoder(); 
						var pt = new BMap.Point(r.point.lng,r.point.lat);
					
						geoc.getLocation(pt, function(rs){
							var addComp = rs.addressComponents;
							that.maps = addComp.province + addComp.city;
							//document.getElementById("map").innerHTML="<i class='iconfont icon-sousuo1'></i>"+addComp.city;
//							alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
					}); 
						
					} else {
						alert('failed' + this.getStatus());
					}
				}, {
					enableHighAccuracy: true
				})
			}
		},
		mounted() {
			this.onLoaddd();
		},

	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	#service {
		#map {
			width: 100%;
			height: 45px;
			background: #fff;
			font-size: 16px;
			color: #333;
			line-height: 45px;
			text-align: center;
			border-bottom: 1px solid #f3f5f7;
			i {
				font-size: 25px;
				vertical-align: middle;
			}
		}
		.content {
			width: 100%;
			margin: 0 auto;
			.item {
				width: 33.3%;
				height: 90px;
				text-align: center;
				border-right: 2px solid #f3f5f7;
				border-bottom: 2px solid #f3f5f7;
				float: left;
				box-sizing: border-box;
				padding-top: 20px;
				background: #fff;
				.list {
					color: #000;
					i {
						font-size: 30px;
					}
					h3 {
						line-height: 30px;
						font-weight: normal;
						padding-top: 10px;
						font-size: 13px;
					}
				}
				.list1>i {
					color: #9cbfe4;
				}
				.list2>i {
					color: #efcd46;
				}
				.list3>i {
					color: #e78d8d;
				}
				.list4>i {
					color: #efcf4f;
				}
				.list5>i {
					color: #88ced7;
				}
				.list6>i {
					color: #8dd47e;
				}
				.list7>i {
					color: #87c5e2;
				}
			}
			.item:nth-child(3),
			.item:nth-child(6) {
				border-right: 0;
			}
		}
	}
</style>