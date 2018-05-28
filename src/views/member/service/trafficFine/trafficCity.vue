<template>
	<div id="trafficCity" :class="'trafficCity'+$store.state.service.lang">
		<c-title :hide="false" :text='language.title'></c-title>
        <div class="input">
            <input type="text" :placeholder="language.placeTip" />
        </div>

        <mt-navbar v-model="selected" id='selecteds' fixed>
          <mt-tab-item id="1">{{language.domestic}}</mt-tab-item>
          <mt-tab-item id="2">{{language.International}}</mt-tab-item>
        </mt-navbar>
        <div style="height: 40px;"></div>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <!-- right fixed -->
                <ul class="innerRig">
                    <li class="quickLocation">{{language.positiona}}</li><li class="letter" data-id="1">A</li><li class="letter" data-id="2">B</li><li class="letter" data-id="3">C</li><li class="letter" data-id="4">D</li><li class="letter" data-id="5">E</li><li class="letter" data-id="6">F</li><li class="letter" data-id="7">G</li><li class="letter" data-id="8">H</li><li class="letter" data-id="9">J</li><li class="letter" data-id="10">K</li><li class="letter" data-id="11">L</li><li class="letter" data-id="12">M</li><li class="letter" data-id="13">N</li><li class="letter" data-id="14">P</li><li class="letter" data-id="15">Q</li><li class="letter" data-id="16">R</li><li class="letter" data-id="17">S</li><li class="letter" data-id="18">T</li><li class="letter" data-id="19">W</li><li class="letter" data-id="20">X</li><li class="letter" data-id="21">Y</li><li class="letter" data-id="22">Z</li>
                </ul>
                <!-- left inner -->
                <div class="content">
                    <div class="location">
                        <p class="title">{{language.currentLocation}}</p>
                        <div id="map"> <i class="iconfont icon-sousuo1"></i>{{language.loading}}</div>
                    </div>
                    <div class="list" v-for="item in allCitys">
                        <p class="title">{{item.sign}}</p>
                        <ul>
                            <li v-for="city in item.citys" @click="chooseCity($event)">{{city}}</li>
                        </ul>
                    </div>
                </div>
            </mt-tab-container-item>

            <mt-tab-container-item id="2">
                <ul class="innerRig"><li class="quickLocation">{{language.positiona}}</li><li class="letter" data-id="1">A</li><li class="letter" data-id="2">B</li><li class="letter" data-id="3">C</li><li class="letter" data-id="4">D</li><li class="letter" data-id="5">E</li><li class="letter" data-id="6">F</li><li class="letter" data-id="7">G</li><li class="letter" data-id="8">H</li><li class="letter" data-id="9">J</li><li class="letter" data-id="10">K</li><li class="letter" data-id="11">L</li><li class="letter" data-id="12">M</li><li class="letter" data-id="13">N</li><li class="letter" data-id="14">P</li><li class="letter" data-id="15">Q</li><li class="letter" data-id="16">R</li><li class="letter" data-id="17">S</li><li class="letter" data-id="18">T</li><li class="letter" data-id="19">W</li><li class="letter" data-id="20">X</li><li class="letter" data-id="21">Y</li><li class="letter" data-id="22">Z</li></ul>
                <!-- left inner -->
                <div class="content">
                    <div class="location">
                        <p class="title">{{language.currentLocation}}}</p>
                        <div id="map2"> <i class="iconfont icon-sousuo1"></i> {{language.loading}}</div>
                    </div>
                    <div class="list" v-for="item in allCitys">
                        <p class="title">{{item.sign}}</p>
                        <ul>
                            <li v-for="city in item.citys" @click="chooseCity($event)">{{city}}</li>
                        </ul>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <!-- tab-containerEnd -->
	</div>
