<template>
    <h1>UserViewer</h1>
    <p>{{ data.userId }}</p>
    <button type="button" class="btn btn-danger" @click.prevent="logOut">Wyloguj się</button>
</template>

<script setup>
import { inject, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useUserDataStore } from '../../services/stores/userdata';
import { useRouter } from 'vue-router';

const eventBus = inject('$eventBus');
const userData = useUserDataStore();
const router = useRouter();

const route = useRoute();
const data = /* here will be the logic for retrieving user data from storage, right now there's no endpoint */ reactive({ userId: route.params.userId });

async function logOut() {
    const loggedOut = await userData.logOut();
    if (loggedOut) {
        eventBus.$emit('userLoggedOut');
        router.push('/');
    }

}
</script>../../services/stores/userdata../../stores/userdata