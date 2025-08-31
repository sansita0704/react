import React from "react";
import ReactDOM from "react-dom/client";

/*
const heading = React.createElement(
    "h1",
    { id: "heading" },
    "Hello World from React!"
);
*/

const element = <span>This is a span</span>;

const heading = (
    <h1 className="heading" tabIndex="5">
        {element} <br />
        Hello World!
    </h1>
);
console.log(heading);

const Title = () => <h2 className="heading">This is a Title.</h2>;

const number = 1000;

const Heading = () => (
    <div id="container">
        <h1 className="heading" tabIndex="5">
            This is a React Functional Component.
        </h1>
        <Title />
        <h2>{number + 100}</h2>
        {console.log("Hello")}
        {heading}
        {Title()}
    </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(heading);
root.render(<Heading />);
