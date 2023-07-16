<template>
    <h1>Order {{ orderId }}</h1>
</template>

<script setup>
const { orderId } = defineProps(['orderId']);
</script>