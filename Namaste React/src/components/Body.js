import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { restaurants } from "../utils/mockData";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState(restaurants);
    return (
        <div className="body">
            <div className="filter">
                <button
                    className="top-rated"
                    onClick={() => {
                        const filteredList = listOfRestaurants.filter(
                            (item) =>
                                Number(item.info.rating.aggregate_rating) > 4
                        );

                        setListOfRestaurants(filteredList);
                    }}
                >
                    Top Rated Restaurants
                </button>
            </div>
            <div className="restaurant-container">
                {listOfRestaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.info.resId}
                        restaurantData={restaurant}
                    />
                ))}
            </div>
        </div>
    );
};

export default Body;
