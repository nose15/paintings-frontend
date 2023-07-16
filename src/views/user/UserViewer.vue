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
    <user-order-list v-if="data.orders.length > 0" :orders="data.orders"></user-order-list>
</template>

<script setup>
import { inject, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserDataStore } from '../../stores/userdata';
import { useRouter } from 'vue-router';
import UserOrderList from '../../components/user/UserOrdersList.vue'

const eventBus = inject('$eventBus');
const userData = useUserDataStore();
const router = useRouter();

const data = computed(() => userData.getData)

const { userId } = defineProps(['userId']);

if (userData.getID == null) {
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
        router.push('/');
    }
}
</script>