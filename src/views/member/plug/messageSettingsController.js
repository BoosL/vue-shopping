import { Switch } from 'mint-ui';
import cTitle from 'components/title';
  export default {
		data() {
		return {
			  toi:window.localStorage.i,
				value:false
			}
		},
    methods:{
		switchItme()
		{
			console.log(this.value);

		}


    },
    components: { cTitle }
  }