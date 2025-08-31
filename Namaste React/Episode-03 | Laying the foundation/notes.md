# Creating a Script

-   Script for creating a **dev build**:

```json
"scripts": {
    "start": "parcel index.html"
}
```

-   Script for creating a **prod build**:

```json
"scripts": {
    "build": "parcel build index.html"
}
```

-   It is a standard convention to use these scripts for running commands.

## Running These Scripts

```bash
# npm run 'name of the script'
npm run start
npm run build
```

-   Instead of running `npx parcel index.html` again and again, we can directly run `npm run start`.
-   This way, npm will run the command specified in `package.json`.
-   Instead of writing `npm run start`, we can also write `npm start` (both work the same way).
-   But we cannot write `npm build`; we must write `npm run build`.

# React Element

-   A React element is a **JS obj**, not an HTML element.

-   When we render this element on the DOM, it becomes an HTML element.

-   `React.createElement()` creates a JS obj for us.

-   When we write `root.render(heading)`, ReactDOM takes the React element (`heading`), converts it into an HTML element, and then pushes it to the browser.

-   _Pushing to the browser_ means it will **replace** everything inside the root div with the rendered content.

**Best Practice:** Keep a fallback `<h1>` element inside the root div:

```html
<div id="root">
    <h1>Not Rendered</h1>
</div>
```

-   This way, if there is a bug in the app and `render()` does not work, we will see "Not Rendered" in the browser.

-   However, the syntax of `React.createElement()` is very complex and messy.

-   To simplify this, we use **JSX**.

# JSX

-   JSX is a JS syntax that makes it easier to create React elements.
-   JSX is not part of React itself; React can work without JSX.
-   React and JSX are two separate entities, but JSX makes development much simpler.

**Background:**

-   Before frameworks and libraries, we typically had two files:

    -   **HTML** → structure of the webpage
    -   **JS** → logic of the webpage

-   Modern libraries/frameworks attempt to merge these two concepts.
-   JSX is a convention where we merge HTML-like syntax and JS together.

# Creating an `<h1>` with JSX

```js
const jsxHeading = <h1 id="heading">Hello World using JSX Heading</h1>;
```

This is equivalent to:

```js
const heading = React.createElement(
    "h1",
    { id: "heading" },
    "Hello World from React!"
); // Creating h1 using core react
```

-   `<h1>Hello World using JSX Heading</h1>` is not HTML inside JS; it is JSX.

-   JSX != html inside JS.
-   JSX an **HTML-like or XML-like syntax**.

-   When JSX code is executed, it becomes a React element.

-   Thus, `jsxHeading` is also a React element, just like `heading`.

-   JSX is a syntax, whereas a React element is a JS obj.

```js
console.log(heading);
console.log(jsxHeading);
```

-   Both of these log the same JS obj to the console.

## Notes on JSX

-   JSX is not pure JS.

-   The JS engine, browser, and even React cannot directly understand JSX.

-   Writing JSX syntax directly in the console results in an error.

-   The reason it works in our code is because of **Parcel**.

-   Before the code reaches the browser or JS engine, it is transpiled into valid code.

**Transpilation:** The process of converting code (like JSX) into a form that browsers can understand.

-   The transpilation is not done by parcel itself.
-   It is done by a helper library of Parcel called **Babel**.

## Babel

-   A JS compiler that transpiles modern code.
-   It can:

    -   Convert ES6 code to older JS for compatibility.
    -   Convert JSX into a format React and browsers can understand.

When we do:

```js
root.render(<h1 id="heading">Hello World using JSX Heading</h1>);
```

-   ReactDOM cannot directly understand this JSX.
-   Babel transpiles it into `React.createElement()` format, which ReactDOM can then process.

## How JSX Works

1. JSX code like `<h1 id="heading">Hello World</h1>` is transpiled into `React.createElement()`.
2. `React.createElement()` creates a JS obj, which is rendered to the DOM as an HTML element.

-   BTS, JSX is just syntactic sugar for `React.createElement()`.
-   That’s why logging JSX or `createElement()` shows the same obj in the console.

## Differences Between JSX and HTML

1. **class vs className**

    - HTML → `class`
    - JSX → `className`
    - `className` in JSX is converted to `class` in HTML.

2. **Camel Case for attributes**

    - HTML → `tabindex`
    - JSX → `tabIndex`

**Note:**

-   For single-line JSX, we can write it directly.
-   For multi-line JSX, we have to wrap it in parentheses `()` so that Babel can understand the starting and ending point of JSX and can correctly parse it.

**Example:**

```js
const jsxHeading = (
    <h1 id="heading" tabIndex="5">
        Hello World using JSX Heading
    </h1>
);
```

At the end of the day, `jsxHeading` is still a React element, which is a JS obj.

# React Components

-   In React, everything is a component: button, list, heading, etc.

