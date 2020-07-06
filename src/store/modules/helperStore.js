const Helper = {
    namespaced: true,
    state: {
        NAVIGATION: false
    },
    getters: {
        GET_NAVIGATION: state => state.NAVIGATION
    },
    mutations: {
        SET_NAVIGATION(state, payload){
            state.NAVIGATION = payload
        }
    },
    actions: {
        ON_NAVIGATION({commit}, payload){
            if(payload){
                commit('SET_NAVIGATION', true)
            }else{
                commit('SET_NAVIGATION', false)
            }
        }
    }
}

export default Helper