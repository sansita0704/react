# Monolithic Architecture

-   Traditionally, applications were developed using a **monolithic architecture**.

-   A monolithic project used to be a large codebase or a huge project containing all components in one place, such as:

    -   APIs
    -   UI code
    -   Authentication logic
    -   Database connectivity
    -   Notification or SMS functionality

-   The major drawback of this structure was that even a small change required rebuilding and redeploying the entire application.

# Microservice Architecture

-   In contrast, a **microservice architecture** divides an application into multiple smaller, independent services, each responsible for a specific task.

-   Example microservices include:

    -   Backend service
    -   UI service
    -   Authentication service
    -   Database service: To connect to the database and maintain the database
    -   SMS service
    -   Email notification service

-   Together, these independent services form a complete application.

-   Each microservice can even be written in a **different programming language**.

-   This follows the principles of **Separation of Concerns** and the **Single Responsibility Principle**, where each service focuses on a single job without interfering with others.

-   Different teams can work on different services **independently**, allowing faster and more scalable development.

## How These Services Interact

-   Microservices need to communicate with one another to make the full application functional.

    -   The UI interacts with the backend to fetch data and display it on the UI.
    -   The backend interacts with the database, and so on.

-   Each service is typically deployed on a specific port. For example:

    -   UI → 1234
    -   Backend → 1000
    -   SMS → 3000

-   These ports can be mapped to routes in a domain:

    -   UI → `/`
    -   Backend → `/api`
    -   SMS → `/sms`

-   The services communicate using **HTTP requests**.
    For example, if the UI wants to communicate with the backend, it can make a call to `/api`.

## Two Ways a UI Application Fetches Data from the Backend

1. **Fetch data as soon as the page loads**

    - When the app loads, it immediately makes an API call.
    - Once the data is fetched, it is rendered on the UI.

2. **Render first, then fetch**

    - When the page loads, a **skeleton UI** (placeholder) is rendered immediately.
    - Then an API call is made to fetch data.
    - Once the data arrives, the UI is re-rendered with the fetched content.

-   **React** applications follow the **second approach**, as it provides a **better user experience (UX)**.

### Why is the Second Approach Better?

-   Suppose the API takes 500ms to return data.

-   In the first approach, the page remains blank or frozen until the data arrives.
    After 500ms, the full content appears suddenly - leading to a poor UX.

-   In the second approach, the skeleton UI appears instantly, and data loads dynamically.
    The user sees immediate feedback, which feels smoother and more responsive.

-   Although React renders the page twice in this approach, its **faster render cycles** makes the process fast and efficient.
-   React has one of the best render mechanism.

-   Hence, rendering twice doesn’t affect performance but **greatly improves UX**.

## `useEffect` Hook

-   The `useEffect` hook in React is used to perform **side effects** such as API calls after a component has rendered.

-   It accepts two args:

    1. A **callback function**
    2. A **dependency array**

-   The callback function runs **after the component has rendered**.

-   If we have written it inside the Body component, then once the Body component has been rendered on the website, it will call the callback function passed inside the `useEffect` Hook.

### Example

```js
const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState(restaurants);

    useEffect(() => {
        console.log("useEffect called");
    }, []);

    console.log("Rendered");

    return <div className="body"></div>;
};
```

**Output:**

```
Rendered
useEffect called
```

**First, the component is rendered, and then the `useEffect` callback runs.**

-   `useEffect` is useful to implement the 2nd approach of calling the API after the component has been rendered.

### Example: Fetching Data After Render

```js
const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.918938&lng=75.7887458&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const data = await response.json();
        console.log(data);
    };

    return <div className="body"></div>;
};
```

**Error:**

```
Access to fetch at 'https://www.swiggy.com/dapi/restaurants/list/v5?...'
from origin 'http://localhost:1234' has been blocked by CORS policy.
```

### Why This Error Occurs (CORS Policy)

