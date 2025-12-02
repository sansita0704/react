# Basic Hello World with JavaScript

```html
<div id="root"></div>

<script>
    const heading = document.createElement("h1");
    heading.innerText = "Hello World from JS!";

    const root = document.getElementById("root");
    root.appendChild(heading);
</script>
```

# Basic Hello World with React

## Why React is not directly understood by browsers?

-   Browsers have a JS engine, so they can run JS.
-   But they **do not understand React syntax directly**.
-   We first need to import React into our project.

## Using React via CDN

-   **CDN (Content Delivery Network)**: Websites where React has been hosted, so we can pull it into our project.
-   Example: [React CDN Links](https://legacy.reactjs.org/docs/cdn-links.html).
-   We add React and ReactDOM using `<script>` tags:

    ```html
    <script
        crossorigin
        src="https://unpkg.com/react@18/umd/react.development.js"
    ></script>
    <script
        crossorigin
        src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    ></script>
    ```

<br>

-   React is nothing but plain JS code.
-   It is a JS library.
-   With these cdn links, we are importing JS files where all React code has been written.
-   So, with these links, we have injected React into our project.
-   Now our project and the browser will understand React.

### `crossorigin` attribute

-   The **crossorigin** attribute is part of the CORS (Cross-Origin Resource Sharing) mechanism in browsers.
-   It tells the browser how to handle requests for resources (like scripts, images, fonts, etc.) that are loaded from a different origin (domain) than our website.
-   **Example**: Here, we are fetching this script from a diff origin (unpkg.com), so we are using crossorigin to apply a specific CORS policy when requesting it.

## Why Two Files?

1. **react.development.js** → Core React library (creating elements, components).
2. **react-dom.development.js** → React methods for DOM operations or manipulation.

-   React works not only for browsers but also for mobile phones as **React Native**.
-   So, it works at diff places using diff objects and methods.
-   Hence, DOM-specific operations are separated.
    -   That's why, there are 2 separate files.
    -   **1st file is** the main or core react.
    -   **2nd file** is like the bridge b/w react and browsers (or DOM).

# Creating a React Element

```js
const heading = React.createElement(
    "h1",
    { id: "heading", xyz: "abc" },
    "Hello World from React!"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);

console.log(heading); // React element as a JS object
```

## `createElement()`

-   `React.createElement(tag, obj, children)`

    -   **1st argument** → Tag name
    -   **2nd argument** → Object through which we give attributes to our tags.
    -   **3rd argument** → Children (content or nested elements)

## Root

-   In React, firstly we need a **root** in which React will do all DOM manipulations.

**NOTE**:

-   The creation of an element is the core thing in react.
-   So, we will use 1st file to do it i.e. `React.createElement()`.
-   But creating a root is related to browser or DOM.
-   So, we will use ReactDOM for it.

```js
const root = ReactDOM.createRoot(document.getElementById("root"));
```

-   It creates a **root** obj for rendering content on the webpage.
-   With this code, the element with the id of 'root' is the root of our react app.
-   So, now the div#root is the entry point of our DOM i.e. react will put our entire code into this div.
-   The root obj is assigned to `root` const so, the `root` is attached to the div with id of root.
-   It is then used to render the component of our application.

```js
root.render(heading);
```

-   It will render this `heading` inside the `div`.

## Points to Note

-   This `heading` is not an `h1` tag.
-   It is a react element.
-   A **react element** is nothing but a normal JS obj.

<br>

-   `heading` has a property called `props` which is an obj.
-   **props = children + attributes** (these attributes are same that we pass using the 2nd arg of `createElement()`)

<br>

-   So, the job of `root.render()` is to take this react element (JS obj), convert it into HTML element that the browser understands and then add it in the root of our app i.e. the div with id of 'root'.

**NOTE:**

-   It is not a good practice to write our entire react code in this html file.
-   So, let's add it in separate JS file.

# Nested Elements Example

Equivalent HTML:

```html
<div id="parent">
    <div id="child">
        <h1>I'm h1 tag</h1>
    </div>
</div>
```

React code:

```js
let parent = React.createElement(
    "div",
    { id: "parent" },
    React.createElement(
        "div",
        { id: "child" },
        React.createElement("h1", {}, "I'm h1 tag")
    )
);

root.render(parent);
```

# Sibling Elements Example

Equivalent HTML:

```html
<div id="parent">
    <div id="child">
        <h1>I'm h1 tag</h1>
        <h2>I'm h2 tag</h2>
    </div>
</div>
```

React code:

```js
parent = React.createElement(
    "div",
    { id: "parent" },
    React.createElement("div", { id: "child" }, [
        React.createElement("h1", {}, "I'm h1 tag"),
        React.createElement("h2", {}, "Sibling"),
    ])
);

console.log(parent);
root.render(parent);
```

-   To add multiple children, pass an **array** as the third arg.
-   So, the third arg can either be a single child element or an arr of children.

# More Complex Example

Equivalent HTML:

```html
<div id="parent">
    <div id="child1">
        <h1>I'm an h1 tag</h1>
        <h2>I'm an h2 tag</h2>
    </div>
    <div id="child2">
        <h1>I'm an h1 tag</h1>
        <h2>I'm an h2 tag</h2>
    </div>
</div>
```

React code:

```js
parent = React.createElement("div", { id: "parent" }, [
    React.createElement("div", { id: "child1" }, [
        React.createElement("h1", {}, "I'm an h1 tag"),
        React.createElement("h2", {}, "I'm an h2 tag"),
    ]),
    React.createElement("div", { id: "child2" }, [
        React.createElement("h1", {}, "I'm an h1 tag"),
        React.createElement("h2", {}, "I'm an h2 tag"),
    ]),
]);

root.render(parent);
```

-   This quickly becomes **complex and hard to read**.
-   That’s why **JSX** was introduced → to make React code cleaner and more understandable.

# Important Notes on File Order and Rendering

-   React and ReactDOM scripts **must be included before** `app.js` b/z `app.js` is using the objects and methods defined in react.js file.
-   Otherwise, we’ll get error saying `React is not defined`.

<br>

-   If there’s content inside `div#root` in `index.html`, `root.render()` will **replace it**, not append.
-   Any HTML **outside** the root div remains unchanged.
-   React is applied **only inside the root div**.

### When the browser reads our code and executes it:

1.  It first prints whatever is written inside the div#root.
2.  It sees js files so it loads react and reactDOM to our app.
3.  It sees our `app.js` file and it loads it into our app.
4.  It starts executing `app.js` file line by line and then render parent to our div#root.

-   So, the code in div#root will be **replaced** and not appended.

# Why React is a Library (not a Framework)?

-   React is just a **library** because:

    -   It can be applied to a small part of a page.
    -   You can include it via CDN and use it directly.

-   A **framework** comes with a lot of built-in structure and requires a full app setup.

### NOTE:

-   The most costly operation in browsers is DOM manipulation i.e. adding new nodes into the DOM tree or removing older ones.
-   So, all the libraries and frameworks aims to optimise this operation.
-   React also has the same aim.
-   It allows us to manipulate the DOM using JS.
-   It provides us helper functions to achieve this.
