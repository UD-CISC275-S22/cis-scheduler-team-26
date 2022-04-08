import React, { useState } from "react";
import { Form, Table } from "react-bootstrap";
import { Course } from "./Interfaces/course";
import { DegreePlan } from "./Interfaces/degreePlan";
import { Season, Semester, validSeason } from "./Interfaces/semester";

interface planListProp {
    plan: DegreePlan;
    planList: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    setViewPlan: (newCurrPlan: number) => void;
}

function removeSemHelp(
    curr: DegreePlan,
    season: Season,
    year: number
): DegreePlan {
    return {
        ...curr,
        semesterList: curr.semesterList.filter(
            (sem: Semester): boolean => sem.season != season || sem.year != year
        )
    };
}
function removeSemester(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    season: Season,
    year: number
) {
    setPlans(
        planList.map(
            (curr: DegreePlan): DegreePlan =>
                curr === plan ? removeSemHelp(curr, season, year) : curr
        )
    );
}

function printSemesters(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    edit: boolean
): JSX.Element {
    setPlans(planList); //NEEDS TO BE REMOVED, CURRENTLY JUST TO AVOID ERROR
    return (
        <div>
            {plan.semesterList.map(
                (semester: Semester): JSX.Element => (
                    <div key={semester.season + semester.year}>
                        <Table striped bordered hover>
                            <thead>
                                {edit ? (
                                    <tr>
                                        <th colSpan={2}>
                                            {semester.season +
                                                " " +
                                                semester.year}
                                        </th>
                                        <th>
                                            <button
                                                style={{
                                                    backgroundColor: "red"
                                                }}
                                                onClick={() =>
                                                    removeSemester(
                                                        plan,
                                                        planList,
                                                        setPlans,
                                                        semester.season,
                                                        semester.year
                                                    )
                                                }
                                            >
                                                Delete Semester
                                            </button>
                                        </th>
                                    </tr>
                                ) : (
                                    <tr>
                                        <th colSpan={3}>
                                            {semester.season +
                                                " " +
                                                semester.year}
                                        </th>
                                    </tr>
                                )}
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
function addSemHelp(
    plan: DegreePlan,
    season: Season,
    year: number
): DegreePlan {
    const alreadyContains = plan.semesterList.find(
        (check: Semester): boolean =>
            check.season === season && check.year === year
    );
    if (alreadyContains) {
        return plan;
    }
    return {
        ...plan,
        semesterList: [
            ...plan.semesterList,
            { year: year, season: season, courseList: [], totalCredits: 0 }
        ]
    };
}
function addSemesters(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    season: Season,
    setSeason: (newSeason: Season) => void,
    year: number,
    setYear: (newYear: number) => void
) {
    return (
        <div>
            <Form.Group controlId="semesterYear">
                <Form.Label>Year:</Form.Label>
                <Form.Control
                    type="number"
                    value={year}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setYear(parseInt(event.target.value))
                    }
                />
            </Form.Group>
            <Form.Group controlId="semesterSeason">
                <Form.Label>Season:</Form.Label>
                <Form.Select
                    value={season}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        setSeason(validSeason(event.target.value))
                    }
                >
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                </Form.Select>
            </Form.Group>
            <button
                onClick={() =>
                    setPlans(
                        planList.map(
                            (curr: DegreePlan): DegreePlan =>
                                curr === plan
                                    ? addSemHelp(curr, season, year)
                                    : curr
                        )
                    )
                }
            >
                Add Semester
            </button>
        </div>
    );
}

export function ViewingPlan({
    plan,
    planList,
    setPlans,
    setViewPlan
}: planListProp): JSX.Element {
    const [edit, setEdit] = useState<boolean>(false);
    const [season, setSeason] = useState<Season>("Winter");
    const [year, setYear] = useState<number>(2022);
    return (
        <div>
            <h3>Currently Displaying {plan.planName}:</h3>
            {printSemesters(plan, planList, setPlans, edit)}
            {edit &&
                addSemesters(
                    plan,
                    planList,
                    setPlans,
                    season,
                    setSeason,
                    year,
                    setYear
                )}
            <button onClick={() => setEdit(!edit)}>Edit Semesters</button>
            <button onClick={() => setViewPlan(-1)}>Return to Plan List</button>
        </div>
    );
}
