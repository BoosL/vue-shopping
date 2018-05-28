<template>
    <div>
        <!--container-->
        <div class="m-t-10">
            <a class="mint-cell mint-field">
                <div class="mint-cell-wrapper">
                    <el-button style="border:0" slot="prepend" icon="arrow-left" @click='goback'></el-button>

                    <div class="mint-cell-value" style="font-size: 14px">
                        <input v-model="address_detail" type="text" placeholder="请输入您所在的地点" id="suggestId"  name="address_detail" class="mint-field-core text-right">
                    </div>
                </div>
            </a>
        </div>

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

        <div id="allmap" style="width: 100%;height:700px;"></div>
        <div id="store-list" style="width: 100%;height:auto;">
            <li v-for="items in stores">

            </li>
        </div>

        <!--container end-->
    </div>
</template>

<script>
  import BMap from 'BMap'

  export default {
    components: {
    },
    data: () => ({
      headerData: {
        title: '办公地址',
        toLink: ''
      },
      address_detail: null, // 详细地址
      userlocation: {lng: '', lat: ''},
      stores:[],
    }),
    created () {
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
      this.loadMap()
      // this.ready() // 如果在此处直接调用this.ready()方法，将无法加载地图
    },
    mounted () {
      this.ready()
    },
    methods: {
      loadMap: function () {
        // setTimeout(this.ready, 0)
      },
        goback() {
            this.$router.go(-1);
        },
      ready: function () {
        var th = this
        var map = new BMap.Map('allmap');

        var geolocation = new BMap.Geolocation();
        var point;
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){

            // 添加带有定位的导航控件
            var navigationControl = new BMap.NavigationControl({
              // 靠左上角位置
              anchor: BMAP_ANCHOR_TOP_LEFT,
              // LARGE类型
              type: BMAP_NAVIGATION_CONTROL_LARGE,
              // 启用显示定位
              enableGeolocation: true
            });
            map.addControl(navigationControl);
            //alert('您的位置：'+r.point.lng+','+r.point.lat);
            point = new BMap.Point(r.point.lng, r.point.lat) // 创建点坐标
            map.centerAndZoom(point, 12);
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            //map.enableScrollWheelZoom(true);
          }
          else {
            alert('failed'+this.getStatus());
          }
        },{enableHighAccuracy: true})

        /*
        map.centerAndZoom(point, 12);
        map.enableScrollWheelZoom()    // 启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom()    // 启用地图惯性拖拽，默认禁用
        map.addControl(new BMap.NavigationControl())  // 添加默认缩放平移控件
        map.addControl(new BMap.OverviewMapControl()) // 添加默认缩略地图控件
        map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: 'BMAP_ANCHOR_BOTTOM_RIGHT' }))   // 右下角，打开
        */
        // 建立一个自动完成的对象
        var ac = new BMap.Autocomplete({'input': 'suggestId', 'location': map})
        var myValue
        ac.addEventListener('onconfirm', function (e) {    // 鼠标点击下拉列表后的事件
          var _value = e.item.value
          myValue = _value.province + _value.city + _value.district + _value.street + _value.business
          this.address_detail = myValue
          //alert(this.address_detail)
          setPlace()
        })

        function setPlace () {
          map.clearOverlays()   // 清除地图上所有覆盖物
          function myFun (results) {
            console.log('res:::', local.getResults().getPoi(0));
            th.userlocation = local.getResults().getPoi(0).point    // 获取第一个智能搜索的结果
            map.centerAndZoom(th.userlocation, 18)
            map.addOverlay(new BMap.Marker(th.userlocation))    // 添加标注
            console.log('local:', local.getResults().getPoi(0))
            window.localStorage.setItem("myLocation",JSON.stringify(local.getResults().getPoi(0)));
            th.$router.push(th.fun.getUrl('otoHome'));
          }
          var local = new BMap.LocalSearch(map, { // 智能搜索
            onSearchComplete: myFun
          })
          local.search(myValue)
        }

      }
    }
  }
</script>

<style>
    /* 去掉地图左下角的百度LOGO */
    .anchorBL {
        display:none
    }
</style>  