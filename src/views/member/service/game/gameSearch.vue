<template>
    <div id="city">
        <c-title :hide="false" text='城市' tolink='gameIsPay' totext='充值记录'></c-title>
        <div class="input">
            <input type="text" placeholder="中文/拼音/首字母" />
        </div>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <!-- right fixed -->
                <ul class="innerRig">
                    <li class="quickLocation">定位</li><li class="letter" data-id="1">A</li><li class="letter" data-id="2">B</li><li class="letter" data-id="3">C</li><li class="letter" data-id="4">D</li><li class="letter" data-id="5">E</li><li class="letter" data-id="6">F</li><li class="letter" data-id="7">G</li><li class="letter" data-id="8">H</li><li class="letter" data-id="9">J</li><li class="letter" data-id="10">K</li><li class="letter" data-id="11">L</li><li class="letter" data-id="12">M</li><li class="letter" data-id="13">N</li><li class="letter" data-id="14">P</li><li class="letter" data-id="15">Q</li><li class="letter" data-id="16">R</li><li class="letter" data-id="17">S</li><li class="letter" data-id="18">T</li><li class="letter" data-id="19">W</li><li class="letter" data-id="20">X</li><li class="letter" data-id="21">Y</li><li class="letter" data-id="22">Z</li>
                </ul>
                <!-- left inner -->
                <div class="content">
                    <div class="location">
                        <p class="title">热门游戏</p>
                        <ul>
                            <li v-for="item in hotGame">{{item}}</li>
                        </ul>
                        <div class="clear"></div>
                    </div>
                    <div class="list" v-for="item in allGames">
                        <p class="title">{{item.sign}}</p>
                        <ul>
                            <li v-for="city in item.games">{{city}}</li>
                        </ul>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <!-- tab-containerEnd -->
    </div>
</template>
<script>
    import cTitle from 'components/title';
    import { mapState,mapMutations } from 'vuex';

    require('c-swipe/dist/swipe.css');
    export default {

        data() {
            return {
                selected:'1',
                allGames:[
                    {sign:"A",games:["宝贝星球","消灭星星豪华版 双人坦克世界3D","安顺","安庆"]},
                    {sign:"B",games:["老爹烘培店","蚌埠","包头","保定","白银","宝山"]},
                    {sign:"C",games:["快刀切水果3","成都","长沙","承德"]},
                    {sign:"D",games:["米老鼠和唐老鸭","大庆","大同","丹东","大冶"]},
                    {sign:"E",games:["突击对决无敌版","安阳","安顺","安庆"]}
                ],
                hotGame:["DNF","LOL","王者荣耀"]
            }
        },

        components: { cTitle},
        methods: {

        },

        //读取vuex的属性,html即可直接上vuex属性{{jan}}
        computed: mapState([])//直接引用vuex状态值
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #city {
        .input{
            margin-top:40px;
            padding:10px 5%;
            background:#eee;
            width:90%;
            input{
                width:90%;
                height:35px;
                border-radius:6px;
                padding-left:30px;
                border:0;
                outline:0;
                background:url(../../../../assets/images/search.png) no-repeat 10px 10px #fff;
            }
        }
        .innerRig{position: fixed;width: 40px;z-index: 99;right: 0;top:100px;bottom: 0;display: flex;flex-direction: column;color:#1bba9e;background: #FFF;
            li{flex: 1;}
        }

        .content{
            text-align:left;
            .location{
                padding:0 15px;
                .title{
                    color:#666;
                    font-size:12px;
                    line-height:30px;
                }
                ul{
                    margin-left:15px;
                    margin-right:40px;
                    li{
                        float:left;
                        margin-right:3%;
                        width:30%;
                        height:30px;
                        line-height:30px;
                        color:#333;
                        background:#fff;
                        text-align:center;
                        border-radius:4px;
                    }
                }
            }
            .list{
                .title{
                    color:#666;
                    font-size:12px;
                    line-height:20px;
                    padding-left:15px;
                }
                ul{
                    padding-left:46px;
                    background:#fff;
                    li{
                        width:100%;
                        height:30px;
                        line-height:30px;
                        border-bottom:1px solid #ccc;
                        color:#333;
                    }
                    li:last-child{border-bottom:0}
                }
            }
        }
    }
</style>