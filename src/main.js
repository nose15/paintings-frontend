import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/routes.js';
import App from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import eventBus from './events/eventBus';
import { UserRequestManager } from './services/requests/request_managers/UserRequestManager.js';
import { HttpClient } from './services/requests/HttpClient.js';

const app = createApp(App);
const pinia = createPinia();
const httpClient = new HttpClient("http://localhost:8000/api");
const userRequestManager = new UserRequestManager(httpClient);

app.use(pinia);
app.use(router);

app.provide('$userRequestManager', userRequestManager);
app.provide("$eventBus", eventBus);

app.mount('#app');
