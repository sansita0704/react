import { createSlice } from "@reduxjs/toolkit";
import { getItemPrice } from "./helpers";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        // action: reducer function

        addItem: (state, action) => {
            // Items are grouped by dish id: adding the same dish again just
            // bumps its quantity instead of creating a duplicate row.
            const dish = action.payload;
            const existing = state.items.find((item) => item.id === dish.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...dish, quantity: 1 });
            }
        },

        removeItem: (state, action) => {
            // Payload is the dish id. Decrements the quantity and drops the
            // row once it reaches zero.
            const id = action.payload;
            const existing = state.items.find((item) => item.id === id);
            if (!existing) return;
            if (existing.quantity > 1) {
                existing.quantity -= 1;
            } else {
                state.items = state.items.filter((item) => item.id !== id);
            }
        },

        deleteItem: (state, action) => {
            // Removes the whole line regardless of quantity (the trash action).
            state.items = state.items.filter(
                (item) => item.id !== action.payload,
            );
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;

// ---------- Selectors ----------

export const selectCartItems = (store) => store.cart.items;

// Total number of dishes in the cart (sum of quantities), used for the
// header badge.
export const selectCartCount = (store) =>
    store.cart.items.reduce((count, item) => count + item.quantity, 0);

// Grand total of the cart in rupees.
export const selectCartTotal = (store) =>
    store.cart.items.reduce(
        (total, item) => total + (getItemPrice(item) / 100) * item.quantity,
        0,
    );

export default cartSlice.reducer;
