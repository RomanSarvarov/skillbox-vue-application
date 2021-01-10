import axios from 'axios';
import config from '@/config';
import ProductHelper from '@/helpers/product.helper';

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

      return {
        ...response.data,

        items: response.data.items.map(
          (product) => ProductHelper.format(product),
        ),
      };
    },
    async loadProductData(context, productId) {
      const response = await axios.get(`${config.API_URL}/api/products/${productId}`);
      return response.data;
    },
  },
};
