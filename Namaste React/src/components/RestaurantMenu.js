import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import { RES_IMG_BASE_URL, MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [resInfo, setResInfo] = useState({});
    const { resId } = useParams();

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

    if (menuItems.length == 0) return <Shimmer />;

    const {
        name,
        cuisines,
        avgRating,
        sla,
        costForTwoMessage,
        cloudinaryImageId,
    } = resInfo;

    return (
        <div className="menu">
            <div className="menu-header">
                <div className="flex-container res-image-container">
                    <img src={RES_IMG_BASE_URL + cloudinaryImageId}></img>
                </div>
                <div className="res-content">
                    <h1>{name}</h1>
                    <h2>{cuisines?.join(", ")}</h2>
                    <div className="res-info">
                        <span className="food-rating">
                            {avgRating}
                            <i
                                className="bi bi-star-fill"
                                style={{ marginLeft: "0.6rem" }}
                            ></i>
                        </span>
                        <span>•</span>
                        <span>{sla?.slaString}</span>
                        <span>•</span>
                        <span>{costForTwoMessage}</span>
                    </div>
                </div>
            </div>

            <div className="menu-body">
                <h2>Recommended</h2>
                <p>
                    {menuItems.length +
                        (menuItems.length == 1 ? " Item" : " Items")}
                </p>

                {menuItems.map((item) => (
                    <MenuCard
                        key={item.card.info.id}
                        resInfo={item.card.info}
                    />
                ))}
            </div>
        </div>
    );
};

export default RestaurantMenu;
