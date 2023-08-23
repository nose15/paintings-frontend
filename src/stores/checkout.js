import { defineStore } from "pinia";
import { reactive, computed, watch, toRaw } from "vue";
import { OrderService } from "../api/OrderService";
import { useUserDataStore } from "./userdata";
import { useCartStore } from "./shopping_cart";

const data = reactive({
    credentials: {
        name: "",
        email: "",
        phone: "",
    },
    userId: null,
    paymentMethod: "",
    deliveryMethod: "",
    address: {
        city: "",
        postal_code: "",
        address: ""
    },
    companyInfo: {
        isCompany: false,
        company_name: "",
        NIP_number: "",
    },
    extra_info: "",
    product_ids: []
});

export const useCheckoutStore = defineStore('checkout-store', () => {
    

    function setData(newData) {
        for (const key in data) {
            data[key] = newData[key];
        }
    }

    async function createOrder(items) {
        data.product_ids = items
        const response = await OrderService.createOrderAsync(data);
        console.log(response);
    }

    const getCredentials = computed(() => {
        return data.credentials;
    });

    const getUserId = computed(() => {
        return data.userId;
    });

    const getExtraInfo = computed(() => {
        return data.extra_info;
    });

    const getDeliveryMethod = computed(() => {
        return data.deliveryMethod;
    });

    const getPaymentMethod = computed(() => {
        return data.paymentMethod;
    });

    const getAddress = computed(() => {
        return data.address;
    });

    const getCompanyInfo = computed(() => {
        return data.companyInfo;
    });

    const getData = computed(() => {
        return data;
    });

    return { 
        setData,
        createOrder,
        getCredentials,
        getUserId,
        getDeliveryMethod,
        getPaymentMethod,
        getAddress,
        getExtraInfo,
        getCompanyInfo,
        getData
    }; 
});