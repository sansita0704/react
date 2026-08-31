import { loadCartState, saveCartState } from "../../utils/cartStorage";

beforeEach(() => {
    localStorage.clear();
});

describe("cartStorage", () => {
    it("returns undefined when nothing is stored", () => {
        expect(loadCartState()).toBeUndefined();
    });

    it("round-trips a saved cart", () => {
        const cart = { items: [{ id: "p1", name: "Pizza", quantity: 2 }] };
        saveCartState(cart);
        expect(loadCartState()).toEqual(cart);
    });

    it("ignores malformed JSON", () => {
        localStorage.setItem("foodify.cart", "{not-json");
        expect(loadCartState()).toBeUndefined();
    });

    it("ignores a stored value with the wrong shape", () => {
        localStorage.setItem("foodify.cart", JSON.stringify({ foo: "bar" }));
        expect(loadCartState()).toBeUndefined();
    });
});
