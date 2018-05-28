<template>
    <div id="all">
        <c-title hide="true" text='home' :eteos="fun.setWXTitle($store.state.temp.item.janst)"></c-title>

        <section class="current">
            <!--<div class="uw vt vu"><p class="vz">沃尔玛-淘金店1</p><a class="ce cd"
                                                              clstag="pageclick|keycount|store_searchbar_click_20160623_1|2"></a>
            </div>-->
            <article class="scrolling">
                <div class="content scroller">
                    <div class="storeHomeNew  store-industry-1" style="min-height: 649px;" :style="{'position':showStoreInfo ? 'relative' : 'fixed'}">
                        <div class="yq clearfix">
                            <img class="qy" :src="store.store_thumb">
                            <div class="qz">
                                <div class="a1r clearfix">
                                    <h2 class="r0">{{store.store_name}}</h2>
                                </div>
                                <p class="yr">{{store.dispatch}}</p>
                                <p class="yr" style="margin-top: 5px;"><span class="a25">{{store.business_hours}}</span></p>
                            </div>
                            <div class="a02 " data-focus="0" clstag="pageclick|keycount|store_focus_20160815_1"><!--<i class="a03 "></i>--></div>
                            <div class="yy yz cashier-buy" @click="goBuy" style=""><i class="fa fa-money" aria-hidden="true"></i> <span style="margin-left:2px">买单</span></div>
                            <div class="a0v">
                                <ul class="a1t dh">
                                    <li class="dj a18" v-if="store.affiche">
                                        <i class="ji" style="background:#5FBC65">公告</i><span class="di">{{store.affiche}}</span>
                                    </li>
                                </ul>
                                <div class="vo" @click="showStore" node-type="index-checkStoreActivity" style="">
                                    <span>查看店铺</span><i class="a0w yj"></i>
                                </div>

                            </div>
                            <!--<div class="a01">
                                <div class="noticeTips" clstag="pageclick|keycount|store_status_click_20160729|1">
                                    <i>公告</i>
                                    <div class="tipsAuto">
                                        <div class="tipsFont">14天包退，生鲜无农药残留，购物无忧。</div>
                                    </div>
                                </div>
                            </div>-->
                        </div>
                        <div class="zr">
                            <!--<div class="store-new-sales-warp">
                                <div class="yt"><h2 class="ys">店铺优惠券</h2></div>
                                <div class="z0">
                                    <div class="z1">
                                        <ul class="a0b">
                                            <li class="   clearfix" _type="storeHomeInfo">
                                                <div class="a9d">
                                                    <div class="a0f">
                                                        <div class="a24">
                                                            <div class="a9e">
                                                                <var class="a9g">满29~100元享折扣</var>
                                                            </div>
                                                            <div class="a9f">2017.09.01-2017.09.30</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="a0g">
                                                    <span>
                                                        <var class="a0x">9.5</var>
                                                        <span class="a0y">折</span>
                                                    </span>
                                                </div>
                                                <div class="a0e">
                                                    <div class="a0d">
                                                        <div class="a16">领券</div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="clearfix">
                                                <div class="a9d">
                                                    <div class="a0f">
                                                        <div class="a24">
                                                            <div class="a9e">
                                                                <var class="a9g">满30~100元享折扣</var>
                                                            </div>
                                                            <div class="a9f">2017.09.14-2017.09.30</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="a0g">
                                                    <span>
                                                        <var class="a0x">8.8</var>
                                                        <span class="a0y">折</span>
                                                    </span>
                                                </div>
                                                <div class="a0e">
                                                    <div class="a0d">
                                                        <div class="a16">领券</div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>-->
                            <div class="yu yw"  v-if="store.comment.new_comment">
                                <div class="yt">
                                    <h2 class="ys">店铺评价</h2>
                                </div>

                                <ul class="ym a2">
                                    <li>
                                        <div class="a2 commentWrap clearfix">
                                            <dl class="scoreWrap k"><dt>{{store.comment.average_score}}</dt><dd>综合评分</dd></dl>
                                            <dl class="numberWrap" style=""><dt>{{store.comment.comment_total}}</dt><dd>评论数</dd></dl>
                                        </div>
                                    </li>
                                    <li class="yx clearfix">
                                        <ul class="evaluateListWrap">
                                            <li class="list_li">
                                                <div class="headerPic">
                                                    <img :src="store.comment.new_comment.head_img_url" class="pic">
                                                </div>
                                                <dl class="evaluateList">
                                                    <dt>
                                                    <div class="pName">{{store.comment.new_comment.nick_name}}</div>
                                                    <span class="DateTime">{{store.comment.new_comment.created_at}}</span>
                                                    </dt>
                                                    <dd>
                                                        <span class="a79 clearfix"><i></i><i></i><i></i><i></i><i></i></span>
                                                        <div class="h5"><i class="peisongMark"></i>
                                                            <div class="serviceWrap">
                                                                <span class="pieceFont">{{store.comment.new_comment.content}}</span>
                                                            </div>
                                                        </div>
                                                        <!--<div class="productWrap">
                                                            <i class="fingerMark"></i>
                                                            <div class="singleProWrap">
                                                                <a class="singlePro">NFC 100%鲜果冷鲜压榨橙汁 300ml</a>
                                                                <a  class="singlePro">乐事无限组合包104克3罐(原味+黄瓜+青柠)312g/罐</a>
                                                                <a  class="singlePro">ViTa/维他 柠檬味茶饮料 250ml*6盒</a>
                                                                <a  class="singlePro">进口超甜蕉 &gt;=700g</a>
                                                                <a  class="singlePro">Great Value/惠宜 罐装腰果 280g</a>
                                                                <a  class="singlePro">益力多 乳酸菌乳饮品 500ml（100ml*5瓶）</a>
                                                                <a href="#goodsDetails/skuId:2003117737/storeId:11647212/orgCode:81372" class="singlePro">香满园 御品国珍五常香米 10kg</a>
                                                                <a href="#goodsDetails/skuId:2003117410/storeId:11647212/orgCode:81372" class="singlePro">Great Value/惠宜 咸味花生 350g</a>
                                                            </div>
                                                        </div>-->
                                                    </dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="h a1v clearfix">
                                        <a href="#evaluate/storeId:11647212" class="GotoAllComments" >查看用户的全部评价&nbsp;&gt;</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="yu">
                                <div class="yt"><h2 class="ys">店铺信息</h2></div>
                                <ul class="ym a2">
                                    <!--<li class="a0o">
                                        <div class="a2 clearfix a0t">
                                            <a class="a0p honor-box-1 k " style="background-image:url('https://img30.360buyimg.com/mobilecms/jfs/t5653/276/1587557694/3331/3623265f/5927cbe7N6bb0cdbe.png')">
                                                <span class="r9">14天包退</span>
                                            </a>
                                        </div>
                                    </li>-->
                                    <li class="yv clearfix">
                                        <div class="a0u clearfix"><span class="yn">商品数量：</span><var class="yo">{{store.goods_total}}件</var></div>
                                        <div class="a0u clearfix"><span class="yn">月销单量：</span><var class="yo">{{store.order_count}}单</var></div>
