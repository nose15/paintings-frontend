<template>
    <div class="row">
        <div class="col-5">
            <h4>Adres do wysyłki</h4>
            <form>
                <div>
                    <div>
                        <div class="row">
                            <label for="streetInput">Ulica</label>
                            <input id="streetInput">
                            <label for="houseNumberInput">Numer budynku</label>
                            <input id="houseNumberInput">
                            <label for="flatNumberInput">Numer Lokalu</label>
                            <input id="flatNumberInput">
                            <label for="zipCodeInput">Kod pocztowy</label>
                            <input id="zipCodeInput">
                            <label for="cityInput">Miasto</label>
                            <input id="cityInput">
                            <label for="is_"></label>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div v-if="data.is_company">

                    </div>
                </div>
            </form>
        </div>
        <div class="col-4 ms-auto">
            <h4>Zawartosc Koszyka</h4>
            <ul>
                <li v-for="item in items">
                    <p>{{ item.name }} <span class="fs-5">{{ item.price }} zł</span></p>
                </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-5">
            <h4>Wybierz formę płatności</h4>
            <form>
                <div>
                    <input id="przelew" type="radio" name="paymentMethod">
                    <label for="przelew">Przelew</label>
                </div>
                <div>
                    <input id="karta" type="radio" name="paymentMethod">
                    <label for="karta">Karta</label>
                </div>
                <div>
                    <input id="paypal" type="radio" name="paymentMethod">
                    <label for="paypal">Paypal</label>
                </div>
            </form>
        </div>
        <div class="col-4 ms-auto">
            <p class="fs-3">Razem {{ totalPrice }}</p>
            <button class="btn btn-warning">Kupuję i płacę</button>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useCartStore } from '../stores/shopping_cart';

const cartStore = useCartStore();
const items = cartStore.getCartItems;
const totalPrice = cartStore.getTotalPrice;

const data = reactive({
    city: "",
    postal_code: "",
    street: "",
    house_number: "",
    flat_number: "",

    is_company: false,
    company_name: "",
    NIP_number: "",
    extra_info: "",
});




</script>