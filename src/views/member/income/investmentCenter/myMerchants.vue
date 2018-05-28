<template>
    <div id="myMerchants">
        <div class="input">
            <input type="text" @focus="beginSearch" name="" v-model="searchVal"  placeholder="搜索供应商ID/昵称/姓名">
        </div>
        <ul class="merchants_list">
            <li v-for="elem in merchantsList">
                <div class="left">
                    <img src="">
                    <b>{{elem.name}}</b>
                </div>
                <div class="right">
                    <span>分红金额</span> <br>
                    <b>{{elem.salary}}</b>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        methods:{
            beginSearch(){
                this.$emit('emitFocus',true);
            }
        },
        props: ['searchVal','merchantsList'],
        data(){
            return{

            }
        }
     }

</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
 #myMerchants{
    background:#fff;
    .input{
        input{
            margin:10px 5%;
            width:80%;
            height:30px;
            border-radius:6px;
            border:0;
            outline:0;
            padding-left:30px;
            background:url(../../../../assets/images/search.png) no-repeat 10px 8px #f2f2f2;
        }
    }
    .merchants_list{
        margin-top:10px;
        overflow:hidden;
        li{
            padding:10px;
            border-bottom:1px solid #ccc;
            overflow:hidden;
            .left{
                width:40%;
                float:left;
                img{
                    width:55px;
                    height:55px;
                    background:#ccc;
                    vertical-align:middle;
                }
                b{
                    font-size:15px;
                    color:#333;
                    padding-left:10px;
                }
            }
            .right{
                width:40%;
                float:right;
                text-align:right;
                span{
                    font-size:11px;
                    color:#333;
                }
                b{
                    color:#f15353;
                    font-size:16px;
                    line-height:30px;
                }
            }
        }
        li:last-child{
            border-bottom:0;
        }
    }
 }
</style>