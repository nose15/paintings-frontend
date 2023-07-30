import { defineStore } from "pinia";
import { reactive, computed, watch } from "vue";
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
    isCompany: false,
    deliveryMethod: "",
    address: {
        city: "",
        postal_code: "",
        street: "",
        house_number: "",
        flat_number: "",
    },
    companyInfo: {
        company_name: "",
        NIP_number: "",
    },
    extra_info: ""
});

const cart = reactive({
    items: [],
    total_price: 0,
});

export const useCheckoutStore = defineStore('checkout-store', () => {
    // function setAddressData(newData) {
    //     for (const [key, value] of Object.entries(newData)) {
    //         addressData[key] = value;
    //     };
    // }

    function setData(newData) {
        for (const key in data) {
            data[key] = newData[key];
        }
    }

    const getData = computed(() => {
        return data;
    });

    return { 
        setData,
        getData,
    }; 
});