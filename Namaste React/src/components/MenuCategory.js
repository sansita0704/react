import { useState } from "react";
import MenuCard from "./MenuCard";

const MenuCategory = ({ categoryData, showItems, setShowIndex }) => {
    const { itemCards, title } = categoryData;

    const handleClick = () => {
        setShowIndex();
    };

    return (
        <div data-testid="menuCategory" className="px-5 py-4 my-5 bg-gray-50 rounded-4xl shadow-md">
            <div
                className="flex justify-between cursor-pointer"
                onClick={handleClick}
            >
                <h2 className="text-2xl font-bold">
                    {title} ({itemCards.length})
                </h2>
                <span className="text-3xl">
                    <i
                        className="bi bi-arrow-down-short"
                        style={{ color: "#6d756f" }}
                    ></i>
                </span>
            </div>

            {/* Collapsible Content: Rendered always but max height and opacity is 0 if showItems is true. */}
            <div
                className={`grid transition-all ease-in-out duration-700 ${
                    showItems ?
                        "grid-rows-[1fr] opacity-100"
                    :   "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    {itemCards.map((item) => (
                        <MenuCard
                            key={item.card.info.id}
                            resInfo={item.card.info}
                            btnText={"add"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuCategory;
