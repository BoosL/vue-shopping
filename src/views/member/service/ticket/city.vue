<template>
    <div id="city" :class="'city'+$store.state.service.lang">
        <c-title :hide="false" :text='language.title'></c-title>
        <div class="input">
            <input type="text" :placeholder="language.placeTip" v-model="sokey" />
        </div>
        {{froze}}
        <!--<mt-navbar v-model="selected" id='selecteds' fixed>
              <mt-tab-item id="1">{{language.domestic}}</mt-tab-item>
              <mt-tab-item id="2">{{language.international}}</mt-tab-item>
            </mt-navbar>-->
        <div style="height: 40px;"></div>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <!-- right fixed -->
                <ul class="innerRig">
                    <li class="quickLocation">{{language.positioned}}</li>
                    <li class="letter" @click="goSoso('A')">A</li>
                    <li class="letter" @click="goSoso('B')">B</li>
                    <li class="letter" @click="goSoso('C')">C</li>
                    <li class="letter" @click="goSoso('D')">D</li>
                    <li class="letter" @click="goSoso('E')">E</li>
                    <li class="letter" @click="goSoso('F')">F</li>
                    <li class="letter" @click="goSoso('G')">G</li>
                    <li class="letter" @click="goSoso('H')">H</li>
                    <li class="letter" @click="goSoso('J')">J</li>
                    <li class="letter" @click="goSoso('K')">K</li>
                    <li class="letter" @click="goSoso('L')">L</li>
                    <li class="letter" @click="goSoso('M')">M</li>
                    <li class="letter" @click="goSoso('N')">N</li>
                    <li class="letter" @click="goSoso('P')">P</li>
                    <li class="letter" @click="goSoso('Q')">Q</li>
                    <li class="letter" @click="goSoso('R')">R</li>
                    <li class="letter" @click="goSoso('S')">S</li>
                    <li class="letter" @click="goSoso('T')">T</li>
                    <li class="letter" @click="goSoso('W')">W</li>
                    <li class="letter" @click="goSoso('X')">X</li>
                    <li class="letter" @click="goSoso('Y')">Y</li>
                    <li class="letter" @click="goSoso('Z')">Z</li>
                </ul>
                <!-- left inner -->
                <div class="content">
                    <!--<div class="location">
                            <p class="title">{{language.currentAddr}}</p>
                            <div id="map"> <i class="iconfont icon-sousuo1"></i> 加载中</div>
                        </div>-->
                    <div class="list" v-for="item in searchData">
                        <p class="title">{{item.sign }}</p>
                        <ul>
                            <li v-for="city in item.citys " @click="chooseCity($event)">{{city}}</li>
                        </ul>
                    </div>
                </div>
            </mt-tab-container-item>

            <mt-tab-container-item id="2">
                <ul class="innerRig">
                    <li class="quickLocation">{{language.positioned}}</li>
                    <li class="letter" data-id="1">A</li>
                    <li class="letter" data-id="2">B</li>
                    <li class="letter" data-id="3">C</li>
                    <li class="letter" data-id="4">D</li>
                    <li class="letter" data-id="5">E</li>
                    <li class="letter" data-id="6">F</li>
                    <li class="letter" data-id="7">G</li>
                    <li class="letter" data-id="8">H</li>
                    <li class="letter" data-id="9">J</li>
                    <li class="letter" data-id="10">K</li>
                    <li class="letter" data-id="11">L</li>
                    <li class="letter" data-id="12">M</li>
                    <li class="letter" data-id="13">N</li>
                    <li class="letter" data-id="14">P</li>
                    <li class="letter" data-id="15">Q</li>
                    <li class="letter" data-id="16">R</li>
                    <li class="letter" data-id="17">S</li>
                    <li class="letter" data-id="18">T</li>
                    <li class="letter" data-id="19">W</li>
                    <li class="letter" data-id="20">X</li>
                    <li class="letter" data-id="21">Y</li>
                    <li class="letter" data-id="22">Z</li>
                </ul>
                <!-- left inner -->
                <div class="content">
                    <div class="location">
                        <p class="title">{{language.currentAddr}}</p>
                        <div id="map">
                            <i class="iconfont icon-sousuo1"></i> 加载中</div>
                    </div>
                    <div class="list" v-for="item in allCitys">
                        <p class="title">{{item.sign}}</p>
                        <ul>
                            <li v-for="city in item.citys" @click="chooseCity($event)">{{city}}</li>
                        </ul>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <!-- tab-containerEnd -->
    </div>
