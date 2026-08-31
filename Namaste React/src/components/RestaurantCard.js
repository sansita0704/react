import { RES_IMG_BASE_URL } from "../utils/constants";

const RestaurantCard = ({ restaurantData }) => {
    const {
        cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwo,
        aggregatedDiscountInfoV3,
    } = restaurantData.info;
    const { deliveryTime } = restaurantData.info.sla;

    const offer =
        aggregatedDiscountInfoV3 &&
        [aggregatedDiscountInfoV3.header, aggregatedDiscountInfoV3.subHeader]
            .filter(Boolean)
            .join(" ");

    return (
        <div data-testid="restaurantCard" className="restaurant-card rounded-2xl transition duration-200 ease-in hover:shadow-sm overflow-hidden h-full text-sm border border-[#D3D2D2]">
            <div className="aspect-5/3 relative">
                <img
                    className="w-full h-full object-cover"
                    src={RES_IMG_BASE_URL + cloudinaryImageId}
                    alt={name}
                ></img>
                {offer && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-8">
                        <span className="text-white font-extrabold text-lg uppercase tracking-wide">
                            {offer}
                        </span>
                    </div>
                )}
            </div>

            <div className="card-content flex flex-col px-8 py-6 gap-3 rounded-b-2xl">
                <h3 className="text-xl font-bold">{name}</h3>
                <p>
                    {cuisines.slice(0, 3).join(", ")}
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

export const withOpenLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="bg-black text-white p-1.5 font-semibold absolute rounded-tl-xl rounded-br-xl border-t border-l border-[#D3D2D2] z-1">
                    Open
                </label>
                <RestaurantCard {...props} />
            </div>
        );
    };
};

export default RestaurantCard;
