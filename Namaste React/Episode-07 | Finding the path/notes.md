# Dive Deeper into Hooks

## 1. `useEffect` Hook

`useEffect` takes two arguments:

1. **Callback function** - mandatory
2. **Dependency array** - optional

-   By default, the callback passed to `useEffect` is executed after every render of the component.
-   The dependency array modifies **when this callback runs**.

### Cases

#### 1. Without a dependency array

-   If we call `useEffect` without the dependency array, the callback will run **after every render**.

```js
const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    console.log("Header Rendered");

    useEffect(() => {
        console.log("Header's useEffect Called");
    });
    // This prints every time we click the login/logout button.

    return (...);
};
```

#### 2. With an empty dependency array

-   The `useEffect` callback runs **only once**, on the initial render.

Example:
In the `Body` component, the effect that fetches restaurant data is called **only on the first render**, and never again.

#### 3. With a non-empty dependency array

-   The callback runs **only when one of the dependencies changes**.

```js
useEffect(() => {
    console.log("Header's useEffect Called");
}, [isLogin]);
```

-   Here, the callback runs every time `isLogin` changes.

## 2. `useState` Hook

### 1. Never create state variables outside a component

Calling hooks outside component bodies causes this error:

```
Uncaught (in promise) Error: Invalid hook call. Hooks can only be called inside the body of a function component.
```

`useState` is meant to create **local** state inside functional components.

### 2. Always call hooks at the top level of a component

This is a recommended practice for clean and readable code.

### 3. Never call `useState` inside loops, conditionals, or nested functions

Even though it may not throw an error, it will cause inconsistent behavior.

Incorrect:

```js
if (searchText) {
    const [searchText, setSearchText] = useState("");
}
```

-   Here, depending on the render, the state variable may or may not be created.
-   So, in some renders, there will be `searchText` but in others, there will be no `searchText` → leading to inconsistency.

Also incorrect:

```js
let x = function () {
    const [searchText, setSearchText] = useState("");
};
```

**State variables are meant to be created inside the functional component at the top level.**

