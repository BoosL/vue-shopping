<template>
	<div id="myrelationship">
		<c-title :hide="false" text='我的关系'></c-title>
		<div class="relation-people">
			<h3 class="h3">我的推荐人</h3>
		</div>
		<div class="relation-people-info">
			<div class="relation-people-info-img">
				<img :src="myReferral.avatar">
			</div>
			<div class="relation-people-information">
				<!-- <p>{{item.nickname}}</p>
				<p>会员id：{{uid}}</p> -->
				<p>昵称:{{myReferral.nickname}}</p>
				<p>会员ID:{{myReferral.uid}}</p>
			</div>
		</div>
		<div class="relation-people-row">
			<h3>角色:{{myReferral.role}}</h3>
		</div>
		<div style="height:10px;"></div>
		<div class="relation-people-amount">
			<span>我推荐的人({{total}})</span>
			<a href="javascript:;" @click="openPop()">筛选</a>
		</div>
		<div style="height:10px;"></div>

		<div id="tabs">
					
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane :label="level1.level+'('+level1.total+'人)'" name="first" v-if="level1&&level1.is_show">
						<div v-for=" (item,index) in first_content">
							<div class="tbs" @click='toggle($event,index)'>
								<div class="li1"><img :src="item.avatar" /></div>
								<div class="li2">
									<p>昵称:{{item.nickname}}[id:{{item.id}}]</p>
									<p>金额:{{item.order_price}}</p>
									
								</div>
								<div class="li4">
										<i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
									</div>
							</div>
							<transition name="fade">
								<div class="tbs3" v-show='sort==index'>
									<div class="left">粉丝数量：{{item.agent_total}}</div>
									<div class="right">粉丝订单金额：{{item.agent_order_price}}元</div>
									<div class="left1">推广角色：{{item.role}}</div>
								</div>
							</transition>
						</div>

            <!-- <button @click="getData()" v-if="btnShow1">加载更多</button> -->
            <!-- <div class="more">
                <yd-button size="large" type="danger" @click.native="getData" v-if="btnShow1">加载更多</yd-button>
            </div> -->
             <yd-button-group style="width:100%;padding:0px;">
        <yd-button size="large" type="hollow" @click.native="getData" v-if="btnShow1" class="more-btn">加载更多</yd-button>
    </yd-button-group>

           
						<!-- v-if="level2&&level2.is_show" -->
					</el-tab-pane>
					<el-tab-pane :label="level2.level+'('+level2.total+'人)'" name="second" v-if="level2&&level2.is_show">
						<div v-for=" (item,index) in second_content">
							<div class="tbs" @click='toggle($event,index)'>
								<div class="li1"><img :src="item.avatar" /></div>
								<div class="li2">
									<p>昵称:{{item.nickname}}[id:{{item.id}}]</p>
									<p>金额:{{item.order_price}}</p>
									
								</div>
								<div class="li4">
										<i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
									</div>
							</div>
							<transition name="fade">
								<div class="tbs3" v-show='sort==index'>
									<div class="left">粉丝数量：{{item.agent_total}}</div>
									<div class="right">粉丝订单金额：{{item.agent_order_price}}元</div>
									<div class="left1">推广角色：{{item.role}}</div>
								</div>
							</transition>
              
						</div>

            <!-- <button @click="getData" v-if="btnShow2">加载更多</button> -->
            <!-- <yd-button size="large" type="danger" @click.native="getData" v-if="btnShow2">加载更多</yd-button> -->
             <yd-button-group style="width:100%;padding:0px;">
        <yd-button size="large" type="hollow" @click.native="getData" v-if="btnShow2" class="more-btn">加载更多</yd-button>
    </yd-button-group>
					</el-tab-pane>
					<el-tab-pane :label="level3.level+'('+level3.total+'人)'" name="third" v-if="level3&&level3.is_show">
						<div v-for=" (item,index) in third_content">
							<div class="tbs" @click='toggle($event,index)'>
								<div class="li1"><img :src="item.avatar" /></div>
								<div class="li2">
									<p>昵称:{{item.nickname}}[id:{{item.id}}]</p>
									<p>金额:{{item.order_price}}</p>
									
								</div>
								<div class="li4">
										<i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
									</div>
							</div>
							<transition name="fade">
								<div class="tbs3" v-show='sort==index'>
									<div class="left">粉丝数量：{{item.agent_total}}</div>
									<div class="right">粉丝订单金额：{{item.agent_order_price}}元</div>
									<div class="left1">推广角色：{{item.role}}</div>
								</div>
							</transition>
						</div>

            <!-- <button @click="getData" v-if="btnShow3">加载更多</button> -->
            <yd-button-group style="width:100%;padding:0px;">
        <yd-button size="large" type="hollow" @click.native="getData" v-if="btnShow3" class="more-btn">加载更多</yd-button>
    </yd-button-group>
            <!-- <yd-button size="large" type="danger" @click.native="getData()" v-if="btnShow3">加载更多</yd-button> -->
					</el-tab-pane>
				</el-tabs>
			</div>
	
		<yd-popup v-model="show2" position="bottom" height="60%">
			<div class="relation-popup">
				<div class="relation-popup-con">
					<h3>角色</h3>
					<ul>
						<li :class="{'active':filterSort==index,'':filterSort!=index}" v-for="(item,index) in filterData" @click="filterDataHandle(item,index)">{{item.role}}</li>
					</ul>
				</div>
				<hr style="clear:both;">
				<div style="clear:both;" class="relation-popup-lever" v-if="filterLevelData.length>0">
					<h3>等级</h3>
					<ul>
						<li :class="{'active':filterLeveSort==index,'':filterLeveSort!=index}" v-for="(levelItem,index) in filterLevelData" @click="filterLevelDataHandle(levelItem,index)">{{levelItem.level_name}}</li>
					</ul>
				</div>
        <yd-button-group style=" margin-left: 20px; margin-right: 20px;">
        <yd-button size="large" type="danger" @click.native="filterGetData">确定</yd-button>
    </yd-button-group>
			</div>
           
        </yd-popup>

	</div>
