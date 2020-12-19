import { createApp } from 'vue';
import mitt from 'mitt';
import App from './App';
import { firstString, secondString } from './data';
import Alert from './alert';

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.mount('#app');

Alert(firstString);
Alert(secondString);
