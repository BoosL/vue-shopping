import cTitle from 'components/title';
export default {
    props: ['datas', 'order', 'dispatch'],



    data() {
        return {
            //counter: this.datas,
            a: {},
            b: {
                "result": 1,
                "msg": "成功",
                "data": {
                    "order": {
                        "price": 510,
                        "goods_price": 510,
                        "dispatch_price": 0,
                        "discount_price": 0,
                        "order_goods": [
                            {
                                "goods_id": 1,
                                "goods_sn": "",
                                "price": 410,
                                "total": 1,
                                "title": "2016秋冬季新款韩版短款宽松翻领拼色呢子大衣潮羊羔毛呢外套女",
                                "thumb": "",
                                "coupon_discount_price": null
                            },
                            {
                                "goods_id": 2,
                                "goods_sn": "",
                                "price": 100,
                                "total": 1,
                                "title": "2017春季新款T恤",
                                "thumb": "",
                                "coupon_discount_price": null
                            }
                        ]
                    },
                    "dispatch": {
                        "default_member_address": {
                            "dispatch_type_id": 1,
                            "address": "默认地址(死值)",
                            "mobile": "18545571024",
                            "realname": "默认姓名(死值)"
                        }
                    }
                }
            }
        }
    },


    created () {
       this.a=this.datas;
       console.log(this.datas);

    },
    mounted() {


    },


    methods: {
        
    },
    components: { cTitle }
}