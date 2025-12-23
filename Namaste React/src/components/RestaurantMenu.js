import MenuCard from "./MenuCard";
import Shimmer from "./shimmer/HomeShimmer";
import { useParams } from "react-router";
import { RES_IMG_BASE_URL } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import MenuPageShimmer from "./shimmer/MenuPageShimmer";

const RestaurantMenu = () => {
    const { resId } = useParams();

    const [menuItems, resInfo] = useRestaurantMenu(resId);

    if (menuItems.length == 0)
    return <MenuPageShimmer />;

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
            <div className="menu-header grid grid-cols-2 p-15 items-center bg-[#f5780b33] gap-20">
                <div className="justify-self-end">
                    <img
                        className="rounded-4xl aspect-5/3 object-cover"
                        src={RES_IMG_BASE_URL + cloudinaryImageId}
                    ></img>
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl font-bold">{name}</h1>
                    <h2 className="text-xl">{cuisines?.join(", ")}</h2>
                    <div className="flex gap-3 text-md">
                        <span className="bg-[#079E07] px-1 py-0.5 rounded-md text-white font-bold">
                            {avgRating}
                            <i
                                className="bi bi-star-fill"
                                style={{ marginLeft: "0.3rem" }}
                            ></i>
                        </span>
                        <span>•</span>
                        <span>{sla?.slaString}</span>
                        <span>•</span>
                        <span>{costForTwoMessage}</span>
                    </div>
                </div>
            </div>

            <div className="menu-body px-70 py-15">
                <h2 className="text-3xl font-bold">Recommended</h2>
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
