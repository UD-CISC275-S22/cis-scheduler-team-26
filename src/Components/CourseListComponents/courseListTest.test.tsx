import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("Add course button test", () => {
    beforeEach(() => {
        render(<App />);
        const viewCourseButton = screen.getAllByRole("button", {
            name: "View All Courses"
        });
        viewCourseButton[0].click();
    });
    test("All 4 inital test courses", () => {
        expect(screen.getAllByText(/101/i).length === 2);
        expect(screen.getAllByText(/EGGG/i).length === 2);
        expect(screen.getAllByText(/108/i).length === 2);
        expect(screen.getAllByText(/CISC/i).length === 2);
        expect(screen.getAllByText(/241/i).length === 2);
        expect(screen.getAllByText(/MATH/i).length === 2);
        expect(screen.getAllByText(/110/i).length === 1);
        expect(screen.getAllByText(/ENGL/i).length === 1);
    });
    test("Adding a course", () => {
        const addCourseButton = screen.getAllByRole("button", {
            name: "Add Course"
        });
        addCourseButton[0].click();
        const submit = screen.getAllByRole("button", {
            name: "Confirm"
        });
        const courseDep = screen.getByTestId("dep");
        const courseID = screen.getByTestId("id");
        const courseCred = screen.getByTestId("credits");
        userEvent.type(courseDep, "test1");
        userEvent.type(courseID, "200");
        userEvent.type(courseCred, "3");
        submit[0].click();
        expect(screen.getAllByText(/200/i).length === 2);
        expect(screen.getAllByText(/test1/i).length === 2);
    });
    test("Removing a course", () => {
        const clickCourse = screen.getByText("EGGG101");
        clickCourse.click();
    });
    test("Editing a course", () => {
        const clickCourse = screen.getByText("EGGG101");
        clickCourse.click();
    });
    test("Undo a edit", () => {
        const clickCourse = screen.getByText("EGGG101");
        clickCourse.click();
    });
});
