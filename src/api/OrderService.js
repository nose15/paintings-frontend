import { ApiWrapper } from "./ApiWrapper";
import { OrderError } from "./utils/OrderError.js";
import { toRaw } from "vue";

async function createOrderAsync(orderData) {
    
    var address = {};
    var company = {};

    if (orderData.deliveryMethod == "pickup") {
        address = {
            city: "AAAAa",
            postal_code: "42132",
            street_name: "Dupa",
            street_number: "12",
            flat_number: "10",
        }
    }
    else {
        address = {
            city: orderData.address.city,
            postal_code: orderData.address.postal_code,
            street_name: "Dupa",
            street_number: "12",
            flat_number: "10",
        }
    }

    if (orderData.companyInfo.isCompany) {
        company.company_name = orderData.companyInfo.name;
        company.NIP = orderData.companyInfo.nip;
    }

    const body = {
        product_id: toRaw(orderData.product_ids),
        first_name: orderData.credentials.name,
        last_name: orderData.credentials.name,
        email: orderData.credentials.email,
        phone: orderData.credentials.phone,
        ...address,
        ...company,
        extraInfo: orderData.extraInfo
    }

    try {
        const response = await ApiWrapper.post('orders', {}, body);
        return response;
    } catch (error) {
        throw new OrderError(error.statusCode, error.message);
    }
}

async function retrieveOrdersAsync(user_id, token) {
    const url = `orders/tracking/${user_id}`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
    };

    try {
        const response = await ApiWrapper.get(url, headers);
        return response;
    } catch (error) {
        throw new OrderError(error.statusCode, error.message);
    }
}


export const OrderService = {
    createOrderAsync,
    retrieveOrdersAsync
}