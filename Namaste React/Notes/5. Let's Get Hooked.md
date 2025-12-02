# Need for React

-   Everything that React can do can also be done using normal HTML and JS.

-   Behind the scenes, React also uses JS only.

-   The main goal of any framework or library is to make the **developer experience easier**.

-   It helps us write less code and achieve more functionality on the webpage.

-   React makes coding smoother and also performs optimizations on the webpage so that everything works faster and more efficiently.

## Cleaning Our App

-   The best practice in the industry is to create separate files for separate components.
-   We can also keep everything in the same file. Eventually, Parcel will take the entire code and bundle it into a single compressed file.
-   However, to make our project more **readable and maintainable**, we separate components into different files.

### Folder Structure

-   **`src` folder:** Source code of our app

-   **`components` folder:** Contains all the components of our app

-   **File name:** Usually same as the component name

-   The extension of a component file can be `.js` or `.jsx`.

-   For React, there is no difference between them; it doesn’t matter much.

-   `.jsx` simply indicates that the file contains JSX code.

-   Since React is just a JS library, it makes no difference whether we use `.js` or `.jsx`.

-   They are completely interchangeable.

> Reference: [What is the difference between using .js vs .jsx files in React?](https://stackoverflow.com/questions/46169472/what-is-the-difference-between-using-js-vs-jsx-files-in-react)

-   When we separate components into different files, we need to **import** them into our main `App.js` file.
-   Just like we import React from the `node_modules` folder, we import our own components.

-   To import a component in `App.js`, we first need to **export** it from its own file (for example, `Header.js`).

## Restaurants Data

-   We should not hardcode restaurant data inside the components folder.

-   It is a best practice to keep data separate from components.

-   Common practice: keep such data inside a separate folder like `config` or `utils`.

-   Keep all constants in a file named `constants.js`.

-   Good practice: Name all constants in uppercase letters (e.g., `CDN_URL`).

## Ways to Export or Import Data

### 1. Default Export / Import

-   In one file, we can have only **one default export**.

    > By default, a module can have only one export.

```js
const Body = () => {
    return <div className="body"></div>;
};

export default Body;
```

**Import:**

```js
import Body from "./components/Body";
```

### 2. Named Export / Import

-   If we need to export multiple things from one file, we use **named exports**.

```js
export const Body = () => {
    return <div className="body"></div>;
};
```

**Import:**

```js
import { Body } from "./components/Body";
```

We can also use both export types in the same file:

```js
export const Component1 = () => {};

const Component2 = () => {};
export default Component2;
```

**Import:**

```js
import { Component1 }, Component2 from "path";
```

# React Hooks

## Adding an Event Listener in React

```js
<button className="top-rated" onClick={() => console.log("Button Clicked")}>
    Top Rated Restaurants
</button>
```

-   The `onClick` attribute is used to handle the click event for the button element.

-   It takes a **callback function**.

-   Suppose we want to show only top-rated restaurants when this button is clicked.

-   We can do this using the `restaurants` array.

-   Our UI is a **config-driven UI**, meaning it is powered by restaurant data.

-   So, when the data changes → the UI changes.

-   In a React app, we have two layers:

    1. **Data Layer**
    2. **UI Layer**

-   The UI layer displays the content provided by the data layer.

-   So, if we modify the data, the UI should also change automatically.

-   On button click, we want to filter restaurants and change our `restaurants` array.

-   As a result, the UI should automatically update.

```js
const Body = () => {
    let listOfRestaurants = restaurants;

    return (
        <div className="body">
            <div className="filter">
                <button
                    className="top-rated"
                    onClick={() => {
                        listOfRestaurants = listOfRestaurants.filter(
                            (item) =>
                                Number(item.info.rating.aggregate_rating) > 4
                        );
                        console.log(listOfRestaurants);
                    }}
                >
                    Top Rated Restaurants
                </button>
            </div>
            <div className="restaurant-container">
                {listOfRestaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.info.resId}
                        restaurantData={restaurant}
                    />
                ))}
            </div>
        </div>
    );
};
```

-   Here, we filtered the restaurants and updated the array.

-   However, the UI did not update after clicking the button.

-   Ideally, since the array has changed, the UI should have been re-rendered automatically - but that did not happen.

### WHY?

Two things prevent the change from being visible:

1. **Local variables don’t persist between renders**

    - When React renders this component a second time, it renders it from scratch—it doesn’t consider any changes to the local variables.

2. **Changes to local variables won’t trigger renders**

    - React doesn’t realize it needs to render the component again with the new data.

> Reference: [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)

-   This is the **exact problem React solves**.

-   React ensures that when data changes, the UI updates automatically.

**React is very fast and efficient in DOM manipulation.**

-   React helps us maintain consistency between the **data layer** and the **UI layer**.

-   They should always remain in sync.

-   Since our UI is tied to the list of restaurants, it should change whenever the list changes.

-   To achieve this, React provides a special mechanism.

Currently, `listOfRestaurants` is a normal JS variable.
Now, we will create a **special variable** with React’s superpowers → called a **state variable**.

## State Variable - The Super Powerful Variable

-   A **state variable** is a variable that maintains the state of a component.

-   **Local State Variable:** Its scope is limited to that particular component.

-   To create a state variable, we use a React Hook called **`useState`**.

## What is a React Hook?

-   A React Hook is a **normal JS function** provided by React.

-   The difference is that it comes with special utilities and built-in logic.

-   Hooks are **utility functions** with logic written behind the scenes by React developers.

-   This internal logic was implemented by Facebook developers inside the React library that we import from `node_modules`.

-   We get access to these utility functions when we install React using the `npm install` command.

<br>

-   To update a component with new data, two things need to happen:

1. **Retain** the data between renders.
2. **Trigger** React to render the component with new data (re-rendering).

-   The `useState` Hook provides those two things:

1. A **state variable** to retain the data between renders.
2. A **state setter** function to update the variable and trigger React to render the component again.

> Reference: [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)

## `useState()`

-   It is used to create **state variables** in React.

```js
// State variable
const [listOfRestaurants] = useState([]);

// Normal JS variable
let listOfRestaurants = [];
```

-   `useState()` returns an **array** with two elements:

    1. The **state variable**
    2. The **function** to modify that state variable

-   `listOfRestaurants` declared inside the `Body` component is the **local state variable** of that component.

-   The default or initial value of the state variable is passed as an argument to `useState()`.

```js
// State variable
const [listOfRestaurants] = useState({
    info: {
        resId: 100159,
        name: "Khandelwal Pavitra Bhojnalaya",
        image: {
            url: "https://b.zmtcdn.com/data/pictures/9/100159/880d78e1886f5fc605bcfa556ecab40b_o2_featured_v2.jpg",
        },
        rating: {
            aggregate_rating: "3.5",
            rating_color: "9ACD32",
        },
        cfo: {
            text: "\u20b9150 for one",
        },
        cuisine: [
            {
                url: "https://www.zomato.com/jaipur/restaurants/north-indian/",
                name: "North Indian",
            },
        ],
    },
    order: {
        deliveryTime: "22 min",
    },
});
```

-   With this, a single restaurant card will be displayed on the webpage.
-   The state variable behaves like a normal JS variable but has additional React-powered behavior.

## Modifying the State Variable

-   We cannot modify a state variable directly like a normal variable.  
    → Instead, we use the function returned by `useState()`.

```js
const [listOfRestaurants, setListOfRestaurants] = useState([]);
```

-   It is a common convention to name the modifier function as `set` + _variableName_.
-   This function updates the state variable and triggers React to re-render the component.

```js
const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState(restaurants);

    return (
        <div className="body">
            <div className="filter">
                <button
                    className="top-rated"
                    onClick={() => {
                        const filteredList = listOfRestaurants.filter(
                            (item) =>
                                Number(item.info.rating.aggregate_rating) > 4
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
                        key={restaurant.info.resId}
                        restaurantData={restaurant}
                    />
                ))}
            </div>
        </div>
    );
};
```

**State variables keep the UI in sync with the data layer.**

-   When a normal JS variable is updated, the UI does not automatically refresh.
-   But when a state variable is updated, React automatically re-renders the component, updating the UI accordingly.

**Whenever a state variable updates, React re-renders the component.**

-   This re-rendering happens quickly and efficiently.
-   React’s main strength lies not in bundling or minifying code, but in its **efficient DOM manipulation**.

## How React Works Behind the Scenes

> Must Read: [Unlocking React’s Secret: Mastering Reconciliation and the Diff algorithm](https://namastedev.com/blog/unlocking-reacts-secret-mastering-reconciliation-and-the-diff-algorithm)

### 1. Reconciliation Algorithm

-   React uses an algorithm called **Reconciliation** to efficiently update the UI.
-   The process of comparing the new virtual DOM with the previous one using diff algorithm is called **reconciliation**.

### 2. DOM

-   The **DOM** (Document Object Model) is a programming interface for web documents.
-   It represents the structure of a document (like HTML) as a tree of objects, where each object corresponds to a part of the document.

### 3. What is the Virtual DOM?

-   The **Virtual DOM** is a lightweight copy or in-memory representation of the actual DOM that React keeps with it.
-   It is a **nested JS object** that mirrors the structure of the UI.
-   When UI changes occur (e.g., updating restaurant cards), React updates the UI efficiently using a **Virtual DOM**.

### 4. Diff Algorithm

-   Whenever the state changes, React creates a new Virtual DOM.
-   The **Diff Algorithm** compares the old Virtual DOM with the new Virtual DOM.
-   It identifies the differences between them.
-   React then updates **only those parts** of the actual DOM that changed.

-   This makes React fast because:

    -   Comparing two HTML structures directly is tough and expensive.
    -   Comparing two JS objects (virtual DOMs) is faster.

-   Thus, React minimizes direct manipulation of the real DOM.

### 5. React Fiber

-   **React Fiber**, introduced in React 16, improved the performance and flexibility of UI updates.
-   React fiber is a re-implementation of React’s core algorithm.

-   It enables **incremental rendering** by splitting rendering work into smaller chunks.
-   **Incremental Rendering:** Breaking rendering work into smaller, manageable chunks for improved performance.

-   React Fiber improves scheduling, making UI updates smoother and more responsive.

### 6. Why React is Fast

React’s speed comes from:

1. Efficient Virtual DOM management
2. Fast diffing between Virtual DOM trees
3. Selective real DOM updates
4. Optimized reconciliation handled by React Fiber

-   This ensures that the **UI layer** and the **data layer** always remain synchronized.

-   Virtual DOM is not unique to React, but React popularized and optimized its use.
-   React took that virtual dom and built its core algorithm over that.

## Key Points

### Role of useState in Re-rendering

-   React monitors all variables created using `useState()`.
-   When the **setter function** (e.g., `setListOfRestaurants`) is called:

    -   React triggers the **reconciliation process**.
    -   It finds the differences between Virtual DOMs.
    -   It updates the UI automatically by re-rendering the component.

-   This ensures that the UI always reflects the latest data.
-   React updates only the necessary parts of the UI instead of re-rendering everything.

### Array Destructuring with useState

Example:

```js
const [listOfRestaurants, setListOfRestaurants] = useState([]);
```

Equivalent to:

```js
const arr = useState([]);
const listOfRestaurants = arr[0];
const setListOfRestaurants = arr[1];
```

This syntax is called **array destructuring** in JavaScript.

### Extra Points

> Reconciliation is the algorithm behind what is popularly understood as the "virtual DOM."
>
> A high-level description goes something like this: when you render a React application, a tree of nodes that describes the app is generated and saved in memory. This tree is then flushed to the rendering environment — for example, in the case of a browser application, it's translated to a set of DOM operations.
>
> When the app is updated (usually via setState), a new tree is generated. The new tree is diffed with the previous tree to compute which operations are needed to update the rendered app.

> Reference: [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture/blob/master/README.md)

[Reconciliation vs Rendering](https://github.com/acdlite/react-fiber-architecture?tab=readme-ov-file#reconciliation-versus-rendering)

[Understanding the React Fiber Architecture](https://namastedev.com/blog/understanding-the-react-fiber-architecture-2)
