<template >
    <div id="clockinrule">
        <c-title :hide="false" :text='title' totext='挑战规则'></c-title>
        <div id="rule">
            <div class="rule-content">
                <h3>活动规则</h3>
                <p v-html="ruleContent"></p>
            </div>
        </div>
    </div>
</template>

<script>
import clockinrule_controller from './clockinrule_controller';
export default clockinrule_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #rule{
        margin-top:40px;
        width: 100%;
        height: 100%;
        text-align: left;
        .rule-content{
            h3{
                font-size: 17px;
                margin:10px;
            }

            p{
                margin: 10px;
                font-size: 15px;
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
            
            }
        }
    }
</style>