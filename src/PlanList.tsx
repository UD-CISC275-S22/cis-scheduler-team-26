import React from "react";
import { DegreePlan } from "./Interfaces/degreePlan";
import { Button } from "react-bootstrap";
import { DegreeList } from "./Resources/Degrees";

interface planListProp {
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
        <div key={plan.planName}>
            <div>Name: {plan.planName}</div>
            <div>Expected Degree: {plan.degree.title}</div>
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
            <Button
                onClick={() =>
                    setPlanList([
                        ...planList,
                        {
                            planName: "New Plan",
                            semesterList: [],
                            degree: DegreeList[0],
                            totalCredits: 0
                        }
                    ])
                }
            >
                Create New Plan
            </Button>
        </div>
    );
}
