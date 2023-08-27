import { defineStore } from "pinia"; 
import { OrderService } from "../api/OrderService";
import { computed, reactive, ref, setBlockTracking } from "vue";
import { useUserDataStore } from './userdata';

const orders = ref({data: {}});
let dataRetrieved = false;

export const useOrderStore = defineStore('order_store', () => {
    const userDataStore = useUserDataStore();

    async function retrieveOrders() {
        const response = await OrderService.retrieveOrdersAsync(userDataStore.getID, userDataStore.getToken);
        orders.value = response;
    }

    console.log('orderstore');

    if (localStorage.getItem('token') != "null" && localStorage.getItem('id') != "null" && !dataRetrieved){
        retrieveOrders();
        dataRetrieved = true;
    }


    const getOrders = computed(() => orders.value);

    function getOrderById(id) {
        for (const order in orders.value.data) {
            if (order.id == id) {
                return order;
            }
        }

        return undefined;
    }

    return {
        retrieveOrders,
        getOrders,
        getOrderById,
    };
})