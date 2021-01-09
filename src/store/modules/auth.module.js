export default {
  namespaced: true,
  state: () => ({
    token: null,
  }),
  mutations: {
    updateAuthToken(state, token) {
      state.token = token;
    },
  },
};
