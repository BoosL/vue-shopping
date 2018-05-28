<template>
	<div id="rentFoot">
		<ul>  
			<router-link  v-for='(data,key,index) in datas' :to="fun.getUrl(data.toUrl,data.tag)">
				<li>
					<i :class="data.icon"></i> <span>{{data.data}}</span>
				</li>  
			</router-link>
		</ul> 
	</div>
</template>

<script>

	export default{
		data(){
			return{
				qwerqwre:"0",
				datas: {  
					data1: {  
						icon:"iconfont icon-shouye-zhengchangzhuangtai",
						data: "我要租",  
						tag:{},
						ifAdd: 0 ,
						toUrl:"rentIndex"
					},  
					data2: {  
						icon:"iconfont icon-xinxi",
						data: "订单",  
						tag:{status:"0"},//全部订单
						ifAdd: 1 ,
						toUrl:"rentMyOrder"
					},  
					data3: {  
						icon:"iconfont icon-huiyuanzhongxin-zhengchangzhuangtai",
						data: "我的",  
						tag:{},
						ifAdd: 2 ,
						toUrl:"rentCenter"
					}   
				}	
			}
		}

	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#rentFoot{
	position:fixed;
	bottom:0;
	height:45px;
	line-height:45px;
	width:100%;
	background:#fff;
	border-top:1px solid #ccc;
	ul{
		a{
			color:#101010;
			li{
				float:left;
				width:33.3%;
				i{font-size:28px; vertical-align:middle;}
			}
		}
		
	}
	.active{color:#e51c23}
}
</style>