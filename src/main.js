import { createApp } from 'vue';
import App from './App';
import { firstString, secondString } from './data';
import Alert from './alert';

createApp(App).mount('#app');

Alert(firstString);
Alert(secondString);
