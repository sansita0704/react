import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
    const [menuItems, setMenuItems] = useState([]);
    const [resInfo, setResInfo] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(MENU_API + resId);
        const data = await response.json();

        let arr = [];

        // Menu Items
        // 1. Get data from API
        arr = data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards;

        // 2. Filter and extract itemCards from the data
        arr = arr
            ?.filter((item, index) => index != 0 && index != 1)
            ?.map((item, index) => item?.card?.card?.itemCards)
            ?.filter(Boolean) // removes undefined/null/false
            ?.flat();

        // arr: array of arrays -> so we do .flat() to convert it to a 1d arr
        /*
        [
            [itemCard1, itemCard2, ...],
            [itemCard3, itemCard4, ...],
            ...
        ]
        */

        // 3. Remove Duplicates
        let uniqueMenuItems = [];

        arr.forEach((item) => {
            if (
                !uniqueMenuItems.find(
                    (x) => x?.card?.info?.id === item?.card?.info?.id
                )
            )
                uniqueMenuItems.push(item);
        });

        setMenuItems(uniqueMenuItems);

        // Restaurant Info
        setResInfo(data?.data?.cards[2]?.card?.card?.info);
    };

    return [menuItems, resInfo];
};

export default useRestaurantMenu;
