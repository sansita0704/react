import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
    const [categories, setCategories] = useState([]);
    const [resInfo, setResInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        fetchData();
    }, [resId]);

    const fetchData = async () => {
        try {
            const response = await fetch(MENU_API + resId);
            const data = await response.json();

            // Menu Items
            // 1. Get data from API
            let cards =
                data?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR
                    ?.cards ?? [];

            // 2. Filter cards
            cards = cards.filter(
                (item) =>
                    item.card?.card?.["@type"] ===
                    "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
            );

            setCategories(cards);

            // Restaurant Info
            setResInfo(data?.data?.cards?.[2]?.card?.card?.info ?? {});
        } catch (error) {
            console.error("Failed to fetch the restaurant menu: ", error);
            setFetchError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const retryFetch = () => {
        setFetchError(false);
        setIsLoading(true);
        fetchData();
    };

    return { categories, resInfo, isLoading, fetchError, retryFetch };
};

export default useRestaurantMenu;
