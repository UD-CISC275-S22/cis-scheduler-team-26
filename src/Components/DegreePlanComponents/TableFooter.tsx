import React from "react";
import { Button, Form } from "react-bootstrap";
import { Course } from "../../Interfaces/course";
import { DegreePlan } from "../../Interfaces/degreePlan";
import { Semester } from "../../Interfaces/semester";
import { findCourseByCode } from "./ViewPlanFunctions";
import { addCourse, clearSem } from "./ViewPlanFunctions";

//Icon imports for buttons
import { AiOutlineClear } from "react-icons/ai";
import { RiAddBoxLine } from "react-icons/ri";

interface planListProp {
    plan: DegreePlan;
    planList: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    editingSem: Semester;
    addingCourse: Course;
    setAddingCourse: (newAddingCourse: Course) => void;
    courses: Course[];
}

export function TableFooter({
    plan,
    planList,
    setPlans,
    editingSem,
    addingCourse,
    setAddingCourse,
    courses
}: planListProp): JSX.Element {
    return (
        <tbody>
            <tr>
                <td colSpan={1}>
                    <Form.Group controlId="addingCourse">
                        <Form.Label>Pick the Course to be Added:</Form.Label>
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
                                <option key={curr.code} value={curr.code}>
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
