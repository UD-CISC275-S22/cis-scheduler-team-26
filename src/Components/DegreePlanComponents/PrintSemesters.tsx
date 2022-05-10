import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Season, Semester } from "../../Interfaces/semester";
import { movePopup } from "./moveCoursePopup";
import { addSemesterPopup } from "./addSemesterPopup";
import { find_course } from "./ViewPlanFunctions";
import { DegreeRequirements } from "./ShowDegreeRequirements";
import { CourseInSemester } from "./CourseInSemester";

//Icon imports for buttons
import { TiEdit } from "react-icons/ti";
import { AiOutlineClear } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { RiAddBoxLine } from "react-icons/ri";
import { CgMoveRight } from "react-icons/cg";
import {
    deletePlanFromStorageByName,
    savePlanToStorage
} from "../../StorageFunctions";
import { FiSave } from "react-icons/fi";

interface planListProp {
    plan: DegreePlan;
    planList: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    edit: boolean;
    editingSem: Semester;
    setEditingSem: (newEditingSem: Semester) => void;
    addingCourse: Course;
    setAddingCourse: (newAddingCourse: Course) => void;
    courses: Course[];
    setMove: (newMove: boolean) => void;
    setMoveSem: (newMoveSem: Semester) => void;
    setMoveCourse: (newMoveCourse: Course) => void;
    semester: Semester;
}
const emptySem: Semester = {
    year: -1,
    season: "Fall",
    courseList: []
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
    return {
        ...currSem,
        courseList: [...currSem.courseList, addingCourse]
    };
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
                currSem.season === editingSem.season &&
                currSem.year === editingSem.year
                    ? addCourseToSemList(currSem, addingCourse)
                    : currSem
        )
    };
}
export function addCourse(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    editingSem: Semester,
    addingCourse: Course
) {
    if (!find_course(plan, addingCourse)) {
        setPlans(
            planList.map(
                (curr: DegreePlan): DegreePlan =>
                    curr === plan
                        ? addCourseHelp(curr, editingSem, addingCourse)
                        : curr
            )
        );
    }
}

function findCourse(courses: Course[], check: string): Course {
    const found = courses.find(
        (currCourse: Course): boolean => currCourse.code === check
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
        )
    };
}
export function removeCourseHelp(
    course: Course,
    sem: Semester,
    curr: DegreePlan
): DegreePlan {
    return {
        ...curr,
        semesterList: curr.semesterList.map(
            (check: Semester): Semester =>
                check === sem ? removeCourseFromSemester(check, course) : check
        )
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
function clearCourses(curr: DegreePlan, editingSem: Semester): Semester[] {
    return curr.semesterList.map(
        (check: Semester): Semester =>
            check === editingSem ? { ...check, courseList: [] } : check
    );
}
function clearSem(
    plan: DegreePlan,
    planList: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    editingSem: Semester
) {
    const newPlans: DegreePlan[] = planList.map(
        (curr: DegreePlan): DegreePlan =>
            curr === plan
                ? { ...curr, semesterList: clearCourses(curr, editingSem) }
                : curr
    );
    setPlans(newPlans);
}

export function PrintSemesters({
    plan,
    planList,
    setPlans,
    edit,
    editingSem,
    setEditingSem,
    addingCourse,
    setAddingCourse,
    courses,
    setMove,
    setMoveSem,
    setMoveCourse,
    semester
}: planListProp): JSX.Element {
    function setMovingCourse(course: Course) {
        setMoveSem(plan.semesterList[0]);
        setMove(true);
        setMoveCourse(course);
    }
    return (
        <div>
            <Table
                striped
                bordered
                hover
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "95%",
                    backgroundColor: "white",
                    backgroundBlendMode: "lighten"
                }}
            >
                <thead>
                    {edit ? (
                        <tr>
                            <th colSpan={2} style={{ fontSize: "30px" }}>
                                {semester.season + " " + semester.year}
                            </th>
                            <th>
                                <Button
                                    style={{
                                        backgroundColor: "red",
                                        borderColor: "red"
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
                            <th colSpan={3} style={{ fontSize: "30px" }}>
                                {semester.season + " " + semester.year}
                            </th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={3}>Course</td>
                    </tr>
                </tbody>
                {semester === editingSem ? (
                    <tbody>
                        {semester.courseList.map(
                            (course: Course): JSX.Element => (
                                <tr key={course.code}>
                                    <td>
                                        <CourseInSemester
                                            course={course}
                                        ></CourseInSemester>
                                    </td>
                                    <td>
                                        <Button
                                            style={{
                                                backgroundColor: "red",
                                                borderColor: "red"
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
                                            <BsTrash></BsTrash>
                                            Remove Course
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            style={{
                                                backgroundColor:
                                                    "darkturquoise",
                                                borderColor: "darkturquoise"
                                            }}
                                            onClick={() =>
                                                setMovingCourse(course)
                                            }
                                        >
                                            {/* I know the negative margins here is ridiculous,
                                                        its actually needed for the button to stay the same size while 
                                                        the size of the icon is increased */}
                                            <CgMoveRight
                                                style={{
                                                    fontSize: "160%",
                                                    marginTop: "-10px",
                                                    marginBottom: "-5px"
                                                }}
                                            ></CgMoveRight>
                                            Move Course
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
                                <tr key={course.code}>
                                    <td colSpan={3}>
                                        <CourseInSemester
                                            course={course}
                                        ></CourseInSemester>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                )}
                {semester === editingSem && (
                    <tbody>
                        <tr>
                            <td colSpan={1}>
                                <Form.Group controlId="addingCourse">
                                    <Form.Label>
                                        Pick the Course to be Added:
                                    </Form.Label>
                                    <Form.Select
                                        value={addingCourse.code}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLSelectElement>
                                        ) =>
                                            setAddingCourse(
                                                findCourse(
                                                    courses,
                                                    event.target.value
                                                )
                                            )
                                        }
                                    >
                                        {courses.map((curr: Course) => (
                                            <option
                                                key={curr.code}
                                                value={curr.code}
                                            >
                                                {curr.code}
                                            </option>
                                        ))}
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
                                    <RiAddBoxLine></RiAddBoxLine> Add Course
                                </Button>
                            </td>
                            <td>
                                <Button
                                    onClick={() =>
                                        clearSem(
                                            plan,
                                            planList,
                                            setPlans,
                                            editingSem
                                        )
                                    }
                                    style={{
                                        backgroundColor: "red",
                                        borderColor: "red"
                                    }}
                                >
                                    <AiOutlineClear></AiOutlineClear> Clear All
                                    Courses
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                )}
            </Table>
            <Button
                style={{ marginBottom: "30px" }}
                onClick={() =>
                    setEditingSem(semester === editingSem ? emptySem : semester)
                }
                data-testid={"editCourseButton"}
            >
                <TiEdit></TiEdit>
                Edit Courses
            </Button>
        </div>
    );
}
