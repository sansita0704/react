import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
    const [categories, setCategories] = useState([]);
    const [resInfo, setResInfo] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(MENU_API + resId);
        const data = await response.json();
        console.log("DATA: ", data);

        // Menu Items
        // 1. Get data from API
        let cards =
            data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards;

        // 2. Filter cards
        cards = cards.filter(
            (item) =>
                item.card?.card?.["@type"] ===
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );

        console.log("CARDS: ", cards);

        setCategories(cards);

        // Restaurant Info
        setResInfo(data?.data?.cards[2]?.card?.card?.info);
    };

    return [categories, resInfo];
};

export default useRestaurantMenu;
