import { useEffect, useState } from "react";

const User = ({ name }) => {
    useEffect(() => {
        console.log("useEffect");

        return () => {
            console.log("useEffect return");
        };
    });

    // console.log("render");

    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(1);

    return (
        <div className="flex flex-col gap-0.5 justify-center bg-[#f5780b33] p-7 rounded-2xl m-5">
            <h2 className="text-xl font-bold">{name}</h2>
            <h3>Jaipur, Rajasthan</h3>
            <p>sansita@gmail.com</p>
            <p className="border px-2 py-0.5 rounded-lg w-fit mt-0.5">
                Count: {count}
            </p>
            <p className="border px-2 py-0.5 rounded-lg w-fit mt-1.5">
                Count2: {count2}
            </p>
        </div>
    );
};

export default User;
