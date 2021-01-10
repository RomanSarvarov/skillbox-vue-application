import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('pageLoading', ['pageLoading', 'pageLoadFailed']),
  },
  methods: {
    ...mapMutations('pageLoading', ['pageLoadStart', 'pageLoadStop', 'pageLoadFail']),

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
