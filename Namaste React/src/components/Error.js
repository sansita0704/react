import { Link, useRouteError } from "react-router";
import usePageTitle from "../utils/usePageTitle";

const Error = () => {
    const err = useRouteError();
    usePageTitle("Foodify | Error");

    return (
        <div className="flex flex-col items-center gap-5 my-10">
            <h1 className="text-2xl font-bold">Oops! Something Went Wrong</h1>
            {err?.status && (
                <h2 className="text-xl">
                    {err.status}: {err.statusText}
                </h2>
            )}
            <Link
                className="border-[1.5] border-[#D3D2D2] rounded-4xl text-sm px-5 py-2 cursor-pointer transition duration-300 ease-in hover:border-[#F5780B]"
                to="/"
            >
                Go Home
            </Link>
        </div>
    );
};

export default Error;
