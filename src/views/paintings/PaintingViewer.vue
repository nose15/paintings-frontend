<template>
    <h4>{{ painting.title }}</h4>
    <img :src="getImageURL()" class="col-12 mx-auto">
    <div class="row row-cols-1 row-cols-lg-2">
        <div class="col">
            <p>{{ painting.description }}</p>
        </div>
        <div class="col">
            <p><span class="d-flex justify-content-center fs-1">{{ painting.price }}zł</span></p>
            <div class="container">
                <div class="row m-3 justify-content-center">
                    <a @click.prevent="" role="button" class="col-6 btn btn-warning">Kup teraz</a>
                </div>
                <div class="row m-3 justify-content-center">
                    <button @click.prevent="" type="button" class="col-6 btn btn-primary">Do koszyka</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePaintingsStore } from '../../stores/paintings';
const paintings = usePaintingsStore();
const { id } = defineProps(['id']);
const painting = paintings.getPaintingByID(id);

const getImageURL = () => {
    return new URL(`../../assets/img/${painting.fileName}`, import.meta.url).href;
};

</script>