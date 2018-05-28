<template>
    
    <div id="integral">
    	<c-title :hide="false" text='积分'></c-title>
    	<div style="height: 40px;"></div>
    	<div id="integral2">
			<span>当前积分</span>
    		<div class="nune"><b>{{integral}}</b>分</div>
    	</div>
		<div id="integral3" style="display: none;">
			<img src="../../../assets/images/ico-integral.png" alt="">
			<span>花积分</span>
    	</div>
		
    	<p id="mszf"><span>近期收支明细</span><i class="fa fa-angle-right" style="font-size:17px;padding-left:5px;"></i>
    		<router-link :to="fun.getUrl('integrallist',{selected:'1'})"><span class="more">更多</span></router-link>
    	</p>
		<div id="tbs" v-for="item in mydata">
			<div class="left">{{item.mode_name}}<br /><span>{{item.updated_at}}</span></div>
			<div class="right add" v-if="item.point<0">{{item.point}}</div>
			<div class="right reduce" v-if="item.point>0">+{{item.point}}</div>
		</div>
 		<!--<div id="tbs">
			<div class="left">业务类型<br /><span>2017-03-03  17:00:00</span></div>
			<div class="right reduce">+98431</div>
		</div>   	-->
    </div>
   
</template>
<script>
import integral from './member_integralcontroller';
export default integral;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#integral{
	#integral2{background: #e84e40;color: #FFF;padding: 30px 10px; overflow: hidden;
		.nune{float: right;    font-size: .7rem;
			b{font-size:2rem;font-weight: normal;}
		}
		span{float: left;    line-height: 3rem}
	}
	#integral3{    background: #e2483a;
		font-size: .9rem;color: #FFF;box-shadow: 0px 3px 5px #de4141 inset;line-height: 1.2rem; padding: 0 0 10px;
	img{position: relative;
		right: 0px;
		bottom: -7px;
		width: 25px;    margin-right: 10px;}}
	#mszf{    background: #f5f5f5;
		margin: 10px 0 0 0;
		padding: 0 10px;
		text-align: left;
		font-weight: normal;
		font-size: .8rem;
		height: 2rem;
		box-sizing: border-box;
		line-height: 2rem;
		span{float: left;color: #888888;}
		a{color: #000;}
		.more,i{float: right;line-height: 2rem;}
	}
	#tbs{ display: flex;align-items:center; background: #FFF; flex-flow: row wrap; padding:10px; line-height: 1.5rem;border-bottom: 1px solid #D9D9D9;
		.left{text-align: left;flex: 50%;color:#333;
			span{color:#888888;font-size: .7rem;}
		}
		.right{text-align: right;flex: 50%;    font-size: 1.1rem;}
		.add{color: #259b24;}
		.reduce{color: #e51c23;}
	}
}
</style>