import { useEffect, useState } from "react";
import { MENU_ITEM_IMG_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const MenuCard = ({ resInfo, btnText }) => {
    const [showComplete, setShowComplete] = useState(false);

    const { name, description, imageId, price, defaultPrice, ratings } =
        resInfo;

    useEffect(() => {
        if (description?.length < 200) setShowComplete(true);
    }, []);

    const dispatch = useDispatch();

    const handleClick = () => {
        // Dispatch an action:
        if (btnText == "add") dispatch(addItem(resInfo));
        else dispatch(removeItem(resInfo.cartItemId));
    };

    return (
        <div
            data-testid="cartItems"
            className="menu-card mt-12 grid grid-cols-[2fr_1fr] border-b border-gray-300 last:border-b-0"
        >
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{name}</h3>
                <p>₹ {(price || defaultPrice) / 100}</p>
                <span className="bg-[#079E07] px-1 py-0.5 rounded-md text-white font-bold w-fit">
                    {ratings?.aggregatedRating?.rating}
                    <i
                        className="bi bi-star-fill"
                        style={{ marginLeft: "0.2rem" }}
                    ></i>
                </span>
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
                ></img>
                <button
                    className="bg-white text-[#086b08] font-extrabold text-lg border border-[#D3D2D2] rounded-lg px-10 py-1 translate-y-[-50%] w-fit cursor-pointer hover:shadow-sm transition duration-300 uppercase"
                    onClick={handleClick}
                    data-testid="addBtn"
                >
                    {btnText}
                </button>
            </div>
        </div>
    );
};

export default MenuCard;