There are two types of components:

1. **Class-based Components** – Older approach
2. **Functional Components** – Modern approach

# React Functional Component

-   A functional component is a normal JS func that returns a piece of JSX.
-   The JSX is converted into a React element.
-   So, a functional component essentially returns a React element.

**Best Practice:** Always use **PascalCase** for component names.

```js
const HeadingComponent = () => {
    return <h1>This is a React Functional Component</h1>;
};
```

**Shorter Syntax:**

```js
const HeadingComponent = () => <h1>This is a React Functional Component</h1>;
```

**Without Arrow Function:**

```js
const HeadingComponent = function () {
    return <h1>This is a React Functional Component</h1>;
};
```

**Note:** We can write components using normal functions as well, but it is an industry standard to use the newer syntax with arrow functions.

**JSX in Multiple Lines:**

```js
const HeadingComponent = () => (
    <h1 className="heading">This is a React Functional Component</h1>
);
```

**Nested JSX:**

```js
const HeadingComponent = () => (
    <div id="container">
        <h1 className="heading">This is a React Functional Component</h1>
    </div>
);
```

## React Element and React Component

```jsx
// React Element
const heading = (
    <h1 className="heading" tabIndex="5">
        Hello World!
    </h1>
);

// React Functional Component
const Heading = () => (
    <h1 className="heading" tabIndex="5">
        Hello World!
    </h1>
);
```

## Rendering a React Functional Component

1. **Inside root:**

```js
// Rendering a React element
root.render(heading);

// Rendering a component
root.render(<Heading />);
```

-   By using angle brackets `<>`, Babel understands that it is a functional component.

2. **Inside another functional component:**

```js
const Title = () => (
    <h2 className="heading" tabIndex="5">
        This is a Title.
    </h2>
);

const Heading = () => (
    <div id="container">
        <h1 className="heading" tabIndex="5">
            This is a React Functional Component.
        </h1>
        <Title />
        <Title></Title>
    </div>
);

// This is called "Component Composition".
```

-   Here, `<Title />` is replaced with the JSX code returned by the `Title` component.

### Working

1. Babel reads this JSX code and transpiles it into JS code.
2. React converts these JS objs into HTML code using `root.render()`.
3. The browser then displays the HTML code.

## Superpower of JSX

-   We can write any piece of JS code inside JSX using `{}`.

```js
const number = 1000;

const Heading = () => (
    <div id="container">
        <h1 className="heading">This is a React Functional Component.</h1>
        {number}
        <h2>{number + 100}</h2>
        {console.log("Hello")}
    </div>
);
```

-   `{number}` will display the value of the var `number` on the webpage.

## Adding a React Element Inside a Component

-   A React element is just a normal JS obj.
-   We can add it to a component just like any other var.

```js
const heading = (
    <h1 className="heading" tabIndex="5">
        Hello World!
    </h1>
);

const Heading = () => (
    <div id="container">
        <h1 className="heading" tabIndex="5">
            This is a React Functional Component.
        </h1>
        {heading}
    </div>
);
```

-   With `{heading}`, the JSX defined in `heading` will be rendered inside our component.

## Adding a React Element Inside Another React Element

```js
const element = <span>This is a span</span>;

const heading = (
    <h1 className="heading" tabIndex="5">
        {element} <br />
        Hello World!
    </h1>
);
```

-   This is possible because `{}` allows embedding JS expressions inside JSX.

**Note:**
At the end of the day, React is just JS.

-   All JS rules apply here.
-   We cannot use a var or component before initialization.

## XSS Protection

-   Let's say, we have some data coming from an api.

```js
const data = api.getData();

const Heading = () => (
    <div id="container">
        <h1 className="heading">This is a React Functional Component.</h1>
        {data}
    </div>
);
```

-   Suppose the API returns some malicious data.
-   If rendered directly, this code could execute harmful scripts across multiple machines on which our app will be running.
-   This type of attack is called a **Cross-Site Scripting attack**.

**Definition:**
A **Cross-Site Scripting (XSS) attack** is a web security vulnerability where attackers inject malicious scripts into trusted websites, which then execute in the victim’s browser.

-   JSX prevents this by **sanitizing the data**.
-   Whatever we write inside `{}`, is not executed blindly by the browser.
-   It is first sanitized and then executed.
-   If JSX detects malicious code, it escapes it rather than executing it.

## Calling a Component as a Function

-   A React functional component is just a normal JS func.
-   Since we can run JS inside JSX using `{}`, we can call the func directly.

```js
const Heading = () => (
    <div id="container">
        <h1 className="heading" tabIndex="5">
            This is a React Functional Component.
        </h1>
        {Title()}
    </div>
);
```

These three lines of code:

```js
<Title />
<Title></Title>
{Title()}
```

-   All work the same way and render the output of the `Title` component.
