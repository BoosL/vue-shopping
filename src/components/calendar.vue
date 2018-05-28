<script>
export default {
	props: {
			//配置
			//是否为多选
			mult: {
				type: Boolean,
				default: true,
			},
			//最小日期间隔
			minInterval: {
				type: Number,
				default: 3,
			},
			//最大日期间隔
			maxInterval: {
				type: Number,
				default: 90,
			},
			//回调函数
			callback: {
				type: Function,
				default: Function,
			},
	},
	
	data() {
		var now = new Date();
		var y = now.getFullYear(),
			m = now.getMonth() + 1,
			d = now.getDate();
		//返回基本数据
		return {
			weeks: ['日', '一', '二', '三', '四', '五', '六'],
			//选择的日期
			sYear: y,
			sMonth: m,
			sDay: d,
			monthRange: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			yearRange: this.initYearRange(y),
			daysData: this.creatDate(y, m),
			msg: '',
			hideFlag: true,
			//日期段时的前后日期
			nYear: '',
			nMonth: '',
			nDay: '',
			pYear: '',
			pMonth: '',
			pDay: '',
		}
	},
	methods: {
		//初始化年的范围
		initYearRange: function(y, num) {
			var yearRange = [],
				num = parseInt(num) || 20;
			for (var i = -num; i < num; i++) {
				yearRange.push(y + i);
			}
			return yearRange;
		},
		//根据年月生成日历数据
		creatDate: function(year, month) {
			//一个月多少周和一周多少天
			var WEEK_NUM = 6,
				DAY_NUM = 7,
				//按日历格式放日历数据为一个对象
				daysData = {},
				showDate = new Date(year, month - 1),
				//日子标志
				daysFlag = 1 - showDate.getDay();
			for (var i = 0; i < WEEK_NUM; i++) {
				daysData[i] = [];
				for (var j = 0; j < DAY_NUM; j++) {
					daysData[i][j] = {};
					showDate = new Date(year, month - 1, daysFlag);
					//相等则直接添加
					if (showDate.getDate() == daysFlag) {
						daysData[i][j].day = daysFlag;
						daysData[i][j].active = true;
					} else {
						//判断5行还是6行，如果5行则退出循环
						if (i == 5 && j == 0 && showDate.getDate() < 9) {
							delete daysData[i];
							break;
						}
						//否则将标志转换为标准日期再添加
						daysData[i][j].day = showDate.getDate();
						daysData[i][j].active = false;
					}
					//更新日期
					daysFlag++;
				}
			}
			return daysData;
		},
		//格式化日期
		formatDate: function(y, month, day) {
			if (!y || !month || !day) {
				return '';
			}
			var m = month < 10 ? '0' + month : month,
				d = day < 10 ? '0' + day : day;
			return y + '-' + m + '-' + d;
		},
		//显示选择那一天
		showDate: function() {
			return this.formatDate(this.sYear, this.sMonth, this.sDay);
		},
		//更新日历数据
		update: function() {
			var day = new Date(this.sYear, this.sMonth, 0),
				lastDay = day.getDate();
			this.sDay = lastDay < this.sDay ? lastDay : this.sDay;
			this.daysData = this.creatDate(this.sYear, this.sMonth);
			this.msg = this.mult ? this.showInterval() : this.showDate();
		},
		//上一月日历数据
		preMonth: function() {
			if (this.sMonth == 1) {
				this.sMonth = 12;
				this.sYear--;
			} else {
				this.sMonth--;
			}
			this.update();
		},
		//下一月日历数据
		nextMonth: function() {
			if (this.sMonth == 12) {
				this.sMonth = 1;
				this.sYear++;
			} else {
				this.sMonth++;
			}
			this.update();
		},
		//选择日期
		chooseDay: function(dayObj) {
			if (!dayObj.active) {
				return;
			}
			this.sDay = dayObj.day;
			this.hideFlag = true;
			this.msg = this.showDate();
			alert("这是回调，你选择的是 " + this.showDate());
			this.callback && this.callback();
		},
		//显示与隐藏日历面板
		dispaly: function() {
			this.hideFlag = !this.hideFlag;
		},
		//选择一段日期
		chooseInterval: function(dayObj) {
			if (!dayObj.active) {
				return;
			}
			if (!this.pYear) {
				//第一次选择，记录好日期
				this.pYear = this.sYear;
				this.pMonth = this.sMonth;
				this.pDay = dayObj.day;
			} else if (this.pYear == this.sYear && this.pMonth == this.sMonth &&
				this.pDay == dayObj.day) {
				//重复选择则重置
				this.pYear = '';
				this.pMonth = '';
				this.pDay = '';
				this.nYear = '';
				this.nMonth = '';
				this.nDay = '';
			} else {
				//第二次选择
				this.nYear = this.sYear;
				this.nMonth = this.sMonth;
				this.nDay = dayObj.day;
			}
			this.msg = this.showInterval();
		},
		//显示一段日期
		showInterval: function() {
			var startDate = this.formatDate(this.pYear, this.pMonth, this.pDay),
				endDate = this.formatDate(this.nYear, this.nMonth, this.nDay);
			if (!startDate) {
				return "";
				//判断哪个大
			} else if (Date.parse(startDate) > Date.parse(endDate)) {
				return endDate + " 至 " + startDate;
			} else {
				return startDate + " 至 " + endDate;
			}
		},
		//确认选择的日期
		confirm: function() {
			if (!this.pYear || !this.nYear) {
				alert('请选择日期');
				return;
			} else {
				//相减，确认日期在范围内
				var startDate = this.formatDate(this.pYear, this.pMonth, this.pDay),
					endDate = this.formatDate(this.nYear, this.nMonth, this.nDay),
					diff = Math.abs((Date.parse(startDate) - Date.parse(endDate)) / (24 * 60 * 60 * 1000));
				if (diff < this.minInterval || diff > this.maxInterval) {
					alert("请选择不小于" + this.minInterval + "天 并且 不大于" + this.maxInterval + "天 的时间间隔");
					return;
				}
				this.hideFlag = true;
				alert("这是回调，你选择的是 " + this.showInterval());
				this.callback && this.callback();
			}
		},
		//取消
		cancel: function() {
			this.msg = '';
			this.pYear = '';
			this.pMonth = '';
			this.pDay = '';
			this.nYear = '';
			this.nMonth = '';
			this.nDay = '';
			this.hideFlag = !this.hideFlag;
		}
	},
}
</script>

