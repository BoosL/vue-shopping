<template>
    <div>
        <!--container-->
        <div class="m-t-10" v-show="!isShowCitys">
            <a class="mint-cell mint-field">
                <div class="mint-cell-wrapper">
                    <div style="font-size: 14px;margin-right:10px;" @click="showCitys">
                        {{city}}
                    </div>
                    <div class="mint-cell-value" style="font-size: 14px">
                        <input v-model="address_detail" type="text" placeholder="请输入您所在的地点" id="suggestId"
                               name="address_detail" class="mint-field-core text-right">
                    </div>
                </div>
            </a>
        </div>

        <div class="xk" v-show="isShowCitys">
            <h2 class="xl"><span>已开通城市</span></h2>
            <ul class="xm scroller">
                <li @click="setCity(item.areaname)" v-for="item in citys">{{item.areaname}}</li>
            </ul>
        </div>

        <div id="allmap" style="width: 100%;height:700px;"></div>

        <!--<div id="search" transition="fadeInLeft">
            <div id="soso" class="uou" :class="{'mout':amout}">
                <div class="search">
                    <el-button slot="prepend" icon="arrow-left" @click='goback'></el-button>
                    <el-input placeholder="请输入内容" v-model="address_detail"  id="suggestId"  name="address_detail" autofocus>
                        &lt;!&ndash;<el-button slot="append" icon="search" @click='search'></el-button>&ndash;&gt;
                    </el-input>
                    <el-col :span="1">
                        <i class="fa fa-th-large" v-show="view" @click="$store.commit('views')"></i>
                        <i class="fa fa-th-list" v-show="!view" @click="$store.commit('views')"></i>
                    </el-col>
                </div>
            </div>

        </div>-->

        <!--<div id="store-list" style="width: 100%;height:auto;">
            <mt-cell title="标题文字"></mt-cell>
        </div>-->

        <!--container end-->
    </div>
</template>

<script>
    import BMap from 'BMap';

    export default {
        components: {},
        data: () => ({
            headerData: {
                title: '办公地址',
                toLink: ''
            },
            address_detail: null, // 详细地址
            userlocation: {lng: '', lat: ''},
            stores: [],
            city: '广州',
            citys: [],
            isShowCitys:true,
        }),
        created () {
            // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
            this.loadMap()
        },
        mounted () {
            this.getCity();

        },
        activated () {
            this.address_detail = '';
        },
        methods: {
            loadMap: function () {
                // setTimeout(this.ready, 0)
            },
            goback() {
                this.$router.go(-1);
            },
            ready: function () {
                var th = this;
                //var map = new BMap.Map('allmap');

                // 建立一个自动完成的对象
                var ac = null;
                ac = new BMap.Autocomplete({'input': 'suggestId', 'location': this.city});

                var myValue;
                ac.addEventListener('onconfirm', function (e) {    // 鼠标点击下拉列表后的事件
                    var _value = e.item.value
                    console.log('_value', _value);
                    myValue = _value.province + _value.city + _value.district + _value.street + _value.business
                    this.address_detail = myValue;
                    var myGeo = new BMap.Geocoder();
                    myGeo.getPoint(myValue, function(point){
                        console.log('getPoint', point);
                        if (point) {
                            var pos = {
                                address:_value.district + _value.street + _value.business,
                                city:th.city,
                                title:_value.district + _value.street + _value.business,
                                point:point,
                            }
                            window.localStorage.setItem("myLocation",JSON.stringify(pos));
                            th.$router.push(th.fun.getUrl('otoHome'));
                        } else {
                            console.log('没解析', point);
                        }
                    }, th.city);
                    //alert(this.address_detail)
                    //
                });

            },

            showCitys() {
                if (this.isShowCitys) {
                    this.isShowCitys = false;
                } else {
                    this.isShowCitys = true;
                }
            },

            setCity(areaname) {
                this.city = areaname;
                this.isShowCitys = false;
                this.address_detail = '';
                this.ready();
                console.log('isShowCitys', this.isShowCitys);
            },

            getCity() {
                let that = this;
                $http.get('plugin.store-cashier.frontend.store.city.get-citys', this.form).then((response) => {

                    if (response.result == 1 && response.data.length>0) {
                        that.city = response.data[0].areaname;
                        that.citys = response.data;
                        //that.ready();
                    } else {

                    }
                }, (response) => {
                    // error callback
                })
            },
        }
    }
</script>

<style>
    /* 去掉地图左下角的百度LOGO */
    .anchorBL {
        display: none;

    }

    .mint-cell-wrapper {
        text-align: left !important;
    }

    .mint-cell-value {
        width: 0 !important;
    }
    .xk {
        width: 100%;
        height: 100%;
        background: #f4f4f4;
        overflow: hidden
    }

    .xl {
        position: relative;
        font-size: 14px;
        color: #b0b0b0;
        text-align: center;
        line-height: 40px;
        margin: 0 10px
    }

    .xl:before {
        content: "";
        height: 0;
        border-top: 1px dashed #b0b0b0;
        width: 100%;
        position: absolute;
        top: 50%;
        margin-top: -1px;
        left: 0
    }

    .xl span {
        background-color: #f4f4f4;
        display: inline-block;
        padding: 0 6px;
        position: relative;
        z-index: 1
    }

    .xm {
        padding: 10px;
        width: 125%;
        box-sizing: border-box;
        padding-right: 62px
    }

    .xm li {
        display: inline-block;
        padding: 10px 0;
        border: 1px solid #dddddd;
        background: #ffffff;
        color: #333333;
        margin: 0 10px 10px 0px;
        width: 20%;
        text-align: center;
        float: left
    }

    .xm li.curr {
        border: 1px solid #d0d0d0;
        background: #f3f3f3
    }

</style>  