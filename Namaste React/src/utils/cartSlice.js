import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        // action: reducer function

        addItem: (state, action) => {
            state.items.push(action.payload);
        },

        removeItem: (state, action) => {
            state.items.filter((item) => item != action.payload);
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
