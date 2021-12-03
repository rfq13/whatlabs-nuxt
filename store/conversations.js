export const state = ()=>({
    conversations:[],
    message:[]
})

export const mutations = {
    SET_CONV_DATA(state, payload){
        state.conversations = payload;
    },
}

export const actions = {
    convData(context,params){
        let id,val,act;
        if (params) {
            [id,val,act] = params;
        }

        return new Promise((resolve,reject)=>{
            this.$axios.post('whatsapp/conversations',{id,val,act}).then(response=>{
                context.commit('SET_CONV_DATA',response.data.conversations);
                resolve();
            })
        })
    },
    ctgConv(context,params){
        let id,val,act;
        if (params) {
            [id,val,act] = params;
        }
    
        return new Promise((resolve,reject)=>{
            this.$axios.post('whatsapp/conversations',{id,val,act}).then(response=>{
                context.commit('SET_CONV_DATA',response.data.conversations);
                resolve();
            })
        })
    },
}