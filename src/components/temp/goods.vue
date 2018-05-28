<template>
<div id="goods">
<div class="fe-mod fe-mod-8" :style="{'backgroundColor':datas.params.bgcolor}">
    <div class="fe-mod-8-title" v-show="datas.params.showtitle == 0" :style="{'color':datas.params.titlecolor,'backgroundColor':datas.params.bgcolor}">{{datas.params.title|| '请填写商品组标题'}}</div>
    <div style="line-height: 170px; text-align: center; color: #999; font-size: 16px;" v-show="datas.data == ''">一个商品都没有...</div>
    <!-- 默认两种样式 -->
    <div v-show="datas.params.style != 'hp'  && datas.params.style != 'hotel'" class="new-goods">
        <div v-for="good in datas.data">
            <div class="fe-mod-8-good good-new" :style="{'width':datas.params.style}">
                <router-link :to="{ name: 'goods', params: { id: good.goodid },query:{i:toi, mid:mid}}">
                    <div class="fe-mod-8-main">
                        <div class="fe-mod-8-main-img" :class="{oo2:datas.params.style=='50%',oo3:datas.params.style=='33.3%'}">
                            <img :src="good.img" class="goodimg"  width="100%" :style="{height:datas.params.style=='49.5%'? '40vw':(datas.params.style=='33.3%'? '25vw':(datas.params.style=='50%'?'40vw':'95vw'))}"/>
                            <div class="saleimg" :class="[datas.params.option]"></div>
                        </div>
                        <div class="fe-mod-8-main-name" v-show="datas.params.showname == 1">
                            <div class="fe-mod-8-main-name-name">{{good.name}}</div>
                        </div>
                        <div class="card-price" v-show="datas.params.price != 0">￥{{good.pricenow}}<span style="text-decoration: line-through; font-size: 12px; color: #808080;" v-show="datas.params.price == 1 && good.priceold!=good.pricenow && good.priceold > 0">￥{{good.priceold}}</span>
                        <div class="fe-mod-8-main-name-buy add-cart" :class="datas.params.buysub" v-show="datas.params.buysub"></div></div>
                    </div>
                </router-link>
            </div>
        </div> 
    </div>
    <!-- 横幅样式 -->
    <div v-show="datas.params.style == 'hp'" class="new-goods"> 
        <div v-for="good in datas.data">
        	<router-link :to="{ name: 'goods', params: { id: good.goodid },query:{i:toi,mid:mid}}">
                <div class="fe-mod-8-hp-line">
                    <div class="fe-mod-8-hp-line-img">
                        <div class="saleimg" :class="[datas.params.option]"></div>
                        <img :src="good.img"/> 
                    </div> 
                    <div class="fe-mod-8-hp-line-info">
                        <div class="title">{{good.name}}</div>
                        <div class="price fe-mod-8-main-name">
                            <div v-show="datas.params.price != 0">
                                <div class="p1" :style="{'color':datas.params.titlecolor}">￥{{good.pricenow}} </div>
                                <div class="p2" v-show="datas.params.price == 1">￥{{good.priceold}} </div>
                            </div>
                            <div class="p3" v-show="good.sales">销量:{{good.sales}}{{good.unit}}</div>
                            <div class="fe-mod-8-main-name-buy  buy-1" style="margin-top: 6px;" v-show="datas.params.buysub" :class="[datas.params.buysub]"></div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
      <!--酒店样式2 -->
    <div v-show="datas.params.style == 'hotel'"> 
        <div id="checkinout" style=" border: solid #cccccc 1px; border-width:1px 0;">
                <a id="selinTime" style="font-weight: normal;  display: block; height:40px; line-height:40px; padding:0 0px;background:#fff" :href="datas.sessionurl">
                <div style="float:left; width:40%;">
                    <span style="background:#f5f5f5; display:block; float:left; height:40px; width:60px; color:#999999; padding:0 5px 0 10px;">入住:&nbsp;</span>
                    <span id="CheckInDay" style="float:left; display:block; padding-left:6px;">xxxx</span>  </div>
                  <div style="float:left; width:40%;">               
                    <span style="background:#f5f5f5; display:block; float:left; height:40px; width:60px; color:#999999; padding:0 5px 0 10px;">退房:&nbsp;</span>
                    <span id="CheckInDay" style="float:left; display:block; padding-left:6px;">xxxxx</span></div>
                     <div style="float:left; width:20%;background:#f5f5f5;">
                    <span class="span2" style="margin-left:10px; padding-right:10px;" id="CheckOutDay">住:<span style=" color:#F00; padding:0 3px;">xxx</span>晚</span>
                    </div>
                </a>
        </div>
        <div v-for="good in datas.data" style="height:110px;"> 
             <ul class="jiudroom" style="height:110px;">
                 <li>
                <router-link :to="{ name: 'goods', params: { id: good.goodid },query:{i:toi,mid:mid}}">
                <img :src="good.img" alt="" class="roomimg"> 
                </router-link>
                <div class="jiudroom-text" style="height:76px;overflow:hidden">
                    <h1 style="font-size:16px; color: #333;">{{good.name}}</h1>
                   <span v-for="prams in good.pram" style="height:110px;"> 
                    <p>{{prams.title}}:{{prams.value}}</p>
                    </span>
                </div>   
                <div class="jiudroom-price pa">
                    <ins>￥<i>{{good.todayoprice}}</i></ins>
                    <del>￥{{good.todaycprice}}</del>                 
                    <div v-show="good.has == '0'">
                    <a  style="display: block;color: #ffffff;" :href="good.url
                    " class="btnbook" >预定</a> 
                    </div>
                     <div v-show="good.has!='0'">             
                  <button class="btnbook" style="background: #aaa;color:#fff">预定</button>
                </div>     
                </div>                  
            </li>            
            </ul>            
        </div>
    </div>
