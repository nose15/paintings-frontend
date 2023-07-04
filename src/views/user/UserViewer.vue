<template>
    <h1>UserViewer</h1>
    <p>{{ data.userId }}</p>
</template>

<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const data = /* here will be the logic for retrieving user data from storage, right now there's no endpoint */ reactive({ userId: route.params.userId });



</script>