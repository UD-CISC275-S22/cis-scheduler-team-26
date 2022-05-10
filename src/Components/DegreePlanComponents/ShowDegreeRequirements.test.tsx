import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import userEvent from "@testing-library/user-event";

describe("Degree Requirements Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByRole("button", { name: "Create New Plan" }).click();
        const nameBox = screen.getByRole("textbox", {
            name: /Plan Name:/i
        });
        userEvent.type(nameBox, "Testing Plan");
        screen.getByRole("button", { name: "Confirm" }).click();
        const viewPlanButton = screen.getAllByRole("button", {
            name: "View/Edit Plan"
        });
        viewPlanButton[0].click();
        screen.getByRole("button", { name: "Edit Semesters" }).click();
        screen.getByRole("button", { name: "Add Semester" }).click();
        const seasonDropdown = screen.getByRole("combobox", {
            name: /Season:/i
        });
        userEvent.selectOptions(seasonDropdown, "Winter");
        screen.getAllByRole("button", { name: "Add Semester" })[1].click();
        userEvent.selectOptions(seasonDropdown, "Spring");
        screen.getAllByRole("button", { name: "Add Semester" })[1].click();
        screen.getByRole("button", { name: "Cancel" }).click();
        screen.getByRole("button", { name: "Edit Semesters" }).click();
        const courseButtons = screen.getAllByRole("button", {
            name: "Edit Courses"
        });
        courseButtons[0].click();
        screen.getByRole("button", { name: "Add Course" }).click();
        userEvent.selectOptions(
            screen.getByRole("combobox", {
                name: /Pick the Course to be Added:/i
            }),
            "ENGL 110"
        );
        screen.getByRole("button", { name: "Add Course" }).click();
        userEvent.selectOptions(
            screen.getByRole("combobox", {
                name: /Pick the Course to be Added:/i
            }),
            "CISC 108"
        );
        screen.getByRole("button", { name: "Add Course" }).click();
        courseButtons[1].click();
        userEvent.selectOptions(
            screen.getByRole("combobox", {
                name: /Pick the Course to be Added:/i
            }),
            "CISC 181"
        );
        screen.getByRole("button", { name: "Add Course" }).click();
        courseButtons[1].click();
    });

    test("Requirements window is displayed", () => {
        expect(screen.getByText(/Requirements/i)).toBeInTheDocument();
    });

    test("Correctly displays the number of credits", () => {
        const displayedCreds = screen
            .getByText(/of 124 required credits/i)
            .textContent.split(" ")[1];
        expect(displayedCreds).toEqual("11");

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
            })[2]
            .click();

        expect(courses[0].style.backgroundColor).toEqual("lightpink");
    });
});
