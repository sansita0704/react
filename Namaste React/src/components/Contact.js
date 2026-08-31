import { useState } from "react";
import usePageTitle from "../utils/usePageTitle";

const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    usePageTitle("Foodify | Contact Us");

    const handleSubmit = (event) => {
        event.preventDefault();
        event.target.reset();
        setIsSubmitted(true);
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-center m-5">Contact US</h1>
            <form className="p-10 m-auto w-8/12 flex flex-col" onSubmit={handleSubmit}>
                <div className="my-4 mt-0 w-full flex items-center overflow-hidden">
                    <label htmlFor="contact-name" className="w-35">
                        Enter Name:{" "}
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        placeholder="Sansita Jain"
                        required
                        onChange={() => setIsSubmitted(false)}
                        className="border rounded-2xl border-gray-300 px-5 py-2 ml-1 w-full"
                    />
                </div>
                <div className="my-4 flex items-start">
                    <label htmlFor="contact-message" className="w-35 mt-2">
                        Enter Message:{" "}
                    </label>
                    <textarea
                        id="contact-message"
                        placeholder="Hello!"
                        rows={4}
                        required
                        onChange={() => setIsSubmitted(false)}
                        className="border rounded-2xl border-gray-300 px-5 py-2 ml-1 w-full"
                    />
                </div>
                <button className="border-[1.5] border-[#D3D2D2] rounded-4xl cursor-pointer transition duration-300 ease-in hover:border-[#F5780B] px-10 py-2 mt-5 text-sm w-fit m-auto uppercase">
                    Submit
                </button>
                {isSubmitted && (
                    <p className="text-center mt-5 text-[#079E07] font-semibold">
                        Thanks for reaching out! We will get back to you soon.
                    </p>
                )}
            </form>
        </div>
    );
};

export default Contact;
