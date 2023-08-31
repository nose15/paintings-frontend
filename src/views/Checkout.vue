<template>
    <div class="row">
        <div class="col-6">
            <div class="row">
                <h3>Dane osobowe</h3>
                <label for="name">Imię i nazwisko</label>
                <input id="name" v-model="data.credentials.name">
                <div class="form-text text-danger">{{ errors.credentials.name }}</div>

                <label for="is_company">Kupuję jako</label>
                <div id="is_company">
                    <label for="os_prywatna">Os. prywatna</label>
                    <input id="os_prywatna" type="radio" name="is_company" :checked="!data.isCompany" @click="data.isCompany=false">
                    <label for="firma">Firma</label>
                    <input id="firma" type="radio" name="is_company" :checked="data.isCompany" @click="data.isCompany=true">
                </div>
                <div class="row" v-if="data.isCompany">
                    <label for="companyName">Nazwa firmy</label>
                    <input id="companyName" v-model="data.companyInfo.company_name">
                    <div class="form-text text-danger">{{ errors.company.name }}</div>
                    <label for="NIPnumber">Nr NIP</label>
                    <input id="NIPnumber" v-model="data.companyInfo.NIP_number" v-maska data-maska="##########">
                    <div class="form-text text-danger">{{ errors.company.nip }}</div>
                </div>
            </div>
            <div class="row">
                <h3>Informacje kontaktowe</h3>
                <label for="email">Adres email</label>
                <input id="email" v-model="data.credentials.email">
                <div class="form-text text-danger">{{ errors.credentials.email }}</div>
                <label for="phone">Numer telefonu</label>
                <input id="phone" v-model="data.credentials.phone" v-maska data-maska="#########">
                <div class="form-text text-danger">{{ errors.credentials.phone }}</div>
            </div>
            <div class="row">
                <h3>Dostawa</h3>
                <label for="deliveryMethod">Sposób dostarczenia</label>
                <div id="deliveryMethod">
                    <label for="spedition">Wysyłka</label>
                    <input id="spedition" type="radio" name="delMethod" @click="data.deliveryMethod='spedition'">
                    <label for="pickup">Odbiór Osobity</label>
                    <input id="pickup" type="radio" name="delMethod" @click="data.deliveryMethod='pickup'">
                    <div class="form-text text-danger">{{ errors.delivery }}</div>
                </div>
                <div v-if="data.deliveryMethod=='spedition'">
                    <div class="row">
                        <label for="streetInput">Adres</label>
                        <input id="streetInput" v-model="data.address.address">
                        <div class="form-text text-danger">{{ errors.address.address }}</div>
                        <label for="cityInput">Miasto</label>
                        <input id="cityInput" v-model="data.address.city">
                        <div class="form-text text-danger">{{ errors.address.city }}</div>
                        <label for="zipCodeInput">Kod pocztowy</label>
                        <input id="zipCodeInput" v-model="data.address.postal_code" v-maska data-maska="##-###">
                        <div class="form-text text-danger">{{ errors.address.postalCode }}</div>
                    </div>
                </div>
                <div v-if="data.deliveryMethod=='pickup'">
                    <div class="row">
                        <p>Tutaj będzie pokazany adres i mapka z googla</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <h3>Płatność</h3>
                <div id="payment_element"></div>
            </div>
        </div>
        <div class="col-4 ms-auto">
            <div class="row">
                <h3>Zawartosc Koszyka</h3>
                <ul>
                    <li v-for="item in items">
                        <p>{{ item.name }} <span class="fs-5">{{ item.base_price }} zł</span></p>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div>
                    <p class="fs-3">Razem <strong>{{ totalPrice }} zł</strong></p>
                    <div v-if="!loggedIn">
                        <button class="btn btn-success" @click.prevent="loginCheckout()">Zaloguj się</button>
                        <button class="btn btn-info" @click.prevent="summary()">Zapłać jako gość</button>
                    </div>
                    <div v-else>
                        <button class="btn btn-warning" @click.prevent="summary()">Zapłać</button>
                    </div>

                </div>
            </div>
            <div id="payment-element"></div>
        </div>
    </div>
    <div class="row">
        
    </div>
</template>

<script setup>
import { reactive, ref, inject, computed, watch } from 'vue';
import { validateEmail, validateName, validateAddress, validateCity, validateZipCode, validateNip, validatePhoneNumber } from './utils';
import { useCartStore } from '../stores/shopping_cart';
import { useUserDataStore } from '../stores/userdata';
import { useCheckoutStore } from '../stores/checkout';
import { vMaska } from "maska"

import { useRouter } from 'vue-router'

const router = useRouter();
const stripe = inject('$stripe');

const userStore = useUserDataStore();
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();

const items = cartStore.getCartItems;
const totalPrice = cartStore.getTotalPrice;

const loggedIn = userStore.isLoggedIn;

// const clientSecret = cartStore.getClientSecret;
// const elements = stripe.elements({clientSecret: clientSecret});
// elements.paymentElement = elements.create('payment');
// elements.paymentElement.mount('#payment-element');

const data = reactive({
    credentials: {
        name: "",
        email: "",
        phone: "",
    },
    userId: null,
    paymentMethod: "",
    deliveryMethod: "",
    address: {
        city: "",
        postal_code: "",
        address: ""
    },
    companyInfo: {
        isCompany: false,
        company_name: "",
        NIP_number: "",
    },
    extra_info: ""
});

const errors = reactive({
    credentials: {
        name: "",
        email: "",
        phone: "",
    },
    address: {
        address: "",
        postalCode: "",
        city: "",
    },
    company: {
        name: "",
        nip: "",
    },
    delivery: "",
    payment: "",
});

watch(data, (oldData, newData) => {
    clearErrors();
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
        const addrValid = validateAddress(data.address.address);
        const postalCodeValid = validateZipCode(data.address.postal_code);
        const cityValid = validateCity(data.address.city);

        if (addrValid != true) {
            errors.address.address = addrValid;
            valid = false;
        }

        if (postalCodeValid != true) {
            errors.address.postalCode = postalCodeValid;
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
        return;
    }
}

function clearErrors() {
    errors.credentials = {
        name: "",
        email: "",
        phone: "",
    }

    errors.address = {
        address: "",
        postalCode: "",
        city: "",
    }

    errors.company = {
        name: "",
        nip: "",
    }

    errors.delivery = ""

    errors.payment = ""
}

function validate() {
    var valid = true;

    if (!credsValid()){
        valid = false;
    }

    if (!addressValid()) {
        valid = false;
    }

    if (!companyValid()) {
        valid = false;
    }

    if (!deliveryValid()) {
        valid = false;
    }

    if (!paymentValid()) {
        valid = false;
    }

    return valid;
}

</script>