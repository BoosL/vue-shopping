<template >
    <div id="clockinrecord">
        <div id="record">
            <c-title :hide="false" :text='title'></c-title>
            <div class="record-content">
                <h3>我的战绩</h3>
                <div class="record-data">
                    <div>
                        <span class="data">{{payAmount}}</span><br>
                        <span class="amount">累计投入(元)</span>
                    </div>

                    <div class="data-mid">
                        <span class="data">{{rewardAmount}}</span><br>
                        <span class="amount">累计赚取(元)</span>
                    </div>

                    <div>
                        <span class="data">{{clockNum}}</span><br>
                        <span class="amount">累计打卡(天)</span>
                    </div>
                </div>

            </div>
            <div class="record-detail" v-if="recordDetailShow">
                <h3>战绩明细</h3>
                <div v-for="item in recordDetail" class="record-detail-list">
                    <span>{{item.created_at}}</span>
                    <span>{{item.clock_in_status_name}}</span>
                    <span v-if="recordDetailAmountShow" class="amount">{{item.has_one_reward.amount}}</span>
                </div>
            </div>
            
        </div>
    </div>
</template>


<script>
import clockinrecord_controller from './clockinrecord_controller';
export default clockinrecord_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #record{
        color: #fff;
        width: 100%;
        height: 100%;
        position: fixed;
        text-align: left;
        .record-content{
            margin-top:40px;
            background: red;
            h3{
                font-size: 17px;
                margin:10px 5% 10px 5%;
                padding-top:10px;
            }

            .record-data{
                // margin: 10px;
                margin-left: 5%;
                margin-right:5%;
                padding-bottom: 10px;
                font-size: 15px;
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
                .data-mid{
                    margin-right:5%;
                    margin-left: 5%;
                }
                div{
                    float: left;
                    
                    width: 30%;
                    .data{
                        font-size: 20px;
                    }
                    .amount{
                        font-size: 14px;
                    }
                    
                }

                
            
            }

            
        }

        .record-detail{
            color: #000000;
            padding:10px 5% 10px 5%;
            background: #fff;
            h3{
               font-size: 17px;  
            }

            .record-detail-list{
                font-size: 17px;
                height: 45px;
                line-height: 45px;
                .amount{
                    float: right;
                }
            }
        }
    }
</style>