<template>
    <!-- BossL 添加电话号码   收货地址 -->
    <div id="alterAddress">
        <c-title :hide="false" text='我的信息'></c-title>
        <div style="height: 50px;"></div>
        <mt-field label="真实姓名" placeholder="请输入真实姓名" v-model='form.member_name'></mt-field>
        <mt-field label="身份证号码" placeholder="请输入身份证号码" v-model='form.member_card'></mt-field>
        <mt-field label="电话号码" placeholder="请输入手机号" v-model='form.member_phone'></mt-field>
        
        <div>
            <yd-cell-group>
                <yd-cell-item arrow>
                    <span slot="left">所在地区：</span>
                    <input slot="right" type="text" @click.stop="addressShow = true" v-model="addressName" readonly placeholder="请选择代理区域">
                </yd-cell-item>
                <yd-cell-item arrow v-if="strShow">
                     <span slot="left">街道：</span>
					 <input slot="right" type="text" @click.stop="streetChoose" v-model="form.street" readonly placeholder="请选择街道">
                </yd-cell-item>
            </yd-cell-group>

            <yd-cityselect v-model="addressShow" :callback="addressCallback" :items="district"></yd-cityselect>
        </div>
        
         <yd-popup v-model="streetShow" position="right" width="100%">
			
			<yd-navbar title="选择街道" height="40px" fontsize="14px" fixed>
				<span slot="left">
					<yd-navbar-back-icon @click.native="streetShow = false"></yd-navbar-back-icon>
				</span>
			</yd-navbar>
			<div style="clear:both;margin-top:40px;"></div>
			
			<yd-cell-item arrow v-for="item in districtVal" @click.native="streetConfirm(item.areaname)">
				<span slot="left">{{item.areaname}}</span>
			</yd-cell-item>
           
        </yd-popup>
        
        <div class="address_addnav1" @click="saveInfo"><span>确认保存</span></div>



    </div>

</template>
<script>
  import myinfo_controller from './myinfo_controller';
  export default myinfo_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>

    .address_addnav1 {
        width: 90%;
        margin: 50px auto;
        background: #f15353 !important;
        color: #fff !important;
        text-align: center;
        height: 44px !important;
        line-height: 44px !important;
        border-radius: 3px;
    }
    .address_addnav {
        width: 100%;
        padding: 0 3% 0 6% !important;
        position: fixed;
        bottom: 0;
        left: 0;
        color: #000 !important;
        text-align: center;
        height: 44px !important;
        line-height: 44px !important;
    }
    .red{
        color:red !important;
    }
    .popup-con {
        width: 100%;
    }

    #alterAddress .mint-field .mint-cell-title {
        text-align: left;
    }

    .address_addnav i {
        color: #fff;
        font-size: 22px;
        position: absolute;
        top: 50%;
        height: 18px;
        line-height: 18px;
        margin-left: -34px;
        margin-top: -9px;
    }

    .maleall {
        background: #FFF;
        text-align: left;
    }

    #alterAddress .males {
        line-height: 50px;
        display: flex;
        border-top: 1px solid #d9d9d9;
        margin-left: 10px;
    }
    .mydefault {
        line-height: 50px;
        display: flex;
        border-top: 1px solid #d9d9d9;
        margin-left: 10px;
        align-items: center;
    }

    .maleall span {
        font-size: 16px;
        vertical-align: middle;
        width: 105px;
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
    }

    .address {
        flex: 1;
        line-height: 50px;
        .mint-button--default {
            line-height: 50px;
            text-align: left;
            font-size: 16px;
        }
    }
</style>