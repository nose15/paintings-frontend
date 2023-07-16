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

async function fetchOrdersAsync(token, id) {
    // const requestHeaders = {
    //     "Authorization": `Bearer ${token}`,
    // }

    // try {
    //     const response = ApiWrapper.get(`user/${id}/orders`, requestHeaders);
    //     return response;
    // }
    // catch (error) {
    //     console.error(error)
    // }
    /* The code above will be used once the api has an appropriate endpoint, for now we use mock data */
    const ordersResponse = await fetch('/orders.json');
    const orders = await ordersResponse.json();
    return orders;
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
    fetchOrdersAsync,
    deleteProfileAsync,
    allUsers,
}