import {createApp} from 'vue';
import App from './App.vue';

import AppPlugin from './assets/js/AppPlugin.js';

const app = createApp(App);
app.use(AppPlugin);
app.mount('#app');
