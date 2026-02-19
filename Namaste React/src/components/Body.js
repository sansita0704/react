import { useContext, useEffect, useState } from "react";
import RestaurantCard, { withOpenLabel } from "./RestaurantCard";
import Shimmer from "./shimmer/HomeShimmer";
import { Link } from "react-router";
import { RES_LIST_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [noRestaurants, setNoRestaurants] = useState(false);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const { loggedInUser, setUserName } = useContext(UserContext);

    // console.log("Body Rendered");

    const RestaurantCardOpen = withOpenLabel(RestaurantCard);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(
            // "https://proxy.corsfix.com/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.918938&lng=75.7887458&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            RES_LIST_API,
        );
        const data = await response.json();

        setFilteredRestaurants(
            data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants,
        );

        setListOfRestaurants(
            data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants,
        );
    };

    // if (listOfRestaurants.length === 0) return <Shimmer />;

    const onlineStatus = useOnlineStatus();
    if (!onlineStatus)
        return (
            <h1>
                Looks like you're offline! Please check your internet connection
            </h1>
        );

    // Conditional Rendering
    return listOfRestaurants.length === 0 ?
            <Shimmer />
        :   <div className="body font-[poppins]">
                <div className="flex justify-around items-center px-20 py-8 gap-2">
                    <div className="search-container flex justify-between border-[1.5] border-[#D3D2D2] transition duration-300 ease-in hover:border-[#F5780B] focus-within:border-[#F5780B] rounded-4xl px-6 py-2 w-[65%] text-xl outline-0">
                        <input
                            type="text"
                            className="border-0 outline-0 w-full"
                            placeholder="Search for restaurants"
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(event.target.value)
                            }
                            data-testid = "searchInput"
                        ></input>
                        <button
                            aria-label="search"
                            className="search-btn text-xl cursor-pointer transition duration-200 ease-in hover:text-[#F5780B]"
                            onClick={() => {
                                const filteredList = listOfRestaurants.filter(
                                    (item) =>
                                        item.info.name
                                            .toLowerCase()
                                            .includes(searchText.toLowerCase()),
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
                        className="border-[1.5] border-[#D3D2D2] rounded-4xl text-sm px-5 py-2 cursor-pointer transition duration-300 ease-in hover:border-[#F5780B] focus:border-[#F5780B]"
                        onClick={() => {
                            const filteredList = filteredRestaurants.filter(
                                (item) => item.info.avgRating > 4,
                            );

                            if (filteredList.length === 0)
                                setNoRestaurants(true);
                            else {
                                setNoRestaurants(false);
                                setFilteredRestaurants(filteredList);
                            }
                        }}
                    >
                        Top Rated Restaurants
                    </button>
                    <input
                        className="border-[1.5] border-[#D3D2D2] rounded-4xl text-sm px-5 py-2 transition duration-300 ease-in outline-0 hover:border-[#F5780B] focus:border-[#F5780B]"
                        placeholder="Enter Username"
                        value={loggedInUser}
                        onChange={(e) => setUserName(e.target.value)}
                    ></input>
                </div>
                {noRestaurants ?
                    <p className="text-xl text-center">No Restaurants Found!</p>
                :   <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 px-15 py-10 pt-0">
                        {filteredRestaurants.map((restaurant) => (
                            <Link
                                className="transition duration-200 ease-in hover:scale-101"
                                to={"/restaurants/" + restaurant.info.id}
                                key={restaurant.info.id}
                            >
                                {restaurant.info.isOpen ?
                                    <RestaurantCardOpen
                                        restaurantData={restaurant}
                                    />
                                :   <RestaurantCard
                                        restaurantData={restaurant}
                                    />
                                }
                            </Link>
                        ))}
                    </div>
                }
            </div>;
};

export default Body;
