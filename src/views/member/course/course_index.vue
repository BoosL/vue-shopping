<template>
	<div id="course">
		<c-title :hide="false" text='课程'></c-title>
        <div class="tupian" style="margin-top:40px;position:relative;">
            <div style="width:100%;line-height:48px;position:absolute;z-index:98">
            <!-- <yd-icon slot="icon" class="icon-sousuo" custom size="20px" color="#808080" style="position:absolute;right:22%;z-index:8888;top:-2px;"></yd-icon> -->
            <!--<input type="text" class="s_input input_enter_placeholder" placeholder="搜索课程/讲师"  v-model="searchVal" @click="moreGoods('all')">-->
            </div>
            <div style="position: relative;"></div>
            <yd-slider autoplay="3000" v-if="showCarousel">
                <yd-slider-item v-for="item in carouselInfo">
                    <a :href="item.link?item.link:'javascript:;'">
                        <div style="height:210px;">
                            <img :src="item.thumb" style="height:100%;">
                        </div>
                    </a>
                </yd-slider-item>
            </yd-slider>
        </div>
        <yd-cell-group style="margin-top:6px;margin-bottom:0px;" v-if="showRec">
            <yd-cell-item arrow  @click.native="moreGoods('is_recommand')">
                <span slot="left">精选推荐课程</span>
                <span slot="right">更多</span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="Recommend" v-if="showRec">
            <div class="content" v-for="item in recGoodList" @click="goToDetail(item.goods_id)">
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
            </div> -->
            <!-- <div class="content">
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
            </div> -->
        </div>
        <yd-cell-group style="margin-top:6px;margin-bottom:0px;" v-if="showHot">
            <yd-cell-item arrow  @click.native="moreGoods('is_hot')">
                <span slot="left">热门课程</span>
                <span slot="right">更多</span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="Hot" v-if="showHot" >
            <div class="content" v-for="item in hotGoodList" @click="goToDetail(item.goods_id)">
                <div class="touxiang">
                     <img style="width:100%;height:100%;" :src="item.thumb">
                </div>
                <div class="title">
                    <div>
                        <li class="title01">{{item.title}}</li>
                    </div>
                    <li class="title02">共{{item.course_chapter_num}}小节</li>
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
            <!-- <div class="content">
                <div class="touxiang"></div>
                <div class="title">
                    <div>
                        <li class="title01">牛乳茶制作课程</li>
                    </div>
                    <li class="title02">共3小节</li>
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
                            <li class="cost">¥ 199.00</li>
                        </ul>
                    </li>
                </div>
                <div style="clear:both;"></div>
                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
            </div> -->
        </div>
        <yd-cell-group style="margin-top:6px;margin-bottom:0px;" v-if="showNew">
            <yd-cell-item arrow @click.native="moreGoods('is_new')">
                <span slot="left">最新课程</span>
                <span slot="right">更多</span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="Newest" v-if="showNew">
            <div class="content" v-for="item in newGoodList" @click="goToDetail(item.goods_id)">
                <div class="touxiang">
                    <img style="width:100%;height:100%;" :src="item.thumb">
                </div>
                <div class="title">
                    <div>
                        <li class="title01">{{item.title}}</li>
                    </div>
                    <li class="title02">共{{item.course_chapter_num}}小节</li>
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
            <!-- <div class="content">
                <div class="touxiang"></div>
                <div class="title">
                    <div>
                        <li class="title01">牛乳茶制作课程</li>
                    </div>
                    <li class="title02">共3小节</li>
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
                            <li class="cost">¥ 199.00</li>
                        </ul>
                    </li>
                </div>
                <div style="clear:both;"></div>
                <div style="width:363px;height:1px;background-color:#b2b2b2;margin-top:10px;transform: scaleY(.5);"></div>
            </div> -->
        </div>
        <div style="width:100%;height:44px;background-color:#f15353;margin-top:4px;margin-bottom:52px;" @click="moreGoods('all')">
            <span style="height:44px;line-height:44px;text-align:center;font-size:15px;color:#fff">查看更多课程 >></span>
        </div>
    </div>
</template>

<script>
    import courseIndex_controller from "./course_index_controller";
    export default courseIndex_controller;
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
img{display: block}
    .tupian {
        position: relative;
    }
    .sousuo {
        width: 60%;
        height: 30px;
        background-color: #f2f2f2;
        border-radius: 15px;
        position: absolute;
        top: 10px;
        left: 20%;
        z-index: 999;
        opacity: 0.6;
    }
    .Recommend,
    .Hot,
    .Newest {
        width: 100%;
        background-color: white;
       padding-right:0px;
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
        width: 279px;
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
    .header {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: red;
    }

input{
    border:solid 1px #bfbfbf;
    width:60%;height:30px;
    line-height:30px;
    background-color: rgba(246, 246, 246, 0.6);
    border-radius:15px;
    padding:0 18px 0 18px;
    margin:0 auto;
    position:relative;
    }
.Recommend,.Hot,.Newest{width:100%;background-color:white;padding-left:12px;}
.touxiang{width:64px;height:64px;background-color:green;float:left;}
.content{padding-top:10px;}
.title{width:calc(100% - 84px);float:left;text-align:left;margin-left:8px;font-family:Helvetica, sans-serif;}
.title02{color:#999;font-size:12px;margin-bottom:2px;}
.title01{margin-bottom:8px;font-size:15px;color:#333;}
.lecturer{float:left;color:#999;font-size:12px;}
.cost{float:right;color:red;line-height:16px;font-size:12px;}
#course {
    .course{
        margin-top:40px;
    }
}
.header{width:100px;height:100px;border-radius:50%;}
</style>