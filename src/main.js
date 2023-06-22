import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/routes';
import App from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');
