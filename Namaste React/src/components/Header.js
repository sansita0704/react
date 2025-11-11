const logo = new URL("../assets/logo.jpeg", import.meta.url);

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo-image" src={logo}></img>
            </div>
            <div className="nav-items">
                <ul className="nav-items-list">
                    <li className="nav-list-item">Home</li>
                    <li className="nav-list-item">About Us</li>
                    <li className="nav-list-item">Contact Us</li>
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
