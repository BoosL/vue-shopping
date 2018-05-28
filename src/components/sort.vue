<template>
	<el-row id='sort'>
		<el-col :span="8">
			<div class="grid-content" :class="{active:sort.tab==1,up:sort.up==1,down:sort.down==1}" @click='toggle($event,1)'>评价</div>
		</el-col>
		<el-col :span="8">
			<div class="grid-content" :class="{active:sort.tab==2,up:sort.up==2,down:sort.down==2}" @click='toggle($event,2)'>销量</div>
		</el-col>
		<el-col :span="8">
			<div class="grid-content" :class="{active:sort.tab==3,up:sort.up==3,down:sort.down==3}" @click='toggle($event,3)'>价格</div>
		</el-col>

	</el-row>
</template>

<script>
	import { mapState,mapMutations } from 'vuex';
	export default {
		props: ['text', 'hide'],
		data() {
			return {
				sort: { up: false, dows: false, tab: 0 }
			}
		},
		computed: {
			classObject() {
				return {
					active: this.isActive && !this.error,
					'text-danger': this.error && this.error.type === 'fatal',
				}
			}
		},

		methods: {
			...mapMutations(['views']),
			toggle(event, n) {
				this.sort.up = n;
				let order_field = '';
				if(n==1) order_field = 'comment_num';
				if(n==2) order_field = 'show_sales';
				if(n==3) order_field = 'price';
				if(event.target.className == 'grid-content up') {
					event.target.className = 'grid-content down';
					this.$emit('sortIn',{order_field,order_by:'asc'})
				} else {
					event.target.className = 'grid-content up';
					this.$emit('sortIn',{order_field,order_by:'desc'})
				}

			}
		},
		activated(){
			this.sort.up = false;
			this.sort.down = false;
		},
		computed: mapState(["view"])
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#sort {
		background: #FFF;
		line-height: 36px;
		border-bottom: solid 1px #d9d9d9;
		font-size: 12px;
		color: #333;
		.grid-content.up:after {
			background-position: -170px -15px;
		}
		.grid-content.down:after {
			background-position: -170px 0;
		}
		.grid-content.up,
		.grid-content.down {
			color: #f15353
		}
		.grid-content:after {
			content: "";
			display: inline-block;
			width: 8px;
			height: 10px;
			background: url(../assets/images/jd-sprites.png) no-repeat;
			background-size: 200px 200px;
			background-position: -170px -30px;
			margin-left: 4px;
		}
		i{color: #555;}
	}
</style>