</template>
<script>

import city_controller from './city_controller';
export default city_controller;		
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.citych {
    .input {
        margin-top: 40px;
        padding: 10px 5%;
        position: fixed;
        z-index: 999;
        background: #eee;
        width: 90%;
        input {
            width: 90%;
            height: 35px;
            border-radius: 6px;
            padding-left: 30px;
            border: 0;
            outline: 0;
            background: url(../../../../assets/images/search.png) no-repeat 10px 10px #fff;
        }
    }
    .mint-navbar.is-fixed {
        top: 40px;
        margin-top: 55px;
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 2px solid #1bba9e;
        color: #1bba9e;
    }
    .mint-navbar .mint-tab-item:first-child {
        border-right: #E3E3E3 solid 1px;
    }
    .innerRig {
        position: fixed;
        width: 40px;
        z-index: 99;
        right: 0;
        top: 141px;
        bottom: 0;
        display: flex;
        flex-direction: column;
        color: #1bba9e;
        background: #FFF;
        li {
            flex: 1;
        }
    }

    .content {
        margin-top: 70px;
        padding-top: 10px;
        text-align: left;
        .location {
            padding: 0 15px;
            .title {
                color: #666;
                font-size: 12px;
                line-height: 30px;
            }
            div {
                width: 30%;
                height: 30px;
                background: #fff;
                font-size: 16px;
                color: #333;
                line-height: 30px;
                text-align: center;
                border-radius: 4px;
            }
        }
        .list {
            .title {
                color: #666;
                font-size: 12px;
                line-height: 20px;
                padding-left: 15px;
            }
            ul {
                padding-left: 46px;
                background: #fff;
                li {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px solid #ccc;
                    color: #333;
                }
                li:last-child {
                    border: 0
                }
            }
        }
    }
}

.citywei {
    .input {
        margin-top: 40px;
        padding: 10px 5%;
        position: fixed;
        z-index: 999;
        background: #eee;
        width: 90%;
        input {
            width: 90%;
            height: 35px;
            border-radius: 6px;
            padding-left: 30px;
            border: 0;
            outline: 0;
            background: url(../../../../assets/images/search.png) no-repeat 10px 10px #fff;
        }
    }
    .mint-navbar.is-fixed {
        top: 40px;
        margin-top: 55px;
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 2px solid #1bba9e;
        color: #1bba9e;
    }
    .mint-navbar .mint-tab-item:first-child {
        border-right: #E3E3E3 solid 1px;
    }
    .innerRig {
        position: fixed;
        width: 40px;
        z-index: 99;
        left: 0;
        top: 141px;
        bottom: 0;
        display: flex;
        flex-direction: column;
        color: #1bba9e;
        background: #FFF;
        li {
            flex: 1;
        }
    }

    .content {
        margin-top: 100px;
        padding-top: 10px;
        text-align: right;
        .location {
            padding: 0 15px;
            height: 60px;
            .title {
                color: #666;
                font-size: 12px;
                line-height: 30px;
            }
            div {
                width: 30%;
                height: 30px;
                background: #fff;
                font-size: 16px;
                color: #333;
                line-height: 30px;
                text-align: center;
                border-radius: 4px;
                float: right;
            }
        }
        .list {
            .title {
                color: #666;
                font-size: 12px;
                line-height: 20px;
                padding-right: 15px;
            }
            ul {
                padding-right: 46px;
                background: #fff;
                li {
                    width: 100%;
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px solid #ccc;
                    color: #333;
                }
                li:last-child {
                    border: 0
                }
            }
        }
    }
}
</style>