import { createApp } from 'vue';
import mitt from 'mitt';
import numberFormat from '@/helpers/numberFormat';
import App from './App';
import { firstString, secondString } from './data';
import Alert from './alert';
import router from './router';
import store from './store';

const emitter = mitt();
const app = createApp(App);
app.use(router);
app.use(store);
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.numberFormat = numberFormat;
app.mount('#app');

Alert(firstString);
Alert(secondString);
