import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/routes.js';
import App from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import eventBus from './events/eventBus';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.provide("$eventBus", eventBus);

app.mount('#app');
