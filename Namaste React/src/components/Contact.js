const Contact = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center m-5">Contact US</h1>
            <form className="p-10 m-auto w-8/12 flex flex-col">
                <div className="my-4 mt-0 w-full flex items-center overflow-hidden">
                    <label className="w-35">Enter Name: </label>
                    <input
                        type="text"
                        placeholder="Sansita Jain"
                        className="border rounded-2xl border-gray-300 px-5 py-2 ml-1 w-full"
                    />
                </div>
                <div className="my-4 flex items-center">
                    <label className="w-35">Enter Message: </label>
                    <input
                        type="text"
                        placeholder="Hello!"
                        className="border rounded-2xl border-gray-300 px-5 py-2 ml-1 w-full"
                    />
                </div>
                <button className="border-[1.5] border-[#D3D2D2] rounded-4xl cursor-pointer transition duration-300 ease-in hover:border-[#F5780B] px-10 py-2 mt-5 text-sm w-fit m-auto uppercase">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Contact;
