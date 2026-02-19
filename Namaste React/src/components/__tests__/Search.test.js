import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../mocks/mockResListData.json";
import { BrowserRouter } from "react-router-dom";
import { act } from "react";
import "@testing-library/jest-dom";

// Defining our own fetch():
global.fetch = jest.fn(() => {
    // Here, we will mock exactly like how our fetch() works.

    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        },
    });
});

it("should search restaurant list for burger text input", async () => {
    await act(async () => {
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>,
        );
    });

    // Before Search:
    const cardsBeforeSearch = screen.getAllByTestId("restaurantCard");
    expect(cardsBeforeSearch.length).toBe(20);

    // Search operation:
    const searchBtn = screen.getByRole("button", { name: "search" });
    const searchInput = screen.getByTestId("searchInput");

    fireEvent.change(searchInput, { target: { value: "burger" } });
    fireEvent.click(searchBtn);

    // After Search:
    // Assert: Screen should load 1 restaurant card -> Give it a test-id
    const cardsAfterSearch = screen.getAllByTestId("restaurantCard");
    expect(cardsAfterSearch.length).toBe(1);
});

it("should filter top rated restaurants", async () => {
    await act(async () => {
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>,
        );
    });

    const CardsBeforeFilter = screen.getAllByTestId("restaurantCard");
    expect(CardsBeforeFilter.length).toBe(20);

    const topRatedResBtn = screen.getByRole("button", {
        name: "Top Rated Restaurants",
    });

    fireEvent.click(topRatedResBtn);

    const cardsAfterFilter = screen.getAllByTestId("restaurantCard");
    expect(cardsAfterFilter.length).toBe(18);
});
