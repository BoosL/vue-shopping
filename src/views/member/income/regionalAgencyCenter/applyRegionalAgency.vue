<template>
    <div id="areaAgent">
        <div class="banner">
            <img src="../../../../assets/images/myextension.png">
        </div>
    
        <!--可申请-->
        <div class="content" v-if="apply=='1'">
            <input v-model="name" type="text" placeholder="请填写姓名" class="inp">
            <input v-model="phone" type="number" placeholder="请填写手机号" class="inp">
            <el-select v-model="selectLevel" placeholder="代理等级">
                <el-option v-for="item in level" :label="item.name" :value="item"></el-option>
            </el-select>
    
            <el-select class="select1" v-model="provicevalue" @change="selectProviceHandle" placeholder="省级区域">
                <el-option v-for="item in provinceoptions" :label="item.areaname" :value="item"></el-option>
            </el-select>
    
            <el-select v-model="cityvalue" @change="selectCityHandle" placeholder="市级区域">
                <el-option v-for="item in cityoptions" :label="item.areaname" :value="item">
                </el-option>
            </el-select>
    
            <el-select v-model="regionvalue" placeholder="区/县级区域" @change="selectRegionHandle">
                <el-option v-for="item in regionoptions" :label="item.areaname" :value="item">
                </el-option>
            </el-select>
    
            <input type="text" placeholder="请填写街道/乡镇区域" class="inp" v-model="district" style="display:none">
    
            <button type="button" @click="submit(false)" class="submit">提 交</button>
        </div>
    
        <!--驳回再次提交审核-->
        <div class="content" v-if="apply=='2'">
    
            <input v-model="name" type="text" placeholder="请填写姓名" class="inp">
            <input v-model="phone" type="number" placeholder="请填写手机号" class="inp">
            <el-select v-model="selectLevel" placeholder="代理等级">
                <el-option v-for="item in level" :label="item.name" :value="item"></el-option>
            </el-select>
    
            <el-select class="select1" v-model="provicevalue" @change="selectProviceHandle" placeholder="省级区域">
                <el-option v-for="item in provinceoptions" :label="item.areaname" :value="item"></el-option>
            </el-select>
    
            <el-select v-model="cityvalue" @change="selectCityHandle" placeholder="市级区域">
                <el-option v-for="item in cityoptions" :label="item.areaname" :value="item">
                </el-option>
            </el-select>
    
            <el-select v-model="regionvalue" placeholder="区/县级区域" @change="selectRegionHandle">
                <el-option v-for="item in regionoptions" :label="item.areaname" :value="item">
                </el-option>
            </el-select>
    
            <input type="text" placeholder="请填写街道/乡镇区域" class="inp" v-model="district" style="display:none">
    
            <button type="button" @click="submit(true)" class="submit">提 交</button>
    
            <!--<div class="ico">
                    <i class="fa fa-check"></i>
                </div>
                <div class="text">{{tipMsg}}</div>
                <a @click="submitAgain()">
                    <div class="sub">再次提交审核</div>
                </a>-->
        </div>
    
        <!--待审核-->
        <div class="success" v-if="apply=='0'">
            <div class="ico">
                <i class="fa fa-check"></i>
            </div>
            <div class="text">{{tipMsg}}</div>
            <a @click="goHome()">
                <div class="sub">去商城逛逛</div>
            </a>
        </div>
    
        <!--申请被驳回不可再申请-->
        <div class="success" v-if="apply=='3'">
            <div class="ico">
                <i class="fa fa-check"></i>
            </div>
            <div class="text">{{tipMsg}}</div>
            <a @click="goHome()">
                <div class="sub">去商城逛逛</div>
            </a>
        </div>
    
        <div class="vip_main" v-if="!isCheck">
            <div class="title">推广特权</div>
            <div class="vip vip1">
                <div class="ico1">
                    <i class="fa fa-qrcode"></i>
                </div>
                <div class="text">
                    <div class="t1">专属二维码</div>
                    <div class="t2">拥有专属推广二维码，用于推广客户；</div>
                </div>
            </div>
            <div class="vip">
                <div class="ico2">
                    <i class="fa fa-cny"></i>
                </div>
                <div class="text">
                    <div class="t1">推广收入</div>
                    <div class="t2">推广的客户购买商品后，您将获得相应的推广收入；</div>
                </div>
            </div>
    
        </div>
    
    </div>
