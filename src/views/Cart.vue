<template>
    <div class="container">
        <div>
            <h1>Koszyk</h1>
        </div>
        <div v-if="cartItems.length > 0">
            <div>
                <ul>
                    <li v-for="item in cartItems">
                        <p>{{ item }}</p>
                        <button class="btn btn-danger" @click.prevent="deleteItem(item.id)">Usun z koszyka</button>
                    </li>
                </ul>
            </div>
            <div id="checkoutButton">
                <p class="fs-3">Razem: {{ totalPrice }}</p>
                <button
                    class="btn btn-warning"
                    @click.prevent="checkout()"
                >Do kasy</button>
            </div>         
        </div>
        <div v-else>
            <p>Koszyk jest pusty</p>
        </div>
    </div>  
</template>

<script setup>

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/shopping_cart.js';

const router = useRouter();
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.getCartItems);

const totalPrice = ref(cartStore.getTotalPrice);

function deleteItem(id) {
    if (cartStore.removeFromCart(id)){
        totalPrice.value = cartStore.getTotalPrice;
        console.log('deleted');
    }
}

function checkout() {
    const invalid_elements = []
    // check availability of products
    if (invalid_elements.length == 0) {
        router.push('/kasa');
    }
    else {
        console.log(invalid_elements);
    }
}



</script>