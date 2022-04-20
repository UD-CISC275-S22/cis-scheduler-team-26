import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Course } from "./Interfaces/course";
import { DegreePlan } from "./Interfaces/degreePlan";
import { Season, Semester, validSeason } from "./Interfaces/semester";

interface planListProp {
    plan: DegreePlan;
    planList: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    setViewPlan: (newCurrPlan: number) => void;
    courses: Course[];
}
const emptySem: Semester = {
    year: -1,
    season: "Fall",
    courseList: [],
    totalCredits: -1
};

function removeSemHelp(
    curr: DegreePlan,
    season: Season,
    year: number
): DegreePlan {
    return {
        ...curr,
        semesterList: curr.semesterList.filter(
            (sem: Semester): boolean => sem.season != season || sem.year != year
        ),
        totalCredits:
            curr.totalCredits -
            curr.semesterList.reduce(
                (currentTotal: number, sem: Semester) =>
                    sem.season === season && sem.year === year
                        ? currentTotal + sem.totalCredits
                        : currentTotal,
                0
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
function addCourseToSemList(currSem: Semester, addingCourse: Course) {
    if (
        currSem.courseList.findIndex(
            (check: Course): boolean => check === addingCourse
        ) === -1
    ) {
        return {
            ...currSem,
            courseList: [...currSem.courseList, addingCourse],
            totalCredits: currSem.totalCredits + addingCourse.numCredits
        };
    }
    return { ...currSem };
}
function addCourseHelp(
    curr: DegreePlan,
    editingSem: Semester,
    addingCourse: Course
): DegreePlan {
    return {
        ...curr,
        semesterList: curr.semesterList.map(
            (currSem: Semester): Semester =>
                currSem === editingSem
                    ? addCourseToSemList(currSem, addingCourse)
                    : currSem
        ),
        totalCredits:
            curr.totalCredits +
            curr.semesterList.reduce(
                (currentTotal: number, sem: Semester) =>
                    sem === editingSem
                        ? sem.courseList.includes(addingCourse, 0)
                            ? currentTotal
                            : addingCourse.numCredits
                        : currentTotal,
                0
            )
    };
}
function addCourse(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    editingSem: Semester,
    addingCourse: Course
) {
    setPlans(
        planList.map(
            (curr: DegreePlan): DegreePlan =>
                curr === plan
                    ? addCourseHelp(curr, editingSem, addingCourse)
                    : curr
        )
    );
}

function findCourse(courses: Course[], check: string): Course {
    const found = courses.find(
        (currCourse: Course): boolean =>
            currCourse.courseName + currCourse.id === check
    );
    if (found === undefined) {
        return courses[0];
    } else {
        return found;
    }
}
function removeCourseFromSemester(check: Semester, course: Course): Semester {
    return {
        ...check,
        courseList: check.courseList.filter(
            (currCourse: Course): boolean => currCourse != course
        ),
        totalCredits: check.totalCredits - course.numCredits
    };
}
function removeCourseHelp(
    course: Course,
    sem: Semester,
    curr: DegreePlan
): DegreePlan {
    return {
        ...curr,
        semesterList: curr.semesterList.map(
            (check: Semester): Semester =>
                check === sem ? removeCourseFromSemester(check, course) : check
        ),
        totalCredits: curr.totalCredits - course.numCredits
    };
}
function removeCourse(
    course: Course,
    sem: Semester,
    plan: DegreePlan,
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void
) {
    setPlans(
        plans.map(
            (curr: DegreePlan): DegreePlan =>
                curr === plan ? removeCourseHelp(course, sem, curr) : curr
        )
    );
}

function printSemesters(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    edit: boolean,
    editingSem: Semester,
    setEditingSem: (newEditingSem: Semester) => void,
    addingCourse: Course,
    setAddingCourse: (newAddingCourse: Course) => void,
    courses: Course[]
): JSX.Element {
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
                                            <Button
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
                                            </Button>
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
                            <tbody>
                                <tr>
                                    <td>Course ID</td>
                                    <td>Course Name</td>
                                    <td>Number of Credits</td>
                                </tr>
                            </tbody>
                            {semester === editingSem ? (
                                <tbody>
                                    {semester.courseList.map(
                                        (course: Course): JSX.Element => (
                                            <tr key={course.courseName}>
                                                <td>{course.id}</td>
                                                <td>{course.courseName}</td>
                                                <td>{course.numCredits}</td>
                                                <td>
                                                    <Button
                                                        style={{
                                                            backgroundColor:
                                                                "red"
                                                        }}
                                                        onClick={() =>
                                                            removeCourse(
                                                                course,
                                                                semester,
                                                                plan,
                                                                planList,
                                                                setPlans
                                                            )
                                                        }
                                                    >
                                                        Remove Course
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            ) : (
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
                            )}
                            {semester === editingSem && (
                                <tbody>
                                    <tr>
                                        <td colSpan={2}>
                                            <Form.Group controlId="addingCourse">
                                                <Form.Label>
                                                    Pick the Course to be Added:
                                                </Form.Label>
                                                <Form.Select
                                                    value={
                                                        addingCourse.courseName +
                                                        addingCourse.id
                                                    }
                                                    onChange={(
                                                        event: React.ChangeEvent<HTMLSelectElement>
                                                    ) =>
                                                        setAddingCourse(
                                                            findCourse(
                                                                courses,
                                                                event.target
                                                                    .value
                                                            )
                                                        )
                                                    }
                                                >
                                                    {courses.map(
                                                        (curr: Course) => (
                                                            <option
                                                                key={
                                                                    curr.courseName +
                                                                    curr.id
                                                                }
                                                                value={
                                                                    curr.courseName +
                                                                    curr.id
                                                                }
                                                            >
                                                                {curr.courseName +
                                                                    curr.id}
                                                            </option>
                                                        )
                                                    )}
                                                </Form.Select>
                                            </Form.Group>
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() =>
                                                    addCourse(
                                                        plan,
                                                        planList,
                                                        setPlans,
                                                        editingSem,
                                                        addingCourse
                                                    )
                                                }
                                            >
                                                Add Course
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </Table>
                        <Button
                            onClick={() =>
                                setEditingSem(
                                    semester === editingSem
                                        ? emptySem
                                        : semester
                                )
                            }
                        >
                            Edit Courses
                        </Button>
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
            <Button
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
            </Button>
        </div>
    );
}
function emptyCourseList(curr: Semester): Semester {
    return { ...curr, courseList: [] };
}
function clearHelp(clearSem: Semester[]): Semester[] {
    return clearSem.map((curr: Semester): Semester => emptyCourseList(curr));
}
function clearAllCourses(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void
) {
    const newPlans = planList.map(
        (curr: DegreePlan): DegreePlan =>
            curr === plan
                ? { ...curr, semesterList: clearHelp(curr.semesterList) }
                : curr
    );
    setPlans(newPlans);
    calculateScore(newPlans, setPlans);
}
export function calculateScore(
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void
) {
    function scoreTotal(curr: Semester): Semester {
        return {
            ...curr,
            totalCredits: curr.courseList.reduce(
                (currentTotal: number, currCourse: Course) =>
                    currentTotal + currCourse.numCredits,
                0
            )
        };
    }
    function scoreSemester(curr: DegreePlan): DegreePlan {
        return {
            ...curr,
            semesterList: curr.semesterList.map(
                (check: Semester): Semester => scoreTotal(check)
            )
        };
    }
    function scorePlan(curr: DegreePlan): DegreePlan {
        return {
            ...curr,
            totalCredits: curr.semesterList.reduce(
                (currentTotal: number, currSem: Semester) =>
                    currentTotal + currSem.totalCredits,
                0
            )
        };
    }
    let newPlans: DegreePlan[] = planList.map(
        (curr: DegreePlan): DegreePlan => scoreSemester(curr)
    );
    newPlans = newPlans.map((curr: DegreePlan): DegreePlan => scorePlan(curr));
    setPlans(newPlans);
}

export function ViewingPlan({
    plan,
    planList,
    setPlans,
    setViewPlan,
    courses
}: planListProp): JSX.Element {
    const [edit, setEdit] = useState<boolean>(false);
    const [season, setSeason] = useState<Season>("Winter");
    const [year, setYear] = useState<number>(2022);
    const [editingSem, setEditingSem] = useState<Semester>(emptySem);
    const [addingCourse, setAddingCourse] = useState<Course>(courses[0]);
    return (
        <div>
            <h3>Currently Displaying {plan.planName}:</h3>
            {printSemesters(
                plan,
                planList,
                setPlans,
                edit,
                editingSem,
                setEditingSem,
                addingCourse,
                setAddingCourse,
                courses
            )}
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
            <Button onClick={() => setEdit(!edit)}>Edit Semesters</Button>
            <Button
                onClick={() => clearAllCourses(plan, planList, setPlans)}
                style={{ backgroundColor: "darkred" }}
            >
                Clear All Semesters
            </Button>
            <div>
                <Button onClick={() => setViewPlan(-1)}>
                    Return to Plan List
                </Button>
            </div>
        </div>
    );
}
