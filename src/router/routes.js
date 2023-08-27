import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';

import Paintings from '../views/paintings/Paintings.vue';
import PaintingsList from '../views/paintings/PaintingsList.vue';
import PaintingViewer from '../views/paintings/PaintingViewer.vue';

import User from '../views/user/User.vue';
import UserEdit from '../views/user/UserEdit.vue';
import UserViewer from '../views/user/UserViewer.vue';

import Orders from '../views/order/Orders.vue';
import OrderViewer from '../views/order/OrderViewer.vue';
import OrderCancel from '../views/order/OrderCancel.vue';

import Login from '../views/authentication/Login.vue';
import Register from '../views/authentication/Register.vue';

import Cart from '../views/Cart.vue';

import Checkout from '../views/Checkout.vue';

import Summary from '../views/Summary.vue';

const propsIndicator = '/';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', 
            component: HomePage,
        },
        {
            path: '/obrazy',
            component: Paintings,
            children: [
                {
                    path: '',
                    component: PaintingsList,
                },
                {
                    path: ':id',
                    component: PaintingViewer,
                    props: true
                }
            ]
        },
        {
            path: `/uzytkownik${propsIndicator}:userId`,
            component: User,
            children: [
                {
                    path: '',
                    component: UserViewer,
                    props: true,
                },
                {
                    path: 'edycja',
                    component: UserEdit,
                    props: true,
                },
            ],
        },
        {
            path: `/zamowienia`,
            children: [
                {
                    path: '',
                    component: Orders,
                    props: true
                },
                {
                    path: `:orderId`,
                    component: OrderViewer,
                    props: true
                },
                {
                    path: `:orderId/odwolaj`,
                    component: OrderCancel,
                    props: true
                }
            ]
        },
        {
            path: '/zaloguj',
            component: Login
        },
        {
            path: '/rejestracja',
            component: Register
        },
        {
            path: '/koszyk',
            component: Cart
        },
        {
            path: '/kasa',
            component: Checkout
        },
        {
            path: '/podsumowanie',
            component: Summary
        }
    ]
});


router.beforeEach((to, from) => {
});

export default router;