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
module.exports = {
  api: '/addons/yun_shop/api*',
  response: function (req, res) {
    res.send(
			data
    );
  }
};
