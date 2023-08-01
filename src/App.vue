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
import { usePaintingsStore } from './stores/paintings';
import { useUserDataStore } from './stores/userdata';

const userData = useUserDataStore();
const paintings = usePaintingsStore();

const eventBus = inject('$eventBus');
</script>
