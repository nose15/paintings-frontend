<template>
    <h4>Lista wszystkich obrazow</h4>
    <div class="container">
        <div class="row row-cols-1 row-cols-lg-2 g-2">
            <painting-list-item v-for="painting in paintingsStore.getAllPaintings()" :painting="painting"></painting-list-item>
        </div>
    </div>
</template>

<script setup>
import { usePaintingsStore } from '../../services/stores/paintings.js';
import PaintingListItem from '../../components/painting/PaintingListItem.vue';
const paintingsStore = usePaintingsStore();
</script>../../services/stores/paintings../../stores/paintings.js