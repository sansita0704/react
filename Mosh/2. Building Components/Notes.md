# Creating a ListGroup Component

### Bootstrap

It is a popular CSS library that gives us a bunch of CSS classes for styling our applications.

```bash
npm i bootstrap@5.3.7 # install bootstrap
```

---

Inside `components/ListGroup.tsx`, create the following function:

```tsx
function ListGroup() {
    return (
        <ul className="list-group">
            <li className="list-group-item">An item</li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A fourth item</li>
            <li className="list-group-item">And a fifth one</li>
        </ul>
    );
}
```

### Important Points

-   In **JSX**, `class` is a reserved keyword → use `className` instead.
-   When JSX spans **multiple lines**, wrap it in parentheses `()` inside the `return`.

# Fragments

To have a heading on top of list, we cannot write a `h1` element before `ul` element b/z in react, a component cannot return more than one elements.

To solve this problem, we have several options:

### 1. Wrap both `h1` and `ul` element in a `div`

```tsx
return (
    <div>
        <h1>List</h1>
        <ul className="list-group">...</ul>
    </div>
);
```

With this, we are adding an extra element in the DOM which is unnecessary.
A better way is to use Fragment.

### 2. **Fragment**

Import Fragment on the top and then replace `div` with `Fragment`.

```tsx
return (
    <Fragment>
        <h1>List</h1>
        <ul className="list-group">...</ul>
    </Fragment>
);
```

With fragments, when our code will be rendered on the screen, we are not going to have an additional element in the DOM.

### 3. An even better way is to use a shorter syntax.

Remove import statement and the `Fragment` word from the code.

```tsx
return (
    <>
        <h1>List</h1>
        <ul className="list-group">...</ul>
    </>
);
```

So, using empty angular brackets `<>`, we are saying react to use Fragment to wrap all child elements.

# Rendering Lists

To render a list of items dynamically, we have an items arr.

In JSX, we do not have a `for` loop.
So, we cannot iterate through items arr and display each item.
So, we have to use a diff technique.

In JS, arrays have a `map()` for mapping each item to an item of a diff type.

```js
const items = ["Jaipur", "Delhi", "Noida", "Bangalore", "Hyderabad"];
items.map((item) => <li className="list-group-item">{item}</li>);
```

This map() will return an arr containing the result.
We can use that arr inside the `ul` element.
But we cannot directly write map() inside `ul` element b/z this code is not allowed in b/w the JSX markup.

In JSX, we can only use HTML elements or other react components.
So, to render data dynamically, we need to wrap the map() expression in `{}`.

```tsx
const items = ["Jaipur", "Delhi", "Noida", "Bangalore", "Hyderabad"];

return (
    <>
        <h1>List</h1>
        <ul className="list-group">
            {items.map((item) => (
                <li className="list-group-item">{item}</li>
            ))}
        </ul>
    </>
);
```

With this code, we can see our list of items on the webpage.
But in console window, we see a warning saying 'Each child in a list should have a unique "key" prop.'

It is saying that each `li` element should have a `key` property that uniquely identifies that item.
React needs this to keep a track of our items.
So later, when we add or remove items dynamically, react knows which part of the page should be updated.

We can use each item name as a unique key.

In real life, when we fetch data from an api, each item has a unique id.
So, we use that id as the unique key for each item.

```tsx
<li key={item} className="list-group-item">
    {item}
</li>
```

# Conditional Rendering

Sometimes we want to render some content based on certain conditions.

**Example**:
We can display an error msg on the browser if the `items` arr is empty.
So, we can write an `if` statement in which we can return a completely diff markup.

```tsx
if (items.length === 0)
    return (
        <>
            <h1>List</h1>
            <p>No List Found</p>
        </>
    );

return (
    <>
        <h1>List</h1>
        <ul className="list-group">...</ul>
    </>
);
```

With this code, we have duplication of `h1` element which is not a good thing.
To solve this, we will render content inside the JSX expression.
We will use `{}` to write our JS code.

```tsx
<>
    <h1>List</h1>
    {items.length === 0 ? <p>List Not Found</p> : null}
    <ul className="list-group">...</ul>
</>
```

**With this code**:

-   if `items.length === 0`, then a `p` element will be rendered on the webpage and the `ul` element will remain empty.
-   Otherwise, a null value will be returned, so only the `ul` element will be rendered.

But sometimes, our conditional statement's logic can become a bit too complicated.
So, it can pollute our JSX markup.
In those cases, we can separate that logic and put it in a separate var.

```tsx
const message = items.length === 0 ? <p>List Not Found</p> : null;

return (
    <>
        <h1>List</h1>
        {message}
        <ul className="list-group">...</ul>
    </>
);
```

We can also move the logic inside a func:

```tsx
const getMessage = () => (items.length === 0 ? <p>List Not Found</p> : null);

return (
    <>
        <h1>List</h1>
        {getMessage()}
        <ul className="list-group">...</ul>
    </>
);
```

**Benefits of using function**:

