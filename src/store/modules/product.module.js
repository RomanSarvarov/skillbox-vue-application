import axios from 'axios';
import config from '@/config';

export default {
  namespaced: true,

  actions: {
    async loadProductsData(context, { pagination, filtration }) {
      const response = await axios.get(`${config.API_URL}/api/products`, {
        params: {
          ...pagination,
          ...filtration,
        },
      });
      return response.data;
    },
    async loadProductData(context, productId) {
      const response = await axios.get(`${config.API_URL}/api/products/${productId}`);
      return response.data;
    },
  },
};
