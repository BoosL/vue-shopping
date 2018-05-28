<template>
    <div id="electricity" :class="'electricity'+$store.state.service.lang">
        <c-title :hide="false" :text='language.title'></c-title>
        <div style="height:40px"></div>
        <template>
            <div v-for="item in order_data" id="isSubtotal">
                <div v-for="g in item.order.order_goods">
                    <p class="subtotal">
                        <span>{{language.subtotal}}</span>
                        <span>¥{{g.goods_price}}</span>
                    </p>
                </div>
                <div class="clear"></div>
                <div class="integral" v-if="deduction" v-for="d in deduction">
                    <div>
                        {{d.value}}{{d.name}}
                        <span>{{d.price}}{{language.yuan}}</span>
                    </div>
                    <mt-switch :class="{rt:$store.state.service.lang=='ch',lf:!$store.state.service.lang=='wei'}" v-model="d.checked" @change="discountHandle(item,d)"></mt-switch>
                </div>
                <div class="clear"></div>
            </div>
        </template>
    
        <div class="m-footer">
            <div class="amount">
                <span>{{language.total}}
                    <b>{{price}}</b>
                </span>
                <button type="button" @click='submit'>{{language.btn}}</button>
            </div>
        </div>
    
    </div>
</template>

<script>
import electricity_pay_controller from './electricity_pay_controller';
export default electricity_pay_controller;
</script>
<style type="text/css">
::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #1bba9e;
}

:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #1bba9e;
}

::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #1bba9e;
}

:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #1bba9e;
}
</style>
<style  lang="scss" rel="stylesheet/scss" scoped>
/*　input[placeholder], [placeholder], *[placeholder] { 
color:red !important; 
} 　*/

* {
    box-sizing: border-box;
}

.electricitych {
    .poundage {
        color: red;
        font-size: .7rem;
    }
    .maleall span {
        font-size: 14px;
        vertical-align: middle;
        width: auto;
        margin-left: -15px;
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
        line-height: 50px;
    }
    .telep {
        height: 45px;
        padding: 0 13px;
        background: #fff;
        p {
            height: 45px;
            input {
                width: 100%;
                height: 100%;
                border: 0;
                outline: 0;
                color: #1bba9e;
                font-size: 18px;
            }
        }
    }

    .content {
        background: #fff;
        .form {
            .form-group {
                padding: 0 15px;
                height: 45px;
                border-top: 1px solid #ccc;
                display: -webkit-flex;
                /* Safari */
                display: flex;
                flex-flow: row;
                .form-help {
                    width: 80px;
                    height: 45px;
                    line-height: 45px;
                    text-align: left;
                }
                .form-controler {
                    flex: 1;
                    height: auto;
                    line-height: 45px;
                    float: left;
                    border: 0;
                    outline: 0;
                    text-align: left;
                    i {
                        font-size: 23px;
                        float: right;
                    }
                }
            }
        }
    }

    .popUp {
        width: 100%;
        background: #fff;
        .title {
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid #f3f5f7;
            padding: 0 15px;
            .left {
                float: left;
            }
            .right {
                float: right;
                color: #1bba9e;
            }
        }
    }
    .integral {
        height: 45px;
        line-height: 45px;
        padding: 0 13px;
        div {
            float: left;
            b {
                color: #lelele;
                font-size: 16px;
                font-weight: noraml;
            }
            span {
                color: #lelele;
                font-size: 12px;
            }
        }
    }
    .subtotal {
        height: 40px;
        line-height: 40px;
        padding: 0 13px;
        border-bottom: 1px solid #ccc;
        margin: 0;
        span:first-child {
            color: #lelele;
            font-size: 16px;
            float: left;
        }
        span:last-child {
            color: 12px;
            color: #lelele;
            float: right;
        }
    }
    #isSubtotal {
        background: #FFF;
    }
    .m-footer {
        width: 100%;
        background: #fff;
        position: fixed;
        bottom: 0;


        .amount.disableds {
            button {
                background: #ccc;
            }
        }
        .amount {
            height: 50px;
            line-height: 50px;
            padding: 0 0 0 13px;
            margin-bottom: 0;
            box-sizing: border-box;
            span {
                color: #333;
                font-size: 16px;
                float: left;
            }
            button {
                width: 105px;
                height: 40px;
                color: #fff;
                font-size: 16px;
                background: #ff951b;
                border: 0;
                border-radius: 3px;
                margin-top: 9px;
                margin-bottom: 9px;
                margin-right: 9px;
                float: right;
            }
        }
    }
}

.electricitywei {
    .telep {
        height: 45px;
        padding: 0 13px;
        background: #fff;
        p {
            height: 45px;
            input {
                width: 100%;
                height: 100%;
                border: 0;
                outline: 0;
                color: #1bba9e;
                font-size: 18px;
            }
        }
    }

    .content {
        background: #fff;
        .form {
            .form-group {
                padding: 0 15px;
                height: 45px;
                border-top: 1px solid #ccc;
                display: -webkit-flex;
                /* Safari */
                display: flex;
                flex-flow: row;
                .form-help {
                    order: 2;
                    width: 80px;
                    height: 45px;
                    line-height: 45px;
                    text-align: right;
                }

                .form-controler {
                    flex: 1;
                    height: 45px;
                    line-height: 45px;
                    float: left;
                    border: 0;
                    outline: 0;
                    text-align: right;
                    i {
                        font-size: 23px;
                        float: left;
                    }
                }
            }
        }
    }

    .popUp {
        width: 100%;
        background: #fff;
        .title {
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid #f3f5f7;
            padding: 0 15px;
            .left {
                float: right;
            }
            .right {
                float: left;
                color: #1bba9e;
            }
        }
    }

    .m-footer {
        width: 100%;
        background: #fff;
        position: fixed;
        bottom: 0;
        .subtotal {
            height: 40px;
            line-height: 40px;
            padding: 0 13px;
            border-bottom: 1px solid #ccc;
            margin: 0;
            span:first-child {
                color: #lelele;
                font-size: 16px;
                float: right;
            }
            span:last-child {
                color: 12px;
                color: #lelele;
                float: left;
            }
        }
        .integral {
            height: 45px;
            line-height: 45px;
            padding: 0 13px;
            div {
                float: right;
                b {
                    color: #lelele;
                    font-size: 16px;
                    font-weight: noraml;
                    float: right;
                }
                span {
                    color: #lelele;
                    font-size: 12px;
                }
            }
        }
        .amount {
            height: 50px;
            line-height: 50px;
            padding: 0 0 0 13px;
            margin-bottom: 0;
            box-sizing: border-box;
            span {
                color: #333;
                font-size: 16px;
                float: left;
            }
            button {
                width: 105px;
                height: 40px;
                color: #fff;
                font-size: 16px;
                background: #ff951b;
                border: 0;
                border-radius: 3px;
                margin-top: 9px;
                float: right;
            }
        }
    }
}
</style>