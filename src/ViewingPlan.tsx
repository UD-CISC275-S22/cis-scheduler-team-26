import React from "react";
import { Table } from "react-bootstrap";
import { Course } from "./Interfaces/course";
import { DegreePlan } from "./Interfaces/degreePlan";
import { Semester } from "./Interfaces/semester";

interface planListProp {
    // The type is "a function that consumes a boolean and returns nothing"
    plan: DegreePlan;
    planList: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    setViewPlan: (newCurrPlan: number) => void;
}

function printSemesters(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void
): JSX.Element {
    setPlans(planList); //NEEDS TO BE REMOVED, CURRENTLY JUST TO AVOID ERROR
    return (
        <div>
            {plan.semesterList.map(
                (semester: Semester): JSX.Element => (
                    <div key={semester.season + semester.year}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th colSpan={3}>
                                        {semester.season + " " + semester.year}
                                    </th>
                                </tr>
                            </thead>
                            <tr>
                                <td>Course ID</td>
                                <td>Course Name</td>
                                <td>Number of Credits</td>
                            </tr>
                            <tbody>
                                {semester.courseList.map(
                                    (course: Course): JSX.Element => (
                                        <tr key={course.courseName}>
                                            <td>{course.id}</td>
                                            <td>{course.courseName}</td>
                                            <td>{course.numCredits}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </Table>
                    </div>
                )
            )}
            <div>Name: {plan.planName}</div>
            <div>Expected Degree: {plan.degree.title}</div>
            <div>
                Currently Have {plan.totalCredits} out of{" "}
                {plan.degree.requiredCredits} required Credits
            </div>
        </div>
    );
}

export function ViewingPlan({
    plan,
    planList,
    setPlans,
    setViewPlan
}: planListProp): JSX.Element {
    return (
        <div>
            <h3>Currently Displaying {plan.planName}:</h3>
            {printSemesters(plan, planList, setPlans)}
            <button onClick={() => setViewPlan(-1)}>Return to Plan List</button>
        </div>
    );
}
