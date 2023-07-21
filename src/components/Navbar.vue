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
        <li>
          <router-link class="nav-link" active-class="nav-link-active" :to="userLink">{{ userLinkText }}</router-link>
        </li>
        <li class="ms-auto">
          <router-link class="nav-link" active-class="nav-link-active" :to="'/koszyk'">Koszyk</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script setup>
import { computed, inject, reactive, watch } from 'vue';
import { useUserDataStore } from '../stores/userdata.js';
import { useRouter } from 'vue-router';

const eventBus = inject('$eventBus');
const router = useRouter();
const userData = useUserDataStore();

const data = reactive({
  isLoggedIn: userData.isLoggedIn,
})

eventBus.$on('userLoggedIn', () => {
  update();
});

eventBus.$on('userLoggedOut', () => {
  update();
});

const userLink = computed(() => {
  return !(data.isLoggedIn) ? '/zaloguj' : `/uzytkownik/${id.value}` // for now we use data.userToken as id just for testing because we dont have an endpoint for user data
});

const userLinkText = computed(() => {
  return !(data.isLoggedIn) ? 'Zaloguj' : `Uzytkownik` 
});

const id = computed(() => {
  return userData.getID;
});

function update()
{
  data.isLoggedIn = userData.isLoggedIn;
}

</script>