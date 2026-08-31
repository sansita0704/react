import { useContext, useEffect, useMemo, useState } from "react";
import RestaurantCard, { withOpenLabel } from "./RestaurantCard";
import Shimmer from "./shimmer/HomeShimmer";
import { Link } from "react-router";
import { RES_LIST_API } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import usePageTitle from "../utils/usePageTitle";
import {
    SORT_OPTIONS,
    filterRestaurants,
    sortRestaurants,
} from "../utils/helpers";

const RestaurantCardOpen = withOpenLabel(RestaurantCard);

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [sortKey, setSortKey] = useState("relevance");
    const [topRatedOnly, setTopRatedOnly] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);
    const { loggedInUser, setUserName } = useContext(UserContext);
    const onlineStatus = useOnlineStatus();
    usePageTitle("Foodify | Home");

    // The list actually shown = full list -> filtered (search + rating)
    // -> sorted. Derived, so it can never drift out of sync with state.
    const visibleRestaurants = useMemo(
        () =>
            sortRestaurants(
                filterRestaurants(listOfRestaurants, {
                    searchText,
                    topRatedOnly,
                }),
                sortKey,
            ),
        [listOfRestaurants, searchText, topRatedOnly, sortKey],
    );

    const noRestaurants = !isLoading && visibleRestaurants.length === 0;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(RES_LIST_API);
            const data = await response.json();

            const restaurants =
                data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
                    ?.restaurants ?? [];

            setListOfRestaurants(restaurants);
        } catch (error) {
            console.error("Failed to fetch restaurants: ", error);
            setFetchError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const retryFetch = () => {
        setFetchError(false);
        setIsLoading(true);
        fetchData();
    };

    // Search filters live as you type; submitting just prevents a reload.
    const handleSearch = (event) => event.preventDefault();

    // Auto-retry when the connection comes back after a failed fetch.
    useEffect(() => {
        if (onlineStatus && fetchError) retryFetch();
    }, [onlineStatus]);

    if (!onlineStatus)
        return (
            <h1 className="text-xl text-center my-10">
                Looks like you're offline! Please check your internet connection
            </h1>
        );

    if (fetchError)
        return (
            <div className="flex flex-col items-center gap-5 my-10">
                <h1 className="text-xl">
                    Something went wrong while fetching restaurants!
                </h1>
                <button
                    className="border-[1.5] border-[#D3D2D2] rounded-4xl text-sm px-5 py-2 cursor-pointer transition duration-300 ease-in hover:border-[#F5780B]"
                    onClick={retryFetch}
                >
                    Retry
                </button>
            </div>
        );

    // Conditional Rendering
    return isLoading ?
            <Shimmer />
        :   <div className="body">
                <div className="flex flex-col gap-4 px-20 py-8">
                    <form
                        className="search-container flex justify-between border-[1.5] border-[#D3D2D2] transition duration-300 ease-in hover:border-[#F5780B] focus-within:border-[#F5780B] rounded-4xl px-6 py-2 w-full text-xl outline-0"
                        onSubmit={handleSearch}
                        role="search"
                    >
                        <input
                            type="text"
                            className="border-0 outline-0 w-full"
                            placeholder="Search for restaurants"
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(event.target.value)
                            }
                            data-testid="searchInput"
                        ></input>
                        <button
                            type="submit"
                            aria-label="search"
                            className="search-btn text-xl cursor-pointer transition duration-200 ease-in hover:text-[#F5780B]"
                        >
                            <i className="bi bi-search"></i>
                        </button>
                    </form>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            aria-pressed={topRatedOnly}
                            className={`rounded-4xl text-sm px-5 py-2 cursor-pointer transition duration-300 ease-in border-[1.5] ${
                                topRatedOnly ?
                                    "border-[#F5780B] bg-[#f5780b1a] font-semibold"
                                :   "border-[#D3D2D2] hover:border-[#F5780B]"
                            }`}
                            onClick={() => setTopRatedOnly((prev) => !prev)}
                        >
                            Top Rated Restaurants
                        </button>

                        <label className="flex items-center gap-2 text-sm">
                            <span className="text-[#666565]">Sort by</span>
                            <select
                                aria-label="Sort restaurants"
                                className="border-[1.5] border-[#D3D2D2] rounded-4xl text-sm px-4 py-2 cursor-pointer outline-0 transition duration-300 ease-in hover:border-[#F5780B] focus:border-[#F5780B]"
                                value={sortKey}
                                onChange={(e) => setSortKey(e.target.value)}
                            >
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <input
                            className="border-[1.5] border-[#D3D2D2] rounded-4xl text-sm px-5 py-2 transition duration-300 ease-in outline-0 hover:border-[#F5780B] focus:border-[#F5780B] ml-auto"
                            placeholder="Enter Username"
                            aria-label="username"
                            value={loggedInUser}
                            onChange={(e) => setUserName(e.target.value)}
                        ></input>
                    </div>
                </div>

                {noRestaurants ?
                    <p className="text-xl text-center">No Restaurants Found!</p>
                :   <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 px-15 py-10 pt-0">
                        {visibleRestaurants.map((restaurant) => (
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
