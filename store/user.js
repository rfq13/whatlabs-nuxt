export const state = ()=>({
    users:[],
    wa_sessions:[]
})

export const mutations = {
    SET_USER_DATA(state, payload){
        state.users = payload;
    },
    SET_WA_SESSION_DATA(state, payload){
        state.wa_sessions = payload;
    },
}

export const actions = {
    getUsersData(context){
        return new Promise((resolve,reject)=>{
            this.$axios.get('whatsapp/user').then(response=>{
                context.commit('SET_USER_DATA',response.data.results);
                resolve();
            })
        })
    },
    getWaSessionsData(context){
        return new Promise((resolve,reject)=>{
            this.$axios.get('whatsapp/sessions').then(response=>{
                context.commit('SET_WA_SESSION_DATA',response.data.results);
                resolve();
            })
        })
    },
}