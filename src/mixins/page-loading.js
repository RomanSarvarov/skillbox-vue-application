import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isPageLoading', 'isPageLoadFailed']),
  },
  methods: {
    ...mapMutations(['pageLoadStart', 'pageLoadStop', 'pageLoadFailed']),

    renderValue(values, defaultValue = 'загрузка...') {
      let value = this;

      values.forEach((needle) => {
        if (typeof value === 'undefined') {
          return;
        }

        value = value[needle];
      });

      return value || defaultValue;
    },
  },
};
