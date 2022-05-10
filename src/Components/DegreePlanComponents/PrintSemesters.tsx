import React from "react";
import { Button, Table } from "react-bootstrap";
import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Semester } from "../../Interfaces/semester";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";

//Icon imports for buttons
import { TiEdit } from "react-icons/ti";

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
                <TableHead
                    plan={plan}
                    planList={planList}
                    setPlans={setPlans}
                    edit={edit}
                    semester={semester}
                ></TableHead>
                <tbody>
                    <tr>
                        <td colSpan={3}>Course</td>
                    </tr>
                </tbody>
                <TableBody
                    plan={plan}
                    planList={planList}
                    setPlans={setPlans}
                    editingSem={editingSem}
                    setMove={setMove}
                    setMoveSem={setMoveSem}
                    setMoveCourse={setMoveCourse}
                    semester={semester}
                ></TableBody>
                {semester === editingSem && (
                    <TableFooter
                        plan={plan}
                        planList={planList}
                        setPlans={setPlans}
                        editingSem={editingSem}
                        addingCourse={addingCourse}
                        setAddingCourse={setAddingCourse}
                        courses={courses}
                    ></TableFooter>
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
