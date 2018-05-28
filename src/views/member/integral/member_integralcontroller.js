import cTitle from 'components/title';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      integral: 100,
      mydata: []


    };
  },

  methods: {

    getIntegralInfo()
    {
      //finance.point-summary 
      var that = this; 
      $http.get('finance.point-summary',{}, '正在获取...').then(function (response) {

				if (response.result == 1) {
        
			    that.mydata = response.data.list;
          that.integral = response.data.point_total;

				}
			}, function (response) {
				// error callback
			});
    }

  },
  activated () {
    this.toi = this.fun.getKeyByI();
    this.getIntegralInfo();
    
  },
  components: { cTitle }
}