> [React Docs – useState Caveats](https://react.dev/reference/react/useState#:~:text=a%20re%2Drender.-,Caveats,-useState%20is%20a)

# Routing

To use routing in React, we install a JS library called **React Router**.

```bash
npm i react-router-dom
```

## Routing Configuration

Routing configuration tells React what to render for each route.

We define this configuration in `App.js` (the root-level component).

### 1. Import `createBrowserRouter`

```js
import { createBrowserRouter } from "react-router";
```

`createBrowserRouter` helps us **define and configure routes**.

### 2. Create the routing configuration

```js
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
    },
    {
        path: "/about",
        element: <About />,
    },
]);
```

-   It takes an **array of route objects**.
-   Each object defines a `path` and the component to load for that path.
-   For example: Here, we are loading the `AppLayout` component on `/` path.

### 3. Provide the router configuration to the app

We use the `RouterProvider` component from React Router to do this.

```js
import { createBrowserRouter, RouterProvider } from "react-router";
```

Previously:

```js
root.render(<AppLayout />);
```

Now:

```js
root.render(<RouterProvider router={appRouter} />);
```

`RouterProvider` will provide our routing configuration to our app.

## Adding an Error Page

```js
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,
    },
]);
```

-   If the path does not match any defined route, React Router renders the **Error** component.

## `useRouteError` Hook

-   It is a hook provided to use by react router.
-   It gives extra information about routing errors.

NOTE: Any function starting with "`use`" is a React Hook by convention.

```js
import { useRouteError } from "react-router";

const Error = () => {
    const err = useRouteError();
    console.log(err);

    return (
        <div>
            <h1>Oops! Something Went Wrong</h1>
            <h2>
                {err.status}: {err.statusText}
            </h2>
        </div>
    );
};
```

# Children Routes

-   In our app, we want the **Header** to always be visible on every page.

-   Below the Header, we want to render either the **Body**, **About**, or **Contact** component depending on the route.

-   To achieve this, we create **children routes** under our `AppLayout`.

```js
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
        ],
        errorElement: <Error />,
    },
]);
```

-   With this configuration, we have defined three children on the root route (`/`).
-   Therefore, `/about` and `/contact` both become children of `AppLayout`.
-   We now want these children to render based on the current path:

1. `/` → Body
2. `/about` → About
3. `/contact` → Contact

**So, we want the children to be inserted into `AppLayout` dynamically, based on the route.**

## Outlet

-   To do this, we use the `Outlet` component from the react-router library.

```js
import { Outlet } from "react-router";
```

```js
const AppLayout = () => {
    return (
        <div className="app">
            <Header />
            <Outlet />
        </div>
    );
};
```

-   With this setup, whenever the path changes, the `Outlet` gets replaced by the corresponding child component.
-   The `Header` stays intact, and only the content inside the `Outlet` changes according to the path.

## Adding Links to Navbar

-   Never use the `<a>` tag for navigation in React when using react-router.

-   This is because `<a>` causes a **full page reload**.

-   React supports navigation _without reloading_ the page using the `Link` component.

```js
<li className="nav-list-item">
    <Link to={"/"}>Home</Link>
</li>
```

-   `href` in `<a>` → `to` in `<Link>`

-   Using `Link` prevents a reload and only swaps components.

-   Because of this, React applications are known as **Single Page Applications (SPA)**.

-   It is the same page; only components interchange themselves via **Client-Side Routing**.

# Types of Routing

## 1. Client-Side Routing (CSR)

-   React uses **Client-Side Routing**.
-   No new page is fetched from the server.
-   All components are already part of the bundle.
-   Clicking on “About” simply renders the About component - no network call.

## 2. Server-Side Routing (SSR)

-   In traditional websites, there are separate HTML files: `about.html`, `contact.html`.
-   Clicking on “About” sends a network request to the server to fetch that HTML.
-   The whole page reloads and renders the new HTML.

# Dynamic Routing

-   Suppose we want a dynamic route for each restaurant:

```js
{
    path: "/restaurants/:resId",
    element: <RestaurantMenu />,
},
```

-   `:resId` is a **dynamic parameter**.
-   It changes based on which restaurant is clicked and is used to fetch the correct menu.
-   Every time it changes, our data of the menu will change according to that id.

**Note:**

```js
if (menu.length == 0) return <Shimmer />;
```

-   We must place this **before destructuring `resInfo`**,
    because initially `resInfo` will be empty and destructuring it will cause errors.

```js
if (menu.length == 0) return <Shimmer />; // return from here only -> skip below code

const { name, cuisines, avgRating, sla, costForTwoMessage, cloudinaryImageId } =
    resInfo;
```

## `useParams()`

-   We have our `RestaurantMenu` component ready to be rendered on the webpage.
-   To read the `resId` from the URL:

```js
const { resId } = useParams();
```

Example URL:

```
http://localhost:1234/restaurants/123
```

-   Here, `resId` is `123`.
-   We will use this to make an API call for the menu of restaurant 123.

```js
const { resId } = useParams();

useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {
    const response = await fetch(MENU_API + resId);
    const data = await response.json();

    setMenu(data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards);
    setResInfo(data?.data?.cards[2]?.card?.card?.info);
};
```

-   Now, we are able to fetch restaurant menu acc to `resId`.

## Extracting Menu Items (Refined Version)

```js
const fetchData = async () => {
    const response = await fetch(MENU_API + resId);
    const data = await response.json();

    let arr = [];

    // 1. Extract the raw menu data
    arr = data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards;

    // 2. Filter sections and extract itemCards
    arr = arr
        ?.filter((item, index) => index !== 0 && index !== 1)
        ?.map((item) => item?.card?.card?.itemCards)
        ?.filter(Boolean)
        ?.flat();

    // 'arr' was an array of arrays -> so we do .flat() to convert it to a 1d arr
    /*
    [
        [itemCard1, itemCard2, ...],
        [itemCard3, itemCard4, ...],
        ...
    ]
    */

    // 3. Remove duplicates
    const uniqueMenuItems = [];
    arr.forEach((item) => {
        if (
            !uniqueMenuItems.find(
                (x) => x?.card?.info?.id === item?.card?.info?.id
            )
        ) {
            uniqueMenuItems.push(item);
        }
    });

    setMenuItems(uniqueMenuItems);

    // Restaurant Info
    setResInfo(data?.data?.cards[2]?.card?.card?.info);
};
```

-   This approach extracts data once and processes it properly before setting the state.

## Link `RestaurantCard` with the `RestaurantMenu`

```js
<Link to={"/restaurants/" + restaurant.info.id} key={restaurant.info.id}>
    <RestaurantCard restaurantData={restaurant} />
</Link>
```

-   The `key` must be on the **outermost component** of the mapped list - here, the `Link`.

**Note:**

-   The `<Link>` component internally renders an `<a>` tag, behind the scenes, it uses `<a>` tag only.
-   Browsers do not understand `<Link>`; it is a wrapper over `<a>` tag, provided by react-router.
