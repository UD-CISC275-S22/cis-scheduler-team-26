import React, { useState } from "react";
import { Course } from "../Interfaces/course";
import { Button, Form, Offcanvas } from "react-bootstrap";
import "./CoursesList.css";

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

interface coursesListProp {
    setCourses: (newCourses: Course[]) => void;
    courses: Course[];
}

function removeCourse(
    setCourses: (newCourses: Course[]) => void,
    setOldCourses: (newCourses: Course[]) => void,
    courses: Course[],
    oldCourses: Course[],
    removeCourse: Course
) {
    setCourses(
        courses.filter((course: Course): boolean => course != removeCourse)
    );
    setOldCourses(
        oldCourses.filter((course: Course): boolean => course != removeCourse)
    );
}

export function CoursesListOffcanvas({
    setCourses,
    courses
}: coursesListProp): JSX.Element {
    const [show, setShow] = useState<boolean>(false);
    return (
        <div className="offcanvas-component">
            <Button
                onClick={() => setShow(true)}
                className="offcanvas-show-button"
            >
                View Courses List
            </Button>
            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                placement={"end"}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>All Courses:</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CoursesList
                        setCourses={setCourses}
                        courses={courses}
                    ></CoursesList>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

function CoursesList({ setCourses, courses }: coursesListProp): JSX.Element {
    //buttons
    const [addingCourse, setAddCourse] = useState<boolean>(false);
    const [removingCourse, setRemoveCourse] = useState<boolean>(false);
    const [editCourse, setEditCourse] = useState<boolean>(false);
    const [oldCourses, setOldCourses] = useState<Course[]>(courses);
    //course info
    const [courseDep, setCourseDep] = useState<string>("");
    const [courseID, setCourseID] = useState<number>(0);
    const [courseCred, setCourseCred] = useState<number>(0);
    const [courseIndex, setCourseIndex] = useState<number>(0);
    function saveCourse(oldCourse: Course): void {
        const storeCourse: Course = { ...oldCourse };
        setCourseIndex(
            courses.findIndex(
                (course: Course): boolean =>
                    course.courseName === storeCourse.courseName &&
                    course.id === storeCourse.id
            )
        );
        oldCourses[
            courses.findIndex(
                (course: Course): boolean =>
                    course.courseName === storeCourse.courseName &&
                    course.id === storeCourse.id
            )
        ] = storeCourse;
        setOldCourses([...oldCourses]);
    }
    function changeCourse(): void {
        const changedCourse: Course = {
            id: courseID,
            courseName: courseDep,
            numCredits: courseCred,
            preReq: []
        };
        courses.splice(courseIndex, 1, changedCourse);
        setCourses([...courses]);
    }
    function resetCourse(curr: Course): void {
        const index: number = courses.findIndex(
            (course: Course): boolean =>
                course.id === curr.id && course.courseName === curr.courseName
        );
        const oldCourse: Course = {
            id: oldCourses[index].id,
            courseName: oldCourses[index].courseName,
            numCredits: oldCourses[index].numCredits,
            preReq: []
        };
        courses.splice(index, 1, oldCourse);
        setCourses([...courses]);
    }
    function addNewCourse(): void {
        setCourses([
            ...courses,
            {
                id: courseID,
                courseName: courseDep,
                numCredits: courseCred,
                preReq: []
            }
        ]);
        setOldCourses([
            ...courses,
            {
                id: courseID,
                courseName: courseDep,
                numCredits: courseCred,
                preReq: []
            }
        ]);
    }
    return (
        <div>
            {courses.map(
                (curr: Course): JSX.Element => (
                    <div key={curr.courseName + curr.id}>
                        {curr.courseName + curr.id}
                        <div>Worth {curr.numCredits} Credits</div>
                        <div>
                            Prerequisite Courses:{" "}
                            {curr.preReq.map(
                                (pre: Course): JSX.Element => (
                                    <div key={curr.courseName + curr.id}>
                                        {pre.courseName + pre.id}
                                    </div>
                                )
                            )}
                        </div>
                        {removingCourse && (
                            <Button
                                onClick={() =>
                                    removeCourse(
                                        setCourses,
                                        setOldCourses,
                                        courses,
                                        oldCourses,
                                        curr
                                    )
                                }
                                style={{ backgroundColor: "red" }}
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            onClick={() => {
                                setEditCourse(true), saveCourse(curr);
                            }}
                        >
                            Edit
                        </Button>
                        <Button onClick={() => resetCourse(curr)}>
                            Reset Course
                        </Button>
                    </div>
                )
            )}
            <Button onClick={() => setAddCourse(!addingCourse)}>
                Add Course
            </Button>
            {/*Render the form to add a course if Add Course button is pressed */}
            {addingCourse && (
                <AddCourseForm
                    courseDep={courseDep}
                    setCourseDep={setCourseDep}
                    courseID={courseID}
                    setCourseID={setCourseID}
                    courseCred={courseCred}
                    setCourseCred={setCourseCred}
                    addCourse={addNewCourse}
                    setAddingCourse={setAddCourse}
                ></AddCourseForm>
            )}
            {/*Render the form to edit a course if Edit button is pressed */}
            {editCourse && (
                <EditCourseForm
                    courseDep={courseDep}
                    setCourseDep={setCourseDep}
                    courseID={courseID}
                    setCourseID={setCourseID}
                    courseCred={courseCred}
                    setCourseCred={setCourseCred}
                    editingCourse={editCourse}
                    setEditingCourse={setEditCourse}
                    changeCourse={changeCourse}
                ></EditCourseForm>
            )}
            <Button onClick={() => setRemoveCourse(!removingCourse)}>
                Remove Course
            </Button>
        </div>
    );
}

//Form to add a new course to master course list
function AddCourseForm({
    courseDep,
    setCourseDep,
    courseID,
    setCourseID,
    courseCred,
    setCourseCred,
    addCourse,
    setAddingCourse
}: {
    courseDep: string;
    setCourseDep: (name: string) => void;
    courseID: number;
    setCourseID: (id: number) => void;
    courseCred: number;
    setCourseCred: (num: number) => void;
    addCourse: () => void;
    setAddingCourse: (val: boolean) => void;
}): JSX.Element {
    return (
        <div>
            <Form.Group controlId="Add Course Dep">
                <Form.Label>Type Course Department: </Form.Label>
                <Form.Control
                    type="text"
                    value={courseDep}
                    onChange={(event: ChangeEvent) =>
                        setCourseDep(event.target.value)
                    }
                />
            </Form.Group>
            <Form.Group controlId="Add Course ID">
                <Form.Label>Type Course ID: </Form.Label>
                <Form.Control
                    type="number"
                    value={courseID}
                    onChange={(event: ChangeEvent) =>
                        setCourseID(parseInt(event.target.value) || 0)
                    }
                />
            </Form.Group>
            <Form.Group controlId="Add Course Credit">
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
                    addCourse(), setAddingCourse(false);
                }}
            >
                Submit
            </Button>
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
