<template>
    <div>
        <form>
            <label for="orderIdInput">Id zamowienia</label>
            <input id="orderIdInput" type="text" v-model="data.orderId">
            <button class="btn" @click.prevent="onButtonClicked">Dalej</button>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useOrderStore } from '../../stores/order_store';

const orderStore = useOrderStore();

const data = reactive({
    orderId: 0,
});

async function onButtonClicked() {
    const order = await orderStore.retrieveOrder(data.orderId);
}


</script>