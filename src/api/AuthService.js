import { ApiWrapper } from "./ApiWrapper";

async function loginAsync(credentials) {
    try {
        const response = await ApiWrapper.post('login', {}, credentials);
        return response.token;
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

export const AuthService = {
    loginAsync,
    logoutAsync,
    registerAsync
}