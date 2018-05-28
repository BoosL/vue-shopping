<template>
	<div id="all">
		<c-title :hide="false" text='活动签名'></c-title>
		<div style="height: 40px;"></div>
	</div>
</template>

<script>
import conferenceSign_controller from './conferenceSign_controller';
export default conferenceSign_controller;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/member.scss';

#tool ul li {
	width: 100% !important;
}

.title {

	flex: 2;
	background: #fff;
	height: 45px;
	line-height: 45px;
}

.info {
	height: 45px;
	flex: 8;
	width: vw;
	line-height: 45px;
	background: #fff;
}

.yd-cell-box {
	margin-bottom: 0px !important;
}

.yd-btn-block {
	margin-top: 3px;
}

.checkbox {
	background: #fff;
	padding-top: 10px;
	padding-bottom: 10px;
	border-bottom: 1px solid #ece9e9;
}
</style>
