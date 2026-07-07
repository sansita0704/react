import { useEffect, useState } from "react";

const useOnlineStatus = () => {
    const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

    // Check if offline

    useEffect(() => {
        const handleOffline = () => setOnlineStatus(false);
        const handleOnline = () => setOnlineStatus(true);

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    // Boolean Value
    return onlineStatus;
};

export default useOnlineStatus;
