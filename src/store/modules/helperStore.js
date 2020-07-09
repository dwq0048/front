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
        },
        TIME_FOR({commit}, payload) {
            const today = new Date();
            const timeValue = new Date(payload);
    
            const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
            if (betweenTime < 1) return '방금전';
            if (betweenTime < 60) {
                return `${betweenTime}분전`;
            }
    
            const betweenTimeHour = Math.floor(betweenTime / 60);
            if (betweenTimeHour < 24) {
                return `${betweenTimeHour}시간전`;
            }
    
            const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
            if (betweenTimeDay < 365) {
                return `${betweenTimeDay}일전`;
            }
    
            return `${Math.floor(betweenTimeDay / 365)}년전`;
     }
    }
}

export default Helper