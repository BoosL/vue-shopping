<template>
    <div id="oilRecharge" :class="'oilRecharge'+$store.state.service.lang">

        <c-title :hide="false" :text='title'></c-title>
        <div style="height:40px"></div>

        <div class="oilCard">
            <div class="cards">
                <div class="left">
                    <h2>{{current_card.account}}</h2>
                    <p>{{language.oilState}}{{current_card_state}}</p>
                </div>
                <div class="right" @click="popAddCard">
                    <span class="iconfont icon-qiapian"></span>
                </div>
            </div>
        </div>
        <div class="content">
            <ul class="tab-btn" v-if="false"> 
                <li :class="{active:isActive}" @click="changeActive(true)">{{language.recharge}}</li>
                <li :class="{active:!isActive}" @click="changeActive(false)">{{language.inquiryCheck}}</li>
            </ul>

            <oilPay :goods='goodItems' :card='current_card' :cardType='tag' v-if="isActive" ></oilPay>
            <oilCheck v-else></oilCheck>

        </div>

        <div class="addCard" v-show="modal" @click='disModal'>

            <c-title :hide="false" :text='title' @click.stop></c-title>
            <div style="height:40px"></div>

            <div class="oilCard" @click.stop>
                <div class="cards">
                    <div class="left">
                        <h2>{{current_card.account}}</h2>
                        <p>{{language.oilState}}{{current_card_state}}</p>
                    </div>
                    <div class="right" @click="popAddCard">
                        <span class="iconfont icon-qiapian"></span>
                    </div>
                </div>
            </div>

            <div class="cardBox" @click.stop>
                <div class="add">
                    <span @click="changeStyle" class="over" v-if="isAdd">{{language.complete}}</span>
                    <span @click="changeStyle" class="" v-else>{{language.edit}}</span>
                    <button type="button" @click="goToAddCard()">{{language.addCard}}</button>
                </div>
                <ul>
                    <li :class="{active:isAdd}" v-for="(card,index) in cards" @click="selectCard(card)">
                        <b></b>
                        <b @click="deleteCard(index,card)"></b>{{card.account}}</li>
                </ul>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import oilRecharge_controller from './oilRecharge_controller';
export default oilRecharge_controller;

</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
.oilRechargech {
    .oilCard {
        padding: 0 15px;
        background: #fff;
        overflow: hidden;
        .cards {
            div.left {
                float: left;
                width: 80%;
                text-align: left;
                line-height: 20px;
                padding-top: 15px;
                padding-bottom: 10px;
                h2 {
                    font-size: 25px;
                    color: #1bba9e;
                    font-weight: normal;
                }
                p {
                    font-size: 10px;
                    color: #333;
                    padding-top: 4px;
                }
            }
            div.right {
                float: right;
                width: 20%;
                span {
                    line-height: 60px;
                    color: #1bba9e;
                    font-size: 30px;
                }
            }
        }
    }
    .content {
        background: #fff;
        .tab-btn {
            padding: 0 13px;
            height: 45px;
            background: #fff;
            li {
                display: inline-block;
                width: 50%;
                line-height: 45px;
                float: left;
                color: #666;
                font-size: 16px;
                border-bottom: 2px solid transparent;
                border-top: 1px solid #ccc;
            }
            li.active {
                color: #ff951b;
                border-bottom: 2px solid #ff951b;
            }
        }
    }
    .addCard {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 999;
        .cardBox {
            background: #fff;
            overflow: hidden;
            border-top: 1px solid #ccc;
            .add {
                padding: 0 15px;
                line-height: 40px;
                span {
                    float: left
                }
                .over {
                    color: #d50023;
                    font-weight: bold;
                }
                button {
                    margin-top: 10px;
                    width: 100px;
                    height: 27px;
                    background: #ff951b;
                    color: #fff;
                    border: 0;
                    outline: 0;
                    border-radius: 4px;
                    float: right;
                }
            }
            .add:after {
                display: table;
                content: '';
                clear: both;
            }
            ul {
                padding: 0 15px;
                li {
                    line-height: 40px;
                    text-align: left;
                    padding: 0 15px;
                    font-size: 16px;
                }
                li.active {
                    padding: 0 35px;
                    background: url(../../../../assets/images/delete.png) no-repeat 0 10px;
                    position: relative;
                    b {
                        display: inline-block;
                        width: 27px;
                        height: 27px;
                        position: absolute;
                        top: 5px;
                        left: 0;
                    }
                }
            }
        }
    }
}


.oilRechargewei {
    .oilCard {
        padding: 0 15px;
        background: #fff;
        overflow: hidden;
        .cards {
            div.left {
                float: right;
                width: 80%;
                text-align: right;
                line-height: 20px;
                padding-top: 15px;
                padding-bottom: 10px;
                h2 {
                    font-size: 25px;
                    color: #1bba9e;
                    font-weight: normal;
                }
                p {
                    font-size: 10px;
                    color: #333;
                    padding-top: 4px;
                }
            }
            div.right {
                float: left;
                width: 20%;
                span {
                    line-height: 60px;
                    color: #1bba9e;
                    font-size: 30px;
                }
            }
        }
    }
    .content {
        background: #fff;
        .tab-btn {
            padding: 0 13px;
            height: 45px;
            background: #fff;
            li {
                display: inline-block;
                width: 50%;
                line-height: 45px;
                float: left;
                color: #666;
                font-size: 16px;
                border-bottom: 2px solid transparent;
                border-top: 1px solid #ccc;
            }
            li.active {
                color: #ff951b;
                border-bottom: 2px solid #ff951b;
            }
        }
    }
    .addCard {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 999;
        .cardBox {
            background: #fff;
            overflow: hidden;
            border-top: 1px solid #ccc;
            .add {
                padding: 0 15px;
                line-height: 40px;
                span {
                    float: right
                }
                .over {
                    color: #d50023;
                    font-weight: bold;
                }
                button {
                    margin-top: 10px;
                    width: 100px;
                    height: 27px;
                    background: #ff951b;
                    color: #fff;
                    border: 0;
                    outline: 0;
                    border-radius: 4px;
                    float: left;
                }
            }
            .add:after {
                display: table;
                content: '';
                clear: both;
            }
            ul {
                padding: 0 15px;
                li {
                    line-height: 40px;
                    text-align: right;
                    padding: 0 15px;
                    font-size: 16px;
                }
                li.active {
                    padding: 0 35px;
                    background: url(../../../../assets/images/delete.png) no-repeat 100% 10px;
                    position: relative;
                    b {
                        display: inline-block;
                        width: 27px;
                        height: 27px;
                        position: absolute;
                        top: 5px;
                        left: 0;
                    }
                }
            }
        }
    }
}
</style>