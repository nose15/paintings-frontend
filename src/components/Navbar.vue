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
          <router-link class="nav-link" active-class="nav-link-active" :to="'/uzytkownik'">Uzytkownik</router-link>
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


</script>