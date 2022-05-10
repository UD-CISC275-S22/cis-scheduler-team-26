import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Semester } from "../../Interfaces/semester";
import { findCourseByCode } from "./ViewPlanFunctions";
import { CourseInSemester } from "./CourseInSemester";
import {
    removeCourse,
    addCourse,
    removeSemester,
    clearSem
} from "./ViewPlanFunctions";

//Icon imports for buttons
import { TiEdit } from "react-icons/ti";
import { AiOutlineClear } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { RiAddBoxLine } from "react-icons/ri";
import { CgMoveRight } from "react-icons/cg";

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
                                                findCourseByCode(
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
