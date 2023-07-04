import { defineStore } from "pinia";

// more functionality will come once there's an endpoint for retrieving user data

const bearerTokenKey = "token"

function checkBearerToken() {
    let currentToken = localStorage.getItem(bearerTokenKey);
    if (!tokenLoggedIn(currentToken)) {
        // clear local user data
        return null;
    }
    return currentToken;
}

function tokenLoggedIn(token) {
    // request to API that checks if the token is still available
    return true;
}

let bearerToken = checkBearerToken();

export const useUserDataStore = defineStore('user-data', () => {
    function setToken(token) {
        bearerToken = token;
        localStorage.setItem(bearerTokenKey, bearerToken);
    }

    function getToken() {
        return bearerToken;
    }

    function deleteToken() {
        bearerToken = null;
        localStorage.setItem(bearerTokenKey, bearerToken)
    }

    return { setToken, getToken, deleteToken };
});