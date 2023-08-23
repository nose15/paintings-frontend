<template>
    <h1>Rejestracja</h1>
    <div class="card col-4 mx-auto bg-light">
        <form class="card-body">
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
            <div class="form-text">
              <p>Twoje hasło powinno zawierać:</p>
              <ul>
                <li>Duże litery (A-Z) <span v-if="passwordCriteria.hasUpper">✔</span><span v-else>❌</span></li>
                <li>Małe litery (a-z) <span v-if="passwordCriteria.hasLower">✔</span><span v-else>❌</span></li>
                <li>Cyfry (0-9) <span v-if="passwordCriteria.hasNumbers">✔</span><span v-else>❌</span></li>
                <li>Znak specjalny <span v-if="passwordCriteria.hasSpecial">✔</span><span v-else>❌</span></li>
                <li>8-30 znakow <span v-if="passwordCriteria.lengthOk">✔</span><span v-else>❌</span></li>
              </ul>
            </div>
          </div>
          <div class="mb-3">
            <label for="passwordConfirmInput" class="form-label">Powtórz Hasło</label>
            <input v-model="data.password_confirmation" type="password" class="form-control" id="passwordConfirmInput">
            <div v-if="!passwordsMatch" id="password_confirmation_error" class="form-text text-danger">Hasła nie są takie same</div>
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
        <div class="row d-flex align-items-center mx-auto">
            <button @click.prevent="onButtonClicked" type="submit" class="btn btn-primary col-lg-4" :disabled="!isFormValid">Zarejestruj się</button>
            <router-link class="link-opacity-50-hover col-lg-5 me-auto" :to="`/zaloguj`">Masz już konto?</router-link>
        </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, inject, computed, watch } from 'vue';
import { validateEmail, validatePassword } from '../utils';
import { useUserDataStore } from '../../stores/userdata';
import { useRouter, useRoute } from 'vue-router';

const userDataStore = useUserDataStore();
const router = useRouter();
const route = useRoute();

const eventBus = inject('$eventBus');

const routeQuerries = route.query;


const data = reactive({
    email: "",
    password: "",
    password_confirmation: "",
});

const errors = reactive({
  email_error: "",
  password_error: "",
  password_confirmation_error: "",
});

const passwordCriteria = computed(() => validatePassword(data.password));
const passwordsMatch = computed(() => data.password == data.password_confirmation);
const isFormValid = computed(() => validate());

const emailValid = computed(() => {
  return validateEmail(data.email);
});

const passwordValid = computed(() => {
  for (const key in passwordCriteria.value) {
    if (passwordCriteria.value[key] == false) {
      return false;
    }
  }

  return true;
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

    const registered = await register();

    if (registered == true) {
      navigate();
      return;
    }

    return;
}

function clearErrors() {
  errors.email_error = "",
  errors.password_error = "",
  errors.password_confirmation_error = ""
}

function clearPassword() {
  data.password = "";
  data.password_confirmation = "";
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

async function register() {
  const registerData = {
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation
  }

  const response = await userDataStore.register(registerData);

  if (response == true) {
    eventBus.$emit('userLoggedIn');
    return true;
  }

  assignErrors(errorCode);
  return false;
}

async function logIn() {
  const loggedIn = await userDataStore.logIn(data.email, data.password);

  if (loggedIn) {
    eventBus.$emit('userLoggedIn');
    return true;
  }

  return false;
}

function validate() {
  if (emailValid.value && passwordValid.value && passwordsMatch.value) {
    return true;
  }

  return false;
}


function assignErrors(errorCode) {
  switch (errorCode) {
    case 422:
      errors.email_error = "Ten email jest już zajęty";
      clearPassword();
      break;
    default:
      break;
  }
}





</script>
