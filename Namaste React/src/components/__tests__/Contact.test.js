import Contact from "../Contact";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Contact Us page test cases", () => {
    /*
    beforeAll(() => {
        console.log("Before All");
    });

    beforeEach(() => {
        console.log("Before Each");
    });

    afterAll(() => {
        console.log("After All");
    });

    afterEach(() => {
        console.log("After Each");
    });
    */

    it("Should load the heading inside contact component", () => {
        render(<Contact />);

        const heading = screen.getByRole("heading");
        console.log(heading);

        expect(heading).toBeInTheDocument();
    });

    it("Should load the button inside contact component", () => {
        render(<Contact />);

        const button = screen.getByText("Submit");

        expect(button).toBeInTheDocument();
    });

    it("Should load the input inside contact component", () => {
        render(<Contact />);

        const input = screen.getByPlaceholderText("Sansita Jain");

        expect(input).toBeInTheDocument();
    });

    it("Should load 2 input boxes inside contact component", () => {
        render(<Contact />);

        const inputElements = screen.getAllByRole("textbox");
        // console.log(inputElements);

        expect(inputElements.length).toBe(2);
    });
});
