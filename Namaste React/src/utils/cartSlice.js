import { createSlice, nanoid } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        // action: reducer function

        addItem: (state, action) => {
            // Each cart entry gets its own id so duplicates of the same
            // dish stay distinct (used as the React key in Cart).
            state.items.push({ ...action.payload, cartItemId: nanoid() });
        },

        removeItem: (state, action) => {
            // Payload is the entry's cartItemId, so exactly the
            // clicked row is removed even when duplicates exist.
            state.items = state.items.filter(
                (item) => item.cartItemId != action.payload,
            );
        },

        clearCart: (state) => {
            return {
                items: [],
            };
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
