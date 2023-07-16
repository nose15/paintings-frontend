<template>
    <h1>Odwołaj zamówienie</h1>
    <div class="container">
        <form class="row">
                <div class="mb-3 col-4">
                    <label for="passwordInput" class="form-label">Id zamówienia</label>
                    <input type="text" disabled class="form-control" :value="orderId">
                </div>
                <div class="mb-3 col-4">
                    <label for="emailInput" class="form-label">Adres Email</label>
                    <input v-model="data.email" type="email" class="form-control" id="emailInput" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">Na ten adres email wyślemy odpowiedź na twoje odwołanie</div>
                </div>
                <div class="mb-3 col-4">
                    <label for="passwordInput" class="form-label">Imię i nazwisko</label>
                    <input v-model="data.password" type="text" class="form-control" id="nameInput">
                </div>
                <div class="mb-3 col-8 mx-auto">
                    <label for="messageInput" class="form-label">Wiadomość</label>
                    <textarea v-model="data.message" type="text" class="form-control" id="messageInput" rows="10" autofocus>
                    </textarea>
                </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
        <div class="row d-flex align-items-center mx-auto">
            <button @click.prevent="onButtonClicked" type="submit" class="btn btn-danger col-lg-4">Wyślij</button>
        </div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useUserDataStore } from '../../stores/userdata';

const { orderId } = defineProps(['orderId']);
const userData = useUserDataStore();

const data = reactive({
    name: userData.getData.name,
    email: userData.getData.email,
    message: ""
});

data.message = `Dzień dobry.
Proszę o odwołanie mojego zamówienia nr ${orderId}.
Pozdrawiam ${data.name}
`



</script>