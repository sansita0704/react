# What is React?

React is a JS library used for building dynamic and interactive user interfaces.

### Why was React created?

When our HTML page is loaded in the browser, the browser takes the HTML code and creates a tree-like structure called DOM (Document Object Model). This allows us to use JS and change the page content dynamically in response to user interactions.

But as our applications grow, using plain JS (vanilla JS) to access and manipulate DOM elements can become really challenging. Also, our code can become complex to manage.

This is where React comes into the picture.  
With React, we do not have to worry about querying and updating elements. Instead, we describe our web page using small and reusable components, and React will take care of efficiently creating and updating DOM elements.

![Components](Screenshots/1.%20Components.png)

Components help us write reusable, modular, and better-organized code.

A React application is a tree of components with `App` being the root of the tree.

![Component Tree](Screenshots/2.%20Component%20Tree.png)

# Creating a React App

There are 2 ways to create a React app:

1. Using the official tool provided by the React team called **Create React App (CRA)**
2. **Vite**: It is a build tool which is much faster and gives us smaller bundle sizes

---

### Create a new app using Vite:

```bash
npm create vite@latest
```

This will ask some questions like:

1. **Project name**: by default, it is `vite-project`
2. **Select a framework**: React
   (So, using Vite, we can create any kind of JS project.)
3. **Select a variant (language)**: TypeScript

```bash
cd react-app
npm i         # to install all 3rd party libraries
npm run dev   # to run our web server
```

With `npm run dev`, we have a web server at the address [http://localhost:5173](http://localhost:5173).

> The port `5173` may change depending on the machine.

# Project Structure

### Brief overview of `react-app` folder

-   **node_modules**: Folder where all 3rd party libraries like React and other tools are installed

-   **public**: Folder where public assets of our website exist like images, video files, etc.

-   **src**: Source code of our app.
    When we create our app, this folder has a single component called App component.

-   **index.html**:

    -   It has some basic HTML code.
    -   It has a `div` with the id of `root` which is the container for our application.

    ```html
    <div id="root"></div>
    ```

    -   Also, it has a script element which is the entry point to our application.

    ```html
    <script type="module" src="/src/main.tsx"></script>
    ```

-   **package.json**: It has info about our project like name of project, dependencies, dev dependencies, etc.

-   **Dev dependencies**:
    These are only used for development.
    They are not going to be deployed with our application in the future.

-   **tsconfig.json**: It has a bunch of settings for telling the TS compiler how to compile our code to JS.

-   **vite.config.ts**: Configuration file for Vite.

> We generally do not touch these configuration files.

# Creating a React Component

To create a React component, we add a new file in `src` folder called `Message.tsx`.

-   `.ts`: plain TS file
-   `.tsx`: for React components

There are 2 ways to create a React component:

1. JS class
2. JS function

These days, we use function-based components as they are more concise and easier to write.

---

### `Message.tsx`

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

Here, we are not writing HTML code in the middle of JS code.
This syntax is called **JSX** (JavaScript XML).

JSX code, under the hood, is going to get compiled down to JS code.

> Go to [https://babeljs.io/repl](https://babeljs.io/repl) to see how JSX code gets converted to JS code.

Now, we have a basic React component.
To use this, we have to export it as a default object from this module:

```tsx
export default Message;
```

Now, we can use this component in our `App` component.

---

### `App.tsx`

> We have written everything from scratch in this file.

In `App` component, we have a div.
Inside the div, we have our `Message` component.
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

---

-   **HMR**: Hot Module Replacement

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

-   When the state or the data of a component changes, React updates the corresponding node in the virtual DOM to reflect the new state.
-   Then, it compares the current version of virtual DOM with the previous version to identify the nodes that should be updated.
-   Then, it updates those nodes in the actual DOM.

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

-   **Library**: A tool that provides specific functionality
-   **Framework**: A set of tools and guidelines for building apps

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
