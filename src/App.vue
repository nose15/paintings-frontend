<template>
  <navbar></navbar>
  <div class="container">
    <router-view></router-view>
  </div>
  <footer-comp></footer-comp>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import FooterComp from './components/FooterComp.vue';
import { inject, reactive } from 'vue';

const eventBus = inject('$eventBus');
</script>
