<template>
    <h1>Zaloguj się</h1>
    <div class="card col-4 mx-auto bg-light">
        <form class="card-body">
          <div class="mb-3">
            <label for="emailInput" class="form-label">Adres Email</label>
            <input v-model="data.email" type="email" class="form-control" id="emailInput" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">Nie rozpowszechniamy danych naszych użytkowników</div>
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Hasło</label>
            <input v-model="data.password" type="password" class="form-control" id="passwordInput">
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
        <div class="row d-flex align-items-center mx-auto">
            <button @click.prevent="onButtonClicked" type="submit" class="btn btn-primary col-lg-4">Zaloguj</button>
            <router-link class="link-opacity-50-hover col-lg-5 me-auto" :to="`/rejestracja`">Nie masz konta?</router-link>
        </div>
        </form>
    </div>
</template>

<script setup>
import { inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserDataStore } from '../../stores/userdata'

const eventBus = inject("$eventBus");
const router = useRouter();
const userDataStorage = useUserDataStore();

const data = reactive({
    email: "",
    password: "",
    error: "",
});

function onButtonClicked() {
    logIn();
}

async function logIn() {
    try {
        const token = await postData("http://localhost:8000/api/login", {'email': data.email, 'password': data.password});
        userDataStorage.setToken(token);
        eventBus.$emit('userLoggedIn');
    } catch (error) {
        userDataStorage.setToken(null);
        alert(error);
    }
}

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors", 
        cache: "no-cache", 
        credentials: "omit",
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8000/",
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const token = await response.json();
        return token.token;
    }
    else {
        // once the errors are consistent, error handling will be added
        throw new Error("Something went wrong");
    }
}

</script>