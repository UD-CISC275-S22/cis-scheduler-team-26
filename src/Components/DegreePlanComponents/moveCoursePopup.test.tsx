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
        screen.getByRole("button", { name: "Add Semester" }).click();
        const seasonDropdown = screen.getByRole("combobox", {
            name: /Season:/i
        });
        userEvent.selectOptions(seasonDropdown, "Winter");
        screen.getAllByRole("button", { name: "Add Semester" })[1].click();
        userEvent.selectOptions(seasonDropdown, "Spring");
        screen.getAllByRole("button", { name: "Add Semester" })[1].click();
        screen.getByRole("button", { name: "Cancel" }).click();
        const courseButtons = screen.getAllByRole("button", {
            name: "Edit Semester"
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
    test("Courses can be moved between semesters", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Semester/i
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
            name: /Edit Semester/i
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
        editButton[1].click();
        editButton[1].click();
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
