import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("PlanList Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("The current plans are shown", () => {
        expect(screen.getByText(/Current Degree Plans:/i)).toBeInTheDocument();
    });
    test("The Welcome message is displayed", () => {
        expect(
            screen.getByText(
                /Make, manage, and save degree plans for computer science degrees offered at UD/i
            )
        ).toBeInTheDocument();
    });
    test("Plans can be added", () => {
        screen.getByRole("button", { name: "Create New Plan" }).click();
        const nameBox = screen.getByRole("textbox", {
            name: /Plan Name:/i
        });
        userEvent.type(nameBox, "Testing Plan");
        screen.getByRole("button", { name: "Confirm" }).click();
        expect(screen.getByText(/Testing Plan/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Computer Science Bachelor of Arts/i)
        ).toBeInTheDocument();
    });
    test("Plans can be removed", () => {
        screen.getByRole("button", { name: "Create New Plan" }).click();
        const nameBox = screen.getByRole("textbox", {
            name: /Plan Name:/i
        });
        userEvent.type(nameBox, "Testing Plan");
        screen.getByRole("button", { name: "Confirm" }).click();
        screen.getByRole("button", { name: "Delete Plan" }).click();
        expect(screen.queryByText(/Testing Plan/i)).not.toBeInTheDocument();
        expect(
            screen.queryByText(/Computer Science Bachelor of Arts/i)
        ).not.toBeInTheDocument();
    });
});
