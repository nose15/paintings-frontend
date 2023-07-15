import { ApiWrapper } from "./ApiWrapper";
import { ApiError } from "./utils/ApiError";

async function fetchDataAsync(token, id) {
    const requestHeaders = {
        "Authorization": `Bearer ${token}`,
    }
    try {
        const data = ApiWrapper.get(`users/${id}`, requestHeaders);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

async function deleteProfileAsync(token, id) {
    const requestHeaders = {
        "Authorization": `Bearer ${token}`,
    }

    try {
        const response = ApiWrapper.delete(`users/${id}`, requestHeaders);
    }
    catch (error) {
        console.error(error);
    }
}

async function allUsers(token) {
    const requestHeaders = {
        "Authorization": `Bearer ${token}`,
    }

    try {
        const response = ApiWrapper.get(`users`, requestHeaders);
    }
    catch (error) {
        console.error(error);
    }
}


export const UserService = {
    fetchDataAsync,
    deleteProfileAsync,
    allUsers
}