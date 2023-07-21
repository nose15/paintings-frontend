<template>
    <h3>Podsumowanie</h3>
    <div class="row justify-content-center">
        <div class="col-5">
            <h4>Adres</h4>
            <p>{{ address.street }}, {{ address.house_number }} / {{ address.flat_number }}</p>
            <p>{{ address.postal_code }}, {{ address.city }}</p>
            <div v-if="address.is_company">
                <p>{{ address.company_name }}</p>
                <p>{{ address.NIP_number }}</p>
            </div>
            <p>{{ address.extra_info }}</p>
            <h4>Płatność</h4>
            <p>{{ paymentMethod }}</p>
        </div>
        <div v-if="id!=null">
            <p>{{ userStore.getData }}</p>
        </div>
        <div>
            <button class="btn btn-warning">Kupuję i płacę</button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useCartStore } from '../stores/shopping_cart';
import { useUserDataStore } from '../stores/userdata';
import { useCheckoutStore } from '../stores/checkout';

const cartStore = useCartStore();
const userStore = useUserDataStore();
const checkoutStore = useCheckoutStore();
var id = null;

if (userStore.isLoggedIn) {
    id = userStore.getID;
}

const address = checkoutStore.getAddressData;
const paymentMethod = checkoutStore.getPaymentMethod;



</script>