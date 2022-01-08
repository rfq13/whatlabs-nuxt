export const state = () => ({
  nlp_algo: 1 //1 for fuzzy 2 for rabin karp
})

export const mutations = {
  SET_NLP_ALGO(state, payload) {
    state.nlp_algo = payload
  }
}

export const actions = {
  nlpAlgo(context, params) {
    return new Promise((resolve, reject) => {
      this.$axios({
        method: params?.method ?? 'get',
        url: 'v2/whatsapp/algo',
        data: params
      }).then((response) => {
        context.commit('SET_NLP_ALGO', response.data.nlp_algo)
        resolve()
      })
    })
  }
}
