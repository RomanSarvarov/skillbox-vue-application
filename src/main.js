import { createApp } from 'vue';
import numberFormat from '@/helpers/numberFormat';
import App from './App';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(router);
app.use(store);
app.config.globalProperties.numberFormat = numberFormat;
app.mount('#app');
