const RestaurantCardShimmer = () => {
    return (
        <div className="flex flex-col gap-3 border border-[#ebebeb] rounded-2xl overflow-hidden">
            <div className="w-full h-[50%] bg-[#f0f0f0] aspect-5/3"></div>
            <div className="flex flex-col gap-5 w-full h-[50%] p-5">
                <div className="w-full h-5 rounded-xl bg-[#f0f0f0]"></div>
                <div className="w-[50%] h-5 rounded-xl bg-[#f0f0f0]"></div>
                <div className="flex justify-between">
                    <div className="w-[30%] h-5 rounded-xl bg-[#f0f0f0]"></div>
                    <div className="w-[30%] h-5 rounded-xl bg-[#f0f0f0]"></div>
                    <div className="w-[30%] h-5 rounded-xl bg-[#f0f0f0]"></div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCardShimmer;
