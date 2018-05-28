<template>
    <div id="all">
        <c-title hide="true" text='home' :eteos="fun.setWXTitle($store.state.temp.item.janst)"></c-title>
        <!-- 定位失败页 -->
        <div id="geoFail" class="hide">
            <div class="error-msg">
                <img src="https://3gimg.qq.com/lightmap/components/locationPicker2//image/warn.png" width="30" height="30" alt="warn">
                <span>定位失败，请稍后重试</span>
            </div>
            <a class="refresh-btn" href="javascript:;">重试</a>
        </div>

        <!-- 传递的经纬度不合法提示页 -->
        <div id="locationIllegal" class="hide">
            <div class="error-msg">
                <img src="https://3gimg.qq.com/lightmap/components/locationPicker2//image/warn.png" width="30" height="30" alt="warn">
                <span>传递的经纬度不合法</span>
            </div>
        </div>

        <!-- 搜索区域 -->
        <a href="#" id="iosFix"></a>
        <div class="search-wrap init-status">
            <div class="search-bar">
                <form name="poi-search" id="poiSearch" onsubmit="return false;">
                    <input type="search" class="keyword" id="searchword" placeholder=" ">
                    <button type="reset" class="clear-input"></button>
                    <button type="submit" class="submit" >搜索</button>
                </form>
                <a class="cancle">取消</a>
            </div>
        </div>

        <!-- 搜索提示区域 -->
        <div class="suggestion-wrap">
            <div id="suggestionScroller" class="suggestion-scroller">
                <div class="poi-list">
                    <ul>
                        <!-- 该区域不仅放搜索提示列表，还放点击搜索后的检索结果列表 -->
                    </ul>
                </div>
                <div class="load-wrap hide">
                    <div class="load-data">
                        <img width="24" height="24" src="https://3gimg.qq.com/lightmap/components/locationPicker2/image/loadData.png" />
                        <span>加载中...</span>
                    </div>
                </div>
                <div class="no-more-results hide">
                    <p>亲，没有更多了~</p>
                </div>
            </div>
        </div>

        <!-- 地图区域 -->
        <div class="map-wrap">

        </div>

        <!-- poi列表 -->
        <div class="list-wrap">
            <div id="scroller" class="poi-scroller">
                <div id="activePosition" class="active-pos">
                    <h2 class="poi-title"></h2>
                    <p class="poi-address initPos"></p>
                    <span class="poi-latlng"></span>
                    <span class="poi-city"></span>
                    <i class="active"></i>
                </div>
                <div class="poi-list">
                    <ul>

                    </ul>
                </div>
                <div class="load-wrap">
                    <div class="load-data">
                        <img width="24" height="24" src="https://3gimg.qq.com/lightmap/components/locationPicker2/image/loadData.png" />
                        <span>加载中...</span>
                    </div>
                </div>
                <div class="no-more-results">
                    <p>亲，没有更多了~</p>
                </div>
            </div>
        </div>


</template>

<script>
  import location from './location_controller';
  export default location;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../../assets/css/map.css';
</style>