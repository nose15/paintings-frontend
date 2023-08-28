import { defineStore } from "pinia"; 
import { OrderService } from "../api/OrderService";
import { computed, reactive, ref, setBlockTracking, toRaw } from "vue";
import { useUserDataStore } from './userdata';

const orders = ref();
const ordersRetrieved = ref(false);

export const useOrderStore = defineStore('order_store', () => {
    const userDataStore = useUserDataStore();

    async function retrieveOrders(id, token) {
        try {
            const response = await OrderService.retrieveOrdersAsync(id, token);
            orders.value = response;
            ordersRetrieved.value = true;
            return orders.value;
        } catch (error) {
            return false;
        }
    }

    async function getOrderById(id) {
        try {
            if (!ordersRetrieved.value) {
                await retrieveOrders(userDataStore.getID, userDataStore.getToken);
            }
    
            const ordersArr = toRaw(orders.value).data;
    
            for (const orderId in ordersArr) {
                if (ordersArr[orderId].id == id) {
                    return ordersArr[orderId];
                }
            }
        } catch (error) {
            return false;
        }
    }

    const getOrders = computed(() => orders.value);
q
    return {
        retrieveOrders,
        getOrders,
        getOrderById,
    };
})