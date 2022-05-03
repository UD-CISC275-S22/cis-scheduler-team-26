import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import { DegreePlan } from "../../Interfaces/degreePlan";

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
        const plantest: DegreePlan[] = JSON.parse(
            localStorage.getItem("plans")
        );
        expect(plantest[0].planName).toBe("testplan2");
        expect(plantest[0].totalCredits).toBe(0);
        savePlan.click();
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
        const viewPlan = screen.getAllByRole("button", {
            name: "View/Edit Plan"
        });
        viewPlan[1].click();
        const savePlan = screen.getByRole("button", {
            name: /Save Plan/i
        });
        savePlan.click();
        const plantest: DegreePlan[] = JSON.parse(
            localStorage.getItem("plans")
        );
        expect(plantest[0].planName).toBe("testplan2");
        expect(plantest[0].totalCredits).toBe(0);
        savePlan.click();
        expect(localStorage.getItem("plans")).toBe("[]");
    });
});
