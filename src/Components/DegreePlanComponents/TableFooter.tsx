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
import SelectSearch, { SelectSearchOption } from "react-select-search";

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
    const sel_search_options: SelectSearchOption[] = courses.map(
        (course: Course) => {
            const opt: SelectSearchOption = {
                name: course.code,
                value: course.code
            };
            return opt;
        }
    );
    function filter_for_sel_search(opts: SelectSearchOption[]) {
        return (opt: string) =>
            opts.filter((val: SelectSearchOption) => val.name.startsWith(opt));
    }
    return (
        <tbody>
            <tr>
                <td colSpan={1}>
                    <h5>Search for course:</h5>
                    <SelectSearch
                        options={sel_search_options}
                        search={true}
                        filterOptions={filter_for_sel_search}
                        closeOnSelect={false}
                        onChange={(selectedVal) =>
                            setAddingCourse(
                                findCourseByCode(
                                    courses,
                                    selectedVal.toString()
                                )
                            )
                        }
                        placeholder={"ex. CISC 108"}
                    ></SelectSearch>
                    {/* 
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
                    */}
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
