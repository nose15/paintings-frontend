<template>
    <h1>Order {{ orderId }}</h1>
    <div v-if="access && dataRetrieved">{{ orderData }}</div>
    <div v-else-if="!dataRetrieved && !access">Fetching data...</div>
    <div v-else>Nie masz dostępu do tych danych</div>
</template>

<script setup>
import { ref } from 'vue';
import { useOrderStore } from '../../stores/order_store';
const { orderId } = defineProps(['orderId']);

const orderStore = useOrderStore();
const orderData = ref();
const dataRetrieved = ref(false);
const access = ref(false);

async function fetchData() {
    const response = await orderStore.getOrderById(orderId);

    if (response != false) {
        orderData.value = response;
        access.value = true;
    }

    dataRetrieved.value = true;
}

fetchData();


</script>