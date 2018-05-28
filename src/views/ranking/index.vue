<template xmlns="http://www.w3.org/1999/html">
	<div id="income">
		<c-title :hide="true" text='排行榜'></c-title>

		<!--<c-myextension v-if="!is_agent"></c-myextension>-->

		<div class="myextension">
			<div class="banner">
				<img :src="info_img" v-if="!(info_img=='' ||info_img==undefined||info_img==null)">

				<img src="../../assets/images/myextension.png" v-if="(info_img=='' ||info_img==undefined||info_img==null)">
			</div>
		</div>

		<div>
			<h4>排行榜
				<span id="pricerg">
				<font color="red"></font></span>
			</h4>
			<template>
				<yd-grids-group :rows="2">
					<yd-grids-item :link="fun.getUrl((teamDividendRankingLevel=='1'?'rankingListFirst':'rankingListSecond'),{'action':teamDividendRankingAction,'title':teamDividendTitle})" v-if="isTeamDividendShow">
						<yd-icon slot="icon" name="fenxiao" custom size="24px" color="#FF685D"></yd-icon>
						<span slot="text">{{teamDividendTitle}}
							<font></font></span>
					</yd-grids-item>
				</yd-grids-group>
			</template>
		</div>
		<div style="height:60px"></div>
	</div>
</template>
<script>
import index_controller from "./index_controller";
export default index_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#income {
  .header {
    height: auto;
    background: #f15353;
    background-size: 100% 100%;
    padding: 10px;
    position: relative;
  }
  .header .user {
    height: 120px;
    text-align: center;
  }
  .header .user .user-head {
    box-sizing: content-box;
    height: 48px;
    width: 48px;
    background: #fff;
    border-radius: 50%;
    border: 2px solid #fff;
    margin: 6px auto;
  }
  .header .user .user-head img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
  }
  .header .user .user-info {
    height: 48px;
    width: 100%;
    float: left;
    color: #fff;
  }
  .header .user .user-info .user-name {
    height: 24px;
    width: auto;
    font-size: 0.8rem;
    line-height: 20px;
  }
  .header .user .user-info .user-other {
    height: 20px;
    width: auto;
    font-size: 0.8rem;
    opacity: 0.8;
  }
  .header .user-gold {
    height: 35px;
    width: 94%;
    padding: 5px 3%;
    border-bottom: 1px solid #e3e3e3;
    background: #fff;
    font-size: 0.8rem;
    line-height: 35px;
  }
  .header .user-gold .title {
    height: 35px;
    width: auto;
    float: left;
    color: #666;
  }
  .header .user-gold .num {
    height: 35px;
    width: auto;
    float: left;
    color: #f90;
  }
  .header .user-gold .draw {
    width: 80px;
    height: 30px;
    background: #6c9;
    float: right;
  }
  .header .user .set {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
    font-size: 0.9rem;
  }
  .header .user-op {
    height: 35px;
    width: 94%;
    padding: 5px 3%;
    border-bottom: 1px solid #e3e3e3;
    background: #fff;
    font-size: 0.8rem;
    line-height: 35px;
  }
  h3 {
    background: #fff;
    margin: 10px 0 0;

    font-weight: normal;

    font-size: 0.9rem;

    height: 2.5rem;
    box-sizing: border-box;

    line-height: 2.5rem;
    color: #f15353;
    border-bottom: 1px solid #ddd;

    span {
      color: #999;
    }
  }
  h4 {
    background: #f5f5f5;
    text-align: left;
    font-weight: normal;
    font-size: 0.8rem;
    height: 2.3rem;
    box-sizing: border-box;
    line-height: 2.3rem;
    color: #333;
    border-bottom: 1px solid #eee;
    padding: 0 10px;
    span {
      color: #999;
    }
  }
  #gongge {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    column-count: 3;
    padding: 10px 0;
    margin-bottom: 10px;
    li {
      flex: 33%;
      padding: 0 10px;
      border: 1px solid #ccc;
      margin: 3px;
      border-radius: 5px;
      i {
        font-size: 34px;
        color: #eb3943;
        margin: 10px 0;
      }
      a {
        color: #333;
        font-size: 0.9rem;
        img {
          width: 23px;
          margin: 5px 0;
        }
        font {
          color: #e84e40;
          font-size: 0.8rem;
          padding-top: 5px;
        }
      }
    }
  }
  #un-gongge {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    column-count: 3;
    padding: 10px 0;
    li {
      flex: 25%;
      padding: 0 10px;
      i {
        font-size: 34px;
        margin: 15px 0;
      }
      a {
        color: #333;
        font-size: 0.8rem;
        img {
          width: 23px;
          margin: 5px 0;
        }
        font {
          color: #e84e40;
          font-size: 0.8rem;
          padding-top: 5px;
        }
      }
    }
  }
  #pricerg {
    text-align: right;
    float: right;
  }
  .mszf {
    background: #fff;
    padding: 0 10px;
    margin: 0;
    text-align: left;
    overflow: hidden;
    margin-top: 10px;
    height: 44px;
    box-sizing: border-box;
    line-height: 44px;
    font-size: 0.857rem;
    color: #333;
    i {
      font-size: 17px;
      float: right;
      line-height: 44px;
      color: #999;
    }
    span {
      float: left;
    }
    a {
      color: #000000;
      display: block;
    }
  }
}

