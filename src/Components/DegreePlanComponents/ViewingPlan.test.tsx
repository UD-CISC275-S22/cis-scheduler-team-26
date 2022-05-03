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
    test("All 4 inital test courses are displayed", () => {
        expect(screen.getByText(/101/i)).toBeInTheDocument();
        expect(screen.getByText(/EGGG/i)).toBeInTheDocument();
        expect(screen.getAllByText(/108/i).length === 2);
        expect(screen.getAllByText(/CISC/i).length === 2);
        expect(screen.getAllByText(/241/i).length === 2);
        expect(screen.getAllByText(/MATH/i).length === 2);
        expect(screen.getAllByText(/110/i).length === 2);
        expect(screen.getAllByText(/ENGL/i).length === 2);
        expect(screen.getAllByText(/3/i).length === 4);
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
        expect(screen.queryByText(/EGGG/i)).not.toBeInTheDocument();
        expect(screen.getAllByText(/3/i).length === 4);
    });
    test("Courses can be added", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Courses/i
        });
        editButton[0].click();
        const removeCourseButton = screen.getAllByRole("button", {
            name: /Remove Course/i
        });
        removeCourseButton[0].click();
        expect(screen.queryByText(/EGGG/i)).not.toBeInTheDocument();
        expect(screen.getAllByText(/3/i).length === 4);
        editButton[0].click();
        const typeDropdown = screen.getByRole("combobox", {
            name: /Pick the Course to be Added:/i
        });
        userEvent.selectOptions(typeDropdown, "EGGG101");
        const addButton = screen.getByRole("button", {
            name: /Add Course/i
        });
        addButton.click();
        expect(screen.getByText(/101/i)).toBeInTheDocument();
        expect(screen.getByText(/EGGG/i)).toBeInTheDocument();
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
        expect(screen.queryByText(/EGGG/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Winter 2022/i)).not.toBeInTheDocument();
        expect(screen.getAllByText(/3/i).length === 1);
    });
    test("Semesters can be added", () => {
        const editButton = screen.getByRole("button", {
            name: /Edit Semesters/i
        });
        editButton.click();
        const addButton = screen.getByRole("button", {
            name: /Add Semester/i
        });
        addButton.click();
        const seasonDropdown = screen.getByRole("combobox", {
            name: /Season:/i
        });
        userEvent.selectOptions(seasonDropdown, "Summer");
        const addSemesterButton = screen.getAllByRole("button", {
            name: /Add Semester/i
        });
        addSemesterButton[1].click();
        const cancelButton = screen.getByRole("button", {
            name: /Cancel/i
        });
        cancelButton.click();
        expect(screen.getByText(/Summer 2022/i)).toBeInTheDocument();
    });
    test("The initial credits in the testing plan are displayed", () => {
        const returnButton = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton.click();
        expect(
            screen.getByText(/Completed 12 out of 124 required credits/i)
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
        const returnButton = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton.click();
        expect(
            screen.getByText(/Completed 9 out of 124 required credits/i)
        ).toBeInTheDocument();
    });
    test("When adding a course, the total credits in updated", () => {
        const editButton = screen.getAllByTestId("editCourseButton");
        editButton[0].click();
        const removeCourseButton = screen.getAllByRole("button", {
            name: /Remove Course/i
        });
        removeCourseButton[0].click();
        const returnButton = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton.click();
        expect(
            screen.getByText(/Completed 9 out of 124 required credits/i)
        ).toBeInTheDocument();
        const viewPlanButton = screen.getAllByRole("button", {
            name: "View/Edit Plan"
        });
        viewPlanButton[0].click();
        const editButton2 = screen.getAllByTestId("editCourseButton");
        editButton2[0].click();
        const typeDropdown = screen.getByRole("combobox", {
            name: /Pick the Course to be Added:/i
        });
        userEvent.selectOptions(typeDropdown, "EGGG101");
        const addButton = screen.getByRole("button", {
            name: /Add Course/i
        });
        addButton.click();
        const returnButton2 = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton2.click();
        expect(
            screen.getByText(/Completed 12 out of 124 required credits/i)
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
        const returnButton = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton.click();
        expect(
            screen.getByText(/Completed 3 out of 124 required credits/i)
        ).toBeInTheDocument();
    });
    test("Semesters can be cleared individually", () => {
        const editButton = screen.getAllByRole("button", {
            name: /Edit Courses/i
        });
        editButton[0].click();
        const clearButton = screen.getByRole("button", {
            name: /Clear All Courses/i
        });
        clearButton.click();
        expect(screen.getByText(/108/i)).toBeInTheDocument();
        expect(screen.queryByText(/101/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/EGGG/i)).not.toBeInTheDocument();
        const returnButton = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton.click();
        expect(
            screen.getByText(/Completed 3 out of 124 required credits/i)
        ).toBeInTheDocument();
    });
    test("All Semesters can be cleared", () => {
        const clearButton = screen.getByRole("button", {
            name: /Clear All Semesters/i
        });
        clearButton.click();
        expect(screen.getByText(/108/i)).toBeInTheDocument();
        expect(screen.queryByText(/101/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/EGGG/i)).not.toBeInTheDocument();
        expect(screen.getByText(/ENGL110/i)).toBeInTheDocument();
        const returnButton = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton.click();
        expect(
            screen.getByText(/Completed 0 out of 124 required credits/i)
        ).toBeInTheDocument();
    });
});
