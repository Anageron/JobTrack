import { createApp } from 'vue';
import App from './App.vue';
import router from './app/providers/app-router';
import pinia from './app/providers/app-pinia';

import './shared/assets/styles/main.scss';

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
