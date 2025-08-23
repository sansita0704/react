# Need for Igniting the App

-   Currently, we have HTML, CSS, and JS files.
-   At this stage, the code is not production-ready.

### Why?

Before deployment, we must prepare our app locally by performing processes like:

-   Bundling the code
-   Minifying our code → removing comments and extra spaces
-   Optimizing images

That's why, we need to **ignite** (light up) our app and make it ready to go into production.

## Can React Alone Build a Production-Ready App?

-   No.
-   Additional packages and libraries are required to make a React app production-ready.

# NPM

-   **npm != Node Package Manager.**
-   npm has no full form → it is not an abbreviation.
-   npm is a package manager but it does stand for node package manager.
-   It provides a standard git repository for packages and libraries.
-   We can install and manage these packages in our project using npm.

## Adding npm to a Project

Initialize npm in a project to use it in our project:

```bash
npm init
```

-   It will ask some questions and at the end, it will create a new file `package.json`.

## `package.json`

-   It is a configuration file for npm.
-   It keeps a track of our installed packages and dependencies.

<br>

-   Packages on which our app is dependent on, are called **dependencies**.
-   npm manages versions of these dependencies through `package.json`.

# Installing Dependencies

## Bundler

-   With separate HTML and JS files, the code must be bundled and optimized (minified, compressed and cleaned) before production.
-   A **bundler** helps us achieve that.
-   **Job of a bundler** → To bundle or pack our app so that it can be shipped to the production.

**Examples:** Webpack, Parcel, Vite.

# Parcel

Install Parcel as a dev dependency:

```bash
npm install -D parcel
```

### `-D` (Dev Dependency)

-   Two types of dependencies:

    1. **Dev Dependencies** → Required in development phase
    2. **Dependencies** → Required in both development and production phase

-   Parcel is a **dev dependency** because it is only needed for bundling during development.

### Version Specifiers in `package.json`

-   **Caret (`^`)**: Allows patch and minor upgrades.

    -   So, if there is a minor upgrade, then the parcel will be automatically updated to the latest version.
    -   Example: `^1.2.3` → Versions `1.2.3` to `< 2.0.0`.

-   **Tilde (`~`)**: Allows only patch upgrades.

    -   Example: `~1.2.3` → Versions `1.2.3` to `< 1.3.0`.

![Caret and Tilde in package.json](./Caret%20and%20Tilde.png)

## `package-lock.json`

-   `package.json` keeps a track of approx. version of dependencies whereas `package-lock.json` keeps the exact version that was installed.
-   It **locks down** the exact versions of all installed packages.

-   It includes integrity hashes to verify that whatever we have on our local, it is the same version that gets deployed on the production.

## `node_modules`

-   It contains all the code that we fetched from npm while installing parcel.

### Transitive dependencies:

-   Our project has a dependency 'parcel'.
-   Now, parcel as a project has its own dependencies.
-   Those dependencies can have their own dependencies.
-   These are known as **transitive dependencies**.

<br>

-   That's why, we have we have lots of folders in `node_modules` apart from 'parcel' folder.
-   And that's why, `package-lock.json` is very large as it keeps a track of exact versions of these dependencies.
-   To keep a track of these dependencies, every package has its own `package.json` file.

<br>

-   The size of node_modules folder is so big that we do not want to push it to github.
-   So, we will put it in `.gitignore`.

## Why ignore `node_modules`?

-   We need to push `package.json` and `package-lock.json` to the github but not `node_modules`.
-   This is b/z if we have `package.json` and `package-lock.json`, we can regenerate `node_modules`.
-   If we delete `node_modules` and then run `npm install`, it will create the `node_modules` again.

-   **Rule of Thumb**:
    -   GitHub should have only essential things.
    -   Whatever we can regenerate, we do not push it to github.

# Igniting the App

```bash
npx parcel index.html
```

-   **npm** → installs and manages packages
-   **npx** → executes packages

-   `npx parcel`: executes parcel
-   `index.html`: source

-   So, with this cmd, parcel goes to our src which is `index.html`, then bundles all the code and starts a local development server at `1234` port.
-   Generates a `dist` folder with compressed and bundled code.

### Why Not Use CDN Links for React?

1. **Performance**:
    - Fetching from cdn is an expensive operation.
    - With cdn links, there will be a network call to unpkg.com for react and react-dom files.
    - But if we have this entire code in node_modules folder, then it will be easier to use react inside our code.
2. **Versioning**:
    - Today, we have react18 but in future react19 may come.
    - So, we have to change the url again and again.
    - A better way is to have react as our dependency inside package.json.
    - It will be easier to manage react as one of the dependency of our app.

# Install React

```bash
npm i react # as a normal dependency (not a dev dependency)
npm i react-dom
```

-   Now, we can remove cdn links.
-   But to use React.createElement() in app.js, we need to **import** React.
-   This is b/z till now, we have installed react but our js file does not know about `React`.

