import { defineStore } from "pinia";
import { AuthService } from '../api/AuthService.js';

// more functionality will come once there's an endpoint for retrieving user data
const bearerTokenKey = "token"

function checkBearerToken() {
    let currentToken = localStorage.getItem(bearerTokenKey);
    if (!tokenLoggedIn(currentToken)) {
        // clear local user data
        return "null";
    }
    return currentToken;
}

function tokenLoggedIn(token) {
    // request to API that checks if the token is still available
    return true;
}

let bearerToken = checkBearerToken();

export const useUserDataStore = defineStore('user-data', () => {

    async function logIn(email, password) {
        const token = await AuthService.loginAsync({email: email, password: password});

        if (token != null) {
            setToken(token);
            return true;
        }
        else {
            return false;
        }
    }
    
    async function logOut() {
        const loggedOut = await AuthService.logoutAsync(bearerToken);

        if (loggedOut) {
            deleteToken();
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


    function setToken(token) {
        bearerToken = token;
        localStorage.setItem(bearerTokenKey, bearerToken);
    }

    function getToken() {
        return bearerToken;
    }

    function deleteToken() {
        bearerToken = "null";
        localStorage.setItem(bearerTokenKey, bearerToken);
    }

    function isLoggedIn() {
        return bearerToken == "null" ? false : true
    }

    return { setToken, getToken, deleteToken, isLoggedIn, logIn, logOut, register };
});