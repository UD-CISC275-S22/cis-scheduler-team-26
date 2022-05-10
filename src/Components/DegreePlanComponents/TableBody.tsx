import React from "react";
import { Button } from "react-bootstrap";
import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Semester } from "../../Interfaces/semester";
import { CourseInSemester } from "./CourseInSemester";

//Icon imports for buttons
import { BsTrash } from "react-icons/bs";
import { CgMoveRight } from "react-icons/cg";

interface planListProp {
    plan: DegreePlan;
    planList: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    editingSem: Semester;
    setMove: (newMove: boolean) => void;
    setMoveSem: (newMoveSem: Semester) => void;
    setMoveCourse: (newMoveCourse: Course) => void;
    semester: Semester;
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

export function TableBody({
    plan,
    planList,
    setPlans,
    editingSem,
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
    return semester === editingSem ? (
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
                                    backgroundColor: "darkturquoise",
                                    borderColor: "darkturquoise"
                                }}
                                onClick={() => setMovingCourse(course)}
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
    );
}
