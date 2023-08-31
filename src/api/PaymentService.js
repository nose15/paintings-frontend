import { ApiWrapper } from "./ApiWrapper";
import { PaymentError } from "./utils/PaymentError";

async function createPaymentIntent(cartData) {
    try {
        const response = await ApiWrapper.post('intent', {}, cartData);
        return response.clientSecret;
    } catch (error) {
        throw new PaymentError(error.statusCode, error.message);
    }
}

async function updatePaymentIntent(clientSecret, cartData) {
    const body = {
        clientSecret: clientSecret,
        cartData: cartData
    }

    try {
        const response = await ApiWrapper.post('intent', {}, body);
        return response.clientSecret;
    } catch (error) {
        throw new PaymentError(error.statusCode, error.message);
    }
}

export const PaymentService = {
    createPaymentIntent,
    updatePaymentIntent,
};