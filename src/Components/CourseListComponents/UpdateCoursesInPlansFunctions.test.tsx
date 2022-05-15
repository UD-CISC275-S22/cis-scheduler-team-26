import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("Test updating courses in degree plans", () => {
    beforeEach(() => {
        render(<App />);
        //create a test plan
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
        //add and edit semester in testing plan
        screen.getByRole("button", { name: "Edit Semesters" }).click();
        screen.getByRole("button", { name: "Add Semester" }).click();
        const seasonDropdown = screen.getByRole("combobox", {
            name: /Season:/i
        });
        userEvent.selectOptions(seasonDropdown, "Winter");
        screen.getAllByRole("button", { name: "Add Semester" })[1].click();
        screen.getByRole("button", { name: "Cancel" }).click();
        screen.getByRole("button", { name: "Edit Semesters" }).click();
        //add ENGL 110 to the semester in testing plan
        const courseButtons = screen.getAllByRole("button", {
            name: "Edit Courses"
        });
        courseButtons[0].click();
        const searchBox = screen.queryByPlaceholderText("ex. CISC 108");
        userEvent.type(searchBox, "ENGL 110");
        userEvent.click(screen.queryAllByText("ENGL 110")[0]);
        screen.getByRole("button", { name: "Add ENGL 110" }).click();
    });
    test("Editing a course edits it in the degree plan", () => {
        screen
            .getByRole("button", {
                name: "View All Courses"
            })
            .click();
        const searchBox = screen.queryByPlaceholderText("ex. cisc108");
        userEvent.type(searchBox, "ENGL110");
        screen.getAllByText("ENGL 110")[1].click();
        screen.getByRole("button", { name: "Edit" }).click();
        userEvent.type(screen.getByTestId("editDep"), "aaaa");
        screen.getByRole("button", { name: "Confirm" }).click();
        screen.getAllByRole("button")[2].click();
        expect(screen.getByText("Winter 2022")).toBeInTheDocument();
        expect(
            screen.getByText("ENGLaaaa 110: Seminar in Composition")
        ).toBeInTheDocument();
    });
});
