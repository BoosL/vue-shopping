<template>
    <div id="distributionOrder">
        
        <c-title :hide="false" :text='title'></c-title>
        
	<div style="height: 40px;"></div>              
                        
                            <div class="team_list"  v-for="item in datas"> 
                                <div class="img">
                                    <img :src="item.avatar">
                                </div>
                                <div class="info">名称:{{item.nickname}}
                                    <br>
                                    <span v-if="item.is_ranking_value==1">排行榜数值:{{item.total}}</span>
                                </div>
                            </div>
                       
    </div>
</template>
<script>
import list_first_ranking_controller from './list_first_ranking_controller';
export default list_first_ranking_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#distributionOrder {
                .team_list {
                    background: #fff;
                padding: 10px;
                overflow: hidden;
                .img {
                    width: 14%;
                    float: left;
                    text-align: left;
                    height: 0;
                    padding-bottom: 14%;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                    }
                }
                .info {
                    height: 40px;
                    width: 80%;
                    float: left;
                    font-size: 0.857rem;
                    color: #222;
                    line-height: 1.429rem;
                    text-align: left;
                    padding: 0 5px;
                    span {
                        color: #666666;
                    }
                }
            }
    .order {
        margin-bottom: 5px;
        .tbs {
            background: #FFF;
            overflow: hidden;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #D9D9D9;
            line-height: 1.3rem;
            padding: 10px;
            .item2 {
                flex: 2;
                text-align: left;
                color: #666;
            }
            .item3 {
                text-align: right;
                .red {
                    color: red;
                }
                p {
                    margin: 0;
                    color: #222;
                }
            }
        }
        .order_detail.opens {
            display: block;
        }
        .order_detail {
            display: none;
            overflow: hidden;
            background: #fff;
            border-top: 1px solid #eaeaea;

        }
    }

    #distribution-goods {
        display: flex;
        align-items: stretch;
        flex-flow: row wrap;
        padding: 10px;
        border-top: 1px solid #eaeaea;
        .img {
            flex: 1;
            img {
                width: 100%;
            }
        }
        .inner {
            flex: 5;
            padding: 0 5px;
            display: flex;
            align-items: flex-start;
        }
        .name {
            flex: 5;
            text-align: justify;
        }
        .price {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            b {
                flex: 3;
                text-align: right;
                color: #666;
                font-size: 0.786rem;
                font-weight: normal;
            }
            .evaluate-yet {
                margin: 0;
                color: #888;
                float: right;
                line-height: 1.6rem;
            }
        }
    }
}
</style>