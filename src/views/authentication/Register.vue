<template>
    <h1>Rejestracja</h1>
    <div class="card col-4 mx-auto bg-light">
        <form class="card-body">
          <div class="mb-3">
            <label for="nameInput" class="form-label">Imię</label>
            <input v-model="data.name" type="text" class="form-control" id="nameInput" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="surnameInput" class="form-label">Nazwisko</label>
            <input v-model="data.surname" type="text" class="form-control" id="surnameInput" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Adres Email</label>
            <input v-model="data.email" type="email" class="form-control" id="emailInput" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">Nie rozpowszechniamy danych naszych użytkowników</div>
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Hasło</label>
            <input v-model="data.password" type="password" class="form-control" id="passwordInput">
          </div>
          <div class="mb-3">
            <label for="passwordConfirmInput" class="form-label">Powtórz Hasło</label>
            <input v-model="data.password_confirmation" type="password" class="form-control" id="passwordConfirmInput">
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
        <div class="row d-flex align-items-center mx-auto">
            <button @click.prevent="onButtonClicked" type="submit" class="btn btn-primary col-lg-4">Zarejestruj się</button>
            <router-link class="link-opacity-50-hover col-lg-5 me-auto" :to="`/zaloguj`">Masz już konto?</router-link>
        </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, inject } from 'vue';
import { useUserDataStore } from '../../stores/userdata';
import { useRouter, useRoute } from 'vue-router';

const userDataStore = useUserDataStore();
const router = useRouter();
const route = useRoute();

const routeQuerries = route.query;

const eventBus = inject('$eventBus');

const data = reactive({
    name: "",
    surname: "",
    email: "",
    password: "",
    password_confirmation: "",
});

function onButtonClicked() {
    register();
}

async function register() {
  const registered = await userDataStore.register({phone: "997997997", name: `${data.name} ${data.surname}`, email: data.email, password: data.password, password_confirmation: data.password_confirmation});

  if (registered) {
    const loggedIn = await userDataStore.logIn(data.email, data.password)
    if (loggedIn) {
      eventBus.$emit('userLoggedIn');

      if ("redirect" in routeQuerries)
      {
        router.push(routeQuerries.redirect);
      }
      else {
        router.push('/');
      }
    }
  }
}


</script>
