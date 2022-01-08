export const state = () => ({
  conversations: [],
  rows: 0,
  v2_conversations: [],
  message: []
})

export const mutations = {
  SET_CONV_DATA(state, payload) {
    state.conversations = payload
  },
  SET_V2_CONV_DATA(state, payload) {
    state.v2_conversations = payload
  },
  SET_V2_CONV_ROWS(state, payload) {
    state.rows = payload
  }
}

export const actions = {
  convData(context, params) {
    let id, val, act
    if (params) {
      ;[id, val, act] = params
    }

    return new Promise((resolve, reject) => {
      this.$axios
        .post('whatsapp/conversations', { id, val, act })
        .then((response) => {
          context.commit('SET_CONV_DATA', response.data.conversations)
          resolve()
        })
    })
  },
  ctgConv(context, params) {
    let id, val, act
    if (params) {
      ;[id, val, act] = params
    }

    return new Promise((resolve, reject) => {
      this.$axios
        .post('whatsapp/conversations', { id, val, act })
        .then((response) => {
          context.commit('SET_CONV_DATA', response.data.conversations)
          resolve()
        })
    })
  },
  v2getConvData(context, params) {
    let currentPage = 1
    let perPage = 10
    if (params) {
      ;[currentPage, perPage] = params
    }

    return new Promise((resolve, reject) => {
      this.$axios
        .get(`v2/whatsapp/conversations?page=${currentPage}&perPage=${perPage}`)
        .then((response) => {
          context.commit('SET_V2_CONV_DATA', response.data.conversations)
          context.commit('SET_V2_CONV_ROWS', response.data.rows)
          resolve()
        })
    })
  },
  v2setConvData(context, params) {
    console.log('set conv data', params)
    // let currentPage = 1
    // let perPage = 10
    // if (params) {
    //   ;[currentPage, perPage] = params
    // }

    return new Promise((resolve, reject) => {
      this.$axios({
        method: params.method,
        url: `v2/whatsapp/conversations${params.urlparam ?? ''}`,
        data: params
      }).then((response) => {
        context.commit('SET_V2_CONV_DATA', response.data.conversations)
        context.commit('SET_V2_CONV_ROWS', response.data.rows)
        resolve()
      })
    })
  }
}
