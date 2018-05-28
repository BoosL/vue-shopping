/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */

module.exports = {
  api: '/etu/umphp',
  response: function (req, res) {
    res.send(
{
    "list": [
        {
            "id": 7
        },
        {
            "id": 8
        },
        {
            "id": 9
        },
        {
            "id": 0
        },
        {
            "id": 1
        },
        {
            "id": 6
        }
    ]
}
    );
  }
};
