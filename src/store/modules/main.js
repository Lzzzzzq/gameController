const state = {
  username: sessionStorage.getItem('username') || '',
  id: 0
}

const getters = {

}

const actions = {

}

const mutations = {
  setSocketId: (state, params) => { // 设置socketid
    state.id = params.id
  },
  setUsername: (state, params) => { // 设置用户名
    state.username = params.username
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
