<template>
    <h1>Cart</h1>
    <ul>
        <li v-for="item in cartItems">
            <p>{{ item }}</p>
            <button class="btn btn-danger" @click.prevent="deleteItem(item.id)">Usun z koszyka</button>
        </li>
    </ul>

</template>

<script setup>

import { computed } from 'vue';
import { useCartStore } from '../stores/shopping_cart.js';
const cartStore = useCartStore();

const cartItems = computed(() => cartStore.getCartItems);

function deleteItem(id) {
    if (cartStore.removeFromCart(id)){
        console.log('deleted');
    }
}

</script>