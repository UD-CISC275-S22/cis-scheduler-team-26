import "./PlanList.css";
import React, { useState } from "react";
import { DegreePlan } from "./Interfaces/degreePlan";
import { Button, Form } from "react-bootstrap";
import { DegreeList } from "./Resources/Degrees";
import { Degree } from "./Interfaces/degree";

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
        <div key={plan.planName} className="degree-plan-list-item">
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
    function findDegree(name: string): Degree {
        const found = DegreeList.find((d: Degree): boolean => d.title === name);
        if (found === undefined) {
            return DegreeList[0];
        } else {
            return found;
        }
    }

    function doesPlanNameAlreadyExist(name: string): boolean {
        return (
            planList.find((p: DegreePlan): boolean => p.planName === name) !==
            undefined
        );
    }

    return (
        <div className="create-new-plan-form">
            <h2>Create New Plan:</h2>
            {/*Text form to choose the new plan's name*/}
            <Form.Group controlId="New Plan Name">
                <Form.Label>Plan Name: </Form.Label>
                <Form.Control
                    type="text"
                    value={newPlanName}
                    onChange={(event: ChangeEvent) =>
                        setNewPlanName(event.target.value)
                    }
                    style={{ width: "600px" }}
                />
            </Form.Group>
            {/*Conditional render to tell the user that a plan with this name already exists */}
            {doesPlanNameAlreadyExist(newPlanName) && (
                <p className="plan-name-exists-error-text">
                    A plan with this name already exists
                </p>
            )}
            {/*Dropdown form to choose which degree to pursue */}
            <Form.Group>
                <Form.Label>Select Degree: </Form.Label>
                <Form.Select
                    value={newPlanMajor.title}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        setNewPlanMajor(findDegree(event.target.value));
                    }}
                    style={{ width: "500px" }}
                >
                    {DegreeList.map((d: Degree) => (
                        <option key={DegreeList.indexOf(d)}>{d.title}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            {/*Button to create the new plan and insert it into the planList*/}
            <div>
                <Button
                    onClick={() => {
                        if (doesPlanNameAlreadyExist(newPlanName)) return;
                        setNewPlanName(newPlanName + "");
                        setPlanList([
                            ...planList,
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
                <Button onClick={() => setCreatingNewPlan(false)}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
