import { createApp } from 'vue';
import router from './router/routes';
import App from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
