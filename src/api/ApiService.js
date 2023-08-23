import { ApiWrapper } from "./ApiWrapper";
import { ApiError } from "./utils/ApiError";

async function retrievePaintingsAsync() { 
    let data = undefined;

    try {
        data = await ApiWrapper.get('products');
        return data.data;
    } catch (error) {
        console.error(error);
    }
}

async function orderRequestAsync(orderObject) {
    const headers = {
        
    }

    try {
        const response = await ApiWrapper.post('order_request', headers, orderObject);
        return response;

    } catch (error) {
        console.error(error);
    }
}

export const ApiService = {
    retrievePaintingsAsync
}