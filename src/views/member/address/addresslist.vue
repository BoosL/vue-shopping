<template>
    
    <div>

    	<c-title :hide="false" text='收货地址管理'></c-title>
    	<div style="height: 50px;"></div>
    	         <!--<c-addressList :datasource="list"></c-addressList>-->
        <ul v-for="(item,itemIndex) in datasource" @click.stop="selectedAddress(itemIndex)">
            <el-row :gutter="5">
                <el-col :span="1" style="display: list-item"></el-col>
            <el-col :span="22">
                    <font style="font-size: 1rem;">{{item.username}}111<span class="moblie">{{item.mobile}}</span></font>
                <br/>
                <font style="font-size: 0.85rem;color: rgba(118, 127, 138, 1);">{{item.province}}    {{item.city}}   {{item.district}}    {{item.address}}</font>
            </el-col>

            <el-col :span="18" :offset="1"><el-checkbox v-model="checkList[itemIndex]"  @change="setDefaultAddress(itemIndex)"></el-checkbox><span>设置为默认地址</span></el-col>

            <el-col :span="5"><i class="fa fa-trash-o" @click.stop="deleteHandler(item,itemIndex)"></i><i class="fa fa-pencil-square-o" @click.stop="alterHandler(itemIndex)"></i></el-col>
            </el-row>     
        </ul>
        <div style="height: 50px;"></div>
    	<div class="address_addnav" @click="addendAddress"><i class="fa fa-plus-circle"></i><span>新增收货地址</span></div>         

    </div> 
   
</template>
<script>
import address_controller from './addresslist_controller';
export default address_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    ul {

        .el-col{text-align: justify;
        .el-checkbox{margin-right: 10px; }
        span{font-size: 12px; color: #888; }
        span.moblie{float: right;font-size: 16px;color: #333;}
        i{color: #888;font-size: 1rem}

    }
        .el-col.el-col-22{
           
            padding-bottom: 10px;border-bottom: 1px dotted #ddd;
        font{line-height: 1.5rem; padding-left: 15px;
            padding-right: 15px;}
        }
    }
.address_addnav{  width:100%;  padding: 0 3% 0 6%!important;position: fixed;bottom: 0;left: 0;background: #f15353 !important;color: #fff !important;text-align: center;height: 44px !important;line-height: 44px !important;z-index: 7;}
.address_addnav i{    color: #fff;
    font-size: 22px;
    position: absolute;
    left: 50%;
    top: 50%;
    height: 18px;
    line-height: 18px;
    margin-left: -74px;
    margin-top: -9px;
}
.fa-trash-o{margin-right: 20px;font-size: 1.3rem;}
.fa-pencil-square-o{font-size: 1.3rem;}
.el-row{background: #FFF;padding: 10px 0 0;margin-bottom:10px;
	.el-col{vertical-align: middle;}
	.el-col-16{text-align: left;padding-left: 5px;}
	.el-checkbox,i,el-radio radio{line-height: 36px;}
	}
.address_addnav i{color: #fff;  font-size: 22px;  position: absolute;  top: 50%;  height: 18px;  line-height: 18px;  margin-left: -74px;  margin-top: -9px;}	
</style>