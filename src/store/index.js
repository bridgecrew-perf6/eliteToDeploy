import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMobile: false,
    },
    mutations: {
        setIsMobile (state, isMobile) {
            state.isMobile = isMobile
        }
    },
    actions: {
        getIsMobile: function ({commit}, isMobileBool) {
            commit('setIsMobile', isMobileBool)
        }
    },
    getters: {
        isMobile: state => {return state.isMobile}
    }
})