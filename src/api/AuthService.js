import { ApiWrapper } from "./ApiWrapper";
import { AuthError } from './utils/AuthError.js'

async function loginAsync(credentials) {
    try {
        const response = await ApiWrapper.post('login', {}, credentials);
        return response;
    }
    catch(error) {
        throw new AuthError(error.statusCode, error.message);
    }
}

async function logoutAsync(token) {
    const requestHeaders = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
    }

    try {
        const response = await ApiWrapper.post('logout', requestHeaders, null);
        return response;
    }
    catch(error) {
        throw new AuthError(error.statusCode, error.message);
    }
}

async function registerAsync(data) {
    try {
        const response = await ApiWrapper.post('register', {}, data);
        return response;
    }
    catch(error) {
        throw new AuthError(error.statusCode, error.message);
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