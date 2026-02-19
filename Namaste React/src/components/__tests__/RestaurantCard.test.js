import { screen, render } from "@testing-library/react";
import RestaurantCard, { withOpenLabel } from "../RestaurantCard";
import MOCK_DATA from "../mocks/resCardMock.json";
import "@testing-library/jest-dom";

it("should render restaurant card component with props data", () => {
    render(<RestaurantCard restaurantData={MOCK_DATA} />);

    const restaurantName = screen.getByRole("heading", { name: "Pizza Hut" });

    expect(restaurantName).toBeInTheDocument();
});

it("should render restaurant card component with open label", () => {
    const RestaurantCardOpen = withOpenLabel(RestaurantCard);

    render(<RestaurantCardOpen restaurantData={MOCK_DATA} />);

    const openLabel = screen.getByText("Open");

    expect(openLabel).toBeInTheDocument();
});
