import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("MoveCourse Tests", () => {
    beforeEach(() => {
        render(<App />);
        const viewPlanButton = screen.getAllByRole("button", {
            name: "View/Edit Plan"
        });
        viewPlanButton[0].click();
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
