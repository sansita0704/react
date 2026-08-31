import { useState } from "react";
import { MENU_ITEM_IMG_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { formatPrice, getItemPrice, isVegItem } from "../utils/helpers";
import VegIndicator from "./VegIndicator";

const MenuCard = ({ resInfo }) => {
    const { id, name, description, imageId, ratings } = resInfo;

    // Short descriptions are shown in full right away.
    const [showComplete, setShowComplete] = useState(
        !description || description.length <= 200,
    );

    const dispatch = useDispatch();

    // How many of this dish are already in the cart (0 if none).
    const quantityInCart = useSelector(
        (store) =>
            store.cart.items.find((item) => item.id === id)?.quantity ?? 0,
    );

    return (
        <div className="menu-card mt-12 grid grid-cols-[2fr_1fr] border-b border-gray-300 last:border-b-0">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <VegIndicator isVeg={isVegItem(resInfo)} />
                    <h3 className="text-xl font-semibold">{name}</h3>
                </div>
                <p>{formatPrice(getItemPrice(resInfo))}</p>
                {ratings?.aggregatedRating?.rating && (
                    <span className="bg-[#079E07] px-1 py-0.5 rounded-md text-white font-bold w-fit">
                        {ratings.aggregatedRating.rating}
                        <i
                            className="bi bi-star-fill"
                            style={{ marginLeft: "0.2rem" }}
                        ></i>
                    </span>
                )}
                {description ?
                    <p className="text-[#666565]">
                        {showComplete ?
                            description
                        :   description?.slice(0, 200) + "... "}

                        {!showComplete && (
                            <button
                                className="btn-show-more cursor-pointer"
                                onClick={() => setShowComplete(true)}
                            >
                                more
                            </button>
                        )}
                    </p>
                :   <p className="text-[#666565]">Description not available.</p>
                }
            </div>
            <div className="flex flex-col items-center justify-self-end">
                <img
                    className="rounded-2xl shadow-sm"
                    src={MENU_ITEM_IMG_BASE_URL + imageId}
                    alt={name}
                ></img>
                <button
                    className="bg-white text-[#086b08] font-extrabold text-lg border border-[#D3D2D2] rounded-lg px-10 py-1 translate-y-[-50%] w-fit cursor-pointer hover:shadow-sm transition duration-300 uppercase relative"
                    onClick={() => dispatch(addItem(resInfo))}
                    data-testid="addBtn"
                >
                    add
                    {quantityInCart > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#F5780B] text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                            {quantityInCart}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default MenuCard;
