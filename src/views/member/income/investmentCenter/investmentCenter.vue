<template>
    <div id="investmentCenter">
       <div class="m_header">
           <span class="iconfont icon-left"></span>
           <p>招商员分红比例：1%</p>
       </div>
       <ul class="today_bonus">
           <li v-for="item in ratioDatas" :class="item.name">
               <span>{{item.money}}</span> <br>
               <b>{{item.data}}</b>
           </li>
           <li class="line"><div class="careat"></div></li>
       </ul>

       <div class="merchants_content">
           <ul class="tab-btn">
               <li :class="{active:isActive}" @click="changeActive(true)">我的供应商</li>
               <li :class="{active:!isActive}" @click="changeActive(false)">供应商分红详情</li>
           </ul>
           <my-merchants :searchVal="searchValue" :merchantsList="merchantsList" v-if="isActive" @emitFocus="beginSearch"></my-merchants>
           <my-profits v-else @emitFocus="beginSearch" :searchVal="searchValue" :merchantsList="merchantsList"></my-profits>
       </div>

       <!-- //搜索弹窗 -->
       <div class="modal" :class="{serchActive:showSearch}">
            <div class="input">
                <i class="el-icon-arrow-left" @click="goBack"></i>
                <input v-if="isSupport" v-model="searchVal" type="search" name="" @keyup.enter="searching" placeholder="搜索供应商ID/昵称/姓名">
                <input v-else v-model="searchVal" type="search" name="" @keyup.enter="searching" placeholder="搜索订单编号">
            </div>
            <div class="modal-dialog" v-if="isSupport">
                <h1>时间</h1>
                <div class="select-time">
                    <div class="block">
                        <el-date-picker
                          v-model="value1"
                          type="date"
                          placeholder="选择起始日期"
                          :picker-options="pickerOptions0">
                        </el-date-picker>
                    </div>
                     <span>~</span>
                    <div class="block">
                        <el-date-picker
                           v-model="value2"
                           align="right"
                           type="date"
                           placeholder="选择终结日期"
                           :picker-options="pickerOptions1">
                        </el-date-picker>
                    </div>
                </div>
                <button type="button" @click="searching"  class="submit">确定</button>

            </div>
       </div>
    </div>
</template>

<script>
    import investmentCenter_controller from "./investmentCenter_controller";
    export default investmentCenter_controller;
</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
p,ul,li{margin:0; padding:0;}
.serchActive{
    display: none !important;
}

#investmentCenter{
    .m_header{
        width:100%;
        height:45px;
        line-height:45px;
        background:#f15353;
        color:#fff;
        span{
            display:inline-block;
            width:16px;
            height:24px;
            float:left;
            margin-left:10px;
            font-size:30px;
        }
        p{
            width:150px;
            float:right;
            padding-right:10px;
            font-size:15px;
        }
    }
    .today_bonus{
        width:100%;
        height:82px;
        margin-top:10px;
        background:#fff;
        padding:20px 0;
        box-sizing:border-box;
        position:relative;
        li.line{
            position:absolute;
            width: 1px;
            height: 82px;
            background:#ccc;
            top:0;
            right:32%;
            .careat{
                width:8px;
                height:8px;
                border:1px solid #ccc;
                border-left:0;
                border-bottom:0;
                -webkit-transform: rotate(45deg);
                   -moz-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                     -o-transform: rotate(45deg);
                        transform: rotate(45deg);
                        background:#fff;
                position:absolute;
                top:37px;
                right:-4px;
            }
        }
        li{
            height:44px;
            text-align:center;
            float:left;
            span{

                font-size:17px;
                line-height:26px;
            }
            b{
                font-size:11px;
                color:3333;
            }
        }
        li.data{
            width:22%;
            span{
                color:#ffa800;
            }
        }
        li:first-child,li:nth-child(2){
            border-right:1px solid #ccc;
        }
        li.mounth{
            width:32%;
            span{
                color:#fc6a70;
            }
        }
    }
    .merchants_content{
        margin-top:10px;
        .tab-btn{
            margin:0 20px 10px;
            clear:both;
            overflow:hidden;
            li{
                display:inline-block;
                width:50%;
                height:35px;
                line-height:35px;
                float:left;
                background:#fff;
                color:#f15353;
            }
            li:nth-child(1){
                border-top-left-radius:6px;
                border-bottom-left-radius:6px;
            }
            li:nth-child(2){
                border-top-right-radius:6px;
                border-bottom-right-radius:6px;
            }
            li.active{
                background:#f15353;
                color:#fff;
            }
        }
    }
    .modal{
        position:fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background:#f3f5f7;
        .input{
            display:flex;
            height:45px;
            background:#fff;
            box-sizing:border-box;
            margin:0 10px;
            i{
                font-size:16px;
                line-height:45px;
                padding-left:4px;
            }
            input{
                margin:10px 5%;
                width:80%;
                height:30px;
                border-radius:6px;
                border:0;
                outline:0;
                padding-left:30px;
                background:url(../../../../assets/images/search.png) no-repeat 10px 8px #f2f2f2;
            }
        }
        .modal-dialog{
            h1{
                font-size:16px;
                color:#666;
                line-height:55px;
                font-weight:normal;
                text-align:left;
                padding-left:25px;
            }
            .select-time{
                text-align: center;
                .block{
                    width: 36%;
                    display: inline-block;
                }
                .el-input{
                    width: 100%;
                }
                span{
                    font-size: 22px;
                    font-weight: 400;
                }
            }
            .submit{
                width:325px;
                height:40px;
                border-radius:6px;
                background-color:#f15353;
                text-align:center;
                line-height:40px;
                color:#fff;
                border:0;
                outline:0;
                font-size:14px;
                font-weight: bold;
                margin-top:20px;
            }
        }
    }

}
</style>