<template>
	<div class="calendar-box">
		<p v-if='mult'>这是选择日期段的</p>
		<p v-else>这是选择日期的</p>
		<input type="text" v-model='msg' @click='dispaly'>
		<div :class="{'date-hide' : hideFlag}">
			<div class="month-box">
				<span class="pre-month" @click='preMonth'></span>
				<select name="year" id="year" v-model='sYear' @change='update'>
					<option v-for='y in yearRange' :value='y'>{{y}} 年</option>
				</select>
				<select name="month" id="month" v-model='sMonth' @change='update'>
					<option v-for='m in monthRange' :value='m'>{{m}} 月</option>
				</select>
				<span class="next-month" @click='nextMonth'></span>
			</div>
			<table class="date-box">
				<thead>
					<tr>
						<th v-for='weekName in weeks' track-by="$index"
					:class="{'red' : $index == 0 || $index == 6}">{{weekName}}</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="mult">
						<tr v-for='week in daysData'>
							<td v-for='dayObj in week' 
							:class="[dayObj.active ? 'active-date':'unactive-date',
								{'choose-date' : dayObj.active && 
												((dayObj.day == pDay && pMonth == sMonth && pYear == sYear) ||
												(dayObj.day == nDay && nMonth == sMonth && nYear == sYear)),
								'red' : dayObj.active && ($index == 0 || $index == 6) && 
										dayObj.day != pDay && dayObj.day != nDay}]"
								@click="chooseInterval(dayObj)">{{dayObj.day}}</td>
						</tr>
					</template>
					<template v-else >
						<tr v-for='week in daysData'>
							<td v-for='dayObj in week' 
							:class="[dayObj.active ? 'active-date':'unactive-date',
								{'choose-date' : dayObj.day == sDay && dayObj.active,
								'red' : ($index == 0 || $index == 6) && dayObj.day != sDay && dayObj.active}]"
							@click="chooseDay(dayObj)">{{dayObj.day}}</td>
						</tr>
					</template>
				</tbody>
			</table>
			<div class="confirm-box" v-if='mult'>
				<button @click='confirm'>确认</button>
				<button @click='cancel'>取消</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
	.calendar-box{
		font-family: "Microsoft Yahei";float: left;width: 350px;margin:0 0px;}
	.month-box{	text-align: center;background-color: #c61b01;line-height: 40px;}
	.month-box span{line-height: 40px;	cursor: pointer;}
	.month-box select{cursor: pointer;color: #fff;margin:0 5px;font-family: "Microsoft Yahei";outline: none;
		font-size: 16px;background-color: transparent;border: 0;appearance: none;-moz-appearance: none;-webkit-appearance: none;}
	.month-box select:hover{color: #000;}
	.date-box{padding: 0 10px;width: 100%;text-align: center;border: 2px solid #ccc;border-top: 0;}
	.date-box th,.date-box td{width: 40px;height: 45px;}
	.active-date{cursor: pointer;}
	.active-date:hover{	color: #fff;background-color: #c61b01;}
	.choose-date{color: #fff;background-color: #c61b01;}
	.unactive-date{color: #ccc;}
	.red{color: #c61b01;}
	.next-month{margin:12px 10px 0 0;border-top:8px solid transparent;border-bottom:8px solid transparent;border-left:12px solid #fff;float: right;	}
	.pre-month{margin:12px 0 0 10px;border-top:8px solid transparent;border-bottom:8px solid transparent;border-right:12px solid #fff;float: left;}
	.date-hide{display: none;}
	.confirm-box{text-align: center;}
	.confirm-box button{padding: 5px 25px;margin:10px 20px;	}
</style>