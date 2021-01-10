import config from '@/config';

export default {
  isColorProp(propId) {
    return propId === config.PRODUCT_COLOR_PROP_ID;
  },
};
