<template>
    <div id="articleContent">
        <h4>{{dataInfo.title}}</h4>


        <div class="time">{{dataInfo.created_at}}</div>

        <div class="content">
              {{dataInfo.content}}
        </div>
    </div>

</template>
<script>
    import message_info_controller from "./message_info_controller";
    export default message_info_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #articleContent {
        padding: 10px;
        background: #fff;

        .foot_advs{
            margin-bottom: 20px;
            background: #fff;
            height: auto;
            border: 0.5px solid #dddddd;
            padding: 5px;
            background: #fff;
            width: 100%;
            border-radius: 0px;
        }
        .foot {
            height: 30px;
        }
        h4 {
            text-align: left;
            font-size: 18px;
        }
        h4.like {
            float: left;
            color: #8a8a8a;
            text-align: left;
            font-size: 16px;
        }
        h4.read {
            padding-right: 10px;
            float: left;
            color: #8a8a8a;
            text-align: left;
            font-size: 16px;
        }
        h4.report {
            padding-right: 10px;
            float: right;
            color: #8a8a8a;
            text-align: left;
            font-size: 16px;
        }
        h4.link {
            padding-right: 10px;
            float: right;
            color: #8a8a8a;
            text-align: left;
            font-size: 16px;
        }
        h4.copy {
            padding-right: 10px;
            float: left;
            color: #8a8a8a;
            text-align: left;
            font-size: 16px;
        }
        .time {
            font-size: 14px;
            color: #8a8a8a;
            text-align: left;
            line-height: 25px;
            height: 25px;
        }
        .content {
            width: 100%;
            font-size: 16px;
            text-align: left;
            padding-top: 10px;
            padding-bottom: 30px;
            img {
                width: 100%;
            }
        }
        .advs_img_bg {
            width: 100%;
            height: 130px;
            margin-bottom: 10px;
            padding-top: 5px;
            padding-bottom: 5px;
        }
        .advs_img {
            width: 100%;
            height: 120px;
        }
        p.advs_title {
            padding-left: 5px;
            padding-right: 5px;
            text-align: left;
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: bold;
        }
        .advs_desc {
            padding-left: 5px;
            padding-right: 5px;
            text-align: left;
            font-size: 14px;
            color: #8a8a8a;
        }
    }
</style>