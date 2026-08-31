import { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    ScrollRestoration,
} from "react-router";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
    const [userName, setUserName] = useState("");

    // Authentication

    useEffect(() => {
        // Make an API call.
        // Send the username and password to it.
        // Get the data of the user.

        const data = {
            name: "Sansita",
        };

        setUserName(data.name);
    }, []);

    return (
        <Provider store={appStore}>
            <UserContext.Provider
                value={{ loggedInUser: userName, setUserName }}
            >
                <div className="app">
                    <ScrollRestoration />
                    <Header />
                    <Outlet />
                </div>
            </UserContext.Provider>
        </Provider>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/grocery",
                element: (
                    <Suspense
                        fallback={
                            <p className="text-xl text-center my-10">
                                Loading...
                            </p>
                        }
                    >
                        <Grocery />
                    </Suspense>
                ),
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                // Catch-all for unknown URLs: renders inside the layout so the
                // header stays visible (unlike errorElement, which replaces it).
                path: "*",
                element: <NotFound />,
            },
        ],
        errorElement: <Error />,
    },
]);

root.render(<RouterProvider router={appRouter} />);
