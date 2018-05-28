<template>
    <div id="traffic">
        <ul class="traffic-box">
            <li class="info" v-for="(item,index) in items" @click="selectedStyle($event,index)">
                <u></u> <b>{{item.num}}</b> <i></i>
            </li>
        </ul>

        <div class="traffic-money">
        	<div class="item" @click="selectMoney($event,item.price)" v-for="item in data">
                <div class="lf">
                    <p class="one"> <b>¥{{item.price}}</b> <span v-show="item.span">{{item.span}}</span> </p>
                    <p class="two">{{item.des}}</p>
                </div>
                <div class="rt"> <span class="circle"></span></div>
           </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            active:true,
            data:[
            	{price:'44.5',span:'赠送100积分',des:'当月有效，全国通用，即时生效，支持3G/4G'},
            	{price:'50',des:'当月有效，全国通用，即时生效，支持3G/4G'},
            	{price:'44.5',span:'赠送100积分',des:'当月有效，全国通用，即时生效，支持3G/4G'}],
            items:[{num:'1G',data:[
            	{price:'44.5',span:'赠送100积分',des:'当月有效，全国通用，即时生效，支持3G/4G'},
            	{price:'50',des:'当月有效，全国通用，即时生效，支持3G/4G'},
            	{price:'44.5',span:'赠送100积分',des:'当月有效，全国通用，即时生效，支持3G/4G'}]},
            	{num:'2G',data:[
            	{price:'99.8',span:'赠送100积分',des:'当月有效，全国通用，即时生效，支持3G/4G'},
            	{price:'100',des:'当月有效，全国通用，即时生效，支持3G/4G'},
            	{price:'102',span:'赠送100积分',des:'当月有效，全国通用，即时生效，支持3G/4G'}]},
            	{num:'3G',data:[
            	{price:'134',span:'赠送100积分',des:'当月有效，全国通用，即时生效，支持3G/4G'},
            	{price:'145',des:'当月有效，全国通用，即时生效，支持3G/4G'},
            	{price:'150',span:'赠送100积分',des:'当月有效，全国通用，即时生效，支持3G/4G'}]}]
        }
    },
    methods:{
        selectedStyle(e,n){
            var boxs=document.getElementById("traffic").getElementsByClassName("info");
            for(var i=0;i<boxs.length;i++){
                boxs[i].className="info"
            }
            e.currentTarget.className="info active";

            this.data = this.items[n].data;
        },
        selectMoney(e,money){
            var boxs=document.getElementById("traffic").getElementsByClassName("item");
            for(var i=0;i<boxs.length;i++){
                boxs[i].lastElementChild.lastElementChild.className="";
            }
            e.currentTarget.lastElementChild.lastElementChild.className="active";
			this.$emit("payMoney",money);
        }
    },
    mounted(){
        var boxs=document.getElementById("traffic").getElementsByClassName("info");
        boxs[0].className="info active";

        var circles=document.getElementById("traffic").getElementsByClassName("circle");
        circles[0].className="circle active"
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
*{box-sizing:border-box}
#traffic{
    .traffic-box{
        margin:7px;
       	justify-content:space-around;
       	flex-flow:row;
       	flex-direction:row;
       	display:flex;
        li{
            width:30%;
            height:70px;
            border:1px solid #ccc;
            border-radius:4px;
            font-size:22px;
            color:#666;
            padding-top:20px;
           
        }
        li.active{
            position:relative;
            border:1px solid #36d2b6;
            u{
                position:absolute;
                width:50px;
                height:30px;
                display:inline-block;
                top:0;
                left:0;
                background:url(../../../../../assets/images/favourablE.png) no-repeat 0 0;
            }
            i{
                width:30px;
                height:16px;
                display:inline-block;
                position:absolute;
                right:0;
                bottom:0;
                background:url(../../../../../assets/images/checkeD.png) no-repeat 1px 0;
            }
        }
    }
    .traffic-money{
        .item{
            padding:13px 20px;
            overflow:hidden;
            div.lf{
                width:80%;
                p{clear:both}
                .one{
                    line-height:40px;

                    b{
                        font-size:22px;
                        color:#333;
                        font-weight:normal;
                        float:left;
                    }
                    span{
                        padding:3px 8px;
                        background:#36d2b6;
                        color:#fff;
                        border-radius:6px;
                        font-size:10px;
                    }
                }
                .two{
                    font-size:12px;
                    color:#666;
                    text-align:left;
                    line-height: 18px;
                }
            }
            div.rt{
                width:20%;
                span{
                    width:20px;
                    height:20px;
                    display:inline-block;
                    border:1px solid #aaa;
                    border-radius:50%;
                    margin-top:20px;
                    float:right;
                }
                .active{
                    border:1px solid #36d2b6;
                    background:url(../../../../../assets/images/mark.png) no-repeat 3px 3px;
                }
            }
        }
    }
}
</style>