import React, { useState } from "react";
import { DegreePlan } from "./Interfaces/degreePlan";

interface planListProp {
    // The type is "a function that consumes a boolean and returns nothing"
    planList: DegreePlan[];
    setPlanList: (newPlan: DegreePlan[]) => void;
    setViewPlan: (newCurrPlan: number) => void;
}

function printPlan(
    plan: DegreePlan,
    planList: DegreePlan[],
    setViewPlan: (newCurrPlan: number) => void
): JSX.Element {
    return (
        <div>
            <div>Name: {plan.planName}</div>
            <div>Expected Degree: {plan.degree}</div>
            <div>
                Currently Have {plan.totalCredits} out of{" "}
                {plan.degree.requiredCredits} required Credits
            </div>
            <button
                onClick={() =>
                    setViewPlan(
                        planList.findIndex(
                            (check: DegreePlan) => check === plan
                        )
                    )
                }
            >
                View/Edit Plan
            </button>
        </div>
    );
}

export function PlanList({
    planList,
    setPlanList,
    setViewPlan
}: planListProp): JSX.Element {
    return (
        <div>
            <h3>List of current Degree Plans:</h3>
            {planList.map(
                (plan: DegreePlan): JSX.Element =>
                    printPlan(plan, planList, setViewPlan)
            )}
        </div>
    );
}
