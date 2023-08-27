<template>
    <div class="container">
        <div class="row m-3">
            <h4>{{ painting.name }}</h4>
        </div>
        <div class="row m-3 justify-content-center">
            <img :src="getImageURL()" class="col-9 mx-auto">
        </div> 
        <div class="row m-3 row-cols-1 row-cols-lg-2">
            <div class="col">
                <p>{{ painting.description }}</p>
            </div>
            <div class="col">
                <p><span class="d-flex justify-content-center fs-1">{{ painting.base_price }} zł</span></p>
                <div class="container">
                    <div class="row m-3 justify-content-center">
                        <a @click.prevent="" role="button" class="col-6 btn btn-warning">Kup teraz</a>
                    </div>
                    <div class="row m-3 justify-content-center">
                        <button @click.prevent="addToCart(id)" type="button" class="col-6 btn btn-primary">Do koszyka</button>
                    </div>
                    <div v-if="errorVisible" id="errorAlert" class="row m-3 justify-content-center">
                        <p class="alert alert-warning col-6 justify-content-center">{{ cartError }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { usePaintingsStore } from '../../stores/paintings.js';
import { useCartStore } from '../../stores/shopping_cart';
const paintings = usePaintingsStore();
const cart = useCartStore();

const { id } = defineProps(['id']);
const painting = paintings.getPaintingByID(id);

const cartError = ref(""); 

async function sleep(seconds) {
    await new Promise(r => setTimeout(r, seconds * 1000));
}

async function setError(message) {
    cartError.value = message;
    await sleep(5);
    cartError.value = "";
}

const errorVisible = computed(() => cartError.value != "" ? true : false);

const getImageURL = () => {
    return new URL(`../../assets/img/obraz1.jpg`, import.meta.url).href;
};

function addToCart(id) {
    const added = cart.addToCart(parseInt(id));
    if (!added) {
        setError("Ten przedmiot jest juz w koszyku");
    }
}

</script>