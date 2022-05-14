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
        let searchBox = screen.queryByPlaceholderText("ex. CISC 108");
        userEvent.type(searchBox, "EGGG 101");
        userEvent.click(screen.queryByText("EGGG 101"));
        screen.getByRole("button", { name: "Add EGGG 101" }).click();
        userEvent.type(searchBox, "ENGL 110");
        userEvent.click(screen.queryAllByText("ENGL 110")[0]);
        screen.getByRole("button", { name: "Add ENGL 110" }).click();
        userEvent.type(searchBox, "CISC 108");
        userEvent.click(screen.queryAllByText("CISC 108")[0]);
        screen.getByRole("button", { name: "Add CISC 108" }).click();
        courseButtons[1].click();
        searchBox = screen.queryByPlaceholderText("ex. CISC 108");
        userEvent.type(searchBox, "CISC 181");
        userEvent.click(screen.queryAllByText("CISC 181")[0]);
        screen.getByRole("button", { name: "Add CISC 181" }).click();
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
