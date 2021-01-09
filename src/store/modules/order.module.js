import axios from 'axios';
import config from '@/config';

export default {
  namespaced: true,
  state: () => ({
    orderInfo: null,
  }),
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  actions: {
    async createOrder(context, { formData }) {
      const response = await axios.post(`${config.API_URL}/api/orders`, {
        ...formData,
      }, {
        params: {
          userAccessKey: this.$store.state.auth.token,
        },
      });

      return response.data;
    },
    async loadOrderInfo(context, orderId) {
      const response = await axios.get(`${config.API_URL}/api/orders/${orderId}`, {
        params: {
          userAccessKey: context.rootState.auth.token,
        },
      });

      context.commit('updateOrderInfo', response.data);

      return response;
    },
  },
};
