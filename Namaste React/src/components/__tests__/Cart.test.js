import { fireEvent, render, screen, within } from "@testing-library/react";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import { act } from "react";
import MOCK_DATA from "../mocks/mockResMenu.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom";
import Cart from "../Cart";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA),
    });
});

const renderComponent = async () => {
    await act(async () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                    <RestaurantMenu />
                    <Cart />
                </Provider>
            </BrowserRouter>,
        );
    });
};

it("should show 0 items initially", async () => {
    await renderComponent();
    expect(screen.getByText("0 Item")).toBeInTheDocument();
});

it("should update to 1 item after clicking Add once", async () => {
    await renderComponent();

    const addBtns = screen.getAllByRole("button", { name: "add" });
    fireEvent.click(addBtns[0]);

    expect(screen.getByText("1 Item")).toBeInTheDocument();
});

it("should update to 2 items after clicking Add twice", async () => {
    await renderComponent();

    const addBtns = screen.getAllByRole("button", { name: "add" });
    fireEvent.click(addBtns[1]);

    expect(screen.getByText("2 Items")).toBeInTheDocument();
});

it("should update cart component", async () => {
    await renderComponent();

    const cartSection = screen
        .getByText("My Cart")
        .closest("div")?.parentElement;

    const cartItems = within(cartSection).getAllByTestId("cartItems");

    expect(cartItems.length).toBe(2);
});

it("should clear the cart component", async () => {
    await renderComponent();

    const clearBtn = screen.getByRole("button", { name: "Clear Cart" });

    fireEvent.click(clearBtn);

    expect(screen.getByText("0 Item")).toBeInTheDocument();
    expect(screen.getByText("Cart is Empty!")).toBeInTheDocument();
});
