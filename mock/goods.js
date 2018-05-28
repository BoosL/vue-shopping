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
var goods= {
    bonusmoney: "43.97",
    content: "<p style=\"margin-top: 0px; margin-bottom: 0px; white-space: normal; padding: 0px; list-style-type: none; font-family: 微软雅黑, 宋体, Arial, Helvetica, sans-serif; font-size: 20px; line-height: 36px; widows: 1;\"><span style=\"font-size: 18px;\">售后电话：18028696783</span></p><p style=\"margin-top: 0px; margin-bottom: 0px; white-space: normal; padding: 0px; list-style-type: none; font-family: 微软雅黑, 宋体, Arial, Helvetica, sans-serif; font-size: 20px; line-height: 36px; widows: 1;\"><span style=\"font-size: 18px;\">微信同步：18028696783</span></p><p style=\"margin-top: 0px; margin-bottom: 0px; white-space: normal; padding: 0px; list-style-type: none; font-family: 微软雅黑, 宋体, Arial, Helvetica, sans-serif; font-size: 20px; line-height: 36px; widows: 1;\"><br/></p><p style=\"margin-top: 0px; margin-bottom: 0px; white-space: normal; padding: 0px; list-style-type: none; font-family: 微软雅黑, 宋体, Arial, Helvetica, sans-serif; font-size: 20px; line-height: 36px; widows: 1;\"><span style=\"color: rgb(255, 0, 0); font-size: 18px;\">甘肃、西藏、内蒙古、港澳台，偏远地区不包邮</span></p><p style=\"margin-top: 0px; margin-bottom: 0px; white-space: normal; padding: 0px; list-style-type: none; font-family: 微软雅黑, 宋体, Arial, Helvetica, sans-serif; font-size: 20px; line-height: 36px; widows: 1;\"><span style=\"color: rgb(255, 0, 0); font-size: 18px;\">谢谢体谅</span></p><p><img src=\"http://www.heliaigou.com/attachment/images/0/2017/02/p84SprlbKSJ8R1SZBKlp0lpLrJJguz.jpg\" width=\"100%\" style=\"\"/><img src=\"http://www.heliaigou.com/attachment/images/0/2017/02/hAKBkKRKCRZyg6Y2UabzrKV6UbTA4b.jpg\" width=\"100%\"/></p><p><img src=\"http://www.heliaigou.com/attachment/images/0/2017/02/NJk2p8hJIy0v2jU9J3WWKkVK39wzy2.jpg\" width=\"100%\" style=\"\"/></p><p><img src=\"http://www.heliaigou.com/attachment/images/0/2017/02/JwJKkk6yMH7mY0eux04meX60MHJ7Y4.jpg\" width=\"100%\" style=\"\"/></p><p><img src=\"http://www.heliaigou.com/attachment/images/0/2017/02/ZYgyC1I7oICSuY8Sv3F71Uz3fs7iS1.jpg\" width=\"100%\" style=\"\"/></p><p><img src=\"http://www.heliaigou.com/attachment/images/0/2017/02/pyUjDlDD4zUcJo4lJDXbUJLB4yL1pB.jpg\" width=\"100%\" style=\"\"/></p><p><img src=\"http://www.heliaigou.com/attachment/images/0/2017/02/QT5i5IRmiJ519kK4GMrIkQMjg8lqlE.jpg\" width=\"100%\" style=\"\"/></p><p><img src=\"http://www.heliaigou.com/attachment/images/0/2017/02/g8t1XMTq1m68xrcg8NHuxHiGhzxUXI.jpg\" width=\"100%\" style=\"\"/></p><p><img src=\"http://www.heliaigou.com/attachment/images/0/2017/02/a109FNDY7bQ99vKpqkPBp76Nnpypp7.jpg\" width=\"100%\" style=\"\"/></p><p><img src=\"http://www.heliaigou.com/attachment/images/0/2017/02/IwY6wTyWTHtmlYxWOGjwJlw2gHHOMy.jpg\" width=\"100%\" style=\"\"/></p><p><img src=\"http://www.heliaigou.com/attachment/images/0/2017/02/ppcV33V5FMh0Ft114x3TAC1vOtuab1.jpg\" width=\"100%\" style=\"\"/></p><p><br/></p>",
    costprice: "75.00",
    createtime: "1488006226",
    credit: "879",
    current: 1488850195,
    deduct: "17.00",
    deduct2: "0.00",
    deductcommission: "0.00",
    discounttype: "1",
    discountway: "1",
    dispatch: "0",
    dispatchid: "9",
    dispatchtype: "1",
    displayorder: "39",
    edmoney: "0.00",
    ednum: "0",
    goods_balance: "0.00",
    goodssn: "765#",
    groupbuy: "1",
    id: "6394",
    love_money: "1.92",
    manydeduct: "0",
    marketprice: "139.00",
    maxbuy: "0",
    maxprice: "139.00",
    minprice: "139.00",
    pcate: "8",
    pcate1: "0",
    pcates: "437",
    productprice: "468.00",
    returntype: "1",
    tcate: "269",
    tcate1: "0",
    tcates: "679",
    tcates2: "",
    thumb: "http://www.heliaigou.com/attachment/images/0/2017/02/Rx97NC9q4DGg36Z9DgqCQQ4e676D2Q.jpg",
    timeend: "1488005820",
    timestart: "1488005820",
    title: "2017春夏新款日系修身小脚牛仔九分裤765#",
    total: "450",
    type: "1",
    uniacid: "4",
    unit: "件",
    userbuy: "1",
    viewcount: "4"
};
module.exports = {
  api: '/api/goods',
  response: function (req, res) {
    res.send(
	{
    "result": "1",
    "msg": "成功",
    "data":goods
	}
    );
  }
};
