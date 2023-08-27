<template>
    <div class="container">
        <h1>UserViewer {{ data.id }}</h1>
        <button type="button" class="btn btn-danger" @click.prevent="deleteProfile">Delet</button>
        <button type="button" class="btn btn-warning" @click.prevent="logOut">Wyloguj się</button>
        <p>{{ data.id }}</p>
        <p>{{ data.name }}</p>
        <p>{{ data.email }}</p>
        <p>{{ data.phone }}</p>
    </div>
    <user-order-list v-if="data.orders && data.orders.data.length > 0" :key="data.orders.data" :orders="data.orders.data"></user-order-list>
</template>

<script setup>
import { inject, reactive, computed, watch, toRaw } from 'vue';
import { useRoute } from 'vue-router';
import { useUserDataStore } from '../../stores/userdata';
import { useRouter } from 'vue-router';
import { useOrderStore } from '../../stores/order_store';
import UserOrderList from '../../components/user/UserOrdersList.vue'

const eventBus = inject('$eventBus');
const userData = useUserDataStore();
const orderStore = useOrderStore();
const router = useRouter();

const { userId } = defineProps(['userId']);

const data = computed(() => {
    const dataObject = {
        ...userData.getData,
        orders: toRaw(orderStore.getOrders),
    }

    return dataObject;
});

const isLoggedIn = computed(() => userData.isLoggedIn);

if (!isLoggedIn.value) {
    router.push('/');
}

async function logOut() {
    const loggedOut = await userData.logOut();
    if (loggedOut) {
        eventBus.$emit('userLoggedOut');
        router.push('/');
    }
}

async function deleteProfile() {
    const deleted = await userData.deleteProfile();
    if (deleted) {
        eventBus.$emit('profileDeleted');
        eventBus.$emit('userLoggedOut');
        router.push('/');
    }
}


</script>