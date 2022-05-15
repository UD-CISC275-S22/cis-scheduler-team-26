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
    test("Adding a course", () => {
        const addCourseButton = screen.getByRole("button", {
            name: "Add Course"
        });
        addCourseButton.click();
        const nameBox = screen.getByRole("textbox", {
            name: /Course Department/i
        });
        userEvent.type(nameBox, "Test");
        const id = screen.getByTestId("addId");
        userEvent.type(id, "100");
        const credits = screen.getByTestId("addCredits");
        userEvent.type(credits, "4");
        const confirmButton = screen.getByRole("button", {
            name: "Confirm"
        });
        confirmButton.click();
        expect(screen.getByText(/Test 100/i)).toBeInTheDocument();
        const testCourse = screen.getByText("Test 100");
        testCourse.click();
        expect(screen.getByText(/Credits: 4/i)).toBeInTheDocument();
    });
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
