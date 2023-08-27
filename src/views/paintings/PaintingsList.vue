<template>
    <h4>Lista wszystkich obrazow</h4>
    <div>
        <h5>Sortuj według</h5>
        <form>
            <label for="price_asc">Wg. ceny rosnąco</label>
            <input type="radio" id="price_asc" name="sort" @click="sortBy = 'price_asc'" :checked="sortBy == 'price_asc'">
            <label for="price_desc">Wg. ceny malejąco</label>
            <input type="radio" id="price_desc" name="sort" @click="sortBy = 'price_desc'" :checked="sortBy == 'price_desc'">
            <label for="newest">Od najnowszych</label>
            <input type="radio" id="newest" name="sort" @click="sortBy = 'newest'" :checked="sortBy == 'newest'">
            <label for="oldest">Od najstraszych</label>
            <input type="radio" id="oldest" name="sort" @click="sortBy = 'oldest'" :checked="sortBy == 'oldest'">
        </form>
    </div>
    <div class="container">
        <div class="row row-cols-1 row-cols-lg-2 g-2" :key="sortBy">
            <painting-list-item v-for="painting in paintings" :painting="painting"></painting-list-item>
        </div>
    </div>
</template>

<script setup>
import { usePaintingsStore } from '../../stores/paintings.js';
import PaintingListItem from '../../components/painting/PaintingListItem.vue';
import { watch, ref } from 'vue';

const sortBy = ref("newest");

const paintingsStore = usePaintingsStore();
let paintings = sortArrBy(paintingsStore.getAllPaintings(), 'created_at', 'desc');


watch(() => sortBy.value, (oldSortBy, newSortBy) => {
    switch (sortBy.value) {
        case "price_asc":
            paintings = sortArrBy(paintings, 'base_price', 'asc');
            break;
        case "price_desc":
            paintings = sortArrBy(paintings, 'base_price', 'desc');
            break;
        case "newest":
            paintings = sortArrBy(paintings, 'created_at', 'desc');
            break;
        case "oldest":
            paintings = sortArrBy(paintings, 'created_at', 'asc');
            break;

        default:
            break;
    }
});

function sortArrBy(arr, key, mode) {
    arr.sort((a, b) => {
        let aValue = a[key]
        let bValue = b[key]

        if (key == 'created_at') {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
        }

        if (mode == 'asc') {
            return aValue - bValue;
        }
        else if (mode == 'desc') {
            return bValue - aValue;
        }
    });

    return arr;
}

</script>