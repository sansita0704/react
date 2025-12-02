import { useEffect, useState } from "react";

const User = ({ name }) => {
    useEffect(() => {
        console.log("useEffect");

        return () => {
            console.log("useEffect return");
        };
    });

    console.log("render");

    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(1);

    return (
        <div className="flex-container user-card">
            <h2>{name}</h2>
            <h3>Jaipur, Rajasthan</h3>
            <p>sansita@gmail.com</p>
            <p>Count: {count}</p>
            <p>Count2: {count2}</p>
        </div>
    );
};

export default User;
