import { defineStore } from "pinia";
import { AuthService } from '../api/AuthService.js';
import { UserService } from "../api/UserService.js";
import { computed, reactive, ref } from "vue";

const bearerTokenKey = "token"
const IDKey = "user_id";

const userData = reactive({
    name: "",
    email: "",
    phone: "",
    orders: [],
});

const id = ref(checkID());
const bearerToken = ref(localStorage.getItem(bearerTokenKey));

let dataRetrieved = false;

await checkBearerToken();
await fetchData();

async function fetchData() {
    if (bearerToken.value != "null") {
        if (!dataRetrieved) {
            const responseData = await UserService.fetchDataAsync(bearerToken.value, id.value);
            const responseOrders = await UserService.fetchOrdersAsync(bearerToken.value, id.value);
            setOrders(responseOrders);
            setData(responseData.data);
        }
    }
}

async function checkBearerToken() {
    let currentToken = localStorage.getItem(bearerTokenKey);
    let currentID = localStorage.getItem(IDKey);

    if (currentToken == "null" || currentID == "null") {
        clearData();
        return false;
    }

    const isLoggedIn = await isTokenLoggedIn(currentToken)

    if (!isLoggedIn) {
        clearData();
    }

    return true;
}

async function isTokenLoggedIn(token) {
    const isLogged = await AuthService.checkAuthorization(token);
    return isLogged;
}

function checkID() {
    let currentID = localStorage.getItem(IDKey);
    return currentID;
}

function setToken(token) {
    bearerToken.value = token;
    localStorage.setItem(bearerTokenKey, bearerToken.value);
}

function setID(newID) {
    id.value = newID;
    localStorage.setItem(IDKey, newID);
}

function setData(dataObject) {
    userData.name = dataObject.name,
    userData.email = dataObject.email,
    userData.phone = dataObject.phone
    dataRetrieved = true;
}

function clearData() {
    userData.name = "",
    userData.email = "",
    userData.phone = "",
    setID("null");
    setToken("null");
    dataRetrieved = false;
}

function setOrders(ordersObject) {
    userData.orders = ordersObject;
}

export const useUserDataStore = defineStore('user-data', () => {
    async function logIn(email, password) {

        try {
            const response = await AuthService.loginAsync({email: email, password: password});
            setToken(response.token);
            setID(response.user.id);
            setData(response.user);

            const orders = await UserService.fetchOrdersAsync(bearerToken.value, id.value);
            setOrders(orders);
            return true;
        } 
        catch (error) {
            return error.statusCode;
        }
    }
    
    async function logOut() {
        const loggedOut = await AuthService.logoutAsync(bearerToken.value);

        if (loggedOut) {
            setToken("null");
            clearData();
            return true;
        }
        else {
            return false;
        }

    }

    async function register(data) {
        try {
            const response = await AuthService.registerAsync(data);
            setToken(response.token);
            setID(response.user.id);
            setData(response.user);

            const orders = await UserService.fetchOrdersAsync(bearerToken.value, id.value);
            setOrders(orders);
            return true;
        }
        catch (error) {
            return error.statusCode;
        }
    }

    async function deleteProfile() {
        const deleted = await UserService.deleteProfileAsync(bearerToken.value, id.value);
        
        if (deleted) {
            clearData();
            return true;
        }
        else {
            return false;
        }
    }

    const getID = computed(() => id.value);
    const getData = computed(() => userData);

    const isLoggedIn = computed(() => {
        if (bearerToken.value == "null") {
            return false;
        }
        else {
            return true;
        }
    });

    return { 
        getID,
        isLoggedIn,
        getData,
        logIn, 
        logOut, 
        register,
        deleteProfile,
    };
});