import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

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
        const editButton = screen.getAllByRole("button", {
            name: /Edit Semesters/i
        });
        editButton[0].click();
        const removeCourseButton = screen.getAllByRole("button", {
            name: /Delete Semester/i
        });
        removeCourseButton[0].click();
        expect(screen.getByText(/EGGG/i)).toBeInTheDocument();
        expect(screen.getByText(/Winter 2022/i)).not.toBeInTheDocument();
        expect(screen.getAllByText(/3/i).length === 4);
    });

    //Change Tests under this line, add test for adding semester, and score
    test("Testing adding a multiple choice question", () => {
        const editButton = screen.getByRole("button", {
            name: /Edit Questions/i
        });
        editButton.click();
        const typeDropdown = screen.getByRole("combobox", {
            name: /Multiple Choice or Short Answer?/i
        });
        userEvent.selectOptions(typeDropdown, "Multiple Choice");
        const nameBox = screen.getByRole("textbox", { name: /Name:/i });
        userEvent.type(nameBox, "Second Question for Testing");
        const descBox = screen.getByRole("textbox", {
            name: "Description/Body:"
        });
        userEvent.type(descBox, "Second Question body");
        const answerBox = screen.getByRole("textbox", {
            name: /Expected Answer:/i
        });
        userEvent.type(answerBox, "No Answer");
        const points = screen.getByRole("spinbutton", {
            name: /How many Points is this question worth?/i
        });
        userEvent.type(points, "10");
        const addOption = screen.getByRole("button", {
            name: /Add Option/i
        });
        const optionBox = screen.getByRole("textbox", {
            name: "Multiple Choice Option:"
        });
        userEvent.type(optionBox, "Option 1");
        addOption.click();
        const addQues = screen.getByRole("button", {
            name: /Add Question/i
        });
        addQues.click();
        expect(
            screen.getByText(/Second Question for Testing/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Second Question Body/i)).toBeInTheDocument();
        expect(screen.getByText(/Worth 10 Points/i)).toBeInTheDocument();
    });
    test("Multiple Choice Questions can be answered", () => {
        const typeDropdown = screen.getByRole("combobox", {
            name: /Choose an answer/i
        });
        expect(
            screen.getAllByText(/This question has not yet been answered/i)
                .length >= 2
        );
        userEvent.selectOptions(typeDropdown, "Answer");
        expect(screen.getByText(/✔️/i)).toBeInTheDocument();
        userEvent.selectOptions(typeDropdown, "First");
        expect(screen.getAllByText(/❌/i).length >= 2);
        expect(
            screen.getByText(/You have already answered this question/i)
        ).toBeInTheDocument();
    });
    test("Short Answer Questions can be answered", () => {
        const answerBox = screen.getByRole("textbox", {
            name: /Input your answer:/i
        });
        expect(
            screen.getAllByText(/This question has not yet been answered/i)
                .length >= 2
        );
        userEvent.type(answerBox, "Answer");
        expect(screen.getByText(/✔️/i)).toBeInTheDocument();
        userEvent.type(answerBox, "Wrong");
        expect(screen.getAllByText(/❌/i).length >= 2);
        expect(
            screen.getByText(/You have already answered this question/i)
        ).toBeInTheDocument();
    });
    test("Score is updated when a question is answered", () => {
        const typeDropdown = screen.getByRole("combobox", {
            name: /Choose an answer/i
        });
        userEvent.selectOptions(typeDropdown, "Answer");
        const endQuizButton = screen.getByRole("button", {
            name: /End Quiz/i
        });
        endQuizButton.click();
        expect(
            screen.getByText(/You have currently scored 1 points/i)
        ).toBeInTheDocument();
    });
    test("clearQuestions works, and the score is decreased", () => {
        const typeDropdown = screen.getByRole("combobox", {
            name: /Choose an answer/i
        });
        userEvent.selectOptions(typeDropdown, "Answer");
        const endQuizButton = screen.getByRole("button", {
            name: /End Quiz/i
        });
        endQuizButton.click();
        const clearAnswersButton = screen.getAllByRole("button", {
            name: /Clear Answers/i
        });
        clearAnswersButton[0].click();
        expect(
            screen.getByText(/You have currently scored 0 points/i)
        ).toBeInTheDocument();
        const takeQuizButton = screen.getAllByRole("button", {
            name: /Take Quiz/i
        });
        takeQuizButton[0].click();
        expect(
            screen.getAllByText(/This question has not yet been answered/i)
                .length >= 2
        );
    });
    test("Quiz Questions can be deleted", () => {
        const editQuestionButton = screen.getByRole("button", {
            name: /Edit Questions/i
        });
        editQuestionButton.click();
        const deleteQuestionButton = screen.getAllByRole("button", {
            name: /Delete Question/i
        });
        deleteQuestionButton[0].click();
        expect(screen.queryByText(/Test Question/i) === null);
    });
    test("Quiz Questions can be published/unpublished", () => {
        const editQuestionButton = screen.getByRole("button", {
            name: /Edit Questions/i
        });
        editQuestionButton.click();
        const publishQuestionButton = screen.getAllByRole("button", {
            name: "Publish/Unpublish Question"
        });
        publishQuestionButton[0].click();
        expect(
            screen.getByText(/Currently Published: false/i)
        ).toBeInTheDocument();
        publishQuestionButton[0].click();
        expect(screen.getAllByText(/Currently Published: true/i).length >= 2);
    });
});
