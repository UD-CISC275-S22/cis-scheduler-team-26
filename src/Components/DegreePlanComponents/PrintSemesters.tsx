import React from "react";
import { Button, Table } from "react-bootstrap";
import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Semester } from "../../Interfaces/semester";
import { TableHead } from "./SemesterTableHead";
import { TableBody } from "./SemesterTableBody";
import { TableFooter } from "./SemesterTableFooter";

//Icon imports for buttons
import { TiEdit } from "react-icons/ti";

interface planListProp {
    plan: DegreePlan;
    planList: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
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
                    marginLeft: "20px",
                    marginRight: "20px",
                    width: "600px",
                    backgroundColor: "white",
                    backgroundBlendMode: "lighten",
                    borderStyle: "solid",
                    borderWidth: "10px"
                }}
            >
                <TableHead
                    plan={plan}
                    planList={planList}
                    setPlans={setPlans}
                    editingSemester={editingSem}
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
                        setEditingSem={setEditingSem}
                    ></TableFooter>
                )}
            </Table>
            <Button
                style={{ marginBottom: "30px", marginTop: "-15px" }}
                onClick={() =>
                    setEditingSem(semester === editingSem ? emptySem : semester)
                }
                data-testid={"editCourseButton"}
            >
                <TiEdit
                    style={{ fontSize: "130%", marginTop: "-5px" }}
                ></TiEdit>
                Edit Semester
            </Button>
        </div>
    );
}