a {
  text-decoration: none;
  color: #222;
}

input {
  border-width: 0;
}

.myextension .banner img {
  width: 100%;
}

.myextension .main {
  position: relative;
  top: -4px;
}

.welcome {
  padding: 10px;
  background: #ffffff;
  .text {
    p {
      font-size: 0.8rem;
      color: #666;
      line-height: 1.2rem;
      span {
        color: #f55955;
      }
    }
  }
  .info {
    margin-top: 10px;
    input {
      display: block;
      margin-bottom: 8px;
      width: 100%;
      height: 2rem;
      border-radius: 5px;
      padding: 0 5px;
      box-sizing: border-box;
      outline: none;
    }

    .inp {
      border: 1px solid #b8b8b8;
    }
    .inp:focus {
      border-color: #f55955;
      box-sizing: border-box;
    }
    span {
      color: #f55955;
    }
    .btn {
      background: #f55955;
      color: #ffffff;
      margin-bottom: 8px;
      width: 100%;
      height: 2rem;
      border-radius: 5px;
      padding: 0 5px;
      box-sizing: border-box;
      text-align: center;
      font-size: 0.8rem;
      line-height: 2rem;
      i {
        display: inline-block;
      }
    }
    .btn:focus {
      background: #d8403c;
    }
  }
}

.myextension .main .vip_main {
  background: #ffffff;
  margin: 15px 0;
  .title {
    padding: 10px;
    font-size: 0.8rem;
    border-bottom: 1px solid #eeeeee;
    text-align: center;
  }
  .vip {
    padding: 15px 10px;
    overflow: hidden;
    font-size: 0.8rem;
    color: #999;
    .ico1,
    .ico2 {
      width: 15%;
      float: left;
    }
    .ico1 {
      i {
        background: #32cd32;
      }
    }
    .ico2 {
      i {
        background: #fece00;
      }
    }
    .text {
      float: left;
      width: 85%;
      .t1 {
        font-size: 0.95rem;
        color: #333;
        margin-bottom: 5px;
        text-align: left;
      }
      .t2 {
        text-align: justify;
      }
    }
    i {
      background: #32cd32;
      height: 36px;
      width: 36px;
      border-radius: 18px;
      color: #fff;
      text-align: center;
      line-height: 38px;
      font-size: 1.2rem;
    }
  }
  .vip1 {
    border-bottom: 1px solid #eeeeee;
  }
}

.myextension .success {
  height: 200px;
  padding-top: 65px;
  background: #ffffff;
  .ico {
    height: 65px;
    width: 65px;
    margin: auto;
    border: 3px solid #32cd32;
    border-radius: 4rem;
    color: #32cd32;
    font-size: 2.3rem;
    text-align: center;
    line-height: 4rem;
  }
  .text {
    height: 2rem;
    margin-top: 30px;
    color: #666;
    line-height: 1.6rem;
    text-align: center;
  }
  a .sub {
    height: 2rem;
    width: 80%;
    background: #f55955;
    margin: 20px auto;
    border-radius: 2rem;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
  a .sub:focus {
    background: #d8403c;
  }
}
</style>
