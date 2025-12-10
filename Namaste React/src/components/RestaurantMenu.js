import MenuCard from "./MenuCard";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import { RES_IMG_BASE_URL } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
    const { resId } = useParams();

    const [menuItems, resInfo] = useRestaurantMenu(resId);

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
