import { defineStore } from "pinia";
import { AuthService } from '../api/AuthService.js';
import { UserService } from "../api/UserService.js";
import { computed, reactive, ref } from "vue";

const bearerTokenKey = "token"
const IDKey = "user_id";

const bearerToken = ref(checkBearerToken());
const id = ref(checkID());
let dataRetrieved = false;

fetchUserData();

const userData = reactive({
    name: "",
    email: "",
    phone: "",
});

async function fetchUserData() {
    if (bearerToken.value != "null") {
        if (!dataRetrieved) {
            const response = await UserService.fetchDataAsync(bearerToken.value, id.value);
            setData(response.data);
        }
    }
}

function checkBearerToken() {
    let currentToken = localStorage.getItem(bearerTokenKey);

    if (currentToken == "null") {
        return "null";
    }

    if (!isTokenLoggedIn(currentToken)) {
        clearData();
        return "null";
    }

    return currentToken;
}

function isTokenLoggedIn(token) {
    AuthService.checkAuthorization(token);
    return true;
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
    setID(null);
    dataRetrieved = false;
}

export const useUserDataStore = defineStore('user-data', () => {

    async function logIn(email, password) {
        const response = await AuthService.loginAsync({email: email, password: password});

        if (response != null) {
            setToken(response.token);
            setID(response.user.id);
            setData(response.user);
            return true;
        }
        else {
            return false;
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
        const registered = await AuthService.registerAsync(data);
        return registered;
    }

    async function deleteProfile() {
        const data = await UserService.deleteProfileAsync(bearerToken.value, id);
        clearData();
    }

    const getID = computed(() => id.value);
    const getData = computed(() => userData);
    const isLoggedIn = computed(() => (bearerToken.value == "null") ? false : true );

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