</template>
<script>
	import cTitle from 'components/title';
	import { mapState,mapMutations } from 'vuex';

	require('c-swipe/dist/swipe.css');
	export default {

		data() {
			return {
				language:{},
				
				selected:'1',
                allCitys:[
                    {sign:"A",citys:["鞍山","安阳","安顺","安庆"]},
                    {sign:"B",citys:["北京","蚌埠","包头","保定","白银","宝山"]},
                    {sign:"C",citys:["重庆","成都","长沙","承德"]},
                    {sign:"D",citys:["大连","大庆","大同","丹东","大冶"]},
                    {sign:"E",citys:["鞍山","安阳","安顺","安庆"]}
                ]
			}
		},

		components: { cTitle},
		methods: {
			onLoaddd() {
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					if(this.getStatus() == BMAP_STATUS_SUCCESS) {
				
						console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
						var geoc = new BMap.Geocoder(); 
						var pt = new BMap.Point(r.point.lng,r.point.lat);
					
						geoc.getLocation(pt, function(rs){
							var addComp = rs.addressComponents;
							document.getElementById("map").innerHTML="<i class='iconfont icon-sousuo1'></i>"+addComp.city;
							document.getElementById("map2").innerHTML="<i class='iconfont icon-sousuo1'></i>"+addComp.city;
//							alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
					}); 
						
					} else {
						alert('failed' + this.getStatus());
					}
				}, {
					enableHighAccuracy: true
				})
			},
			
			chooseCity(e){
				var texta=e.currentTarget.innerHTML;
				this.$router.push(this.fun.getUrl('trafficIndex',{cityName:texta}));
			},
			//初始化语言
		  	initLang(){
		  		if(sessionStorage.languageService){
					this.language=JSON.parse(sessionStorage.languageService).trafficCity;
				}else{
					this.language=this.$store.state.service.languageService.trafficCity;
				}
		  	},
		},
		//实时监测this.$store.state.service.chinese的变化，获取最新的语言包
		computed: {
			  	getLangState() {
					return this.$store.state.service.languageService;
			  	}
		},
		watch: {
		  	getLangState(val) {
			   	if(val){
					this.language=JSON.parse(sessionStorage.languageService).trafficCity;
				}else{
					this.language=this.$store.state.service.languageService.trafficCity;
				}
		  	},
		},
		
		mounted(){
			this.onLoaddd();
			this.initLang();
		},
		
		activated(){
			this.$store.commit('onload');
		},
		
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.trafficCitych {
        .input{
            margin-top:40px;
            padding:10px 5%;
            position:fixed;
            z-index:999;
            background:#eee;
            width:90%;
            input{
                width:90%;
                height:35px;
                border-radius:6px;
                padding-left:30px;
                border:0;
                outline:0;
                background:url(../../../../assets/images/search.png) no-repeat 10px 10px #fff;
            }
        }
		.mint-navbar.is-fixed{top:40px;margin-top:55px;}
		.mint-navbar .mint-tab-item.is-selected{border-bottom: 2px solid #1bba9e;color:#1bba9e;}
		.mint-navbar .mint-tab-item:first-child{border-right: #E3E3E3 solid 1px;}
		.innerRig{position: fixed;width: 40px;z-index: 99;right: 0;top:141px;bottom: 0;display: flex;flex-direction: column;color:#1bba9e;background: #FFF;
		    li{flex: 1;}
		}

        .content{
            margin-top:100px;
            padding-top:10px;
            text-align:left;
            .location{
                padding:0 15px;
                .title{
                    color:#666;
                    font-size:12px;
                    line-height:30px;
                }
                div{
                    width:30%;
                    height:30px;
                    background:#fff;
                    font-size:16px;
                    color:#333;
                    line-height:30px;
                    text-align:center;
                    border-radius:4px;
                }
            }
            .list{
                .title{
                    color:#666;
                    font-size:12px;
                    line-height:20px;
                    padding-left:15px;
                }
                ul{
                    padding-left:46px;
                    background:#fff;
                    li{
                        width:100%;
                        height:30px;
                        line-height:30px;
                        border-bottom:1px solid #ccc;
                        color:#333;
                    }
                    li:last-child{border:0}
                }
            }
        }
	}
	
	
	.trafficCitywei {
        .input{
            margin-top:40px;
            padding:10px 5%;
            position:fixed;
            z-index:999;
            background:#eee;
            width:90%;
            input{
                width:90%;
                height:35px;
                border-radius:6px;
                padding-left:30px;
                border:0;
                outline:0;
                background:url(../../../../assets/images/search.png) no-repeat 10px 10px #fff;
            }
        }
		.mint-navbar.is-fixed{top:40px;margin-top:55px;}
		.mint-navbar .mint-tab-item.is-selected{border-bottom: 2px solid #1bba9e;color:#1bba9e;}
		.mint-navbar .mint-tab-item:first-child{border-right: #E3E3E3 solid 1px;}
		.innerRig{position: fixed;width: 40px;z-index: 99;left: 0;top:141px;bottom: 0;display: flex;flex-direction: column;color:#1bba9e;background: #FFF;
		    li{flex: 1;}
		}

        .content{
            margin-top:100px;
            padding-top:10px;
            text-align:left;
            .location{
                padding:0 15px;
                height:65px;
                .title{
                    color:#666;
                    font-size:12px;
                    line-height:30px;
                    text-align: right;
                }
                div{
                    width:30%;
                    height:30px;
                    background:#fff;
                    font-size:16px;
                    color:#333;
                    line-height:30px;
                    text-align:center;
                    border-radius:4px;
                    float: right;
                }
            }
            .list{
                .title{
                    color:#666;
                    font-size:12px;
                    line-height:20px;
                    padding-right:15px;
                    text-align: right;
                }
                ul{
                    padding-right:46px;
                    background:#fff;
                    li{
                        width:100%;
                        height:30px;
                        line-height:30px;
                        border-bottom:1px solid #ccc; 
                        color:#333;
                        text-align: right;
                    }
                    li:last-child{border:0}
                }
            }
        }
	}
</style>