<template>
        <div class="col">
            <div class="mx-auto card text-bg-light parent-card">
                <img :src="getImageURL()" class="card-img">
                <div class="card-img-overlay children-card col-6">
                    <h5 class="card-title">{{ painting.name }}</h5>
                    <div class="card-text description-text mb-3" style="">{{ painting.description }}</div>
                    <a @click="goToPaintingView()" role="button" class="btn btn-primary" type="button">Więcej...</a>
                </div>
            </div>
        </div>

</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const { painting } = defineProps(['painting']);
const getImageURL = () => {
    return new URL(`../../assets/img/obraz1.jpg`, import.meta.url).href;
};

function goToPaintingView() {
    router.push(`obrazy/${painting.id}`);
}

</script>

<style scoped>
.description-text {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.children-card {
    opacity: 0;
    transition: opacity 0.3s linear;
    -o-transition: opacity 0.3s linear;
    -ms-transition: opacity 0.3s linear;
    -moz-transition: opacity 0.3s linear;
    -webkit-transition: opacity 0.3s linear;
}

.parent-card:hover > .children-card {
    opacity: 1;
}

@keyframes fadeIN {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>