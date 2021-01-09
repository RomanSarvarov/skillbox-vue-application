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
