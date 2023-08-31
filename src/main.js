import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/routes.js';
import App from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import eventBus from './events/eventBus';
import {loadStripe} from '@stripe/stripe-js';

const stripe = await loadStripe('pk_test_51Nj32sIZDMPwornjUZW16uPrUnncHxomudR4ilYWisH00t1lHXsp7iqp0klncZTAllK49vnMQdReVjhVd607exmV00U0zDJBkl');

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.provide("$eventBus", eventBus);
app.provide("$stripe", stripe);

app.mount('#app');
