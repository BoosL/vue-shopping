<template >
    <div>
        <div style="height:10px"></div>
        <div class="my-value">
			  <el-select v-model="form.express_company" placeholder="请选择" style="width:100%">
    				<el-option v-for="item in express"  :label="item.name" :value="item"></el-option>
  			  </el-select>
		</div>
        <!--<el-input v-model="express_name"
                  placeholder="请输入快递公司"></el-input>-->
                  <div style="height:10px"></div>
        <el-input v-model="form.express_sn"
                  placeholder="请输入快递单号"></el-input>
                  <div style="height:40px"></div>
    <el-button type="primary" size='large' style="width: 100%;" @click="submitInfo">提交信息</el-button>
    </div>
</template>
<script>
import order_after_express_info_controller from './order_after_express_info_controller';
export default order_after_express_info_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#refund{    text-align: left;
	font{background: #FFF;display: block;color: #f15353;line-height: 2rem;padding: 0 10px;font-size: .7rem;}
	.my_wrapper{background: #FFF; overflow: hidden; display: flex; padding: 10px; align-items: center;
		span{width:105px;flex: none;font-size: 16px;line-height: 1;}
		.my-value{flex: 2;text-align: left; span{color: red;}}
		.mint-popup{width: 100%;}
	}
	
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
