import { createApp } from 'vue';
import mitt from 'mitt';
import navigate from '@/helpers/navigate';
import numberFormat from '@/helpers/numberFormat';
import App from './App';
import { firstString, secondString } from './data';
import Alert from './alert';

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.config.globalProperties.navigate = navigate;
app.config.globalProperties.numberFormat = numberFormat;
app.mount('#app');

Alert(firstString);
Alert(secondString);
