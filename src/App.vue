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
import { useOrderStore } from './stores/order_store';


const userData = useUserDataStore();
const paintings = usePaintingsStore();
const orders = useOrderStore();

const eventBus = inject('$eventBus');
const stripe = inject('$stripe');

</script>


