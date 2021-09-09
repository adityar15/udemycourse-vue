const state = {
    email: '',
    uid: ''
}

const mutations = {
    setUserValues(state, payload)
    {
        if(payload.email && payload.uid)
        {
            state.email = payload.email
            state.uid = payload.uid
        }
    },
    resetUserValues(state)
    {
        state.email = ''
        state.uid = ''
    }
}
const actions = {
    hydrateData({commit}){
        if(localStorage.getItem('user'))
        {
            const user = JSON.parse(localStorage.getItem('user'))
            commit('setUserValues', user)
        }
    }
}
const getters = {
    getEmail(state)
    {
        return state.email
    },

    getUid(state)
    {
        return state.uid
    }

}



export default {
    namespaced: true,
    state: state,
    actions: actions,
    getters:getters,
    mutations:mutations
}