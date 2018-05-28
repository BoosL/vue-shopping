<template>
    <div id="course" style="background-color:white;">
        <c-title :hide="false" text='精选推荐课程'></c-title>
        <div class="box01" style="margin-top:40px;">
            <div class="Search-box">
                <yd-icon slot="icon" class="icon-sousuo" custom size="20px" color="#808080" style="position:relative;left:215px;z-index:8888;" @click.native="getData()"></yd-icon>
                <input type="text" class="s_input input_enter_placeholder" placeholder="搜索课程/讲师"  v-model="searchVal">
            </div>
            <div style="padding-left:12px;padding-top:52px;">
                <mt-loadmore v-if="goload" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="coupon_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false' id='olis'>
    
                    <div class="content" v-for="item in goodsList" @click="goToDetail(item.goods_id)">
                        <div class="touxiang">
                            <img style="width:100%;height:100%;" :src="item.thumb">
                        </div>
                        <div class="title">
                            <div>
                                <li class="title01">{{item.title}}</li>
                            </div>
                            <div class="title02">共{{item.course_chapter_num}}小节</div>
                            <li class="title03">
                                <ul>
                                    <li class="lecturer">讲师：{{item.has_one_lecturer.real_name}}</li>
                                    <li class="cost">¥ {{item.price}}</li>
                                </ul>
                            </li>
                        </div>
                        <div style="clear:both;"></div>
                        <div style="width:100%;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
                    </div>
                </mt-loadmore>
            </div>
            
            <!-- <div class="content">
                                <div class="touxiang"></div>
                                <div class="title">
                                    <div>
                                        <li class="title01">沙拉轻食创意课程套餐</li>
                                    </div>
                                    <li class="title02">共18小节</li>
                                    <li class="title03">
                                        <ul>
                                            <li class="lecturer">讲师：李翔</li>
                                            <li class="cost">¥ 199.00</li>
                                        </ul>
                                    </li>
                                </div>
                                <div style="clear:both;"></div>
                                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
                            </div>
                            <div class="content">
                                <div class="touxiang"></div>
                                <div class="title">
                                    <div>
                                        <li class="title01">牛乳茶制作课程</li>
                                    </div>
                                    <li class="title02">共3小节</li>
                                    <li class="title03">
                                        <ul>
                                            <li class="lecturer">讲师：李翔</li>
                                            <li class="cost">¥ 1999.00</li>
                                        </ul>
                                    </li>
                                </div>
                                <div style="clear:both;"></div>
                                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
                            </div>
                            <div class="content">
                                <div class="touxiang"></div>
                                <div class="title">
                                    <div>
                                        <li class="title01">沙拉轻食创意课程套餐</li>
                                    </div>
                                    <li class="title02">共18小节</li>
                                    <li class="title03">
                                        <ul>
                                            <li class="lecturer">讲师：李翔</li>
                                            <li class="cost">¥ 199.00</li>
                                        </ul>
                                    </li>
                                </div>
                                <div style="clear:both;"></div>
                                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
                            </div>
                            <div class="content">
                                <div class="touxiang"></div>
                                <div class="title">
                                    <div>
                                        <li class="title01">沙拉轻食创意课程套餐</li>
                                    </div>
                                    <li class="title02">共18小节</li>
                                    <li class="title03">
                                        <ul>
                                            <li class="lecturer">讲师：李翔</li>
                                            <li class="cost">¥ 199.00</li>
                                        </ul>
                                    </li>
                                </div>
                                <div style="clear:both;"></div>
                                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
                            </div>
                            <div class="content">
                                <div class="touxiang"></div>
                                <div class="title">
                                    <div>
                                        <li class="title01">沙拉轻食创意课程套餐</li>
                                    </div>
                                    <li class="title02">共18小节</li>
                                    <li class="title03">
                                        <ul>
                                            <li class="lecturer">讲师：李翔</li>
                                            <li class="cost">¥ 199.00</li>
                                        </ul>
                                    </li>
                                </div>
                                <div style="clear:both;"></div>
                                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
                            </div>
                            <div class="content">
                                <div class="touxiang"></div>
                                <div class="title">
                                    <div>
                                        <li class="title01">沙拉轻食创意课程套餐</li>
                                    </div>
                                    <li class="title02">共18小节</li>
                                    <li class="title03">
                                        <ul>
                                            <li class="lecturer">讲师：李翔</li>
                                            <li class="cost">¥ 199.00</li>
                                        </ul>
                                    </li>
                                </div>
                                <div style="clear:both;"></div>
                                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
                            </div>
                            <div class="content">
                                <div class="touxiang"></div>
                                <div class="title">
                                    <div>
                                        <li class="title01">沙拉轻食创意课程套餐</li>
                                    </div>
                                    <li class="title02">共18小节</li>
                                    <li class="title03">
                                        <ul>
                                            <li class="lecturer">讲师：李翔</li>
                                            <li class="cost">¥ 199.00</li>
                                        </ul>
                                    </li>
                                </div>
                                <div style="clear:both;"></div>
                                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
                            </div>
                            <div class="content">
                                <div class="touxiang"></div>
                                <div class="title">
                                    <div>
                                        <li class="title01">沙拉轻食创意课程套餐</li>
                                    </div>
                                    <li class="title02">共18小节</li>
                                    <li class="title03">
                                        <ul>
                                            <li class="lecturer">讲师：李翔</li>
                                            <li class="cost">¥ 199.00</li>
                                        </ul>
                                    </li>
                                </div>
                                <div style="clear:both;"></div>
                                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
                            </div> -->
        </div>
    </div>
    </div>
    </mt-search>
    </div>
</template>

<script>
    import course_search_controller from "./course_search_controller";
    export default course_search_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    .Search-box{
        width:100%;
        height:40px;
        line-height:40px;
        position:fixed;
        background-color:#f5f5f5;
        z-index:98;
        border-bottom:solid 1px rgba(178, 178, 178, 0.5);
    }
    input {
        border: solid 1px #bfbfbf;
        width:225px;
        height: 28px;
        line-height: 28px;
        border-radius: 15px;
        padding: 0 18px 0 18px;
        margin: 0 auto;
        position: relative;
        top:-2px;
    }
    .Recommend,
    .Hot,
    .Newest {
        
        background-color: white;
        padding-right: 12px;
        padding-left: 12px;
    }
    .touxiang {
        width: 64px;
        height: 64px;
        background-color: green;
        float: left;
    }
    .content {
        padding-top: 10px;
    }
    .title {
        width:calc(100% - 84px);
        float: left;
        text-align: left;
        margin-left: 8px;
        font-family: Helvetica, sans-serif;
    }
    .title02 {
        color: #999;
        font-size: 12px;
        margin-bottom: 2px;
    }
    .title01 {
        margin-bottom: 8px;
        font-size: 15px;
        color: #333;
    }
    .lecturer {
        float: left;
        color: #999;
        font-size: 12px;
    }
    .cost {
        float: right;
        color: red;
        line-height: 16px;
        font-size: 12px;
    }
    #course {
        .course {
            margin-top: 40px;
        }
    }
</style>