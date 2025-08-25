const root = ReactDOM.createRoot(document.getElementById("root"));

const heading = React.createElement(
    "h1",
    { id: "heading", xyz: "abc" },
    "Hello World from React!"
);

root.render(heading);

/* Nested elements */

/*
<div id: "parent">
    <div id: "child">
        <h1>I'm h1 tag</h1>
    </div>
</div>
*/

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

/* Sibling elements */

/*
<div id: "parent">
    <div id: "child">
        <h1>I'm h1 tag</h1>
        <h2>I'm h2 tag</h2>
    </div>
</div>
*/

parent = React.createElement(
    "div",
    { id: "parent" },
    React.createElement("div", { id: "child" }, [
        React.createElement("h1", {}, "I'm h1 tag"),
        React.createElement("h2", {}, "Sibling"),
    ])
);

root.render(parent);

/*
<div id: "parent">
    <div id: "child1">
        <h1>I'm h1 tag</h1>
        <h2>I'm h2 tag</h2>
    </div>
    <div id: "child2">
        <h1>I'm h1 tag</h1>
        <h2>I'm h2 tag</h2>
    </div>
</div>
*/

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
