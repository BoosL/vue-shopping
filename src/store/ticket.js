/**
 * Created by zhong on 16/10/15.
 */

export default {
	state: {//true
		readonly:'请选择',
		readonlyto:'请选择',
		dates:'请选择',
		datesto:'请选择'

	},
	mutations: {
		changes(state)
		{
			let vars = state.readonly;
			state.readonly = state.readonlyto;
			state.readonlyto = vars;		
		}
	},
  	actions: {  },
  	getters: {  }	
		
  }
   
	
	

