# What is React?

React is a **JS library** used for building dynamic and interactive user interfaces.

## Why was React created?

When a browser loads an HTML page, it converts the HTML code into a **tree-like structure** called the **DOM (Document Object Model)**.
This allows us to use JS to dynamically update the page content in response to user interactions.

However, as applications grow in size, using plain JavaScript (vanilla JS) to directly manipulate the DOM becomes:

-   Challenging to manage
-   Prone to complex, error-prone code

### Solution: React

With React, we do not have to worry about querying and updating elements. Instead, we describe our web page using **small and reusable components** and React will take care of efficiently creating and updating DOM elements.

![Components](Screenshots/1.%20Components.png)

**Components** help us write reusable, modular, and better-organized code.
A React application is a **tree of components** with `App` being the root of the tree.

![Component Tree](Screenshots/2.%20Component%20Tree.png)

# Creating a React App

There are 2 ways:

1. **Create React App (CRA)** – Official React tool.
2. **Vite** – A modern build tool that is faster and produces smaller bundles.

---

### Create a new app using Vite:

```bash
npm create vite@latest
```

This prompts:

1. **Project name** → default is `vite-project`
2. **Select a framework** → React
   (Vite can create other JS projects too.)
3. **Select a variant (language)** → TypeScript

```bash
cd react-app
npm i         # install 3rd party libraries
npm run dev   # run our web server
```

With `npm run dev`, we have a web server at the address [http://localhost:5173](http://localhost:5173).

> The port `5173` may change depending on the machine.

# Project Structure

Inside the `react-app` folder:

-   **node_modules** → Stores third-party libraries (e.g., React)

-   **public** → Static assets (images, videos, etc.)

-   **src** → Source code folder

    -   By default contains one component: `App`

-   **index.html**

    -   Contains a `div` with id `root` → container for the React app
    -   Includes a script which is the entry point to our application:

        ```html
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
        ```

-   **package.json** → Metadata: project name, dependencies, scripts, etc.

-   **Dev dependencies** → Used only during development (not included in production build)

-   **tsconfig.json** → TypeScript compiler configuration

-   **vite.config.ts** → Vite configuration file

> Usually, you don’t need to modify the configuration files.

# Creating a React Component

React components are usually stored in the `src` folder.
File extensions:

-   `.ts` → Plain TS file
-   `.tsx` → TS + JSX (used for React components)

There are 2 types of components:

1. Class components (older, less common today)
2. Function components (modern, concise, widely used)

---

### Example: `Message.tsx`

For naming func-based components, we use PascalCase.
This is the convention used by React and other developers.  
In func definition, we describe how the UI will look like where we will use this component.

Let’s say that wherever we use this component, we want to render an `h1` element with a message.
So, we write:

```tsx
function Message() {
    return <h1>Hello World</h1>;
}
```

-   This syntax is **JSX** (JavaScript XML), not plain HTML.
-   JSX gets compiled into JavaScript by tools like **Babel**.
    → Try it at [Babel REPL](https://babeljs.io/repl).

Now, we have a basic React component.  
To use this, we have to export it as a default object from this module:

```tsx
export default Message;
```

---

### Using the Component in `App.tsx`

> We have written everything from scratch in this file.

When we import the `Message` component, we can use it in a file just like a regular HTML element.

```tsx
import Message from "./Message";

function App() {
    return (
        <div>
            <Message></Message>
        </div>
    );
}
```

Here, we can also use self-closing syntax:

```tsx
return (
    <div>
        <Message />
    </div>
);
```

Now, just like `Message` component, we have to export `App` component so that it can be used somewhere else.

```tsx
export default App;
```

With these 2 files, now if we go to our terminal, we will see our app running.

## Hot Module Replacement (HMR)

-   It is a technique that allows real-time updating of individual modules or components within a running application without requiring a full page reload.
-   So Vite, under the hood, monitors our files for changes.
-   Whenever we make any changes, it will automatically refresh our page in the browser.

---

In the real world, a component may have behavior.  
So, we could have a button and when we click on it, something changes in the UI.

With JSX, we can easily describe the UI of our application with HTML and JS.  
Also, JSX allows us to easily create dynamic content.

**Example**:
We can create a var `name` and according to the value of this var, we can have a message inside `h1` element.

```tsx
const name = "Sansita";
if (name) return <h1>Hello {name}</h1>;
return <h1>Hello World</h1>;
```

Inside `{}`, we can write any JS expression.  
**JS expression** is a piece of code that produces a value.
So, we can write a var or call a func inside `{}` and the value produced by them will be displayed on our webpage.

# How React Works?

With current implementation, we have a component tree with `App` being the root or top-level component and `Message` being the child.

-   When our application starts, react takes this component tree and builds a JS data structure called **Virtual DOM**.

-   **Virtual DOM**:

    -   It is diff from the actual DOM of the browser.
    -   It is a lightweight, in-memory representation of our component tree where each node represents a component and its properties.

![Virtual DOM](Screenshots/3.%20Virtual%20DOM%20-%201.png)

-   When state/data changes:

    1. React updates the the corresponding node in virtual DOM
    2. Compares new vs. old virtual DOM
    3. Updates only the necessary parts of the actual DOM

![Virtual DOM](Screenshots/3.%20Virtual%20DOM%20-%202.png)

Technically, updating the DOM is not done by the React itself.
It is done by a companion library called **React DOM**.

## How React and React DOM work together?

We know that, in `index.html` file, we have a `div` with an id of `root` and a script element referencing `main.tsx`.
In `main.tsx`, we use React DOM to render or display our component tree inside an element with the id of `root`.

```tsx
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
```

Here, `App` component is wrapped by another component called `StrictMode`.

### StrictMode

-   It is one of the built-in components in React.
-   It does not have a visual representation.
-   **Purpose**: To identify potential problems.

So, we are rendering the component tree using React DOM.
We can also render it on a mobile app using a diff library called **React Native**.

So, React itself is not limited to a particular platform like web or mobile.
It is platform independent and we can use it to build apps for web and mobile devices.

# React Ecosystem

In contrast to React, we have another tools like Angular and Vue which are called **Frameworks**.

### Library v/s Framework

-   **Library** → A single tool that provides a specific functionality
-   **Framework** → A set of tools and guidelines for building apps

So, library is like a single tool but framework is like a tool set.

React is just a tool for building react interfaces.
It can only build dynamic and user interactive interfaces.

But in a real life application we need many more things like:

-   Routing
-   HTTP
-   Managing app state
-   Internationalization
-   Form Validation
-   Animations

In React Ecosystem, we have diff libraries for these tasks.

This collection of tools + React is known as the **React Ecosystem**.
