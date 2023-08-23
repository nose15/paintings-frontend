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
    items: [],
});

function setItemsCookie() {
    Cookies.set(config.cartCookieName, JSON.stringify(cartData.itemIDs), { expires: config.cartCookieExpirationDays });
}

function isInStock(itemID) {
    return true;
}

function isInCart(itemID) {
    if (cartData.itemIDs.includes(itemID)) {
        return true;
    }
    return false;
}

export const useCartStore = defineStore('cart-store', () => {
    const paintingStore = usePaintingsStore();

    retrieveItemsCookie();

    function addToCart(itemID) {
        const inStock = isInStock(itemID);
        const inCart = isInCart(itemID);

        if (inStock && !inCart) {
            const item = paintingStore.getPaintingByID(itemID);
            
            cartData.itemIDs.push(itemID);
            cartData.items.push(item);

            setItemsCookie();
            return true;
        }
        
        return false;
    }

    function removeFromCart(itemID) {
        const index = cartData.itemIDs.indexOf(itemID);

        if (index != -1) {
            cartData.itemIDs.splice(index, 1);
            cartData.items.splice(index, 1);
            setItemsCookie();
            return true;
        }

        return false;
    }

    const getCartItems = computed(() => {
        return cartData.items;
    });

    const getCartItemIds = computed(() => {
        return cartData.itemIDs;
    })

    const getTotalPrice = computed(() => {
        let total = 0;

        cartData.items.forEach((item) => {
            total += item.price;
        });

        return total.toFixed(2);
    });

    function retrieveItemsCookie() {
        const cookieStr = Cookies.get(config.cartCookieName);
    
        if (cookieStr == undefined) {
            setItemsCookie();
        }
        
        const items = JSON.parse(Cookies.get(config.cartCookieName));
        cartData.itemIDs = items;
    
        items.forEach(id => {
            cartData.items.push(paintingStore.getPaintingByID(id));
        });
        
    }

    return { addToCart, removeFromCart, getCartItems, getTotalPrice, getCartItemIds }
});