-   Our functions can have parameters.
-   So, we can get diff messages depending on diff parameters.

If we do not need parameters, its better to use a const.
In this case, we do not have to pass anything to the `getMessage` func, so we should use the `message` const.

### More concise way to write the same code

Instead of using the ternary operator, we use logical AND.

```tsx
{
    items.length === 0 && <p>List Not Found</p>;
}
// {condition && content to be rendered if the condition is true}
```

With this, we do not have to use `null` keyword and our code is a bit more concise.

### Working of `&&` and `||`

-   **OR (`||`)** → returns the **first truthy** value. If none, returns last value.
-   **AND (`&&`)** → returns the **first falsy** value. If none, returns last value.

So:

-   If `items.length === 0` → condition is truthy → `<p>List Not Found</p>` gets rendered.
-   If false → returns `false` → nothing is rendered.

# Handling Events

In react, each element has a property called `onClick`:

```tsx
<li key={item} className="list-group-item" onClick={() => console.log(item)}>
    {item}
</li>
```

Also, while calling map(), we can optionally add a 2nd parameter `index`.
Now, we can log this index on the console.
With this, we will be able to see the index of the item in the arr.

```tsx
{
    items.map((item, index) => (
        <li
            key={item}
            className="list-group-item"
            onClick={() => console.log(item, index)}
        >
            {item}
        </li>
    ));
}
```

The arrow func of `onClick` property can optionally have a parameter `event` that represents the browser event.

```tsx
<li
    key={item}
    className="list-group-item"
    onClick={(event) => console.log(event)}
>
    {item}
</li>
```

The type of this `event` obj is `SyntheticBaseEvent`.
`SyntheticBaseEvent` is one of built-in classes in react.

B/z diff browsers have diff implementations of event obj.
So, to make this event obj cross browser, react team created this class which is a wrapper around the native browser event obj.

Here, our event handling logic is of one line only.
So, writing a func inside return statement is okay.

But if our logic is more complex, we should not write that logic in b/w our JSX markup.
We should move that logic into a separate func.

By convention, we start the name of the func with 'handle' word and then we specify type of event i.e. 'click'.

```tsx
const handleClick = (event) => console.log(event);
```

But with this, we get an error saying "Parameter 'event' implicitly has an 'any' type".

This is b/z outside the JSX markup, the TS compiler does not know the type of `event`.
This is where we should specify the type of this parameter so that we get type safety and auto completion.

When we hover our mouse on `event` parameter inside JSX markup, we see that it is of type `MouseEvent`.

To specify this type, we first import `MouseEvent` only as a type and not as values (like functions, classes, or variables).

```tsx
import type { MouseEvent } from "react";
```

```tsx
const handleClick = (event: MouseEvent) => console.log(event);
```

This `handleClick` func is called an event handler.

# Managing State

To highlight a list item when it is clicked, we will use a Bootstrap class called `active`.
We only want to use this class on the selected item.

To do this, we need to have a var to keep a track of index of the selected item.
Whenever we click on an item, we will update `selectedIndex` with the `index` of the current item.
While giving class to the items, we will check if selectedIndex == index.  
If yes → list-group-item and active.  
Otherwise → list-group-item.

```tsx
<ul className="list-group">
    {items.map((item, index) => (
        <li
            key={item}
            className={
                selectedIndex === index
                    ? "list-group-item active"
                    : "list-group-item"
            }
            onClick={() => (selectedIndex = index)}
        >
            {item}
        </li>
    ))}
</ul>
```

But this does not work.

### WHY?

This is b/z var `selectedIndex` that we have declared inside the ListGroup(), is local to this func component.
So, React does not know about it.

To solve this problem, we have to tell React that this component is going to have data or state that may change overtime.
To do this, we will use a built-in func in React called `useState`.

`useState` func is called a **Hook**.
A Hook is a func that allows us to tap into built-in features in React.
`useState` is a state hook.

```tsx
const arr = useState(-1);
```

arg of `useState()`: initial value of the var

This func returns an arr:

-   `arr[0]`: A variable like `selectedIndex`.
-   `arr[1]`: An updater func using which we can update the var `arr[0]`.
-   Calling `setSelectedIndex` notifies React → component re-renders → DOM updates automatically.

So, with React, we never touch the DOM directly.
We think in terms of components that have a state.
When the state of a component changes, React will update the DOM to match the new component state.

**Destructure the arr:**

```tsx
const [selectedIndex, setSelectedIndex] = useState(-1);
```

```tsx
<ul className="list-group">
    {items.map((item, index) => (
        <li
            key={item}
            className={
                selectedIndex === index
                    ? "list-group-item active"
                    : "list-group-item"
            }
            // To update the var:
            onClick={() => setSelectedIndex(index)}
        >
            {item}
        </li>
    ))}
</ul>
```

**Convention:** `[variable, setVariable]` for naming state.

In React, each component has its own state.
So, if we add another ListGroup component, then the state of both these components will be independent to each other.  
So, we can select diff items in each list.

