import { ApiWrapper } from "./ApiWrapper";

async function loginAsync(credentials) {
    try {
        const response = await ApiWrapper.post('login', {}, credentials);
        return response;
    }
    catch(error) {
        console.error(error);
        return null;
    }
}

async function logoutAsync(token) {
    const requestHeaders = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
    }

    try {
        const response = ApiWrapper.post('logout', requestHeaders, {});
        return true;
    }
    catch(error) {
        console.error(error);
        return false;
    }
}

async function registerAsync(data) {
    try {
        const response = await ApiWrapper.post('register', {}, data);
        return true;
    }
    catch(error) {
        console.error(error);
        return false;
    }
}

async function checkAuthorization(token) {
    const requestHeaders = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
    }

    try {
        const response = await ApiWrapper.get('check-auth', requestHeaders);
        return response.is_user_auth;
    }
    catch (error) {
        console.error(error);
    }

}

export const AuthService = {
    loginAsync,
    logoutAsync,
    registerAsync,
    checkAuthorization
}