</template>
<script>
import my_relationship_v2_controller from "./my_relationship_v2_controller";
export default my_relationship_v2_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#myrelationship {
  width: 100%;
  height: 100%;
  .relation-people {
    margin-top: 40px;
    h3 {
      color: #666;
      font-size: 0.8rem;

      margin: 0;
      padding: 10px;
      text-align: left;
      font-weight: normal;
      background: #fff;
    }
  }

  .relation-people-info {
    padding: 10px;
    float: left;
    width: 100%;
    .relation-people-info-img {
      width: 50px;
      height: 50px;
      // margin-top:10px;
      // margin-left:10px;
      float: left;
      line-height: 50px;
      background: #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .relation-people-information {
      float: left;
      height: 50px;
      p {
        margin: 7px;
      }
    }
  }

  .relation-people-row {
    background: #fff;
    clear: both;
    h3 {
      color: #666;
      font-size: 0.8rem;
      margin: 0;
      padding: 10px;
      text-align: left;
      font-weight: normal;
      background: #fff;
    }
  }

  .relation-people-amount {
    background: #fff;
    height: 37px;
    line-height: 37px;
    span {
      color: #666;
      font-size: 0.8rem;
      padding-left: 10px;
      text-align: left;
      font-weight: normal;
      float: left;
    }

    a {
      float: right;
      margin-right: 3%;
    }
  }

  a {
    float: right;
    margin-right: 3%;
  }
}

.tbs2 {
  background: #f5f5f5;
  align-items: center;
  border-bottom: #e8e8e8 1px solid;
  padding: 0 10px;
  .left {
    width: 46%;
    text-align: left;
    height: 45px;
    display: inline-block;
    line-height: 45px;
    img {
      width: 30%;
    }
  }
  .right {
    width: 46%;
    display: inline-block;
    text-align: right;
  }
}
.tbs {
  align-items: center;
  background: #fff;

  border-bottom: #e8e8e8 1px solid;
  padding: 10px;
  float: left;
  width: 100%;
  background: #fff;
  .left {
    font-size: 0.8rem;
    box-sizing: border-box;
    width: 50%;
    text-align: left;
    height: 45px;
    line-height: 45px;
    float: left;
    img {
      width: 30%;
      float: left;
    }
  }
  .right {
    width: 50%;
    text-align: right;
  }
  a {
    color: #000;
  }
  .relation {
    color: #666;
  }
  .id,
  .level {
    font-size: 0.9rem;
    line-height: 45px;
  }
  .fa.fa-search {
    color: #999;
    font-size: 20px;
  }
  i {
    font-size: 24px;
  }
  .img {
    margin: 10px 0;
  }
  .li1 {
    width: 50px;
    height: 50px;
    // margin-top:10px;
    // margin-left:10px;
    float: left;
    line-height: 50px;
    background: #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .li2 {
    float: left;
    height: 50px;
    p {
      margin-top: 7px;
      margin-left: 7px;
      text-align: left;
    }
  }
  .li3 {
    flex: 30%;
    width: 30%;
    span {
      border: #b1a6a6 solid 1px;
      padding: 5px 20px;
      border-radius: 7px;
      display: none;
    }
  }
  .li4 {
    // flex: 5%;
    // width: 5%;
    float: right;
    height: 50px;
    line-height: 50px;
  }
}
.imgst {
  background: #f5f5f5;
}
.fade-enter-active {
  transition: 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  height: 0px;
}

