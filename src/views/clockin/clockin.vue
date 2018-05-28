<template >
    <div id="clockin">
        
        <div class="J-weixin-tip weixin-tip">
             <div id="clockin-detail">
                <c-title :hide="false" :text='clockin_title' totext='我的战绩' tolink='ClockPunchRecord'></c-title>
                <div class="tomorrow-clockin">
                    <span>打卡可随机瓜分金额</span><br>
                    <h1>{{totalAmonut}}<small>元</small></h1>
                    <div class="tomorrow-clockin-time" v-if="false">
                        打卡时间 05：00 - 08：00
                    </div>
                    <div class="tomorrow-clockin-people">
                        当前有{{totalNumber}}人参与打卡挑战
                    </div>
                    <div class="tomorrow-clockin-rule">
                        <!-- <a>挑战规则 ></a> -->
                        <router-link :to="fun.getUrl('ClockPunchRule')">
                            挑战规则 >
					    </router-link>
                    </div>
                </div>
                <div class="clockin-pay">
                    <p>
                        <!-- <el-button type="success" :disabled="forbidden">
                            {{message}} <yd-countdown time="2017/11/16 18:05:00" :callback="cutDownCallBack" done-text=""></yd-countdown>
                        </el-button><br /> -->
                        <yd-button @click.native="clokinBtnCallBack(btnStatus)" size="large" :disabled="forbidden">
                            {{message}} <yd-countdown :time="cutDownTime" timetype="second" :callback="cutDownCallBack" done-text=""></yd-countdown>
                        </yd-button>
                        <yd-actionsheet :items="actionSheetItems" v-model="actionSheetShow" cancel="取消" size="large"></yd-actionsheet>
                        
                        
                    </p> 
                    <div class="clockin-pay-content">
                        <h1>打卡战况</h1>
                        <span class="clockin-pay-people"><small class="success">{{clockInNum}}</small>人成功，<small class="fail">{{notClockInNum}}</small>人失败</span>
                        <div class="clockin-top">
                            <div class="clockin-top-early" v-if="clockFirstShow && clockFirstMember">
                                <img :src="clockFirstMember.has_one_member.avatar"/>
                                <div class="clockin-top-name">早起之星</div>
                                <p>{{clockFirstMember.has_one_member.nickname}}</p>
                                <p>{{clockFirstMember.clock_in_at}}打卡</p>
                            </div>
                            <div class="clockin-top-lucky" v-if="luckyMemberShow && luckyMember">
                                <img :src="luckyMember.has_one_member.avatar" />
                                <div class="clockin-top-name">幸运之星</div>
                                <p>{{luckyMember.has_one_member.nickname}}</p>
                                <p>{{luckyMember.amount}}元</p>
                            </div>
                            <div class="clockin-top-persist" v-if="continueMemberShow && continueMember">
                                <img :src="continueMember.has_one_member.avatar"/>
                                <div class="clockin-top-name">毅力之星</div>
                                <p>{{continueMember.has_one_member.nickname}}</p>
                                <p>连续{{continueMember.clock_num}}次</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <div></div>
    
    </div>
</template>

<script>
import clockin_controller from './clockin_controller';
export default clockin_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

#clockin-detail {
    background:#fff;
    height: 100%;
    position: fixed;
    width: 100%;
    margin-top:40px;
    font-size: 16px;
    .tomorrow-clockin{
        color:#fff;
        padding-top:20px;
        background:red;
        span {
            font-size: 16px;
        }
        h1{
            margin-top:10px;
            font-size: 35px;
            small{
                font-size: 20px;
            }
        }
        .tomorrow-clockin-time{
            margin-top:20px;
            font-size: 14px;
        }
        .tomorrow-clockin-people{
            margin-top:5px;
        }
        .tomorrow-clockin-rule{
            margin-top:5px;
            padding-bottom: 10px;
            font-size:14px;
        }
    }

    .clockin-pay{
        margin-top:10px;
        button{margin: 5px 5% 5px 5%;width:90%;};
        // .yd-actionsheet-active .yd-actionsheet-item{
        //     height: 30px!important;
        //     font-size: 28px;
        // }
    }

    .clockin-pay-content{
        margin-top:10px;
        h1{
            font-size: 20px;
        }
        .clockin-pay-people{
            .success{
                color:#13ce66;
            }
            .fail{
                color:#ff4949;
            }
        }
        .clockin-top{
            width: 90%;
            margin:20px 5% 0px 5%;
            float: left;
            .clockin-top-early{
                float: left;
                width: 30%;
                img{
                    width:60%;
                    height:60%;
                    -webkit-border-radius:50%;
                    -moz-border-radius:50%;
                    -o-border-radius:50%;
                    border-radius:50%; 
                }
                p{
                    width: 80%;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    margin:2px auto;
                }
                .clockin-top-name{
                    width:80%;
                    background-color:red;
                    height: 18px;
                    margin: 0 auto;
                    color:#fff;
                    line-height: 18px;
                    font-size: 14px;
                }
            }

            .clockin-top-lucky{
                float: left;
                width: 30%;
                margin-right:5%;
                margin-left: 5%;
                img{
                    width:60%;
                    height:60%;
                    -webkit-border-radius:50%;
                    -moz-border-radius:50%;
                    -o-border-radius:50%;
                    border-radius:50%; 
                }
                p{
                    width: 80%;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    margin:2px auto;
                }

                .clockin-top-name{
                    width:80%;
                    background-color:red;
                    height: 18px;
                    margin: 0 auto;
                    color:#fff;
                    line-height: 18px;
                    font-size: 14px;
                }
            }

            .clockin-top-persist{
                float: left;
                width: 30%;
                img{
                    width:60%;
                    height:60%;
                    -webkit-border-radius:50%;
                    -moz-border-radius:50%;
                    -o-border-radius:50%;
                    border-radius:50%; 
                }
                p{
                    width: 80%;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    margin:2px auto;
                }

                .clockin-top-name{
                    width:80%;
                    background-color:red;
                    height: 18px;
                    margin: 0 auto;
                    color:#fff;
                    line-height: 18px;
                    font-size: 14px;
                }
                
            }
        }
    }
}

</style>