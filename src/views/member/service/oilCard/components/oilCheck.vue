<template>
   	<div id="oilCheck" :class="'oilCheck'+$store.state.service.lang">	
        <ul class="box">
            <li v-for="item in items">
                <div class="left">
                    <p class="one">{{language.cardNum}}{{item.card}}</p>
                    <p class="two">{{item.data}}</p>
                </div>
                <div class="right">
                    <b>{{item.pay}}</b>
                    <p>¥{{item.price}}</p>
                </div>
                
            </li>
        </ul>
    </div>
</template>

<script>
import cTitle from 'components/title';

export default{
    components:{cTitle},
    data(){
        return{
        	//存放语言
			language:{},
            items:[
                {card:"1232143434343",data:"2017-05-11 11:00:00",pay:"待支付",price:"44.5"},
                {card:"12389099984343",data:"2017-05-11 21:00:00",pay:"支付成功",price:"104"}
            ]
        }
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
				this.language=JSON.parse(sessionStorage.languageService).oilCheck;
			}else{
				this.language=this.$store.state.service.languageService.oilCheck;
			}
	  	}
	},
	
	mounted(){
		if(sessionStorage.languageService){
			this.language=JSON.parse(sessionStorage.languageService).oilCheck;
		}else{
			this.language=this.$store.state.service.languageService.oilCheck;
		}
	},
	
	activated(){
		this.$store.commit('onload');
	},
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.oilCheckch{
    background:#fff;
    .box{
        padding:0 15px;
        overflow:hidden;
        li{
            padding: 10px 0;
            border-bottom:1px solid #ccc;
            div.left{
                width:70%;
                float:left;
                .one{
                    text-align:left;
                    font-size:16px;
                    font-weight:bold;
                    line-height:40px;
                }
                .two{
                    font-size:13px;
                    color:#333;
                    text-align:left;
                }
            }
            div.right{
                width:30%;
                text-align:right;
                float: right;
                b{
                    color:#ff951b;
                    font-size:13px;
                    font-weight:normal;
                    line-height:30px;
                }
                p{
                    font-size:16px;
                }
            }
        }
        li:last-child{
            border-bottom:none;
            margin-bottom:10px;
        }
        li:after{
            display:table;
            content:'';
            clear:both;
        }
    }
}

.oilCheckwei{
    background:#fff;
    .box{
        padding:0 15px;
        overflow:hidden;
        li{
            padding: 10px 0;
            border-bottom:1px solid #ccc;
            div.left{
                width:70%;
                float:right;
                text-align:right;
                .one{
                    font-size:16px;
                    font-weight:bold;
                    line-height:40px;
                }
                .two{
                    font-size:13px;
                    color:#333;
                }
            }
            div.right{
                width:30%;
                text-align:left;
                float: left;
                b{
                    color:#ff951b;
                    font-size:13px;
                    font-weight:normal;
                    line-height:30px;
                }
                p{
                    font-size:16px;
                }
            }
        }
        li:last-child{
            border-bottom:none;
            margin-bottom:10px;
        }
        li:after{
            display:table;
            content:'';
            clear:both;
        }
    }
}
</style>