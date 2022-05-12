import React, { useState } from "react";
import { Course } from "../../Interfaces/course";
import { Button, Form } from "react-bootstrap";
import { RenderCourse } from "./RenderCourse";
import { AddCourseForm } from "./AddCoursePopup";
import { DegreePlan } from "../../Interfaces/degreePlan";
import "./CoursesList.css";

//icon imports
import { RiAddBoxLine } from "react-icons/ri";
import { updateCoursesInPlans } from "./UpdateCoursesInPlansFunction";
interface coursesListProp {
    setCourses: (newCourses: Course[]) => void;
    courses: Course[];
    unmodifiedCourses: Course[];
    setUnmodifiedCourses: (c: Course[]) => void;
    planList: DegreePlan[];
    setPlanList: (d: DegreePlan[]) => void;
}

export function CoursesList({
    setCourses,
    courses,
    unmodifiedCourses,
    setUnmodifiedCourses,
    planList,
    setPlanList
}: coursesListProp): JSX.Element {
    //Creating new course info
    const [addingCourse, setAddingCourse] = useState<boolean>(false);
    const [newCourseDepartment, setNewCourseDepartment] = useState<string>("");
    const [newCourseID, setNewCourseID] = useState<number>(0);
    const [newCourseCredits, setNewCourseCredits] = useState<number>(0);
    //filter course list string
    const [filter, setFilter] = useState<string>("");

    return (
        <div>
            <Form.Group>
                <Form.Label style={{ fontSize: "30px" }}>
                    Search For Course:
                </Form.Label>
                <Form.Control
                    type="text"
                    value={filter}
                    placeholder={"ex. cisc108"}
                    onChange={(
                        event: React.ChangeEvent<
                            HTMLTextAreaElement | HTMLInputElement
                        >
                    ) => setFilter(event.target.value)}
                />
            </Form.Group>
            <br></br>
            {courses.map(
                (curr: Course) =>
                    filterFunction(filter, curr.code) && (
                        <div key={curr.code}>
                            <RenderCourse
                                Course={curr}
                                deleteCourse={() => {
                                    deleteCourseByName(curr.code);
                                    updateCoursesInPlans(
                                        planList,
                                        setPlanList,
                                        curr,
                                        null
                                    );
                                }}
                                editCourse={(
                                    newName: string,
                                    newCreds: number
                                ) =>
                                    editCourseByName(
                                        curr.code,
                                        newName,
                                        newCreds
                                    )
                                }
                                resetCourse={() => {
                                    resetCourse(curr, planList, setPlanList);
                                }}
                                planList={planList}
                                setPlanList={setPlanList}
                            ></RenderCourse>
                        </div>
                    )
            )}
            <Button onClick={() => setAddingCourse(true)}>
                <RiAddBoxLine
                    style={{ marginBottom: "2px", fontSize: "20px" }}
                ></RiAddBoxLine>{" "}
                Add Course
            </Button>
            {/*Render the form to add a course if Add Course button is pressed */}
            <AddCourseForm
                addingCourse={addingCourse}
                setAddingCourse={setAddingCourse}
                newCourseDepartment={newCourseDepartment}
                setNewCourseDepartment={setNewCourseDepartment}
                newCourseID={newCourseID}
                setNewCourseID={setNewCourseID}
                newCourseCredits={newCourseCredits}
                setNewCourseCredits={setNewCourseCredits}
                courseList={courses}
                addCourse={addCourse}
            ></AddCourseForm>
            {/*Render the form to edit a course if Edit button is pressed */}
            {/*editCourse && <EditCourseForm></EditCourseForm>*/}
        </div>
    );

    function filterFunction(filter: string, courseCode: string): boolean {
        return courseCode
            .replace(/\s+/g, "")
            .startsWith(filter.replace(/\s+/g, "").toUpperCase());
    }

    //This function allows each course to edit itself within the master list of courses
    function editCourseByName(name: string, newName: string, newCreds: number) {
        const newCourses: Course[] = [];
        courses.map((course: Course) => {
            if (course.code === name) {
                newCourses.push({
                    ...course,
                    code: newName,
                    credits: newCreds
                });
            } else {
                newCourses.push(course);
            }
        });
        setCourses(newCourses);
    }

    //This function allows a course to reset itself within the master list of courses
    //The unmodified version of the course is drawn from unmodifiedCourses state variable
    function resetCourse(
        course: Course,
        plans: DegreePlan[],
        setPlans: (d: DegreePlan[]) => void
    ) {
        const tmpCourses: string[] = [];
        courses.map((course: Course) => tmpCourses.push(course.code));
        const ind = tmpCourses.indexOf(course.code);
        updateCoursesInPlans(plans, setPlans, course, unmodifiedCourses[ind]);
        editCourseByName(
            courses[ind].code,
            unmodifiedCourses[ind].code,
            unmodifiedCourses[ind].credits
        );
    }
    //Allows a course to delete itself from the master list and the unmodified list
    function deleteCourseByName(name: string) {
        const tmpCourses: string[] = [];
        courses.map((course: Course) => tmpCourses.push(course.code));
        const ind = tmpCourses.indexOf(name);
        courses.splice(ind, 1);
        setCourses([...courses]);
        unmodifiedCourses.splice(ind, 1);
        setUnmodifiedCourses([...unmodifiedCourses]);
    }
    //Adds a course to the master list and the unmodified list
    function addCourse(newName: string, newCredits: number) {
        setCourses([
            ...courses,
            {
                code: newName,
                credits: newCredits,
                preReq: "",
                name: "",
                descr: "",
                restrict: "",
                breadth: "",
                typ: ""
            }
        ]);
        setUnmodifiedCourses([
            ...unmodifiedCourses,
            {
                code: newName,
                credits: newCredits,
                preReq: "",
                name: "",
                descr: "",
                restrict: "",
                breadth: "",
                typ: ""
            }
        ]);
    }
}
