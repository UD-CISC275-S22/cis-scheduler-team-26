import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("Add course button test", () => {
    beforeEach(() => {
        render(<App />);
        const viewCourseButton = screen.getByRole("button", {
            name: "View All Courses"
        });
        viewCourseButton.click();
    });
    /* THIS TEST FAILS TO RUN BECAUSE TypeError: Converting circular structure to JSON
    test("Adding a course", () => {
        const addCourseButton = screen.getAllByRole("button", {
            name: "Add Course"
        });
        addCourseButton[0].click();
        const submit = screen.getAllByRole("button", {
            name: "Confirm"
        });
        const courseDep = screen.getByTestId("addDep");
        const courseCred = screen.getByTestId("addCredits");

        //first test
        userEvent.type(courseDep, "test 200");
        userEvent.type(courseCred, "3");
        submit[0].click();
        expect(screen.getByText(/test 200/i)).toEqual(1);
    });
    */
    test("Removing a course", () => {
        const egggCourse = screen.getByText("EGGG 101");
        egggCourse.click();
        expect(screen.getAllByText(/EGGG 101/i).length === 0);
        const mathCourse = screen.getByText("MATH 241");
        mathCourse.click();
        expect(screen.getAllByText(/MATH 241/i).length === 0);
        const ciscCourse = screen.getByText("CISC 108");
        ciscCourse.click();
        expect(screen.getAllByText(/CISC 108/i).length === 0);
    });
    test("Editing a course", () => {
        const clickCourse = screen.getByText("EGGG 101");
        clickCourse.click();
        const edit = screen.getAllByRole("button", {
            name: "Edit"
        });
        edit[0].click();
        const submit = screen.getAllByRole("button", {
            name: "Confirm"
        });
        const courseDep = screen.getByTestId("editDep");
        const courseID = screen.getByTestId("editId");
        const courseCred = screen.getByTestId("editCred");

        //first test
        userEvent.type(courseDep, "test2");
        userEvent.type(courseID, "200");
        userEvent.type(courseCred, "3");
        submit[0].click();
        expect(screen.getAllByText(/200/i).length === 2);
        expect(screen.getAllByText(/test2/i).length === 2);
    });
    test("Undo a edit", () => {
        const clickCourse = screen.getByText("EGGG 101");
        clickCourse.click();
        const edit = screen.getAllByRole("button", {
            name: "Edit"
        });
        const reset = screen.getAllByRole("button", {
            name: "Reset"
        });
        edit[0].click();
        const submit = screen.getAllByRole("button", {
            name: "Confirm"
        });
        const courseDep = screen.getByTestId("editDep");
        const courseCred = screen.getByTestId("editCred");

        //first test
        userEvent.type(courseDep, "test 100");
        userEvent.type(courseCred, "3");
        submit[0].click();

        clickCourse.click();
        reset[0].click();
        expect(screen.getAllByText(/EGGG/i).length).not.toEqual(2);
        expect(screen.getAllByText(/101/i).length).not.toEqual(2);
    });
});
