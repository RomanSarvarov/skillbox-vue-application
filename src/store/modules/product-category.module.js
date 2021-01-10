import axios from 'axios';
import config from '@/config';

export default {
  namespaced: true,

  actions: {
    async loadCategoryData(context, categoryId) {
      const response = await axios.get(`${config.API_URL}/api/productCategories/${categoryId}`);
      return response.data;
    },
    async loadCategoriesData() {
      const response = await axios.get(`${config.API_URL}/api/productCategories`);
      return response.data;
    },
  },
};
