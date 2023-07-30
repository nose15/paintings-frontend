<template>
    <h1>Zaloguj się</h1>
    <div class="card col-4 mx-auto bg-light">
        <form class="card-body">
          <div class="mb-3">
            <label for="emailInput" class="form-label">Adres Email</label>
            <input v-model="data.email" type="email" class="form-control" id="emailInput" aria-describedby="emailHelp">
            <div v-if="data.email_error != ''" id="emailError" class="form-text text-danger">{{ data.email_error }}</div>
            <div id="emailHelp" class="form-text">Nie rozpowszechniamy danych naszych użytkowników</div>
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Hasło</label>
            <input v-model="data.password" type="password" class="form-control" id="passwordInput">
            <div v-if="data.password_error != ''" id="passError" class="form-text text-danger">{{ data.password_error }}</div>
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Nie wylogowuj</label>
          </div>
        <div class="row d-flex align-items-center mx-auto">
            <button @click.prevent="onButtonClicked" type="submit" class="btn btn-primary col-lg-4">Zaloguj</button>
            <router-link class="link-opacity-50-hover col-lg-5 me-auto" :to="{path: '/rejestracja', query: routeQuerries}">Nie masz konta?</router-link>
        </div>
        </form>
    </div>
</template>

<script setup>
import { inject, reactive, watch } from 'vue';
import { validateEmail } from '../utils.js';
import { useRouter, useRoute } from 'vue-router';
import { useUserDataStore } from '../../stores/userdata.js';

const eventBus = inject("$eventBus");
const router = useRouter();
const route = useRoute();
const userDataStorage = useUserDataStore();

const routeQuerries = route.query;

const data = reactive({
    email: "",
    password: "",
    email_error: "",
    password_error: ""
});

watch(() => data.email, (oldEmail, newEmail) => {
  if (newEmail != oldEmail) {
    clearErrors();
  }
});


async function onButtonClicked() {
    clearErrors();
    const isValid = validate();

    if (!isValid) {
      return;
    }

    const loggedIn = await logIn();

    if (loggedIn) {
      navigate();
    }
}

function clearErrors() {
  data.email_error = "";
  data.password_error = "";
}


function validate() {
  if (validateEmail(data.email)) {
    return true;
  }

  asignErrors(403);
  return false;
}

async function logIn() {
  const logInResponse = await userDataStorage.logIn(data.email, data.password);

  if (logInResponse == true) {
    eventBus.$emit('userLoggedIn');
    return true;
  }

  asignErrors(logInResponse);
  return false;
}

function navigate() {
  if ("redirect" in routeQuerries){
      router.push(routeQuerries.redirect);
  } 
  else {
    router.push('/');
  }
}

function asignErrors(errorCode) {
  switch (errorCode) {
    case 422:
      data.email_error = "Nie ma użytkownika z takim adresem email";
      break;
    case 403:
      data.email_error = "Niepoprawny adres email";
      break;
    case 401:
      data.password_error = "Niepoprawne hasło";
      break;
    default:
      data.email_error = "Wystąpił błąd";
      break;
  }
  data.password = "";
}
</script>