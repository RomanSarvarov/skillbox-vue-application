import { createApp } from 'vue';
import NumberHelper from '@/helpers/number-format.helper';
import ProductHelper from '@/helpers/product.helper';
import ColorHelper from '@/helpers/color.helper';
import App from './App';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(router);
app.use(store);
app.config.globalProperties.numberHelper = NumberHelper;
app.config.globalProperties.productHelper = ProductHelper;
app.config.globalProperties.colorHelper = ColorHelper;
app.mount('#app');
