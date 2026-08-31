import { useDispatch } from "react-redux";
import { MENU_ITEM_IMG_BASE_URL } from "../utils/constants";
import { addItem, removeItem, deleteItem } from "../utils/cartSlice";
import { formatPrice, getItemPrice, isVegItem } from "../utils/helpers";
import VegIndicator from "./VegIndicator";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const { id, name, imageId, quantity } = item;

    const lineTotal = getItemPrice(item) * quantity;

    return (
        <div
            data-testid="cartItems"
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 border-b border-gray-300 last:border-b-0"
        >
            {imageId ?
                <img
                    className="w-20 h-20 rounded-2xl object-cover shadow-sm"
                    src={MENU_ITEM_IMG_BASE_URL + imageId}
                    alt={name}
                ></img>
            :   <div className="w-20 h-20 rounded-2xl bg-gray-100"></div>}

            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <VegIndicator isVeg={isVegItem(item)} />
                    <h3 className="text-lg font-semibold">{name}</h3>
                </div>
                <p className="text-[#666565]">{formatPrice(getItemPrice(item))}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
                <div className="flex items-center border border-[#D3D2D2] rounded-lg overflow-hidden">
                    <button
                        className="px-3 py-1 text-lg font-bold text-[#F5780B] cursor-pointer hover:bg-[#f5780b11] transition"
                        onClick={() => dispatch(removeItem(id))}
                        aria-label={`Decrease quantity of ${name}`}
                    >
                        −
                    </button>
                    <span className="px-3 min-w-8 text-center font-semibold">
                        {quantity}
                    </span>
                    <button
                        className="px-3 py-1 text-lg font-bold text-[#F5780B] cursor-pointer hover:bg-[#f5780b11] transition"
                        onClick={() => dispatch(addItem(item))}
                        aria-label={`Increase quantity of ${name}`}
                    >
                        +
                    </button>
                </div>
                <span className="font-bold">{formatPrice(lineTotal)}</span>
                <button
                    className="text-sm text-[#B0342D] cursor-pointer hover:underline"
                    onClick={() => dispatch(deleteItem(id))}
                    aria-label={`Remove ${name} from cart`}
                >
                    <i className="bi bi-trash"></i> Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
