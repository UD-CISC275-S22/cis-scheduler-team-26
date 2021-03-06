import React from "react";
import { Button } from "react-bootstrap";
import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Semester } from "../../Interfaces/semester";
import { addCourse, clearSem } from "./ViewPlanFunctions";
import { CourseSearch } from "./CourseSearchComponent";

//Icon imports for buttons
import { AiOutlineClear } from "react-icons/ai";
import { RiAddBoxLine } from "react-icons/ri";

interface footerProps {
    plan: DegreePlan;
    planList: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    editingSem: Semester;
    addingCourse: Course;
    setAddingCourse: (newAddingCourse: Course) => void;
    courses: Course[];
    setEditingSem: (newSem: Semester) => void;
}

export function TableFooter({
    plan,
    planList,
    setPlans,
    editingSem,
    addingCourse,
    setAddingCourse,
    courses,
    setEditingSem
}: footerProps): JSX.Element {
    return (
        <tbody>
            <tr>
                <td colSpan={1}>
                    <CourseSearch
                        courses={courses}
                        setAddingCourse={setAddingCourse}
                    ></CourseSearch>
                </td>
                <td>
                    <Button
                        onClick={() =>
                            addCourse(
                                plan,
                                planList,
                                setPlans,
                                editingSem,
                                addingCourse,
                                setEditingSem
                            )
                        }
                    >
                        <RiAddBoxLine></RiAddBoxLine> Add {addingCourse.code}
                    </Button>
                </td>
                <td>
                    <Button
                        onClick={() =>
                            clearSem(plan, planList, setPlans, editingSem)
                        }
                        style={{
                            backgroundColor: "red",
                            borderColor: "red"
                        }}
                    >
                        <AiOutlineClear></AiOutlineClear> Clear All Courses
                    </Button>
                </td>
            </tr>
        </tbody>
    );
}
