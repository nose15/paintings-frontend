import { defineStore } from "pinia";
import apiWrapper from "../api_wrappers/apiPictureShopWrapper";
import { inject } from "vue";

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

async function logInRequest(email, password) {
    const response = await apiWrapper.postData("login", {email: email, password: password});

    if (response.ok) {
        const token = await response.json();
        return token.token;
    }
    else {
        // once the errors are consistent, error handling will be added
        throw new Error("Something went wrong");
    }

}

async function logOutRequest() {
    const token = bearerToken;
    const response = await apiWrapper.postData("logout", {}, {"Authorization" : `Bearer ${token}`, "Accept":"application/json" });

    if (!response.ok) {
        throw new Error("Something went wrong");
    }
}

let bearerToken = checkBearerToken();

export const useUserDataStore = defineStore('user-data', () => {

    async function logIn(email, password) {
        try {
            const token = await logInRequest(email, password);
            setToken(token);
            return true;
        }
        catch (error) {
            return false;
        }

        // TODO: Better error handling, once its settled in the backend
    }
    
    async function logOut() {
        try {
            await logOutRequest();
            deleteToken();
            return true;
        }
        catch (error) {
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

    return { setToken, getToken, deleteToken, isLoggedIn, logIn, logOut };
});