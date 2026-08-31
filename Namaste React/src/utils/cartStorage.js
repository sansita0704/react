// Small persistence layer for the cart so it survives page reloads.
// Every access is guarded: localStorage can be unavailable (SSR, private
// mode, storage disabled) or hold corrupt JSON, and none of that should
// ever crash the app.

const STORAGE_KEY = "foodify.cart";

export const loadCartState = () => {
    try {
        if (typeof localStorage === "undefined") return undefined;
        const serialized = localStorage.getItem(STORAGE_KEY);
        if (!serialized) return undefined;
        const parsed = JSON.parse(serialized);
        // Guard against a malformed/old shape.
        if (!parsed || !Array.isArray(parsed.items)) return undefined;
        return parsed;
    } catch (error) {
        console.warn("Could not read cart from storage:", error);
        return undefined;
    }
};

export const saveCartState = (cartState) => {
    try {
        if (typeof localStorage === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
    } catch (error) {
        console.warn("Could not persist cart to storage:", error);
    }
};
