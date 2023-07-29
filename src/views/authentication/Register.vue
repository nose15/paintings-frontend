<template>
    <h1>Rejestracja</h1>
    <div class="card col-4 mx-auto bg-light">
        <form class="card-body">
          <div class="mb-3">
            <label for="nameInput" class="form-label">Imię</label>
            <input v-model="data.name" type="text" class="form-control" id="nameInput" aria-describedby="emailHelp">
            <div v-if="errors.name_error != ''" id="name_error" class="form-text text-danger">{{ errors.name_error }}</div>
          </div>
          <div class="mb-3">
            <label for="surnameInput" class="form-label">Nazwisko</label>
            <input v-model="data.surname" type="text" class="form-control" id="surnameInput" aria-describedby="emailHelp">
            <div v-if="errors.surname_error != ''" id="surname_error" class="form-text text-danger">{{ errors.surname_error }}</div>
          </div>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Adres Email</label>
            <input v-model="data.email" type="email" class="form-control" id="emailInput" aria-describedby="emailHelp">
            <div v-if="errors.email_error != ''" id="emailError" class="form-text text-danger">{{ errors.email_error }}</div>
            <div id="emailHelp" class="form-text">Nie rozpowszechniamy danych naszych użytkowników</div>
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Hasło</label>
            <input v-model="data.password" type="password" class="form-control" id="passwordInput">
            <div v-if="errors.password_error != ''" id="password_error" class="form-text text-danger">{{ errors.password_error }}</div>
            <div class="form-text">Duże litery (A-Z) <span v-if="password_errors.hasUpper">✔</span><span v-else>❌</span></div>
            <div class="form-text">Małe litery (a-z) <span v-if="password_errors.hasLower">✔</span><span v-else>❌</span></div>
            <div class="form-text">Cyfry (0-9) <span v-if="password_errors.hasNumbers">✔</span><span v-else>❌</span></div>
            <div class="form-text">Znak specjalny <span v-if="password_errors.hasSpecial">✔</span><span v-else>❌</span></div>
            <div class="form-text">8-30 znakow <span v-if="password_errors.lengthOk">✔</span><span v-else>❌</span></div>
          </div>
          <div class="mb-3">
            <label for="passwordConfirmInput" class="form-label">Powtórz Hasło</label>
            <input v-model="data.password_confirmation" type="password" class="form-control" id="passwordConfirmInput">
            <div v-if="!passwords_match" id="password_confirmation_error" class="form-text text-danger">Hasła nie są takie same</div>
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
import { reactive, inject, watch, ref, computed } from 'vue';
import { validateEmail, validateName, validatePassword } from '../utils';
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

const errors = reactive({
  name_error: "",
  surname_error: "",
  email_error: "",
  password_error: "",
  password_confirmation_error: "",
});

const password_errors = computed(() => validatePassword(data.password));
const passwords_match = computed(() => data.password == data.password_confirmation);

function onButtonClicked() {
    register();
}

function clearErrors() {
  errors.name_error = "";
  errors.surname_error = "";
  errors.email_error = "",
  errors.password_error = "",
  errors.password_confirmation_error = ""
}

async function register() {
  clearErrors();
  const validated = validate();

  if (validated) {
    const registeredResponse = await userDataStore.register({phone: "997997997", name: `${data.name} ${data.surname}`, email: data.email, password: data.password, password_confirmation: data.password_confirmation});
    if (registeredResponse == true) {
      const loggedIn = await logIn();
      if (loggedIn) {
        navigate();
      }
    } 
    else {
      assignErrors(registeredResponse);
      data.password = "";
      data.password_confirmation = "";
    }
  }

  data.password = "";
  data.password_confirmation = "";
}

function validate() {
  var isValid = true;

  const emailValid = validateEmail(data.email);
  const nameValid = validateName(data.name);
  const surnameValid = validateName(data.surname);

  if (emailValid != true) {
    isValid = false;
    errors.email_error = emailValid
  }

  if (nameValid != true) {
    isValid = false;
    errors.name_error = nameValid;
  }

  if (surnameValid != true) {
    isValid = false;
    errors.surname_error = surnameValid;
  }

  for (const key in password_errors.value) {
    if(password_errors.value[key] == false) {
      isValid = false;
      errors.password_error = "Hasło jest niepoprawne";
    } 
  }

  if (!passwords_match) {
    errors.password_error = "Hasła nie są takie same"
    errors.password_confirmation_error = "Hasła nie są takie same"
    isValid = false;
  }

  return isValid;
}




function assignErrors(errorCode) {
  switch (errorCode) {
    case 422:
      if (data.email != "") {
        errors.email_error = "Ten email jest już zajęty";
        break;
      }
      errors.email_error = "Podaj adres email";
      break;
  
    default:
      break;
  }
}

async function logIn() {
  const loggedIn = await userDataStore.logIn(data.email, data.password);

  if (loggedIn) {
    eventBus.$emit('userLoggedIn');
    return true;
  }

  return false;
}

function navigate() {
    if ("redirect" in routeQuerries)
    {
        router.push(routeQuerries.redirect);
    }
    else {
        router.push('/');
    }
}


</script>
