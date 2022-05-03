import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("MoveCourse Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("Plans can be saved", () => {
        const addPlanButton = screen.getByRole("button", {
            name: /Create New Plan/i
        });
        addPlanButton.click();
        const nameBox = screen.getByRole("textbox", {
            name: /Plan Name:/i
        });
        userEvent.type(nameBox, "testplan2");
        const confirmButton = screen.getByRole("button", {
            name: /Confirm/i
        });
        confirmButton.click();
        const viewPlan = screen.getAllByRole("button", {
            name: "View/Edit Plan"
        });
        viewPlan[1].click();
        const savePlan = screen.getByRole("button", {
            name: /Save Plan/i
        });
        savePlan.click();
        const returnButton = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton.click();
        location.reload();
        expect(screen.getByText(/testplan2/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Completed 0 out of 124 required credits/i)
        ).toBeInTheDocument();
    });
    test("Plans can be unsaved", () => {
        const addPlanButton = screen.getByRole("button", {
            name: /Create New Plan/i
        });
        addPlanButton.click();
        const nameBox = screen.getByRole("textbox", {
            name: /Plan Name:/i
        });
        userEvent.type(nameBox, "testplan2");
        const confirmButton = screen.getByRole("button", {
            name: /Confirm/i
        });
        confirmButton.click();
        let viewPlan = screen.getAllByRole("button", {
            name: "View/Edit Plan"
        });
        viewPlan[1].click();
        let savePlan = screen.getByRole("button", {
            name: /Save Plan/i
        });
        savePlan.click();
        let returnButton = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton.click();
        location.reload();
        expect(screen.getByText(/testplan2/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Completed 0 out of 124 required credits/i)
        ).toBeInTheDocument();
        viewPlan = screen.getAllByRole("button", {
            name: "View/Edit Plan"
        });
        viewPlan[1].click();
        savePlan = screen.getByRole("button", {
            name: /Save Plan/i
        });
        savePlan.click();
        returnButton = screen.getByRole("button", {
            name: /Return to Plan List/i
        });
        returnButton.click();
        location.reload();
        expect(screen.getByText(/testplan2/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Completed 0 out of 124 required credits/i)
        ).toBeInTheDocument();
    });
});
