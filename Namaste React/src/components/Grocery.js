import usePageTitle from "../utils/usePageTitle";

const Grocery = () => {
    usePageTitle("Foodify | Grocery");

    return (
        <h1 className="text-4xl font-bold text-center m-5">
            Welcome to our Grocery Store!
        </h1>
    );
};

export default Grocery;