</template>


<style  lang="scss" rel="stylesheet/scss" scoped>
#areaAgent {
    .m_header {
        width: 100%;
        height: 45px;
        color: #000;
        text-align: center;
        span {
            width: 150px;
            line-height: 45px;
            font-size: 16px;
        }
    }
    .content {
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        background: #fff;
        .el-select {
            width: 100%;
            height: 40px;
            margin-bottom: 10px;
            .el-input__inner {
                color: #000 !important;
                font-size: 16px !important;
                border: 1px solid #b8b8b8;
            }
        }

        .submit {
            width: 100%;
            height: 40px;
            border-radius: 6px;
            background-color: #f15353;
            text-align: center;
            line-height: 40px;
            color: #fff;
            border: 0;
            outline: 0;
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
        }
        input {
            display: block;
            margin-bottom: 13px;
            width: 100%;
            border-radius: 5px;
            padding: 0 5px;
            box-sizing: border-box;
            outline: none;
            font-size: 16px;
            height: 36px;
            line-height: 1;
        }

        .inp {
            border: 1px solid #b8b8b8;
        }
        .inp:focus {
            border-color: #F55955;
            box-sizing: border-box;
        }
    }

    .banner {
        width: 100%;
        background: #fff;
        height: 100%;
        img {
            width: 100%;
        }
    }
    .vip_main {
        background: #ffffff;
        margin: 15px 0;
        .title {
            padding: 10px;
            font-size: .8rem;
            border-bottom: 1px solid #eeeeee;
            text-align: center
        }
        .vip {
            padding: 15px 10px;
            overflow: hidden;
            font-size: .8rem;
            color: #999;
            .ico1,
            .ico2 {
                width: 15%;
                float: left;
            }
            .ico1 {
                i {
                    background: #32cd32;
                }
            }
            .ico2 {
                i {
                    background: #fece00;
                }
            }
            .text {
                float: left;
                width: 85%;
                .t1 {
                    font-size: .95rem;
                    color: #333;
                    margin-bottom: 5px;
                    text-align: left;
                }
                .t2 {
                    text-align: justify;
                }
            }
            i {
                background: #32cd32;
                height: 36px;
                width: 36px;
                border-radius: 18px;
                color: #fff;
                text-align: center;
                line-height: 38px;
                font-size: 1.2rem;
            }
        }
        .vip1 {
            border-bottom: 1px solid #eeeeee;
        }
    }
}

#areaAgent .success {
    height: 200px;
    padding-top: 65px;
    background: #ffffff;
    .ico {
        height: 65px;
        width: 65px;
        margin: auto;
        border: 3px solid #32cd32;
        border-radius: 4rem;
        color: #32cd32;
        font-size: 2.3rem;
        text-align: center;
        line-height: 4rem;
    }
    .text {
        height: 2rem;
        margin-top: 30px;
        color: #666;
        line-height: 1.6rem;
        text-align: center;
    }
    a .sub {
        height: 2rem;
        width: 80%;
        background: #f55955;
        margin: 20px auto;
        border-radius: 2rem;
        color: #fff;
        line-height: 2rem;
        text-align: center;
        font-size: .9rem;
        margin-bottom: 20px;
    }
    a .sub:focus {
        background: #d8403c;
    }
}
</style>

<script>
import apply_regional_agency_controller from './apply_regional_agency_controller';
export default apply_regional_agency_controller;

</script>




























