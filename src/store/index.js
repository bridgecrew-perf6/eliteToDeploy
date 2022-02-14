import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMobile: false,
        isAdmin: false,
    },
    // plugins: [createPersistedState({
    //     paths: ['isAdmin']
    // })
    // ],
    mutations: {
        setIsMobile (state, isMobile) {
            state.isMobile = isMobile
        },
        setIsAdmin (state, isAdmin) {
            state.isAdmin = isAdmin
        }
    },
    actions: {
        getIsMobile: function ({commit}, isMobileBool) {
            commit('setIsMobile', isMobileBool)
        },
        getIsAdmin: function ({commit}, isAdminBool) {
            commit('setIsAdmin', isAdminBool)
        }
    },
    getters: {
        isMobile: state => {return state.isMobile},
        isAdmin: state => {return state.isAdmin}
    }
})