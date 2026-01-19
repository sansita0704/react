import { clearCart } from "../utils/cartSlice";
import MenuCard from "./MenuCard";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);

    const dispatch = useDispatch();
    const handleClearCart = () => dispatch(clearCart());

    const handleClick = () => dispatch()

    return (
        <div>
            <div className="flex items-center justify-center mt-8">
                <h1 className="text-4xl font-bold">My Cart</h1>
                <button
                    className="absolute right-0 mr-20 bg-black text-white px-5 py-1.5 rounded-2xl text-md cursor-pointer"
                    onClick={handleClearCart}
                >
                    Clear Cart
                </button>
            </div>
            {cartItems.length == 0 && (
                <p className="text-center text-xl my-10">Cart is Empty!</p>
            )}
            <div className="cart-items px-70 py-5">
                {cartItems.map((item) => (
                    <MenuCard key={item.id} resInfo={item} btnText={"remove"} />
                ))}
            </div>
        </div>
    );
};

export default Cart;