</div>	
</div>
</template>
<script>
  export default {
    props: ['datas'],
	data() {
		return {
          toi:window.localStorage.i,
          mid:this.fun.getKeyByMid()
        }
	},    
    mounted(){

    },
    methods:{

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#goods{
.fe-mod-8-hp-line-info .title{text-align: left;}	
.fe-mod:hover{border:2px dashed rgba(0,0,0,0); cursor:default;}
.fe-mod,.fe-mod:hover {border:0px;}
.fe-mod-cube td {height:auto;}
.jiudroom {
    background: #ffffff;
}
.jiudroom li .roomimg {
    position: absolute;
    height: 85px;
    width: 85px;
    left: 10px;
}
.jiudroom li {
    position: relative;
    padding: 10px 70px 10px 105px;
    height: 106px;
    border-bottom: 1px solid #ececec;
    font-size: 12px;
}
.jiudroom-price {
    right: 10px;
    top: 10px;
    width: 70px;
    text-align: center;
}
.pa {
    position: absolute!important;
}
.jiudroom-price ins {
    text-decoration: none;
    font-size: 12px;
    color: #f88917;
}
.jiudroom-price del {
    color: #999999;
}
.jiudroom-text h1 {
    font-size: 16px;
    margin-bottom: 14px;
    height: 20px;
    line-height: 20px;
    width: 100%;
    overflow: hidden;
    font-weight: normal;
    margin-top: -1px;
}
.btnbook {
    background: #f88917;
    border-radius: 3px;
    color: #ffffff;
    border: none;
    width: 100%;
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    margin-top: 5px;
}	







.fe-mod-8 {
    height: auto;
    overflow: hidden;
    padding: 5px 0px;
    background: #fff;
}

.fe-mod-8 a , .fe-mod-8 a:hover {
    color: inherit;
    text-decoration: none;
}

.fe-mod-8-title {
    padding: 0px 8px;
    font-size: 16px;
    color: #666;text-align: left;
}

.fe-mod-8-good {
    height: auto;
    width: 50%;box-sizing: border-box;
    float: left;
}

.fe-mod-8-main {
    height: auto;
    padding: 5px;
    background: #fff;
}
.fe-mod-8-main-img{
	position: relative;
}
.fe-mod-8-main-img.oo2 {
    min-height: 43vw;
    background: #FFF;
    position: relative;
    text-align: center;
}

.fe-mod-8-main-img.oo2 img {
    width: 43vw;
 	height: 43vw;
}
.fe-mod-8-main-img.oo3 {
    min-height: 25vw;
    position: relative;
    text-align: center;
}

.fe-mod-8-main-img.oo3 img {
    width: 25vw;
    height: 25vw;
 
}
.fe-mod-8 .new {
    height: 30px;
    width: 30px;
    background: url(../../assets/images/ico_new.png) no-repeat;
    background-size: 30px;
    position: absolute;
    top: -1px;
    left: -1px;
}

.fe-mod-8 .saleimg {
    height: 50px;
    width: 50px;
    position: absolute;
    top: -3px;
    left: -3px;
}

.fe-mod-8 .sale-xp {
    background: url(../../assets/images/sale-xp.png);
    background-size: 50px;
}

.fe-mod-8 .sale-rx {
    background: url(../../assets/images/sale-rx.png);
    background-size: 50px;
}

.fe-mod-8 .sale-tj {
    background: url(../../assets/images/sale-tj.png);
    background-size: 50px;
}

.fe-mod-8 .sale-xs {
    background: url(./img/sale-xs.png);
    background-size: 50px;
}

.fe-mod-8 .sale-by {
    background: url(./img/sale-by.png);
    background-size: 50px;
}

.fe-mod-8 .sale-cx {
    background: url(./img/sale-cx.png);
    background-size: 50px;
}

.fe-mod-8 .recom {
    height: 30px;
    width: 30px;
    background: url(./img/ico_recom.png) no-repeat;
    position: absolute;
    top: -1px;
    left: -1px;
}

.fe-mod-8 .hot {
    height: 30px;
    width: 30px;
    background: url(./img/ico_hot.png) no-repeat;
    background-size: 30px;
    position: absolute;
    top: -1px;
    left: -1px;
}

.fe-mod-8-main-name {
    height: auto;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    color: #999;
    margin-top: 5px
}

.fe-mod-8-main-name-name {
    height: 40px;
    text-align: left;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #333
}

.fe-mod-8-main-name-buy {
    height: 20px;
    width: 30px;
    float: right;
    background-repeat: no-repeat;
}

.fe-mod-8 .buy-1 {
    background: url(./img/ico_buy_1.png);
    background-size: 30px 20px;
}

.fe-mod-8 .buy-2 {
    background: url(./img/ico_buy_2.png);
    background-size: 30px 20px;
}

.fe-mod-8 .buy-3 {
    background: url(./img/ico_buy_3.png);
    background-size: 30px 20px;
}

.fe-mod-8 .buy-4 {
    background: url(./img/ico_buy_4.png);
    background-size: 30px 20px;
}

.fe-mod-8-main-price {
    height: 24px;
    width: 100%;
    font-size: 14px;
    text-align: left;
    line-height: 24px;
    color: #fff;
    background: rgba(0,0,0,0.2);
    padding-left: 3px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    content: "...";
}

.fe-mod-8-hp-line {
    height: 90px;
    background: #fff;
    padding: 5px;
}

.fe-mod-8-hp-line-img {
    height: 80px;
    width: 80px;
    background: #ddd;
    float: left;
    position: relative;
}

.fe-mod-8-hp-line-img img {
    height: 100%;
    width: 100%;
}

.fe-mod-8-hp-line-info {
    height: 80px;
    background: #fff;
    padding-left: 90px;
}

.fe-mod-8-hp-line-info .title {
    height: 40px;
    font-size: 14px;
    color: #333;
    line-height: 20px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.fe-mod-8-hp-line-info .price {
    height: 30px;
    width: 100%;
    margin-top: 10px;
    font-size: 14px;
    color: #bbb;
    line-height: 30px;
    float: left;
    overflow: hidden;
}

.fe-mod-8-hp-line-info .price .p1 {
    float: left;
    color: #ff6600;
}

.fe-mod-8-hp-line-info .price .p2 {
    font-size: 12px;
    padding-left: 5px;
    text-decoration: line-through;
    float: left;
    line-height: 32px
}

.fe-mod-8-hp-line-info .price .p3 {
    padding-left: 10px;
    float: left;
    font-size: 12px;
}
	
	
.new-goods {
    padding: 4px
}

.card-price {
    color: #ff6600;
    overflow: hidden;
    position: relative;
    height: 20px;
    text-align: left;
}

.good-new {
    padding: 4px
}

.good-new a {
    border: 1px solid #e5e5e5;
    display: block;
    background: #fff
}

.add-cart {
    position: absolute;
    ;right: 0;
    bottom: 0
}

.fe-mod-8-hp-line {
    border: 1px solid #e5e5e5;
    display: block;
    background: #fff;
    margin: 5px 0;
}
	
	}
</style>