-   The browser blocks requests made from one origin to another (a **cross-origin request**) for security reasons.
-   In this case, our local React app (`localhost:1234`) is trying to access Swiggy’s API (a different origin).
-   This violates the **CORS (Cross-Origin Resource Sharing)** policy.

### Solutions

1. **Use a Chrome extension** like **Allow CORS: Access-Control-Allow-Origin**
   to temporarily bypass the restriction.

2. **Use a CORS proxy service** such as [https://corsfix.com/](https://corsfix.com/)

    - With a CORS proxy service, we do not directly make an api call to another server.
    - The proxy makes the API call on our behalf.
    - Since the request originates from the proxy’s server (not our browser), it bypasses CORS restrictions.

> To learn more, see [What is a CORS Proxy? Use Cases and Examples](https://corsfix.com/blog/cors-proxy).

### Example with Data Rendering

```js
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.918938&lng=75.7887458&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const data = await response.json();

        console.log(data);
        setListOfRestaurants(
            data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants
        );
    };

    return (
        <div className="body">
            <div className="filter">
                <button
                    className="top-rated"
                    onClick={() => {
                        const filteredList = listOfRestaurants.filter(
                            (item) => item.info.avgRating > 4
                        );
                        setListOfRestaurants(filteredList);
                    }}
                >
                    Top Rated Restaurants
                </button>
            </div>
            <div className="restaurant-container">
                {listOfRestaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.info.id}
                        restaurantData={restaurant}
                    />
                ))}
            </div>
        </div>
    );
};

export default Body;
```

-   Initially, the `Body` component renders without data.

-   Then, an API call is made using `fetchData()`.

-   Once the data is returned, the restaurant list is displayed on the UI.

-   We can further improve the user experience by displaying a **loading spinner** or using a **Shimmer UI** while data is being fetched.

## Shimmer UI

-   Shimmer UI is when we display a **fake page or a skeleton loader** until the actual data arrives.
-   A shimmer is a **temporary animated placeholder** that appears while waiting for a service call to return data.

```js
// Conditional Rendering: Rendering based on a condition.
if (listOfRestaurants.length === 0) return <Shimmer />;
```

# Why We Use `useState()`

Let’s say we want to implement a **Login button** that changes to **Logout** when the user is logged in.

```js
const Header = () => {
    let isLogin = false;

    return (
        <div className="header">
            <div className="nav-items">
                <ul className="nav-items-list">
                    <li
                        className="nav-list-item"
                        onClick={() => {
                            isLogin = !isLogin;
                            console.log(isLogin);
                        }}
                    >
                        {isLogin ? "Logout" : "Login"}
                    </li>
                </ul>
            </div>
        </div>
    );
};
```

-   Here, we are using a normal JS variable to handle login state.
-   Even though the local variable value (`isLogin`) updates correctly when we click the button, **the UI does not change**.

### Why Does This Happen?

-   This happens because the local variable is updated, but the **component does not re-render**, so the UI does not reflect the change.
-   React has no way to know that a normal variable has changed.
-   For the UI to update, React must **re-render** the component with the new value.

That’s why normal JS variables don’t work for dynamic UI updates.
We need **state variables** managed by the **`useState()` hook**.

### Correct Implementation with `useState()`

```js
const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    console.log("Header Rendered");
    // This will print again every time the button is clicked.

    return (
        <div className="header">
            <div className="nav-items">
                <ul className="nav-items-list">
                    <li
                        className="nav-list-item"
                        onClick={() => {
                            setIsLogin(!isLogin);
                        }}
                    >
                        {isLogin ? "Logout" : "Login"}
                    </li>
                </ul>
            </div>
        </div>
    );
};
```

### Thought Process Behind This

**With normal JS variables:**

-   React cannot track updates to a normal variable.
-   Therefore, it won’t re-render the component, and the UI will remain unchanged.

**With state variables:**

-   The `useState()` hook gives us a **state variable** and a **setter function**.
-   Whenever the setter function is called, React re-renders the entire component with the updated state value.

<br>

-   In our example, when we click the Login button, `setIsLogin()` is called.
-   React updates the `isLogin` state and **re-renders** the `Header` component.
-   On re-render, the updated `isLogin` value is used, so the button label switches between **Login** and **Logout**.

**Note:**
When React re-renders a component, it executes the entire component function again - not just one element.
So, the `Header` component function is called again, but only the parts of the DOM that have changed (here, the Login/Logout button) are updated in the browser.

### How Are We Able to Update a `const` Variable?

-   The state variable (`isLogin`) is declared using `const`, yet we can still “update” it using `setIsLogin()`.

-   That’s because React doesn’t mutate the same variable.

-   Whenever we update the value of the `isLogin` state variable using its modifier function, React re-renders the entire component.
-   As a result, the component function is executed again (function is invoked again), and a **new `isLogin` variable** is created.
-   This new `isLogin` variable is different from the previous one.
-   However, it is **not initialized with the default value**.
-   Instead, it is initialized with the **updated value** provided by `setIsLogin()`.
-   In other words, we are updating the state for the **next render cycle**.

### Diffing Algorithm in Action

-   When the setter function from `useState()` is called and the new value differs from the old one, React triggers a **re-render** of that component.

-   React then **compares the new Virtual DOM** with the previous one using its **Diffing Algorithm**.

-   Only the parts of the actual DOM that have changed are updated.

-   That’s why in our example, only the Login button text changes in our HTML, while everything else (like the logo or navigation items) remains intact.

So, even though the entire `Header` component function re-executes, React efficiently updates **only the necessary parts** of the DOM.

> Reference:
> [React Docs – useState](https://react.dev/reference/react/useState)
>
> [React Docs – setState Caveats](https://react.dev/reference/react/useState#setstate-caveats)

# Implementing Search Functionality

-   To filter restaurants dynamically and update the UI, we first need to track the text entered by the user in the **input** element.
-   To do this, we bind the input’s `value` attribute to a **state variable**.

```js
<div className="search-container">
    <input
        type="text"
        className="search-bar"
        placeholder="Search for restaurants"
        value={searchText}
    ></input>
    <button
        className="search-btn"
        onClick={() => {
            // Filter the restaurant cards and update the UI
        }}
    >
        <i className="bi bi-search"></i>
    </button>
</div>
```

-   Here, the `value` of the input field is **controlled by React** through the `searchText` state variable.
-   So whatever is stored in `searchText` will appear inside the input box.

### Why Can’t We Type in the Input Box?

-   Initially, when we try to type, the input value doesn’t change.
-   This is b/z the value of the input box is **still tied to the `searchText` variable**.

-   Until we update `searchText`, the input box value remains the same.

> “React will force the input to always have the value you passed.”
> [React Docs - Input Component](https://react.dev/reference/react-dom/components/input#:~:text=Show%20more-,Pitfall,-If%20you%20pass)

### The Fix: `onChange` Handler

To make the input field responsive, we must update the `searchText` state whenever the user types:

```js
onChange={(event) => setSearchText(event.target.value)}
```

-   Every time the user types, the `onChange` event fires.
-   The callback updates `searchText`, causing React to re-render the component with the new value.
-   As a result, the input box value changes dynamically and stays in sync with the React state.

### Behind the Scenes

-   When we type inside the input element, we are updating a local state variable.
-   We know that whenever a state variable changes, React re-renders the component.

**Whenever a state variable updates, React triggers a reconciliation cycle (re-renders the component).**

-   As we type each character in the input box, React re-calls the `Body` component.
-   It creates a new Virtual DOM.
-   Then, React applies the diffing algorithm to find the difference between the old Virtual DOM and the new one.
-   The difference lies only in the input element.
-   Everything else remains the same.
-   Hence, only the input element gets updated in the real DOM.

**React re-renders (re-calls) the entire `Body` component but updates only the input element’s value inside the DOM.**

-   It updates only that specific part of the DOM that needs to change.
-   That’s why React is fast and efficient.

```js
const [listOfRestaurants, setListOfRestaurants] = useState([]);
const [searchText, setSearchText] = useState("");
const [noRestaurants, setNoRestaurants] = useState(false);
let restaurants = [];

console.log("Body Rendered"); // Logged every time we type in the input field.

useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {
    const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.918938&lng=75.7887458&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const data = await response.json();

    console.log(data);
    restaurants =
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;

    setListOfRestaurants(restaurants);
};

// Conditional Rendering
return listOfRestaurants.length === 0 ? (
    <Shimmer />
) : (
    <div className="body">
        <div className="filter">
            <div className="search-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search for restaurants"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                />
                <button
                    className="search-btn"
                    onClick={() => {
                        const filteredList = restaurants.filter((item) =>
                            item.info.name
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                        );

                        if (filteredList.length === 0) setNoRestaurants(true);
                        else {
                            setNoRestaurants(false);
                            setListOfRestaurants(filteredList);
                        }
                    }}
                >
                    <i className="bi bi-search"></i>
                </button>
            </div>
            <button
                className="top-rated"
                onClick={() => {
                    const filteredList = listOfRestaurants.filter(
                        (item) => item.info.avgRating > 4
                    );
                    setListOfRestaurants(filteredList);
                }}
            >
                Top Rated Restaurants
            </button>
        </div>
        {noRestaurants ? (
            <p className="msg">No Restaurants Found!</p>
        ) : (
            <div className="restaurant-container">
                {listOfRestaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.info.id}
                        restaurantData={restaurant}
                    />
                ))}
            </div>
        )}
    </div>
);
```

-   With this setup, whenever `listOfRestaurants` changes, React triggers the reconciliation cycle and updates the DOM accordingly.

## Bug

-   Here, we are updating `listOfRestaurants` with the `filteredList`.
-   So, it works the first time.
-   But afterward, it doesn’t - because subsequent searches are performed on an already filtered list instead of the full set of restaurants.

### Solution

-   We should not modify the original list of restaurants.
-   Instead, we’ll keep it intact and create a separate copy to modify and render.

```js
const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [noRestaurants, setNoRestaurants] = useState(false);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    console.log("Body Rendered");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.918938&lng=75.7887458&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const data = await response.json();

        console.log(data);
        setFilteredRestaurants(
            data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants
        );

        setListOfRestaurants(
            data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
                ?.restaurants
        );
    };

    return listOfRestaurants.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="body">
            <div className="filter">
                <div className="search-container">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search for restaurants"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                    <button
                        className="search-btn"
                        onClick={() => {
                            const filteredList = listOfRestaurants.filter(
                                (item) =>
                                    item.info.name
                                        .toLowerCase()
                                        .includes(searchText.toLowerCase())
                            );

                            if (filteredList.length === 0)
                                setNoRestaurants(true);
                            else {
                                setNoRestaurants(false);
                                setFilteredRestaurants(filteredList);
                            }
                        }}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                <button
                    className="top-rated"
                    onClick={() => {
                        const filteredList = listOfRestaurants.filter(
                            (item) => item.info.avgRating > 4
                        );

                        setFilteredRestaurants(filteredList);
                    }}
                >
                    Top Rated Restaurants
                </button>
            </div>
            {noRestaurants ? (
                <p className="msg">No Restaurants Found!</p>
            ) : (
                <div className="restaurant-container">
                    {filteredRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.info.id}
                            restaurantData={restaurant}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
```

-   We now maintain two states:

    -   `listOfRestaurants` → stores the original data.
    -   `filteredRestaurants` → stores the modified (filtered) data to display.

-   This ensures that the original list remains unchanged while the filtered version is updated and rendered dynamically.
