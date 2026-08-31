import MenuCategory from "./MenuCategory";
import { useParams } from "react-router";
import { RES_IMG_BASE_URL } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import usePageTitle from "../utils/usePageTitle";
import MenuPageShimmer from "./shimmer/MenuPageShimmer";
import { useState } from "react";
import { MENU_FILTERS, getFilteredCategories } from "../utils/helpers";

const DIET_TABS = [
    { value: MENU_FILTERS.ALL, label: "All" },
    { value: MENU_FILTERS.VEG, label: "Veg", dot: "#079E07" },
    { value: MENU_FILTERS.NONVEG, label: "Non-veg", dot: "#B0342D" },
];

const RestaurantMenu = () => {
    const { resId } = useParams();

    const { categories, resInfo, isLoading, fetchError, retryFetch } =
        useRestaurantMenu(resId);
    const [showIndex, setShowIndex] = useState(0);
    const [dietFilter, setDietFilter] = useState(MENU_FILTERS.ALL);
    usePageTitle(resInfo?.name && `Foodify | ${resInfo.name}`);

    if (isLoading) return <MenuPageShimmer />;

    if (fetchError)
        return (
            <div className="flex flex-col items-center gap-5 my-10">
                <h1 className="text-xl">
                    Something went wrong while fetching the menu!
                </h1>
                <button
                    className="border-[1.5] border-[#D3D2D2] rounded-4xl text-sm px-5 py-2 cursor-pointer transition duration-300 ease-in hover:border-[#F5780B]"
                    onClick={retryFetch}
                >
                    Retry
                </button>
            </div>
        );

    if (categories.length === 0)
        return (
            <p className="text-xl text-center my-10">
                Menu is not available for this restaurant!
            </p>
        );

    const {
        name,
        cuisines,
        avgRating,
        sla,
        costForTwoMessage,
        cloudinaryImageId,
    } = resInfo;

    const filteredCategories = getFilteredCategories(categories, dietFilter);

    return (
        <div className="menu">
            <div className="menu-header grid grid-cols-2 p-15 items-center bg-[#f5780b33] gap-20">
                <div className="justify-self-end">
                    <img
                        className="rounded-4xl aspect-5/3 object-cover"
                        src={RES_IMG_BASE_URL + cloudinaryImageId}
                        alt={name}
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

            <div className="menu-body px-65 py-5">
                <div className="flex gap-3 mb-4">
                    {DIET_TABS.map((tab) => (
                        <button
                            key={tab.value}
                            type="button"
                            aria-pressed={dietFilter === tab.value}
                            onClick={() => {
                                setDietFilter(tab.value);
                                setShowIndex(0);
                            }}
                            className={`flex items-center gap-2 rounded-4xl border px-5 py-1.5 text-sm cursor-pointer transition duration-200 ${
                                dietFilter === tab.value ?
                                    "border-[#F5780B] bg-[#f5780b1a] font-semibold"
                                :   "border-[#D3D2D2] hover:border-[#F5780B]"
                            }`}
                        >
                            {tab.dot && (
                                <span
                                    className="inline-flex items-center justify-center w-3.5 h-3.5 border"
                                    style={{ borderColor: tab.dot }}
                                >
                                    <span
                                        className="block w-1.5 h-1.5 rounded-full"
                                        style={{ backgroundColor: tab.dot }}
                                    ></span>
                                </span>
                            )}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {filteredCategories.length === 0 ?
                    <p className="text-lg text-center text-[#666565] my-10">
                        No dishes match this filter.
                    </p>
                :   filteredCategories.map((category, index) => (
                        <MenuCategory
                            key={category.card.card.categoryId}
                            categoryData={category.card.card}
                            showItems={index === showIndex}
                            setShowIndex={() =>
                                index == showIndex ?
                                    setShowIndex(-1)
                                :   setShowIndex(index)
                            }
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default RestaurantMenu;
