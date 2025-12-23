const MenuHeaderShimmer = () => {
    return (
        <div className="grid grid-cols-2 py-20 gap-20 items-center">
            <div className="w-[90%] h-full bg-[#f0f0f0] aspect-5/3 justify-self-end rounded-4xl"></div>
            <div className="flex flex-col gap-5">
                <div className="w-[50%] h-8 rounded-3xl bg-[#f0f0f0]"></div>
                <div className="w-[30%] h-6 rounded-2xl bg-[#f0f0f0]"></div>
                <div className="flex gap-10">
                    <div className="w-[10%] h-5 rounded-xl bg-[#f0f0f0]"></div>
                    <div className="w-[10%] h-5 rounded-xl bg-[#f0f0f0]"></div>
                    <div className="w-[10%] h-5 rounded-xl bg-[#f0f0f0]"></div>
                </div>
            </div>
        </div>
    );
};

export default MenuHeaderShimmer;
