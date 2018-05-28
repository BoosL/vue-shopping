import umphpCom from './umphp.vue';
const umphp ={
	install:function(Vue){
		alert(1);
		Vue.component('umphp',umphpCom)
	}
};
export default umphp
