<template>
    <h3>Podsumowanie</h3>
    <div class="row justify-content-center">
        <div class="col-5">
            <div>
                <h4>Dane osobowe</h4>
                <div>
                    <p>{{ data.credentials.name }}</p>
                    <p>{{ data.credentials.email }}</p>
                    <p>{{ data.credentials.phone }}</p>
                </div>
                <div v-if="userData.user_id != 'null'">
                    <h5>Użytkownik</h5>
                    <p>{{ userData.user_id }}</p>
                    <p>{{ userData.data.email }}</p>
                </div>
                <div v-if="data.companyInfo.isCompany">
                    <p>{{ data.companyInfo.company_name }}</p>
                    <p>{{ data.companyInfo.NIP_number }}</p>
                </div>
            </div>
            <div v-if="checkoutStore.getDeliveryMethod != 'pickup'">
                <h4>Adres</h4>
                <p>{{ data.address.address }}</p>
                <p>{{ data.address.postal_code }}, {{ data.address.city }}</p>
            </div>
            <div v-else>
                <h4>Adres do odbioru</h4>
                <p>Mapka tutaj</p>
            </div>
            <div>
                <h4>Płatność</h4>
                <p>{{ data.paymentMethod }}</p>
            </div>
            <div>
                <h4>Dodatkowe informacje</h4>
                <p>{{ data.extraInfo }}</p>
            </div>
        </div>
        <div>
            <button class="btn btn-warning" @click.prevent="orderRequest">Kupuję i płacę</button>
            <div v-if="paymentData.orderCreated">W tym momencie wysyłany jest request do API, żeby stworzyć nowy order i oczekuje na url do bramki płatności</div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue';
import { useCartStore } from '../stores/shopping_cart';
import { useUserDataStore } from '../stores/userdata';
import { useCheckoutStore } from '../stores/checkout';

const cartStore = useCartStore();
const userStore = useUserDataStore();
const checkoutStore = useCheckoutStore();

const data = {
    credentials: checkoutStore.getCredentials,
    companyInfo: checkoutStore.getCompanyInfo,
    address: checkoutStore.getAddress,
    paymentMethod: checkoutStore.getPaymentMethod,
    deliveryMethod: checkoutStore.getDeliveryMethod,
    extraInfo: checkoutStore.getExtraInfo,
}

const userData = {
    user_id: userStore.getID,
    data: userStore.getData,
}

const paymentData = reactive({
    paymentGatewayUrl: "",
    orderCreated: false,
    orderId: 0,
});

async function orderRequest() {
    await checkoutStore.createOrder(toRaw(cartStore.getCartItemIds));

    paymentData.orderCreated = true;
}


</script>