/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */
var Mock = require('mockjs');
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-100': [{
        'id|+5': 1
    }]
});
var arr=[{ cart: '热门推荐', id: 0}, { cart: '品牌分类', id: 1}, { cart: '潮流女装',id: 2}, { cart: '潮流女装', id: 3}, { cart: '潮流女装', id: 4}, { cart: '潮流女装', id: 5}, { cart: '潮流女装', id: 6}, { cart: '潮流女装', id: 7}, { cart: '潮流女装',id: 8}, { cart: '潮流女装',id: 9}, { cart: '潮流女装', id: 10}, { cart: '潮流女装', id: 11}, { cart: '潮流女装', id:12}, { cart: '潮流女装', id: 13}, { cart: '潮流女装', id: 14 }];
module.exports = {
  api: '/api/category',
  response: function (req, res) {
    res.send(
	{
    "result": "1",
    "msg": "成功",
    "data":arr}
	
			
    );
  }
};
