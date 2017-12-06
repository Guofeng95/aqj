import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		loginis:false,
	},
	getters:{
		loginnow(state){
			return state.loginis
		}
	}

});
export default store