.tbs3 {
  .left {
    width: 46%;
    text-align: left;
    height: 45px;
    display: inline-block;
    line-height: 45px;
    img {
      width: 30%;
    }
  }
  .right {
    width: 46%;
    display: inline-block;
    text-align: right;
    height: 45px;
    line-height: 45px;
  }
}

//弹窗
.relation-popup {
  overflow: auto;
  width: 100%;
}
.relation-popup-con {
  h3 {
    color: red;
    font-size: 0.8rem;
    margin: 0;
    padding: 5%;
    text-align: left;
    font-weight: normal;
    background: #fff;
  }

  ul {
    padding: 0 5% 0 5%;
    li {
      width: 30%;
      background: #E8E6E9;
      float: left;
      height: 30px;
      margin-right: 5%;
      margin-bottom: 10px;
      border-radius: 5px;
      line-height: 30px;
    }

    li:nth-of-type(3n) {
      margin-right: 0;
    }

    .active {
      border: 1px solid red;
      background: #fff;
    }
  }
}

.relation-popup-lever {
  clear: both;
  h3 {
    color: red;
    font-size: 0.8rem;
    margin: 0;
    padding: 5%;
    text-align: left;
    font-weight: normal;
    background: #fff;
  }

  ul {
    padding: 0 5% 0 5%;
    li {
      width: 30%;
      background :#E8E6E9;
      float: left;
      height: 30px;
      margin-right: 5%;
      margin-bottom: 10px;
      border-radius: 5px;
      line-height: 30px;
    }

    li:nth-of-type(3n) {
      margin-right: 0;
    }

    .active {
      border: 1px solid red;
      background: #fff;
    }
    // }

    // li:nth-child(1){
    // 	margin-right:5%;
    // }
  }
}
.tbs2 {
  background: #f5f5f5;
  align-items: center;
  border-bottom: #e8e8e8 1px solid;
  padding: 0 10px;
  .left {
    width: 46%;
    text-align: left;
    height: 45px;
    display: inline-block;
    line-height: 45px;
    img {
      width: 30%;
    }
  }
  .right {
    width: 46%;
    display: inline-block;
    text-align: right;
  }
}
.tbs {
  align-items: center;
  background: #fff;

  border-bottom: #e8e8e8 1px solid;
  padding: 10px;
  float: left;
  width: 100%;
  background: #fff;
  .left {
    font-size: 0.8rem;
    box-sizing: border-box;
    width: 50%;
    text-align: left;
    height: 45px;
    line-height: 45px;
    float: left;
    img {
      width: 30%;
      float: left;
    }
  }
  .right {
    width: 50%;
    text-align: right;
  }
  a {
    color: #000;
  }
  .relation {
    color: #666;
  }
  .id,
  .level {
    font-size: 0.9rem;
    line-height: 45px;
  }
  .fa.fa-search {
    color: #999;
    font-size: 20px;
  }
  i {
    font-size: 24px;
  }
  .img {
    margin: 10px 0;
  }
  .li1 {
    width: 50px;
    height: 50px;
    // margin-top:10px;
    // margin-left:10px;
    float: left;
    line-height: 50px;
    background: #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .li2 {
    float: left;
    height: 50px;
    p {
      margin-top: 7px;
      margin-left: 7px;
      text-align: left;
    }
  }
  .li3 {
    flex: 30%;
    width: 30%;
    span {
      border: #b1a6a6 solid 1px;
      padding: 5px 20px;
      border-radius: 7px;
      display: none;
    }
  }
  .li4 {
    // flex: 5%;
    // width: 5%;
    float: right;
    height: 50px;
    line-height: 50px;
  }
}
.tbs2 {
  padding: 10px 20px;
}
.imgst {
  background: #f5f5f5;
}
.fade-enter-active {
  transition: 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  height: 0px;
}

.tbs3 {
  .left {
    width: 46%;
    text-align: left;
    height: 45px;
    display: inline-block;
    line-height: 45px;
    img {
      width: 30%;
    }
  }
  .left1 {
    width: 100%;
    text-align: left;
    height: 45px;
    padding-left: 13px;
    display: inline-block;
    line-height: 45px;
    img {
      width: 30%;
    }
  }
  .right {
    width: 46%;
    display: inline-block;
    text-align: right;
    height: 45px;
    line-height: 45px;
  }

  
  
}
</style>