import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			toi: this.fun.getKeyByI(),
			display: 0,
			value: 3,
			iscomment: true,
			order_id: '',
			goods_id: '',
			level: 5,
			order: '',
			comments: [], //评论内容
			disabled: [],
			btn_class:[],
			btn_css: 'mod_btn bg_2',
			has_many_order_goods:[]

		};
	},
	methods: {
		getStar(value) {
			console.log(value);
		},
		goEvaluate(event, n) {
			if (event.target.childNodes[1].className == 'fa fa-angle-down') {
				this.display = 99999;
			} else {
				this.display = n;
			}
		},
		toComment(item,index) {
			if (this.comments[index].length == 0) {
				MessageBox({
					title: '提示',
					message: '您还没有输入相关的评论内容',
					showCancelButton: true
				}).then(action => {

					if (action == 'confirm') {

						this.submitData(item,index);

					} else {
						return;
					}

				});
			} else {
				this.submitData(item,index);

			}

		},
		//提交数据到服务器
		submitData(item,index) {
		   var that = this;
			//this.btn_class[index] = 'gray';
			 
			// e.target.disabled = true;
			//console.log(this.$route.params.brother);
			//var commentStr = [{ order_id: this.order.id }, { content: this.comment }, { level: this.level }, { goods_id: item.goods_id }];
				$http.get('goods.comment.create-comment', {
					order_id: this.order.id,
					goods_id: item.goods_id,
					content:this.comments[index],
					level: this.level,"i": this.fun.getKeyByI(), "type": this.fun.getTyep()
				},'正在评论..').then(function (response) {
					if (response.result == 1) {
						
						MessageBox.alert(response.msg, '提示');
						that.$set(that.disabled,index,true);

					} else {
						MessageBox.alert(response.msg, '提示');

					}

				}, function (response) {
					// error callback
				});

			


			// if (this.$route.params.from == 0) {
			//   this.$router.go('member');

			// } else {
			//   this.$route.params.brother.$emit("selected", "2");
			//   this.$router.go(-1);

			// }

		},
		initData()
	{
		this.order = this.$route.params.order;
		this.has_many_order_goods = this.$route.params.order.has_many_order_goods;
		for(var i = 0;i<this.has_many_order_goods.length;i++)
		{
			//初始化
			this.$set(this.comments,i,'');
			this.$set(this.btn_class,i,'mod_btn bg_2');
			this.$set(this.disabled,i,false);
			

		}
		console.log();

	}

	},
	mounted () {
		this.toi=this.fun.getKeyByI();
	},
	activated() {
		this.initData();
		this.toi=this.fun.getKeyByI();

		
		
		//console.log(this.$route.params.order);
	},
	components: { cTitle }
};