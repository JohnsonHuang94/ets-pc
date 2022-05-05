import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state(){
        return {
            userInfo: {
                name: '王麻子'
            }
        }
    },
    mutations: {
        changeUserInfo(state, payload){
            state.userInfo = payload
        }
    },
    getters: {},
    actions: {},
    modules: {}
})

export default store