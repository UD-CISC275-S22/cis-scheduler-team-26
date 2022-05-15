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
        const searchBox = screen.queryByPlaceholderText("ex. cisc108");
        userEvent.type(searchBox, "Test100");
        expect(screen.getByText(/Test 100/i)).toBeInTheDocument();
        const testCourse = screen.getByText("Test 100");
        testCourse.click();
        expect(screen.getByText(/Credits: 4/i)).toBeInTheDocument();
    });
    test("Removing a course", () => {
        const searchBox = screen.queryByPlaceholderText("ex. cisc108");
        userEvent.type(searchBox, "eggg");
        const egggCourse = screen.getByText("EGGG 101");
        egggCourse.click();
        screen.getByRole("button", { name: "Delete" }).click();
        expect(egggCourse).not.toBeInTheDocument();
    });
    test("Editing a course", () => {
        const searchBox = screen.queryByPlaceholderText("ex. cisc108");
        userEvent.type(searchBox, "EGGG");
        const clickCourse = screen.getByText("EGGG 288");
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
        expect(screen.getAllByText(/200/i).length).toEqual(1);
        expect(screen.getAllByText(/test2/i).length).toEqual(1);
    });
    test("Undo an edit", () => {
        const searchBox = screen.queryByPlaceholderText("ex. cisc108");
        userEvent.type(searchBox, "eggg");
        const numEGGG = screen.getAllByText(/EGGG/i).length;
        const clickCourse = screen.getByText(/EGGG 209/i);
        clickCourse.click();
        const edit = screen.getAllByRole("button", {
            name: "Edit"
        });
        edit[0].click();
        const submit = screen.getAllByRole("button", {
            name: "Confirm"
        });
        const courseDep = screen.getByTestId("editDep");
        const courseCred = screen.getByTestId("editCred");

        //first test
        userEvent.clear(courseDep);
        userEvent.type(courseDep, "test");
        userEvent.type(courseCred, "3");
        submit[0].click();

        expect(screen.getAllByText(/EGGG/i).length).not.toEqual(numEGGG);

        //clear the search box and type in the new course name
        userEvent.clear(searchBox);
        userEvent.type(searchBox, "test");
        screen.getByText(/test 209/i).click();
        //reset the course
        screen.getAllByRole("button", { name: "Reset" })[0].click();
        //clear the search box and type in the old course name
        userEvent.clear(searchBox);
        userEvent.type(searchBox, "eggg209");
        //expect the old course to exist in the list again
        expect(screen.getAllByText("EGGG 209").length).toEqual(1);
    });
});
