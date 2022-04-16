import React, { useState } from "react";
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
    const [creatingNewPlan, setCreatingNewPlan] = useState<boolean>(false);
    return (
        <div>
            <h3>List of current Degree Plans:</h3>
            {planList.map(
                (plan: DegreePlan): JSX.Element =>
                    printPlan(plan, planList, setViewPlan)
            )}
            {/*Only render the button to create a new plan if your are not currently creating a new plan*/}
            {!creatingNewPlan && (
                <Button onClick={() => setCreatingNewPlan(!creatingNewPlan)}>
                    Create New Plan
                </Button>
            )}
            {/*Only render the form to create a new plan if the create new plan button is pressed */}
            {creatingNewPlan &&
                makeNewPlanForm({
                    planList,
                    setPlanList,
                    setCreatingNewPlan
                })}
        </div>
    );
}

//Renders the form to create a new degree plan
//takes user input like:
//  the plan's name
//  which degree
function makeNewPlanForm({
    planList,
    setPlanList,
    setCreatingNewPlan
}: {
    planList: DegreePlan[];
    setPlanList: (newPlan: DegreePlan[]) => void;
    setCreatingNewPlan: (creatingNewPlan: boolean) => void;
}): JSX.Element {
    return (
        <div>
            Making New Plan
            <Button
                onClick={() => {
                    setPlanList([
                        ...planList,
                        //This plan is just a sample
                        //MUST BE REMOVED AND REPLACED WITH DATA FROM USER INPUT FORM
                        {
                            planName: "Sample Plan",
                            semesterList: [],
                            degree: DegreeList[0],
                            totalCredits: 0
                        }
                    ]);
                    setCreatingNewPlan(false);
                }}
            >
                Add Plan
            </Button>
            <Button onClick={() => setCreatingNewPlan(false)}>Cancel</Button>
        </div>
    );
}
