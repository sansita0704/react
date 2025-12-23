import CardShimmer from "./RestaurantCardShimmer";

const HomeShimmer = () => {
    return (
        <div className="flex flex-col gap-5 px-15 py-10">
            <div className="flex gap-7 px-10">
                <div className="w-full h-10 rounded-3xl bg-[#f0f0f0]"></div>
                <div className="w-[20%] h-10 rounded-3xl bg-[#f0f0f0]"></div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 my-5">
                <CardShimmer />
                <CardShimmer />
                <CardShimmer />
                <CardShimmer />
                <CardShimmer />
                <CardShimmer />
                <CardShimmer />
                <CardShimmer />
            </div>
        </div>
    );
};

export default HomeShimmer;
