// Pure, framework-free helpers for filtering/sorting/pricing.
// Kept side-effect free so they are easy to unit test in isolation.

// ---------- Menu items ----------

// A dish is vegetarian when Swiggy tags it as such. Different payload
// shapes exist across endpoints, so both are checked.
export const isVegItem = (item) => {
    const classifier = item?.itemAttribute?.vegClassifier;
    if (classifier) return classifier.toUpperCase() === "VEG";
    return item?.isVeg === 1 || item?.isVeg === true;
};

// Prices arrive in paise; `price` is the current price and `defaultPrice`
// the fallback. Returns paise (an integer) so callers control formatting.
export const getItemPrice = (item) => item?.price ?? item?.defaultPrice ?? 0;

// Format paise into a rupee string, e.g. 24500 -> "₹245".
export const formatPrice = (paise) => {
    const rupees = (paise ?? 0) / 100;
    // Only show decimals when they carry information.
    return `₹${Number.isInteger(rupees) ? rupees : rupees.toFixed(2)}`;
};

// Menu diet filter values shared by the UI and the filter logic.
export const MENU_FILTERS = {
    ALL: "all",
    VEG: "veg",
    NONVEG: "nonveg",
};

// Keep only the item cards that match the selected diet filter.
export const filterItemCards = (itemCards = [], dietFilter = MENU_FILTERS.ALL) => {
    if (dietFilter === MENU_FILTERS.ALL) return itemCards;
    const wantVeg = dietFilter === MENU_FILTERS.VEG;
    return itemCards.filter((card) => isVegItem(card?.card?.info) === wantVeg);
};

// Apply the diet filter across every category, dropping categories that end
// up empty so the UI never renders a header with zero items.
export const getFilteredCategories = (categories = [], dietFilter = MENU_FILTERS.ALL) => {
    if (dietFilter === MENU_FILTERS.ALL) return categories;
    return categories
        .map((category) => {
            const inner = category.card.card;
            const itemCards = filterItemCards(inner.itemCards, dietFilter);
            return {
                ...category,
                card: { ...category.card, card: { ...inner, itemCards } },
            };
        })
        .filter((category) => category.card.card.itemCards.length > 0);
};

// ---------- Restaurants ----------

// costForTwo comes as a display string like "₹400 for two"; pull the number
// out for sorting. Unknown/blank costs sort last.
export const parseCost = (costForTwo) => {
    const digits = String(costForTwo ?? "").replace(/[^0-9]/g, "");
    return digits ? Number(digits) : Number.POSITIVE_INFINITY;
};

// Restaurant list filters shared by the UI and the filter logic.
export const filterRestaurants = (
    restaurants = [],
    { searchText = "", topRatedOnly = false } = {},
) => {
    const query = searchText.trim().toLowerCase();
    return restaurants.filter((restaurant) => {
        const info = restaurant?.info ?? {};
        const matchesSearch =
            !query || info.name?.toLowerCase().includes(query);
        const matchesRating = !topRatedOnly || Number(info.avgRating) > 4;
        return matchesSearch && matchesRating;
    });
};

// Sort options shown in the home page dropdown.
export const SORT_OPTIONS = [
    { value: "relevance", label: "Relevance" },
    { value: "rating", label: "Rating (High to Low)" },
    { value: "deliveryTime", label: "Delivery Time (Low to High)" },
    { value: "costLow", label: "Cost (Low to High)" },
    { value: "costHigh", label: "Cost (High to Low)" },
];

// Returns a new, sorted array; never mutates the input list.
export const sortRestaurants = (restaurants = [], sortKey = "relevance") => {
    const list = [...restaurants];
    switch (sortKey) {
        case "rating":
            return list.sort(
                (a, b) => Number(b.info.avgRating) - Number(a.info.avgRating),
            );
        case "deliveryTime":
            return list.sort(
                (a, b) =>
                    (a.info.sla?.deliveryTime ?? Infinity) -
                    (b.info.sla?.deliveryTime ?? Infinity),
            );
        case "costLow":
            return list.sort(
                (a, b) => parseCost(a.info.costForTwo) - parseCost(b.info.costForTwo),
            );
        case "costHigh":
            return list.sort(
                (a, b) => parseCost(b.info.costForTwo) - parseCost(a.info.costForTwo),
            );
        default:
            return list; // relevance keeps the API's original ordering
    }
};

// ---------- Cart bill ----------

export const DELIVERY_FEE = 40; // rupees
export const FREE_DELIVERY_THRESHOLD = 500; // rupees
export const GST_RATE = 0.05; // 5%

// Builds the price breakdown (all values in rupees) from cart items that each
// carry a `quantity`. Kept pure so the numbers can be asserted directly.
export const getBillDetails = (items = []) => {
    const itemTotal = items.reduce(
        (sum, item) => sum + (getItemPrice(item) / 100) * (item.quantity ?? 1),
        0,
    );
    const deliveryFee =
        itemTotal === 0 || itemTotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    const taxes = Math.round(itemTotal * GST_RATE * 100) / 100;
    const grandTotal = Math.round((itemTotal + deliveryFee + taxes) * 100) / 100;
    return { itemTotal, deliveryFee, taxes, grandTotal };
};
