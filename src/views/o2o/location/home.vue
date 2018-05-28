<template>
    <div id="all">
        <c-title hide="true" text='home' :eteos="fun.setWXTitle($store.state.temp.item.janst)"></c-title>
        <div class="x0">
            <div class="x1 a2">
                <h2 class="x2 none">北京市</h2>
                <input class="x3 defaultWidth"  @click='tosearch' maxlength="50" type="text" placeholder="选择城市、小区、写字楼、学校"></div>
            <div class="x4" style="text-align: left;">

                <div class="x5"><i></i>
                    <router-link :to="fun.getUrl('o2oLocation_loc')">
                        <p>点击定位当前地点</p>
                    </router-link>
                </div>

                <!--<p class="x7">我的收货地址</p>
                <div class="x6 ">
                    <ul>
                        <li addressid="20089" ><p
                                class="x9 borderNone a2"><span class="x8"><em>jj</em><b>186****8292</b></span><span
                                class="th">广州市越秀区中山纪念堂kjnkjljlkjlkj</span><span class="t5" addressid="20089"></span></p>
                        </li>
                    </ul>
                </div>-->
            </div>
            <!--<div class="xd none"><h2>历史搜索记录</h2>
                <ul>
                    <li>
                        <p class="list_wrapper a2"><span class="xf">南云西街4号</span><span class="xg">广东省广州市白云区</span></p>
                    </li>
                    <li>
                        <p class="list_wrapper borderNone"><span class="xf">广州白云国际机场</span><span class="xg">广东省广州市花都区机场大道</span>
                        </p></li>
                </ul>
                <p class="xh">
                    <button>清除搜索历史</button>
                </p>
            </div>-->
            <div class="xc none">
                <ul></ul>
            </div>
        </div>
    </div>

</template>


<script>
  import home from './home_controller';
  export default home;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../../assets/css/o2ostore.css';
</style>
