import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("Degree Requirements Tests", () => {
    beforeEach(() => {
        render(<App />);
        const viewPlanButton = screen.getAllByRole("button", {
            name: "View/Edit Plan"
        });
        viewPlanButton[0].click();
    });

    test("Requirements window is displayed", () => {
        expect(screen.getByText(/Requirements/i)).toBeInTheDocument();
    });

    test("Correctly displays the number of credits", () => {
        const displayedCreds = screen
            .getByText(/of 124 required credits/i)
            .textContent.split(" ")[1];
        expect(displayedCreds).toEqual("12");

        screen
            .getAllByRole("button", {
                name: "Edit Courses"
            })[0]
            .click();
        screen
            .getAllByRole("button", {
                name: "Remove Course"
            })[0]
            .click();
        const newDisplayedCreds = screen
            .getByText(/of 124 required credits/i)
            .textContent.split(" ")[1];
        expect(newDisplayedCreds).toEqual("9");
    });

    test("Correctly determines whether or not a requirement is fulfilled", () => {
        const courses = screen.getAllByTestId("requirements-course-colored");
        expect(courses[0].style.backgroundColor).toEqual("lightgreen");

        //Delete CISC108 from plan
        screen
            .getAllByRole("button", {
                name: "Edit Courses"
            })[0]
            .click();
        screen
            .getAllByRole("button", {
                name: "Remove Course"
            })[1]
            .click();

        expect(courses[0].style.backgroundColor).toEqual("lightpink");
    });
});
