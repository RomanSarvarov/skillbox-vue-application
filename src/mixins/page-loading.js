export default {
  computed: {
    isPageLoading() {
      return this.$store.getters.isPageLoading;
    },
    isPageLoadFailed() {
      return this.$store.getters.isPageLoadFailed;
    },
  },
  methods: {
    pageLoadStart() {
      this.$store.commit('pageLoadStart');
    },
    pageLoadStop() {
      this.$store.commit('pageLoadStop');
    },
    pageLoadFailed(failed = true) {
      this.$store.commit('pageLoadFailed', { failed });
    },
  },
};
