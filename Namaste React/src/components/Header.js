import { useEffect, useState } from "react";
const logo = new URL("../assets/logo.jpeg", import.meta.url);
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const onlineStatus = useOnlineStatus();

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
                    <li className="cursor-pointer"
                        onClick={() => {
                            setIsLogin(!isLogin);
                        }}
                    >
                        {isLogin ? "Logout" : "Login"}
                    </li>
                    <li className="text-4xl">
                        <i className="bi bi-cart-check cart"></i>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
// This is how we can export a component.
