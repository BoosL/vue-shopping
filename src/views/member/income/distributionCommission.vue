<template>
    
    <div id="distributionCommission">
    	<c-title :hide="false" text='未提现分销佣金'></c-title>
    	<div style="height: 40px;"></div>
		<!-- tab-container -->
		<div id="income">
			<p>可提现收入（元）</p>
			<h3>981.87</h3>
			<span>成功提现收入：984533.59</span>
		</div>
		<ul id="gongge">
			<li>
				累计收入<br />
				<b>33,811.03</b><br />
				<span>所有收入</span>		
			</li>
			<li>
				累计收入<br />
				<b>33,811.03</b><br />
				<span>所有收入</span>		
			</li>
			<li>
				累计收入<br />
				<b>33,811.03</b><br />
				<span>所有收入</span>		
			</li>
		</ul>
<el-button type="danger"><router-link to="/member/withdrawal">我要提现</router-link></el-button>
    </div>
   
</template>
<script>
import cTitle from 'components/title';
import { Navbar } from 'mint-ui';
  export default {
    data() {
      return {
				toi:window.localStorage.i,
        selected: '1'
      };
    },
    methods:{

    },
    components: { cTitle }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#distributionCommission{
	a{color: #000;}
	#income{background: #f15353;padding: 10px;color: #FFF;text-align: left;
		h3{border-bottom: 1px #FFF solid;line-height: 3rem;font-size: 1.5rem;margin: 5px 0;}

		p{font-size: 1rem;}
	}
	#gongge{
		display: flex;background: #FFF;padding: 0 15px;flex-wrap:wrap;align-items:center;align-items:center; justify-content:space-between;
			li{flex: 50%;text-align: left;padding: 10px 0;
				b{font-size: 1.2rem;line-height: 2rem;}
				span{color: #bbbbbb;}
			}
	}
	.el-button{width: 95%;margin: 10px 0; a{color: #FFF;display: block;}}
}
</style>