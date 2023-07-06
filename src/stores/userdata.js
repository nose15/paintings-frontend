import { defineStore } from "pinia";
import apiWrapper from "../api_wrappers/apiPictureShopWrapper";
import { inject } from "vue";
import { LoginRequest } from '../services/requests/LoginRequest.js';
import { LogoutRequest } from "../services/requests/LogoutRequest.js";
import { RegisterRequest } from "../services/requests/RegisterRequest";

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
        const loginRequest = new LoginRequest({email: email, password: password});

        try {
            const token = await loginRequest.send();
            setToken(token);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }

        // TODO: Better error handling, once its settled in the backend
    }
    
    async function logOut() {
        const logoutRequest = new LogoutRequest(bearerToken);

        try {
            const response = await logoutRequest.send();
            deleteToken();
            if (response.ok) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }

    async function register(data) {
        const registerRequest = new RegisterRequest(data);

        try {
            const response = await registerRequest.send();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
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