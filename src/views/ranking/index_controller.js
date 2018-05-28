import cTitle from 'components/title';
export default {


  data() {
    return {
      //团队分红排行榜
      isTeamDividendShow: false,
      teamDividendTitle: "",
      teamDividendRankingLevel:"0",
      teamDividendRankingAction:"",
    }
  },

  activated() {
    this.getData();
  },

  mounted() {

  },
  methods: {

    goback() {
      this.$router.go(-1);
    },

    //获取设置信息
    getSetingInfo() {
      let that = this;
      let json = {};
      $http.get('', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.info_img = response.data.banner;
        } else {
          that.info_img = "";
        }

      }, function (response) {
        console.log(response)
      });
    },

    //获取排行榜数据
    getData() {
      let that = this;
      let json = {};
      $http.get('plugin.ranking.api.ranking.get-ranking-set', json, "").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.setTeamDividendInfo(response.data);//团队分红排行榜

        } else {

        }

      }, function (response) {
        console.log(response)
      });
    },


    //团队分红排行榜
    setTeamDividendInfo(data) {
      if (data.team_dividend == null || data.team_dividend == undefined || data.team_dividend == '') {
        this.isTeamDividendShow = false;
        return;
      }
      this.teamDividendRankingAction=data.team_dividend.ranking_level=="1"?data.team_dividend.ranking_info_class:data.team_dividend.ranking_list_class;
      this.teamDividendRankingLevel=data.team_dividend.ranking_level;
      this.isTeamDividendShow = data.team_dividend.is_ranking == "1" ? true : false;
      this.teamDividendTitle = data.team_dividend.ranking_name;
    },
  },
  components: { cTitle }
}