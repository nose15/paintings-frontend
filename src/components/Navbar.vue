<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Obrazy</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" active-class="nav-link-active" :to="'/obrazy'">Sklep</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="nav-link-active" :to="userLink" @click.prevent="onButtonClicked">{{ userLinkText }}</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="nav-link-active" :to="'/o nas'">O nas</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="nav-link-active" :to="'/kontakt'">Kontakt</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script setup>
import { computed, inject, reactive, watch } from 'vue';
import { useUserDataStore } from '../stores/userdata';
import { useRouter } from 'vue-router';

const eventBus = inject('$eventBus');
const router = useRouter();
const userData = useUserDataStore();

const data = reactive({
  userToken: userData.getToken(),
})

console.log(data.userToken);

const userId = computed(() => {
  return 1;
});
const userLink = computed(() => {
  if (data.userToken == null) {
    return "/logowanie"
  }
  else {
    return "/";
  }
});
const userLinkText = computed(() => {
  if (data.userToken == null) {
    return "Zaloguj"
  }
  else {
    return "Wyloguj";
  }
});
const onButtonClicked = computed(() => {
  if (data.userToken == null) {
    return logIn;
  }
  else {
    return logOut;
  }
});

function logIn() {
  return;
}

function logOut() {
  postData("http://localhost:8000/api/logout");
  userData.deleteToken();
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

  console.log(response);
}




</script>