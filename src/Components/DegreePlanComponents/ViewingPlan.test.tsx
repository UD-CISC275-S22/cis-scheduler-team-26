import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("ViewingPlan Tests", () => {
    beforeEach(() => {
        render(<App />);
        const viewPlanButton = screen.getAllByRole("button", {
            name: "View/Edit Plan"
        });
        viewPlanButton[0].click();
    });
    test("The initial two test semesters are displated", () => {
        expect(screen.getByText(/Winter 2022/i)).toBeInTheDocument();
        expect(screen.getByText(/Spring 2022/i)).toBeInTheDocument();
    });
    test("All 4 inital test courses are displayed for both semesters", () => {
        expect(screen.getAllByText(/101/i).length === 2);
        expect(screen.getAllByText(/EGGG/i).length === 2);
        expect(screen.getAllByText(/108/i).length === 2);
        expect(screen.getAllByText(/CISC/i).length === 2);
        expect(screen.getAllByText(/241/i).length === 2);
        expect(screen.getAllByText(/MATH/i).length === 2);
        expect(screen.getAllByText(/110/i).length === 1);
        expect(screen.getAllByText(/ENGL/i).length === 1);
        expect(screen.getAllByText(/3/i).length === 7);
    });
    test("Courses can be removed", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Courses/i
        });
        editButton[0].click();
        const removeCourseButton = screen.getAllByRole("button", {
            name: /Remove Course/i
        });
        removeCourseButton[0].click();
        expect(screen.getByText(/EGGG/i)).toBeInTheDocument();
        expect(screen.getAllByText(/3/i).length === 6);
    });
    test("Courses can be added", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Courses/i
        });
        editButton[0].click();
        const typeDropdown = screen.getByRole("combobox", {
            name: /Pick the Course to be Added:/i
        });
        userEvent.selectOptions(typeDropdown, "ENGL110");
        const addButton = screen.getByRole("button", {
            name: /Add Course/i
        });
        addButton.click();
        expect(screen.getAllByText(/ENGL/i).length === 2);
    });
    test("Semesters can be removed", () => {
        const editButton = screen.getByRole("button", {
            name: /Edit Semesters/i
        });
        editButton.click();
        const removeSemesterButton = screen.getAllByRole("button", {
            name: /Delete Semester/i
        });
        removeSemesterButton[0].click();
        expect(screen.getByText(/EGGG/i)).toBeInTheDocument();
        expect(screen.queryByText(/Winter 2022/i)).not.toBeInTheDocument();
        expect(screen.getAllByText(/3/i).length === 4);
    });
    test("Semesters can be added", () => {
        const editButton = screen.getByRole("button", {
            name: /Edit Semesters/i
        });
        editButton.click();
        const seasonDropdown = screen.getByRole("combobox", {
            name: /Season:/i
        });
        userEvent.selectOptions(seasonDropdown, "Summer");
        const addSemesterButton = screen.getByRole("button", {
            name: /Add Semester/i
        });
        addSemesterButton.click();
        expect(screen.getByText(/Summer 2022/i)).toBeInTheDocument();
    });
    test("The initial credits in the testing plan are displayed", () => {
        expect(
            screen.getByText(/Currently Have 21 out of 150 required Credits/i)
        ).toBeInTheDocument();
    });
    test("When adding a course, the total credits in updated", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Courses/i
        });
        editButton[0].click();
        const typeDropdown = screen.getByRole("combobox", {
            name: /Pick the Course to be Added:/i
        });
        userEvent.selectOptions(typeDropdown, "ENGL110");
        const addButton = screen.getByRole("button", {
            name: /Add Course/i
        });
        addButton.click();
        expect(
            screen.getByText(/Currently Have 24 out of 150 required Credits/i)
        ).toBeInTheDocument();
    });
    test("When removing a course, the score is updated", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Courses/i
        });
        editButton[0].click();
        const removeCourseButton = screen.getAllByRole("button", {
            name: /Remove Course/i
        });
        removeCourseButton[0].click();
        expect(
            screen.getByText(/Currently Have 18 out of 150 required Credits/i)
        ).toBeInTheDocument();
    });
    test("Semesters can be removed", () => {
        const editButton = screen.getByRole("button", {
            name: /Edit Semesters/i
        });
        editButton.click();
        const removeSemesterButton = screen.getAllByRole("button", {
            name: /Delete Semester/i
        });
        removeSemesterButton[0].click();
        expect(
            screen.getByText(/Currently Have 12 out of 150 required Credits/i)
        ).toBeInTheDocument();
    });
});
