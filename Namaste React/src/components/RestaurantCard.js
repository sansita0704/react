const RestaurantCard = ({ restaurantData }) => {
    const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
        restaurantData.info;
    const { deliveryTime } = restaurantData.info.sla;
    const BASE_URL =
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/";

    return (
        <div className="restaurant-card">
            <div className="card-image">
                <img src={BASE_URL + cloudinaryImageId}></img>
            </div>

            <div className="card-content">
                <h3 className="card-heading">{name}</h3>
                <p>
                    {cuisines
                        .slice(0, 3)
                        .map((item, index, arr) =>
                            index === arr.length - 1 ? item : item + ", "
                        )}
                    {cuisines.length > 3 && "..."}
                </p>
                <div className="dish-details">
                    <span className="food-rating">
                        {avgRating}
                        <i
                            className="bi bi-star-fill"
                            style={{ marginLeft: "0.4rem" }}
                        ></i>
                    </span>
                    <span>
                        {deliveryTime + " mins"}
                        <i
                            className="bi bi-clock"
                            style={{ marginLeft: "0.5rem" }}
                        ></i>
                    </span>
                    <span>{costForTwo}</span>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
