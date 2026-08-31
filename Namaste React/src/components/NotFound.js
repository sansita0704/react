import { Link } from "react-router";
import usePageTitle from "../utils/usePageTitle";

const NotFound = () => {
    usePageTitle("Foodify | Page Not Found");

    return (
        <div className="flex flex-col items-center gap-4 my-16">
            <h1 className="text-7xl font-extrabold text-[#F5780B]">404</h1>
            <h2 className="text-2xl font-bold">Page Not Found</h2>
            <p className="text-[#666565]">
                The page you're looking for doesn't exist or has moved.
            </p>
            <Link
                className="border-[1.5] border-[#D3D2D2] rounded-4xl text-sm px-5 py-2 cursor-pointer transition duration-300 ease-in hover:border-[#F5780B]"
                to="/"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
