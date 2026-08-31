import { useState } from "react";
import { Link } from "react-router";
import { clearCart, selectCartItems } from "../utils/cartSlice";
import usePageTitle from "../utils/usePageTitle";
import CartItem from "./CartItem";
import { formatPrice, getBillDetails } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";

const BillRow = ({ label, value, strong = false, muted = false }) => (
    <div
        className={`flex justify-between ${strong ? "font-bold text-lg" : ""} ${
            muted ? "text-[#666565]" : ""
        }`}
    >
        <span>{label}</span>
        <span>{value}</span>
    </div>
);

const Cart = () => {
    const cartItems = useSelector(selectCartItems);
    const [orderPlaced, setOrderPlaced] = useState(false);
    usePageTitle("Foodify | Cart");

    const dispatch = useDispatch();
    const handleClearCart = () => dispatch(clearCart());
    const handlePlaceOrder = () => {
        dispatch(clearCart());
        setOrderPlaced(true);
    };

    const { itemTotal, deliveryFee, taxes, grandTotal } =
        getBillDetails(cartItems);

    if (orderPlaced)
        return (
            <div className="flex flex-col items-center gap-4 my-16">
                <i className="bi bi-check-circle-fill text-6xl text-[#079E07]"></i>
                <h1 className="text-3xl font-bold">Order Placed!</h1>
                <p className="text-lg text-[#666565]">
                    Thank you for your order. Your food is on its way. 🛵
                </p>
                <Link
                    className="border-[1.5] border-[#D3D2D2] rounded-4xl text-sm px-5 py-2 cursor-pointer transition duration-300 ease-in hover:border-[#F5780B]"
                    to="/"
                >
                    Order More
                </Link>
            </div>
        );

    return (
        <div>
            <div className="flex items-center justify-center mt-8">
                <h1 className="text-4xl font-bold">My Cart</h1>
                {cartItems.length > 0 && (
                    <button
                        className="absolute right-0 mr-20 bg-black text-white px-5 py-1.5 rounded-2xl text-md cursor-pointer"
                        onClick={handleClearCart}
                    >
                        Clear Cart
                    </button>
                )}
            </div>
            {cartItems.length === 0 ?
                <div className="flex flex-col items-center gap-5 my-10">
                    <p className="text-xl">Cart is Empty!</p>
                    <Link
                        className="border-[1.5] border-[#D3D2D2] rounded-4xl text-sm px-5 py-2 cursor-pointer transition duration-300 ease-in hover:border-[#F5780B]"
                        to="/"
                    >
                        Browse Restaurants
                    </Link>
                </div>
            :   <div className="cart-items px-70 py-5">
                    <div>
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    <div className="mt-10 pt-5 border-t border-gray-300 flex flex-col gap-2">
                        <h2 className="text-xl font-bold mb-2">Bill Details</h2>
                        <BillRow
                            label="Item Total"
                            value={formatPrice(itemTotal * 100)}
                            muted
                        />
                        <BillRow
                            label="Delivery Fee"
                            value={
                                deliveryFee === 0 ?
                                    "FREE"
                                :   formatPrice(deliveryFee * 100)
                            }
                            muted
                        />
                        <BillRow
                            label="GST & Charges"
                            value={formatPrice(taxes * 100)}
                            muted
                        />
                        <div className="border-t border-gray-300 mt-2 pt-3">
                            <BillRow
                                label="To Pay"
                                value={formatPrice(grandTotal * 100)}
                                strong
                            />
                        </div>
                        <button
                            className="mt-6 bg-[#F5780B] text-white font-bold px-6 py-3 rounded-2xl cursor-pointer transition duration-300 hover:opacity-90"
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Cart;