# Passing Data via Props

With current implementation, we are showing a list of cities.
But what if we need to have a list of names or a list of colors.
We do not want a separate list component for each type of list.

So, we need to make this `ListGroup` component reusable.
This is where we use **Props** or **Properties**.

**Props** are inputs to our components.

So, we want to pass 'items' as inputs to our component just like we give arguments to a func.
Similarly, if would be better if we could pass a custom label for the heading of the list.

1. Decide the shape of the input
   So, we want to have an obj with 2 properties:
   items: [] and heading: string

    To do this, we will use an **Interface**.
    We can name that interface `ListGroupProps` or `Props`.

```tsx
interface Props {
    items: string[];
    heading: string;
}
```

Now, we can have a parameter in ListGroup():

```tsx
function ListGroup(props: Props) {}
```

With this, we have to use `props.items` and `props.heading` to access all the properties.
Instead, we can destructure the `props` parameter:

```tsx
function ListGroup({ items, heading }: Props) {}
```

```tsx
<h1>{heading}</h1>;
{
    items.length === 0 && <p>List Not Found</p>;
}
<ul className="list-group">
    {items.map((item, index) => (
        <li
            key={item}
            className={
                selectedIndex === index
                    ? "list-group-item active"
                    : "list-group-item"
            }
            onClick={() => setSelectedIndex(index)}
        >
            {item}
        </li>
    ))}
</ul>;
```

While using the `ListGroup` component, we can set the value of these properties just like we set the value of attributes in HTML.

```tsx
let items = ["Jaipur", "Delhi", "Noida", "Bangalore", "Hyderabad"];

return (
    <div>
        <ListGroup items={items} heading="Cities" />
    </div>
);
```

So, we use props to pass data to our components.

# Passing Functions Via Props

In real-world apps, clicking an item usually triggers an **action** (e.g., navigation, update form).
And that action may vary depending on the application.

So, we do not want to have that implementation inside the `ListGroup` component.
We want to make it a reusable component.
So, we want to notify the consumer or the parent of this component that an item is selected.

To implement this, we can add a method inside props interface.
Then, we can call that method whenever we click on that item.
This way, our `App` component will be notified.

### 1. Add a new property to `props` interface:

```tsx
interface Props {
    items: string[];
    heading: string;
    onSelectItem: (item: string) => void;
    // This is just like the 'onClick' property.
}
```

### 2. Update `ListGroup` component:

```tsx
function ListGroup({ items, heading, onSelectItem }: Props) {}
```

Now, we can call `onSelectItem` when we click on an item:

```tsx
<li
    key={item}
    className={
        selectedIndex === index ? "list-group-item active" : "list-group-item"
    }
    onClick={() => {
        setSelectedIndex(index);
        onSelectItem(item);
    }}
>
    {item}
</li>
```

### 3. Update parent component:

```tsx
const handleSelectItem = (item: string) => {
    console.log(item);
};

return (
    <div>
        <ListGroup
            items={items}
            heading="Cities"
            onSelectItem={handleSelectItem}
        />
    </div>
);
```

# Props v/s State

1. Props are inputs or args passed to a component while State is the internal data managed by a component that can change overtime.

2. We should treat Props as immutable or read-only.
   It is based on functional programming principles.

    But state is mutable.
    We use state to tell the compiler that this data can change overtime, so they has to be mutable.

One thing which is common in both is that anytime their values change, React will re-render our component and update the DOM accordingly.

![Props v/s State](Screenshots/1.%20Props%20and%20State.png)

# Passing Children

Sometimes, we want to pass a children to a component, just like we have passed a `ListGroup` component to the `div` element in our `App` component.

We have created a new component called `Alert`.

```tsx
const Alert = () => {
    return <div className="alert alert-primary">Alert</div>;
};
```

To make it reusable:

```tsx
interface Props {
    text: string;
}

const Alert = ({ text }: Props) => {
    return <div className="alert alert-primary">{text}</div>;
};
```

Now, we can use this in our `App` component:

```tsx
<Alert text="Hello World!" />
```

This works but what if the text is too long or we want to pass HTML content to this `Alert` component.
Passing HTML content inside this text property will make our code messy and complex.

So, we want to have sth like this:

```tsx
<Alert>Hello World!</Alert>
```

To implement this, we can use a prop called `children`.
It is a prop that all components support.

```tsx
interface Props {
    children: string;
}

const Alert = ({ children }: Props) => {
    return <div className="alert alert-primary">{children}</div>;
};
```

With this, we can pass a string as a child to the Alert component.
To pass HTML content, we need to change the type of `children` prop from string to `ReactNode`.

`ReactNode` is a class defined in the React module.

# Inspecting Components with React Dev Tools

**React Developer Tools**:
It is a very useful browser extension for inspecting and analyzing our React apps.

It provides two new tabs:

1. **Components**

    - View component tree
    - Inspect matching DOM element
    - View component props and state

2. **Profiler**

    - Analyze rendering performance
