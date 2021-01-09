export default {
  namespaced: true,
  state: () => ({
    pageLoading: false,
    pageLoadFailed: false,
  }),
  mutations: {
    pageLoadStart(state) {
      state.pageLoading = true;
    },
    pageLoadStop(state) {
      state.pageLoading = false;
    },
    pageLoadFail(state, failed = true) {
      state.pageLoadFailed = failed;
    },
  },
};
