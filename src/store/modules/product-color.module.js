import axios from 'axios';
import config from '@/config';

export default {
  namespaced: true,

  actions: {
    async loadColorsData() {
      const response = await axios.get(`${config.API_URL}/api/colors`);
      return response.data;
    },
  },
};
