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
	var obj = {
		branch: 'https://m.360buyimg.com/mobilecms/s528x180_jfs/t3208/247/6270757246/214756/73dcfa1c/58a27dfdN602a0a22.png',
		category: [{
			catname: '裙装',
			catshop: [{ id: 2, name: "羽绒棉服佛殿灰", thumb: "https://m.360buyimg.com/mobile/s130x130_jfs/t4384/79/686427577/12080/704f7986/58b7f7e8N61c4f884.jpg" },
				{ id: 3, name: "棉服", thumb: "https://m.360buyimg.com/mobile/s100x100_jfs/t331/362/1515835677/3566/461716a8/543c8a67Ne129f018.jpg" },
				{ id: 4, name: "羽绒", thumb: "https://m.360buyimg.com/mobile/s100x100_jfs/t2893/176/1045856721/6331/21075b96/5732d235N90395e10.jpg" }
			]
		}, {
			catname: '裙装',
			catshop: [{ id: 2, name: "羽绒棉服", thumb: "https://m.360buyimg.com/mobile/s130x130_jfs/t4384/79/686427577/12080/704f7986/58b7f7e8N61c4f884.jpg" },
				{ id: 3, name: "羽绒沙鸥枯帮历随大流", thumb: "https://m.360buyimg.com/mobile/s130x130_jfs/t4066/54/467847264/15196/5b8aa181/58b39019N8e1dbc75.jpg" },
				{ id: 3, name: "棉服", thumb: "https://m.360buyimg.com/mobile/s130x130_jfs/t4066/54/467847264/15196/5b8aa181/58b39019N8e1dbc75.jpg" },
				{ id: 4, name: "羽绒沙鸥枯帮历随大流枯燥士大夫士大夫尔耳", thumb: "https://m.360buyimg.com/mobile/s100x100_jfs/t2893/176/1045856721/6331/21075b96/5732d235N90395e10.jpg" },
				{ id: 4, name: "羽绒沙鸥枯帮历随大流", thumb: "https://m.360buyimg.com/mobile/s100x100_jfs/t2893/176/1045856721/6331/21075b96/5732d235N90395e10.jpg" }
			]
		}, {
			catname: '裙装',
			catshop: [{ id: 2, name: "羽绒棉服", thumb: "https://m.360buyimg.com/mobile/s130x130_jfs/t4384/79/686427577/12080/704f7986/58b7f7e8N61c4f884.jpg" },
				{ id: 3, name: "棉服", thumb: "https://m.360buyimg.com/mobile/s100x100_jfs/t331/362/1515835677/3566/461716a8/543c8a67Ne129f018.jpg" },
				{ id: 4, name: "羽绒", thumb: "https://m.360buyimg.com/mobile/s130x130_jfs/t4066/54/467847264/15196/5b8aa181/58b39019N8e1dbc75.jpg" }
			]
		}]

	};
	var obj2 = {
		branch: 'https://m.360buyimg.com/mobilecms/s528x180_jfs/t4363/75/680194164/52298/54d0c634/58b7e3ebNe1f5f67b.jpg',
		category: [{
			catname: '裙装',
			catshop: [{ id: 2, name: "羽绒棉服佛殿灰", thumb: "https://m.360buyimg.com/mobile/s100x100_jfs/t2647/276/633288982/11637/e9bb1b7a/571dc6a8Nbd641f1b.jpg" },
				{ id: 3, name: "棉服", thumb: "https://m.360buyimg.com/mobile/s100x100_jfs/t331/362/1515835677/3566/461716a8/543c8a67Ne129f018.jpg" },
				{ id: 4, name: "羽绒", thumb: "https://m.360buyimg.com/mobile/s100x100_jfs/t2893/176/1045856721/6331/21075b96/5732d235N90395e10.jpg" }
			]
		}, {
			catname: '裙装',
			catshop: [{ id: 2, name: "羽绒棉服", thumb: "https://m.360buyimg.com/mobile/s130x130_jfs/t4384/79/686427577/12080/704f7986/58b7f7e8N61c4f884.jpg" },
				{ id: 3, name: "羽绒沙鸥枯帮历随大流", thumb: "https://m.360buyimg.com/mobile/s100x100_jfs/t913/290/173123020/11082/e3dd8c46/5507c2e4N78755364.jpg" },
				{ id: 3, name: "棉服", thumb: "https://m.360buyimg.com/mobile/s130x130_jfs/t4066/54/467847264/15196/5b8aa181/58b39019N8e1dbc75.jpg" },
				{ id: 4, name: "羽绒沙鸥枯帮历随大流枯燥士大夫士大夫尔耳", thumb: "https://m.360buyimg.com/mobile/s100x100_jfs/t2893/176/1045856721/6331/21075b96/5732d235N90395e10.jpg" },
				{ id: 4, name: "羽绒沙鸥枯帮历随大流", thumb: "https://m.360buyimg.com/mobile/s100x100_jfs/t2893/176/1045856721/6331/21075b96/5732d235N90395e10.jpg" }
			]
		}, {
			catname: '裙装',
			catshop: [{ id: 2, name: "羽绒棉服", thumb: "https://m.360buyimg.com/mobile/s130x130_jfs/t4384/79/686427577/12080/704f7986/58b7f7e8N61c4f884.jpg" },
				{ id: 3, name: "棉服", thumb: "https://m.360buyimg.com/mobile/s100x100_jfs/t331/362/1515835677/3566/461716a8/543c8a67Ne129f018.jpg" },
				{ id: 4, name: "羽绒", thumb: "https://m.360buyimg.com/mobile/s130x130_jfs/t4066/54/467847264/15196/5b8aa181/58b39019N8e1dbc75.jpg" }
			]
		}]

	};	
module.exports = {
  api: '/api/contentlist',
  response: function (req, res) {
		if(req.query.id==1){ res.send({"result": "1","msg": "成功","data":obj});}
		if(req.query.id==2){ res.send({"result": "1","msg": "成功","data":obj2});}
  }
};
