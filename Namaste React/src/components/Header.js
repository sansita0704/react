import { useState, useContext } from "react";
const logo = new URL("../assets/logo.jpeg", import.meta.url);
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const onlineStatus = useOnlineStatus();
    const data = useContext(UserContext);

    const cartItems = useSelector((store) => store.cart.items);
    // console.log(cartItems);

    return (
        <div className="header flex bg-[#F5780B] w-full px-12 py-4 justify-between items-center">
            <div className="logo-container">
                <img className="logo-image w-15 rounded-full" src={logo}></img>
            </div>
            <div className="nav-items">
                <ul className="flex gap-7 font-bold text-xl text-white items-center">
                    <li className="text-sm">
                        <i
                            className={
                                onlineStatus
                                    ? "bi bi-circle-fill text-green-500"
                                    : "bi bi-circle-fill text-red-500"
                            }
                        ></i>
                    </li>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/about"}>About Us</Link>
                    </li>
                    <li>
                        <Link to={"/contact"}>Contact Us</Link>
                    </li>
                    <li>
                        <Link to={"/grocery"}>Grocery</Link>
                    </li>
                    <li
                        className="cursor-pointer"
                        onClick={() => {
                            setIsLogin(!isLogin);
                        }}
                    >
                        {isLogin ? "Logout" : "Login"}
                    </li>
                    <li>{data.loggedInUser}</li>
                    <li>
                        <Link to={"/cart"} className="flex items-center gap-1">
                            <i className="bi bi-cart-check cart text-4xl"></i>
                            <span className="text-lg">{`${cartItems.length} ${
                                cartItems.length < 2 ? "Item" : "Items"
                            }`}</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
// This is how we can export a component.