```js
import React from "react";
import ReactDOM from "react-dom";
```

-   Here, `"react"` refers to the react folder that we have inside node_modules.

<br>

-   But with this, we get error on browser saying 'Browser scripts cannot have imports or exports'.
-   This happens b/z:

    -   The `<script>` element inside index.html is treated like a browsers script.
    -   And a normal browser scripts cannot have an import statement.
    -   We cannot use ES6 module syntax (import / export) directly in a normal browser script.
    -   Only ES modules `<script type="module">` support that syntax.

    ```html
    <script type="module" src="app.js"></script>
    ```

    -   With this, we are telling the browser that it is not a normal browser script, it is a module.

-   Earlier, we used to import ReactDOM from "react-dom" but now we have to import it from "react-dom/client".
-   With the new version of React, we import ReactDOM from react-dom/client.

# Features of Parcel

-   Creates a local dev server to host our app.
-   Automatically refreshes our page when we save our files.

    -   This happens b/z parcel is using HMR.
    -   **HMR**: Hot Module Replacement.
    -   Parcel keeps an eye on our files.
    -   As soon as we save our files, it rebuilds our app.

      <br>

    -   It does that using a **File Watching Algorithm** which is written in **C++**.
    -   Using this algo, it keeps a track of every save that we do and then it rebuilds our app.

-   It gives us faster builds using **Caching**.

    -   It caches our app's data (in .parcel-cache folder) so that the next build takes lesser time.
    -   If we delete .parcel-cache folder and then rebuild our app, it will take more time.
    -   But now subsequent builds will take lesser time.

-   It does image optimization.
    -   The most expensive operation in web browser is to load images on our page.
    -   So, parcel optimizes our images.
-   It does minification of our files → remove comments and extra spaces.
-   Bundles our code → Basic job of parcel.
-   Compresses our files → So that we can ship smaller versions of our code to the production.

-   Consistent Hashing → Covered in Assignment.
-   Code Splitting
-   Differential Bundling

    -   It is an optimization technique that involves creating and serving multiple versions of our app's bundles tailored to diff browser capabilities.
    -   This way we will be able to support older browsers as well.

-   Diagnostics
-   Error Handling → Better error suggestions
-   It gives us a way to host our app to `https`.

-   Tree Shaking

    -   It will remove unused code from our files.

-   Creates diff dev and production bundles.

    -   Production build takes a bit more time than dev build as there are some extra optimizations in production build.

-   Go to https://parceljs.org/ to read its official documentation.

**NOTE:**

-   Parcel is not doing all these jobs at its own.
-   It has its own helper libraries.

# Creating a Production Build

```bash
npx parcel build index.html
```

-   This cmd produces production-ready files in `/dist` (for hosting).
-   It takes more time than dev build due to extra optimizations.

<br>

-   This cmd will give error b/z we have `"main": "App.js"` in `package.json` file.
-   This tells npm that `App.js` is the entrypoint of our app.
-   But when using parcel, we gave `index.html` as out entry point.
-   So, there is a conflict b/w them.
-   So, we have to remove `"main": "App.js"` from our `package.json` file to solve this issue.

<br>

-   Earlier `dist` folder was storing dev build files.
-   Now, `dist` folder has production build files (optimized, compressed and minified files).

<br>

-   `dist` and `.parcel-cache` folders can be regenerated, so they will be added in .gitignore.
-   We already have sufficient info to regenerate them.

# Deployment Workflow

-   We have our code on local and push only essential code to github.
-   Then, the server fetches that code from git and executes commands like `npm install` and `npx parcel ...` etc to generate other folders.
-   So, the server has a diff set of folders from our local.
-   The code is same but there are 2 copies.
-   Then, with `node_modules` and `dist` folders generated, server runs our app.

# Browser Compatibility

-   We will use **Browsers List** to make our app compatible with older versions of browsers.
-   We already have browsers list in `node_modules` folder.
-   But we have to tell it that what browsers we have to support.

<br>

-   **Browsers List** is a npm package which needs some configuration.
-   We configure it inside package.json.

```json
"browserslist": [
    // This takes an arr of browsers.
    "last 2 chrome versions"
]
```

-   With this, our app will be compatible with last 2 versions of chrome.

<br>

-   This doesn't mean that it will not work on rest of the browsers.
-   This means that our app will work on last 2 versions of chrome, 100% of the time.
-   But it may or may not work on other browsers.

<br>

-   To make it work, it will create diff bundles of our code for diff browsers.
-   This will create extra code in our project.
-   So, we do not want to support extreme old versions of browsers.
-   So, we can configure according to our need.

<br>

-   **Example:**
-   Govt websites need to support all versions of browsers.

Official config guide: [https://browserslist.dev](https://browserslist.dev)

# Summary

-   With npm, Parcel, and React, we’ve essentially recreated what **Create React App (CRA)** sets up automatically.
