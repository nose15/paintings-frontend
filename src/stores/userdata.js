import { defineStore } from "pinia";
import { AuthService } from '../api/AuthService.js';
import { UserService } from "../api/UserService.js";
import { useOrderStore } from "./order_store.js";
import { computed, reactive, ref } from "vue";
import { OrderService } from "../api/OrderService.js";

const bearerTokenKey = "token"
const IDKey = "user_id";

const userData = reactive({
    name: "",
    email: "",
    phone: "",
});

const id = ref(checkID());
const bearerToken = ref(localStorage.getItem(bearerTokenKey));

let dataRetrieved = false;

await checkBearerToken();

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


export const useUserDataStore = defineStore('user-data', () => {
    const orderStore = useOrderStore();

    async function logIn(email, password) {

        try {
            const response = await AuthService.loginAsync({email: email, password: password});
            setToken(response.token);
            setID(response.user.id);
            setData(response.user);
            await orderStore.retrieveOrders(response.user.id, response.token);
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
            await orderStore.retrieveOrders(response.user.id, response.token);
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
    const getToken = computed(() => bearerToken.value);

    const isLoggedIn = computed(() => {
        if (bearerToken.value == "null") {
            return false;
        }
        else {
            return true;
        }
    });

    async function fetchData() {
        if (bearerToken.value != "null") {
            if (!dataRetrieved) {
                const responseData = await UserService.fetchDataAsync(bearerToken.value, id.value);
                orderStore.retrieveOrders(id.value, bearerToken.value);
                setData(responseData.data);
            }
        }
    }

    fetchData();

    return { 
        getID,
        isLoggedIn,
        getData,
        getToken,
        logIn, 
        logOut, 
        register,
        deleteProfile,
    };
});