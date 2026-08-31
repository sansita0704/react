import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { loadCartState, saveCartState } from "./cartStorage";

// Rehydrate the cart from localStorage so it survives page reloads.
const persistedCart = loadCartState();

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        // user: userReducer,
    },
    preloadedState: persistedCart ? { cart: persistedCart } : undefined,
});

// Persist the cart on every change. Kept outside React so any dispatch
// (from any component) is captured.
appStore.subscribe(() => {
    saveCartState(appStore.getState().cart);
});

export default appStore;
