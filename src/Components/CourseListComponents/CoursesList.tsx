import React, { useState } from "react";
import { Course } from "../../Interfaces/course";
import { Button, Form } from "react-bootstrap";
import { RenderCourse } from "./RenderCourse";
import { AddCourseForm } from "./AddCoursePopup";
import "./CoursesList.css";

//icon imports
import { RiAddBoxLine } from "react-icons/ri";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

interface coursesListProp {
    setCourses: (newCourses: Course[]) => void;
    courses: Course[];
}

export function CoursesList({
    setCourses,
    courses
}: coursesListProp): JSX.Element {
    //Creating new course info
    const [addingCourse, setAddingCourse] = useState<boolean>(false);
    const [newCourseDepartment, setNewCourseDepartment] = useState<string>("");
    const [newCourseID, setNewCourseID] = useState<number>(0);
    const [newCourseCredits, setNewCourseCredits] = useState<number>(0);

    //This function allows each course to edit itself within the master list of courses
    function editCourseByName(
        name: string,
        id: number,
        newName: string,
        newID: number,
        newCreds: number
    ) {
        const newCourses: Course[] = [];
        courses.map((course: Course) => {
            if (course.courseName === name && course.id === id) {
                newCourses.push({
                    ...course,
                    courseName: newName,
                    id: newID,
                    numCredits: newCreds
                });
            } else {
                newCourses.push(course);
            }
        });
    }

    function deleteCourseByName(name: string, id: number) {
        setCourses(
            courses.filter(
                (course: Course) =>
                    course.courseName !== name && course.id !== id
            )
        );
    }

    return (
        <div>
            {courses.map((curr: Course) => (
                <div key={curr.courseName + curr.id.toString()}>
                    <RenderCourse
                        Course={curr}
                        editCourse={(
                            newName: string,
                            newID: number,
                            newCreds: number
                        ) => {
                            editCourseByName(
                                curr.courseName,
                                curr.id,
                                newName,
                                newID,
                                newCreds
                            );
                        }}
                        deleteCourse={() =>
                            deleteCourseByName(curr.courseName, curr.id)
                        }
                    ></RenderCourse>
                </div>
            ))}
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
                setCourseList={setCourses}
            ></AddCourseForm>
            {/*Render the form to edit a course if Edit button is pressed */}
            {/*editCourse && <EditCourseForm></EditCourseForm>*/}
        </div>
    );
}

//Form to edit a specific course
function EditCourseForm({
    courseDep,
    setCourseDep,
    courseID,
    setCourseID,
    courseCred,
    setCourseCred,
    editingCourse,
    setEditingCourse,
    changeCourse
}: {
    courseDep: string;
    setCourseDep: (name: string) => void;
    courseID: number;
    setCourseID: (id: number) => void;
    courseCred: number;
    setCourseCred: (num: number) => void;
    editingCourse: boolean;
    setEditingCourse: (val: boolean) => void;
    changeCourse: () => void;
}): JSX.Element {
    return (
        <div>
            <Form.Group controlId="Change Course Dep">
                <Form.Label>Type Course Department: </Form.Label>
                <Form.Control
                    type="text"
                    value={courseDep}
                    onChange={(event: ChangeEvent) =>
                        setCourseDep(event.target.value)
                    }
                />
            </Form.Group>
            <Form.Group controlId="Change Course ID">
                <Form.Label>Type Course ID: </Form.Label>
                <Form.Control
                    type="number"
                    value={courseID}
                    onChange={(event: ChangeEvent) =>
                        setCourseID(parseInt(event.target.value) || 0)
                    }
                />
            </Form.Group>
            <Form.Group controlId="Change Course Credit">
                <Form.Label>Type number of Credits: </Form.Label>
                <Form.Control
                    type="number"
                    value={courseCred}
                    onChange={(event: ChangeEvent) =>
                        setCourseCred(parseInt(event.target.value) || 0)
                    }
                />
            </Form.Group>
            <Button
                onClick={() => {
                    changeCourse(), setEditingCourse(!editingCourse);
                }}
            >
                Submit
            </Button>
        </div>
    );
}
