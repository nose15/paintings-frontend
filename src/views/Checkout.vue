<template>
    <div class="row">
        <div class="col-5">
            <div class="row">
                <form>
                    <div class="row">
                        <label for="name">Imię i nazwisko</label>
                        <input id="name" v-model="data.credentials.name">
                        <label for="email">Adres email</label>
                        <input id="email" v-model="data.credentials.email">
                        <label for="phone">Numer telefonu</label>
                        <input id="phone" v-model="data.credentials.phone" v-maska data-maska="#########">
                    </div>
                    <label for="is_company">Kupuję jako</label>
                    <div id="is_company">
                        <label for="os_prywatna">Os. prywatna</label>
                        <input id="os_prywatna" type="radio" name="is_company" @click="data.isCompany=false">
                        <label for="firma">Firma</label>
                        <input id="firma" type="radio" name="is_company" @click="data.isCompany=true">
                    </div>
                    <div class="row" v-if="data.isCompany">
                        <label for="companyName">Nazwa firmy</label>
                        <input id="companyName" v-model="data.companyInfo.company_name">
                        <label for="NIPnumber">Nr NIP</label>
                        <input id="NIPnumber" v-model="data.companyInfo.NIP_number" v-maska data-maska="##########">
                    </div>
                    <div>
                        <label for="deliveryMethod">Sposób dostarczenia</label>
                        <div id="deliveryMethod">
                            <label for="spedition">Wysyłka</label>
                            <input id="spedition" type="radio" name="delMethod" @click="data.deliveryMethod='spedition'">
                            <label for="pickup">Odbiór Osobity</label>
                            <input id="pickup" type="radio" name="delMethod" @click="data.deliveryMethod='pickup'">
                        </div>
                        <div v-if="data.deliveryMethod=='spedition'">
                            <div class="row">
                                <label for="streetInput">Ulica</label>
                                <input id="streetInput" v-model="data.address.street">
                                <label for="houseNumberInput">Numer budynku</label>
                                <input id="houseNumberInput" v-model="data.address.house_number">
                                <label for="flatNumberInput">Numer Lokalu</label>
                                <input id="flatNumberInput" v-model="data.address.flat_number">
                                <label for="zipCodeInput">Kod pocztowy</label>
                                <input id="zipCodeInput" v-model="data.address.postal_code" v-maska data-maska="##-###">
                                <label for="cityInput">Miasto</label>
                                <input id="cityInput" v-model="data.address.city">
                            </div>
                        </div>
                        <div v-if="data.deliveryMethod=='pickup'">
                            <div class="row">
                                <p>Tutaj będzie pokazany adres i mapka z googla</p>
                            </div>
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
                        <input id="przelew" type="radio" name="paymentMethod" value="transfer" v-model="data.paymentMethod">
                        <label for="przelew">Przelew</label>
                    </div>
                    <div>
                        <input id="karta" type="radio" name="paymentMethod" value="card" v-model="data.paymentMethod">
                        <label for="karta">Karta</label>
                    </div>
                    <div>
                        <input id="paypal" type="radio" name="paymentMethod" value="paypal" v-model="data.paymentMethod">
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
import { reactive, ref, inject, computed } from 'vue';
import { validateEmail, validateName, validateHouseNumber, validateCity, validateZipCode, validateNip, validatePhoneNumber } from './utils';
import { useCartStore } from '../stores/shopping_cart';
import { useUserDataStore } from '../stores/userdata';
import { useCheckoutStore } from '../stores/checkout';
import { vMaska } from "maska"

import { useRouter } from 'vue-router'

const router = useRouter();

const userStore = useUserDataStore();
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();

const items = cartStore.getCartItems;
const totalPrice = cartStore.getTotalPrice;

const loggedIn = userStore.isLoggedIn;

const data = checkoutStore.getData;
const errors = reactive({
    credentials: {
        name: "",
        email: "",
        phone: "",
    },
    address: {
        house_number: "",
        postal_code: "",
        city: "",
    },
    company: {
        name: "",
        nip: "",
    },
    delivery: "",
    payment: "",
});

function credsValid() {
    var valid = true;

    const nameValid = validateName(data.credentials.name);
    const emailValid = validateEmail(data.credentials.email);
    const phoneValid = validatePhoneNumber(data.credentials.phone);

    if (nameValid != true) {
        errors.credentials.name = nameValid;
        valid = false;
    }

    if (emailValid != true) {
        errors.credentials.email = emailValid;
        valid = false;
    }

    if (phoneValid != true) {
        errors.credentials.phone = phoneValid;
        valid = false;
    }

    return valid;
}

function addressValid() {
    var valid = true;

    if (data.deliveryMethod == 'spedition') {    
        const houseNumberValid = validateHouseNumber(data.address.house_number);
        const postalCodeValid = validateZipCode(data.address.postal_code);
        const cityValid = validateCity(data.address.city);

        if (houseNumberValid != true) {
            errors.address.house_number = houseNumberValid;
            valid = false;
        }

        if (postalCodeValid != true) {
            errors.address.postal_code = postalCodeValid;
            valid = false;
        }

        if (cityValid != true) {
            errors.address.city = cityValid;
            valid = false;
        }
    }

    return valid;
}

function companyValid() {
    var valid = true;

    if (data.isCompany) {
        const nameValid = validateName(data.companyInfo.company_name);
        const nipValid = validateNip(data.companyInfo.NIP_number);

        if (nameValid != true) {
            errors.company.name = nameValid;
            valid = false;
        }

        if (nipValid != true) {
            errors.company.nip = nipValid;
            valid = false;
        }
    }

    return valid;
}

function deliveryValid() {
    if (data.deliveryMethod == 'pickup' || data.deliveryMethod == 'spedition') {
        return true;
    }
    
    errors.delivery = "Proszę wybrać sposób wysyłki";
    return false;
}

function paymentValid() {
    if (data.paymentMethod.length > 0) {
        return true;
    }
    
    errors.payment = "Proszę wybrać formę płatności";
    return false;
}


if (loggedIn) {
    data.userId = userStore.getID;
}
else {
    data.userId = null;
}

async function loginCheckout() {
    checkoutStore.setData(data);
    router.push({ path: '/zaloguj', query: { redirect: '/kasa' } });
}

async function summary() {
    const formValid = validate();

    if (formValid) {
        checkoutStore.setData(data);
        router.push('/podsumowanie');
    }

    console.log(errors);
}

function validate() {
    if (credsValid() && addressValid() && companyValid() && deliveryValid() && paymentValid()){
        return true;
    }

    return false;
}

</script>