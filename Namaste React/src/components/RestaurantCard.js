import { RES_IMG_BASE_URL } from "../utils/constants";

const RestaurantCard = ({ restaurantData }) => {
    const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
        restaurantData.info;
    const { deliveryTime } = restaurantData.info.sla;

    return (
        <div className="restaurant-card rounded-2xl transition duration-200 ease-in hover:scale-101 hover:shadow-sm overflow-hidden h-full text-sm border border-[#D3D2D2]">
            <div className="aspect-5/3">
                <img
                    className="w-full h-full object-cover"
                    src={RES_IMG_BASE_URL + cloudinaryImageId}
                ></img>
            </div>

            <div className="card-content flex flex-col px-8 py-6 gap-3 rounded-b-2xl">
                <h3 className="text-xl font-bold">{name}</h3>
                <p>
                    {cuisines
                        .slice(0, 3)
                        .map((item, index, arr) =>
                            index === arr.length - 1 ? item : item + ", "
                        )}
                    {cuisines.length > 3 && "..."}
                </p>
                <div className="flex justify-between">
                    <span className="bg-[#079E07] px-1 py-0.5 rounded-md text-white font-bold">
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
