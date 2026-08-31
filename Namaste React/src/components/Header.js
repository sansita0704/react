import { useState, useContext } from "react";
import logo from "url:../assets/logo.jpeg";
import { NavLink } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import { selectCartCount } from "../utils/cartSlice";

// Underline the link of the page the user is currently on.
const navLinkClass = ({ isActive }) =>
    isActive ? "underline underline-offset-4" : undefined;

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const onlineStatus = useOnlineStatus();
    const data = useContext(UserContext);

    const cartCount = useSelector(selectCartCount);

    return (
        <div className="header flex bg-[#F5780B] w-full px-12 py-4 justify-between items-center">
            <div className="logo-container">
                <img
                    className="logo-image w-15 rounded-full"
                    src={logo}
                    alt="Foodify logo"
                ></img>
            </div>
            <div className="nav-items">
                <ul className="flex gap-7 font-bold text-xl text-white items-center">
                    <li className="text-sm">
                        <i
                            className={
                                onlineStatus ?
                                    "bi bi-circle-fill text-green-500"
                                :   "bi bi-circle-fill text-red-500"
                            }
                        ></i>
                    </li>
                    <li>
                        <NavLink to={"/"} end className={navLinkClass}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/about"} className={navLinkClass}>
                            About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/contact"} className={navLinkClass}>
                            Contact Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/grocery"} className={navLinkClass}>
                            Grocery
                        </NavLink>
                    </li>
                    <li>
                        <button
                            className="cursor-pointer"
                            onClick={() => {
                                setIsLogin(!isLogin);
                            }}
                        >
                            {isLogin ? "Logout" : "Login"}
                        </button>
                    </li>
                    <li>{data.loggedInUser}</li>
                    <li>
                        <NavLink
                            to={"/cart"}
                            className={({ isActive }) =>
                                `flex items-center gap-1 ${
                                    isActive ?
                                        "underline underline-offset-4"
                                    :   ""
                                }`
                            }
                        >
                            <i className="bi bi-cart-check cart text-4xl"></i>
                            <span className="text-lg">{`${cartCount} ${
                                cartCount < 2 ? "Item" : "Items"
                            }`}</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
// This is how we can export a component.
