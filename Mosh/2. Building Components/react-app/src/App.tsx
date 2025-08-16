import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button";
import { useState } from "react";

function App() {
    let items = ["Jaipur", "Delhi", "Noida", "Bangalore", "Hyderabad"];
    const handleSelectItem = (item: string) => {
        console.log(item);
    };

    // We want to display the alert only when the btn is clicked.
    // So, we want a state var to keep a track of visibility of the btn.
    const [alertVisible, setAlertVisibility] = useState(false);

    return (
        <div>
            <ListGroup
                items={items}
                heading="Cities"
                onSelectItem={handleSelectItem}
            />

            {alertVisible && (
                <Alert
                    onClose={() => {
                        setAlertVisibility(false);
                    }}
                >
                    Hello World!
                </Alert>
            )}

            <Button
                onClick={() => {
                    setAlertVisibility(true);
                }}
            >
                Click Me!
            </Button>
            <Button onClick={() => {}} color="secondary">
                Click Me!
            </Button>
        </div>
    );
}

export default App;
