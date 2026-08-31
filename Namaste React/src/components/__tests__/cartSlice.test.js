import reducer, {
    addItem,
    removeItem,
    deleteItem,
    clearCart,
    selectCartCount,
    selectCartTotal,
} from "../../utils/cartSlice";

const pizza = { id: "p1", name: "Pizza", price: 20000 };
const burger = { id: "b1", name: "Burger", defaultPrice: 15000 };

describe("cartSlice reducer", () => {
    it("adds a new item with quantity 1", () => {
        const state = reducer(undefined, addItem(pizza));
        expect(state.items).toEqual([{ ...pizza, quantity: 1 }]);
    });

    it("groups duplicates by id and bumps quantity", () => {
        let state = reducer(undefined, addItem(pizza));
        state = reducer(state, addItem(pizza));
        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(2);
    });

    it("keeps different dishes as separate lines", () => {
        let state = reducer(undefined, addItem(pizza));
        state = reducer(state, addItem(burger));
        expect(state.items.map((i) => i.id)).toEqual(["p1", "b1"]);
    });

    it("decrements quantity and removes the line at zero", () => {
        let state = reducer(undefined, addItem(pizza));
        state = reducer(state, addItem(pizza)); // qty 2
        state = reducer(state, removeItem("p1")); // qty 1
        expect(state.items[0].quantity).toBe(1);
        state = reducer(state, removeItem("p1")); // gone
        expect(state.items).toHaveLength(0);
    });

    it("removeItem is a no-op for an unknown id", () => {
        const start = { items: [{ ...pizza, quantity: 1 }] };
        const state = reducer(start, removeItem("nope"));
        expect(state.items).toHaveLength(1);
    });

    it("deleteItem drops the whole line regardless of quantity", () => {
        let state = reducer(undefined, addItem(pizza));
        state = reducer(state, addItem(pizza)); // qty 2
        state = reducer(state, deleteItem("p1"));
        expect(state.items).toHaveLength(0);
    });

    it("clearCart empties everything", () => {
        let state = reducer(undefined, addItem(pizza));
        state = reducer(state, addItem(burger));
        state = reducer(state, clearCart());
        expect(state.items).toEqual([]);
    });
});

describe("cart selectors", () => {
    const store = {
        cart: {
            items: [
                { ...pizza, quantity: 2 }, // 2 x ₹200 = ₹400
                { ...burger, quantity: 1 }, // 1 x ₹150 = ₹150
            ],
        },
    };

    it("selectCartCount sums quantities", () => {
        expect(selectCartCount(store)).toBe(3);
    });

    it("selectCartTotal sums line totals in rupees", () => {
        expect(selectCartTotal(store)).toBe(550);
    });
});
