import { useEffect, useState } from "react";
const logo = new URL("../assets/logo.jpeg", import.meta.url);
import { Link } from "react-router";

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo-image" src={logo}></img>
            </div>
            <div className="nav-items">
                <ul className="nav-items-list">
                    <li className="nav-list-item">
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="nav-list-item">
                        <Link to={"/about"}>About Us</Link>
                    </li>
                    <li className="nav-list-item">
                        <Link to={"/contact"}>Contact Us</Link>
                    </li>
                    <li
                        className="nav-list-item"
                        onClick={() => {
                            setIsLogin(!isLogin);
                        }}
                    >
                        {isLogin ? "Logout" : "Login"}
                    </li>
                    <li className="nav-list-item">
                        <i className="bi bi-cart-check cart"></i>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
// This is how we can export a component.
