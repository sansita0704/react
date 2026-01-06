import MenuCardShimmer from "./MenuCardShimmer";
import MenuHeaderShimmer from "./MenuHeaderShimmer";

const MenuPageShimmer = () => {
    return (
        <div className="flex flex-col gap-5 px-35">
            <MenuHeaderShimmer />
            <div className="h-8 w-[20%] bg-[#f0f0f0] rounded-2xl mx-35"></div>
            <MenuCardShimmer />
            <MenuCardShimmer />
            <MenuCardShimmer />
        </div>
    );
};

export default MenuPageShimmer;
