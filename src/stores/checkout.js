import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

const addressData = reactive({
    city: "",
    postal_code: "",
    street: "",
    house_number: "",
    flat_number: "",

    is_company: false,
    company_name: "",
    NIP_number: "",
    extra_info: "",
});

const paymentMethod = ref("");

export const useCheckoutStore = defineStore('checkout-store', () => {
    function setAddressData(newData) {
        for (const [key, value] of Object.entries(newData)) {
            addressData[key] = value;
        };
    }

    function setPaymentMethod(newPaymentMethod) {
        paymentMethod.value = newPaymentMethod;
    }

    const getAddressData = computed(() => {
        return addressData;
    });

    const getPaymentMethod = computed(() => {
        return paymentMethod.value;
    })

    return { setPaymentMethod, setAddressData, getPaymentMethod, getAddressData }; 
});