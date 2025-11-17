import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [noRestaurants, setNoRestaurants] = useState(false);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    console.log("Body Rendered");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(
            "https://proxy.corsfix.com/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.918938&lng=75.7887458&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const data = await response.json();

        console.log(data);
        setFilteredRestaurants(
            data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants
        );

        setListOfRestaurants(
            data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants
        );
    };

    // if (listOfRestaurants.length === 0) return <Shimmer />;

    // Conditional Rendering
    return listOfRestaurants.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="body">
            <div className="filter">
                <div className="search-container">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search for restaurants"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                    ></input>
                    <button
                        className="search-btn"
                        onClick={() => {
                            const filteredList = listOfRestaurants.filter(
                                (item) =>
                                    item.info.name
                                        .toLowerCase()
                                        .includes(searchText.toLowerCase())
                            );

                            if (filteredList.length === 0)
                                setNoRestaurants(true);
                            else {
                                setNoRestaurants(false);
                                setFilteredRestaurants(filteredList);
                            }
                        }}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                <button
                    className="top-rated"
                    onClick={() => {
                        const filteredList = listOfRestaurants.filter(
                            (item) => item.info.avgRating > 4
                        );

                        setListOfRestaurants(filteredList);
                    }}
                >
                    Top Rated Restaurants
                </button>
            </div>
            {noRestaurants ? (
                <p className="msg">No Restaurants Found!</p>
            ) : (
                <div className="restaurant-container">
                    {filteredRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.info.id}
                            restaurantData={restaurant}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Body;
