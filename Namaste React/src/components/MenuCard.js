import { useEffect, useState } from "react";
import { MENU_ITEM_IMG_BASE_URL } from "../utils/constants";

const MenuCard = ({ resInfo }) => {
    const [showComplete, setShowComplete] = useState(false);

    const { name, description, imageId, price, defaultPrice, ratings } =
        resInfo;

    useEffect(() => {
        if (description?.length < 200) setShowComplete(true);
    }, []);

    return (
        <div className="menu-card">
            <div className="item-info">
                <h3>{name}</h3>
                <p>₹ {(price || defaultPrice) / 100}</p>
                <span className="food-rating">
                    {ratings?.aggregatedRating?.rating}
                    <i
                        className="bi bi-star-fill"
                        style={{ marginLeft: "0.2rem" }}
                    ></i>
                </span>
                {description ? (
                    <p className="item-desc">
                        {showComplete
                            ? description
                            : description?.slice(0, 200) + "... "}

                        {!showComplete && (
                            <button
                                className="btn-show-more"
                                onClick={() => setShowComplete(true)}
                            >
                                more
                            </button>
                        )}
                    </p>
                ) : (
                    <p className="item-desc">Description not available.</p>
                )}
            </div>
            <div className="flex-container menu-card-actions">
                <img src={MENU_ITEM_IMG_BASE_URL + imageId}></img>
                <button className="btn-add">ADD</button>
            </div>
        </div>
    );
};

export default MenuCard;