<!--
                                        <div class="a0u clearfix"><span class="yn">关注人数：</span><var class="yo"><em class="js-store-follow">3539</em>人</var></div>
-->
                                        <div class="a0u clearfix"><span class="yn">营业时间：</span><var class="yo">{{store.business_hours}}</var></div>
                                        <div class="a0u clearfix"><span class="yn">门店地址：</span><var class="yo">{{store.store_address}}</var></div>
                                        <div class="a0u clearfix"><span class="yn">门店电话：</span><a @click="tel" class="telPhone">{{store.store_mobile}}</a></div>
                                    </li>
                                    <!--<li class="yv zt h clearfix"><a class="clearfix zv"><span class="yn a20">商家资质</span><strong class="zu yj"></strong></a></li>-->
<!--
                                    <li class="yv zt h clearfix"><a class="clearfix zv"><span class="yn">举报商家得红包</span>最高奖100元<strong class="zu yj"></strong></a></li>
-->
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="z4 z5" v-show="showGoods">
                        <div class="uw vr">
                            <div class="vs">
                                <span class="w0">搜索店内商品</span>
                            </div>
                        </div>
                        <div class="zm clearfix">
                            <ul class="z6">
                                <li class="z7" :class="{'promotion zb': items.active === true}" v-for="items in category">
                                    <strong  class="za a2 k" @click="selectCategory(items)">
                                        <em class="yj z8 "></em><var class="zg">{{items.name}}</var>
                                    </strong>
                                    <strong class="zd" style="height: auto" v-if="items.active">
                                        <!--<span class="zc h ze active">秒杀</span>-->
                                        <span  @click="selectChildCategory(items.childrens, item)" class="zc h ze" :class="{'active': item.active == true}" v-for="item in items.childrens">{{item.name}}</span>
                                    </strong>
                                </li>

                                <!--<li class="z7 promotion zb">
                                    <strong category="" _catid="4147353" catname="果蔬蛋类" hassearchresult="" class="za a2 k" onclick="lg()">
                                        <var class="zg">果蔬蛋类</var>
                                    </strong>
                                    <strong class="zd" style="height: 0px; transition: height 0.4s linear 0s;">
                                        <span category=""  catname="包装蔬菜"   class="zc h ze" onclick="lg()">包装蔬菜</span>
                                        <span category=""  catname="包装蔬菜"   class="zc h ze" onclick="lg()">包装蔬菜</span>
                                    </strong>
                                </li>-->

                            </ul>
                            <div class="zl store-origin-title">
                                <div class="a0m">{{currentCategory}}({{goodsCount}})</div>
                            </div>
                            <div class="a0a">

                                <div class="zi vp " style="height: auto;">
                                    <div class="storePromptWrap a2"  v-if="goodsList.length == 0">正在加载...
                                    </div>
                                    <div class="zk q5"  v-if="goodsList.length > 0">
                                        <ul>
                                            <li v-for="item in goodsList">
                                                <a class="linksGoods a2">
                                                    <span class="a9l" @click="goToGoodsO2O(item)">
                                                        <img :src="item.thumb" class="pic">
                                                    </span>
                                                    <dl @click="goToGoodsO2O(item)">
                                                        <dt>{{item.title}}</dt>
                                                        <dd class="a9n"><strong class="line_pre">已售{{item.show_sales}}{{item.sku}}</strong></dd>
                                                        <dd></dd>
                                                        <dd class="a11"><label><em>￥</em>{{item.price}}</label></dd>
                                                    </dl>
                                                </a>
                                                <div class="Box">
                                                    <span class="reduce" @click="updateCart(goodsCarts[item.id].id, -1)" :class="goodsCarts[item.id] ? 'show' : 'hide'">减</span>
                                                    <label :class="goodsCarts[item.id] ? 'show' : 'hide'" v-if="goodsCarts[item.id]">{{goodsCarts[item.id].total}}</label>

                                                    <span class="add storeSearchCart" @click="addCart(item)">加</span>
                                                </div>
                                            </li>

                                        </ul>
                                        <!--<p class="ct cv">努力加载中<i></i></p>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <div class="z2"  @click="showGoodsInfo" v-show="showStoreInfo"><i class="yj z3"></i><span>点击继续购物</span></div>
            <div class="a2q" v-show="showGoods">
                <div class="a2w "><div></div></div>
                <div class="a33">
                    <p class="a34" hidegatherlist=""></p>
                    <ul class="a35"></ul>
                </div>
                <div class="a2z"></div>
                <a href="javascript:void 0;" @click="goShowCart" v-show="!showCart" class="a2r outcartcontent show " :class="{'light':carts.length>0}">
                    <i v-show="carts.length>0" class="a2s">{{cartsNum}}</i>
                </a>
                <div class="a2t" :style="leftPrice" pricearea="">
                    <div v-show="carts.length>0" class="">￥{{cartsTotal}}</div>
                    <div v-show="carts.length == 0" class="a2u">购物车是空的</div>
                </div>
                <a class="a2v" :class="{'disabled':goodsCarts.length==0}" qujiesuan=""  @click="goodsOrder">去结算</a>
                <div class="minicart-content" :style="minicartStyle">
                    <a href="javascript:void 0;"  @click="goShowCart" class="a2r incartcontent light" :class="showLogo">
                        <i class="a2s">{{cartsNum}}</i>
                    </a>
                    <i class="a37"></i>
                    <div class="a38 ">
                        <span class="a4b a4c checked" checkallgoods="" @click="lg">全选</span>
                        <p class="a4e">(已选{{cartsNum}}件)</p>
                        <a href="javascript:void 0;" class="a39" @click="clearCart">清空购物车</a>
                    </div>
                    <div class="a3b" >
                        <div class="a3m single">
                            <div class="a3r single" expandgift="single"><span></span>
                                <div style="display:none"></div>
                            </div>
                            <ul class="minicart-goods-list single">
                                <li class="a3o single" v-for="item in carts">
                                    <span class="a4b a3p checked" checkgoods="" @click="checkCart(item.id)"></span>
                                    <a class="a3s">
                                        <table class="a3t">
                                            <tbody>
                                            <tr>
                                                <td style=" width:62px; " @click="goToGoodsO2O(item)">
                                                    <img class="a3u" :src="item.goods.thumb">
                                                </td>
                                                <td>
                                                    <div class="a3x"  @click="goToGoodsO2O(item)">{{item.goods.title}}</div>
                                                    <div class="a46" @click="goToGoodsO2O(item)">
                                                        <!--<span class="a41" style="background-color:#fecc32">直降</span>-->
                                                        <div class="a3q"  >￥{{item.goods.price}}</div>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </a>
                                    <a style="" @click="updateCart(item.id, -1)" class="a3v"></a>
                                    <em style="" class="a3y">{{item.total}}</em>
                                    <a @click="updateCart(item.id, 1)" class="a3w"></a>
                                </li>
                            </ul>
                            <div class="a3n single" style=""></div>
                        </div>
                    </div>
                    <div style="height:49px;" discountpromptmsgheight=""></div>
                    <div style="display:none" class="a4f" discountpromptmsg=""></div>
                </div>
                <div giftcontent="">  </div>
                <div class="a30" @click="goShowCart" style="display: block;" v-if="showCart"></div>
                <div class="a30" v-if="!showCart"></div>
            </div>
        </section>

        <div class="y5" bottommenus="" @click="showToolbar" style="bottom: 115px;">
            <div class="y6" bottomlinks="" v-show="toolbar">
                <router-link class="y8" :to="fun.getUrl('otoHome')">
                    首页
                </router-link>

                <router-link class="y9" :to="fun.getUrl('category')">
                    分类
                </router-link>
                <router-link class="ya" :to="fun.getUrl('cart')">
                    购物车
                </router-link>
                <router-link class="yb" :to="fun.getUrl('orderlist',{ status:'0' })">
                    订单
                </router-link>
                <router-link class="yc" :to="fun.getUrl('member')">
                    我的
                </router-link>
                <i class="yd"></i>
            </div>
        </div>
    </div>
</template>


<script>
  import home from './store_controller';
  export default home;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../../assets/css/o2ostore.css';
</style>
