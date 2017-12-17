import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		loginis:false,
		userurl:'',
		userstatus:"未认证"
	},
	getters:{
		loginnow(state){
			return state.loginis
		},
		urlnow(state){
			return state.userurl
		},
		statusnow(state){
			return state.userstatus
		},

	}

});
export default store
