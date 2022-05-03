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
        const editButton = screen.getAllByRole("button", {
            name: /Edit Courses/i
        });
        editButton[0].click();
        const moveButton = screen.getAllByRole("button", {
            name: /Move Course/i
        });
        console.log("Length of move:" + moveButton.length);
        moveButton[1].click();
    });
    test("Courses can be moved between semesters", () => {
        const typeDropdown = screen.getByRole("combobox", {
            name: /New Semester:/i
        });
        userEvent.selectOptions(typeDropdown, "Spring 2022");
        expect(screen.getAllByText(/101/i).length === 2);
        expect(screen.getAllByText(/EGGG/i).length === 2);
        const returnButton = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton.click();
        expect(
            screen.getByText(/Completed 12 out of 124 required credits/i)
        ).toBeInTheDocument();
    });
});
