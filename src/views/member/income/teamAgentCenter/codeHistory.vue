
<template>
    <div id="teamCode">
        <c-title :hide="false" text='使用记录'></c-title>
		<div style="height:45px"></div>

        <ul class='rationList' v-for="item in codes">
          <li>
            <div class="left">
                <span>{{item.code}}</span>
                <p>使用者:{{item.has_one_use_member.nickname}}</p>
            </div>
            <div class="right">
                <span>已使用</span>
                <p>使用时间:{{item.updated_at}}</p>

            </div>
          </li>
        </ul>
    </div>
</template>

<script>
import code_history_controller from './code_history_controller';
export default code_history_controller;

</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
#teamCode{
.el-button--text {
    color: #fff;
    background-color: #ff4949;
    border-color: #ff4949;
    width: 90%;
    margin: 10px;
}
    .m_header {
        width: 100%;
        height: 45px;
        line-height: 45px;
        background: #fff;
        font-size: 15px;
        font-weight: bold;
        border-bottom: 1px solid #ccc;

        span {
            display: inline-block;
            width: 16px;
            height: 24px;
            float: left;
            font-size: 22px;
            font-weight: normal;
        }

    }
    .rationList{
        li{background:#fff;padding:10px;overflow:hidden;border-bottom:1px solid #ddd;margin-bottom:10px;
            .left{float: left;color:#333;  font-size: 1rem;  line-height: 28px; text-align: left;
                p{color: #999;font-size: .8rem; text-align: left}
            }
            .right{float: right;line-height: 28px;text-align: right;
                p{color: #999;font-size: .8rem; }
            }
        }
    }
}


</style>
