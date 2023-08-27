<template>
    <h1>Order {{ orderId }}</h1>
    <div>{{ orderData }}</div>
</template>

<script setup>
import { useOrderStore } from '../../stores/order_store';
const { orderId } = defineProps(['orderId']);

const orderStore = useOrderStore();
const orderData = orderStore.getOrderById(orderId);
console.log(orderData);
</script>