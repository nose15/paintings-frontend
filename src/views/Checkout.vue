<template>
    <div class="row">
        <div class="col-5">
            <div class="row">
                <h4>Adres do wysyłki</h4>
                <form>
                    <div>
                        <div>
                            <div class="row">
                                <label for="streetInput">Ulica</label>
                                <input id="streetInput" v-model="data.street">
                                <label for="houseNumberInput">Numer budynku</label>
                                <input id="houseNumberInput" v-model="data.house_number">
                                <label for="flatNumberInput">Numer Lokalu</label>
                                <input id="flatNumberInput" v-model="data.flat_number">
                                <label for="zipCodeInput">Kod pocztowy</label>
                                <input id="zipCodeInput" v-model="data.postal_code">
                                <label for="cityInput">Miasto</label>
                                <input id="cityInput" v-model="data.city">
                                <label for="is_company">Kupuję jako</label>
                                <div id="is_company">
                                    <label for="os_prywatna">Os. prywatna</label>
                                    <input id="os_prywatna" type="radio" name="is_company" @click="data.is_company=false">
                                    <label for="firma">Firma</label>
                                    <input id="firma" type="radio" name="is_company" @click="data.is_company=true">
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if="data.is_company">
                            <label for="companyName">Nazwa firmy</label>
                            <input id="companyName" v-model="data.company_name">
                            <label for="NIPnumber">Nr NIP</label>
                            <input id="NIPnumber" v-model="data.NIP_number">
                        </div>
                        <div class="row">
                            <label for="extra_info">Dodatkowe Informacje</label>
                            <textarea id="extra_info" v-model="data.extra_info" rows="5" maxlength="255"></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="col-4 ms-auto">
            <div class="row">
                <h4>Zawartosc Koszyka</h4>
                <ul>
                    <li v-for="item in items">
                        <p>{{ item.name }} <span class="fs-5">{{ item.price }} zł</span></p>
                    </li>
                </ul>
            </div>
            <div class="row">
                <h4>Wybierz formę płatności</h4>
                <form>
                    <div>
                        <input id="przelew" type="radio" name="paymentMethod" value="transfer" v-model="paymentMethod">
                        <label for="przelew">Przelew</label>
                    </div>
                    <div>
                        <input id="karta" type="radio" name="paymentMethod" value="card" v-model="paymentMethod">
                        <label for="karta">Karta</label>
                    </div>
                    <div>
                        <input id="paypal" type="radio" name="paymentMethod" value="paypal" v-model="paymentMethod">
                        <label for="paypal">Paypal</label>
                    </div>
                </form>
            </div>
            <div class="row">
                <div>
                    <p class="fs-3">Razem {{ totalPrice }}</p>
                    <div v-if="!loggedIn">
                        <button class="btn btn-success" @click.prevent="loginCheckout()">Zaloguj się</button>
                        <button class="btn btn-info" @click.prevent="summary()">Kup jako gość</button>
                    </div>
                    <div v-else>
                        <button class="btn btn-warning" @click.prevent="summary()">Podsumowanie</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, inject } from 'vue';
import { useCartStore } from '../stores/shopping_cart';
import { useUserDataStore } from '../stores/userdata';
import { useCheckoutStore } from '../stores/checkout';

import { useRouter } from 'vue-router'

const router = useRouter();
const eventBus = inject("$eventBus");

const userStore = useUserDataStore();
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();

const items = cartStore.getCartItems;
const totalPrice = cartStore.getTotalPrice;

const data = reactive(checkoutStore.getAddressData);
const paymentMethod = ref(checkoutStore.getPaymentMethod);

const loggedIn = ref(userStore.isLoggedIn);

async function loginCheckout() {
    checkoutStore.setAddressData(data);
    checkoutStore.setPaymentMethod(paymentMethod.value)
    router.push({ path: '/zaloguj', query: { redirect: '/kasa' } });
}

async function summary() {
    router.push('/podsumowanie');
}
</script>