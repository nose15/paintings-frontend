<template>
    <h4>Lista wszystkich obrazow</h4>
    <ul>
        <li v-for="painting in paintingsStore.getAllPaintings()">
            {{ painting.title }}
        </li>
    </ul>
</template>

<script setup>
import { usePaintingsStore } from '../../stores/paintings';
const paintingsStore = usePaintingsStore();
</script>