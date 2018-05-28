/**
 * Created by xiao on 17/05/26.
 */

import lifeService from '../views/member/service/language/chinese/language';
//import lifeServiceE from '../views/member/service/language/english/language';
import lifeServiceW from '../views/member/service/language/wei/language';
import yzLang from '../language/cn/index';

export default {
	state: {
		chinese:true,
		languageService:lifeService, 
		language:yzLang,
		lang:'ch',
	},
	mutations: {
	
		chineseLang(state){
			state.lang = 'ch';
			sessionStorage.states=state.lang ;
			state.languageService=lifeService;
			sessionStorage.languageService=JSON.stringify(state.languageService);
			
		},
//		englishLang(state){
//			state.lang = 'en';
//			sessionStorage.states=state.lang;
//			state.language=lifeServiceE;
//			sessionStorage.language=JSON.stringify(state.language);
//			
//		},
		weiLang(state){
			state.lang = 'wei';
			sessionStorage.states=state.lang;
			state.languageService=lifeServiceW;
			sessionStorage.languageService=JSON.stringify(state.languageService);
			
		},
		onload(state){
            if(sessionStorage.states && sessionStorage.language){
                state.language=sessionStorage.language;
                state.lang=sessionStorage.states;
            }else{
                state.language=yzLang;
                state.lang='ch';
            }
		},


		


	},
  	actions: {  },
  	getters: {  }	
		
  }
