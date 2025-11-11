const RestaurantCard = ({ restaurantData }) => {
    const { image, name, cuisine, rating, cfo } = restaurantData.info;
    const { deliveryTime } = restaurantData.order;

    return (
        <div className="restaurant-card">
            <div className="card-image">
                <img src={image.url}></img>
            </div>

            <div className="card-content">
                <h3 className="card-heading">{name}</h3>
                <p>
                    {cuisine.map((item) =>
                        item === cuisine[cuisine.length - 1]
                            ? item.name
                            : item.name + ", "
                    )}
                </p>
                <div className="dish-details">
                    <span
                        className="food-rating"
                        style={{
                            backgroundColor: "#" + rating.rating_color,
                        }}
                    >
                        {rating.aggregate_rating}
                        <i
                            className="bi bi-star-fill"
                            style={{ marginLeft: "0.4rem" }}
                        ></i>
                    </span>
                    <span>
                        {deliveryTime}
                        <i
                            className="bi bi-clock"
                            style={{ marginLeft: "0.5rem" }}
                        ></i>
                    </span>
                    <span>{cfo.text}</span>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
