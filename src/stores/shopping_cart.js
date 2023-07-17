import { defineStore } from "pinia";
import { computed, reactive, ref, setBlockTracking } from "vue";
import utils from "./utils.js"
import Cookies from "js-cookie";
import { usePaintingsStore } from './paintings.js';

const config = {
    cartCookieName: "cartItems",
    cartCookieExpirationDays: 1
}

const cartData = reactive({
    total: 0,
    itemIDs: [],
    guest: true,
    userID: null,
});

function retrieveItemsCookie() {
    const cookieStr = Cookies.get(config.cartCookieName);

    if (cookieStr == undefined) {
        setItemsCookie();
    }
    
    const items = JSON.parse(Cookies.get(config.cartCookieName));
    cartData.itemIDs = items;
}

function setItemsCookie() {
    Cookies.set(config.cartCookieName, JSON.stringify(cartData.itemIDs), { expires: config.cartCookieExpirationDays });
}

function isInStock(itemID) {
    return true;
}

retrieveItemsCookie();

export const useCartStore = defineStore('cart-store', () => {
    const paintingStore = usePaintingsStore();

    function addToCart(itemID) {
        const inStock = isInStock(itemID);

        if (inStock) {
            cartData.itemIDs.push(itemID);
            setItemsCookie();
            return true;
        }
        
        return false;
    }

    function removeFromCart(itemID) {
        const index = cartData.itemIDs.indexOf(itemID);

        if (index != -1) {
            cartData.itemIDs.splice(index, 1);
            setItemsCookie();
            return true;
        }

        return false;
    }

    const getCartItems = computed(() => {
        let cartItems = [];

        cartData.itemIDs.forEach(id => {
            cartItems.push(paintingStore.getPaintingByID(id))
        });

        return cartItems;
    });

    return { addToCart, removeFromCart, getCartItems }
});