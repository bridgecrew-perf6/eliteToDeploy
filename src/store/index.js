import Vue from 'vue'
import Vuex from 'vuex'
import CalendarService from "../components/service/CalendarService";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMobile: false,
        isAdmin: false,
        allEvents: [],
        rules: {
            minTwoChar: v => (v && v.length >= 2) || "Minimum 2 caractères",
            required: value => !!value || 'champs obligatoire !',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Entrez une adresse mail valide'
            },
            phone: value => value && value.length === 10 || 'Le numéro de téléphone doit être composé de 10 chiffres',
        }
    },

    mutations: {
        setIsMobile (state, isMobile) {
            state.isMobile = isMobile
        },
        setIsAdmin (state, isAdmin) {
            state.isAdmin = isAdmin
        },
        setAllEvents (state, allEvents) {
            state.allEvents = allEvents
        }
    },

    actions: {
        getIsMobile: function ({commit}, isMobileBool) {
            commit('setIsMobile', isMobileBool)
        },
        getIsAdmin: function ({commit}, isAdminBool) {
            commit('setIsAdmin', isAdminBool)
        },
        getAllEvents ({commit}) {
            return CalendarService.getAllAppointments()
                .then(
                response => {
                    commit('setAllEvents', response.data)
                }
            )
                .catch((error) => {
                console.log(error)
            })
        }
    },

    getters: {
        isMobile: state => {return state.isMobile},
        isAdmin: state => {return state.isAdmin},
        allEvents: state => {return state.allEvents},
        rules: state => {return state.rules}
    }
})