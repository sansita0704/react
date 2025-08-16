/* Exercise 1 */

// 1. Add 3 properties in the Props interface.
// 2. Make 'color' property optional so that we do not always have to supply a value for it.
// 3. Restrict 'color' property to take some specific values.

interface Props {
    children: string;
    color?:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "light"
        | "dark";
    onClick: (text: string) => void;
    // In a real life application sth will happen when we will click on the btn, so we have added an 'onClick' prop.
}

const Button = ({ children, color = "primary", onClick }: Props) => {
    return (
        <button
            type="button"
            className={"btn btn-" + color}
            onClick={() => onClick(children)}
        >
            {children}
        </button>
    );
};

export default Button;
