import React, { useState } from "react";
import { DegreePlan } from "./Interfaces/degreePlan";
import { Button, Form } from "react-bootstrap";
import { DegreeList } from "./Resources/Degrees";
import { Degree } from "./Interfaces/degree";
import { Course } from "./Interfaces/course";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;
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
            <Button
                onClick={() =>
                    setViewPlan(
                        planList.findIndex(
                            (check: DegreePlan) => check === plan
                        )
                    )
                }
            >
                View/Edit Plan
            </Button>
        </div>
    );
}

export function PlanList({
    planList,
    setPlanList,
    setViewPlan
}: planListProp): JSX.Element {
    const [creatingNewPlan, setCreatingNewPlan] = useState<boolean>(false);
    const [newPlanName, setNewPlanName] = useState<string>("");
    const [newPlanMajor, setNewPlanMajor] = useState<Degree>(DegreeList[0]);
    return (
        <div>
            <h3>Current Degree Plans:</h3>
            <div className="degree-plan-list">
                {planList.map(
                    (plan: DegreePlan): JSX.Element =>
                        printPlan(plan, planList, setViewPlan)
                )}
            </div>
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
                    setCreatingNewPlan,
                    newPlanName,
                    setNewPlanName,
                    newPlanMajor,
                    setNewPlanMajor
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
    setCreatingNewPlan,
    newPlanName,
    setNewPlanName,
    newPlanMajor,
    setNewPlanMajor
}: {
    planList: DegreePlan[];
    setPlanList: (newPlan: DegreePlan[]) => void;
    setCreatingNewPlan: (creatingNewPlan: boolean) => void;
    newPlanName: string;
    setNewPlanName: (str: string) => void;
    newPlanMajor: Degree;
    setNewPlanMajor: (d: Degree) => void;
}): JSX.Element {
    return (
        <div>
            Making New Plan
            <Form.Group controlId="New Plan Name">
                <Form.Label>Plan Name: </Form.Label>
                <Form.Control
                    type="text"
                    value={newPlanName}
                    onChange={(event: ChangeEvent) =>
                        setNewPlanName(event.target.value)
                    }
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Select Degree: </Form.Label>
                <Form.Select
                    value={newPlanMajor.title}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        setNewPlanMajor(
                            DegreeList.find((d: Degree) => {
                                event.target.value === d.title;
                            }) || DegreeList[0]
                        )
                    }
                >
                    {DegreeList.map((d: Degree) => (
                        <option key={DegreeList.indexOf(d)}>{d.title}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Button
                onClick={() => {
                    setNewPlanName(newPlanName + "");
                    setPlanList([
                        ...planList,
                        //This plan is just a sample
                        //MUST BE REMOVED AND REPLACED WITH DATA FROM USER INPUT FORM
                        {
                            planName: newPlanName,
                            semesterList: [],
                            degree: newPlanMajor,
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
