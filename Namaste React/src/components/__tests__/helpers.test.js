import {
    isVegItem,
    getItemPrice,
    formatPrice,
    filterItemCards,
    getFilteredCategories,
    parseCost,
    filterRestaurants,
    sortRestaurants,
    getBillDetails,
    MENU_FILTERS,
} from "../../utils/helpers";

describe("isVegItem", () => {
    it("reads the vegClassifier attribute", () => {
        expect(isVegItem({ itemAttribute: { vegClassifier: "VEG" } })).toBe(true);
        expect(
            isVegItem({ itemAttribute: { vegClassifier: "NONVEG" } }),
        ).toBe(false);
    });

    it("falls back to the isVeg flag", () => {
        expect(isVegItem({ isVeg: 1 })).toBe(true);
        expect(isVegItem({ isVeg: 0 })).toBe(false);
    });

    it("treats missing info as non-veg", () => {
        expect(isVegItem(undefined)).toBe(false);
        expect(isVegItem({})).toBe(false);
    });
});

describe("getItemPrice / formatPrice", () => {
    it("prefers price over defaultPrice", () => {
        expect(getItemPrice({ price: 24500, defaultPrice: 30000 })).toBe(24500);
        expect(getItemPrice({ defaultPrice: 30000 })).toBe(30000);
        expect(getItemPrice({})).toBe(0);
    });

    it("formats paise into rupees", () => {
        expect(formatPrice(24500)).toBe("₹245");
        expect(formatPrice(24550)).toBe("₹245.50");
        expect(formatPrice(0)).toBe("₹0");
    });
});

describe("menu diet filtering", () => {
    const cards = [
        { card: { info: { id: "1", isVeg: 1 } } },
        { card: { info: { id: "2", isVeg: 0 } } },
        { card: { info: { id: "3", itemAttribute: { vegClassifier: "VEG" } } } },
    ];

    it("returns all cards for the ALL filter", () => {
        expect(filterItemCards(cards, MENU_FILTERS.ALL)).toHaveLength(3);
    });

    it("keeps only veg cards", () => {
        const veg = filterItemCards(cards, MENU_FILTERS.VEG);
        expect(veg.map((c) => c.card.info.id)).toEqual(["1", "3"]);
    });

    it("keeps only non-veg cards", () => {
        const nonveg = filterItemCards(cards, MENU_FILTERS.NONVEG);
        expect(nonveg.map((c) => c.card.info.id)).toEqual(["2"]);
    });

    it("drops categories that become empty and never mutates input", () => {
        const categories = [
            {
                card: {
                    card: {
                        categoryId: "a",
                        itemCards: [{ card: { info: { id: "1", isVeg: 0 } } }],
                    },
                },
            },
            {
                card: {
                    card: {
                        categoryId: "b",
                        itemCards: [{ card: { info: { id: "2", isVeg: 1 } } }],
                    },
                },
            },
        ];
        const result = getFilteredCategories(categories, MENU_FILTERS.VEG);
        expect(result).toHaveLength(1);
        expect(result[0].card.card.categoryId).toBe("b");
        // original untouched
        expect(categories[0].card.card.itemCards).toHaveLength(1);
    });
});

describe("parseCost", () => {
    it("extracts the number from a display string", () => {
        expect(parseCost("₹400 for two")).toBe(400);
        expect(parseCost("₹1,500 for two")).toBe(1500);
    });

    it("sorts unknown costs last", () => {
        expect(parseCost("")).toBe(Number.POSITIVE_INFINITY);
        expect(parseCost(undefined)).toBe(Number.POSITIVE_INFINITY);
    });
});

describe("filterRestaurants", () => {
    const restaurants = [
        { info: { name: "Burger King", avgRating: 3.8 } }, // burger, not top rated
        { info: { name: "Pizza Hut", avgRating: 4.5 } }, // top rated, no burger
        { info: { name: "Veggie Burger Co", avgRating: 4.6 } }, // burger + top rated
    ];

    it("filters by name (case-insensitive, substring)", () => {
        const result = filterRestaurants(restaurants, { searchText: "BUR" });
        expect(result.map((r) => r.info.name)).toEqual([
            "Burger King",
            "Veggie Burger Co",
        ]);
    });

    it("keeps only top rated when requested", () => {
        const result = filterRestaurants(restaurants, { topRatedOnly: true });
        expect(result.map((r) => r.info.name)).toEqual([
            "Pizza Hut",
            "Veggie Burger Co",
        ]);
    });

    it("combines search and rating filters", () => {
        const result = filterRestaurants(restaurants, {
            searchText: "burger",
            topRatedOnly: true,
        });
        expect(result.map((r) => r.info.name)).toEqual(["Veggie Burger Co"]);
    });

    it("returns the full list when no filters are applied", () => {
        expect(filterRestaurants(restaurants, {})).toHaveLength(3);
    });
});

describe("sortRestaurants", () => {
    const restaurants = [
        { info: { name: "A", avgRating: 4.1, costForTwo: "₹300", sla: { deliveryTime: 30 } } },
        { info: { name: "B", avgRating: 4.8, costForTwo: "₹200", sla: { deliveryTime: 20 } } },
        { info: { name: "C", avgRating: 3.5, costForTwo: "₹500", sla: { deliveryTime: 40 } } },
    ];

    it("does not mutate the original array", () => {
        const before = restaurants.map((r) => r.info.name);
        sortRestaurants(restaurants, "rating");
        expect(restaurants.map((r) => r.info.name)).toEqual(before);
    });

    it("sorts by rating high to low", () => {
        expect(
            sortRestaurants(restaurants, "rating").map((r) => r.info.name),
        ).toEqual(["B", "A", "C"]);
    });

    it("sorts by delivery time low to high", () => {
        expect(
            sortRestaurants(restaurants, "deliveryTime").map((r) => r.info.name),
        ).toEqual(["B", "A", "C"]);
    });

    it("sorts by cost both ways", () => {
        expect(
            sortRestaurants(restaurants, "costLow").map((r) => r.info.name),
        ).toEqual(["B", "A", "C"]);
        expect(
            sortRestaurants(restaurants, "costHigh").map((r) => r.info.name),
        ).toEqual(["C", "A", "B"]);
    });

    it("keeps original order for relevance", () => {
        expect(
            sortRestaurants(restaurants, "relevance").map((r) => r.info.name),
        ).toEqual(["A", "B", "C"]);
    });
});

describe("getBillDetails", () => {
    it("returns zeros for an empty cart", () => {
        expect(getBillDetails([])).toEqual({
            itemTotal: 0,
            deliveryFee: 0,
            taxes: 0,
            grandTotal: 0,
        });
    });

    it("charges delivery below the free threshold", () => {
        // one item at ₹100, qty 2 => ₹200 item total
        const bill = getBillDetails([{ price: 10000, quantity: 2 }]);
        expect(bill.itemTotal).toBe(200);
        expect(bill.deliveryFee).toBe(40);
        expect(bill.taxes).toBe(10); // 5% of 200
        expect(bill.grandTotal).toBe(250);
    });

    it("gives free delivery at or above the threshold", () => {
        const bill = getBillDetails([{ price: 50000, quantity: 1 }]);
        expect(bill.itemTotal).toBe(500);
        expect(bill.deliveryFee).toBe(0);
        expect(bill.taxes).toBe(25);
        expect(bill.grandTotal).toBe(525);
    });
});
