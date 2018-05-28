import cTitle from 'components/title';

  export default {
    data() {
      return {
        toi: this.fun.getKeyByI(),
      	value:''
      }
      },
    methods:{
      Reply()
      {
         
        this.$router.push(this.fun.getUrl('replyEvaluate'));
      }

    },
    activated () {
      this.toi =  this.fun.getKeyByI();
    },
    components: { cTitle }
  }