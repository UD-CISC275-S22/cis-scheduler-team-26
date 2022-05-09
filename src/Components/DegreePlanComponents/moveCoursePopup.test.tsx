import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("MoveCourse Tests", () => {
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
        courseButtons[0].click();
        userEvent.selectOptions(
            screen.getByRole("combobox", {
                name: /Pick the Course to be Added:/i
            }),
            "ENGL 110"
        );
        screen.getByRole("button", { name: "Add Course" }).click();
        courseButtons[0].click();
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
    });
    test("Courses can be moved between semesters", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Courses/i
        });
        editButton[0].click();
        const moveButton = screen.getAllByRole("button", {
            name: /Move Course/i
        });
        moveButton[1].click();
        const typeDropdown = screen.getByRole("combobox", {
            name: /New Semester:/i
        });
        userEvent.selectOptions(typeDropdown, "Spring 2022");
        const moveButton2 = screen.getAllByRole("button", {
            name: /Move Course/i
        });
        moveButton2[6].click();
        expect(screen.getAllByText(/101/i).length === 2);
        expect(screen.getAllByText(/EGGG/i).length === 2);
        const returnButton = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton.click();
        expect(
            screen.getByText(/Completed 11 out of 124 required credits/i)
        ).toBeInTheDocument();
    });
    test("Courses can be moved back after being moved", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Courses/i
        });
        editButton[0].click();
        const moveButton = screen.getAllByRole("button", {
            name: /Move Course/i
        });
        moveButton[1].click();
        const typeDropdown = screen.getByRole("combobox", {
            name: /New Semester:/i
        });
        userEvent.selectOptions(typeDropdown, "Spring 2022");
        const moveButton2 = screen.getAllByRole("button", {
            name: /Move Course/i
        });
        moveButton2[6].click();
        const editButton2 = screen.getAllByRole("button", {
            name: /Edit Courses/i
        });
        editButton2[1].click();
        const moveButton3 = screen.getAllByRole("button", {
            name: /Move Course/i
        });
        moveButton3[3].click();
        const typeDropdown2 = screen.getByRole("combobox", {
            name: /New Semester:/i
        });
        userEvent.selectOptions(typeDropdown2, "Winter 2022");
        const moveButton4 = screen.getAllByRole("button", {
            name: /Move Course/i
        });
        moveButton4[4].click();
        expect(screen.getAllByText(/101/i).length === 2);
        expect(screen.getAllByText(/EGGG/i).length === 2);
        const returnButton = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton.click();
        expect(
            screen.getByText(/Completed 11 out of 124 required credits/i)
        ).toBeInTheDocument();
    });
});
